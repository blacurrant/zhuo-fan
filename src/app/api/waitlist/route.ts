import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database connection not configured' }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
