"use client";

import { fontSwitzer } from "@/lib/styles";

type AccountType = "personal" | "organization";

type Props = {
  activeType: AccountType;
  onTypeChange: (type: AccountType) => void;
};

export default function AccountTypeToggle({ activeType, onTypeChange }: Props) {
  return (
    // ✅ label নেই, শুধু toggle UI
    <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-[12px] px-[10px] py-[8px] flex gap-1">
      <button
        type="button"
        onClick={() => onTypeChange("personal")}
        style={fontSwitzer}
        className={`flex-1 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
          activeType === "personal"
            ? "bg-white border border-[#025fc9] text-[#025fc9]"
            : "text-[#a09898] border border-transparent"
        }`}
      >
        Personal
      </button>
      <button
        type="button"
        onClick={() => onTypeChange("organization")}
        style={fontSwitzer}
        className={`flex-1 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
          activeType === "organization"
            ? "bg-white border border-[#025fc9] text-[#025fc9]"
            : "text-[#a09898] border border-transparent"
        }`}
      >
        Organization
      </button>
    </div>
  );
}