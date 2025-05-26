"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconAlignBoxCenterStretch,
  IconApps,
  IconArrowLeft,
  IconBrandSlack,
  IconBrandTabler,
  IconBuildingBridge2,
  IconCircleDashedCheck,
  IconConfucius,
  IconCreativeCommonsNd,
  IconDropletDown,
  IconGizmo,
  IconHexagonPlus2,
  IconHome,
  IconIkosaedr,
  IconLayoutKanbanFilled,
  IconPinInvoke,
  IconSettings,
  IconSpaces,
  IconTransfer,
  IconUserBolt,
  IconVector,
  IconWorld,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "Home",
    href: "/home",
    icon: (
      <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Faucet",
    href: "/faucet",
    icon: (
      <IconIkosaedr className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Token Management Suite",
    href: "#",
    icon: (
      <IconLayoutKanbanFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    isOpen: true,
    children: [
      {
        label: "Token Creator",
        href: "#",
        icon: (
          <IconVector className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "My Tokens",
        href: "#",
        icon: (
          <IconPinInvoke className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Multisender",
        href: "#",
        icon: (
          <IconHexagonPlus2 className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
    ],
  },
  {
    label: "Swap & Bridge Center",
    href: "#",
    icon: (
      <IconAlignBoxCenterStretch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    isOpen: true,
    children: [
      {
        label: "Swap",
        href: "#",
        icon: (
          <IconTransfer className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Bridge",
        href: "#",
        icon: (
          <IconBuildingBridge2 className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Bridge Transactions",
        href: "#",
        icon: (
          <IconConfucius className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
    ],
  },
  {
    label: "Incentives & Tokenomics",
    href: "#",
    icon: (
      <IconCreativeCommonsNd className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    isOpen: true,
    children: [
      {
        label: "Validator Pool",
        href: "#",
        icon: (
          <IconCircleDashedCheck className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "My Stake",
        href: "#",
        icon: (
          <IconSpaces className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Burn Subsidy",
        href: "#",
        icon: (
          <IconDropletDown className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Ecosystem Subsidy",
        href: "#",
        icon: (
          <IconGizmo className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
    ],
  },
];

const topBarLinks = [
  { label: "Community", nav: "", icon: IconWorld },
  { label: "Ecosystem", nav: "", icon: IconApps },
  { label: "Connect Wallet", nav: "", icon: IconBrandSlack },
];

export function CustomSideBar({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        `mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border md:flex-row  bg-background`,
        "h-screen "
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 ">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
            <div className="flex flex-col gap-2 md:bg-subbg md:border-2 border-stroke md:p-6 rounded-xl">
              <Logo />
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 mt-4">
        <div className="w-full flex justify-end px-10 gap-10">
          {topBarLinks?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`flex px-4 py-2 ${
                  item.label == "Connect Wallet" ? "bg-tancolor" : "bg-stroke"
                } rounded-sm gap-2 cursor-pointer  `}
              >
                <item.icon />
                <p className="md:flex hidden">{item.label}</p>
              </div>
            );
          })}
        </div>
        {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        <img src="/assets/brand/logo.svg" alt="" />
      </motion.span>
    </a>
  );
};
