"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import OtpInput from "@/components/otp/OtpInput";

type OtpStatus = "entering" | "success" | "error";

// Demo otp code (from backend)
const CORRECT_OTP = "123456";

export default function OtpPage() {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<OtpStatus>("entering");
  const [timer, setTimer] = useState(24);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  // Countdown timer for resending code
  useEffect(() => {
    if (canResend) return;
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timer, canResend]);

  // automatically verify when 6 digits are entered
  useEffect(() => {
    const code = digits.join("");
    if (code.length === 6) {
      if (code === CORRECT_OTP) {
        setStatus("success");
        // 2 seconds later, navigate to the next page
        setTimeout(() => {
          router.push("/create-account");
        }, 2000);
      } else {
        setStatus("error");
      }
    } else {
      if (status !== "entering") setStatus("entering");
    }
  }, [digits, router]);

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setStatus("entering");
    setTimer(24);
    setCanResend(false);
  };

  const isComplete = digits.join("").length === 6;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
          <span className="text-[17px] font-semibold text-black">9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-[2px] h-[12px]">
              <div className="w-[3px] h-[4px] bg-black rounded-sm" />
              <div className="w-[3px] h-[6px] bg-black rounded-sm" />
              <div className="w-[3px] h-[8px] bg-black rounded-sm" />
              <div className="w-[3px] h-[10px] bg-black rounded-sm" />
            </div>
            <svg width="16" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 18C12.83 18 13.5 18.67 13.5 19.5S12.83 21 12 21 10.5 20.33 10.5 19.5 11.17 18 12 18Z" fill="black" />
              <path d="M12 13C14.21 13 16.21 13.9 17.66 15.34L19.07 13.93C17.24 12.1 14.75 11 12 11S6.76 12.1 4.93 13.93L6.34 15.34C7.79 13.9 9.79 13 12 13Z" fill="black" />
              <path d="M12 8C15.54 8 18.73 9.44 21.04 11.77L22.45 10.36C19.75 7.66 16.06 6 12 6S4.25 7.66 1.55 10.36L2.96 11.77C5.27 9.44 8.46 8 12 8Z" fill="black" />
            </svg>
            <div className="flex items-center">
              <div className="w-[22px] h-[11px] border border-black rounded-[2px] flex items-center px-[1px]">
                <div className="w-full h-[7px] bg-black rounded-[1px]" />
              </div>
              <div className="w-[1px] h-[4px] bg-black ml-[1px]" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center w-full">
            Almost there. Enter your code.
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 px-5 pt-10 flex-1">

          {/* Description */}
          <p style={fontSwitzer} className="text-[16px] text-[#333] leading-relaxed">
            A 6-digit verification code is on its way to{" "}
            <span className="text-[#0052b4]">+8801723456789</span>.
          </p>

          <div className="flex flex-col gap-5">
            {/* Label */}
            <p style={fontSwitzer} className="text-[16px] font-medium text-black">
              Enter your verification code
            </p>

            {/* OTP Input */}
            <div className="w-full">
              <OtpInput digits={digits} status={status} onChange={setDigits} />
            </div>

            {/* Status Messages */}
            <div className="text-center min-h-[20px]">
              {status === "success" && (
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#11a75c]">
                  Phone number verified!
                </p>
              )}
              {status === "error" && (
                <div className="flex flex-col items-center gap-1">
                  <p style={fontSwitzer} className="text-[14px] font-medium text-[#ff3838]">
                    That code doesn&apos;t match. Try again.
                  </p>
                  <button
                    onClick={handleResend}
                    style={fontSwitzer}
                    className="text-[14px] font-medium text-[#0052b4]"
                  >
                    Resend code
                  </button>
                </div>
              )}
              {status === "entering" && !canResend && (
                <p style={fontSwitzer} className="text-[14px] text-[#5e5757]">
                  Resend code in{" "}
                  <span className="text-[#0052b4]">
                    0:{timer.toString().padStart(2, "0")}
                  </span>
                </p>
              )}
              {status === "entering" && canResend && (
                <button
                  onClick={handleResend}
                  style={fontSwitzer}
                  className="text-[14px] font-medium text-[#0052b4]"
                >
                  Resend code
                </button>
              )}
            </div>
          </div>

          {/* Need Help */}
          <div className="flex items-center justify-center gap-1">
            <p style={fontSwitzer} className="text-[14px] text-[#333]">
              Need help?
            </p>
            <button style={fontSwitzer} className="text-[14px] font-medium text-[#0052b4]">
              Contact Support
            </button>
          </div>
        </div>

        {/* Verify Button */}
        <div className="px-5 pb-8 mt-8">
          <button
            disabled={!isComplete || status === "error"}
            style={fontSwitzer}
            className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
              !isComplete || status === "error"
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            <span className="text-[16px] font-medium text-white">Verify</span>
          </button>
        </div>

      </div>
    </div>
  );
}
