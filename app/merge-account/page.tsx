"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import MergeWarningBanner from "@/components/merge-account/MergeWarningBanner";
import NewAccountBadge from "@/components/merge-account/NewAccountBadge";
import ExistingAccountForm from "@/components/merge-account/ExistingAccountForm";
import OtpVerifySection from "@/components/merge-account/OtpVerifySection";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export default function MergeAccountPage() {
  const router = useRouter();

  const [authTab,         setAuthTab]         = useState<"password" | "pin">("password");
  const [otpTab,          setOtpTab]          = useState<"phone" | "email">("phone");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password,        setPassword]        = useState("");
  const [pin,             setPin]             = useState("");
  const [phoneNumber,     setPhoneNumber]     = useState("");
  const [emailOtp,        setEmailOtp]        = useState("");

  const isFormValid =
    usernameOrEmail.trim().length > 0 &&
    (authTab === "password" ? password.length >= 6 : pin.length >= 4);

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
                Merge accounts
              </h1>
            </div>
          </div>

          {/* ── Body ── */}
          <div
            className="flex flex-col items-center px-5 pb-10"
            style={{ paddingTop: "50px", gap: "25px" }}
          >
            <MergeWarningBanner />

            <NewAccountBadge email="johndoe@mail.com" />

            <div className="flex flex-col w-[353px]" style={{ gap: "40px" }}>

              {/* Sign In Section */}
              <div className="flex flex-col w-full" style={{ gap: "10px" }}>
                <p
                  style={fontSwitzer}
                  className="text-[14px] font-medium text-[#767676] tracking-[0.14px] leading-normal"
                >
                  SIGN INTO YOUR EXISTING ACCOUNT
                </p>

                <ExistingAccountForm
                  authTab={authTab}
                  onAuthTabChange={setAuthTab}
                  usernameOrEmail={usernameOrEmail}
                  onUsernameOrEmailChange={setUsernameOrEmail}
                  password={password}
                  onPasswordChange={setPassword}
                  pin={pin}
                  onPinChange={setPin}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    style={fontSwitzer}
                    className="text-[14px] leading-normal text-[#0052b4]"
                    onClick={() => router.push("/reset-password")}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* OTP Section */}
              <div className="flex flex-col w-full" style={{ gap: "10px" }}>
                <p
                  style={fontSwitzer}
                  className="text-[14px] font-medium text-[#767676] tracking-[0.14px] leading-normal"
                >
                  OR VERIFY WITH OTP INSTEAD
                </p>

                <OtpVerifySection
                  otpTab={otpTab}
                  onOtpTabChange={setOtpTab}
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={setPhoneNumber}
                  email={emailOtp}
                  onEmailChange={setEmailOtp}
                />
              </div>
            </div>

            {/* Continue Button */}
            <button
              disabled={!isFormValid}
              onClick={() => router.push("/merge-account/verify")}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium leading-normal text-white">
                Continue
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}