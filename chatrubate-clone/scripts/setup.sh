#!/bin/bash

# ChatHub Setup Script
echo "🎬 Setting up ChatHub - Live Video Chat Platform"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    echo "✅ Node.js version: $NODE_VERSION"
else
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 18+ and try again."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env 2>/dev/null || cat > .env << EOL
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# WebRTC STUN servers
VITE_STUN_SERVERS=stun:stun.l.google.com:19302
EOL
    echo "✅ Environment file created at .env"
    echo "⚠️  Please edit .env with your Supabase credentials"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. 🔗 Create a Supabase project at https://supabase.com"
echo "2. 📋 Copy the SQL from supabase/schema.sql to your Supabase SQL Editor"
echo "3. ⚙️  Edit .env with your Supabase URL and anon key"
echo "4. 🚀 Run 'cd frontend && npm run dev' to start the development server"
echo ""
echo "📚 Read the README.md for detailed instructions"
echo "🆘 Need help? Check the documentation or open an issue"