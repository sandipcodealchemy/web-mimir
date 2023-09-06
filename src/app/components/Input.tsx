'use client'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import icons from '@/assets/svgIcons/index'
import { I_TYPE } from '@/constants/AppConstant'

interface InputType {
  title?: string
  type: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  IsEye?: boolean
  className?: string
  placeholder?: string
  disabled?: boolean
}

export const Input: FC<InputType> = ({
  title,
  type,
  value,
  setValue,
  IsEye,
  className,
  placeholder,
  disabled,
}) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <p className="text_MB_16 mb-3 text-Ellipse2002">{title}</p>
      <div
        className={`br6 mb-[18px] flex border-[1px] border-gray-300 ${className}`}
      >
        <input
          type={
            type === I_TYPE.PASSWORD
              ? show
                ? I_TYPE.TEXT
                : I_TYPE.PASSWORD
              : type
          }
          placeholder={placeholder}
          value={value}
          className={` ${
            IsEye ? 'pl-4' : 'px-4'
          } text_R_14 br6 block h-[40px] w-full appearance-none bg-transparent text-Ellipse2002 outline-none focus:border-blue-500 focus:ring-blue-500`}
          onChange={(e) => setValue(e?.target?.value)}
          disabled={disabled}
        />
        {type === I_TYPE.PASSWORD && (
          <button
            className="flex w-[44px] items-center justify-center "
            onClick={() => setShow(!show)}
          >
            {show ? <icons.eye /> : <icons.eyeSlash />}
          </button>
        )}
      </div>
    </div>
  )
}
