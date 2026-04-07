"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft } from "lucide-react";

export default function DelegateAccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Delegate Access
          </span>
        </div>

        {/* Access to Account section */}
        <div className="flex flex-col gap-[10px] w-full pt-[10px]">
          <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
            Access to Account
          </p>
          <div className="flex flex-col gap-[12px]">
            <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "normal" }}>
              Grant access to your account to trusted users or platforms. Delegates may need OTP or digital signature to perform sensitive actions. You can manage, revoke, or monitor all delegated access here.
            </p>
            <button
              type="button"
              onClick={() => router.push("/delegate-access/manage")}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "40px", paddingLeft: "10px", paddingRight: "10px", border: "1px solid #5e5757", width: "fit-content" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
                Manage Delegate
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}