import CallList from "@/components/CallList"

const Previous = () => {
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-sans tracking-tight">Previous Meetings</h1>
        <p className="text-gray-400 text-base">Review your completed meetings</p>
      </div>
      <div className="flex-1">
        <CallList key={2} type="ended" />
      </div>
    </section>
  )
}

export default Previous
