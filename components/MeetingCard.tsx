"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { avatarImages } from "@/constants"
import { CgChevronLeftR, CgChevronRightR } from "react-icons/cg"
import { IoVideocamOutline } from "react-icons/io5"
import { useToast } from "@/hooks/use-toast"
import { MdOutlineContentCopy, MdOutlinePlayCircleOutline } from "react-icons/md"

interface MeetingCardProps {
  title: string
  date: string
  icon: string
  isPreviousMeeting?: boolean
  buttonIcon1?: string
  buttonText?: string
  handleClick: () => void
  link: string
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast()

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] px-6 py-8 xl:max-w-full border border-white/10 hover:border-white/20 hover:bg-gradient-to-br hover:from-white/8 hover:to-white/[0.03] transition-all duration-300">
      <article className="flex flex-col gap-5">
        {icon === "ended" ? (
          <CgChevronLeftR className="text-gray-400 h-6 w-6 flex-shrink-0" />
        ) : icon === "upcoming" ? (
          <CgChevronRightR className="text-gray-400 h-6 w-6 flex-shrink-0" />
        ) : (
          <IoVideocamOutline className="text-blue-400 h-6 w-6 flex-shrink-0" />
        )}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-sm font-medium text-gray-400">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img || "/placeholder.svg"}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full border border-white/10", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-2 border-white/20 bg-white/5 text-xs font-semibold text-gray-300">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-3">
            <Button
              onClick={handleClick}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-2.5 font-semibold transition-all duration-200 flex items-center gap-2"
            >
              {buttonIcon1 === "recordings" ? <MdOutlinePlayCircleOutline size={18} /> : undefined}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link)
                toast({
                  title: "Link Copied",
                })
              }}
              className="bg-white/10 hover:bg-white/15 px-6 py-2.5 font-semibold transition-all duration-200 flex items-center gap-2 rounded-lg"
            >
              <MdOutlineContentCopy size={18} />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  )
}

export default MeetingCard
