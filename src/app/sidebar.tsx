'use client'

import Api from '@/service/ApiServices'
import supabase from '@/utils/SupabaseClient'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import icons from '../assets/svgIcons/index'
import { AppConstant, ROUTE } from '../constants/AppConstant'
import colors from '../themes/colors'
import { hasValue } from '../utils'
export default function SideBar() {
  const router = useRouter()
  const path = usePathname()

  const _onLogout = async () => {
    await supabase.auth.signOut()
    Api.post('/logout')
      .then((res) => {
        // setInAsyncStorage('login_user', '')
        router.refresh()
        router.replace('/login')
        toast.success('Logout successfully')
      })
      .catch((e) => {
        toast.error(String(e))
      })
  }

  if (path !== ROUTE.LOGIN && path !== ROUTE.REGISTER) {
    return (
      <div className="min-h-screen w-[260px] border-r-[1px] border-lightGray px-[22px]">
        <div className="mb-[36px] mt-[38px] flex flex-col items-center">
          <div className="h-[59px] w-[220px] bg-logoBG"></div>
        </div>
        <div className="mb-[24px] flex h-[32px]">
          <icons.lp check={path === ROUTE.HOME || path === ROUTE.NEW_LESSON} />
          <Link
            href={ROUTE.HOME}
            className={` ${hasValue(
              path === ROUTE.HOME || path === ROUTE.NEW_LESSON,
              ' text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.LESSON_PLANNING}
          </Link>
        </div>
        <div className="mb-[24px] flex h-[32px]">
          <icons.grading
            color={hasValue(
              path === ROUTE.GRADING,
              colors.themeColor,
              colors.darkGray
            )}
            check={path !== ROUTE.GRADING}
          />
          <Link
            href={ROUTE.GRADING}
            className={` ${hasValue(
              path === ROUTE.GRADING,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.GRADING}
          </Link>
        </div>
        <div className="mb-[24px] flex h-[32px]">
          <icons.student
            color={hasValue(
              path === ROUTE.STUDENTS,
              colors.themeColor,
              colors.darkGray
            )}
            check={path !== ROUTE.STUDENTS}
          />
          <Link
            href={ROUTE.STUDENTS}
            className={` ${hasValue(
              path === ROUTE.STUDENTS,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.STUDENTS}
          </Link>
        </div>
        <div className="mb-[24px] flex h-[32px]">
          <icons.grade
            color={hasValue(
              path === ROUTE.GRADE_LEVEL,
              colors.themeColor,
              colors.darkGray
            )}
            check={path !== ROUTE.GRADE_LEVEL}
          />
          <Link
            href={ROUTE.GRADE_LEVEL}
            className={` ${hasValue(
              path === ROUTE.GRADE_LEVEL,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.GRADE_LEVELS}
          </Link>
        </div>
        <div className="mb-[24px] flex h-[32px]">
          <icons.class
            color={hasValue(
              path === ROUTE.CLASSES,
              colors.themeColor,
              colors.darkGray
            )}
            check={path !== ROUTE.CLASSES}
          />
          <Link
            href={ROUTE.CLASSES}
            className={` ${hasValue(
              path === ROUTE.CLASSES,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.CLASSES}
          </Link>
        </div>

        <div className="mb-[24px] flex h-[32px]">
          <icons.assignment
            color={hasValue(
              path === ROUTE.ASSIGNMENTS,
              colors.themeColor,
              colors.darkGray
            )}
            check={path !== ROUTE.ASSIGNMENTS}
          />
          <Link
            href={ROUTE.ASSIGNMENTS}
            className={` ${hasValue(
              path === ROUTE.ASSIGNMENTS,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.ASSIGNMENTS}
          </Link>
        </div>
        <div className="mb-[24px] flex h-[32px]">
          <icons.question
            color={hasValue(
              path === ROUTE.QUESTIONS,
              colors.themeColor,
              colors.darkGray
            )}
            check={path !== ROUTE.QUESTIONS}
          />
          <Link
            href={ROUTE.QUESTIONS}
            className={` ${hasValue(
              path === ROUTE.QUESTIONS,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px]`}
          >
            {AppConstant.QUESTIONS}
          </Link>
        </div>
        <div className="flex h-[32px]">
          <div
            onClick={_onLogout}
            className={` ${hasValue(
              path === ROUTE.LOGIN,
              'text-themeColor',
              'text-darkGray'
            )} text_R_16 ml-[10px] cursor-pointer`}
          >
            {'Logout'}
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
