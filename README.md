# Kitchen Prep Planner

Kitchen Prep Planner is a full-stack MERN application for organising daily preparation work in a commercial kitchen. It gives kitchen staff one place to record prep items, quantities, stations, priorities, due times and progress.

## Live demo

The live application URL will be added after deployment.

## Features

- Create preparation tasks
- View all current tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as pending, in progress or completed
- Assign station, priority and due time
- Filter tasks by status
- View task totals by status
- Store task data in MongoDB
- Responsive layout for desktop and mobile screens

## Technology stack

- **MongoDB** — document database
- **Express.js** — REST API and server
- **React** — user interface
- **Node.js** — server runtime
- **Mongoose** — MongoDB object modelling
- **Vite** — frontend development and production build

## Application flow

1. A user submits or updates a task in the React interface.
2. The frontend sends an HTTP request to the Express API.
3. The API validates the request and uses Mongoose to communicate with MongoDB.
4. MongoDB stores or returns the task data.
5. The API responds with JSON and React updates the interface.

## Project structure

```text
kitchen-prep-planner/
├── client/
│   ├── src/api/            API request functions
│   ├── src/components/     React interface components
│   ├── src/App.jsx         Main application state and logic
│   └── src/styles.css      Responsive styling
├── server/
│   └── src/
│       ├── config/         Database connection
│       ├── controllers/    Request handlers
│       ├── models/         Mongoose schemas
│       ├── routes/         Express routes
│       └── server.js       Server entry point
├── DEPLOYMENT_GUIDE.md     GitHub, Atlas and Render setup
└── render.yaml             Render deployment configuration
```

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Check API availability |
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Local installation

### Requirements

- Node.js
- npm
- Local MongoDB installation or MongoDB Atlas connection

### Setup

Clone the repository and enter the project directory:

```bash
git clone https://github.com/ali-ahtisham/kitchen-prep-planner.git
cd kitchen-prep-planner
```

Install the packages:

```bash
npm install
npm run install:all
```

Copy `server/.env.example` to `server/.env` and provide the database connection:

```env
MONGO_URI=mongodb://127.0.0.1:27017/kitchen-prep-planner
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Start the development servers:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

## Production build

```bash
npm run build
```

The complete application can be deployed as one Render web service. See `DEPLOYMENT_GUIDE.md` for configuration details.

## Planned improvements

- User authentication and role-based access
- Search by item or station
- Due-date support and overdue-task indicators
- Automated API tests
- Inventory and low-stock tracking

## Author

**Ali Ahtisham**

- [GitHub](https://github.com/ali-ahtisham)
- [LinkedIn](https://www.linkedin.com/in/ali-ahtisham53400)

