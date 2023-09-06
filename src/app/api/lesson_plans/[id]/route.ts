import { TABLE } from '@/constants/AppConstant'
import { throwError } from '@/utils/apiHelper'
import supabase from '@/utils/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: id }: { params: { id: string } }
) {
  try {
    if (id) {
      const { data, error } = await supabase
        .from(TABLE.LESSON_PLANS)
        .select('*')
        .eq('id', id?.id)
      if (error) throw error
      return NextResponse.json({ data })
    } else {
      let { data, error } = await supabase.from(TABLE.LESSON_PLANS).select('*')
      return NextResponse.json({ data: data })
    }
  } catch (error) {
    throwError()
  }
}
