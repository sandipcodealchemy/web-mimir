'use client'
import { AppConstant, MSG } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'
import { HtmlEditor } from 'devextreme-react'
import {
  dxHtmlEditorToolbar,
  ValueChangedEvent,
} from 'devextreme/ui/html_editor'
import jsPDF from 'jspdf'
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import Dot from '../components/Dot'
import { Button } from '../components/Button'
import { LessonType } from '@/types'
import Api from '@/service/ApiServices'
import { API_CONSTANT } from '@/constants/ApiConstant'

function Editor({
  lesson,
  output,
  onChangeBody,
}: {
  lesson?: LessonType
  output?: string
  onChangeBody?: (val: string) => void
}) {
  const toolbar = useMemo(() => {
    return {
      items: [
        'bold',
        'italic',
        'underline',
        'strike',
        // {
        //   name: 'font',
        //   acceptedValues: 20,
        // },
        // 'separator',
        // {
        //   name: 'size',
        //   acceptedValues: 20,
        // },
        // 'separator',
        // {
        //   name: 'header',
        //   acceptedValues: [1, 2, 3, 4, 5, 6, false],
        // },
        'color',
        'background',
        'orderedList',
        'bulletList',
        'alignLeft',
        'alignCenter',
        'alignRight',
        // 'undo',
        // 'redo',
      ],
    }
  }, [])

  const [body, setBody] = useState(
    lesson?.content?.replace(/\n/g, '<br />') || ''
  )

  const handleChange = (e: ValueChangedEvent) => {
    setBody(e.value)
    onChangeBody && onChangeBody(e.value)
  }

  const _copyToClipboard = () => {
    let link = body.replace('<p></p>', '')

    navigator.clipboard.writeText(link)
    if (body.trim() !== '') {
      toast.success(MSG.COPY)
    } else {
      toast.error(MSG.WRITE_TEXT)
    }
  }

  const handleGeneratePdf = () => {
    if (body.trim() !== '') {
      const doc = new jsPDF({
        format: 'a4',
        unit: 'px',
      })

      doc.setFont('Inter-Regular', 'normal')

      doc.html(body, {
        async callback(doc) {
          await doc.save('document')
        },
        // margin: [10, 10, 10, 10],
        autoPaging: 'text',
        x: 15,
        y: 15,
        width: 200,
        windowWidth: 200,
      })
      toast.success('download pdf')
    } else {
      toast.error(MSG.WRITE_SOMETHING)
    }
  }

  const onSaveClick = () => {
    let data = {
      id: lesson?.id,
      subject: lesson?.subject,
      topic: lesson?.topic,
      grade_level: lesson?.grade_level,
      content: body,
    }

    Api.patch(API_CONSTANT.LESSON_PLANS, data)
      .then((res) => {
        setTimeout(() => {}, 1000)
        toast.success(MSG.UPDATE_LESSON)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  return (
    <>
      {output === undefined ? (
        <div className="block justify-between xl:flex">
          <div className="br6 mb-[18px] flex h-[40px] items-center overflow-hidden text-ellipsis whitespace-nowrap bg-Ellipse0004 px-[8px]">
            <p className="text_R_14 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-Ellipse0003">
              {lesson?.subject}
            </p>
            <Dot className={'!mx-[12px] h-[4px] w-[4px] bg-Ellipse0006'} />
            <p className="text_R_14 min-w-0 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-Ellipse0003 ">
              {lesson?.topic}
            </p>
            <Dot className={'!mx-[12px] h-[4px] w-[4px] bg-Ellipse0006'} />
            <p className="text_R_14 whitespace-nowrap text-Ellipse0003">
              {lesson?.grade_level}
            </p>
          </div>
          <div className="mb-[18px] ml-3 flex justify-end gap-4">
            <button
              className={`br6 flex h-[40px] items-center border-[1px] border-Ellipse0005 px-[8px]`}
              onClick={() => _copyToClipboard()}
            >
              <icons.copy />
              <p className="text_R_16 ml-[8px] whitespace-nowrap text-Ellipse0007">
                {AppConstant.COPY_TO_CLIPBOARD}
              </p>
            </button>
            <button
              className={`br6 flex h-[40px] items-center border-[1px] border-Ellipse0005 px-[8px]`}
              onClick={handleGeneratePdf}
            >
              <icons.export />
              <p className="text_R_16 ml-[8px] text-Ellipse0007">
                {AppConstant.EXPORT}
              </p>
            </button>
            <Button
              title="Save"
              className="!w-[142px]"
              onClick={() => onSaveClick()}
            />
          </div>
        </div>
      ) : null}
      <div className="br6 justify-center border-[1px]">
        <HtmlEditor
          className="html-editor"
          value={output?.replace(/\n/g, '<br />') || body}
          onValueChanged={handleChange}
          valueType={'html'}
          toolbar={toolbar as dxHtmlEditorToolbar}
        >
          {/* <MediaResizing enabled={true} />
 <ImageUpload tabs={["file", "url"]} fileUploadMode="base64" /> */}
        </HtmlEditor>
      </div>
    </>
  )
}

export default Editor
