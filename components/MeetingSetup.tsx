"use client"
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false)
  const call = useCall()
  if (!call) throw new Error("useCall must be used within StreamCall component")
  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-8 text-white px-4 bg-gradient-to-br from-dark-1 via-dark-1 to-dark-2">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-sans tracking-tight">Join Meeting</h1>
        <p className="text-gray-400 text-base">Adjust your camera and microphone settings</p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <VideoPreview />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex items-center gap-3 p-4 bg-dark-2/50 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200 cursor-pointer">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setisMicCamToggledOn(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="font-medium">Join with Camera and Microphone off</span>
        </label>
        <DeviceSettings />
      </div>

      <Button
        className="w-full max-w-md rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-white"
        onClick={() => {
          call.join()
          setIsSetupComplete(true)
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
