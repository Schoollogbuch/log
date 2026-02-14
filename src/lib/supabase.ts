import { createClient } from '@supabase/supabase-js';

// Diese Werte findest du in deinem Supabase Dashboard
const supabaseUrl = process.env.https://lnxngycslbmbspufbdmh.supabase.co || '';
const supabaseAnonKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxueG5neWNzbGJtYnNwdWZiZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTUzNzAsImV4cCI6MjA4NjYzMTM3MH0.ryMcI-7jzbbfkxBQbQBSpdVlMeLpX27V2_9pbv3lSR8 || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
