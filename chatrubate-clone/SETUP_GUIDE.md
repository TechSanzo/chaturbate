# 🚀 ChatHub Setup Guide

Welcome to ChatHub! This guide will help you set up the Chaturbate-style live video chat platform.

## 📋 What's Included

✅ **Completed Features:**
- User registration and authentication (Models & Viewers)
- Role-based routing and access control
- Modern responsive UI with Tailwind CSS
- Supabase integration for authentication and database
- Complete project structure ready for expansion

🔄 **Ready for Implementation:**
- Model dashboard with streaming controls
- Live stream rooms with video
- Real-time chat functionality
- WebRTC video streaming setup

## 🛠️ Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Supabase account** - [Sign up at supabase.com](https://supabase.com)

## 🎯 Quick Setup (5 minutes)

### Option 1: Automated Setup
```bash
# Run the setup script
./scripts/setup.sh
```

### Option 2: Manual Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Set up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click "Run" to create all tables and policies

#### 3. Configure Environment

1. Copy the environment template:
```bash
cp .env .env.local  # or edit .env directly
```

2. Get your Supabase credentials:
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key

3. Update `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_STUN_SERVERS=stun:stun.l.google.com:19302
```

#### 4. Start Development Server
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see your application! 🎉

## 🧪 Testing the Setup

1. **Homepage**: Should load with ChatHub branding
2. **Sign Up**: Try creating both Model and Viewer accounts
3. **Login**: Test authentication flow
4. **Role Routing**: Models → Dashboard, Viewers → Browse page

## 🎨 UI Components Included

- **Authentication Pages**: Login and signup with role selection
- **Navigation**: Role-based navigation with user profiles
- **Layouts**: Responsive main layout with header and footer
- **Protected Routes**: Automatic redirects based on authentication status

## 🗄️ Database Schema

The following tables are automatically created:

- `users` - User profiles for models and viewers
- `streams` - Live streaming sessions
- `messages` - Real-time chat messages
- `tips` - Credit transactions
- `private_shows` - 1-on-1 paid sessions (Phase 2)

All tables include Row Level Security (RLS) policies for data protection.

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

## 📱 What's Next?

The foundation is ready! Next implementation priorities:

1. **Model Dashboard** - Stream management interface
2. **WebRTC Integration** - Live video streaming
3. **Real-time Chat** - Supabase Realtime messaging
4. **Credit System** - Tipping and payments (Phase 2)

## 🆘 Troubleshooting

### Build Errors
- Check Node.js version: `node --version` (needs 18+)
- Clear dependencies: `rm -rf node_modules && npm install`

### Authentication Issues
- Verify Supabase URL and keys in `.env`
- Check Supabase project status in dashboard
- Ensure RLS policies are enabled

### Database Errors
- Confirm `schema.sql` was executed successfully
- Check Supabase logs in the dashboard
- Verify table creation in the Table Editor

### Styling Issues
- Ensure Tailwind CSS is configured properly
- Check PostCSS configuration
- Verify `@tailwindcss/postcss` plugin is installed

## 📞 Need Help?

1. Check the main [README.md](README.md) for detailed documentation
2. Review Supabase dashboard for database issues
3. Open browser console for client-side errors
4. Create an issue with error details and steps to reproduce

## 🎉 Success!

If everything is working, you should see:
- ✅ Homepage loads with ChatHub branding
- ✅ Signup/login forms work correctly
- ✅ Role-based navigation functions
- ✅ No console errors in browser

You're now ready to start building the live streaming features! 🚀

---

**Happy coding!** 💻✨