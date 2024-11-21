import Panel from '@/components/panel'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className=' relative'>
        <div className="flex">
            <Panel/>
            <section className='flex min-h-screen flex-1 flex-col px-4 pb-6 pt-8 max-md:pb-14 sm:px-7'>
                {children}            
            </section>
        </div>
            
    </main>
  )
}

export default HomeLayout