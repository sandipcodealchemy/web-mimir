'use client'
import { CircularProgress } from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'

interface ButtonType {
  className?: string
  title: string
  loading?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<ButtonType> = ({
  title,
  loading,
  onClick,
  className,
}) => {
  return (
    <button
      className={`text_RB_18 br6 flex h-[40px] w-full flex-col items-center justify-center border-[1px] border-themeColor bg-Ellipse1213 text-white ${className}`}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={20} /> : <p>{title}</p>}
    </button>
  )
}
