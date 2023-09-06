'use client'

import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Class } from '../classes/page'
import { Menu, MenuItem } from '@szhsin/react-menu'
import icons from '@/assets/svgIcons/index'
import { AppConstant } from '@/constants/AppConstant'
import { Ques } from '../questions/page'

interface classType {
  selectQues?: Ques
  setSelectQues?: Dispatch<SetStateAction<Ques | undefined>>
  questionList?: Ques[]
}

const AssignQuestion: FC<classType> = ({
  questionList,
  selectQues,
  setSelectQues,
}) => {
  return (
    <div className="flex gap-2">
      <div className="relative w-full">
        <Menu
          transition
          menuStyle={{ borderRadius: '7px' }}
          className="w-96 bg-red-500"
          menuButton={
            <div className="">
              <p className="text_MB_16 mb-3">{AppConstant.ASSIGNMENT_QUE}</p>
              <div
                className={`br6 text_R_14 mb-[18px] flex h-[42px] items-center border-[1px] border-gray-300 px-4 text-Ellipse2002`}
              >
                <p className="w-full">{selectQues?.content}</p>
                <icons.chevronDown />
              </div>
            </div>
          }
        >
          <div className="br6 !max-w-[680px] border-[1px] bg-white shadow-[0px_0px_10px_10px_#2C2C2C0F]">
            <div className="br6 max-h-56 overflow-y-auto">
              <MenuItem className="br6 !w-full bg-white !p-0">
                {questionList?.map((d, i) => {
                  return (
                    <div
                      key={i}
                      className="flex h-[40px] cursor-default items-center"
                      onClick={() => setSelectQues && setSelectQues(d)}
                    >
                      <div className="mx-[10px]">
                        <p className="text-Neutral900 dark:text-Neutral900Dark title-medium-B whitespace-nowrap">
                          {d.content}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </MenuItem>
            </div>
          </div>
        </Menu>
        {/* <MenuComp
          title={AppConstant.STUDENT_NAME}
          data={studentList}
          select={selectClass}
          setSelect={setSelectClass}
        /> */}
      </div>
    </div>
  )
}
export default AssignQuestion
