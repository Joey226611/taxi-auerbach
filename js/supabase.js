import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://whxdmxwxzvnsraygohfl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoeGRteHd4enZuc3JheWdvaGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzg3MjksImV4cCI6MjA4Mjg1NDcyOX0.Jt0hOkW4G2rkaqbSSGQXAfIjAHjRLn_7y1K7KUY955o"
);
