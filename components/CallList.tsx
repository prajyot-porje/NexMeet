'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/router';
import React from 'react'


const CallList = ({type}:{type: 'upcoming' | 'ended' | 'recordings'}) => {
  const {endedCalls , upcomingCalls , callRecordings , isloading} = useGetCalls();
  const router = useRouter();
  const getCalls = ()=>{
    switch (type) {
      case 'ended' :
        return endedCalls; 
      case 'recordings':
        return ;
      case 'upcoming':
        return upcomingCalls;
    
      default:
        break;
    }
  }
  return (
    <div>CallList</div>
  )
}

export default CallList