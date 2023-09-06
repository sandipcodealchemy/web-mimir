'use client'

import { AppConstant } from '@/constants/AppConstant'
import icons from '@/assets/svgIcons/index'

export default function RightSide({
  gptOutPut,
  reGenerate,
  newGenerate,
}: {
  gptOutPut?: string
  reGenerate?: any
  newGenerate: any
}) {
  return (
    <div className="relative">
      <div className=" h-screen overflow-y-auto bg-Ellipse0008 px-[32px] py-[38px] ">
        <div
          dangerouslySetInnerHTML={{
            __html: gptOutPut ? gptOutPut : ''?.replace(/\n/g, '<br />'),
          }}
        />
      </div>
      <div className="absolute bottom-9 flex w-full justify-center px-[32px]">
        <button
          className={`
            br6
            text_R_18 mr-[10px] h-[40px] border-[1px] border-Ellipse1214 bg-Ellipse1213 px-[28px] text-white`}
          onClick={newGenerate}
        >
          {AppConstant.GENERATE_NEWS}
        </button>
        <button
          className={`
            br6
            text_R_18 ml-[10px] flex h-[40px] items-center border-[1px] border-Ellipse1214 bg-Ellipse1213 px-[28px] text-white`}
          onClick={reGenerate}
        >
          <icons.reGenerate />
          <p className="ml-[8px]">{AppConstant.REGENERATE}</p>
        </button>
      </div>
    </div>
  )
}
