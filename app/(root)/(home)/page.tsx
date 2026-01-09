import MeetingTypeList from "@/components/MeetingTypeList"

const Home = () => {
  const now = new Date()
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(now)
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="h-[300px] w-full rounded-2xl bg-hero bg-cover shadow-2xl overflow-hidden">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 bg-gradient-to-br from-black/40 via-black/50 to-black/60">
          <h2 className="glassmorphism max-w-[270px] rounded-xl py-2.5 px-4 text-center text-base font-medium backdrop-blur-sm border border-white/20">
            Upcoming Meeting : 12.30 PM
          </h2>
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-bold lg:text-6xl font-sans tracking-tight">{time}</h2>
            <p className="text-lg font-medium text-gray-300 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
