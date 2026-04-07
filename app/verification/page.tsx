"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, UserCheck, Shield, ClipboardList, FileText, Lock } from "lucide-react";

type StatusType = "Not Verified" | "Not Completed" | "Pending" | "Accepted";

// ── Status Badge — Figma exact colors ────────────────────────────────────────
const STATUS_STYLES: Record<StatusType, { bg: string; color: string }> = {
  "Not Verified":   { bg: "rgba(250,18,18,0.12)", color: "#fa1212" },
  "Not Completed":  { bg: "rgba(250,18,18,0.12)", color: "#fa1212" },
  "Pending":        { bg: "#fff4e5",               color: "#996500" },
  "Accepted":       { bg: "rgba(178,233,186,0.71)", color: "#006a4e" },
};

function StatusBadge({ status }: { status: StatusType }) {
  const s = STATUS_STYLES[status];
  return (
    <div
      className="flex items-center justify-center rounded-[12px]"
      style={{ backgroundColor: s.bg, paddingLeft: "8px", paddingRight: "8px", paddingTop: "3px", paddingBottom: "3px", width: "fit-content" }}
    >
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: s.color, letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
        {status}
      </span>
    </div>
  );
}

// ── Verification items ────────────────────────────────────────────────────────
const ITEMS = [
  {
    id: "onesyncid",
    icon: <UserCheck size={24} className="text-[#5e5757]" />,
    title: "OneSyncID Verification Status",
    description: "Your current identity verification status on OneSyncID.",
    status: "Not Verified" as StatusType,
    href: "",
  },
  {
    id: "kyc",
    icon: <Shield size={20} className="text-[#5e5757]" />,
    title: "KYC (Know Your Customer)",
    description: "Your identity verification status based on submitted documents.",
    status: "Not Completed" as StatusType,
    href: "",
  },
  {
    id: "aml",
    icon: <ClipboardList size={20} className="text-[#5e5757]" />,
    title: "AML Compliance",
    description: "Confirms your account meets Anti-Money Laundering regulations.",
    status: "Pending" as StatusType,
    href: "",
  },
  {
    id: "terms",
    icon: <FileText size={20} className="text-[#5e5757]" />,
    title: "Terms & Conditions",
    description: "Acceptance of the service's terms and rules.",
    status: "Accepted" as StatusType,
    href: "/verification/terms-and-conditions",
  },
  {
    id: "privacy",
    icon: <Lock size={20} className="text-[#5e5757]" />,
    title: "Privacy Policy",
    description: "Acceptance of the service's privacy rules.",
    status: "Accepted" as StatusType,
    href: "",
  },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function VerificationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[50px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Verification
          </span>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-[30px] w-full">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.href && router.push(item.href)}
              className="flex flex-col gap-[8px] items-start w-full rounded-[12px] p-[20px] text-left"
              style={{ border: "1px solid #d9d9d9", cursor: item.href ? "pointer" : "default" }}
            >
              {/* Icon + title + description */}
              <div className="flex gap-[10px] items-start w-full">
                <div className="shrink-0">{item.icon}</div>
                <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                  <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                    {item.title}
                  </p>
                  <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "normal" }}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Status badge — indented to align with text (icon width + gap) */}
              <div style={{ paddingLeft: "34px" }}>
                <StatusBadge status={item.status} />
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}