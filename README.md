# Task Management System (MERN Stack)

A full-stack task management application built with MongoDB, Express.js, React.js, and Node.js. Features include user authentication, personal and assigned tasks with role-based permissions, and a modern, animated UI.

## 🚀 Features

### Authentication
- ✅ User registration with password hashing
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
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Loading and empty states
- ✅ Task filtering (7 filter options)
- ✅ Modern gradient design

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcryptjs
- **Validation:** express-async-handler

### Frontend
- **Framework:** React 19
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Notifications:** React Toastify
- **HTTP Client:** Axios
- **Build Tool:** Vite

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd my-task
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

Create `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Seed Test Users (Optional)
```bash
npm run data:import
```

This creates 3 test users:
- **Email:** john@example.com | **Password:** 123456
- **Email:** jane@example.com | **Password:** 123456
- **Email:** bob@example.com | **Password:** 123456

## 🚀 Running the Application

### Development Mode

**Option 1: Run both frontend and backend together**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Production Mode
```bash
# Backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/

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
│   ├── seeder.js                # Database seeder
│   └── server.js                # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Redux store & slices
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # App entry point
│   ├── public/
│   └── package.json
├── .env                         # Environment variables
├── package.json                 # Root package.json
├── BACKEND_README.md            # Backend documentation
├── FRONTEND_README.md           # Frontend documentation
└── README.md                    # This file
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/profile         # Get user profile (Protected)
GET    /api/auth/users           # Get all users (Protected)
```

### Tasks
```
GET    /api/tasks                # Get all user tasks (Protected)
POST   /api/tasks                # Create new task (Protected)
GET    /api/tasks/:id            # Get task by ID (Protected)
PUT    /api/tasks/:id            # Update task (Protected)
DELETE /api/tasks/:id            # Delete task (Protected)
```

## 🎨 UI Screenshots

### Login Page
- Modern gradient design
- Form validation
- Smooth animations

### Dashboard
- Task cards with status badges
- Filter tabs (7 options)
- Create task button
- Responsive grid layout

### Task Modal
- Create/Edit modes
- Role-based field permissions
- User assignment dropdown
- Permission notices

## 🔐 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- Protected API routes
- Input validation
- MongoDB injection prevention
- CORS enabled
- Error handling middleware

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

## 🧪 Testing

### Manual Testing
1. Register 2 users
2. Login as User 1
3. Create a personal task
4. Create a task assigned to User 2
5. Logout and login as User 2
6. Verify you can only update status
7. Login back as User 1
8. Verify you can only update due date

### Test Credentials
After running `npm run data:import`:
- john@example.com / 123456
- jane@example.com / 123456
- bob@example.com / 123456

## 📦 Available Scripts

### Root Directory
```bash
npm start              # Start backend (production)
npm run server         # Start backend (development)
npm run client         # Start frontend
npm run dev            # Start both frontend & backend
npm run data:import    # Import test data
npm run data:destroy   # Destroy all data
```

### Frontend Directory
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy from GitHub
3. Run database seeder if needed

### Frontend (Netlify/Vercel)
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure PORT is not in use
- Verify all dependencies installed

### Frontend won't connect to backend
- Check proxy configuration in `vite.config.js`
- Ensure backend is running on port 5000
- Check CORS settings

### Authentication issues
- Clear localStorage
- Check JWT_SECRET in .env
- Verify token expiration (30 days default)

## 📝 Assignment Requirements Checklist

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

## 🎯 Key Features Implemented

1. **Complete Authentication System**
   - Secure registration and login
   - JWT token management
   - Protected routes

2. **Advanced Task Management**
   - Personal and assigned tasks
   - Role-based permissions
   - Status tracking
   - Due date management

3. **Modern UI/UX**
   - Responsive design
   - Smooth animations
   - Toast notifications
   - Filter system

4. **Clean Code Architecture**
   - Separation of concerns
   - Reusable components
   - Redux state management
   - Error handling

## 👥 Sample Users

After running `npm run data:import`, you can use these credentials:

| Name | Email | Password |
|------|-------|----------|
| John Doe | john@example.com | 123456 |
| Jane Smith | jane@example.com | 123456 |
| Bob Wilson | bob@example.com | 123456 |

## 📚 Documentation

- [Backend Documentation](./BACKEND_README.md)
- [Frontend Documentation](./FRONTEND_README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- MERN Stack Community
- Redux Toolkit Documentation
- Tailwind CSS
- Framer Motion
- React Toastify

---

**Note:** This is a complete, production-ready task management system built as part of a full-stack developer assignment. All features are fully functional and tested.
