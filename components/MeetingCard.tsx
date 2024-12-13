import React from 'react'
import { CgChevronRightR } from 'react-icons/cg'

const MeetingCard = () => {
  return (
    <div className='h-[200px] w-[500px] bg-[#1c1f2e] flex flex-col justify-center pl-4 rounded-lg'>
        <div>
            <CgChevronRightR className="text-white h-7 w-7 flex-shrink-0"/>
        </div>
        <div className='text-2xl font-bold'>
            Team Sync: Sprint Planning & Update
        </div>
        <div>
            March 15,2024 - 10:00 AM
        </div>
        <div className='flex pt-6'>
            <div>profile symbols</div>
            <div>buttons </div>
        </div>
    </div>
  )
}

export default MeetingCard