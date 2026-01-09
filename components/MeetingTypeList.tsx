"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { IoVideocamOutline } from "react-icons/io5"
import { MdContentCopy, MdOutlineCalendarToday } from "react-icons/md"
import { TiUserAdd } from "react-icons/ti"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { type Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from "react-datepicker"
import { Input } from "./ui/input"

const MeetingTypeList = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isInstantMeeting" | "isJoiningMeeting" | undefined
  >()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    desc: "",
    link: "",
  })

  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!user || !client) return

    try {
      if (!values.dateTime) {
        toast({ title: "Please Select a Date And Time" })
        return
      }
      const id = crypto.randomUUID()
      const call = client.call("default", id)
      if (!call) throw new Error("Failed to Create Call")
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.desc || "Instant Meeting"
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })
      setCallDetails(call)
      if (!values.desc) {
        router.push(`/meeting/${call.id}`)
      }

      toast({
        title: "Meeting Created",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to Create Meeting",
      })
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div
        className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 hover:from-orange-500/15 hover:to-orange-600/10 px-6 py-8 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-xl cursor-pointer transition-all duration-300 border border-orange-500/20 hover:border-orange-500/40 group"
        onClick={() => setMeetingState("isInstantMeeting")}
      >
        <div className="flex justify-center items-center glassmorphism size-12 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-all duration-200">
          <FaPlus size={27} className="text-orange-400" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">New Meeting</h1>
          <p className="text-base font-medium text-gray-300">Start an Instant Meeting</p>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/15 hover:to-blue-600/10 px-6 py-8 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-xl cursor-pointer transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 group"
        onClick={() => setMeetingState("isJoiningMeeting")}
      >
        <div className="flex justify-center items-center glassmorphism size-12 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-200">
          <TiUserAdd size={30} className="text-blue-400" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">Join Meeting</h1>
          <p className="text-base font-medium text-gray-300">via Invitation Link</p>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover:from-purple-500/15 hover:to-purple-600/10 px-6 py-8 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-xl cursor-pointer transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 group"
        onClick={() => setMeetingState("isScheduleMeeting")}
      >
        <div className="flex justify-center items-center glassmorphism size-12 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-all duration-200">
          <MdOutlineCalendarToday size={27} className="text-purple-400" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">Schedule Meeting</h1>
          <p className="text-base font-medium text-gray-300">Plan your Meeting</p>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover:from-amber-500/15 hover:to-amber-600/10 px-6 py-8 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[260px] rounded-xl cursor-pointer transition-all duration-300 border border-amber-500/20 hover:border-amber-500/40 group"
        onClick={() => router.push("/recordings")}
      >
        <div className="flex justify-center items-center glassmorphism size-12 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-all duration-200">
          <IoVideocamOutline size={30} className="text-amber-400" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">View Recording</h1>
          <p className="text-base font-medium text-gray-300">Meeting Recordings</p>
        </div>
      </div>

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Add a Description</label>
            <Textarea
              onChange={(e) => setValues({ ...values, desc: e.target.value })}
              className="bg-white/5 border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Select date</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-lg bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({ title: "Link Copied" })
          }}
          img="/checked.svg"
          buttonIcon={<MdContentCopy />}
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create an Instant Meeting"
        buttonText="Start Meeting"
        className="text-center"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter the link here"
        buttonText="Join Meeting"
        className="text-center"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting Link"
          className="bg-white/5 border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
