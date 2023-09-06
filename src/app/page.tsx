'use client'
import { AppConstant, ROUTE } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { useRouter } from 'next/navigation'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { toast } from 'react-toastify'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { LessonType } from '@/types'
import { cookies } from 'next/headers'
import { useAppDispatch, useAppSelector } from './store/store'
import { setLessonList } from './store/lesson/Reducer'
import { getFromAsync, setInAsyncStorage } from '@/utils/index'
import supabase from '@/utils/SupabaseClient'
import { Loading } from './components/Loading'

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { lesson: lesson } = useAppSelector((state) => state)

  const [data, setData] = useState<LessonType[]>()

  // cookies().getAll()

  useEffect(() => {
    _onGenerate()
  }, [])

  const _onGenerate = () => {
    Api.get(API_CONSTANT.LESSON_PLANS)
      .then((res) => {
        setData(res?.data?.data)
        dispatch(setLessonList(res?.data?.data))
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  return (
    <Suspense>
      <div className="mx38 !mt-[64px]">
        <div className="mb-[36px]">
          <p className="text_RB_28 mb-[36px] text-Ellipse2001">
            {AppConstant.LESSON_PLANNING}
          </p>
          <div
            className="br6 flex h-[102px] w-[322px] cursor-pointer flex-col justify-center border-[1px]  border-Ellipse0002"
            onClick={() => router.push('/newLesson')}
          >
            <div className="mb-[9px] flex justify-center">
              <icons.newLP />
              <p className="text_RB_18 ml-3 text-Ellipse0003">
                {AppConstant.NEW_LESSON_PLAN}
              </p>
            </div>
            <p className="text_R_14 ml-3 text-center text-Ellipse0003">
              {AppConstant.GET_STARTED_BY}
            </p>
          </div>
        </div>
        {/* ------------------------------- */}
        <div>
          <p className="text_RB_18 mb-[18px] text-Ellipse2001">
            {AppConstant.PREV_LESSON_PLANS}
          </p>
          {data === undefined ? (
            <div className="mt-[50px] flex items-center justify-center">
              <Loading />
            </div>
          ) : data?.length === 0 ? (
            <div className="text_RB_18 mt-[50px] flex flex-1 items-center justify-center text-Ellipse2001">
              no data found
            </div>
          ) : (
            <div className="mt-1 grid w-full grid-cols-1 gap-[11px] sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
              {data?.map((d, i) => {
                return (
                  <Link
                    key={i}
                    href={ROUTE.LESSION_DETAILS + '/' + d.id}
                    className="br6 mx-[5px] mb-[11px] flex h-[102px] items-center bg-Ellipse0004 px-[22px]"
                  >
                    <div>
                      <icons.list />
                    </div>
                    <p className="text_RB_16 ml-3 text-Ellipse0003">
                      {d?.subject}
                    </p>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}
