"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, Monitor, Laptop, Activity } from "lucide-react";

const SECTIONS = [
  {
    id: "login-history",
    icon: <Monitor size={28} className="text-[#5e5757]" />,
    title: "Login History",
    description: "See all logins to your organization account, including where, when, and from which device.",
    route: "/activity/login-history",
  },
  {
    id: "active-sessions",
    icon: <Activity size={28} className="text-[#5e5757]" />,
    title: "Active Sessions",
    description: "View all devices currently signed in to your account, including last activity and location. Sign out of any session you don't recognize.",
    route: "/activity/active-sessions",
  },
  {
    id: "registered-devices",
    icon: <Laptop size={28} className="text-[#5e5757]" />,
    title: "Registered Devices",
    description: "Add devices you trust to access your account. Only registered devices can log in.",
    route: "/activity/registered-devices",
  },
];

export default function ActivityPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Devices &amp; Sessions
          </span>
        </div>

        {/* Section cards */}
        <div className="flex flex-col gap-[20px] w-full">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => router.push(section.route)}
              className="flex items-start w-full rounded-[12px] text-left"
              style={{
                border: "1px solid #d9d9d9",
                paddingTop: "20px",
                paddingBottom: "30px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <div className="flex gap-[15px] items-start w-full">
                {/* Icon */}
                <div className="shrink-0" style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {section.icon}
                </div>
                {/* Text */}
                <div className="flex flex-col gap-[10px] flex-1 min-w-0">
                  <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                    {section.title}
                  </p>
                  <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "normal" }}>
                    {section.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}