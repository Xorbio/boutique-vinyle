import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)
export const publicImageUrl = (path: string) => {
  // supprime un éventuel slash initial et encode les caractères spéciaux
   const clean = normalizeObjectPath(objectPath);
  return new URL(`/storage/v1/object/public/${clean}`).toString();
}
function normalizeObjectPath(input: string) {
  return String(input)
    .replace(/\\/g, '/')      // 1) \ -> /
    .replace(/\/{2,}/g, '/')  // 2) compacter les // internes
    .replace(/^\/+/, '');     // 3) enlever les / de tête
}

