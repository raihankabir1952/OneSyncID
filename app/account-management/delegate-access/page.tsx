"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";

interface Delegate {
  id: number;
  name: string;
  username: string;
  status: "Pending Approval" | "Approved" | "Rejected";
  permissionType: string;
  permissionGrantedOn: string;
  relationship: string;
  securityRequirement: string;
  expirationDate: string;
}

interface DelegateActivity {
  id: number;
  name: string;
  username: string;
  datetime: string;
  action: string;
  status: "Success" | "Failed";
}

export default function DelegateAccessPage() {
  const router = useRouter();

  const [delegates, setDelegates] = useState<Delegate[]>([
    {
      id: 1,
      name: "Sam Williams",
      username: "@onesyncid_sam_williams",
      status: "Pending Approval",
      permissionType: "Full Access",
      permissionGrantedOn: "05 Nov 2025",
      relationship: "Sibling",
      securityRequirement: "OTP",
      expirationDate: "04 Feb 2026",
    },
  ]);

  const activities: DelegateActivity[] = [
    { id: 1, name: "Sam Williams", username: "@onesyncid_sam_williams", datetime: "17 Nov 2025, 10:00 AM", action: "Edited work experience", status: "Success" },
    { id: 2, name: "Sam Williams", username: "@onesyncid_sam_williams", datetime: "17 Nov 2025, 10:00 AM", action: "Edited work experience", status: "Success" },
  ];

  const removeDelegate = (id: number) => {
    setDelegates((prev) => prev.filter((d) => d.id !== id));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return { backgroundColor: "#fff8e1", color: "#996500", border: "1px solid #ffe082" };
      case "Approved":
        return { backgroundColor: "#e8f5e9", color: "#2e7d32", border: "1px solid #c8e6c9" };
      case "Rejected":
        return { backgroundColor: "#fff0f0", color: "#f04438", border: "1px solid #fde3e0" };
      default:
        return {};
    }
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
              Delegate Access
            </span>
          </div>

          {/* Delegate cards */}
          {delegates.map((delegate) => (
            <div
              key={delegate.id}
              className="flex flex-col gap-[12px] w-full rounded-[12px] p-[16px]"
              style={{ border: "1px solid #d9d9d9" }}
            >
              {/* User row */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[10px]">
                  <div
                    className="rounded-full shrink-0"
                    style={{ width: "40px", height: "40px", backgroundColor: "#c8c8c8" }}
                  />
                  <div className="flex flex-col gap-[2px]">
                    <div className="flex items-center gap-[4px]">
                      <span style={{ ...fontSwitzer, fontSize: "15px", fontWeight: 600, color: "#000", letterSpacing: "0.15px" }}>
                        {delegate.name}
                      </span>
                      <span style={{ color: "#025fc9", fontSize: "14px" }}>✓</span>
                    </div>
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                      {delegate.username}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[8px]">
                  <button>
                    <Pencil size={18} className="text-[#5e5757]" />
                  </button>
                  <button onClick={() => removeDelegate(delegate.id)}>
                    <Trash2 size={18} className="text-[#5e5757]" />
                  </button>
                </div>
              </div>

              {/* Status badge */}
              <div
                className="flex items-center justify-center self-start rounded-[6px]"
                style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px", ...getStatusStyle(delegate.status) }}
              >
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, letterSpacing: "0.12px" }}>
                  {delegate.status}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-[4px]">
                {[
                  { label: "Permission Type", value: delegate.permissionType },
                  { label: "Permission Granted On", value: delegate.permissionGrantedOn },
                  { label: "Relationship", value: delegate.relationship },
                  { label: "Security Requirement", value: delegate.securityRequirement },
                  { label: "Expiration Date", value: delegate.expirationDate },
                ].map((item) => (
                  <span key={item.label} style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                    {item.label}: <span style={{ color: "#000", fontWeight: 600 }}>{item.value}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Add another */}
          <button className="flex items-center gap-[6px]">
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
              Add another
            </span>
          </button>

          {/* Delegate Activity */}
          <div className="flex flex-col gap-[16px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Delegate Activity
            </span>

            {activities.map((activity, idx) => (
              <div
                key={activity.id}
                className="flex flex-col gap-[6px] w-full py-[12px]"
                style={{ borderBottom: idx < activities.length - 1 ? "1px solid #f0f0f0" : "none" }}
              >
                {/* User + time */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-[10px]">
                    <div
                      className="rounded-full shrink-0"
                      style={{ width: "36px", height: "36px", backgroundColor: "#c8c8c8" }}
                    />
                    <div className="flex flex-col gap-[2px]">
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 600, color: "#000", letterSpacing: "0.14px" }}>
                        {activity.name}
                      </span>
                      <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                        {activity.username}
                      </span>
                    </div>
                  </div>
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                    {activity.datetime}
                  </span>
                </div>

                {/* Action + status */}
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px" }}>
                    {activity.action}
                  </span>
                  <div
                    className="flex items-center justify-center rounded-[6px]"
                    style={{
                      paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px",
                      backgroundColor: activity.status === "Success" ? "#e8f5e9" : "#fff0f0",
                    }}
                  >
                    <span style={{
                      ...fontSwitzer, fontSize: "12px", fontWeight: 500,
                      color: activity.status === "Success" ? "#2e7d32" : "#f04438",
                      letterSpacing: "0.12px",
                    }}>
                      {activity.status}
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