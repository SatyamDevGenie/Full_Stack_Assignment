# Deployment Setup Guide

## ✅ Backend Deployed on Render

**Deployed URL:** https://full-stack-assignment-igcn.onrender.com

### Backend Configuration Complete

1. **CORS Setup** ✅
   - Configured to accept requests from any origin
   - Supports credentials
   - Allows all necessary HTTP methods

2. **Environment Variables on Render** ✅
   Make sure these are set in your Render dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```

3. **API Endpoints Available:**
   - Health Check: https://full-stack-assignment-igcn.onrender.com/
   - Auth: https://full-stack-assignment-igcn.onrender.com/api/auth/*
   - Tasks: https://full-stack-assignment-igcn.onrender.com/api/tasks/*

---

## 🌐 Frontend Integration Complete

### Changes Made:

1. **API Configuration File Created**
   - Location: `frontend/src/config/api.js`
   - Uses environment variable or defaults to Render URL

2. **Redux Slices Updated**
   - `authSlice.js` - All API calls now use deployed backend
   - `taskSlice.js` - All API calls now use deployed backend

3. **Environment File Created**
   - Location: `frontend/.env`
   - Contains: `VITE_API_URL=https://full-stack-assignment-igcn.onrender.com`

4. **Vite Proxy Removed**
   - No longer needed since we're using absolute URLs

---

## 🚀 Deploy Frontend

### Option 1: Netlify (Recommended)

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 2: Deploy to Netlify
1. Go to https://netlify.com
2. Sign up/Login
3. Drag & drop the `frontend/dist` folder
4. Or connect GitHub repository

#### Step 3: Configure Netlify
Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

#### Step 4: Set Environment Variable (Optional)
In Netlify dashboard:
```
VITE_API_URL=https://full-stack-assignment-igcn.onrender.com
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

#### Step 4: Set Environment Variable
```bash
vercel env add VITE_API_URL
# Enter: https://full-stack-assignment-igcn.onrender.com
```

---

## 🧪 Testing Deployed Backend

### Test API Health
```bash
curl https://full-stack-assignment-igcn.onrender.com/
# Should return: ✅ API is running...
```

### Test Registration
```bash
curl -X POST https://full-stack-assignment-igcn.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Test Login
```bash
curl -X POST https://full-stack-assignment-igcn.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

---

## 🔧 Local Development

### Run with Deployed Backend
```bash
# Frontend will use deployed backend automatically
cd frontend
npm run dev
```

### Run with Local Backend
1. Update `frontend/.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```

2. Start local backend:
   ```bash
   npm run server
   ```

3. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

---

## ⚠️ Important Notes

### Render Free Tier
- Backend may sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier

### CORS Issues
If you encounter CORS errors:
1. Check backend CORS configuration in `server.js`
2. Ensure your frontend URL is in allowed origins
3. Redeploy backend after changes

### Environment Variables
- Frontend: Uses `VITE_API_URL` from `.env`
- Backend: Uses `MONGO_URI`, `JWT_SECRET` from Render dashboard

---

## ✅ Deployment Checklist

### Backend (Render)
- [x] Deployed to Render
- [x] Environment variables set
- [x] CORS configured
- [x] MongoDB connected
- [x] API endpoints working

### Frontend
- [ ] Build successful (`npm run build`)
- [ ] Environment variable set
- [ ] API calls updated
- [ ] Deployed to Netlify/Vercel
- [ ] Test all features

### Testing
- [ ] Register new user
- [ ] Login works
- [ ] Create task works
- [ ] Update task works
- [ ] Delete task works
- [ ] Mobile responsive
- [ ] All filters work

---

## 🐛 Troubleshooting

### Issue: CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
1. Check backend `server.js` CORS configuration
2. Add your frontend URL to allowed origins
3. Redeploy backend

### Issue: Network Error
```
Error: Network Error
```
**Solution:**
1. Check backend is running: https://full-stack-assignment-igcn.onrender.com/
2. Wait 60 seconds if backend was sleeping
3. Check browser console for details

### Issue: 401 Unauthorized
```
Error: Not authorized, no token
```
**Solution:**
1. Clear localStorage
2. Login again
3. Check token is being sent in headers

---

## 📞 Support

**Backend URL:** https://full-stack-assignment-igcn.onrender.com
**Documentation:** See COMPLETE_DOCUMENTATION.md
**Issues:** Check troubleshooting section above

---

**Deployment Complete!** 🎉

Your backend is live and frontend is configured to use it.
Now deploy your frontend to Netlify or Vercel!
