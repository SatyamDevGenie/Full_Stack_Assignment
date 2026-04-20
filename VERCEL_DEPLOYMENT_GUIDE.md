# Vercel Deployment Guide

## ✅ Issue Fixed

The error `Missing script: "build"` has been resolved by:

1. **Created `vercel.json`** - Tells Vercel how to build the frontend
2. **Updated `package.json`** - Added build script for Vercel

---

## 🚀 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

#### Step 1: Push Changes to GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin master
```

#### Step 2: Import Project to Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository: `SatyamDevGenie/Full_Stack_Assignment`

#### Step 3: Configure Project
```
Framework Preset: Other
Root Directory: ./
Build Command: npm run build
Output Directory: frontend/dist
Install Command: npm install --prefix frontend
```

#### Step 4: Add Environment Variable
Click "Environment Variables" and add:
```
Name: VITE_API_URL
Value: https://full-stack-assignment-igcn.onrender.com
```

#### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live!

---

### Method 2: Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
# From root directory
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# Project name? full-stack-assignment
# Directory? ./
# Override settings? No
```

#### Step 4: Set Environment Variable
```bash
vercel env add VITE_API_URL production
# Enter: https://full-stack-assignment-igcn.onrender.com
```

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## 📁 Files Created/Modified

### 1. `vercel.json` (New)
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install --prefix frontend",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. `package.json` (Updated)
Added scripts:
```json
"build": "cd frontend && npm install && npm run build",
"install-frontend": "cd frontend && npm install"
```

---

## ✅ Deployment Checklist

Before deploying:
- [x] `vercel.json` created
- [x] Build script added to `package.json`
- [x] Frontend `.env` has backend URL
- [x] Backend CORS configured
- [x] Changes pushed to GitHub

After deploying:
- [ ] Site is live
- [ ] Environment variable set
- [ ] Test registration
- [ ] Test login
- [ ] Test task creation
- [ ] Test mobile responsiveness

---

## 🧪 Test Your Deployment

Once deployed, test these features:

### 1. Registration
1. Go to your Vercel URL
2. Click "Sign up"
3. Register a new user
4. Should redirect to dashboard

### 2. Login
1. Logout
2. Login with registered credentials
3. Should see dashboard

### 3. Tasks
1. Create a personal task
2. Create an assigned task
3. Edit tasks
4. Delete tasks
5. Test all filters

### 4. Mobile
1. Open on mobile device
2. Test hamburger menu
3. Test all features
4. Check responsiveness

---

## 🐛 Troubleshooting

### Issue: Build Failed
**Error:** `Missing script: "build"`

**Solution:**
1. Make sure `vercel.json` exists in root
2. Make sure `package.json` has build script
3. Push changes to GitHub
4. Redeploy

### Issue: Blank Page After Deploy
**Error:** White screen, no content

**Solution:**
1. Check browser console for errors
2. Verify `VITE_API_URL` environment variable is set
3. Check Network tab for API calls
4. Ensure backend is running

### Issue: CORS Error
**Error:** `Access blocked by CORS policy`

**Solution:**
1. Update backend `server.js` CORS config
2. Add your Vercel URL to allowed origins:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app', // Add this
];
```
3. Redeploy backend on Render

### Issue: API Calls Failing
**Error:** `Network Error` or `404`

**Solution:**
1. Check environment variable is set correctly
2. Verify backend URL: https://full-stack-assignment-igcn.onrender.com
3. Test backend directly in browser
4. Check browser console for exact error

---

## 🔄 Update Deployment

### Update Code
```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin master

# Vercel auto-deploys on push
```

### Update Environment Variable
```bash
# Via CLI
vercel env rm VITE_API_URL production
vercel env add VITE_API_URL production

# Or via Dashboard
# Go to Project Settings → Environment Variables
```

---

## 📊 Vercel Dashboard Features

After deployment, you can:
- View deployment logs
- Check build status
- Monitor analytics
- Set custom domain
- Configure environment variables
- View deployment history

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain
1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed
5. Wait for DNS propagation

---

## 💡 Pro Tips

1. **Automatic Deployments**
   - Vercel auto-deploys on every push to master
   - Preview deployments for pull requests

2. **Environment Variables**
   - Set different values for production/preview
   - Never commit `.env` files

3. **Build Optimization**
   - Vercel caches dependencies
   - Subsequent builds are faster

4. **Monitoring**
   - Check Analytics tab for usage
   - Monitor build times
   - Track errors

---

## 📝 Summary

Your project is now configured for Vercel deployment with:

✅ **Backend:** Deployed on Render
- URL: https://full-stack-assignment-igcn.onrender.com
- CORS configured
- All APIs working

✅ **Frontend:** Ready for Vercel
- `vercel.json` configured
- Build script added
- Environment variable ready
- API calls integrated

✅ **Next Steps:**
1. Push to GitHub
2. Import to Vercel
3. Set environment variable
4. Deploy!

---

## 🎉 You're Ready!

Just follow the steps above and your full-stack application will be live on Vercel!

**Questions?** Check the troubleshooting section or refer to:
- Vercel Docs: https://vercel.com/docs
- Your Backend: https://full-stack-assignment-igcn.onrender.com
