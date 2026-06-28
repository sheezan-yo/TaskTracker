# Task Tracker

A modern full-stack Task Tracker application built using the MERN stack. The application allows users to create, manage, update, and organize tasks through a responsive and intuitive user interface.

## Live Demo

* Frontend: `https://task-tracker-dun-six.vercel.app`
* Backend: `https://tasktracker-g2pv.onrender.com`

## Features

### Task Management

* Create new tasks
* View all tasks
* Update existing tasks
* Delete tasks
* Change task status (Pending, In Progress, Completed)

### Search & Sorting

* Search tasks by title
* Sort tasks by:

  * Newest
  * Oldest
  * Priority

### User Experience

* Responsive design for desktop and mobile devices
* Modern dashboard interface
* Dark mode support
* Toast notifications
* Custom confirmation modal for task deletion
* Click-outside support for modals and menus
* Dynamic UI updates without page refresh

### Form Validation

* Required title validation
* Error messages displayed below fields
* Due date validation

## Tech Stack

### Frontend

* React
* Tailwind CSS v4
* Axios
* Lucide React
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

## Project Structure

```text
tasktracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/sheezan-yo/task-tracker.git
cd task-tracker
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Start frontend:

```bash
npm run dev
```

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

### Create Task

```http
POST /api/tasks
```

### Update Task

```http
PUT /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

## Screenshots

Add screenshots of:

* Dashboard
* Create Task Modal
* Dark Mode
* Mobile View

## Future Improvements

* User Authentication (JWT)
* Task Categories
* Due Date Reminders
* Drag-and-Drop Task Management
* Task Analytics Dashboard

## Author

**Mohd Sheezan Khan**

* GitHub: https://github.com/sheezan-yo
* LinkedIn: https://linkedin.com/in/Sheezan-khan-error404
