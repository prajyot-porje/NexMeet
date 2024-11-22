import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center w-full h-screen'>
        <Image
         src='/loading-circle.svg'
         alt='LOADER'
         height={50}
         width={50}
        />
    </div>
  )
}

export default Loader