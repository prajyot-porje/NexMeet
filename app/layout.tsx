import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Toaster } from "@/components/ui/toaster"
import 'react-datepicker/dist/react-datepicker.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "NexMeet",
  description: "Video Conferencing Website",
  icons: "/logo.png",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={
        {
          layout:{
            logoImageUrl:'/logo.png',
          },
          variables:{
            colorText:'#fff',
            colorPrimary:'#0E78F9',
            colorBackground:'#1c1f2e',
            colorInputBackground:'#252a41',
            colorInputText:'#fff'
          }
        }
      }
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-dark-2 text-white antialiased`}
          >
          {children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
