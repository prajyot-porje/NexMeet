import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  const date = (new Intl.DateTimeFormat('en-IN',{dateStyle:'full'})).format(now)
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded-xl py-2 text-center text-base font-normal'>Upcoming Meeting : 12.30 PM </h2>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-extrabold lg:text-5xl'>
              {time}
            </h2>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList/>
    </section>
  )
}

export default Home