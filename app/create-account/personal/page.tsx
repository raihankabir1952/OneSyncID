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
    fullName.trim().length >= 3 &&
    /^[a-zA-Z\s]+$/.test(fullName) &&
    dateOfBirth.trim().length > 0 &&
    gender !== "" &&
    isValidEmail(email) &&
    phoneNumber.trim().length >= 10 &&
    password.length >= 8 &&
    password === confirmPassword;

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
            >
              <ArrowLeft size={24} className="text-black" />
            </button>
            <div className="flex flex-col items-center gap-[10px]">
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
          <div className="flex flex-col gap-[40px] px-5 pt-[50px] pb-8">

            {/* Account Type Toggle */}
            <div className="flex flex-col gap-[10px]">
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#767676] font-medium"
              >
                ACCOUNT TYPE
              </p>
              <AccountTypeToggle
                activeType="personal"
                onTypeChange={(type) => {
                  if (type === "organization") router.push("/create-account");
                }}
              />
            </div>

            {/* Personal Information */}
            <div className="flex flex-col gap-[10px]">
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#767676] font-medium"
              >
                PERSONAL INFORMATION
              </p>
              <PersonalInfoSection
                fullName={fullName}
                dateOfBirth={dateOfBirth}
                gender={gender}
                isActive={!!fullName}
                onFullNameChange={setFullName}
                onDateOfBirthChange={setDateOfBirth}
                onGenderChange={setGender}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-[10px]">
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#767676] font-medium"
              >
                LOCATION
              </p>
              <LocationSection
                state={state}
                city={city}
                onStateChange={setState}
                onCityChange={setCity}
              />
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-[10px]">
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#767676] font-medium"
              >
                CONTACT
              </p>
              <ContactSection
                email={email}
                phoneNumber={phoneNumber}
                phoneCode="+880"
                countryCode="BD"
                onEmailChange={setEmail}
                onPhoneChange={setPhoneNumber}
              />
            </div>

            {/* Security */}
            <div className="flex flex-col gap-[10px]">
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#767676] font-medium"
              >
                SECURITY
              </p>
              <SecuritySection
                password={password}
                confirmPassword={confirmPassword}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
              />
            </div>

            {/* Verify With */}
            <div className="flex flex-col gap-[10px]">
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#767676] font-medium"
              >
                VERIFY WITH
              </p>
              <VerifyWithSection
                method={verifyMethod}
                onMethodChange={setVerifyMethod}
              />
            </div>

            {/* Terms + Continue Button */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[12px] text-[#333]">
                By signing in, you agree to our{" "}
                <span className="text-[#025fc9]">Terms</span>{" "}
                and{" "}
                <span className="text-[#025fc9]">Privacy Policy</span>
              </p>

              <button
                disabled={!isFormValid}
                onClick={() => {
                  const contact = verifyMethod === "phone" ? phoneNumber : email;
                  router.push(
                    `/otp?contact=${encodeURIComponent(contact)}&type=${verifyMethod}&from=create-account`
                  );
                }}
                style={fontSwitzer}
                className={`w-full h-11 bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                  !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
                }`}
              >
                <span className="text-[16px] font-medium text-white">Continue</span>
              </button>
            </div>

            {/* Merge accounts banner */}
            <div className="flex items-start gap-[3px] bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-[12px] px-[16px] py-[10px]">
              <Info size={16} className="text-[#025fc9] shrink-0 mt-0.5" />
              <div
                style={fontSwitzer}
                className="text-[12px] text-[#025fc9] leading-4 tracking-[0.12px] flex-1"
              >
                <p>Already have an account with another email?</p>
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