'use client'

import { AppConstant, MSG, I_TYPE, PROMPTS } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { Input } from '../components/Input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { API_CONSTANT } from '@/constants/ApiConstant'
import Api from '@/service/ApiServices'
import { CircularProgress } from '@mui/material'
import { getFromAsync } from '@/utils/index'
import Editor from '../lessonDetail/Editor'

export default function NewLesson() {
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [lessonTopic, setLessonTopic] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [gptOutput, setGPTOutput] = useState('')
  const [uid, setUID] = useState('')

  useEffect(() => {
    let udata = getFromAsync('uid')
    setUID(udata)
  }, [])

  let checkVal = subject.trim() && lessonTopic.trim() && gradeLevel.trim()

  const generateLessonPlan = async () => {
    const response = await fetch('/api/generateLessonPlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: PROMPTS.LESSON_PLAN,
        subject: subject,
        topic: lessonTopic,
        level: gradeLevel,
      }),
    })

    const result = await response.json()
    setGPTOutput(result)

    // if (!response.ok) {
    //   throw new Error(response.statusText)
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
    //   const chunkValue = decoder.decode(value)
    //   setGPTOutput((prev: string) => prev + chunkValue)
    // }
    setLoading(false)
  }

  const _onGenerate = async () => {
    setLoading(true)

    // call streaming OpenAI endpoint with our prompt
    await generateLessonPlan()
  }

  const _onSave = async () => {
    setLoadingSave(true)

    let data = {
      subject: subject,
      topic: lessonTopic,
      grade_level: gradeLevel,
      content: gptOutput,
      teacher_id: uid,
    }

    Api.post(API_CONSTANT.LESSON_PLANS, data)
      .then((res) => {
        setTimeout(() => {
          setLoadingSave(false)
        }, 1000)
        router.back()
        _clearInputs()
        toast.success(MSG.ADD_NEW_LESSON)
      })
      .catch((error) => {
        setLoadingSave(false)
        toast.error(error?.response?.data?.error)
      })
  }

  const _clearInputs = () => {
    setSubject('')
    setLessonTopic('')
    setGradeLevel('')
  }

  return (
    <div className="mx38">
      <div className="mb-[36px]">
        <div className="my-[38px] flex items-center">
          <p
            className="cursor-pointer text-Ellipse0001"
            onClick={() => router.back()}
          >
            {AppConstant.LESSON_PLANNING}
          </p>
          <div className="mx-[8px]">
            <icons.chevronRight />
          </div>
          <p className="text-Ellipse0001">{AppConstant.NEW_LESSON}</p>
        </div>
        <p className="text_RB_28 mb-[36px] text-Ellipse2001">
          {AppConstant.NEW_LESSON_PLAN}
        </p>
        <Input
          title={AppConstant.SUBJECT}
          placeholder={'ex. Literature 201'}
          type={I_TYPE.TEXT}
          value={subject}
          setValue={setSubject}
          className="!max-w-[680px]"
        />
        <Input
          title={AppConstant.LESSON_TOPIC}
          placeholder={'ex. Development of skills in close reading'}
          type={I_TYPE.TEXT}
          value={lessonTopic}
          setValue={setLessonTopic}
          className="!max-w-[680px]"
        />
        <Input
          title={AppConstant.GRADE_LEVEL}
          placeholder={'ex. level 2'}
          type={I_TYPE.TEXT}
          value={gradeLevel}
          setValue={setGradeLevel}
          className="!max-w-[680px]"
        />
      </div>
      <div className="mb-5 flex gap-2">
        <button
          className={`
            ${
              checkVal
                ? 'bg-themeColor text-white'
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
      </div>
      {gptOutput && (
        <Editor
          output={gptOutput}
          onChangeBody={(val) => !loading && setGPTOutput(val)}
        />
      )}
      {loading || gptOutput == '' ? null : (
        <button
          className={`
            ${
              checkVal
                ? 'bg-themeColor text-white'
                : 'bg-transparent text-Ellipse2003'
            } br6 text_R_18 my-5 flex h-[40px] w-[142px] items-center justify-center border-[1px] border-Ellipse0005`}
          onClick={() => {
            if (checkVal) {
              if (!loadingSave) {
                _onSave()
              }
            } else {
              toast.error(MSG.NEW_LESSON_BLANK_FIELD)
            }
          }}
        >
          {loadingSave ? <CircularProgress size={20} /> : <p>SAVE</p>}
        </button>
      )}
    </div>
  )
}
