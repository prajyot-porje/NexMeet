import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'
export const metadata: Metadata = {
  title: "NexMeet",
  description: "Video Conferencing Website",
  icons: "/logo.png",
};
const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout