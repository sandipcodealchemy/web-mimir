import React, { FC } from 'react'

interface DotType {
    className: string
}

const Dot: FC<DotType> = ({ className }) => {
    return (
        <div className={'mx-[4px] h-[2px] w-[2px] rounded-full ' + className} />
    )
}

export default Dot
