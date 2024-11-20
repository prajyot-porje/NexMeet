import Panel from '@/components/panel'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className=' relative'>
        <div className="flex">
            <Panel/>
                {children}            
        </div>
            
    </main>
  )
}

export default HomeLayout