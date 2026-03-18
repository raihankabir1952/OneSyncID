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

        {/* Status Bar */}
        {/* <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
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
        </div> */}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
            <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
              <ArrowLeft size={24} className="text-black" />
            </button>
            <div className="flex items-center justify-center">
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
                Merge accounts
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[25px] px-5 pt-[50px] pb-10">
            <MergeWarningBanner />
            <NewAccountBadge email="johndoe@mail.com" />
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
            <OtpVerifySection
              otpTab={otpTab}
              onOtpTabChange={setOtpTab}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
              email={emailOtp}
              onEmailChange={setEmailOtp}
            />

            {/* Continue Button */}
            <button
              disabled={!isFormValid}
              onClick={() => router.push("/merge-account/verify")}
              style={fontSwitzer}
              className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
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