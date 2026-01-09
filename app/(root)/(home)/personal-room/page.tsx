"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import { Copy, Play } from "lucide-react"

const Table = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row xl:items-center xl:justify-between p-4 rounded-xl bg-dark-2/50 border border-white/5 hover:border-white/10 transition-all duration-200">
    <h1 className="text-base font-semibold text-gray-300 uppercase tracking-wide lg:text-sm xl:min-w-32">{title}</h1>
    <h1 className="truncate text-sm font-mono font-bold text-white max-sm:max-w-[320px] lg:text-base">{description}</h1>
  </div>
)

const PersonalRoom = () => {
  const { user } = useUser()
  const meetingID = user?.id
  const MeetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`
  const { call } = useGetCallById(meetingID!)
  const client = useStreamVideoClient()
  const router = useRouter()

  const startRoom = async () => {
    if (!client || !user) return

    if (!call) {
      const newCall = client.call("default", meetingID!)
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      })
    }
    router.push(`/meeting/${meetingID}?personal=true`)
  }

  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-sans tracking-tight">Personal Room</h1>
        <p className="text-gray-400 text-base">Your personal meeting space with a unique meeting ID and link</p>
      </div>
      <div className="flex w-full flex-col gap-6 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s meeting room`} />
        <Table title="Meeting ID" description={meetingID!} />
        <Table title="Invite Link" description={MeetingLink} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[900px]">
        <Button
          className="bg-blue-1 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          onClick={startRoom}
        >
          <Play size={18} />
          Start Meeting
        </Button>
        <Button
          className="bg-dark-2 hover:bg-dark-3 text-white font-semibold py-3 px-6 rounded-xl border border-white/10 transition-all duration-200 flex items-center justify-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(MeetingLink)
            toast({
              title: "Link Copied",
            })
          }}
        >
          <Copy size={18} />
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
