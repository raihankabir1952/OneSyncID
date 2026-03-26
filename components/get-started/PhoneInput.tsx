"use client";

import { useRef, useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import * as Flags from "country-flag-icons/react/3x2";

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
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const phoneLabelFloated = phoneFocused || phoneNumber.length > 0;
  const emailLabelFloated = emailFocused || email.length > 0;
  const emailTouched = email.length > 0;
  const emailValid = isValidEmail(email);

  if (activeTab === "phone") {
    return (
      <div
        className={`relative border rounded-[12px] px-4 transition-colors duration-200 cursor-text ${
          phoneFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
        }`}
        onClick={() => phoneInputRef.current?.focus()}
      >
        <div className="flex items-center h-[64px]">

          {/* Flag + code + chevron */}
          <div
            className="flex items-center gap-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
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

          {/* Floating Label + Input */}
          <div className="relative flex-1 h-full cursor-text">

            <label
              style={fontSwitzer}
              className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                phoneLabelFloated
                  ? "top-[10px] text-[11px] text-[#025fc9]"
                  : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
              }`}
            >
              Phone Number
            </label>

            <input
              ref={phoneInputRef}
              type="tel"
              value={phoneNumber}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              style={fontSwitzer}
              className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative border rounded-[12px] px-4 transition-colors duration-200 cursor-text ${
        emailTouched && !emailValid && !emailFocused
          ? "border-red-400"
          : emailFocused
          ? "border-[#025fc9]"
          : emailTouched && emailValid
          ? "border-green-400"
          : "border-[#d9d9d9]"
      }`}
      onClick={() => emailInputRef.current?.focus()}
    >
      <div className="flex items-center h-[64px]">
        <div className="relative flex-1 h-full cursor-text">

          <label
            style={fontSwitzer}
            className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
              emailLabelFloated
                ? "top-[10px] text-[11px] text-[#025fc9]"
                : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
            }`}
          >
            Email Address
          </label>

          <input
            ref={emailInputRef}
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

      {emailTouched && !emailFocused && (
        <p style={fontSwitzer} className={`text-[12px] pb-2 -mt-1 ${emailValid ? "text-green-500" : "text-red-500"}`}>
          {emailValid ? "✓ Valid email" : "Please enter a valid email address"}
        </p>
      )}
    </div>
  );
}