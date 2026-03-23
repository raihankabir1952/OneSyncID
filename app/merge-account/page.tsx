"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import MergeWarningBanner from "@/components/merge-account/MergeWarningBanner";
import NewAccountBadge from "@/components/merge-account/NewAccountBadge";
import ExistingAccountForm from "@/components/merge-account/ExistingAccountForm";
import OtpVerifySection from "@/components/merge-account/OtpVerifySection";

export default function MergeAccountPage() {
  const router = useRouter();
  const [authTab, setAuthTab] = useState<"password" | "pin">("password");
  const [otpTab, setOtpTab] = useState<"phone" | "email">("phone");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const isFormValid =
    usernameOrEmail.trim().length > 0 &&
    (authTab === "password" ? password.length >= 6 : pin.length >= 4);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
            <button
              onClick={() => router.back()}
              className="w-6 h-6 flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft size={24} className="text-black" />
            </button>
            <div className="flex items-center justify-center">
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
                {/* Merge accounts */}
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[25px] px-5 pt-[50px] pb-10">

            {/* Warning Banner */}
            <MergeWarningBanner />

            {/* New Account Badge */}
            <NewAccountBadge email="johndoe@mail.com" />

            {/* Existing Account Section */}
            <div className="flex flex-col gap-[40px]">

              {/* Sign In Section */}
              <div className="flex flex-col gap-[10px]">
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                  {/* SIGN INTO YOUR EXISTING ACCOUNT */}
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
                {/* Forgot password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    style={fontSwitzer}
                    className="text-[14px] text-[#0052b4]"
                    onClick={() => router.push("/reset-password")}
                  >
                    {/* Forgot password? */}
                  </button>
                </div>
              </div>

              {/* OTP Section */}
              <div className="flex flex-col gap-[10px]">
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                  {/* OR VERIFY WITH OTP INSTEAD */}
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
              className={`w-full h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">Continue</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}