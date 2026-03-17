import { fontSwitzer, colors } from "@/lib/styles";

type AccountType = "personal" | "organization";

type Props = {
  activeType: AccountType;
  onTypeChange: (type: AccountType) => void;
};

export default function AccountTypeToggle({ activeType, onTypeChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p style={fontSwitzer} className="text-[14px] text-[#767676]">
        ACCOUNT TYPE
      </p>
      <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-xl p-2 flex gap-1">
        <button
          onClick={() => onTypeChange("personal")}
          className={`flex-1 py-2 rounded-lg text-[16px] font-medium transition-all ${
            activeType === "personal"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#a09898] border border-transparent"
          }`}
          style={fontSwitzer}
        >
          Personal
        </button>
        <button
          onClick={() => onTypeChange("organization")}
          className={`flex-1 py-2 rounded-lg text-[16px] font-medium transition-all ${
            activeType === "organization"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#a09898] border border-transparent"
          }`}
          style={fontSwitzer}
        >
          Organization
        </button>
      </div>
    </div>
  );
}
