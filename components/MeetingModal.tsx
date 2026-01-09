"use client"

import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  children?: ReactNode
  handleClick?: () => void
  buttonText?: string
  img?: string
  buttonIcon?: ReactNode
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  buttonIcon,
  img,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full flex max-w-[520px] flex-col gap-6 border border-white/10 bg-dark-1 px-8 py-10 text-white rounded-2xl shadow-2xl">
        <div className="flex flex-col gap-6">
          {img && (
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-1/20 flex items-center justify-center border border-blue-1/30">
                <Image src={img || "/placeholder.svg"} alt="image" width={72} height={72} />
              </div>
            </div>
          )}
          <DialogTitle className={cn("text-4xl font-bold leading-tight tracking-tight font-sans", className)}>
            {title}
          </DialogTitle>
          {children}
          <Button
            className="w-full bg-blue-1 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
