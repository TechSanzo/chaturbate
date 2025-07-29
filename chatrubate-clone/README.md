# ChatHub - Live Video Chat Platform

A Chaturbate-style live video chat platform built with React, Supabase, and WebRTC.

## 🚀 Features

### Phase 1 (MVP) - ✅ COMPLETED
- ✅ User registration and authentication (Models & Viewers)
- ✅ Role-based routing and permissions
- ✅ Modern responsive UI with Tailwind CSS
- ✅ Supabase integration for auth and database
- 🔄 Model dashboard with stream controls (In Progress)
- 🔄 Live stream rooms (In Progress)
- 🔄 Real-time chat functionality (In Progress)
- 🔄 WebRTC video streaming (In Progress)

### Phase 2 (Planned)
- 💳 Credit system with Stripe integration
- 💰 Tipping system
- 🎥 Private 1-on-1 shows
- 📊 Model earnings dashboard
- 🏆 Token leaderboards

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS |
| **Authentication** | Supabase Auth |
| **Database** | Supabase PostgreSQL |
| **Real-time** | Supabase Realtime |
| **Video** | WebRTC (Simple-Peer) |
| **Routing** | React Router v6 |

## 📁 Project Structure

```
chatrubate-clone/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   ├── utils/          # Utilities and helpers
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Future Express/FastAPI backend
├── supabase/               # Database schema and config
│   └── schema.sql          # Database tables and policies
├── scripts/                # Setup and utility scripts
└── .env                    # Environment variables
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))

### 1. Clone and Install

```bash
git clone <your-repo>
cd chatrubate-clone
cd frontend
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the SQL schema in the Supabase SQL Editor:

```sql
-- Copy and paste the contents from supabase/schema.sql
```

### 3. Configure Environment

Create `.env` in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# WebRTC STUN servers
VITE_STUN_SERVERS=stun:stun.l.google.com:19302
```

### 4. Start Development Server

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📋 Database Schema

### Core Tables

- **users**: User profiles (models & viewers)
- **streams**: Live stream sessions
- **messages**: Real-time chat messages
- **tips**: Credit transactions
- **private_shows**: 1-on-1 paid sessions (Phase 2)

### Key Features

- Row Level Security (RLS) policies
- Real-time subscriptions
- Optimized indexes for performance
- UUID primary keys for security

## 🔐 Authentication Flow

1. **Signup**: Users choose role (Model/Viewer) during registration
2. **Email Verification**: Supabase handles email confirmation
3. **Role-based Routing**: Automatic redirect based on user role
4. **Session Management**: Persistent login with refresh tokens

## 🎯 User Roles

### 👤 Viewers
- Browse and watch live streams
- Chat with models and other viewers
- Tip models with credits
- Request private shows

### 🎭 Models
- Create and manage live streams
- Earn credits from tips and shows
- Chat with viewers
- Set custom rates for private shows

## 🔄 Development Status

### ✅ Completed
- [x] Project structure and dependencies
- [x] Supabase integration and database schema
- [x] Authentication system with role selection
- [x] Responsive UI with Tailwind CSS
- [x] React Router setup with protected routes
- [x] Type-safe interfaces and utilities

### 🔄 In Progress
- [ ] Model dashboard with stream controls
- [ ] Live stream room interface
- [ ] WebRTC video streaming
- [ ] Real-time chat system

### 📋 Next Steps
- [ ] Credit/tipping system
- [ ] Private show functionality
- [ ] Mobile responsiveness improvements
- [ ] Performance optimizations

## 🚦 API Endpoints

The application uses Supabase's auto-generated REST API and real-time subscriptions.

### Key Operations
- `auth.*` - Authentication operations
- `db.getStreams()` - Fetch live streams
- `db.sendMessage()` - Send chat messages
- `realtime.subscribeToMessages()` - Real-time chat updates

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run tsc

# Linting
npm run lint
```

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Review the Supabase console for database errors
3. Verify environment variables are set correctly
4. Check browser console for client-side errors

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

### Database (Supabase)
- Already hosted on Supabase cloud
- Automatic backups and scaling
- Production-ready out of the box

---

**Happy Coding! 🎉**

Built with ❤️ using React, Supabase, and modern web technologies.