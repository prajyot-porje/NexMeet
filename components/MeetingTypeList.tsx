"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoVideocamOutline } from 'react-icons/io5'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { TiUserAdd } from 'react-icons/ti'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/hooks/use-toast"


const MeetingTypeList = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [MeetingState, setMeetingState] = useState< 'isScheduleMeeting' | 'isInstantMeeting' | 'isJoiningMeeting' | undefined>()
    const {user} = useUser();
    const client = useStreamVideoClient();
    const [Values , SetValues]= useState({
        dateTime : new Date(),
        desc : '',
        link : ''
    });

    const[CallDetails , setCallDetails] = useState<Call>();

    const createMeeting = async()=>{
        if(!user || !client) return ;

        try {
            if(!Values.dateTime){
                toast({title: "Please Select a Date And Time"});
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default',id);
            if(!call) throw new Error('Failed to Create CAll');
            const startsAt =  Values.dateTime.toISOString() || new Date(Date.now()).toISOString() ;
            const description = Values.desc || 'Instant Meeting';
            await call.getOrCreate({
                data:{
                    starts_at : startsAt,
                    custom:{
                        description
                    }
                }
            })     
            setCallDetails(call);
            if(!Values.desc){
                router.push(`/meeting/${call.id}`)
            }      

            toast({
                title: "Meeting Created",
              })   

        } catch (error) {
            toast({
                title: "Failed to Create Meeting",
              })           
        }
    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4' >
        <div className='bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-[14px] cursor-pointer'
        onClick={()=>setMeetingState('isInstantMeeting')}
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <FaPlus size={27}/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'>New Meeting</h1>
                <p className='text-lg font-normal'>Start a Instant Meeting</p>
            </div>
        </div>
        <div className='bg-blue-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-[14px] cursor-pointer'
        onClick={()=>setMeetingState('isJoiningMeeting')}
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <TiUserAdd size={30}/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'>Join Meeting</h1>
                <p className='text-lg font-normal'>via Invitation Link</p>
            </div>
        </div>
        <div className='bg-purple-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-[14px] cursor-pointer'
        onClick={()=>setMeetingState('isScheduleMeeting')}
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <MdOutlineCalendarToday size={27}/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'>Schedule Meeting</h1>
                <p className='text-lg font-normal'>Plan your Meeting</p>
            </div>
        </div>
        <div className='bg-yellow-1 px-4 py-6 flex flex-col justify-between  xl:max-w-[350px] min-h-[260px] rounded-[14px] cursor-pointer'
        onClick={()=> router.push('/recordings')}
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <IoVideocamOutline size={30}/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'>View Recoeding</h1>
                <p className='text-lg font-normal'>Meeting Recordings</p>
            </div>
        </div>

        <MeetingModal
        isOpen={MeetingState === 'isInstantMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title = "Create an Instant Meeting"
        buttonText="Start Meeting"
        className = "text-center"
        handleClick ={createMeeting}
        />
  
    </section>
  )
}

export default MeetingTypeList