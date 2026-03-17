import { Phone, Mail } from "lucide-react";
import { fontSwitzer, colors } from "@/lib/styles";

type TabType = "phone" | "email";

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export default function PhoneEmailToggle({ activeTab, onTabChange }: Props) {
  return (
    <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-xl p-2 flex gap-1">
      {/* Phone Tab */}
      <button
        onClick={() => onTabChange("phone")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
          activeTab === "phone"
            ? "bg-white border border-[#025fc9]"
            : "border border-transparent"
        }`}
      >
        <Phone
          size={20}
          color={activeTab === "phone" ? colors.primary : colors.textMuted}
        />
        <span
          style={fontSwitzer}
          className={`text-[16px] font-medium tracking-[0.16px] ${
            activeTab === "phone" ? "text-[#025fc9]" : "text-[#5e5757]"
          }`}
        >
          Phone
        </span>
      </button>

      {/* Email Tab */}
      <button
        onClick={() => onTabChange("email")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
          activeTab === "email"
            ? "bg-white border border-[#025fc9]"
            : "border border-transparent"
        }`}
      >
        <Mail
          size={20}
          color={activeTab === "email" ? colors.primary : colors.textMuted}
        />
        <span
          style={fontSwitzer}
          className={`text-[16px] font-medium tracking-[0.16px] ${
            activeTab === "email" ? "text-[#025fc9]" : "text-[#5e5757]"
          }`}
        >
          Email
        </span>
      </button>
    </div>
  );
}
