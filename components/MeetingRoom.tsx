"use client"

import { cn } from "@/lib/utils"
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FaList } from "react-icons/fa"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Users } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import EndCallButton from "./EndCallButton"
import Loader from "./ui/Loader"

type meetingTypeList = "speaker-left" | "speaker-right" | "grid"

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get("personal")
  const [layout, setLayout] = useState<meetingTypeList>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const router = useRouter()
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />
      default:
        return <SpeakerLayout participantsBarPosition="left" />
    }
  }
  return (
    <section className="relative h-screen w-full mt-4 overflow-hidden text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2 transition-all duration-200", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center mb-6 flex-wrap gap-4 px-4">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl px-4 py-3 bg-dark-2 hover:bg-dark-3 transition-all duration-200 border border-white/10 hover:border-white/20">
              <FaList size={20} />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border border-white/10 bg-dark-1 text-white rounded-xl shadow-xl">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-dark-2 transition-all duration-150 rounded-lg"
                  onClick={() => {
                    setLayout(item.toLowerCase() as meetingTypeList)
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-2 my-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl px-4 py-3 bg-dark-2 hover:bg-dark-3 transition-all duration-200 border border-white/10 hover:border-white/20">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}
export default MeetingRoom
