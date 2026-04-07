"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, BadgeCheck, Smartphone } from "lucide-react";

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

  const removeSession = (id: number) =>
    setSessions((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Active Sessions
          </span>
        </div>

        {/* Session list */}
        <div className="flex flex-col w-full">
          {sessions.map((session, idx) => (
            <div
              key={session.id}
              className="flex flex-col gap-[20px]"
              style={{
                paddingTop: idx === 0 ? "10px" : "20px",
                paddingBottom: "20px",
                borderBottom: idx < sessions.length - 1 ? "1px solid #d9d9d9" : "none",
              }}
            >
              {/* Avatar + name + badge/remove */}
              <div className="flex items-start justify-between w-full">
                <div className="flex gap-[10px] items-start">
                  <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
                    <Image src="/images/profile-avatar.png" alt={session.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex gap-[8px] items-center">
                      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                        {session.name}
                      </span>
                      <BadgeCheck size={16} className="text-[#025fc9]" fill="#025fc9" color="white" strokeWidth={2} />
                    </div>
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>
                      {session.username}
                    </span>
                  </div>
                </div>

                {session.isCurrent ? (
                  <div
                    className="flex items-center justify-center rounded-[12px]"
                    style={{ backgroundColor: "rgba(2,95,201,0.1)", paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px" }}
                  >
                    <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#025fc9", lineHeight: "1.3", whiteSpace: "nowrap" }}>
                      Current Device
                    </span>
                  </div>
                ) : (
                  <button type="button" onClick={() => removeSession(session.id)}>
                    <span style={{ ...fontSwitzer, fontSize: "14px", color: "#fa1212", lineHeight: "1.3", whiteSpace: "nowrap" }}>
                      Remove
                    </span>
                  </button>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-[8px]" style={{ maxWidth: "270px" }}>
                {/* Phone Number */}
                <p style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                  Phone Number:{" "}
                  <span style={{ fontWeight: 500, color: "#000" }}>{session.phoneNumber}</span>
                </p>
                {/* Source Device */}
                <div className="flex gap-[4px] items-center">
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px", whiteSpace: "nowrap" }}>
                    Source Device:
                  </span>
                  <div className="flex gap-[5px] items-center">
                    <Smartphone size={14} className="text-[#333] shrink-0" />
                    <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "1.3" }}>
                      {session.sourceDevice}
                    </span>
                  </div>
                </div>
                {/* Last Active */}
                <p style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                  Last Active:{" "}
                  <span style={{ fontWeight: 500, color: "#000" }}>{session.lastActive}</span>
                </p>
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="flex items-center justify-center w-full pt-[60px]">
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#a09898" }}>
                No active sessions
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}