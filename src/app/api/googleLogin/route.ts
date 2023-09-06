import { TABLE } from '@/constants/AppConstant'
import supabase from '@/utils/SupabaseClient'
import { sign } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { id, email, name } = await req.json()

    const { data, error } = await supabase
      .from(TABLE.TEACHERS)
      .select('*')
      .eq('email', email)

    if (error) throw error

    if (!data?.[0]) {
      const { error } = await supabase
        .from(TABLE.TEACHERS)
        .insert({ id, name, email })
      if (error) throw error
    }
    const res = NextResponse.json({ message: 'login successfully' })
    res.cookies.set('token', sign({ uid: id }, process.env.JWT_HASH!))
    return res
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || error },
      { status: 400 }
    )
    // return NextResponse.error()
  }
}
