# 🚀 Quick Start Guide - SmartResponse Frontend

This guide will help you get the SmartResponse frontend up and running in minutes.

## Prerequisites

Make sure you have these installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** ([Install](https://pnpm.io/installation))
- **Backend API** running on `http://localhost:3000`

## Step-by-Step Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install:

- Next.js
- TanStack Router, Forms, and Table
- Axios for API calls
- Zustand for state management
- Tailwind CSS for styling
- And more...

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and set your API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
pnpm dev
```

The app will start at: **http://localhost:3001**

(If port 3000 is taken by the backend, Next.js will automatically use 3001)

## 🎯 First Steps

### 1. Create an Account

1. Open http://localhost:3001
2. Click **"Get Started"** or **"Sign Up"**
3. Fill in your details:
   - First Name
   - Last Name
   - Email
   - Phone (optional)
   - Password
4. Click **"Create Account"**

### 2. Sign In

If you already have an account:

1. Click **"Sign In"**
2. Enter your email and password
3. Click **"Sign In"**

Or use **Google OAuth** for faster login!

### 3. Explore the Dashboard

After signing in, you'll see:

- **Statistics**: Total accidents, dispatches, response time
- **Quick Actions**: Report accident, view accidents, manage vehicles
- **Recent Accidents**: Latest activity

### 4. Report Your First Accident

1. Click **"Report Accident"** from dashboard
2. Fill in the details:
   - **Description**: What happened?
   - **Location**: Click "Use Current Location" or enter manually
   - **Vehicle** (optional): Select from your registered vehicles
   - **Images**: Upload 1-5 photos (required)
3. Click **"Report Accident"**

The AI will analyze the images and determine severity!

### 5. View All Accidents

1. Navigate to **"Accidents"** from the sidebar
2. Use the search bar to filter
3. Click column headers to sort
4. Click any row to view details

## 📱 Navigation Overview

### Sidebar Menu

- **Dashboard** - Overview and statistics
- **Report Accident** - Submit new accident report
- **Accidents** - View all accidents (table with filters)
- **Emergency Services** - Directory of services
- **My Vehicles** - Manage your vehicles
- **Profile** - Update your information

### User Menu

Located at the bottom of the sidebar:

- Profile picture with initials
- User name and email
- **Logout** button

## 🎨 Features to Try

### 1. TanStack Forms in Action

The accident report form demonstrates:

- Real-time validation
- Error messages
- Multi-step workflow
- File upload with preview

### 2. TanStack Table in Action

The accidents list shows:

- Sortable columns
- Global search
- Pagination
- Custom cell rendering

### 3. Image Upload

Try uploading multiple accident photos:

- Drag & drop support
- Preview before submit
- Remove unwanted images
- Max 5 images per report

### 4. Location Detection

Test the GPS feature:

- Click "Use Current Location"
- Browser will ask for permission
- Coordinates auto-fill
- Address reverse-geocoded

## 🔧 Development Tips

### Hot Reload

The dev server supports hot reload:

- Edit any file
- Save
- Browser updates automatically

### TypeScript Support

Full TypeScript coverage:

- Autocomplete in VS Code
- Type checking
- IntelliSense

### Tailwind CSS

Use Tailwind utility classes:

```tsx
<div className="bg-red-600 text-white px-4 py-2 rounded-lg">Button</div>
```

### API Services

All API calls are abstracted:

```typescript
import { accidentService } from "@/lib/api";

// Report accident
await accidentService.reportAccident(data);

// Get accidents
const accidents = await accidentService.getAccidents();
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3001 is taken:

```bash
# Specify a different port
PORT=3002 pnpm dev
```

### API Connection Error

If you see connection errors:

1. Check backend is running: `http://localhost:3000`
2. Verify `.env.local` has correct API URL
3. Check for CORS issues in backend

### Module Not Found

If you see import errors:

```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### Type Errors

If TypeScript complains:

```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

## 🎓 Learning Resources

### TanStack Documentation

- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Forms](https://tanstack.com/form/latest)
- [TanStack Table](https://tanstack.com/table/latest)

### Next.js Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)

### Tailwind CSS

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Utility Classes](https://tailwindcss.com/docs/utility-first)

## 📝 Project Structure Quick Reference

```
Key Directories:
├── app/              → Pages (Next.js App Router)
├── components/       → Reusable components
├── lib/api/         → API client & services
├── lib/stores/      → State management
└── lib/router/      → Routing configuration

Key Files:
├── .env.local           → Environment variables
├── lib/api/config.ts    → API endpoints
├── lib/api/services.ts  → API functions
└── lib/api/types.ts     → TypeScript types
```

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Dev server starts without errors
- [ ] Homepage loads at http://localhost:3001
- [ ] Can navigate to sign up page
- [ ] Can create an account
- [ ] Can sign in with credentials
- [ ] Dashboard loads after login
- [ ] Sidebar navigation works
- [ ] Can access accident report form
- [ ] Can upload images
- [ ] Can view accidents table
- [ ] Logout works correctly

## 🚀 Next Steps

Now that you're set up:

1. **Explore the UI** - Click around and test features
2. **Report an accident** - Try the full workflow
3. **Check the code** - Review components and services
4. **Customize** - Modify colors, text, or features
5. **Build features** - Add new pages or functionality

## 💡 Pro Tips

1. **Use React DevTools**: Install the browser extension for debugging
2. **Check Network Tab**: Monitor API calls in browser DevTools
3. **Read Console**: Watch for errors or warnings
4. **Use TypeScript**: Let types guide your development
5. **Follow Patterns**: Match existing code structure

## 🆘 Need Help?

If you get stuck:

1. Check the [README.md](README.md) for detailed documentation
2. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture details
3. Check the backend API documentation
4. Review error messages carefully
5. Search for similar issues online

## 🎉 You're Ready!

You now have a fully functional Smart Accident Report System frontend. Start exploring, testing, and building!

Happy coding! 🚀

---

**SmartResponse** - Making emergency response smarter, one accident at a time.
