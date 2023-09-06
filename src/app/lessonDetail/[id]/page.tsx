import { Suspense } from 'react'
import { AppConstant } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import Api from '@/service/ApiServices'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Editor from '../Editor'
import { Loading } from '@/app/components/Loading'
import { LessonType } from '@/types'

async function getData(id: string) {
  try {
    const { data } = await Api.get(`${API_CONSTANT.LESSON_PLANS}/${id}`)

    return data.data as LessonType[]
  } catch (error) {}
}

const LessonDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getData(id)

  return (
    <Suspense
      fallback={
        <Loading className="flex h-screen items-center justify-center" />
      }
    >
      <div className="mx38">
        <div className="my-[38px] flex items-center">
          <p className="cursor-pointer text-Ellipse0001">
            {AppConstant.LESSON_PLANNING}
          </p>
          <div className="mx-[8px]">
            <icons.chevronRight />
          </div>
          <p className="text-Ellipse0001">{AppConstant.NEW_LESSON}</p>
        </div>

        <div className="mb-[36px] border-b-[1px] pb-[12px]">
          <p className="text_RB_28 text-Ellipse2001">
            {AppConstant.DEVELOPMENT_OF_SKILLS}
          </p>
        </div>

        {Array.isArray(data) && <Editor lesson={data[0]} />}
      </div>
    </Suspense>
  )
}

export default LessonDetail
