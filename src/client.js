import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://ywwsbowtxuzeguobzoqz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3d3Nib3d0eHV6ZWd1b2J6b3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwMjk4NjUsImV4cCI6MTk5MzYwNTg2NX0.N62KWbmiGETlQLHCHC83fq63t5SY_yulyHyKZTfT0W0')

export {
    supabase
}