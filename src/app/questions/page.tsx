'use client'

import { AppConstant, MSG, I_TYPE, PROMPTS } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { Input } from '../components/Input'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { CircularProgress, Dialog } from '@mui/material'
import { getFromAsync } from '@/utils/index'
import { MenuComp, setSelect } from '../components/MenuComp'
import { SelectType } from '@/types'
import { Loading } from '../components/Loading'

export interface Ques {
  id: string
  content: string
  teacher_id: string
  class_id: string
  classes?: {
    name?: string
  }
  check?: boolean
}

export default function Questions() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [classList, setClassList] = useState<SelectType[]>()
  const [questionList, setQuestionList] = useState<Ques[]>()
  const [editValue, setEditValue] = useState<Ques | null>(null)
  const [type, setType] = useState('')
  const [selectClass, setSelectClass] = useState<SelectType>()

  useEffect(() => {
    _classListAPI()
    _questionListAPI()
  }, [])

  const _classListAPI = () => {
    Api.get(API_CONSTANT.CLASSES)
      .then((res) => {
        setClassList(res?.data?.data)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  const _questionListAPI = () => {
    Api.get(API_CONSTANT.QUESTIONS)
      .then((res) => {
        setQuestionList(res?.data?.data)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  const _onAdd = async () => {
    setLoading(true)

    let data = {
      content: name,
      class_id: editValue?.class_id,
    }

    Api.post(API_CONSTANT.QUESTIONS, data)
      .then((res) => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
        _clearInputs()
        _questionListAPI()
        setOpen(false)
        toast.success(MSG.ADD_NEW_QUESTION)
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error?.response?.data?.error)
      })
  }

  const _clearInputs = () => {
    setName('')
    setType('')
    setSelectClass(undefined)
  }

  const _onEditDeleteOpen = (val: Ques, type: string) => {
    setOpen(true)
    // setSelectClass(val?.classes)
    setEditValue(val)
    setName(val.content)
    setType(type)
  }

  const _onEdit = () => {
    let data = {
      id: editValue?.id,
      content: name,
      teacher_id: editValue?.teacher_id,
      class_id: editValue?.class_id,
    }

    Api.patch(API_CONSTANT.QUESTIONS, data)
      .then((res) => {
        setOpen(false)
        _clearInputs()
        _questionListAPI()
        toast.success(MSG.EDIT_QUESTION)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setEditValue(null)
        setType('')
      })
  }

  const _onDelete = () => {
    let data = {
      id: editValue?.id,
      isDelete: true,
    }
    Api.patch(API_CONSTANT.QUESTIONS, data)
      .then((res) => {
        setOpen(false)
        _clearInputs()
        _questionListAPI()
        toast.success(MSG.DELETE_QUESTION)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setEditValue(null)
        setType('')
      })
  }

  return (
    <div className="mx38">
      <div className="mb-[36px]">
        <div className="mt-[97px] flex">
          <p className="text_RB_28 mb-[36px] w-full text-Ellipse2001">
            {AppConstant.ASSIGNMENT_QUESTIONS}
          </p>
          <button
            className={`
                br6 text_R_18
           flex h-[40px] items-center justify-center whitespace-nowrap border-[1px] border-Ellipse0005 bg-themeColor px-[14px] text-white`}
            onClick={() => {
              setOpen(true)
            }}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <p>{AppConstant.ADD_NEW_QUESTION}</p>
            )}
          </button>
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
                {AppConstant.QUESTIONS}
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

        {questionList === undefined ? (
          <div className="mt-[50px] flex items-center justify-center">
            <Loading />
          </div>
        ) : questionList?.length === 0 ? (
          <div className="text_RB_18 mt-[50px] flex flex-1 items-center justify-center text-Ellipse2001">
            no data found
          </div>
        ) : (
          <div className="">
            {questionList?.map((d, i) => {
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
                      <p className="text_R_14 text-Ellipse0003">{d?.content}</p>
                    </div>
                    <div className="w-[30%]">
                      <p className="text_R_14 text-Ellipse0003">
                        {d?.classes?.name}
                      </p>
                    </div>
                  </div>

                  <div className="mx-3 flex w-[150px] justify-between">
                    <div
                      className="flex w-[30px] justify-center"
                      onClick={() => _onEditDeleteOpen(d, AppConstant.EDIT)}
                    >
                      <icons.edit />
                    </div>
                    <div
                      className="flex w-[45px] justify-center"
                      onClick={() => _onEditDeleteOpen(d, AppConstant.DELETE)}
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
            setType('')
            setName('')
            setEditValue(null)
          }, 100)
        }}
      >
        <div className="p-[28px]">
          <div className="flex">
            <p className="text_MB_16 w-full text-Ellipse2003">
              {type === AppConstant.EDIT
                ? AppConstant.ARE_YOU_SURE_QUESTION_EDIT
                : type === AppConstant.DELETE
                ? AppConstant.ARE_YOU_SURE_QUESTION_DELETE
                : AppConstant.QUESTION}
            </p>
            {/* <button onClick={() => setOpen(false)}>
              <icons.close w={14} h={14} />
            </button> */}
          </div>
          <Input
            title={''}
            placeholder={'write question'}
            type={I_TYPE.TEXT}
            value={name}
            setValue={setName}
            className="!max-w-[680px]"
            disabled={type === AppConstant.DELETE && true}
          />
          <div className="relative">
            <MenuComp
              title={AppConstant.SELECT_CLASS}
              data={classList}
              select={editValue}
              setSelect={setEditValue as setSelect}
            />
          </div>

          <div className="flex justify-between">
            <button
              className={`
                br6 text_R_18
             flex h-[40px] w-[120px] items-center justify-center border-[1px] border-Ellipse0005 bg-transparent text-Ellipse2003`}
              onClick={() => {
                setOpen(false)
                setEditValue(null)
                _clearInputs()
              }}
            >
              <p>{AppConstant.CANCEL}</p>
            </button>
            <button
              className={`
                br6 text_R_18
           flex h-[40px] w-[120px] items-center justify-center border-[1px] border-Ellipse0005 bg-themeColor text-white`}
              onClick={() => {
                if (type === AppConstant.EDIT) {
                  if (name || editValue !== null) {
                    _onEdit()
                  }
                } else if (type === AppConstant.DELETE) {
                  _onDelete()
                } else {
                  if (name || editValue !== null) {
                    if (!loading) {
                      _onAdd()
                    }
                  } else {
                    toast.error(MSG.NEW_LESSON_BLANK_FIELD)
                  }
                }
              }}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <p>
                  {type === AppConstant.EDIT
                    ? AppConstant.EDIT
                    : type === AppConstant.DELETE
                    ? AppConstant.DELETE
                    : AppConstant.ADD}
                </p>
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
