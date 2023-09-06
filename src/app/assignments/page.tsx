'use client'

import {
  AppConstant,
  MSG,
  I_TYPE,
  PROMPTS,
  ROUTE,
} from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { Input } from '../components/Input'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { CircularProgress, Dialog } from '@mui/material'
import { getFromAsync } from '@/utils/index'
import { SelectType } from '@/types'
import Link from 'next/link'
import { Loading } from '../components/Loading'

export interface Ques {
  id: string
  name: string
  teacher_id: string
  class_id: string
  classes?: {
    name?: string
  }
}

export default function Assignments() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [classList, setClassList] = useState<SelectType[]>()
  const [assigmnentList, setAssigmnentList] = useState<Ques[]>()
  const [editValue, setEditValue] = useState<Ques | null>(null)

  useEffect(() => {
    _assigmnentListAPI()
  }, [])

  const _assigmnentListAPI = () => {
    Api.get(API_CONSTANT.ASSIGNMENTS)
      .then((res) => {
        setAssigmnentList(res?.data?.data)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  const _onEditDeleteOpen = (val: Ques) => {
    setOpen(true)
    setEditValue(val)
  }

  const _onDelete = () => {
    let data = {
      id: editValue?.id,
      isDelete: true,
    }
    Api.patch(API_CONSTANT.ASSIGNMENTS, data)
      .then((res) => {
        _assigmnentListAPI()
        setOpen(false)
        toast.success(MSG.DELETE_ASSIGNMENT)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setEditValue(null)
      })
  }

  return (
    <div className="mx38">
      <div className="mb-[36px]">
        <div className="mt-[97px] flex">
          <p className="text_RB_28 mb-[36px] w-full text-Ellipse2001">
            {AppConstant.ASSIGNMENT_QUESTIONS}
          </p>
          <Link
            className={`
                br6 text_R_18
           flex h-[40px] items-center justify-center whitespace-nowrap border-[1px] border-Ellipse0005 bg-themeColor px-[14px] text-white`}
            href={ROUTE.NEW_ASSIGNMENT + '/null'}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <p>{AppConstant.NEW_ASSIGNMENT}</p>
            )}
          </Link>
        </div>
      </div>

      <div>
        <div className="mb-[18px] flex items-center rounded-md bg-Ellipse0004 px-2 py-3">
          <div className="mr-[13px] flex w-[21px] justify-center">
            <div className="h-[4px] w-[4px] rounded-full bg-Ellipse0003" />
          </div>
          <div className="flex w-full">
            <div className="w-[70%]">
              <p className="text_R_14 text-Ellipse0003">
                {AppConstant.ASSIGN_NAME}
              </p>
            </div>
            <div className="w-[30%]">
              <p className="text_R_14 text-Ellipse0003">{AppConstant.CLASS}</p>
            </div>
          </div>
          <div className="mx-3 flex w-[150px] justify-between">
            <div className="flex w-[30px] justify-center">
              <p className="text_R_14 text-Ellipse0003">{AppConstant.EDIT}</p>
            </div>
            <div className="flex w-[45px] justify-center">
              <p className="text_R_14 text-Ellipse0003">{AppConstant.DELETE}</p>
            </div>
          </div>
        </div>

        {assigmnentList === undefined ? (
          <div className="mt-[50px] flex items-center justify-center">
            <Loading />
          </div>
        ) : assigmnentList?.length === 0 ? (
          <div className="text_RB_18 mt-[50px] flex flex-1 items-center justify-center text-Ellipse2001">
            no data found
          </div>
        ) : (
          <div className="">
            {assigmnentList?.map((d, i) => {
              return (
                <div
                  key={i}
                  className="mb-3 flex items-center rounded-md border border-Ellipse0004  px-2 py-3"
                >
                  <div className="mr-[13px] flex w-[21px] justify-center">
                    <p className="text_R_14 text-Ellipse0003">{i + 1}</p>
                  </div>

                  <div className="flex w-full">
                    <div className="w-[70%]">
                      <p className="text_R_14 text-Ellipse0003">{d?.name}</p>
                    </div>
                    <div className="w-[30%]">
                      <p className="text_R_14 text-Ellipse0003">
                        {d?.classes?.name}
                      </p>
                    </div>
                  </div>

                  <div className="mx-3 flex w-[150px] justify-between">
                    {/* <div
                      className="flex w-[30px] justify-center"
                      onClick={() => _onEditDeleteOpen(d, AppConstant.EDIT)}
                    > */}
                    <Link
                      key={i}
                      href={ROUTE.NEW_ASSIGNMENT + '/' + d.id}
                      className="flex w-[30px] justify-center"
                    >
                      <icons.edit />
                    </Link>
                    <div
                      className="flex w-[45px] justify-center"
                      onClick={() => _onEditDeleteOpen(d)}
                    >
                      <icons.remove />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Dialog
        fullWidth
        open={open}
        className="w-full"
        // fullScreen={true}
        onClose={() => {
          setOpen(false)
          setTimeout(() => {
            setEditValue(null)
          }, 100)
        }}
      >
        <div className="p-[28px]">
          <div className="flex">
            <p className="text_MB_16 w-full text-Ellipse2003">
              {AppConstant.ARE_YOU_SURE_ASIGN_DELETE}
            </p>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              className={`
                br6 text_R_18
             flex h-[40px] w-[120px] items-center justify-center border-[1px] border-Ellipse0005 bg-transparent text-Ellipse2003`}
              onClick={() => {
                setOpen(false)
                setEditValue(null)
              }}
            >
              <p>{AppConstant.CANCEL}</p>
            </button>
            <button
              className={`
                br6 text_R_18
           flex h-[40px] w-[120px] items-center justify-center border-[1px] border-Ellipse0005 bg-themeColor text-white`}
              onClick={() => _onDelete()}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <p>{AppConstant.DELETE}</p>
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
