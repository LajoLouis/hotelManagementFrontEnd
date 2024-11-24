import React from 'react'
import SkeletonElement from './SkeletonElement'

function SkeletonProfile() {
  return (
    <div className='md:w-[60%] xs:w-[80%] flex flex-col mx-auto items-center md:space-y-10 '>
        <SkeletonElement type={"avatar"}/>
        <SkeletonElement type={"bigtext"}/>
        <SkeletonElement type={"bigtext"}/>
        <SkeletonElement type={"bigtext"}/>
        <SkeletonElement type={"bigtext"}/>
        <SkeletonElement type={"bigtext"}/>
        <SkeletonElement type={"bigtext"}/>
    </div>
  )
}

export default SkeletonProfile