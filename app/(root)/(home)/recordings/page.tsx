import CallList from "@/components/CallList"

const Recordings = () => {
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-sans tracking-tight">Recordings</h1>
        <p className="text-gray-400 text-base">Access your saved meeting recordings</p>
      </div>
      <div className="flex-1">
        <CallList key={3} type="recordings" />
      </div>
    </section>
  )
}

export default Recordings
