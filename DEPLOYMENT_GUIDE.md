# Upload to GitHub and Publish the Live Application

This guide uses three services:

- **GitHub** stores the source code.
- **MongoDB Atlas** stores the live task data.
- **Render** builds and publishes the complete application from GitHub.

The React build is served by the Express server in production, so the live application needs only one Render web service and one URL.

## Part 1: Prepare the project on Windows

1. Download and extract `Kitchen_Prep_Planner_MERN.zip`.
2. Rename the extracted project folder to `kitchen-prep-planner` if necessary.
3. Open the folder in VS Code.
4. Open **Terminal > New Terminal**.
5. Confirm the terminal is inside the project root—the folder containing `README.md`, `client`, `server` and `package.json`.

Run:

```powershell
npm install
npm run install:all
npm run build
```

Do not continue if the build reports an error.

## Part 2: Create the GitHub repository

1. Sign in to GitHub.
2. Select **New repository**.
3. Repository name: `kitchen-prep-planner`
4. Description: `A MERN application for managing kitchen preparation tasks and service priorities.`
5. Select **Public** so employers can view it.
6. Do not add a README, `.gitignore` or licence on GitHub because the project already contains a README and `.gitignore`.
7. Select **Create repository**.

Keep the new repository page open because it displays your repository URL.

## Part 3: Push the source code

In the VS Code terminal, run these commands one at a time:

```powershell
git init
git add .
git status
git commit -m "Initial MERN kitchen prep planner"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kitchen-prep-planner.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your exact GitHub username. The repository URL for this project is:

```text
https://github.com/ali-ahtisham/kitchen-prep-planner.git
```

Before `git commit`, check the `git status` output. It must not list:

- `.env`
- `node_modules`
- `client/dist`

The included `.gitignore` excludes these files.

If Git asks for your identity, set it with your GitHub name and email:

```powershell
git config --global user.name "YOUR-NAME"
git config --global user.email "YOUR-GITHUB-EMAIL"
```

Then run the commit and push commands again.

## Part 4: Create the MongoDB Atlas database

1. Sign in to MongoDB Atlas.
2. Create a project named `Kitchen Prep Planner`.
3. Create a free cluster.
4. Create a database user with a unique username and a strong password.
5. Save the database username and password securely.
6. Open **Network Access**. For the first deployment, you may temporarily add `0.0.0.0/0` so Render can connect. This allows connections from anywhere, so use a strong database password and complete the restriction step below immediately after deployment.
7. Open the cluster and select **Connect > Drivers > Node.js**.
8. Copy the connection string. It will look similar to:

```text
mongodb+srv://USERNAME:PASSWORD@cluster-name.mongodb.net/kitchen-prep-planner?retryWrites=true&w=majority
```

Replace the placeholders with the database user's details. Keep this value private. Do not put it in GitHub, the README or any React file.

If the password contains characters such as `@`, `:`, `/`, `?`, `#`, `[` or `]`, URL-encode them or use a database password without those characters.

## Part 5: Deploy from GitHub using Render

1. Sign in to Render using GitHub.
2. In Render, select **New > Blueprint**.
3. Connect the `kitchen-prep-planner` GitHub repository.
4. Render will read the included `render.yaml` file.
5. When Render asks for `MONGO_URI`, paste the private Atlas connection string.
6. Create/apply the Blueprint.
7. Wait for the build and deployment to finish.

The included configuration uses:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Build command | `npm install && npm run render-build` |
| Start command | `npm start` |
| Health check | `/api/health` |
| Environment | `NODE_ENV=production` |

Render will provide a URL similar to:

```text
https://kitchen-prep-planner.onrender.com
```

Open the URL and test all four operations:

1. Add a task.
2. Edit the task.
3. Mark it completed.
4. Delete it.

If Render reports a database connection error, check the Atlas database username, password, connection string and IP access list.

### Restrict Atlas after the first successful deployment

1. Open your service in the Render dashboard.
2. Select **Connect > Outbound**.
3. Copy every outbound CIDR range shown for the service.
4. In MongoDB Atlas, open **Network Access**.
5. Add the Render CIDR ranges to the Atlas IP access list.
6. Remove the temporary `0.0.0.0/0` entry.
7. Test the live application again.

This keeps the database reachable from the Render service without leaving it open to connections from every internet address.

## Part 6: Add the live link to GitHub

On the GitHub repository page:

1. Find the **About** section.
2. Select the settings/edit icon.
3. Add the Render URL in the **Website** field.
4. Add topics such as `mern`, `react`, `nodejs`, `express`, `mongodb` and `javascript`.
5. Save the changes.

Also update the top of `README.md` after deployment:

```markdown
## Live demo

[Open Kitchen Prep Planner](YOUR-RENDER-URL)
```

Then push the README update:

```powershell
git add README.md
git commit -m "docs: add live demo link"
git push
```

Render will automatically deploy future pushes from the linked branch.

## Safe publishing checklist

- [ ] The repository is public.
- [ ] `.env` is not visible on GitHub.
- [ ] `node_modules` is not in the repository.
- [ ] `MONGO_URI` exists only in Render's environment settings and your private local `.env`.
- [ ] Atlas allows the Render outbound ranges and no longer uses temporary `0.0.0.0/0` access.
- [ ] The live application loads.
- [ ] Create, read, update and delete operations work.
- [ ] The GitHub About section contains the live URL.
- [ ] The README contains setup instructions and a live-demo link.

