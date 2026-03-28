"use client";

import { useRef, useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import * as Flags from "country-flag-icons/react/3x2";

// ─── Inline SVG Chevron ───────────────────────────────────────────────────────
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
export type TabType = "phone" | "email";

type Props = {
  activeTab: TabType;
  phoneNumber: string;
  email: string;
  phoneCode: string;
  countryCode: string;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
};

function FlagIcon({ countryCode, className }: { countryCode: string; className?: string }) {
  const Flag = Flags[countryCode as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className={className} />;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Component ───────────────────────────────────────────────────────────────
/*
 * Figma: APP/1.2.1 — node 4295:12154 / 4295:12156
 *
 * PHONE layout (border-bottom flat style):
 *   Label   : "PHONE NUMBER" — Switzer Medium 16px #5e5757 tracking-[0.16px] leading-[21px]
 *   Row     : border-b 1px #d9d9d9 | py 10px
 *   Dial    : flag 30×20px | code Switzer Regular 16px #5e5757 | chevron
 *   Input   : Switzer Regular 16px #3a3a3a | placeholder #a09898
 *
 * EMAIL layout (same flat style):
 *   Label   : "EMAIL ADDRESS"
 *   Row     : border-b 1px #d9d9d9 | py 10px | h 41px
 *   Input   : placeholder "Enter your email address"
 */
export default function PhoneInput({
  activeTab,
  phoneNumber,
  email,
  phoneCode,
  countryCode,
  onPhoneChange,
  onEmailChange,
}: Props) {
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const emailTouched = email.length > 0;
  const emailValid   = isValidEmail(email);

  // ── Phone ─────────────────────────────────────────────────────────────────
  if (activeTab === "phone") {
    return (
      <div className="flex flex-col gap-[10px] w-full">
        {/* Label */}
        <p style={fontSwitzer} className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
          PHONE NUMBER
        </p>

        {/* Input row — flat bottom border, Figma style */}
        <div
          className={`flex items-center justify-between border-b py-[10px] w-full overflow-hidden transition-colors ${
            phoneFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
          }`}
          onClick={() => phoneRef.current?.focus()}
        >
          {/* Flag + dial code + chevron */}
          <div className="flex items-center gap-[3px] shrink-0 cursor-pointer">
            <div className="flex items-center gap-[8px]">
              <FlagIcon
                countryCode={countryCode}
                className="w-[30px] h-[20px] border border-[#eee] shrink-0"
              />
              <span style={fontSwitzer} className="text-[16px] text-[#5e5757] whitespace-nowrap">
                {phoneCode}
              </span>
            </div>
            <ChevronDownIcon />
          </div>

          {/* Number input */}
          <input
            ref={phoneRef}
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            placeholder="Enter your number"
            style={fontSwitzer}
            className="flex-1 ml-[8px] bg-transparent outline-none text-[16px] text-[#3a3a3a] placeholder:text-[#a09898]"
          />
        </div>
      </div>
    );
  }

  // ── Email ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {/* Label */}
      <p style={fontSwitzer} className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
        EMAIL ADDRESS
      </p>

      {/* Input row */}
      <div
        className={`flex items-center border-b h-[41px] py-[10px] w-full overflow-hidden transition-colors ${
          emailTouched && !emailValid && !emailFocused
            ? "border-red-400"
            : emailFocused
            ? "border-[#025fc9]"
            : emailTouched && emailValid
            ? "border-green-400"
            : "border-[#d9d9d9]"
        }`}
        onClick={() => emailRef.current?.focus()}
      >
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          placeholder="Enter your email address"
          style={fontSwitzer}
          className="w-full bg-transparent outline-none text-[16px] text-[#3a3a3a] placeholder:text-[#a09898]"
        />
      </div>

      {/* Inline validation hint */}
      {emailTouched && !emailFocused && (
        <p style={fontSwitzer} className={`text-[12px] leading-normal ${emailValid ? "text-green-500" : "text-red-500"}`}>
          {emailValid ? "✓ Valid email" : "Please enter a valid email address"}
        </p>
      )}
    </div>
  );
}