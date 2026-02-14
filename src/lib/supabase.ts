// src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Ersetze diese Platzhalter mit deinen echten Daten von Supabase
const supabaseUrl = 'https://lnxngycslbmbspufbdmh.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxueG5neWNzbGJtYnNwdWZiZG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTUzNzAsImV4cCI6MjA4NjYzMTM3MH0.ryMcI-7jzbbfkxBQbQBSpdVlMeLpX27V2_9pbv3lSR8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
