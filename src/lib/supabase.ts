import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)
export const publicImageUrl = (path: string) => {
  // supprime un éventuel slash initial et encode les caractères spéciaux
  const clean = String(path).replace(/^\/+/, '')
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${encodeURI(clean)}`
}
