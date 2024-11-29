"use client";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandTabler,
  IconUserBolt,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/Sidebar";
import { Link } from "lucide-react";
import { motion } from "framer-motion";
import { CgChevronLeftR, CgChevronRightR } from "react-icons/cg";
import { BiVideoRecording } from "react-icons/bi";
import { IoAdd, IoHomeOutline, IoVideocamOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Panel = () => {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IoHomeOutline className="text-white h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Upcoming",
      href: "/upcoming",
      icon: <CgChevronRightR className="text-white h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Previous",
      href: "/previous",
      icon: <CgChevronLeftR className="text-white h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Recordings",
      href: "/recordings",
      icon: <IoVideocamOutline className="text-white h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Personal Rooms",
      href: "/personal-room",
      icon: <MdAdd className="text-white h-7 w-7  flex-shrink-0" />,
    },
  ];

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Set hydration state to true after the component mounts
  }, []);

  return (
    <div className="h-screen text-white bg-dark-1">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {isHydrated &&
              (open ? (
                <a href="/" className="flex gap-x-4 text-2xl font-semibold">
                  <img
                    src="/logo.png"
                    alt="cover"
                    className=" h-10 w-10 flex-shrink-0"
                  />{" "}
                  <div>NexMeet </div>
                </a>
              ) : (
                <img
                  src="/logo.png"
                  alt="cover"
                  className=" h-10 w-10 flex-shrink-0"
                />
              ))}
            <div className="mt-8 text-white flex flex-col gap-x-4  gap-2">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <SidebarLink
                    className={cn("px-2 rounded-xl", {
                      "bg-blue-1  ": isActive,
                    })}
                    key={idx}
                    link={link}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "",
                href: "",
                icon: (
                  <SignedIn>
                    <UserButton  />
                  </SignedIn>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};
export default Panel;
