import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// GET all cars
export async function GET() {
  const { data, error } = await supabase.from('cars').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST add new car
export async function POST(req: Request) {
  const body = await req.json()
  const { immatriculation, carte_grise_voiture, validite_assurance, id_categorie, id_modele } = body

  const { data, error } = await supabase.from('cars').insert([
    { immatriculation, carte_grise_voiture, validite_assurance, id_categorie, id_modele }
  ])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
