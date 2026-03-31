"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

type OtpState = "entering" | "success" | "error";

const RESEND_SECONDS = 24;
const CORRECT_CODE = "444444"; // demo — replace with real API

export default function MergeAccountVerifyPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [otp,       setOtp]       = useState("");
  const [otpState,  setOtpState]  = useState<OtpState>("entering");
  const [attempts,  setAttempts]  = useState(3);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  // countdown timer
  useEffect(() => {
    if (otpState !== "entering" || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, otpState]);

  // auto-verify when 6 digits entered
  useEffect(() => {
    if (otp.length !== 6) {
      if (otpState === "error") return; // keep error until Try Again
      setOtpState("entering");
      return;
    }
    if (otp === CORRECT_CODE) {
      setOtpState("success");
      setTimeout(() => router.push("/merge-account/verify/confirm"), 700);
    } else {
      setOtpState("error");
      setAttempts((a) => a - 1);
    }
  }, [otp]);

  const handleTryAgain = () => {
    setOtp("");
    setOtpState("entering");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleResend = () => {
    setOtp("");
    setOtpState("entering");
    setCountdown(RESEND_SECONDS);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // box border color per state
  const activeBorderColor =
    otpState === "success"
      ? "#11a75c"
      : otpState === "error"
      ? "#ff3838"
      : "#025fc9";

  const isValid = otp.length === 6 && otpState !== "error";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="relative bg-white"
        style={{ width: "393px", minHeight: "1011px" }}
      >
        <div className="absolute inset-0 overflow-y-auto">

          {/* ── Header ── */}
          <div
            className="px-5 flex flex-col"
            style={{ paddingTop: "80px", gap: "10px" }}
          >
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Go back"
              >
                <BackIcon />
              </button>
            </div>
            <div className="flex items-center justify-center w-full">
              <h1
                style={fontSwitzer}
                className="text-[20px] font-semibold leading-normal text-black"
              >
                Verify to continue.
              </h1>
            </div>
          </div>

          {/* ── Body ── */}
          <div
            className="flex flex-col items-center px-5 pb-10"
            style={{ paddingTop: "50px", gap: "40px" }}
          >
            <div className="flex flex-col w-[353px]" style={{ gap: "20px" }}>

              {/* Description */}
              <p style={fontSwitzer} className="text-[16px] text-[#333] leading-normal">
                A 6-digit verification code is on its way to{" "}
                <span className="text-[#0052b4]">+8801723456789</span>.
              </p>

              <p
                style={fontSwitzer}
                className="text-[16px] font-medium text-black text-center"
              >
                Enter your verification code
              </p>

              {/* OTP Boxes */}
              <div
                className="flex items-center w-full cursor-text"
                style={{ gap: "10px" }}
                onClick={() => inputRef.current?.focus()}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-1 h-[50px] rounded-[12px] items-center justify-center transition-all"
                    style={{
                      border: `2px solid ${
                        i < otp.length
                          ? activeBorderColor
                          : i === otp.length && otpState === "entering"
                          ? "#025fc9"
                          : "#d9d9d9"
                      }`,
                    }}
                  >
                    <span
                      style={fontSwitzer}
                      className="text-[18px] font-semibold text-black"
                    >
                      {otp[i] ?? ""}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hidden input */}
              <input
                ref={inputRef}
                type="tel"
                value={otp}
                onChange={(e) => {
                  if (otpState === "error") return;
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                }}
                className="opacity-0 absolute w-0 h-0"
                autoFocus
              />

              {/* Status row */}
              <div
                className="flex items-center justify-center"
                style={{ height: "18px" }}
              >
                {otpState === "success" && (
                  <p
                    style={fontSwitzer}
                    className="text-[14px] font-medium text-[#11a75c] text-center"
                  >
                    Phone number verified!
                  </p>
                )}
                {otpState === "error" && (
                  <p
                    style={fontSwitzer}
                    className="text-[14px] font-medium text-[#ff3838] text-center"
                  >
                    That code doesn't match. {attempts} attempt
                    {attempts !== 1 ? "s" : ""} remaining.
                  </p>
                )}
                {otpState === "entering" && countdown > 0 && (
                  <p
                    style={fontSwitzer}
                    className="text-[14px] text-[#5e5757] text-center"
                  >
                    Resend code in 0
                    <span className="text-[#0052b4]">
                      :{String(countdown).padStart(2, "0")}
                    </span>
                  </p>
                )}
                {otpState === "entering" && countdown === 0 && (
                  <button
                    style={fontSwitzer}
                    className="text-[14px] font-medium text-[#0052b4]"
                    onClick={handleResend}
                  >
                    Resend code
                  </button>
                )}
              </div>
            </div>

            {/* Need help */}
            <div className="flex items-center justify-center gap-1 w-[353px]">
              <span style={fontSwitzer} className="text-[14px] text-[#333]">
                Need help?
              </span>
              <button
                style={fontSwitzer}
                className="text-[14px] font-medium text-[#0052b4]"
              >
                Contact Support
              </button>
            </div>

            {/* Action button */}
            {otpState === "error" ? (
              <button
                onClick={handleTryAgain}
                style={{ ...fontSwitzer, backgroundColor: "#ff3838" }}
                className="w-[353px] h-[44px] rounded-[8px] flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-white">
                  Try Again
                </span>
              </button>
            ) : (
              <button
                disabled={!isValid}
                onClick={() => router.push("/merge-account/verify/confirm")}
                style={fontSwitzer}
                className={`w-[353px] h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                  !isValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
                }`}
              >
                <span className="text-[16px] font-medium text-white">
                  Verify
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}