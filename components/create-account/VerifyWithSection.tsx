"use client";

import { Mail, Phone } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type VerifyMethod = "email" | "phone";

type Props = {
  method: VerifyMethod;
  onMethodChange: (method: VerifyMethod) => void;
};

export default function VerifyWithSection({ method, onMethodChange }: Props) {
  return (
    // ✅ label নেই — PersonalFormPage এ আছে
    <div className="flex gap-[20px]">
      {/* Email OTP */}
      <button
        type="button"
        onClick={() => onMethodChange("email")}
        style={fontSwitzer}
        className={`flex-1 flex items-center justify-center gap-2 px-[10px] py-[5px] rounded-[8px] border transition-all ${
          method === "email"
            ? "border-[#025fc9] bg-[rgba(2,95,201,0.05)] text-[#025fc9]"
            : "border-[#d9d9d9] text-[#5e5757]"
        }`}
      >
        <Mail size={20} />
        <span className="text-[16px] font-medium tracking-[0.16px]">Email OTP</span>
      </button>

      {/* Phone OTP */}
      <button
        type="button"
        onClick={() => onMethodChange("phone")}
        style={fontSwitzer}
        className={`flex-1 flex items-center justify-center gap-2 px-[10px] py-[5px] rounded-[8px] border transition-all ${
          method === "phone"
            ? "border-[#025fc9] bg-[rgba(2,95,201,0.05)] text-[#025fc9]"
            : "border-[#d9d9d9] text-[#5e5757]"
        }`}
      >
        <Phone size={20} />
        <span className="text-[16px] font-medium tracking-[0.16px]">Phone OTP</span>
      </button>
    </div>
  );
}