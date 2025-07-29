-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE (for both models and viewers)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT CHECK (role IN ('user', 'model')) NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  avatar_url TEXT,
  bio TEXT,
  credits INTEGER DEFAULT 0,
  is_online BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- STREAMS TABLE (for live cams)
CREATE TABLE streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_live BOOLEAN DEFAULT FALSE,
  title TEXT NOT NULL,
  description TEXT,
  stream_url TEXT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  viewers INTEGER DEFAULT 0,
  total_tips INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- TIPS TABLE (for credit transactions)
CREATE TABLE tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user UUID REFERENCES users(id) ON DELETE CASCADE,
  to_model UUID REFERENCES users(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES streams(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL CHECK (amount > 0),
  message TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- MESSAGES TABLE (for real-time room chat)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id UUID REFERENCES streams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'chat' CHECK (message_type IN ('chat', 'tip', 'system')),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- PRIVATE_SHOWS TABLE (for 1-on-1 paid shows - Phase 2)
CREATE TABLE private_shows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rate_per_minute INTEGER NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  total_cost INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'cancelled'))
);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_online ON users(is_online);
CREATE INDEX idx_streams_model_live ON streams(model_id, is_live);
CREATE INDEX idx_messages_stream ON messages(stream_id);
CREATE INDEX idx_tips_model ON tips(to_model);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_shows ENABLE ROW LEVEL SECURITY;

-- Users can read their own data and public profile info
CREATE POLICY "Users can view public profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Streams are public for viewing
CREATE POLICY "Anyone can view streams" ON streams
  FOR SELECT USING (true);

CREATE POLICY "Models can manage own streams" ON streams
  FOR ALL USING (auth.uid() = model_id);

-- Messages are viewable by anyone in the stream
CREATE POLICY "Anyone can view messages" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Tips are viewable by sender and receiver
CREATE POLICY "Users can view relevant tips" ON tips
  FOR SELECT USING (auth.uid() = from_user OR auth.uid() = to_model);

CREATE POLICY "Users can send tips" ON tips
  FOR INSERT WITH CHECK (auth.uid() = from_user);

-- Private shows policies
CREATE POLICY "Users can view own private shows" ON private_shows
  FOR SELECT USING (auth.uid() = model_id OR auth.uid() = user_id);

CREATE POLICY "Users can create private shows" ON private_shows
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() = model_id);