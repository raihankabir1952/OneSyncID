"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Check } from "lucide-react";

const TWO_FA_METHODS = [
  { id: "email", label: "Email", description: "Receive verification codes via your registered email." },
  { id: "sms", label: "SMS", description: "Receive verification codes via text message to your registered phone number.." },
  { id: "qr", label: "QR Code", description: "Scan QR code using your device to receive verification codes." },
  { id: "app", label: "Authentication App", description: "Receive verification codes via authentication app." },
] as const;

export default function SecurityAuthenticationPage() {
  const router = useRouter();
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("email");
  const [faceScanDone] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Nav */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} style={{ objectFit: "contain" }} />
          </div>
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
              <Bell size={24} className="text-black" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
              <Mail size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "24px" }}
        >
          {/* Heading */}
          <div className="flex items-center gap-[5px]">
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Authentication
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Two Factor Authentication */}
          <div className="flex flex-col gap-[12px] w-full">
            <div className="flex items-center justify-between w-full">
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
                Two-Factor Authentication
              </span>
              {/* Toggle */}
              <button
                onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                className="relative inline-flex items-center rounded-full shrink-0"
                style={{
                  width: "44px", height: "24px",
                  backgroundColor: twoFAEnabled ? "#025fc9" : "#d9d9d9",
                  transition: "background-color 0.2s",
                }}
              >
                <span
                  className="inline-block rounded-full bg-white"
                  style={{
                    width: "20px", height: "20px",
                    transform: twoFAEnabled ? "translateX(22px)" : "translateX(2px)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
            </div>

            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
              Protect your account by adding an extra layer of security. When enabled, you'll need a verification code in addition to your password whenever you sign in from a new device or browser. This helps prevent unauthorized access, keeps your personal information safe. You can choose to receive codes via SMS, email, or by scanning QR code.
            </p>

            {/* 2FA method selection — only when enabled */}
            {twoFAEnabled && (
              <div className="flex flex-col gap-[12px] w-full">
                <p style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px" }}>
                  How would you like to recieve security codes?
                </p>
                {TWO_FA_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className="flex items-start gap-[12px] w-full rounded-[12px] p-[16px] text-left"
                    style={{
                      border: selectedMethod === method.id ? "1px solid #025fc9" : "1px solid #d9d9d9",
                      backgroundColor: selectedMethod === method.id ? "rgba(2,95,201,0.04)" : "#fff",
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-[4px] shrink-0 mt-[2px]"
                      style={{
                        width: "18px", height: "18px",
                        border: selectedMethod === method.id ? "none" : "2px solid #d9d9d9",
                        backgroundColor: selectedMethod === method.id ? "#025fc9" : "#fff",
                      }}
                    >
                      {selectedMethod === method.id && <Check size={12} className="text-white" />}
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 600, color: "#000", letterSpacing: "0.14px" }}>
                        {method.label}
                      </span>
                      <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "18px" }}>
                        {method.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Face & Fingerprint Verification */}
          <div
            className="flex flex-col gap-[16px] w-full rounded-[12px] p-[16px]"
            style={{ border: "1px solid #d9d9d9" }}
          >
            <div className="flex items-center gap-[12px]">
              <div
                className="flex items-center justify-center rounded-[8px] shrink-0"
                style={{ width: "44px", height: "44px", backgroundColor: "#f5f5f5" }}
              >
                <span style={{ fontSize: "22px" }}>👤</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
                  Face & Fingerprint Verification
                </span>
                <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                  Complete biometric verification to confirm your identity
                </span>
              </div>
            </div>

            {/* Face scan status */}
            {faceScanDone ? (
              <>
                <div className="flex items-center gap-[6px]">
                  <Check size={16} className="text-green-600" />
                  <span style={{ ...fontSwitzer, fontSize: "13px", color: "#2e7d32", letterSpacing: "0.13px" }}>
                    Face scan completed on: 26 Aug 2025
                  </span>
                </div>
                <button
                  onClick={() => router.push("/security-authentication/biometric")}
                  className="flex items-center justify-center rounded-[8px]"
                  style={{ height: "40px", border: "1px solid #025fc9", paddingLeft: "16px", paddingRight: "16px", alignSelf: "flex-start" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#025fc9", letterSpacing: "0.14px" }}>
                    Redo Face Scan
                  </span>
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/security-authentication/biometric")}
                className="flex items-center justify-center gap-[8px] w-full rounded-[8px]"
                style={{ height: "40px", border: "1px solid #025fc9" }}
              >
                <span style={{ fontSize: "16px" }}>🔍</span>
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#025fc9", letterSpacing: "0.14px" }}>
                  Start face scanning
                </span>
              </button>
            )}

            {/* Fingerprint */}
            <button
              className="flex items-center justify-center gap-[8px] w-full rounded-[8px]"
              style={{ height: "40px", border: "1px solid #025fc9" }}
            >
              <span style={{ fontSize: "16px" }}>👆</span>
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#025fc9", letterSpacing: "0.14px" }}>
                Start fingerprint scanning
              </span>
            </button>
          </div>

          {/* Password Settings */}
          <div className="flex flex-col gap-[8px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Password Settings
            </span>
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
              Manage your password and update it when needed to keep your account secure.
            </p>
            <button
              onClick={() => router.push("/security-authentication/password-settings")}
              className="flex items-center justify-center rounded-[8px] self-start"
              style={{ height: "40px", paddingLeft: "16px", paddingRight: "16px", border: "1px solid #d9d9d9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>
                Change Password
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}