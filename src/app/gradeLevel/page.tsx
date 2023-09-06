'use client'

import { AppConstant, MSG, I_TYPE, PROMPTS } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { Input } from '../components/Input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { CircularProgress, Dialog } from '@mui/material'
import { Loading } from '../components/Loading'

export interface Grade {
  id: string
  name: string
}

export default function Grade() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [gradeList, setGradeList] = useState<Grade[]>()
  const [editValue, setEditValue] = useState<Grade | null>(null)
  const [type, setType] = useState('')

  useEffect(() => {
    _gradeListAPI()
  }, [])

  const _gradeListAPI = () => {
    Api.get(API_CONSTANT.GRADE_LEVELS)
      .then((res) => {
        setGradeList(res?.data?.data)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  const _onAdd = async () => {
    setLoading(true)

    let data = {
      name: name,
    }

    Api.post(API_CONSTANT.GRADE_LEVELS, data)
      .then((res) => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
        _clearInputs()
        _gradeListAPI()
        setOpen(false)
        toast.success(MSG.ADD_NEW_GRADE_LEVEL)
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error?.response?.data?.error)
      })
  }

  const _clearInputs = () => {
    setName('')
    setType('')
  }

  const _onEditDeleteOpen = (val: Grade, type: string) => {
    setOpen(true)
    setEditValue(val)
    setName(val.name)
    setType(type)
  }

  const _onEdit = () => {
    let data = {
      id: editValue?.id,
      name: name,
    }
    Api.patch(API_CONSTANT.GRADE_LEVELS, data)
      .then((res) => {
        setOpen(false)
        _clearInputs()
        _gradeListAPI()
        toast.success(MSG.EDIT_GRADE_LEVEL)
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
    Api.patch(API_CONSTANT.GRADE_LEVELS, data)
      .then((res) => {
        setOpen(false)
        _clearInputs()
        _gradeListAPI()
        toast.success(MSG.DELETE_GRADE_LEVEL)
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
            {AppConstant.GRADE_LEVELS}
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
              <p>{AppConstant.ADD_NEW_GRADE_LEVEL}</p>
            )}
          </button>
        </div>
      </div>

      <div>
        <div className="mb-[18px] flex items-center rounded-md bg-Ellipse0004 px-2 py-3">
          <div className="mr-[13px] flex w-[21px] justify-center">
            <div className="h-[4px] w-[4px] rounded-full bg-Ellipse0003" />
          </div>
          <div className="w-full">
            <p className="text_R_14 text-Ellipse0003">
              {AppConstant.GRADE_LEVELS}
            </p>
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

        {gradeList === undefined ? (
          <div className="mt-[50px] flex items-center justify-center">
            <Loading />
          </div>
        ) : gradeList?.length === 0 ? (
          <div className="text_RB_18 mt-[50px] flex flex-1 items-center justify-center text-Ellipse2001">
            no data found
          </div>
        ) : (
          <div className="">
            {gradeList?.map((d, i) => {
              return (
                <div
                  key={i}
                  className="mb-3 flex items-center rounded-md border border-Ellipse0004  px-2 py-3"
                >
                  <div className="mr-[13px] flex w-[21px] justify-center">
                    <p className="text_R_14 text-Ellipse0003">{i + 1}</p>
                  </div>
                  <div className="w-full">
                    <p className="text_R_14 text-Ellipse0003">{d?.name}</p>
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
                ? AppConstant.ARE_YOU_SURE_GRADE_EDIT
                : type === AppConstant.DELETE
                ? AppConstant.ARE_YOU_SURE_GRADE_DELETE
                : AppConstant.GRADE_LEVEL}
            </p>
            {/* <button onClick={() => setOpen(false)}>
              <icons.close w={14} h={14} />
            </button> */}
          </div>
          <Input
            title={''}
            placeholder={'ex. level 2'}
            type={I_TYPE.TEXT}
            value={name}
            setValue={setName}
            className="!max-w-[680px]"
            disabled={type === AppConstant.DELETE && true}
          />

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
                  if (name) {
                    _onEdit()
                  }
                } else if (type === AppConstant.DELETE) {
                  _onDelete()
                } else {
                  if (name) {
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
                  {' '}
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
