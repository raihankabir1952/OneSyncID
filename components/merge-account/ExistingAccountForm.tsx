"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

interface ExistingAccountFormProps {
  authTab: "password" | "pin";
  onAuthTabChange: (tab: "password" | "pin") => void;
  usernameOrEmail: string;
  onUsernameOrEmailChange: (val: string) => void;
  password: string;
  onPasswordChange: (val: string) => void;
  pin: string;
  onPinChange: (val: string) => void;
}

export default function ExistingAccountForm({
  authTab,
  onAuthTabChange,
  usernameOrEmail,
  onUsernameOrEmailChange,
  password,
  onPasswordChange,
  pin,
  onPinChange,
}: ExistingAccountFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[10px]">
      <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.12px]">
        SIGN INTO YOUR EXISTING ACCOUNT
      </p>

      <div className="border border-[#d9d9d9] rounded-xl overflow-hidden bg-white">

        {/* Username / Email */}
        <div className="border-b border-[#d9d9d9] px-4 py-5">
          <div className="flex items-start gap-2">
            <User size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
            <div style={fontSwitzer} className="flex flex-col gap-[6px]">
              <p className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                USERNAME OR EMAIL
              </p>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => onUsernameOrEmailChange(e.target.value)}
                placeholder="abc@example.com"
                className="text-[16px] text-black placeholder:text-[#a09898] leading-[21px] tracking-[0.16px] bg-transparent outline-none w-full"
                style={fontSwitzer}
              />
            </div>
          </div>
        </div>

        {/* Password / PIN Tab */}
        <div className="bg-[#f5f5f5] border-b border-[#d9d9d9] px-[10px] py-2 flex items-center gap-2">
          <button
            onClick={() => onAuthTabChange("password")}
            style={fontSwitzer}
            className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium transition-all ${
              authTab === "password"
                ? "bg-white border border-[#025fc9] text-[#025fc9]"
                : "text-[#5e5757]"
            }`}
          >
            Password
          </button>
          <button
            onClick={() => onAuthTabChange("pin")}
            style={fontSwitzer}
            className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium transition-all ${
              authTab === "pin"
                ? "bg-white border border-[#025fc9] text-[#025fc9]"
                : "text-[#5e5757]"
            }`}
          >
            PIN
          </button>
        </div>

        {/* Password / PIN Input */}
        <div className="px-4 py-5">
          <div className="flex items-start gap-2">
            <Lock size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
            <div style={fontSwitzer} className="flex flex-col gap-[6px] flex-1">
              <p className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                {authTab === "password" ? "PASSWORD" : "PIN"}
              </p>
              <div className="flex items-center justify-between">
                <input
                  type={authTab === "pin" ? "tel" : showPassword ? "text" : "password"}
                  value={authTab === "password" ? password : pin}
                  onChange={(e) =>
                    authTab === "password"
                      ? onPasswordChange(e.target.value)
                      : onPinChange(e.target.value)
                  }
                  placeholder={authTab === "password" ? "Enter your password" : "Enter your PIN"}
                  maxLength={authTab === "pin" ? 6 : undefined}
                  className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none flex-1"
                  style={fontSwitzer}
                />
                {authTab === "password" && (
                  <button onClick={() => setShowPassword((p) => !p)} className="shrink-0 ml-2 text-[#a09898]">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/reset-password")}
          style={fontSwitzer}
          className="text-[14px] text-[#0052b4]"
        >
          {authTab === "password" ? "Forgot password?" : "Forgot PIN?"}
        </button>
      </div>
    </div>
  );
}