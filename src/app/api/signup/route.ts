import supabase from '@/utils/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
    const res = NextResponse.json({ data })

    // res.cookies.set(
    //   'token',
    //   sign({ uid: data.user.id }, process.env.JWT_HASH!),
    // );

    return res
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || error },
      { status: 400 }
    )
    // return NextResponse.error()
  }
}
