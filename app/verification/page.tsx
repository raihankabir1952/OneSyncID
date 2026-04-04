"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info } from "lucide-react";

type StatusType = "Not Verified" | "Not Completed" | "Pending" | "Accepted" | "Verified";

interface VerificationItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  status: StatusType;
}

function StatusBadge({ status }: { status: StatusType }) {
  const styles: Record<StatusType, { bg: string; color: string; border: string }> = {
    "Not Verified": { bg: "#fff0f0", color: "#f04438", border: "1px solid #fde3e0" },
    "Not Completed": { bg: "#fff0f0", color: "#f04438", border: "1px solid #fde3e0" },
    "Pending": { bg: "#fff8e1", color: "#996500", border: "1px solid #ffe082" },
    "Accepted": { bg: "#e8f5e9", color: "#2e7d32", border: "1px solid #c8e6c9" },
    "Verified": { bg: "#e8f0fb", color: "#025fc9", border: "1px solid #9fbfe4" },
  };

  const s = styles[status];

  return (
    <div
      className="flex items-center justify-center self-start rounded-[6px]"
      style={{ backgroundColor: s.bg, border: s.border, paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px" }}
    >
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: s.color, letterSpacing: "0.12px" }}>
        {status}
      </span>
    </div>
  );
}

const VERIFICATION_ITEMS: VerificationItem[] = [
  {
    id: "onesyncid",
    icon: "👤",
    title: "OneSyncID Verification Status",
    description: "Your current identity verification status on OneSyncID.",
    status: "Not Verified",
  },
  {
    id: "kyc",
    icon: "🛡️",
    title: "KYC (Know Your Customer)",
    description: "Your identity verification status based on submitted documents.",
    status: "Not Completed",
  },
  {
    id: "aml",
    icon: "📋",
    title: "AML Compliance",
    description: "Confirms your account meets Anti-Money Laundering regulations.",
    status: "Pending",
  },
  {
    id: "terms",
    icon: "📄",
    title: "Terms & Conditions",
    description: "Acceptance of the service's terms and rules.",
    status: "Accepted",
  },
  {
    id: "privacy",
    icon: "📃",
    title: "Privacy Policy",
    description: "Acceptance of the service's privacy rules.",
    status: "Accepted",
  },
];

export default function VerificationPage() {
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
              Verification
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Verification items */}
          {VERIFICATION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-[12px] w-full rounded-[12px] p-[16px]"
              style={{ border: "1px solid #d9d9d9" }}
            >
              <div className="flex items-start gap-[12px]">
                <div
                  className="flex items-center justify-center rounded-[8px] shrink-0"
                  style={{ width: "40px", height: "40px", backgroundColor: "#f5f5f5" }}
                >
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <span style={{ ...fontSwitzer, fontSize: "15px", fontWeight: 600, color: "#000", letterSpacing: "0.15px" }}>
                    {item.title}
                  </span>
                  <span style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
                    {item.description}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}