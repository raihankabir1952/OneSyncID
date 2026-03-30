"use client";

import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 4C5.45 4 1.73 7.11 1 10c.73 2.89 4.45 6 9 6s8.27-3.11 9-6c-.73-2.89-4.45-6-9-6z"
      stroke="#A09898"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="10" r="2.5" stroke="#A09898" strokeWidth="1.5" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M3 3l14 14M10 4C5.45 4 1.73 7.11 1 10c.73 2.89 4.45 6 9 6s8.27-3.11 9-6c-.73-2.89-4.45-6-9-6z"
      stroke="#A09898"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ExistingAccountFormProps {
  authTab: "password" | "pin";
  onAuthTabChange: (tab: "password" | "pin") => void;
  usernameOrEmail: string;
  onUsernameOrEmailChange: (v: string) => void;
  password: string;
  onPasswordChange: (v: string) => void;
  pin: string;
  onPinChange: (v: string) => void;
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
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="flex flex-col gap-[12px] w-full">
      {/* Username or Email */}
      <div className="flex flex-col gap-[10px] w-full">
        <p
          style={fontSwitzer}
          className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]"
        >
          USERNAME OR EMAIL
        </p>
        <div
          className="flex items-center justify-between py-[10px] w-full"
          style={{ borderBottom: "1px solid #d9d9d9" }}
        >
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => onUsernameOrEmailChange(e.target.value)}
            placeholder="Enter your username or email"
            style={fontSwitzer}
            className="flex-1 text-[16px] leading-[21px] tracking-[0.16px] text-black placeholder-[#a09898] bg-transparent outline-none"
          />
          <div className="shrink-0 ml-2">
            <EyeIcon />
          </div>
        </div>
      </div>

      {/* Password / PIN Tab */}
      <div
        className="flex items-center justify-between px-[16px] py-[8px] rounded-[12px] w-full h-[53px]"
        style={{ border: "1px solid #d9d9d9" }}
      >
        {/* Password Tab */}
        <button
          type="button"
          onClick={() => onAuthTabChange("password")}
          className="flex flex-1 items-center justify-center p-[8px]"
          style={
            authTab === "password"
              ? { borderBottom: "3px solid #025fc9" }
              : {}
          }
        >
          <span
            style={fontSwitzer}
            className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] whitespace-nowrap ${
              authTab === "password" ? "text-[#025fc9]" : "text-[#5e5757]"
            }`}
          >
            Password
          </span>
        </button>

        {/* PIN Tab */}
        <button
          type="button"
          onClick={() => onAuthTabChange("pin")}
          className="flex flex-1 items-center justify-center p-[8px]"
          style={
            authTab === "pin"
              ? { borderBottom: "3px solid #025fc9" }
              : {}
          }
        >
          <span
            style={fontSwitzer}
            className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] whitespace-nowrap ${
              authTab === "pin" ? "text-[#025fc9]" : "text-[#5e5757]"
            }`}
          >
            PIN
          </span>
        </button>
      </div>

      {/* Password / PIN input */}
      {authTab === "password" ? (
        <div className="flex flex-col gap-[10px] w-full">
          <p
            style={fontSwitzer}
            className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]"
          >
            PASSWORD
          </p>
          <div
            className="flex items-center justify-between py-[10px] w-full"
            style={{ borderBottom: "1px solid #d9d9d9" }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter your password"
              style={fontSwitzer}
              className="flex-1 text-[16px] leading-[21px] tracking-[0.16px] text-black placeholder-[#a09898] bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="shrink-0 ml-2"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px] w-full">
          <p
            style={fontSwitzer}
            className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]"
          >
            PIN
          </p>
          <div
            className="flex items-center justify-between py-[10px] w-full"
            style={{ borderBottom: "1px solid #d9d9d9" }}
          >
            <input
              type={showPin ? "text" : "password"}
              value={pin}
              onChange={(e) => onPinChange(e.target.value)}
              placeholder="Enter your PIN"
              inputMode="numeric"
              maxLength={6}
              style={fontSwitzer}
              className="flex-1 text-[16px] leading-[21px] tracking-[0.16px] text-black placeholder-[#a09898] bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPin((p) => !p)}
              className="shrink-0 ml-2"
            >
              {showPin ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}