'use client'

import { AppConstant, MSG, I_TYPE, PROMPTS } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { Input } from '../../components/Input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { CircularProgress, Dialog } from '@mui/material'

import { getFromAsync } from '@/utils/index'
import { SelectType } from '@/types'
import { MenuComp } from '../MenuComp'
import { Ques } from '../../questions/page'
import { Loading } from '@/app/components/Loading'

type NewAssignmentType = { params: { id: string } }

const NewAssignment = ({ params: { id } }: NewAssignmentType) => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectClass, setSelectClass] = useState<SelectType>()
  const [classList, setClassList] = useState<SelectType[]>()
  const [quesList, setQuesList] = useState<Ques[]>()
  const [openQues, setOpenQues] = useState(false)

  const allCheck = quesList?.every((e) => e?.check)

  useEffect(() => {
    _questionListAPI()
    _classListAPI()
  }, [])

  const _getAssignmentAPI = () => {
    if (id !== 'null') {
      Api.get(`${API_CONSTANT.ASSIGNMENTS}/${id}`)
        .then(({ data }) => {
          setName(data.name)
          setSelectClass({
            id: data?.class_id,
            name: data?.classes.name,
          })

          const selectedQuestionIds = data.question_id.map((e: Ques) => e.id)
          setQuesList(
            // @ts-ignore
            (old: Ques[]) =>
              old?.map((e: Ques) => ({
                ...e,
                check: selectedQuestionIds.includes(e.id),
              }))
          )
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
    }
  }

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
      .then(({ data }) => {
        setQuesList(data?.data?.map((d: Ques) => ({ ...d, check: false })))
        _getAssignmentAPI()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  const _onAdd = async () => {
    setLoading(true)
    let quesID: string[] = []
    quesList?.forEach((d) => {
      if (d.check === true) {
        quesID.push(d.id)
      }
    })

    let dataPost = {
      name: name,
      isDelete: false,
      question_id: quesID,
      class_id: selectClass?.id,
    }
    let dataUpdate = {
      id,
      ...dataPost,
    }

    const apiCall = id === 'null' ? Api.post : Api.patch
    const MESSAGE = id === 'null' ? MSG.ADD_NEW_ASSIGNMENT : MSG.EDIT_ASSIGNMENT
    const val = id === 'null' ? dataPost : dataUpdate

    apiCall(API_CONSTANT.ASSIGNMENTS, val)
      .then((res) => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
        if (id === 'null') {
          router.back()
        }
        toast.success(MESSAGE)
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        if (id === 'null') {
          setName('')
          setSelectClass(undefined)
          _clearSelection()
        }
      })
  }

  const _onSingleCheck = (e: Ques) => {
    let allCheck = true
    setQuesList((old) => {
      return old?.map((ele) => {
        const newObj = e.id === ele.id ? { ...ele, check: !ele.check } : ele
        allCheck && (allCheck = !!newObj?.check)
        return newObj
      })
    })
  }

  const _clearSelection = () => {
    let temp = quesList?.map((d) => {
      return { ...d, check: false }
    })

    setQuesList(temp)
  }

  return (
    <div className="mx38">
      <div className="mb-[36px]">
        <div className="my-[38px] flex items-center">
          <p
            className="cursor-pointer text-Ellipse0001"
            onClick={() => router.back()}
          >
            {AppConstant.ASSIGNMENT}
          </p>
          <div className="mx-[8px]">
            <icons.chevronRight />
          </div>
          <p className="text-Ellipse0001">{AppConstant.NEW_ASSIGNMENT}</p>
        </div>

        <div className="flex justify-between">
          <p className="text_RB_28 mb-[36px] text-Ellipse2001">
            {AppConstant.NEW_ASSIGN}
          </p>
          <div className="flex gap-2">
            <button
              className={`
                br6 text_R_18
             flex h-[40px] w-[120px] items-center justify-center border-[1px] border-Ellipse0005 bg-transparent text-Ellipse2003`}
              onClick={() => {}}
            >
              <p>{AppConstant.CANCEL}</p>
            </button>
            <button
              className={`
                br6 text_R_18
           flex h-[40px] w-[200px] items-center justify-center border-[1px] border-Ellipse0005 bg-themeColor text-white`}
              onClick={() => _onAdd()}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <p>
                  {id === 'null'
                    ? AppConstant.SAVE_ASSIGNMENT
                    : AppConstant.EDIT}
                </p>
              )}
            </button>
          </div>
        </div>

        <Input
          title={AppConstant.ASSIGN_NAME}
          placeholder={'ex. Literature 201'}
          type={I_TYPE.TEXT}
          value={name}
          setValue={setName}
          className="!max-w-[680px]"
        />
        <div className="!max-w-[680px]">
          <MenuComp
            title={AppConstant.SELECT_CLASS}
            data={classList}
            select={selectClass}
            setSelect={setSelectClass}
          />
        </div>
        <div>
          <p className="text_MB_16 mb-3">{AppConstant.SELECT_QUESTIONS}</p>
        </div>
      </div>
      <div className="mb-5 flex !max-w-[680px] gap-2">
        <button
          className="br6 flex h-[40px] w-full items-center justify-center gap-2 bg-themeColor text-white"
          onClick={() => setOpenQues(true)}
        >
          <icons.plus />
          {AppConstant.SELECT_ASSIGN_QUESTION}
        </button>
      </div>

      <div className="mt-[26px] border-t py-3">
        <p className="text_R_14 text-Ellipse0009">
          {AppConstant.SELECTED_QUES}
        </p>
      </div>

      {quesList?.map((d, i) => {
        if (d.check === true) {
          return (
            <div
              key={i}
              className="mb-3 flex items-center rounded-md border border-Ellipse0004 px-2 py-3"
              onClick={() => {
                _onSingleCheck(d)
              }}
            >
              <div className="mr-[13px] flex w-[21px] justify-center">
                <p className="text_R_14 text-Ellipse0003">{i + 1}</p>
              </div>
              <div className="w-full">
                <p className="text_R_14 text-Ellipse0003">{d?.content}</p>
              </div>
            </div>
          )
        }
      })}

      {/* ------------------------------ */}

      <Dialog
        fullWidth
        open={openQues}
        className="w-full"
        maxWidth="md"
        // fullScreen={true}
        onClose={() => {
          setOpenQues(false)
          if (id === 'null') {
            _clearSelection()
          }
        }}
      >
        <div className="p-[28px]">
          <p className="text_MB_16 mb-[26px] w-full text-center text-Ellipse2003">
            {AppConstant.SELECT_QUESTIONS}
          </p>
          <div>
            <div className="mb-[18px] flex items-center rounded-md bg-Ellipse0004 px-2 py-3">
              <div
                className="mr-[13px] flex w-[21px] justify-center"
                onClick={(e) => {
                  setQuesList((old) => {
                    return old?.map((ele) => {
                      return { ...ele, check: !allCheck }
                    })
                  })
                }}
              >
                <div
                  className={` 
                     h-[20px] w-[20px] rounded-sm border-2 border-Ellipse0006`}
                >
                  {allCheck && <icons.check w={15} h={15} />}
                </div>
              </div>
              <div className="w-full">
                <p className="text_R_14 text-Ellipse0003">
                  {AppConstant.SELECT_ALL}
                </p>
              </div>
            </div>
          </div>

          {quesList === undefined ? (
            <div className="mt-[50px] flex items-center justify-center">
              <Loading />
            </div>
          ) : quesList?.length === 0 ? (
            <div className="text_RB_18 my-[20px] flex flex-1 items-center justify-center text-Ellipse2001">
              no data found
            </div>
          ) : (
            <div className="mt-1 grid w-full grid-cols-1 gap-[11px] sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
              {quesList?.map((d, i) => {
                return (
                  <div
                    key={i}
                    className="mb-3 flex items-center rounded-md border border-Ellipse0004 px-2 py-3"
                    onClick={() => {
                      _onSingleCheck(d)
                    }}
                  >
                    <div className="mr-[13px] flex w-[21px] justify-center">
                      <div
                        className={` 
                     h-[20px] w-[20px] rounded-sm border-2 border-Ellipse0006`}
                      >
                        {d?.check && <icons.check w={15} h={15} />}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text_R_14 text-Ellipse0003">{d?.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex justify-between">
            <button
              className={`
                br6 text_R_18
             flex h-[40px] w-[120px] items-center justify-center border-[1px] border-Ellipse0005 bg-transparent text-Ellipse2003`}
              onClick={() => {
                setOpenQues(false)
                _clearSelection()
              }}
            >
              <p>{AppConstant.CANCEL}</p>
            </button>
            <button
              className={`
                br6 text_R_18
           flex h-[40px] w-[200px] items-center justify-center border-[1px] border-Ellipse0005 bg-themeColor text-white`}
              onClick={() => setOpenQues(false)}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <p>{AppConstant.ADD_QUESTIONS}</p>
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default NewAssignment
