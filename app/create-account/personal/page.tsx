"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import AccountTypeToggle from "@/components/create-account/AccountTypeToggle";
import PersonalInfoSection from "@/components/create-account/PersonalInfoSection";
import LocationSection from "@/components/create-account/LocationSection";
import ContactSection from "@/components/create-account/ContactSection";
import SecuritySection from "@/components/create-account/SecuritySection";
import VerifyWithSection from "@/components/create-account/VerifyWithSection";

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say" | "";
type VerifyMethod = "email" | "phone";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function PersonalFormPage() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>("email");
  const router = useRouter();

const isFormValid =
  fullName.trim().length >= 3 &&               //min 3 character
  /^[a-zA-Z\s]+$/.test(fullName) &&            // only letters
  dateOfBirth.trim().length > 0 &&
  gender !== "" &&
  isValidEmail(email) &&
  phoneNumber.trim().length >= 10 &&           //min 10 digits
  password.length >= 8 &&
  password === confirmPassword;

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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-5 pt-6 pb-2 flex flex-col gap-3">
            <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
              <ArrowLeft size={24} className="text-black" />
            </button>
            <div className="flex flex-col items-center gap-2">
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
                Create your OneSyncID
              </h1>
              <p style={fontSwitzer} className="text-[14px] text-[#a09898]">
                Already have an account?{" "}
                <Link href="/merge-account" className="text-[#025fc9]">
                  Merge now
                </Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 px-5 pt-8 pb-6">

            <AccountTypeToggle
              activeType="personal"
              onTypeChange={(type) => {
                if (type === "organization") router.push("/create-account");
              }}
            />

            <PersonalInfoSection
              fullName={fullName}
              dateOfBirth={dateOfBirth}
              gender={gender}
              isActive={!!fullName}
              onFullNameChange={setFullName}
              onDateOfBirthChange={setDateOfBirth}
              onGenderChange={setGender}
            />

            <LocationSection
              state={state}
              city={city}
              onStateChange={setState}
              onCityChange={setCity}
            />

            <ContactSection
              email={email}
              phoneNumber={phoneNumber}
              phoneCode="+880"
              countryCode="BD"
              onEmailChange={setEmail}
              onPhoneChange={setPhoneNumber}
            />

            <SecuritySection
              password={password}
              confirmPassword={confirmPassword}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
            />

            <VerifyWithSection
              method={verifyMethod}
              onMethodChange={setVerifyMethod}
            />

            {/* Terms */}
            <p style={fontSwitzer} className="text-[12px] text-[#333]">
              By signing in, you agree to our{" "}
              <span className="text-[#025fc9]">Terms</span>{" "}
              and{" "}
              <span className="text-[#025fc9]">Privacy Policy</span>
            </p>

            {/* Continue Button */}
            <button
              disabled={!isFormValid}
              onClick={() => router.push("/welcome")}
              style={fontSwitzer}
              className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">Continue</span>
            </button>

            {/* Merge accounts banner */}
            <div className="flex items-start gap-2 bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-xl px-4 py-3">
              <Info size={16} className="text-[#025fc9] shrink-0 mt-0.5" />
              <div style={fontSwitzer} className="text-[12px] text-[#025fc9] leading-4 tracking-[0.12px]">
                <p>Already have an account with another email?</p>
                {/* <p className="font-semibold">Merge accounts</p> */}
                <Link href="/merge-account" className="font-semibold">
                  Merge accounts
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
