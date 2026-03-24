"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import OtpInput from "@/components/otp/OtpInput";

type OtpStatus = "entering" | "success" | "error";

const CORRECT_OTP = "123456";

function OtpPageContent() {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<OtpStatus>("entering");
  const [timer, setTimer] = useState(24);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const contact = searchParams.get("contact") ?? "";
  const type = searchParams.get("type") ?? "phone";
  const from = searchParams.get("from") ?? "create-account";
  const displayContact = type === "phone" ? `+880${contact}` : contact;

  useEffect(() => {
    if (canResend) return;
    if (timer <= 0) { setCanResend(true); return; }
    const timeout = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(timeout);
  }, [timer, canResend]);

  // Auto verify when 6 digits entered
  useEffect(() => {
    const code = digits.join("");
    if (code.length === 6) {
      if (code === CORRECT_OTP) {
        setStatus("success");
        setTimeout(() => {
          if (from === "create-account") router.push("/welcome");
          else if (from === "sign-in") router.push("/dashboard");
          else router.push("/welcome");
        }, 2000);
      } else {
        setStatus("error");
      }
    } else {
      if (status !== "entering") setStatus("entering");
    }
  }, [digits, router, from, status]);

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setStatus("entering");
    setTimer(24);
    setCanResend(false);
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code === CORRECT_OTP) {
      setStatus("success");
      setTimeout(() => {
        // if (from === "create-account") router.push("/quick-setup");
        if (from === "create-account") router.push("/welcome");
        else if (from === "sign-in") router.push("/dashboard");
        else router.push("/welcome");
      }, 2000);
    } else {
      setStatus("error");
    }
  };

  const isComplete = digits.join("").length === 6;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-3">
          <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center w-full">
            Enter your verification code.
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 px-5 pt-10 flex-1">
          <p style={fontSwitzer} className="text-[16px] text-[#333] leading-relaxed">
            A 6-digit verification code is on its way to{" "}
            <span className="text-[#0052b4]">{displayContact}</span>.
          </p>

          <div className="flex flex-col gap-5">
            <p style={fontSwitzer} className="text-[16px] font-medium text-black">
              Enter your verification code
            </p>
            <OtpInput digits={digits} status={status} onChange={setDigits} />

            <div className="text-center min-h-[20px]">
              {status === "success" && (
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#11a75c]">
                  {type === "phone" ? "Phone number verified!" : "Email verified!"}
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
                  <span className="text-[#0052b4]">0:{timer.toString().padStart(2, "0")}</span>
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

          <div className="flex items-center justify-center gap-1">
            <p style={fontSwitzer} className="text-[14px] text-[#333]">Need help?</p>
            <button
              onClick={() => router.push("/support")}
              style={fontSwitzer}
              className="text-[14px] font-medium text-[#0052b4]"
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Verify Button — success - hide, error হলে fallback হিসেবে show */}
        {status !== "success" && (
          <div className="px-5 pb-8 mt-8">
            <button
              disabled={!isComplete || status === "error"}
              onClick={handleVerify}
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
        )}

      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpPageContent />
    </Suspense>
  );
}