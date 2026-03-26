"use client";

import { useRef, useState } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import { fontSwitzer } from "@/lib/styles";

type OtpTab = "phone" | "email";

type Props = {
  otpTab: OtpTab;
  onOtpTabChange: (tab: OtpTab) => void;
  phoneNumber: string;
  onPhoneNumberChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
};

function BDFlag() {
  const Flag = Flags["BD" as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className="w-[30px] h-[20px] border border-[#eee]" />;
}

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
    <div style={fontSwitzer} className="flex flex-col gap-[10px]">

      {/* Phone / Email toggle */}
      <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-[12px] flex items-center justify-between px-[10px] py-[8px] gap-1">
        <button
          type="button"
          onClick={() => onOtpTabChange("phone")}
          className={`flex-1 flex items-center justify-center gap-2 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
            otpTab === "phone"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#5e5757] border border-transparent"
          }`}
        >
          <Phone size={20} />
          Phone
        </button>
        <button
          type="button"
          onClick={() => onOtpTabChange("email")}
          className={`flex-1 flex items-center justify-center gap-2 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
            otpTab === "email"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#5e5757] border border-transparent"
          }`}
        >
          <Mail size={20} />
          Email
        </button>
      </div>

      {/* Phone input */}
      {otpTab === "phone" && (
        <div
          className={`border rounded-[12px] transition-colors duration-200 cursor-text ${
            phoneFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
          }`}
          onClick={() => phoneRef.current?.focus()}
        >
          <div className="flex items-center gap-3 px-4 h-[64px]">
            <div
              className="flex items-center gap-2 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <BDFlag />
              <span className="text-[16px] text-[#5e5757]">+880</span>
              <ChevronDown size={16} className="text-[#5e5757]" />
            </div>
            <div className="w-px h-[40px] bg-[#d9d9d9] shrink-0" />
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

      {/* Email input */}
      {otpTab === "email" && (
        <div
          className={`border rounded-[12px] transition-colors duration-200 cursor-text ${
            emailFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
          }`}
          onClick={() => emailRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 h-[64px]">
            <Mail
              size={20}
              className={`shrink-0 transition-colors ${emailFocused || email ? "text-[#025fc9]" : "text-[#5e5757]"}`}
            />
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
  );
}