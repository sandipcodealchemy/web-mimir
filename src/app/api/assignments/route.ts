import { TABLE } from '@/constants/AppConstant'
import { throwError } from '@/utils/apiHelper'
import supabase from '@/utils/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    let { data, error } = await supabase
      .from(TABLE.ASSIGNMENTS)
      .select(`*, classes (name)`)
      .eq('isDelete', false)
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

    const { data, error } = await supabase
      .from(TABLE.ASSIGNMENTS)
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
      .from(TABLE.ASSIGNMENTS)
      .update(rowData)
      .eq('id', rowData?.id)

    if (error) throw error
    return NextResponse.json({ data: data })
  } catch (error) {
    return NextResponse.error()
  }
}

// import { MSG, TABLE } from '@/constants/AppConstant'
// import { throwError } from '@/utils/apiHelper'
// import supabase from '@/utils/SupabaseClient'
// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(req: NextRequest) {
//   let { data, error } = await supabase.from(TABLE.ASSIGNMENTS).select('*')
//   return NextResponse.json({ data: data })
// }

// // export async function POST(req: NextRequest) {
// //   try {
// //     const { id } = await req.json()
// //     const { data, error } = await supabase
// //       .from(TABLE.ASSIGNMENTS)
// //       .select('*')
// //       .eq('id', id)
// //     if (error) throw error
// //     return NextResponse.json({ data: data })
// //   } catch (error) {
// //     return NextResponse.error()
// //   }
// // }

// export async function POST(req: NextRequest) {
//   try {
//     const rowData = await req.json()
//     if (!rowData.name) {
//       return throwError(MSG.ASSIGN_NOT_BLANK, 400)
//     }
//     const { data, error } = await supabase
//       .from(TABLE.ASSIGNMENTS)
//       .insert(rowData)
//       .select()

//     let errorCheck = error?.message.includes('duplicate')

//     if (error) {
//       if (errorCheck) {
//         return throwError(`${rowData.name} ${MSG.ALEREDY_EXISTS}`, 400)
//       } else {
//         return throwError()
//       }
//     }
//     return NextResponse.json({ data: data })
//   } catch (error) {
//     return NextResponse.error()
//   }
// }
