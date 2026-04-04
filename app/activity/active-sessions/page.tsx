"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft } from "lucide-react";

interface Session {
  id: number;
  name: string;
  username: string;
  phoneNumber: string;
  sourceDevice: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function ActiveSessionsPage() {
  const router = useRouter();

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      name: "Sam Williams",
      username: "@onesyncid_sam_williams",
      phoneNumber: "+8801234998765",
      sourceDevice: "iPhone 12",
      lastActive: "1 day ago",
      isCurrent: true,
    },
    {
      id: 2,
      name: "Sam Williams",
      username: "@onesyncid_sam_williams",
      phoneNumber: "+8801234998765",
      sourceDevice: "iPhone 12",
      lastActive: "1 day ago",
      isCurrent: false,
    },
  ]);

  const removeSession = (id: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px", gap: "20px" }}
        >
          {/* Back + Title */}
          <div className="flex items-center gap-[12px]">
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} className="text-black" />
            </button>
            <span style={{ ...fontSwitzer, fontSize: "18px", fontWeight: 600, color: "#000", letterSpacing: "0.8px" }}>
              Active Sessions
            </span>
          </div>

          {/* Session list */}
          <div className="flex flex-col gap-[0px] w-full">
            {sessions.map((session, idx) => (
              <div
                key={session.id}
                className="flex flex-col gap-[10px] w-full py-[16px]"
                style={{ borderBottom: idx < sessions.length - 1 ? "1px solid #d9d9d9" : "none" }}
              >
                {/* User row */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-[10px]">
                    {/* Avatar */}
                    <div
                      className="rounded-full overflow-hidden shrink-0"
                      style={{ width: "40px", height: "40px", backgroundColor: "#c8c8c8" }}
                    />
                    <div className="flex flex-col gap-[2px]">
                      <div className="flex items-center gap-[4px]">
                        <span style={{ ...fontSwitzer, fontSize: "15px", fontWeight: 600, color: "#000", letterSpacing: "0.15px" }}>
                          {session.name}
                        </span>
                        <span style={{ color: "#025fc9", fontSize: "14px" }}>✓</span>
                      </div>
                      <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                        {session.username}
                      </span>
                    </div>
                  </div>

                  {/* Badge or Remove */}
                  {session.isCurrent ? (
                    <div
                      className="flex items-center justify-center rounded-[6px]"
                      style={{ backgroundColor: "#e8f0fb", paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px" }}
                    >
                      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.12px" }}>
                        Current Device
                      </span>
                    </div>
                  ) : (
                    <button onClick={() => removeSession(session.id)}>
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#f04438", letterSpacing: "0.14px" }}>
                        Remove
                      </span>
                    </button>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-[4px]">
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                    Phone Number: <span style={{ color: "#000", fontWeight: 500 }}>{session.phoneNumber}</span>
                  </span>
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                    Source Device: 📱 <span style={{ color: "#000", fontWeight: 500 }}>{session.sourceDevice}</span>
                  </span>
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                    Last Active: <span style={{ color: "#000", fontWeight: 500 }}>{session.lastActive}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}