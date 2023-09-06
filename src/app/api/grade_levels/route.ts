import { TABLE } from '@/constants/AppConstant'
import { throwError } from '@/utils/apiHelper'
import supabase from '@/utils/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    let { data, error } = await supabase
      .from(TABLE.GRADE_LEVELS)
      .select('*')
      .eq('isDelete', false)
    return NextResponse.json({ data: data })
    // }
  } catch (error) {
    throwError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const rowData = await req.json()

    const { data, error } = await supabase
      .from(TABLE.GRADE_LEVELS)
      .insert(rowData)
    if (error) throw error
    return NextResponse.json({ data: data })
  } catch (error) {
    return NextResponse.error()
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const rowData = await req.json()
    const { data, error } = await supabase
      .from(TABLE.GRADE_LEVELS)
      .update(rowData)
      .eq('id', rowData?.id)

    if (error) throw error
    return NextResponse.json({ data: data })
  } catch (error) {
    return NextResponse.error()
  }
}
