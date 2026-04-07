"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, BadgeCheck, Pencil, Trash2, Plus } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const delegates = [
  {
    id: 1,
    name: "Sam Williams",
    handle: "@onesyncid_sam_williams",
    avatar: "/images/profile-avatar.png",
    status: "Pending Approval",
    statusColor: "#996500",
    statusBg: "#fff4e5",
    permissionType: "Full Access",
    grantedOn: "05 Nov 2025",
    relationship: "Sibling",
    securityRequirement: "OTP",
    expirationDate: "04 Feb 2026",
  },
];

const activities = [
  {
    id: 1,
    name: "Sam Williams",
    handle: "@onesyncid_sam_williams",
    avatar: "/images/profile-avatar.png",
    date: "17 Nov 2025, 10:00 AM",
    action: "Edited work experience",
    status: "Success",
    statusColor: "#006a4e",
    statusBg: "rgba(178,233,186,0.71)",
  },
  {
    id: 2,
    name: "Sam Williams",
    handle: "@onesyncid_sam_williams",
    avatar: "/images/profile-avatar.png",
    date: "17 Nov 2025, 10:00 AM",
    action: "Edited work experience",
    status: "Success",
    statusColor: "#006a4e",
    statusBg: "rgba(178,233,186,0.71)",
  },
];

export default function ManageDelegatePage() {
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
            Manage Delegate
          </span>
        </div>

        {/* Delegate list */}
        <div className="flex flex-col gap-[12px] w-full">
          {delegates.map((d) => (
            <div key={d.id} className="w-full rounded-[12px] p-[20px] flex flex-col gap-[20px]" style={{ border: "1px solid #d9d9d9" }}>
              {/* Header: avatar + name + edit/delete */}
              <div className="flex items-start justify-between w-full">
                <div className="flex gap-[10px] items-start">
                  <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
                    <Image src={d.avatar} alt={d.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[6px]">
                      <div className="flex gap-[8px] items-center">
                        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                          {d.name}
                        </span>
                        <BadgeCheck size={16} className="text-[#025fc9]" fill="#025fc9" color="white" strokeWidth={2} />
                      </div>
                      <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>
                        {d.handle}
                      </span>
                    </div>
                    {/* Status badge */}
                    <div className="flex items-center px-[8px] py-[3px] rounded-[12px]" style={{ backgroundColor: d.statusBg, width: "fit-content" }}>
                      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: d.statusColor, letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Edit + Delete buttons */}
                <div className="flex gap-[20px] items-center shrink-0">
                  <button type="button" className="flex items-center justify-center rounded-[8px] p-[8px]" style={{ border: "1px solid #d9d9d9" }}>
                    <Pencil size={20} className="text-[#333]" />
                  </button>
                  <button type="button" className="flex items-center justify-center w-[36px] h-[36px]">
                    <Trash2 size={22} className="text-[#e53935]" />
                  </button>
                </div>
              </div>

              {/* Permission details */}
              <div className="flex flex-col gap-[8px]">
                {[
                  { label: "Permission Type:", value: d.permissionType },
                  { label: "Permission Granted On:", value: d.grantedOn },
                  { label: "Relationship:", value: d.relationship },
                  { label: "Security Requirement:", value: d.securityRequirement },
                  { label: "Expiration Date:", value: d.expirationDate },
                ].map(({ label, value }) => (
                  <p key={label} style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                    {label}{" "}
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Add another */}
          <button type="button" className="flex items-center gap-[8px]">
            <Plus size={20} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
              Add another
            </span>
          </button>
        </div>

        {/* Delegate Activity */}
        <div className="flex flex-col gap-[10px] w-full">
          <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
            Delegate Activity
          </p>
          <div className="flex flex-col">
            {activities.map((a, idx) => (
              <div
                key={a.id}
                className="flex flex-col gap-[12px] py-[10px]"
                style={{ borderBottom: idx !== activities.length - 1 ? "1px solid #b9b9b9" : "none" }}
              >
                {/* User + date */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex gap-[5px] items-start">
                    <div className="relative w-[37px] h-[37px] rounded-full overflow-hidden shrink-0">
                      <Image src={a.avatar} alt={a.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>
                        {a.name}
                      </span>
                      <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>
                        {a.handle}
                      </span>
                    </div>
                  </div>
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#333", letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
                    {a.date}
                  </span>
                </div>
                {/* Action + status */}
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#333", letterSpacing: "0.12px" }}>
                    {a.action}
                  </span>
                  <div className="flex items-center px-[10px] py-[3px] rounded-[12px]" style={{ backgroundColor: a.statusBg }}>
                    <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: a.statusColor, letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
                      {a.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}