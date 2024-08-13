import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xjnuluzxzgueyaaqtisg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbnVsdXp4emd1ZXlhYXF0aXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0NzQ2MjgsImV4cCI6MjAzOTA1MDYyOH0.cWqwo3HCOFl5VoHIPiBg8YSayy07czvefWSzaOVIeoY"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;