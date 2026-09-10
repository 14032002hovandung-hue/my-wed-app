import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mikzpnztsxvepuawyddt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Thiếu cấu hình Supabase URL hoặc Anon Key!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);