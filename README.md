# Kitchen Prep Planner

Kitchen Prep Planner is a simple MERN stack application for managing daily preparation tasks in a commercial kitchen.

I created this project to refresh my full-stack development skills and apply them to a problem I understand from my own kitchen experience. In a busy kitchen, preparation tasks need to be organised by station, priority, due time and progress. This application keeps that information in one place.

## Features

- Add new preparation tasks
- View all saved tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as pending, in progress or completed
- Set the quantity and due time
- Assign tasks to different kitchen stations
- Set low, medium or high priority
- Filter tasks by status
- View totals for each task status
- Save task information in MongoDB
- Display validation and connection errors
- Responsive layout for desktop and mobile screens

## Technologies Used

### Frontend

- React
- JavaScript
- HTML and CSS
- Vite

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB Atlas

## How the Application Works

The React frontend displays the form, task list, filters and task summary.

When a user adds or changes a task, the frontend sends an HTTP request to the Express backend. The backend processes the request and uses Mongoose to store or retrieve information from MongoDB.

After receiving the response, React updates the page with the latest task information.

## Task Information

Each preparation task contains:

- Item name
- Quantity
- Kitchen station
- Priority
- Due time
- Status
- Optional notes

The available stations are General, Grill, Fryer, Larder and Pastry.

## API Endpoints

| Method | Endpoint         | Purpose                             |
| ------ | ---------------- | ----------------------------------- |
| GET    | `/api/health`    | Check whether the server is running |
| GET    | `/api/tasks`     | Get all preparation tasks           |
| POST   | `/api/tasks`     | Create a new task                   |
| PUT    | `/api/tasks/:id` | Update an existing task             |
| DELETE | `/api/tasks/:id` | Delete a task                       |

## Project Structure

```text
kitchen-prep-planner/
├── client/
│   ├── src/
│   │   ├── api/          # Requests sent to the backend
│   │   ├── components/   # Form, task card and summary components
│   │   ├── App.jsx       # Main application component
│   │   └── styles.css    # Application styling
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/       # MongoDB connection
│   │   ├── controllers/  # Task request functions
│   │   ├── models/       # Mongoose task model
│   │   ├── routes/       # API routes
│   │   └── server.js     # Express server
│   └── package.json
│
├── package.json
└── render.yaml
```

## Running the Project Locally

### Requirements

Before running the project, install:

- Node.js
- npm
- Git
- A MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/ali-ahtisham/kitchen-prep-planner.git
cd kitchen-prep-planner
```

### 2. Install the packages

```bash
npm install
npm run install:all
```

### 3. Configure the environment variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

The real `.env` file is not included in the repository because it contains private database credentials.

### 4. Start the application

```bash
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://localhost:5000
```

## What I Practised

Through this project, I practised:

- Creating React components
- Managing state with React hooks
- Handling forms and user input
- Sending HTTP requests with Fetch API
- Creating REST API routes with Express
- Organising backend code into models, controllers and routes
- Performing CRUD operations
- Connecting a Node.js application to MongoDB Atlas
- Validating data with Mongoose
- Handling loading states and errors
- Using Git and GitHub for version control

## Future Improvements

Some features I would like to add later are:

- User login and authentication
- Search by task name or station
- Overdue-task indicators
- Inventory and low-stock tracking
- Automated API testing

## Live Demo

[View the live Kitchen Prep Planner](https://kitchen-prep-planner.onrender.com)

## Author

**Ali Ahtisham**

- [GitHub](https://github.com/ali-ahtisham)
- [LinkedIn](https://www.linkedin.com/in/ali-ahtisham53400)
