# Task Management System - Backend API

## Overview
A RESTful API for a Task Management System built with Node.js, Express, and MongoDB. Features JWT authentication, role-based permissions, and support for personal and assigned tasks.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-async-handler

## Features
- ✅ User registration and authentication
- ✅ JWT-based authorization
- ✅ Personal task management
- ✅ Task assignment with role-based permissions
- ✅ Secure password hashing
- ✅ Input validation and error handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Seed test users (optional):
```bash
npm run data:import
```

## Running the Server

Development mode:
```bash
npm run server
```

Production mode:
```bash
npm start
```

## Test Users
After running `npm run data:import`, you'll have these test users:
- **Email:** john@example.com | **Password:** 123456
- **Email:** jane@example.com | **Password:** 123456
- **Email:** bob@example.com | **Password:** 123456

## API Endpoints

### Authentication Routes

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

Response: {
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}

Response: {
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Get User Profile
```
GET /api/auth/profile
Authorization: Bearer {token}

Response: {
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Get All Users
```
GET /api/auth/users
Authorization: Bearer {token}

Response: [
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  ...
]
```

### Task Routes

#### Create Task
```
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

// Personal Task
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "Todo",
  "dueDate": "2024-12-31"
}

// Assigned Task
{
  "title": "Review code",
  "description": "Review the pull request",
  "status": "Todo",
  "dueDate": "2024-12-31",
  "assignee": "assignee_user_id"
}

Response: {
  "_id": "task_id",
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "Todo",
  "dueDate": "2024-12-31",
  "creator": {
    "_id": "creator_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "assignee": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get All Tasks
```
GET /api/tasks
Authorization: Bearer {token}

Response: [
  {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "Todo",
    "dueDate": "2024-12-31",
    "creator": {...},
    "assignee": {...},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  ...
]
```

#### Get Task by ID
```
GET /api/tasks/:id
Authorization: Bearer {token}

Response: {
  "_id": "task_id",
  "title": "Complete project",
  ...
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

// Personal Task (creator can update all fields)
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In Progress",
  "dueDate": "2024-12-31"
}

// Assigned Task - Assignee (can only update status)
{
  "status": "In Progress"
}

// Assigned Task - Assigner (can only update due date)
{
  "dueDate": "2024-12-31"
}

Response: {
  "_id": "task_id",
  "title": "Updated title",
  ...
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer {token}

Response: {
  "message": "Task removed successfully"
}
```

## Permission Rules

### Personal Tasks
- **Creator:** Can view, update all fields, and delete

### Assigned Tasks
- **Assignee:** Can view and update status only
- **Assigner:** Can view, update due date, and delete

## Status Values
Tasks can have one of three status values:
- `Todo`
- `In Progress`
- `Done`

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

Error Response Format:
```json
{
  "message": "Error message description",
  "stack": "Stack trace (development only)"
}
```

## Project Structure
```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── taskController.js     # Task management logic
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js              # User schema
│   └── Task.js              # Task schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── taskRoutes.js        # Task endpoints
├── utils/
│   └── generateToken.js     # JWT token generation
├── seeder.js                # Database seeder
└── server.js                # App entry point
```

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- Role-based authorization
- Input validation
- MongoDB injection prevention

## Development Commands
```bash
# Start development server with auto-reload
npm run server

# Import test data
npm run data:import

# Destroy all data
npm run data:destroy

# Run both frontend and backend
npm run dev
```
