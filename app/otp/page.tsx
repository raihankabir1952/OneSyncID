"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import OtpInput, { OtpStatus } from "@/components/otp/OtpInput";

// ─── Inline SVG Back Icon ─────────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

// ─── Mock credentials ─────────────────────────────────────────────────────────
const VALID_OTP      = "123456";
const RESEND_SECONDS = 30;
const MAX_ATTEMPTS   = 3;

// ─── Inner component (uses useSearchParams) ───────────────────────────────────
function OtpPageInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // ── Read contact info from URL query params ─────────────────────────────
  // get-started passes:
  //   phone type → ?phone=%2B8801798546751&type=phone
  //   email type → ?email=test%40onesyncid.com&type=email
  const type        = searchParams.get("type") ?? "phone";
  const phoneParam  = searchParams.get("phone") ?? "";
  const emailParam  = searchParams.get("email") ?? "";
  const contactDisplay = type === "phone" ? phoneParam : emailParam;

  const [digits,   setDigits]   = useState<string[]>(Array(6).fill(""));
  const [status,   setStatus]   = useState<OtpStatus>("idle");
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [timer,    setTimer]    = useState(RESEND_SECONDS);
  const [timerOn,  setTimerOn]  = useState(true);

  // ── Resend countdown ────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerOn) return;
    if (timer <= 0) { setTimerOn(false); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, timerOn]);

  const fmtTimer = `0:${String(timer).padStart(2, "0")}`;

  // ── Auto-submit when 6 digits filled ───────────────────────────────────
  const otp = digits.join("");

  const handleVerify = useCallback((code: string) => {
    if (code === VALID_OTP) {
      setStatus("success");
      setTimeout(() => router.push("/sign-in"), 1500);
    } else {
      const left = attempts - 1;
      setAttempts(left);
      setStatus("error");
    }
  }, [attempts, router]);

  useEffect(() => {
    if (otp.length === 6 && status === "idle") {
      const id = setTimeout(() => handleVerify(otp), 300);
      return () => clearTimeout(id);
    }
  }, [otp, status, handleVerify]);

  // ── Try Again ───────────────────────────────────────────────────────────
  const handleTryAgain = () => {
    setDigits(Array(6).fill(""));
    setStatus("idle");
  };

  // ── Resend ──────────────────────────────────────────────────────────────
  const handleResend = () => {
    setDigits(Array(6).fill(""));
    setStatus("idle");
    setTimer(RESEND_SECONDS);
    setTimerOn(true);
    setAttempts(MAX_ATTEMPTS);
  };

  const isFull    = otp.length === 6;
  const isSuccess = status === "success";
  const isError   = status === "error";
  const btnBg     = isError ? "bg-[#ff3838]" : "bg-[#025fc9]";
  const btnLabel  = isError ? "Try Again" : "Verify";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="relative bg-white overflow-hidden" style={{ width: "393px", minHeight: "852px" }}>

        {/* ── Header — top: 80px ── */}
        <div
          className="absolute left-0 w-full px-[20px] flex flex-col"
          style={{ top: "80px", gap: "10px" }}
        >
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-6 h-6 flex items-center justify-center"
              aria-label="Go back"
            >
              <BackIcon />
            </button>
          </div>
          <p style={fontSwitzer} className="text-[20px] font-semibold leading-normal text-black text-center w-full">
            Almost there. Enter your code.
          </p>
        </div>

        {/* ── Body — top: 190px ── */}
        <div
          className="absolute left-0 w-full flex flex-col items-center px-[20px]"
          style={{ top: "190px", gap: "40px" }}
        >
          {/* Description + OTP boxes + status */}
          <div className="flex flex-col w-full" style={{ gap: "20px" }}>

            {/* Description — dynamic phone/email from URL */}
            <p style={fontSwitzer} className="text-[16px] text-[#333] leading-normal">
              A 6-digit verification code is on its way to{" "}
              <span className="text-[#0052b4]">{contactDisplay}</span>.
            </p>

            {/* Label */}
            <p style={fontSwitzer} className="text-[16px] font-medium text-black text-center">
              Enter your verification code
            </p>

            {/* OTP Input boxes */}
            <OtpInput
              value={digits}
              onChange={(val) => {
                if (status === "error") setStatus("idle");
                setDigits(val);
              }}
              status={status}
            />

            {/* Status text below boxes */}
            <div className="h-[18px] flex items-center justify-center">
              {isSuccess && (
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#11a75c] text-center">
                  {type === "phone" ? "Phone number verified!" : "Email address verified!"}
                </p>
              )}
              {isError && (
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#ff3838] text-center">
                  {`That code doesn't match. ${attempts} attempt${attempts !== 1 ? "s" : ""} remaining.`}
                </p>
              )}
              {!isSuccess && !isError && (
                timerOn ? (
                  <p style={fontSwitzer} className="text-[14px] text-[#5e5757] text-center">
                    Resend code in{" "}
                    <span className="text-[#0052b4]">{fmtTimer}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    style={fontSwitzer}
                    className="text-[14px] font-medium text-[#025fc9] text-center"
                  >
                    Resend code
                  </button>
                )
              )}
            </div>
          </div>

          {/* Need help */}
          <div className="flex gap-[4px] items-center justify-center w-full">
            <span style={fontSwitzer} className="text-[14px] text-[#333]">Need help?</span>
            <button
              type="button"
              onClick={() => router.push("/support")}
              style={fontSwitzer}
              className="text-[14px] font-medium text-[#0052b4]"
            >
              Contact Support
            </button>
          </div>

          {/* Verify / Try Again button */}
          {!isSuccess && (
            <button
              type="button"
              disabled={!isFull && !isError}
              onClick={() => isError ? handleTryAgain() : handleVerify(otp)}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] rounded-[8px] flex items-center justify-center transition-opacity ${btnBg} ${
                !isFull && !isError ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">{btnLabel}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Page export — wrapped in Suspense (required for useSearchParams) ─────────
export default function OtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <OtpPageInner />
    </Suspense>
  );
}