"use client";

import { Phone, Mail, ChevronDown } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

interface OtpVerifySectionProps {
  otpTab: "phone" | "email";
  onOtpTabChange: (tab: "phone" | "email") => void;
  phoneNumber: string;
  onPhoneNumberChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
}

export default function OtpVerifySection({
  otpTab,
  onOtpTabChange,
  phoneNumber,
  onPhoneNumberChange,
  email,
  onEmailChange,
}: OtpVerifySectionProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.12px]">
        OR VERIFY WITH OTP INSTEAD
      </p>

      <div className="flex flex-col gap-[10px]">

        {/* Phone / Email Tab */}
        <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-xl px-[10px] py-2 flex items-center gap-2">
          <button
            onClick={() => onOtpTabChange("phone")}
            style={fontSwitzer}
            className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium flex items-center justify-center gap-2 transition-all ${
              otpTab === "phone"
                ? "bg-white border border-[#025fc9] text-[#025fc9]"
                : "text-[#5e5757]"
            }`}
          >
            <Phone size={18} />
            Phone
          </button>
          <button
            onClick={() => onOtpTabChange("email")}
            style={fontSwitzer}
            className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium flex items-center justify-center gap-2 transition-all ${
              otpTab === "email"
                ? "bg-white border border-[#025fc9] text-[#025fc9]"
                : "text-[#5e5757]"
            }`}
          >
            <Mail size={18} />
            Email
          </button>
        </div>

        {/* Input */}
        <div className="border border-[#d9d9d9] rounded-xl px-4 py-5">
          {otpTab === "phone" ? (
            <div className="flex items-center gap-3">
              {/* BD Flag + Code */}
              <div className="flex items-center gap-1 shrink-0">
                <div className="w-[30px] h-[20px] rounded-[2px] overflow-hidden border border-[#eee] shrink-0">
                  <div className="w-full h-full bg-[#006A4E] flex items-center justify-center">
                    <div className="w-[11px] h-[11px] rounded-full bg-[#F42A41] ml-[2px]" />
                  </div>
                </div>
                <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">+880</span>
                <ChevronDown size={16} className="text-[#5e5757]" />
              </div>
              <div className="w-px h-[48px] bg-[#d9d9d9] shrink-0" />
              <div style={fontSwitzer} className="flex flex-col gap-[6px] flex-1">
                <p className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                  PHONE NUMBER
                </p>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => onPhoneNumberChange(e.target.value)}
                  placeholder="Enter your phone number"
                  className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
                  style={fontSwitzer}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <Mail size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
              <div style={fontSwitzer} className="flex flex-col gap-[6px] flex-1">
                <p className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                  EMAIL ADDRESS
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="Enter your email address"
                  className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
                  style={fontSwitzer}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}