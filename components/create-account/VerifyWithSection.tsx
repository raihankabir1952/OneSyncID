import { Mail, Phone } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type VerifyMethod = "email" | "phone";

type Props = {
  method: VerifyMethod;
  onMethodChange: (method: VerifyMethod) => void;
};

export default function VerifyWithSection({ method, onMethodChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p style={fontSwitzer} className="text-[14px] text-[#767676]">
        VERIFY WITH
      </p>
      <div className="flex gap-5">
        {/* Email OTP */}
        <button
          onClick={() => onMethodChange("email")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all ${
            method === "email"
              ? "border-[#025fc9] bg-[rgba(2,95,201,0.05)] text-[#025fc9]"
              : "border-[#d9d9d9] text-[#5e5757]"
          }`}
        >
          <Mail size={20} />
          <span style={fontSwitzer} className="text-[16px] font-medium tracking-[0.16px]">
            Email OTP
          </span>
        </button>

        {/* Phone OTP */}
        <button
          onClick={() => onMethodChange("phone")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all ${
            method === "phone"
              ? "border-[#025fc9] bg-[rgba(2,95,201,0.05)] text-[#025fc9]"
              : "border-[#d9d9d9] text-[#5e5757]"
          }`}
        >
          <Phone size={20} />
          <span style={fontSwitzer} className="text-[16px] font-medium tracking-[0.16px]">
            Phone OTP
          </span>
        </button>
      </div>
    </div>
  );
}
