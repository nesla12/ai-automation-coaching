import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://emxbsafnxqfinlqaewfu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGJzYWZueHFmaW5scWFld2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMzYyMTUsImV4cCI6MjA0ODgxMjIxNX0.hUjLUZrUKC6MW1AvP9TcFrL8yiE58Ndaajt3qMVYh20';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
});