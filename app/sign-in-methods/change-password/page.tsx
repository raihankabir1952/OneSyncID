"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Change Password
          </span>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[20px] w-full">

          {/* Current Password field */}
          <div className="flex flex-col gap-[10px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", lineHeight: "21px" }}>
              CURRENT PASSWORD
            </span>
            <div
              className="flex items-center justify-between"
              style={{ borderBottom: "1px solid #d9d9d9", paddingTop: "10px", paddingBottom: "10px" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password to continue"
                style={{
                  ...fontSwitzer, fontSize: "16px",
                  color: currentPassword ? "#000" : "#a09898",
                  border: "none", outline: "none", background: "transparent",
                  flex: 1, letterSpacing: "0.16px",
                }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="shrink-0 ml-[8px]">
                {showPassword
                  ? <EyeOff size={20} className="text-[#5e5757]" />
                  : <Eye size={20} className="text-[#5e5757]" />
                }
              </button>
            </div>
          </div>

          {/* Cancel + Next */}
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", width: "90px", border: "1px solid #5e5757" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
                Cancel
              </span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/sign-in-methods/set-new-password")}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", width: "90px", backgroundColor: "#025fc9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
                Next
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}