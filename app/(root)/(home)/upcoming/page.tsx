import CallList from "@/components/CallList"

const Upcoming = () => {
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-sans tracking-tight">Upcoming Meetings</h1>
        <p className="text-gray-400 text-base">View and manage your scheduled meetings</p>
      </div>
      <div className="flex-1">
        <CallList key={1} type="upcoming" />
      </div>
    </section>
  )
}
export default Upcoming
