"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, Check, CheckSquare, Square, Fingerprint, ScanFace } from "lucide-react";

const TWO_FA_METHODS = [
  { id: "email",  label: "Email",              description: "Receive verification codes via your registered email." },
  { id: "sms",    label: "SMS",                description: "Receive verification codes via text message to your registered phone number." },
  { id: "qr",     label: "QR Code",            description: "Scan QR code using your device to receive verification codes." },
  { id: "app",    label: "Authentication App", description: "Receive verification codes via authentication app." },
] as const;

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        width: "47px", height: "24px", borderRadius: "12px",
        backgroundColor: value ? "#025fc9" : "#d9d9d9",
        position: "relative", border: "none", outline: "none",
        cursor: "pointer", flexShrink: 0, transition: "background-color 0.2s",
      }}
    >
      <span style={{
        position: "absolute", top: "2px",
        left: value ? "25px" : "2px",
        width: "20px", height: "20px", borderRadius: "50%",
        backgroundColor: "#fff", transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

// ── Face & Fingerprint card ───────────────────────────────────────────────────
function BiometricCard({ faceScanDone, onFaceScan }: { faceScanDone: boolean; onFaceScan: () => void }) {
  return (
    <div
      className="flex flex-col gap-[20px] w-full rounded-[12px] px-[16px] py-[20px]"
      style={{ border: "1px solid #d9d9d9" }}
    >
      {/* Header */}
      <div className="flex gap-[15px] items-start w-full">
        {/* Face icon placeholder */}
        <div
          className="flex items-center justify-center rounded-[8px] shrink-0"
          style={{ width: "47px", height: "40px", backgroundColor: "#f5f5f5", border: "1px solid #d9d9d9" }}
        >
          <ScanFace size={22} className="text-[#5e5757]" />
        </div>
        <div className="flex flex-col gap-[8px] flex-1">
          <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
            Face & Fingerprint Verification
          </p>
          <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
            Complete biometric verification to confirm your identity
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] w-full">
        {faceScanDone ? (
          <>
            {/* Face scan completed */}
            <div className="flex items-center gap-[5px]">
              <Check size={20} className="text-[#006a4e] shrink-0" />
              <div className="flex gap-[5px] items-center">
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#006a4e", letterSpacing: "0.14px" }}>
                  Face scan completed on:
                </span>
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#006a4e", letterSpacing: "0.14px" }}>
                  26 Aug 2025
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onFaceScan}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "40px", paddingLeft: "10px", paddingRight: "10px", border: "1px solid #d9d9d9", width: "fit-content" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                Redo Face Scan
              </span>
            </button>
          </>
        ) : (
          /* Start face scanning button */
          <button
            type="button"
            onClick={onFaceScan}
            className="flex items-center justify-center gap-[12px] w-full rounded-[8px]"
            style={{ height: "58px", paddingLeft: "20px", paddingRight: "20px", border: "1px solid #d9d9d9" }}
          >
            <ScanFace size={24} className="text-[#025fc9] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#025fc9", letterSpacing: "0.16px" }}>
              Start face scanning
            </span>
          </button>
        )}

        {/* Fingerprint button */}
        <button
          type="button"
          className="flex items-center justify-center gap-[12px] w-full rounded-[8px]"
          style={{ height: "58px", paddingLeft: "20px", paddingRight: "20px", border: "1px solid #d9d9d9" }}
        >
          <Fingerprint size={24} className="text-[#025fc9] shrink-0" />
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#025fc9", letterSpacing: "0.16px" }}>
            Start fingerprint scanning
          </span>
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TwoFactorAuthPage() {
  const router = useRouter();
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("email");
  const [faceScanDone] = useState(true);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Two-Factor Authentication
          </span>
        </div>

        {/* 2FA toggle + description */}
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex items-center justify-between w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              {twoFAEnabled ? "Two-Factor Authentication" : "Enable Two-Factor Authentication"}
            </span>
            <Toggle value={twoFAEnabled} onChange={() => setTwoFAEnabled(!twoFAEnabled)} />
          </div>
          <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "normal" }}>
            Protect your account by adding an extra layer of security. When enabled, you&apos;ll need a verification code in addition to your password whenever you sign in from a new device or browser. This helps prevent unauthorized access, keeps your personal information safe. You can choose to receive codes via SMS, email, or by scanning QR code.
          </p>
        </div>

        {/* Method selection — only when 2FA is enabled */}
        {twoFAEnabled && (
          <div className="flex flex-col gap-[10px] w-full">
            <p style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px" }}>
              How would you like to recieve security codes?
            </p>
            <div className="flex flex-col gap-[20px] w-full">
              {TWO_FA_METHODS.map((method) => {
                const selected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className="flex flex-col gap-[10px] items-start w-full rounded-[12px] p-[20px] text-left"
                    style={{
                      border: selected ? "1.5px solid #025fc9" : "1px solid #d9d9d9",
                      backgroundColor: "#fff",
                    }}
                  >
                    <div className="flex items-center gap-[8px]">
                      {selected ? (
                        <CheckSquare size={20} className="text-[#025fc9] shrink-0" />
                      ) : (
                        <Square size={20} className="text-[#5e5757] shrink-0" />
                      )}
                      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: selected ? 500 : 600, color: "#000", letterSpacing: "0.16px" }}>
                        {method.label}
                      </span>
                    </div>
                    <p style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px", lineHeight: "normal" }}>
                      {method.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Face & Fingerprint Verification */}
        <BiometricCard
          faceScanDone={faceScanDone}
          onFaceScan={() => router.push("/security-authentication/biometric")}
        />

      </div>
    </div>
  );
}