'use client'

import Meeting from '@/app/(root)/meeting/[id]/page';
import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk';
import { Call } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import MeetingCard from './MeetingCard';


const CallList = ({type}:{type: 'upcoming' | 'ended' | 'recordings'}) => {
  const {endedCalls , upcomingCalls , callRecordings , isloading} = useGetCalls();
  // const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const getCalls = ()=>{
    switch (type) {
      case 'ended' :
        return endedCalls; 
      case 'recordings':
        return   recordings;
      case 'upcoming':
        return upcomingCalls;
    
      default:
        return [];
    }
  }
  const getNoCallsMessage = ()=>{
    switch (type) {
      case 'ended' :
        return 'No Previous Calls'; 
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return "No Upcoming Calls";
    
      default:
        return '';
    }
  }

  const calls = getCalls();
  const NocallsMessage = getNoCallsMessage();

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting : Call | CallRecording)=>(
        <MeetingCard/>
      )): (
        <h1>{NocallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList