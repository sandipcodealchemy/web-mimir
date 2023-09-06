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
        .from(TABLE.ASSIGNMENTS)
        .select(`*, classes (name)`)
        .eq('id', id?.id)
      if (error) throw error
      const question_id = await Promise.all(
        data[0].question_id.map(
          async (e: string) =>
            await supabase
              .from(TABLE.TEST_QUESTIONS)
              .select(`content, id`)
              .eq('isDelete', false)
              .eq('id', e)
              .then(({ data, error }) => {
                if (error) throw error
                return data?.[0]
              })
        )
      )
      return NextResponse.json({ ...data?.[0], question_id })
    } else {
      let { data, error } = await supabase
        .from(TABLE.ASSIGNMENTS)
        .select(`*, classes (name)`)
      if (error) throw error
      return NextResponse.json(data?.[0])
    }
  } catch (error) {
    throwError()
  }
}
