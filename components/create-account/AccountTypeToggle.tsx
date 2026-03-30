"use client";

import { fontSwitzer } from "@/lib/styles";

type AccountType = "personal" | "organization";

type Props = {
  activeType: AccountType;
  onTypeChange: (type: AccountType) => void;
};

export default function AccountTypeToggle({ activeType, onTypeChange }: Props) {
  return (
    <div className="border border-[#d9d9d9] rounded-[12px] px-[16px] py-[8px] flex items-center justify-between w-full">

      {/* Personal */}
      <button
        type="button"
        onClick={() => onTypeChange("personal")}
        style={fontSwitzer}
        className={`flex-1 flex items-center justify-center py-[8px] text-[16px] font-medium tracking-[0.16px] transition-all border-b-[3px] ${
          activeType === "personal"
            ? "border-b-[#025fc9] text-[#025fc9]"
            : "border-b-transparent text-[#5e5757]"
        }`}
      >
        Personal
      </button>

      {/* Organization */}
      <button
        type="button"
        onClick={() => onTypeChange("organization")}
        style={fontSwitzer}
        className={`flex-1 flex items-center justify-center py-[8px] text-[16px] font-medium tracking-[0.16px] transition-all border-b-[3px] ${
          activeType === "organization"
            ? "border-b-[#025fc9] text-[#025fc9]"
            : "border-b-transparent text-[#5e5757]"
        }`}
      >
        Organization
      </button>

    </div>
  );
}