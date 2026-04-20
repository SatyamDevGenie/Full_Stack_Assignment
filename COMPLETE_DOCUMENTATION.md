# Complete Documentation - Task Management System

> **All-in-One Documentation**: Backend, Frontend, Mobile Responsive, and Setup Guide

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Backend Documentation](#backend-documentation)
3. [Frontend Documentation](#frontend-documentation)
4. [Mobile Responsive Implementation](#mobile-responsive-implementation)
5. [Complete Setup Guide](#complete-setup-guide)
6. [API Documentation](#api-documentation)
7. [Deployment Guide](#deployment-guide)

---

# Project Overview

## 🎯 About This Project

A full-stack Task Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application features user authentication, personal and assigned tasks with role-based permissions, and a fully responsive modern UI.

## ✨ Key Features

- ✅ JWT-based authentication with secure password hashing
- ✅ Personal and assigned task management
- ✅ Role-based permissions (Assignee vs Assigner)
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Real-time state management with Redux Toolkit
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications for user feedback
- ✅ 7 different task filters
- ✅ Mobile hamburger menu with dropdown

## 🛠️ Complete Tech Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | v14+ | JavaScript runtime |
| Express.js | v4.21.2 | Web framework |
| MongoDB | v8.13.0 | NoSQL database |
| Mongoose | v8.13.0 | ODM for MongoDB |
| JWT | v9.0.2 | Authentication tokens |
| bcryptjs | v3.0.2 | Password hashing |
| CORS | v2.8.5 | Cross-origin requests |
| express-async-handler | v1.2.0 | Async error handling |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | v19.0.0 | UI library |
| Redux Toolkit | v2.8.2 | State management |
| React Router DOM | v7.6.0 | Client routing |
| Tailwind CSS | v3.1.0 | Utility CSS |
| Framer Motion | v12.11.3 | Animations |
| React Toastify | v11.0.5 | Notifications |
| Axios | v1.9.0 | HTTP client |
| Vite | v6.2.0 | Build tool |
| React Icons | v5.5.0 | Icon library |

---

# Backend Documentation

## 📂 Backend Architecture

### Project Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Auth logic
│   └── taskController.js     # Task CRUD logic
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
│   └── generateToken.js     # JWT generation
└── server.js                # Entry point
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required, trimmed)
  email: String (required, unique, lowercase)
  password: String (required, hashed, min 6 chars)
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required, trimmed)
  description: String (required, trimmed)
  status: Enum ['Todo', 'In Progress', 'Done']
  dueDate: Date (required)
  creator: ObjectId (ref: User)
  assignee: ObjectId (ref: User, optional)
  timestamps: true
}
```


## 🔌 Backend API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

Response (201):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "123456"
}

Response (200):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### 3. Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer {token}

Response (200):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### 4. Get All Users
```http
GET /api/auth/users
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  ...
]
```

### Task Endpoints

#### 1. Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "In Progress",
    "dueDate": "2024-12-31",
    "creator": { "_id": "...", "name": "...", "email": "..." },
    "assignee": { "_id": "...", "name": "...", "email": "..." },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2. Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

Request Body (Personal Task):
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "Todo",
  "dueDate": "2024-12-31"
}

Request Body (Assigned Task):
{
  "title": "Review code",
  "description": "Review the pull request",
  "status": "Todo",
  "dueDate": "2024-12-31",
  "assignee": "assignee_user_id"
}

Response (201):
{
  "_id": "task_id",
  "title": "Complete project",
  ...
}
```

#### 3. Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body (varies by role):
// Personal Task - Creator can update all
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In Progress",
  "dueDate": "2024-12-31"
}

// Assigned Task - Assignee can only update status
{
  "status": "In Progress"
}

// Assigned Task - Assigner can only update due date
{
  "dueDate": "2024-12-31"
}

Response (200):
{
  "_id": "task_id",
  "title": "Updated title",
  ...
}
```

#### 4. Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}

Response (200):
{
  "message": "Task removed successfully"
}
```

## 🔐 Backend Security Features

### Password Security
- **Hashing Algorithm**: bcryptjs with 10 salt rounds
- **Pre-save Hook**: Automatically hashes password before saving
- **Password Comparison**: Secure method for login verification

### JWT Authentication
- **Token Generation**: Uses user ID as payload
- **Expiration**: 30 days
- **Secret Key**: Stored in environment variable
- **Middleware Protection**: Verifies token on protected routes

### Authorization Logic
```javascript
// Personal Task
if (!task.assignee && isCreator) {
  // Can update: title, description, status, dueDate
}

// Assigned Task - Assignee
if (task.assignee && isAssignee) {
  // Can update: status only
}

// Assigned Task - Assigner
if (task.assignee && isCreator) {
  // Can update: dueDate only
}
```

### Error Handling
- **Mongoose Errors**: Cast errors, validation errors, duplicate keys
- **Custom Errors**: 400, 401, 403, 404, 500 status codes
- **Stack Traces**: Only in development mode

---

# Frontend Documentation

## 📂 Frontend Architecture

### Project Structure
```
frontend/src/
├── components/
│   ├── EmptyState.jsx       # Empty state UI
│   ├── FilterTabs.jsx       # Task filters
│   ├── LoadingSpinner.jsx   # Loading indicator
│   ├── Navbar.jsx           # Navigation bar
│   ├── PrivateRoute.jsx     # Route protection
│   ├── TaskCard.jsx         # Task display
│   └── TaskModal.jsx        # Task create/edit
├── pages/
│   ├── Dashboard.jsx        # Main dashboard
│   ├── Login.jsx            # Login page
│   └── Register.jsx         # Registration page
├── store/
│   ├── slices/
│   │   ├── authSlice.js     # Auth state
│   │   └── taskSlice.js     # Task state
│   └── store.js             # Redux config
├── App.jsx                  # Main component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## 🎨 Component Details

### 1. Navbar Component
**Features:**
- Sticky header with z-index 50
- Desktop: Shows user name and logout button
- Mobile: Hamburger menu with dropdown
- Animated menu transitions
- Gradient logo and branding

**Mobile Menu:**
- Opens on hamburger icon click
- Shows user profile card
- Displays name and email
- Full-width logout button
- Smooth height animation

### 2. TaskCard Component
**Features:**
- Displays task information
- Color-coded status badges
- Due date with calendar icon
- Assignee/Assigner information
- Edit and Delete buttons
- Hover animations
- Responsive padding and text

### 3. TaskModal Component
**Features:**
- Create and Edit modes
- Role-based field permissions
- User assignment dropdown
- Form validation
- Responsive layout
- Permission notices
- Stacked buttons on mobile

### 4. FilterTabs Component
**Features:**
- 7 filter options
- Horizontal scroll on mobile
- Active state styling
- Smooth transitions
- Hidden scrollbar
- Touch-friendly

### 5. Dashboard Page
**Features:**
- Task grid layout (1/2/3 columns)
- Filter system
- Create task button
- Empty states
- Loading states
- Responsive spacing


## 🔄 Redux State Management

### Auth Slice
```javascript
State:
{
  userInfo: { _id, name, email, token } | null,
  loading: boolean,
  error: string | null,
  users: []
}

Actions:
- register(userData)
- login(credentials)
- logout()
- getAllUsers()
- clearError()
```

### Task Slice
```javascript
State:
{
  tasks: [],
  currentTask: null,
  loading: boolean,
  error: string | null,
  success: boolean
}

Actions:
- getTasks()
- createTask(taskData)
- updateTask({ id, taskData })
- deleteTask(id)
- clearError()
- clearSuccess()
- setCurrentTask(task)
```

## 🎭 Animations with Framer Motion

### Page Transitions
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Button Interactions
```javascript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Modal Animations
```javascript
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
```

### Menu Dropdown
```javascript
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
```

---

# Mobile Responsive Implementation

## 📱 Responsive Breakpoints

### Tailwind CSS Breakpoints
```css
/* Mobile First Approach */
default: < 640px   (Mobile)
sm: 640px          (Large Mobile / Small Tablet)
md: 768px          (Tablet)
lg: 1024px         (Desktop)
xl: 1280px         (Large Desktop)
2xl: 1536px        (Extra Large Desktop)
```

## 🎯 Mobile Optimizations by Component

### Login & Register Pages
**Mobile (< 640px):**
- Padding: `p-4` (16px)
- Icon size: `text-3xl`
- Heading: `text-2xl`
- Text: `text-sm`
- Input padding: `py-2.5`
- Spacing: `space-y-4`

**Tablet (640px+):**
- Padding: `sm:p-6` (24px)
- Icon size: `sm:text-4xl`
- Heading: `sm:text-3xl`
- Text: `sm:text-base`
- Input padding: `sm:py-3`
- Spacing: `sm:space-y-6`

**Desktop (768px+):**
- Padding: `md:p-8` (32px)

### Navbar
**Mobile (< 768px):**
- Height: `h-16`
- Hamburger menu visible
- User info hidden
- Dropdown menu on click
- Shows: User card + Logout button

**Desktop (768px+):**
- Height: `h-16`
- Hamburger hidden: `md:hidden`
- User info visible: `hidden md:flex`
- Horizontal layout
- Shows: Name badge + Logout button

### Dashboard
**Mobile (< 640px):**
- Padding: `px-4 py-4`
- Heading: `text-2xl`
- Button: Full width `w-full`
- Grid: 1 column
- Spacing: `gap-3 mb-6`

**Tablet (640px+):**
- Padding: `sm:px-6 sm:py-6`
- Heading: `sm:text-3xl`
- Button: Auto width `sm:w-auto`
- Grid: 2 columns `md:grid-cols-2`
- Spacing: `sm:gap-4 sm:mb-8`

**Desktop (1024px+):**
- Padding: `lg:px-8 lg:py-8`
- Heading: `lg:text-4xl`
- Grid: 3 columns `lg:grid-cols-3`

### TaskCard
**Mobile:**
- Padding: `p-4`
- Heading: `text-lg`
- Text: `text-sm`
- Icon size: `text-sm`
- Button text: `text-sm`
- Word breaking: `break-words`
- Text truncation: `truncate`

**Desktop:**
- Padding: `sm:p-6`
- Heading: `sm:text-xl`
- Text: `sm:text-base`
- Icon size: `sm:text-base`
- Button text: `sm:text-base`

### TaskModal
**Mobile:**
- Margin: `m-4`
- Padding: `p-4`
- Heading: `text-xl`
- Form spacing: `space-y-4`
- Grid: 1 column `grid-cols-1`
- Buttons: Stacked `flex-col`
- Cancel: Full width `w-full`

**Desktop:**
- Padding: `sm:p-6`
- Heading: `sm:text-2xl`
- Form spacing: `sm:space-y-6`
- Grid: 2 columns `sm:grid-cols-2`
- Buttons: Row `sm:flex-row`
- Cancel: Auto width `sm:w-auto`

### FilterTabs
**Mobile:**
- Horizontal scroll: `overflow-x-auto`
- Hidden scrollbar: `scrollbar-hide`
- Padding: `px-3 py-2`
- Text: `text-xs`
- Icon: `text-sm`
- Spacing: `gap-1.5`

**Desktop:**
- Padding: `sm:px-4 sm:py-2`
- Text: `sm:text-sm`
- Icon: `sm:text-base`
- Spacing: `sm:gap-2`

## 📐 Responsive Patterns Used

### 1. Responsive Padding
```jsx
className="p-4 sm:p-6 lg:p-8"
// Mobile: 16px, Tablet: 24px, Desktop: 32px
```

### 2. Responsive Text
```jsx
className="text-sm sm:text-base lg:text-lg"
// Mobile: 14px, Tablet: 16px, Desktop: 18px
```

### 3. Responsive Layout
```jsx
className="flex-col sm:flex-row"
// Mobile: Stacked, Desktop: Horizontal
```

### 4. Responsive Grid
```jsx
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols
```

### 5. Conditional Display
```jsx
className="hidden sm:inline"
// Hidden on mobile, visible on desktop
```

### 6. Responsive Width
```jsx
className="w-full sm:w-auto"
// Mobile: Full width, Desktop: Auto width
```

### 7. Responsive Spacing
```jsx
className="gap-2 sm:gap-4 lg:gap-6"
// Mobile: 8px, Tablet: 16px, Desktop: 24px
```

## 🎨 Custom CSS Utilities

### Scrollbar Hide
```css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### Usage
```jsx
<div className="overflow-x-auto scrollbar-hide">
  {/* Horizontally scrollable content */}
</div>
```

## ✅ Mobile Testing Checklist

### Mobile (< 640px)
- [x] Login/Register forms fit screen
- [x] Navbar shows hamburger menu
- [x] Menu dropdown works smoothly
- [x] Dashboard button is full-width
- [x] Task cards stack vertically
- [x] Filter tabs scroll horizontally
- [x] Modal fits screen with padding
- [x] All text is readable
- [x] Touch targets ≥ 44px
- [x] No horizontal scroll on pages

### Tablet (640px - 1024px)
- [x] Two-column task grid
- [x] Navbar shows full layout
- [x] Modal shows side-by-side fields
- [x] Proper spacing throughout
- [x] Buttons show full text
- [x] Comfortable reading width

### Desktop (> 1024px)
- [x] Three-column task grid
- [x] Full navigation visible
- [x] Optimal spacing
- [x] Hover effects work
- [x] All features accessible
- [x] Max-width container


---

# Complete Setup Guide

## 🚀 Prerequisites

### Required Software
1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB**
   - Option A: Local installation - https://www.mongodb.com/try/download/community
   - Option B: MongoDB Atlas (Cloud) - https://www.mongodb.com/cloud/atlas
   - Verify: `mongod --version` (local only)

3. **npm** (comes with Node.js)
   - Verify: `npm --version`

4. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

5. **Code Editor** (Recommended)
   - VS Code: https://code.visualstudio.com/

## 📥 Installation Steps

### Step 1: Clone Repository
```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to project directory
cd my-task
```

### Step 2: Install Backend Dependencies
```bash
# Install root dependencies
npm install
```

**Installed Packages:**
- express, mongoose, bcryptjs, jsonwebtoken
- cors, dotenv, express-async-handler
- chalk, cookie-parser, morgan
- nodemon, concurrently (dev dependencies)

### Step 3: Install Frontend Dependencies
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Return to root
cd ..
```

**Installed Packages:**
- react, react-dom, react-router-dom
- @reduxjs/toolkit, react-redux
- axios, framer-motion, react-toastify
- tailwindcss, postcss, autoprefixer
- vite (dev dependency)

### Step 4: Environment Configuration

Create `.env` file in root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
# Option 1: Local MongoDB
MONGO_URI=mongodb://localhost:27017/task-manager

# Option 2: MongoDB Atlas (Cloud)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_REFRESH_SECRET=your_refresh_secret_key
```

**Important Notes:**
- Replace `username` and `password` with your MongoDB Atlas credentials
- Change `JWT_SECRET` to a strong random string
- Never commit `.env` file to Git

### Step 5: MongoDB Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
# Windows:
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all)
5. Get connection string
6. Replace in `.env` file

### Step 6: Verify Installation
```bash
# Check Node.js
node --version
# Should show: v14.x.x or higher

# Check npm
npm --version
# Should show: 6.x.x or higher

# Check MongoDB (local only)
mongod --version
# Should show: v4.x.x or higher
```

## ▶️ Running the Application

### Method 1: Run Both Together (Recommended)
```bash
# From root directory
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:5173

### Method 2: Run Separately

**Terminal 1 - Backend:**
```bash
# From root directory
npm run server
```

**Terminal 2 - Frontend:**
```bash
# From root directory
cd frontend
npm run dev
```

### Method 3: Production Mode

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🌐 Access Points

After starting the application:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/

## 👥 Creating Sample Users

### Manual Registration
1. Go to http://localhost:5173/register
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: 123456
3. Click "Create Account"
4. Repeat for more users

### Sample User Credentials

**User 1:**
```
Name: John Doe
Email: john@example.com
Password: 123456
```

**User 2:**
```
Name: Jane Smith
Email: jane@example.com
Password: 123456
```

**User 3:**
```
Name: Bob Wilson
Email: bob@example.com
Password: 123456
```

## 🧪 Testing the Application

### 1. Test Authentication
```bash
# Register a new user
POST http://localhost:5000/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}

# Login
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "123456"
}
```

### 2. Test Personal Tasks
1. Login as John
2. Click "Create Task"
3. Fill in details (don't assign)
4. Submit
5. Edit the task (all fields editable)
6. Delete the task

### 3. Test Assigned Tasks
1. Login as John
2. Create task assigned to Jane
3. Try to edit (only due date editable)
4. Logout
5. Login as Jane
6. View assigned task
7. Edit task (only status editable)

### 4. Test Filters
- Click "All Tasks"
- Click "Personal Tasks"
- Click "Assigned by Me"
- Click "Assigned to Me"
- Click "Todo", "In Progress", "Done"

### 5. Test Mobile Responsiveness
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select different devices:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
4. Test hamburger menu
5. Test task cards layout
6. Test modal responsiveness

## 📦 Available Scripts

### Root Directory
```bash
npm start              # Start backend (production)
npm run server         # Start backend (development with nodemon)
npm run client         # Start frontend
npm run dev            # Start both concurrently
```

### Frontend Directory
```bash
npm run dev            # Start Vite dev server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

## 🐛 Troubleshooting

### Issue: Backend won't start

**Error:** `Cannot connect to MongoDB`
```bash
Solution:
1. Check MongoDB is running
2. Verify MONGO_URI in .env
3. Check network connectivity (Atlas)
4. Whitelist IP in Atlas
```

**Error:** `Port 5000 already in use`
```bash
Solution:
1. Change PORT in .env to 5001
2. Or kill process using port 5000:
   # Windows:
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux:
   lsof -ti:5000 | xargs kill -9
```

### Issue: Frontend won't start

**Error:** `Module not found`
```bash
Solution:
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Error:** `Cannot connect to backend`
```bash
Solution:
1. Check backend is running on port 5000
2. Verify proxy in vite.config.js
3. Check CORS settings in server.js
```

### Issue: Authentication not working

**Error:** `Invalid token`
```bash
Solution:
1. Clear browser localStorage
2. Check JWT_SECRET in .env
3. Re-login to get new token
```

**Error:** `User not found`
```bash
Solution:
1. Check MongoDB connection
2. Verify user exists in database
3. Re-register if needed
```

### Issue: Tasks not displaying

**Error:** `Empty dashboard`
```bash
Solution:
1. Check network tab in DevTools
2. Verify API calls are successful
3. Check Redux state in Redux DevTools
4. Ensure user is authenticated
```

## 🔍 Debugging Tips

### Backend Debugging
```bash
# Enable detailed logging
NODE_ENV=development npm run server

# Check MongoDB connection
mongosh
use task-manager
db.users.find()
db.tasks.find()
```

### Frontend Debugging
```bash
# Install Redux DevTools Extension
# Chrome: https://chrome.google.com/webstore
# Firefox: https://addons.mozilla.org/

# Check console for errors
# Open DevTools (F12) > Console

# Check network requests
# Open DevTools (F12) > Network
```

### Common Console Errors

**Error:** `CORS policy blocked`
```javascript
Solution: Add to backend server.js:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**Error:** `Redux state undefined`
```javascript
Solution: Check store configuration in main.jsx:
<Provider store={store}>
  <App />
</Provider>
```


---

# API Documentation

## 🔐 Authentication Flow

### Registration Flow
```
1. User submits registration form
2. Backend validates input
3. Backend checks if email exists
4. Password is hashed with bcryptjs
5. User is created in database
6. JWT token is generated
7. User data + token returned
8. Frontend stores token in localStorage
9. User redirected to dashboard
```

### Login Flow
```
1. User submits login credentials
2. Backend finds user by email
3. Password is compared with hash
4. If valid, JWT token generated
5. User data + token returned
6. Frontend stores token in localStorage
7. User redirected to dashboard
```

### Protected Route Flow
```
1. Frontend sends request with token
2. Backend middleware extracts token
3. Token is verified with JWT_SECRET
4. User ID extracted from token
5. User fetched from database
6. User attached to request object
7. Request proceeds to controller
```

## 📋 Task Management Flow

### Create Personal Task
```
1. User clicks "Create Task"
2. Modal opens with form
3. User fills: title, description, status, due date
4. User leaves assignee empty
5. Frontend sends POST to /api/tasks
6. Backend creates task with creator ID
7. Task saved to database
8. Task returned to frontend
9. Redux state updated
10. UI refreshes with new task
```

### Create Assigned Task
```
1. User clicks "Create Task"
2. Modal opens with form
3. User fills all fields
4. User selects assignee from dropdown
5. Frontend sends POST with assignee ID
6. Backend validates assignee exists
7. Task created with creator + assignee
8. Task saved to database
9. Both users can now see task
10. UI refreshes
```

### Update Task (Personal)
```
1. User clicks "Edit" on personal task
2. Modal opens with current data
3. All fields are editable
4. User modifies any field
5. Frontend sends PUT to /api/tasks/:id
6. Backend verifies user is creator
7. All fields updated
8. Updated task returned
9. Redux state updated
10. UI refreshes
```

### Update Task (Assigned - Assignee)
```
1. Assignee clicks "Edit"
2. Modal opens
3. Only status field is editable
4. Other fields are disabled
5. Assignee changes status
6. Frontend sends PUT with status only
7. Backend verifies user is assignee
8. Only status is updated
9. Updated task returned
10. UI refreshes
```

### Update Task (Assigned - Assigner)
```
1. Assigner clicks "Edit"
2. Modal opens
3. Only due date field is editable
4. Other fields are disabled
5. Assigner changes due date
6. Frontend sends PUT with dueDate only
7. Backend verifies user is creator
8. Only due date is updated
9. Updated task returned
10. UI refreshes
```

### Delete Task
```
1. User clicks delete button
2. Confirmation dialog appears
3. User confirms deletion
4. Frontend sends DELETE to /api/tasks/:id
5. Backend verifies user is creator
6. Task removed from database
7. Success message returned
8. Redux state updated
9. Task removed from UI
10. Toast notification shown
```

## 🔄 State Management Flow

### Redux Actions Flow

#### Login Action
```javascript
1. dispatch(login({ email, password }))
2. Action type: 'auth/login/pending'
3. State: loading = true
4. API call to /api/auth/login
5. On success:
   - Action type: 'auth/login/fulfilled'
   - State: userInfo = data, loading = false
   - Token stored in localStorage
6. On error:
   - Action type: 'auth/login/rejected'
   - State: error = message, loading = false
```

#### Get Tasks Action
```javascript
1. dispatch(getTasks())
2. Action type: 'tasks/getTasks/pending'
3. State: loading = true
4. API call to /api/tasks with token
5. On success:
   - Action type: 'tasks/getTasks/fulfilled'
   - State: tasks = data, loading = false
6. On error:
   - Action type: 'tasks/getTasks/rejected'
   - State: error = message, loading = false
```

#### Create Task Action
```javascript
1. dispatch(createTask(taskData))
2. Action type: 'tasks/createTask/pending'
3. State: loading = true, success = false
4. API call to /api/tasks with data
5. On success:
   - Action type: 'tasks/createTask/fulfilled'
   - State: tasks.unshift(newTask)
   - State: loading = false, success = true
6. On error:
   - Action type: 'tasks/createTask/rejected'
   - State: error = message, loading = false
```

---

# Deployment Guide

## 🚀 Backend Deployment

### Option 1: Render.com (Recommended)

#### Step 1: Prepare Backend
```bash
# Ensure package.json has start script
"scripts": {
  "start": "node backend/server.js"
}
```

#### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"

#### Step 3: Configure Service
```
Name: task-manager-api
Environment: Node
Build Command: npm install
Start Command: npm start
```

#### Step 4: Set Environment Variables
```
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_production_secret
```

#### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment
3. Copy the service URL

### Option 2: Railway.app

#### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

#### Step 2: New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

#### Step 3: Configure
```
Root Directory: /
Build Command: npm install
Start Command: npm start
```

#### Step 4: Add Variables
```
NODE_ENV=production
MONGO_URI=your_atlas_uri
JWT_SECRET=your_secret
```

#### Step 5: Deploy
- Railway auto-deploys on push
- Get your service URL

### Option 3: Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create App
```bash
heroku create task-manager-api
```

#### Step 3: Set Config Vars
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_uri
heroku config:set JWT_SECRET=your_secret
```

#### Step 4: Deploy
```bash
git push heroku main
```

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended)

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 2: Create Netlify Account
1. Go to https://www.netlify.com
2. Sign up with GitHub

#### Step 3: Deploy
**Method A: Drag & Drop**
1. Drag `frontend/dist` folder to Netlify
2. Site is live!

**Method B: GitHub Integration**
1. Click "New site from Git"
2. Choose repository
3. Configure:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

#### Step 4: Add Redirects
Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

#### Step 5: Environment Variables
```
VITE_API_URL=https://your-backend-url.com
```

### Option 2: Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

#### Step 3: Configure
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

#### Step 4: Set Environment
```bash
vercel env add VITE_API_URL
# Enter your backend URL
```

### Option 3: GitHub Pages

#### Step 1: Install gh-pages
```bash
cd frontend
npm install --save-dev gh-pages
```

#### Step 2: Update package.json
```json
{
  "homepage": "https://yourusername.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Step 3: Deploy
```bash
npm run deploy
```

## 🔗 Connecting Frontend to Backend

### Update Frontend API Calls

#### Option 1: Environment Variable
```javascript
// Create .env in frontend
VITE_API_URL=https://your-backend-url.com

// Update axios calls
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

#### Option 2: Direct URL
```javascript
// In authSlice.js and taskSlice.js
const { data } = await axios.post(
  'https://your-backend-url.com/api/auth/login',
  credentials
);
```

### Update CORS in Backend
```javascript
// backend/server.js
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.netlify.app'
  ],
  credentials: true
}));
```

## ✅ Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set
- [ ] CORS configured for frontend URL
- [ ] Build successful
- [ ] API endpoints working
- [ ] Database connected

### Frontend
- [ ] Build successful (`npm run build`)
- [ ] Environment variables set
- [ ] API URL updated
- [ ] Redirects configured
- [ ] Routes working
- [ ] Assets loading

### Testing
- [ ] Register new user works
- [ ] Login works
- [ ] Create task works
- [ ] Update task works
- [ ] Delete task works
- [ ] Mobile responsive
- [ ] All features functional

## 🔒 Production Security

### Backend Security
```javascript
// Use helmet for security headers
import helmet from 'helmet';
app.use(helmet());

// Rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Sanitize data
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize());
```

### Environment Variables
```env
# Never commit these!
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=super_long_random_string_here
```

### HTTPS
- Render/Railway/Netlify provide HTTPS automatically
- For custom domains, use Let's Encrypt

---

# 📚 Additional Resources

## Documentation Links
- **MongoDB:** https://docs.mongodb.com/
- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **Redux Toolkit:** https://redux-toolkit.js.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **Framer Motion:** https://www.framer.com/motion/

## Useful Tools
- **Postman:** API testing - https://www.postman.com/
- **MongoDB Compass:** Database GUI - https://www.mongodb.com/products/compass
- **Redux DevTools:** State debugging - https://github.com/reduxjs/redux-devtools

## Learning Resources
- **MERN Stack:** https://www.mongodb.com/mern-stack
- **JWT:** https://jwt.io/
- **REST API:** https://restfulapi.net/

---

# 🎯 Summary

This complete documentation covers:

✅ **Backend Implementation**
- Express.js server setup
- MongoDB models and schemas
- JWT authentication
- Role-based authorization
- API endpoints

✅ **Frontend Implementation**
- React components
- Redux state management
- Routing and navigation
- Framer Motion animations
- Toast notifications

✅ **Mobile Responsive Design**
- Tailwind CSS breakpoints
- Responsive components
- Mobile hamburger menu
- Touch-friendly UI
- Tested on all devices

✅ **Complete Setup**
- Installation steps
- Environment configuration
- Running the application
- Testing procedures
- Troubleshooting guide

✅ **Deployment**
- Backend deployment options
- Frontend deployment options
- Environment variables
- Security best practices
- Production checklist

---

**Made with ❤️ for the Full Stack Developer Assignment**

For questions or issues, please refer to the troubleshooting section or contact the development team.
