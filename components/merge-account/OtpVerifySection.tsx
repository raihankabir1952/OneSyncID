"use client";

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
        <div className="border border-[#d9d9d9] rounded-[12px] flex items-center px-4 py-5 gap-3">
          {/* Country code */}
          <div className="flex items-center gap-2 shrink-0">
            <BDFlag />
            <span className="text-[16px] text-[#5e5757]">+880</span>
            <ChevronDown size={16} className="text-[#5e5757]" />
          </div>
          {/* Divider */}
          <div className="w-px h-8 bg-[#d9d9d9] shrink-0" />
          {/* Input */}
          <div className="flex flex-col gap-[6px] flex-1">
            <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
              PHONE NUMBER
            </p>
            <input
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your phone number"
              className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
            />
          </div>
        </div>
      )}

      {/* Email input */}
      {otpTab === "email" && (
        <div className="border border-[#d9d9d9] rounded-[12px] flex items-start gap-2 px-4 py-5">
          <Mail size={20} className="text-[#5e5757] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-[6px] flex-1">
            <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
              EMAIL ADDRESS
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter your email"
              className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}