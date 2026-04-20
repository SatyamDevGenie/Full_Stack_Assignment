# Quick Reference Guide

> **Fast access to common commands and information**

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd my-task
npm install
cd frontend && npm install && cd ..

# 2. Create .env file
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

# 3. Run application
npm run dev
```

**Access:** http://localhost:5173

---

## 👥 Sample Users

| Name | Email | Password |
|------|-------|----------|
| Satyam Sawant | satyam@gmail.com | 123456 |
| Aftab Mulani | aftab@gmail.com | 123456 |
| Vikas Sharma | vikas@gmail.com | 123456 |

---

## 📦 Common Commands

### Development
```bash
npm run dev          # Run both frontend & backend
npm run server       # Backend only
npm run client       # Frontend only
```

### Production
```bash
npm start            # Backend production
cd frontend && npm run build  # Build frontend
```

### Testing
```bash
# Manual testing
1. Register 2 users
2. Create personal task
3. Create assigned task
4. Test permissions
```

---

## 🔌 API Endpoints

### Auth
```
POST /api/auth/register    # Register
POST /api/auth/login       # Login
GET  /api/auth/profile     # Get profile
GET  /api/auth/users       # Get all users
```

### Tasks
```
GET    /api/tasks          # Get all tasks
POST   /api/tasks          # Create task
GET    /api/tasks/:id      # Get task
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT, bcryptjs
**Frontend:** React 19, Redux Toolkit, Tailwind CSS, Framer Motion
**Tools:** Vite, Axios, React Router, React Toastify

---

## 📱 Responsive Breakpoints

```
Mobile:  < 640px   (sm)
Tablet:  640-1024px (md)
Desktop: > 1024px  (lg)
```

---

## 🔐 Permissions

### Personal Tasks
- **Creator:** Edit all, Delete

### Assigned Tasks
- **Assignee:** Edit status only
- **Assigner:** Edit due date only, Delete

---

## 🐛 Quick Fixes

### Backend won't start
```bash
# Check MongoDB
mongod --version

# Check port
netstat -ano | findstr :5000

# Reinstall
rm -rf node_modules
npm install
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules
npm install
```

### Auth issues
```bash
# Clear localStorage
localStorage.clear()

# Check token
console.log(localStorage.getItem('userInfo'))
```

---

## 📂 Project Structure

```
my-task/
├── backend/
│   ├── controllers/    # Business logic
│   ├── models/        # DB schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Auth & errors
│   └── server.js      # Entry point
├── frontend/
│   └── src/
│       ├── components/  # UI components
│       ├── pages/      # Page views
│       ├── store/      # Redux
│       └── App.jsx     # Main app
└── .env               # Config
```

---

## 🚀 Deployment URLs

### Backend Options
- Render: https://render.com
- Railway: https://railway.app
- Heroku: https://heroku.com

### Frontend Options
- Netlify: https://netlify.com
- Vercel: https://vercel.com
- GitHub Pages: https://pages.github.com

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://...
JWT_SECRET=your_secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## ✅ Testing Checklist

- [ ] Register user
- [ ] Login user
- [ ] Create personal task
- [ ] Edit personal task
- [ ] Delete personal task
- [ ] Create assigned task
- [ ] Edit as assignee (status only)
- [ ] Edit as assigner (due date only)
- [ ] Test all filters
- [ ] Test mobile menu
- [ ] Test responsive layout

---

## 📞 Support

**Documentation:** See COMPLETE_DOCUMENTATION.md
**Issues:** Check troubleshooting section
**Updates:** Pull latest from GitHub

---

**Last Updated:** 2024
