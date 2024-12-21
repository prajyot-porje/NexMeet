import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaList } from "react-icons/fa";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./ui/Loader";

type meetingTypeList = "speaker-left" | "speaker-right" | "grid";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<meetingTypeList>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED ) return <Loader/>

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };
  return (
    <section className=" relative h-screen w-full mt-4 overflow-hidden text-white">
      <div className=" relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center mb-4 flex-wrap gap-5">

        <CallControls onLeave={()=> router.push('/')} />

        <DropdownMenu>
          <div className="flex items-center">
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
            <FaList size={20} />            
          </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left','Speaker-Right'].map((item , index)=>(
              <div key={index}>
                <DropdownMenuItem
                className=" cursor-pointer"
                onClick={()=>{
                  setLayout(item.toLowerCase() as meetingTypeList)
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className=" border-dark-1"/>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=> setShowParticipants((prev)=>!prev)}>
          <div className=" cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
            <Users size={20} className="text-white"/>
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  );
};
export default MeetingRoom;
