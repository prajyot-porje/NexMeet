import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Upcoming section 
      </h1>
      <CallList key={1} type = 'upcoming'/>
    </section>
  )
}
export default Upcoming