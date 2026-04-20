# Task Management System - Frontend

## Overview
A modern, responsive React frontend for the Task Management System with Redux Toolkit state management, Tailwind CSS styling, and Framer Motion animations.

## Tech Stack
- **Framework:** React 19
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Notifications:** React Toastify
- **HTTP Client:** Axios
- **Build Tool:** Vite

## Features
✅ User authentication (Login/Register)
✅ Protected routes
✅ Task CRUD operations
✅ Personal and assigned tasks
✅ Role-based permissions UI
✅ Task filtering (All, Personal, Assigned, Status-based)
✅ Responsive design
✅ Smooth animations
✅ Toast notifications
✅ Loading states
✅ Empty states

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx       # Empty state component
│   │   ├── FilterTabs.jsx       # Task filter tabs
│   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── PrivateRoute.jsx     # Route protection
│   │   ├── TaskCard.jsx         # Task display card
│   │   └── TaskModal.jsx        # Task create/edit modal
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Login.jsx            # Login page
│   │   └── Register.jsx         # Registration page
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js     # Auth state management
│   │   │   └── taskSlice.js     # Task state management
│   │   └── store.js             # Redux store configuration
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.cjs
```

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies (already installed):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Features Breakdown

### Authentication
- **Login Page:** Email/password authentication with validation
- **Register Page:** User registration with password confirmation
- **Auto-redirect:** Logged-in users redirected to dashboard
- **Persistent auth:** User info stored in localStorage

### Dashboard
- **Task Overview:** View all tasks in card layout
- **Filter Tabs:** 
  - All Tasks
  - Personal Tasks
  - Assigned by Me
  - Assigned to Me
  - Todo
  - In Progress
  - Done
- **Create Task:** Modal for creating new tasks
- **Responsive Grid:** Adapts to screen size

### Task Management

#### Personal Tasks
- Creator can edit: Title, Description, Status, Due Date
- Creator can delete task
- No assignee

#### Assigned Tasks
**Assignee Permissions:**
- Can only update Status
- Cannot edit Title, Description, or Due Date
- Cannot delete task

**Assigner Permissions:**
- Can only update Due Date
- Cannot edit Status, Title, or Description
- Can delete task

### UI/UX Features
- **Framer Motion Animations:**
  - Page transitions
  - Card hover effects
  - Modal animations
  - Button interactions
  
- **Toast Notifications:**
  - Success messages
  - Error messages
  - Auto-dismiss after 3 seconds

- **Loading States:**
  - Spinner during data fetch
  - Button loading states
  
- **Empty States:**
  - Contextual messages based on filter
  - Call-to-action buttons

## API Integration

The frontend connects to the backend API via Axios with proxy configuration in `vite.config.js`:

```javascript
proxy: {
  "/api": {
    target: "http://localhost:5000",
    changeOrigin: true,
    secure: false,
  },
}
```

### API Endpoints Used
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/users` - Get all users (for assignment)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Redux State Management

### Auth Slice
```javascript
{
  userInfo: { _id, name, email, token },
  loading: boolean,
  error: string | null,
  users: []
}
```

### Task Slice
```javascript
{
  tasks: [],
  currentTask: null,
  loading: boolean,
  error: string | null,
  success: boolean
}
```

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom gradient backgrounds
- Responsive design utilities
- Custom animations in `tailwind.config.cjs`

### Color Scheme
- Primary: Blue (500-600)
- Secondary: Purple (500-600)
- Success: Green (500-600)
- Warning: Yellow (500-600)
- Danger: Red (500-600)

## Component Details

### TaskCard
- Displays task information
- Status badge with color coding
- Due date display
- Assignee/Assigner information
- Edit and Delete buttons
- Hover animations

### TaskModal
- Create/Edit mode
- Field-level permissions
- Form validation
- User selection dropdown
- Responsive design
- Permission notices

### FilterTabs
- 7 filter options
- Active state styling
- Smooth transitions
- Horizontal scroll on mobile

## Responsive Design
- **Mobile:** Single column layout
- **Tablet:** 2 column grid
- **Desktop:** 3 column grid
- Responsive navigation
- Touch-friendly buttons

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

### Adding New Features
1. Create component in `src/components/`
2. Add Redux slice if needed in `src/store/slices/`
3. Update routes in `App.jsx`
4. Add API calls in slice thunks

### Debugging
- Redux DevTools for state inspection
- React DevTools for component tree
- Console logs for API responses
- Toast messages for user feedback

## Production Build

```bash
npm run build
```

Output in `dist/` directory ready for deployment.

## Deployment

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Vercel
1. Import project
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## Environment Variables
Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:5000
```

## Known Issues
None currently

## Future Enhancements
- Task search functionality
- Task sorting options
- Task priority levels
- Task comments/notes
- File attachments
- Email notifications
- Dark mode
- Task categories/tags
- Drag and drop task reordering
- Calendar view

## Contributing
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License
MIT
