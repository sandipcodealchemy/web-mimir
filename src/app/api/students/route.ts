import { TABLE } from '@/constants/AppConstant'
import { throwError } from '@/utils/apiHelper'
import { verifyToken } from '@/utils/index'
import supabase from '@/utils/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    let token = req?.cookies?.get('token')?.value
    const { uid } = verifyToken(token)
    if (!uid) {
      throw new Error('unauthorized user')
    }

    let { data, error } = await supabase
      .from(TABLE.STUDENTS)
      .select('*')
      // .or('isDelete.eq.false,teacher_id.eq.uid')
      .eq('isDelete', false)
      .eq('teacher_id', uid)
    if (error) throw error
    return NextResponse.json({ data: data })
    // }
  } catch (error) {
    throwError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const rowData = await req.json()

    let token = req?.cookies?.get('token')?.value
    const { uid } = verifyToken(token)
    if (!uid) {
      throw new Error('unauthorized user')
    }

    const { data, error } = await supabase
      .from(TABLE.STUDENTS)
      .insert({ ...rowData, teacher_id: uid })
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
      .from(TABLE.STUDENTS)
      .update(rowData)
      .eq('id', rowData?.id)

    if (error) throw error
    return NextResponse.json({ data: data })
  } catch (error) {
    return NextResponse.error()
  }
}
