import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)
export const publicImageUrl = (path: string) => {
  // nettoie le chemin et construit une URL absolue vers le bucket public Supabase
  const clean = normalizeObjectPath(path)
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!
  // Utilise l'URL du projet Supabase comme base
  return new URL(`/storage/v1/object/public/${clean}`, base).toString()
}
function normalizeObjectPath(input: string) {
  // Normalise les séparateurs et supprime les segments vides, '.' et '..'
  const parts = String(input)
    .replace(/\\/g, '/')
    .split('/')
    .filter(Boolean)
  const safe: string[] = []
  for (const p of parts) {
    if (p === '.' || p === '..') continue
    safe.push(p)
  }
  return safe.join('/')
}
