'use client'

import icons from '@/assets/svgIcons/index'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'
import { Menu, MenuItem } from '@szhsin/react-menu'
import { SelectType } from '@/types'
import { Loading } from '../components/Loading'

interface MenuType {
  data?: SelectType[]
  title: string
  select?: SelectType
  setSelect: Dispatch<SetStateAction<SelectType | undefined>>
  InputCust?: ReactElement<any, any>
  AddButton?: ReactElement<any, any>
}

export const MenuComp: FC<MenuType> = ({
  data,
  title,
  select,
  setSelect,
  InputCust,
  AddButton,
}) => {
  return (
    <Menu
      transition
      menuStyle={{ borderRadius: '7px' }}
      className="w-96 bg-red-500"
      menuButton={
        <div className="">
          <p className="text_MB_16 mb-3 text-Ellipse2003">{title}</p>
          <div
            className={`br6 text_R_14 mb-[18px] flex h-[42px] items-center border-[1px] border-gray-300 px-4 text-Ellipse2002`}
          >
            <p className="w-full">{select?.name}</p>
            <icons.chevronDown />
          </div>
        </div>
      }
    >
      <div className="br6 relative !max-w-[680px] border-[1px] bg-white shadow-[0px_0px_10px_10px_#2C2C2C0F]">
        <div className="br6 max-h-56 overflow-y-auto">
          <MenuItem className="br6 !w-full bg-white !p-0">
            {data === undefined ? (
              <div className="mt-[50px] flex items-center justify-center">
                <Loading />
              </div>
            ) : data?.length === 0 ? (
              <div className="text_RB_18 mx-2 my-4 flex flex-1 items-center justify-center text-Ellipse2001">
                no data found
              </div>
            ) : (
              <div className="">
                {data?.map((d, i) => {
                  return (
                    <div
                      key={i}
                      className="flex h-[40px] cursor-default items-center"
                      onClick={() => setSelect(d)}
                    >
                      <div className="mx-[10px]">
                        <p className="text-Neutral900 dark:text-Neutral900Dark title-medium-B whitespace-nowrap">
                          {d.name}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </MenuItem>
          {/* <MenuItem className="br6 !w-full bg-white !p-0">
            {data?.map((d, i) => {
              return (
                <div
                  key={i}
                  className="flex h-[40px] cursor-default items-center"
                  onClick={() => setSelect(d)}
                >
                  <div className="mx-[10px]">
                    <p className="text-Neutral900 dark:text-Neutral900Dark title-medium-B whitespace-nowrap">
                      {d.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </MenuItem> */}
        </div>
      </div>
    </Menu>
  )
}
