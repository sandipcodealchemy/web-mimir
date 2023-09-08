'use client'

import { AppConstant, I_TYPE, MSG } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { Input } from '../components/Input'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SelectType, SelectTypeAssign } from '@/types'
import { CircularProgress } from '@mui/material'
import RightSide from './RightSide'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { Class } from '../classes/page'
import Student from './student'
import { Ques } from '../questions/page'
import AssignQuestion from './assignQuestion'

export default function LeftSide({}) {
  const [loading, setLoading] = useState(false)
  const [studName, setStudName] = useState('')
  const [assignQues, setAssignQues] = useState('')
  const [studRes, setStudRes] = useState('')
  const [selectStud, setSelectStud] = useState<Class>()
  const [gptOutput, setGPTOutput] = useState('')
  const [studentList, sstStudentList] = useState<Class[] | undefined>()
  const [questionList, setQuestionList] = useState<Ques[]>()
  const [selectQues, setSelectQues] = useState<Ques>()

  useEffect(() => {
    _classListAPI()
    _questionListAPI()
  }, [])

  const _classListAPI = () => {
    Api.get(API_CONSTANT.STUDENTS)
      .then((res) => {
        sstStudentList(res?.data?.data)
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

  let checkVal =
    selectStud !== undefined && selectQues !== undefined && studRes.trim()

  const generateGrade = async () => {
    const response = await fetch('/api/generateGrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentName: selectStud?.name,
        questionContent: selectQues?.content,
        studentResp: studRes,
      }),
    })
    const result = await response.json()
    setGPTOutput(result)
    // if (!response.ok) {
    //   throw new Error(response?.statusText)
    // }

    // const data = response.body
    // if (!data) {
    //   return
    // }
    // const reader = data.getReader()
    // const decoder = new TextDecoder()
    // let done = false

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read()
    //   done = doneReading
    //   const chunkValue = decoder?.decode(value)
    //   setGPTOutput((prev: string) => prev + chunkValue)
    // }
    setLoading(false)
  }

  const _onGenerate = async () => {
    setLoading(true)
    await generateGrade()
  }

  const _clearAll = () => {
    setSelectStud(undefined)
    setSelectQues(undefined)
    setStudRes('')
  }

  return (
    <div className="block xl:flex">
      <div className="mx38 w-auto pb-[38px] pt-[97px] xl:w-2/4">
        <p className="text_RB_28 mb-[36px] text-Ellipse2001">
          {AppConstant.GRADING}
        </p>

        <div className="relative z-10">
          <Student
            studentList={studentList}
            selectStud={selectStud}
            setSelectStud={setSelectStud}
          />
        </div>

        <AssignQuestion
          questionList={questionList}
          selectQues={selectQues}
          setSelectQues={setSelectQues}
        />

        <Input
          title={AppConstant.STUDENT_RESP}
          type={I_TYPE.TEXT}
          value={studRes}
          setValue={setStudRes}
          className=""
        />
        <div className="flex justify-between pt-[8px]">
          <button
            className={`
            ${
              checkVal
                ? 'bg-Ellipse1213 text-white'
                : 'bg-transparent text-Ellipse2003'
            } br6 text_R_18 flex h-[40px] w-[142px] items-center justify-center border-[1px] border-Ellipse0005`}
            onClick={() => {
              if (checkVal) {
                if (!loading) {
                  _onGenerate()
                }
              } else {
                toast.error(MSG.NEW_LESSON_BLANK_FIELD)
              }
            }}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <p>{AppConstant.GENERATE}</p>
            )}
          </button>
          <button
            className={`
            br6
            text_R_18 ml-[10px] flex h-[40px] items-center border-[1px] border-Ellipse0005 px-[28px] text-Ellipse2003`}
            onClick={() => _clearAll()}
          >
            <icons.close w={14} h={14} />
            <p className="ml-[8px]">{AppConstant.CLEAR_INPUTS}</p>
          </button>
        </div>
      </div>
      {/* -------------------------------------------- */}
      <div className="relative w-auto xl:w-2/4">
        <RightSide
          gptOutPut={gptOutput}
          newGenerate={() => {
            setGPTOutput('')
            _clearAll()
          }}
          reGenerate={() => {
            if (checkVal) {
              setGPTOutput('')
              _onGenerate()
            }
          }}
        />
      </div>
    </div>
  )
}
