"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import LanguageCountryCard from "@/components/get-started/LanguageCountryCard";
import PhoneEmailToggle from "@/components/get-started/PhoneEmailToggle";
import PhoneInput from "@/components/get-started/PhoneInput";

type TabType = "phone" | "email";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState<TabType>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+880");
  const [countryCode, setCountryCode] = useState("BD");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const router = useRouter();

  const isPhoneValid = phoneNumber.trim().length >= 10;
  const isEmailValid = isValidEmail(email);
  const isFormValid = activeTab === "phone" ? isPhoneValid : isEmailValid;

  const handleSignIn = () => {
    if (activeTab === "phone") setPhoneTouched(true);
    else setEmailTouched(true);
    if (!isFormValid) return;
    router.push("/sign-in"); // ← Sign In page এ নিয়ে যাবে
  };

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

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center w-full">
            Welcome. Let&apos;s verify it&apos;s you.
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 px-5 pt-8 flex-1">
          <LanguageCountryCard
            onCountryChange={(code, cc) => {
              setPhoneCode(code);
              setCountryCode(cc);
            }}
          />
          <div className="flex flex-col gap-3">
            <PhoneEmailToggle
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setPhoneTouched(false);
                setEmailTouched(false);
              }}
            />
            <PhoneInput
              activeTab={activeTab}
              phoneNumber={phoneNumber}
              email={email}
              phoneCode={phoneCode}
              countryCode={countryCode}
              onPhoneChange={setPhoneNumber}
              onEmailChange={setEmail}
            />

            {/* Error messages */}
            {activeTab === "phone" && phoneTouched && !isPhoneValid && (
              <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-1">
                Please enter a valid phone number (min 10 digits)
              </p>
            )}
            {activeTab === "email" && emailTouched && !isEmailValid && (
              <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-1">
                Please enter a valid email address
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 px-5 mt-8 pb-8">
          <button
            onClick={handleSignIn}
            style={fontSwitzer}
            className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
              !isFormValid ? "opacity-60" : "opacity-100"
            }`}
          >
            <span className="text-[16px] font-medium text-white">Sign In</span>
          </button>

          <button
            onClick={() => router.push("/create-account")}
            className="w-full h-11 border-[1.5px] border-[#025fc9] rounded-lg flex items-center justify-center"
          >
            <span style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9]">
              Create OneSyncID
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}