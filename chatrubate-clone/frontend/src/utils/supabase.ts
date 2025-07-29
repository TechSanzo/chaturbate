import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: { username: string; role: 'user' | 'model' }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Users
  getUser: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  updateUser: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Streams
  getStreams: async (isLive?: boolean) => {
    let query = supabase
      .from('streams')
      .select(`
        *,
        model:users(id, username, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (isLive !== undefined) {
      query = query.eq('is_live', isLive);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getStream: async (id: string) => {
    const { data, error } = await supabase
      .from('streams')
      .select(`
        *,
        model:users(id, username, avatar_url, bio)
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  createStream: async (streamData: any) => {
    const { data, error } = await supabase
      .from('streams')
      .insert(streamData)
      .select()
      .single();
    return { data, error };
  },

  updateStream: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('streams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Messages
  getMessages: async (streamId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        user:users(id, username, avatar_url)
      `)
      .eq('stream_id', streamId)
      .order('timestamp', { ascending: true });
    return { data, error };
  },

  sendMessage: async (messageData: any) => {
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select(`
        *,
        user:users(id, username, avatar_url)
      `)
      .single();
    return { data, error };
  },

  // Tips
  sendTip: async (tipData: any) => {
    const { data, error } = await supabase
      .from('tips')
      .insert(tipData)
      .select(`
        *,
        from_user_data:users!from_user(id, username, avatar_url),
        to_model_data:users!to_model(id, username, avatar_url)
      `)
      .single();
    return { data, error };
  },

  getTips: async (modelId: string) => {
    const { data, error } = await supabase
      .from('tips')
      .select(`
        *,
        from_user_data:users!from_user(id, username, avatar_url)
      `)
      .eq('to_model', modelId)
      .order('timestamp', { ascending: false });
    return { data, error };
  }
};

// Real-time subscriptions
export const realtime = {
  subscribeToMessages: (streamId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`messages:${streamId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `stream_id=eq.${streamId}`
        }, 
        callback
      )
      .subscribe();
  },

  subscribeToTips: (streamId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`tips:${streamId}`)
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tips',
          filter: `stream_id=eq.${streamId}`
        },
        callback
      )
      .subscribe();
  },

  subscribeToStreamUpdates: (streamId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`stream:${streamId}`)
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'streams',
          filter: `id=eq.${streamId}`
        },
        callback
      )
      .subscribe();
  }
};