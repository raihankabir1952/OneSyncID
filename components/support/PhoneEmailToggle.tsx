"use client";

import { Phone, Mail } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type VerifyMethod = "phone" | "email";

interface PhoneEmailToggleProps {
  activeMethod: VerifyMethod;
  onMethodChange: (method: VerifyMethod) => void;
}

export default function PhoneEmailToggle({ activeMethod, onMethodChange }: PhoneEmailToggleProps) {
  return (
    <div className="bg-[#f5f5f5] border border-[#d9d9d9] flex items-center justify-between px-[10px] py-[8px] rounded-[12px] w-full">
      <button
        onClick={() => onMethodChange("phone")}
        className={`flex flex-1 gap-2 items-center justify-center p-2 rounded-[8px] transition-all ${
          activeMethod === "phone" ? "bg-white border border-[#025fc9]" : "bg-transparent border border-transparent"
        }`}
      >
        <Phone size={20} className={activeMethod === "phone" ? "text-[#025fc9]" : "text-[#5e5757]"} />
        <span style={fontSwitzer} className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] ${activeMethod === "phone" ? "text-[#025fc9]" : "text-[#5e5757]"}`}>
          Phone
        </span>
      </button>
      <button
        onClick={() => onMethodChange("email")}
        className={`flex flex-1 gap-2 items-center justify-center p-2 rounded-[8px] transition-all ${
          activeMethod === "email" ? "bg-white border border-[#025fc9]" : "bg-transparent border border-transparent"
        }`}
      >
        <Mail size={20} className={activeMethod === "email" ? "text-[#025fc9]" : "text-[#5e5757]"} />
        <span style={fontSwitzer} className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] ${activeMethod === "email" ? "text-[#025fc9]" : "text-[#5e5757]"}`}>
          Email
        </span>
      </button>
    </div>
  );
}
