"use client";

import { fontSwitzer } from "@/lib/styles";

// ─── Inline SVG Icons (no expiry) ────────────────────────────────────────────
const PhoneIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20" height="20" viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#025fc9" : "#5e5757"}
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20" height="20" viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#025fc9" : "#5e5757"}
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
export type TabType = "phone" | "email";

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

// ─── Component ───────────────────────────────────────────────────────────────
/*
 * Figma: APP/1.2.1 — node 4295:11743
 * Container : border 1px #d9d9d9 | radius 12px | px 16px | py 8px
 * Active tab: border-bottom 3px #025fc9 | p 8px
 * Label     : Switzer Medium 16px | leading-[21px] | tracking-[0.16px]
 */
export default function PhoneEmailToggle({ activeTab, onTabChange }: Props) {
  return (
    <div className="border border-[#d9d9d9] rounded-[12px] px-[16px] py-[8px] flex items-center w-full">

      {/* Phone Tab */}
      <button
        type="button"
        onClick={() => onTabChange("phone")}
        className={`flex flex-1 items-center justify-center gap-[8px] p-[8px] transition-all ${
          activeTab === "phone" ? "border-b-[3px] border-[#025fc9]" : "border-b-[3px] border-transparent"
        }`}
      >
        <PhoneIcon active={activeTab === "phone"} />
        <span
          style={fontSwitzer}
          className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] whitespace-nowrap ${
            activeTab === "phone" ? "text-[#025fc9]" : "text-[#5e5757]"
          }`}
        >
          Phone
        </span>
      </button>

      {/* Email Tab */}
      <button
        type="button"
        onClick={() => onTabChange("email")}
        className={`flex flex-1 items-center justify-center gap-[8px] p-[8px] transition-all ${
          activeTab === "email" ? "border-b-[3px] border-[#025fc9]" : "border-b-[3px] border-transparent"
        }`}
      >
        <MailIcon active={activeTab === "email"} />
        <span
          style={fontSwitzer}
          className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] whitespace-nowrap ${
            activeTab === "email" ? "text-[#025fc9]" : "text-[#5e5757]"
          }`}
        >
          Email
        </span>
      </button>

    </div>
  );
}