# Task Management System (MERN Stack)

> A full-stack task management application built with MongoDB, Express.js, React.js, and Node.js. Features include user authentication, personal and assigned tasks with role-based permissions, and a modern, animated UI.

## 🔗 Links

- **GitHub Repository:** https://github.com/SatyamDevGenie/Full_Stack_Assignment
- **Live Demo:** https://full-stack-assignment-phi.vercel.app

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Sample User Credentials](#sample-user-credentials)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)

## ✨ Features

### Authentication
- ✅ User registration with password hashing (bcryptjs)
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Persistent login sessions

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Personal tasks (visible only to creator)
- ✅ Assigned tasks (visible to assigner and assignee)
- ✅ Task status tracking (Todo, In Progress, Done)
- ✅ Due date management

### Role-Based Permissions
**Personal Tasks:**
- Creator can edit all fields and delete

**Assigned Tasks:**
- **Assignee:** Can only update status
- **Assigner:** Can only update due date and delete

### UI/UX
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Loading and empty states
- ✅ Task filtering (7 filter options)
- ✅ Modern gradient design
- ✅ Mobile hamburger menu

## 🛠️ Tech Stack

### Backend
| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Tokens for authentication |
| **bcryptjs** | Password hashing |
| **express-async-handler** | Error handling middleware |
| **CORS** | Cross-Origin Resource Sharing |

### Frontend
| Technology | Description |
|------------|-------------|
| **React 19** | JavaScript library for UI |
| **Redux Toolkit** | State management |
| **React Router DOM v7** | Client-side routing |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Animation library |
| **React Toastify** | Toast notifications |
| **Axios** | HTTP client |
| **Vite** | Build tool and dev server |
| **React Icons** | Icon library |

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd my-task
```

### Step 2: Install Dependencies

#### Install Root Dependencies
```bash
npm install
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
```

**Important Notes:**
- Replace `MONGO_URI` with your actual MongoDB connection string
- For local MongoDB: `mongodb://localhost:27017/task-manager`
- For MongoDB Atlas: Get connection string from your Atlas dashboard
- Change `JWT_SECRET` to a strong, random string in production

### Step 4: Start the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev
```

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Backend Deployed on Render:** https://full-stack-assignment-igcn.onrender.com

## 👥 Sample User Credentials

You can directly login users through the application, or use these sample credentials for testing:

### User 1
```
Name: Satyam Sawant
Email: satyam@gmail.com
Password: 123456
```

### User 2
```
Name: Aftab Mulani
Email: aftab@gmail.com
Password: 123456
```

### User 3
```
Name: Vikas Sharma
Email: vikas@gmail.com
Password: 123456
```

**Note:** These users need to be registered manually through the registration page. The application does not include a seeder script.

## 📝 How to Test the Application

### 1. Register Users
1. Go to http://localhost:5173/register
2. Register at least 2 users (e.g., John and Jane)

### 2. Test Personal Tasks
1. Login as John
2. Create a personal task (don't assign to anyone)
3. Edit all fields (title, description, status, due date)
4. Delete the task

### 3. Test Assigned Tasks
1. Login as John
2. Create a task and assign it to Jane
3. Try to edit - you can only change the due date
4. Logout

5. Login as Jane
6. View the assigned task
7. Try to edit - you can only change the status
8. Update status to "In Progress"

### 4. Test Filters
- Click on different filter tabs:
  - All Tasks
  - Personal Tasks
  - Assigned by Me
  - Assigned to Me
  - Todo / In Progress / Done

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/profile         # Get user profile (Protected)
GET    /api/auth/users           # Get all users (Protected)
```

### Task Routes
```
GET    /api/tasks                # Get all user tasks (Protected)
POST   /api/tasks                # Create new task (Protected)
GET    /api/tasks/:id            # Get task by ID (Protected)
PUT    /api/tasks/:id            # Update task (Protected)
DELETE /api/tasks/:id            # Delete task (Protected)
```

## 📁 Project Structure

```
my-task/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task management logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── taskRoutes.js        # Task endpoints
│   ├── utils/
│   │   └── generateToken.js     # JWT token generation
│   └── server.js                # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FilterTabs.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── store/               # Redux store & slices
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── taskSlice.js
│   │   │   └── store.js
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # App entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   └── package.json
├── .env                         # Environment variables
├── package.json                 # Root package.json
└── README.md                    # This file
```

## 📱 Screenshots

### Dashboard
![Login Page](./screenshots/Screenshot%20(119).png)
*Modern gradient design with smooth animations and form valida

### MongoDB 2 sample users data
![Task Modal](./screenshots/Screenshot%20(121).png)
*Create/Edit tasks with role-based permissions and user assignment*

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token authentication (30-day expiration)
- ✅ Protected API routes
- ✅ Input validation
- ✅ MongoDB injection prevention
- ✅ CORS enabled
- ✅ Error handling middleware

## 📊 Task Workflow

### Creating a Personal Task
1. Click "Create Task" button
2. Fill in title, description, status, due date
3. Leave "Assign To" as "None"
4. Submit

### Creating an Assigned Task
1. Click "Create Task" button
2. Fill in task details
3. Select user from "Assign To" dropdown
4. Submit

### Updating Tasks

**Personal Task:**
- Creator can edit all fields

**Assigned Task (as Assignee):**
- Can only change status
- Other fields are disabled

**Assigned Task (as Assigner):**
- Can only change due date
- Status field is disabled

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create account on deployment platform
2. Connect your GitHub repository
3. Set environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   ```
4. Deploy

### Frontend Deployment (Vercel)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder

3. Add `_redirects` file in `public/`:
   ```
   /*    /index.html   200
   ```

4. Set environment variable:
   ```
   VITE_API_URL=your_backend_url
   ```

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check MongoDB connection string in `.env`
- ✅ Ensure PORT 5000 is not in use
- ✅ Verify all dependencies are installed: `npm install`

### Frontend won't connect to backend
- ✅ Check proxy configuration in `vite.config.js`
- ✅ Ensure backend is running on port 5000
- ✅ Check CORS settings in `server.js`

### Authentication issues
- ✅ Clear browser localStorage
- ✅ Check JWT_SECRET in `.env`
- ✅ Verify token expiration (30 days default)

### MongoDB connection issues
- ✅ Check MongoDB is running (local)
- ✅ Verify connection string format
- ✅ Check network access in MongoDB Atlas
- ✅ Whitelist your IP address in Atlas

## � Available Scripts

### Root Directory
```bash
npm start              # Start backend (production)
npm run server         # Start backend (development with nodemon)
npm run client         # Start frontend
npm run dev            # Start both frontend & backend concurrently
```

### Frontend Directory
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

## 🎯 Assignment Requirements Checklist

✅ **Technical Requirements**
- [x] Frontend: React.js
- [x] Backend: Node.js + Express.js
- [x] Database: MongoDB
- [x] Authentication: JWT-based

✅ **Authentication**
- [x] User Registration
- [x] User Login
- [x] Password hashing
- [x] JWT tokens
- [x] Protected routes

✅ **Task Management**
- [x] Create tasks
- [x] View tasks
- [x] Update tasks
- [x] Delete tasks
- [x] All required fields (Title, Description, Status, Due Date)

✅ **Task Types**
- [x] Personal tasks (visible only to creator)
- [x] Assigned tasks (visible to both users)

✅ **Role-Based Permissions**
- [x] Assignee can only update status
- [x] Assigner can update due date
- [x] Proper authorization checks

✅ **Frontend**
- [x] Login/Register pages
- [x] Dashboard with task list
- [x] Task creation/update interface
- [x] Clean and readable layout
- [x] Loading states
- [x] Empty states
- [x] Error handling

✅ **Submission**
- [x] Complete codebase
- [x] README with setup instructions
- [x] Tech stack documented
- [x] Sample user credentials provided

## 👨‍💻 Author

**Your Name**
- GitHub:https://github.com/SatyamDevGenie
- Email:satyamsawant54@gmail.com
- LinkedIn:https://www.linkedin.com/in/satyam-sawant-a257802a7/

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- MERN Stack Community
- Redux Toolkit Documentation
- Tailwind CSS
- Framer Motion
- React Toastify

---

**Made with ❤️ for the Full Stack Developer Assignment**

For any questions or issues, please open an issue on GitHub or contact the author - (Satyam Sawant :- 9326903988).
