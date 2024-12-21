import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Previous
      </h1>
      <CallList key={2} type='ended'/>
    </section>
  )
}

export default Previous