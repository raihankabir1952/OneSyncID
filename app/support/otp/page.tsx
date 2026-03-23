"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import SupportOtpInput from "@/components/support/SupportOtpInput";

const RESEND_COUNTDOWN = 60;
const MOCK_OTP = "123456";
const VALID_PHONE = "01712345678";

function SupportOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!isVerified) return;
    const normalizedPhone = phoneNumber.replace(/\D/g, "").replace(/^880/, "0");
    const timeout = setTimeout(() => {
      if (normalizedPhone === VALID_PHONE) {
        router.push("/support/case");
      } else {
        router.push("/support/no-account");
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isVerified, router, phoneNumber]);

  const handleComplete = (code: string) => {
    if (code === MOCK_OTP) {
      setHasError(false);
      setIsVerified(true);
    } else {
      setHasError(true);
    }
  };

  const handleOtpChange = (val: string[]) => {
    setOtp(val);
    if (hasError) setHasError(false);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(6).fill(""));
    setTimer(RESEND_COUNTDOWN);
    setCanResend(false);
    setHasError(false);
    setIsVerified(false);
  };

  const formatTimer = (t: number) =>
    `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
          <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <div className="flex items-center justify-center w-full">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              Check your phone
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[40px] flex-1 px-5 pt-[50px] pb-8">
          <div className="flex flex-col gap-[20px]">
            <p style={fontSwitzer} className="text-[16px] text-[#333] leading-normal">
              A 6-digit verification code is on its way to{" "}
              <span className="text-[#0052b4]">{phoneNumber}</span>.
            </p>
            <div className="flex flex-col gap-[16px]">
              <p style={fontSwitzer} className="text-[16px] font-medium text-black text-center">
                Enter your verification code
              </p>
              <SupportOtpInput
                value={otp}
                onChange={handleOtpChange}
                onComplete={handleComplete}
                hasError={hasError}
                isVerified={isVerified}
              />
            </div>
            {!isVerified && (
              <div className="flex items-center justify-center h-[18px]">
                {canResend ? (
                  <button onClick={handleResend}>
                    <p style={fontSwitzer} className="text-[14px] text-[#0052b4] text-center">
                      Resend code
                    </p>
                  </button>
                ) : (
                  <p style={fontSwitzer} className="text-[14px] text-[#5e5757] text-center">
                    Resend code in{" "}
                    <span className="text-[#0052b4]">{formatTimer(timer)}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {!isVerified && (
            <div className="flex gap-1 items-center justify-center">
              <p style={fontSwitzer} className="text-[14px] text-[#333]">Need help?</p>
              <button onClick={() => router.push("/support")}>
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#0052b4]">
                  Contact Support
                </p>
              </button>
            </div>
          )}

          <button
            disabled
            className="h-[44px] rounded-[8px] w-full flex items-center justify-center bg-[#025fc9] opacity-60 cursor-not-allowed"
          >
            <span style={fontSwitzer} className="text-[16px] font-medium text-white">Verify</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function SupportOtpPage() {
  return (
    <Suspense>
      <SupportOtpContent />
    </Suspense>
  );
}