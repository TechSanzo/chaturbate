export interface User {
  id: string;
  role: 'user' | 'model';
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  credits: number;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface Stream {
  id: string;
  model_id: string;
  is_live: boolean;
  title: string;
  description?: string;
  stream_url?: string;
  started_at?: string;
  ended_at?: string;
  viewers: number;
  total_tips: number;
  created_at: string;
  model?: User;
}

export interface Message {
  id: string;
  stream_id: string;
  user_id: string;
  content: string;
  message_type: 'chat' | 'tip' | 'system';
  timestamp: string;
  user?: User;
}

export interface Tip {
  id: string;
  from_user: string;
  to_model: string;
  stream_id?: string;
  amount: number;
  message?: string;
  timestamp: string;
  from_user_data?: User;
  to_model_data?: User;
}

export interface PrivateShow {
  id: string;
  model_id: string;
  user_id: string;
  rate_per_minute: number;
  started_at: string;
  ended_at?: string;
  total_cost: number;
  status: 'active' | 'ended' | 'cancelled';
  model?: User;
  user?: User;
}

export interface AuthUser {
  user: User | null;
  session: any;
  loading: boolean;
}

export interface WebRTCPeer {
  id: string;
  peer: any;
  stream?: MediaStream;
}