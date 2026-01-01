import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://JOUW_PROJECT_ID.supabase.co",
  "JOUW_PUBLIC_ANON_KEY"
);
