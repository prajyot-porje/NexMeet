"use client"
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const EndCallButton = () => {
  const router = useRouter()
  const call = useCall()
  const { useLocalParticipant } = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  const isMeetingOwner =
    localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id
  if (!isMeetingOwner) return null

  return (
    <Button
      onClick={async () => {
        await call.endCall()
        router.push("/")
      }}
      className="bg-red-500 hover:bg-red-600 transition-all duration-200 font-semibold px-6 py-2.5 rounded-lg"
    >
      End Call for Everyone
    </Button>
  )
}

export default EndCallButton
