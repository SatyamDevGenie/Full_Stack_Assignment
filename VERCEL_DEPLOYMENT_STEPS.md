# Vercel Deployment Steps for Frontend

## Prerequisites
✅ Backend already deployed on Render: `https://full-stack-assignment-igcn.onrender.com`
✅ Frontend configured to use deployed backend URL
✅ `vercel.json` configuration file created
✅ Build script added to root `package.json`

## Step-by-Step Deployment Guide

### Step 1: Push Your Code to GitHub
```bash
cd my-task
git add .
git commit -m "Ready for Vercel deployment"
git push origin master
```

### Step 2: Sign Up / Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 3: Import Your Project
1. Click "Add New..." → "Project"
2. Find your repository: `SatyamDevGenie/Full_Stack_Assignment`
3. Click "Import"

### Step 4: Configure Project Settings
Vercel will auto-detect your configuration from `vercel.json`, but verify:

**Framework Preset:** Vite
**Root Directory:** `./` (leave as root)
**Build Command:** `cd frontend && npm install && npm run build` (auto-detected from vercel.json)
**Output Directory:** `frontend/dist` (auto-detected from vercel.json)
**Install Command:** `npm install --prefix frontend` (auto-detected from vercel.json)

### Step 5: Add Environment Variables
Click "Environment Variables" and add:

**Variable Name:** `VITE_API_URL`
**Value:** `https://full-stack-assignment-igcn.onrender.com`
**Environment:** Production, Preview, Development (select all)

### Step 6: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Once deployed, you'll get a URL like: `https://your-project-name.vercel.app`

### Step 7: Test Your Deployment
1. Visit your Vercel URL
2. Try registering a new user
3. Login and create tasks
4. Test all features (create, update, delete tasks)
5. Test mobile responsiveness

### Step 8: Get Your Deployment Link
Your frontend will be live at: `https://your-project-name.vercel.app`

## Important Files Already Configured

### ✅ vercel.json
```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install --prefix frontend",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### ✅ frontend/.env
```env
VITE_API_URL=https://full-stack-assignment-igcn.onrender.com
```

### ✅ frontend/src/config/api.js
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://full-stack-assignment-igcn.onrender.com';
export default API_BASE_URL;
```

### ✅ Root package.json (build script)
```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "install-frontend": "cd frontend && npm install"
  }
}
```

### ✅ Backend CORS (already configured)
```javascript
app.use(cors({
  origin: true, // Accept all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Troubleshooting

### If Build Fails
1. Check Vercel build logs
2. Ensure `vercel.json` is in root directory
3. Verify `frontend/package.json` has `"build": "vite build"` script

### If API Calls Fail
1. Check browser console for CORS errors
2. Verify environment variable `VITE_API_URL` is set in Vercel
3. Ensure backend on Render is running
4. Check backend CORS configuration accepts all origins

### If Routes Don't Work (404 on refresh)
- The `rewrites` in `vercel.json` handles this automatically
- All routes redirect to `/index.html` for React Router

## Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments
- Every push to `master` branch will trigger automatic deployment
- Preview deployments created for pull requests
- Rollback available from Vercel dashboard

## Final Checklist
- [ ] Code pushed to GitHub
- [ ] Vercel project created and imported
- [ ] Environment variable `VITE_API_URL` added
- [ ] Deployment successful
- [ ] Frontend accessible via Vercel URL
- [ ] Login/Register working
- [ ] Task CRUD operations working
- [ ] Mobile responsive design working
- [ ] Backend on Render responding to frontend requests

## Your Deployment URLs
- **Backend (Render):** https://full-stack-assignment-igcn.onrender.com
- **Frontend (Vercel):** https://your-project-name.vercel.app (you'll get this after deployment)

## Sample Credentials for Testing
After deployment, create these test users:

**User 1:**
- Email: satyam@test.com
- Password: Test@123

**User 2:**
- Email: vedang@test.com
- Password: Test@123

---

**Note:** Your backend is already deployed on Render and configured to accept requests from any origin. The frontend deployment on Vercel will work seamlessly with your existing backend.
