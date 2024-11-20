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
import { IoHomeOutline } from "react-icons/io5";

const Panel = () => {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IoHomeOutline className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Upcoming",
      href: "/upcoming",
      icon: (
        <CgChevronRightR className="text-white h-5 w-5 flex-shrink-0" />        
      ),
    },
    {
      label: "Previous",
      href: "/previous",
      icon: (
        <CgChevronLeftR className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Recordings",
      href: "/recordings",
      icon: (
        <BiVideoRecording className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Set hydration state to true after the component mounts
  }, []);

  return (
    <div className="h-screen text-white bg-dark-1">
      <Sidebar  open={open} setOpen={setOpen}>
        <SidebarBody className="">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {isHydrated && (open ?  <a href="/" className="flex gap-2 text-lg font-semibold" ><img  src="/logo.png" alt="cover" className=" h-7 w-7 flex-shrink-0" /> NexMeet </a>:<img  src="/logo.png" alt="cover" className=" h-7 w-7 flex-shrink-0"/> )}
            <div className="mt-8 text-white flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Login/Logout",
                href: "#",
                icon: (
                    <IconUserBolt className="text-white h-5 w-5 flex-shrink-0" />
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
