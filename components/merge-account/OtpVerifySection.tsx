"use client";

import { useRef, useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { fontSwitzer } from "@/lib/styles";

// ─── Inline SVG Icons (no expiry) ────────────────────────────────────────────

const PhoneIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#025fc9" : "#5e5757"} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#025fc9" : "#5e5757"} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

// ─── Flag helper ──────────────────────────────────────────────────────────────

function BDFlag() {
  const Flag = Flags["BD" as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className="w-[30px] h-[20px] border border-[#eee]" />;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type OtpTab = "phone" | "email";

type Props = {
  otpTab: OtpTab;
  onOtpTabChange: (tab: OtpTab) => void;
  phoneNumber: string;
  onPhoneNumberChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function OtpVerifySection({
  otpTab,
  onOtpTabChange,
  phoneNumber,
  onPhoneNumberChange,
  email,
  onEmailChange,
}: Props) {
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const phoneFloated = phoneFocused || phoneNumber.length > 0;
  const emailFloated = emailFocused || email.length > 0;

  return (
    /*
     * Figma node: 1854:11518
     * w: 353px | gap: 10px
     */
    <div style={fontSwitzer} className="flex flex-col gap-[10px] w-[353px]">
      <div className="flex flex-col w-full" style={{ gap: "10px" }}>

        {/* ── Phone / Email Tab Switcher ──
         * Figma: bg #f5f5f5 | border 1px #d9d9d9 | radius 12px | px 10px | py 8px | h 53px
         * Active: bg white | border 1px #025fc9 | radius 8px | p 8px
         * Label: Switzer Medium | 16px | leading-[21px] | tracking-[0.16px]
         */}
        <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-[12px] flex items-center px-[10px] py-[8px] gap-1 w-full">
          <button
            type="button"
            onClick={() => onOtpTabChange("phone")}
            style={fontSwitzer}
            className={`flex-1 flex items-center justify-center gap-2 p-[8px] rounded-[8px] transition-all ${
              otpTab === "phone"
                ? "bg-white border border-[#025fc9]"
                : "border border-transparent"
            }`}
          >
            <PhoneIcon active={otpTab === "phone"} />
            <span className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] ${
              otpTab === "phone" ? "text-[#025fc9]" : "text-[#5e5757]"
            }`}>
              Phone
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOtpTabChange("email")}
            style={fontSwitzer}
            className={`flex-1 flex items-center justify-center gap-2 p-[8px] rounded-[8px] transition-all ${
              otpTab === "email"
                ? "bg-white border border-[#025fc9]"
                : "border border-transparent"
            }`}
          >
            <MailIcon active={otpTab === "email"} />
            <span className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] ${
              otpTab === "email" ? "text-[#025fc9]" : "text-[#5e5757]"
            }`}>
              Email
            </span>
          </button>
        </div>

        {/* ── Phone input ──
         * Figma: border 1px #d9d9d9 | radius 12px | px 16px | py 20px | h 88px
         * Flag: 30×20px | dial code: Switzer Regular 16px #5e5757
         * Divider: 1px #d9d9d9 h 48px
         * Label: Switzer Medium 16px #5e5757 → floated 11px #025fc9
         */}
        {otpTab === "phone" && (
          <div
            className={`border rounded-[12px] transition-colors duration-200 cursor-text w-full ${
              phoneFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
            }`}
            onClick={() => phoneRef.current?.focus()}
          >
            <div className="flex items-center gap-3 px-4 h-[64px]">
              {/* Dial code */}
              <div
                className="flex items-center gap-2 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <BDFlag />
                <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">+880</span>
                <ChevronDownIcon />
              </div>
              {/* Divider */}
              <div className="w-px h-[40px] bg-[#d9d9d9] shrink-0" />
              {/* Floating label + input */}
              <div className="relative flex-1 h-full">
                <label
                  style={fontSwitzer}
                  className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                    phoneFloated
                      ? "top-[10px] text-[11px] text-[#025fc9]"
                      : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={(e) => onPhoneNumberChange(e.target.value.replace(/\D/g, ""))}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  style={fontSwitzer}
                  className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Email input ──
         * Figma: same dimensions as phone input
         */}
        {otpTab === "email" && (
          <div
            className={`border rounded-[12px] transition-colors duration-200 cursor-text w-full ${
              emailFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
            }`}
            onClick={() => emailRef.current?.focus()}
          >
            <div className="flex items-center gap-2 px-4 h-[64px]">
              <MailIcon active={emailFocused || email.length > 0} />
              <div className="relative flex-1 h-full">
                <label
                  style={fontSwitzer}
                  className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                    emailFloated
                      ? "top-[10px] text-[11px] text-[#025fc9]"
                      : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
                  }`}
                >
                  Email Address
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={fontSwitzer}
                  className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}