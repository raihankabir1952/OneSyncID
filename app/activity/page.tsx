"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Monitor, CheckCircle, Shield } from "lucide-react";

const SECTIONS = [
  {
    id: "login-history",
    icon: <Monitor size={24} className="text-[#5e5757]" />,
    title: "Login History",
    description: "See all logins to your organization account, including where, when, and from which device.",
    route: "/activity/login-history",
  },
  {
    id: "active-sessions",
    icon: <CheckCircle size={24} className="text-[#5e5757]" />,
    title: "Active Sessions",
    description: "View all devices currently signed in to your account, including last activity and location. Sign out of any session you don't recognize.",
    route: "/activity/active-sessions",
  },
  {
    id: "registered-devices",
    icon: <Shield size={24} className="text-[#5e5757]" />,
    title: "Registered Devices",
    description: "Add devices you trust to access your account. Only registered devices can log in.",
    route: "/activity/registered-devices",
  },
];

export default function ActivityPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Nav */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} style={{ objectFit: "contain" }} />
          </div>
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
              <Bell size={24} className="text-black" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
              <Mail size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "16px" }}
        >
          {/* Heading */}
          <div className="flex items-center gap-[5px]" style={{ marginBottom: "8px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Devices & Sessions
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Section cards */}
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => router.push(section.route)}
              className="flex items-start gap-[16px] w-full rounded-[12px] p-[16px] text-left"
              style={{ border: "1px solid #d9d9d9" }}
            >
              <div
                className="flex items-center justify-center rounded-[8px] shrink-0"
                style={{ width: "44px", height: "44px", backgroundColor: "#f5f5f5" }}
              >
                {section.icon}
              </div>
              <div className="flex flex-col gap-[6px]">
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
                  {section.title}
                </span>
                <span style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
                  {section.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}