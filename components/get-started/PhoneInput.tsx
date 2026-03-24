"use client";

import { fontSwitzer } from "@/lib/styles";
import * as Flags from "country-flag-icons/react/3x2";

// Inline SVG Icons
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

type TabType = "phone" | "email";

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

export default function PhoneInput({
  activeTab,
  phoneNumber,
  email,
  phoneCode,
  countryCode,
  onPhoneChange,
  onEmailChange,
}: Props) {
  const emailTouched = email.length > 0;
  const emailValid = isValidEmail(email);

  if (activeTab === "phone") {
    return (
      <div className="border border-[#d9d9d9] rounded-[12px] px-4 py-5">
        <div className="flex items-center">

          {/* Flag + code + chevron */}
          <div className="flex items-center gap-2 shrink-0">
            <FlagIcon
              countryCode={countryCode}
              className="w-[30px] h-[20px] border border-[#eee]"
            />
            <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">
              {phoneCode}
            </span>
            <ChevronDownIcon />
          </div>

          {/* Divider */}
          <div className="w-px h-[40px] bg-[#d9d9d9] mx-3 shrink-0" />

          {/* Input */}
          <div className="flex flex-col gap-[6px] flex-1">
            <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
              PHONE NUMBER
            </p>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
              style={fontSwitzer}
              className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-[12px] px-4 py-5 flex flex-col gap-[6px] ${
      emailTouched && !emailValid ? "border-red-400" : "border-[#d9d9d9]"
    }`}>
      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
        EMAIL ADDRESS
      </p>
      <input
        type="email"
        placeholder="example@mail.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        style={fontSwitzer}
        className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none w-full"
      />
      {emailTouched && !emailValid && (
        <p style={fontSwitzer} className="text-[12px] text-red-500 mt-1">
          Please enter a valid email address
        </p>
      )}
      {emailTouched && emailValid && (
        <p style={fontSwitzer} className="text-[12px] text-green-500 mt-1">
          ✓ Valid email
        </p>
      )}
    </div>
  );
}