"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { fontSwitzer } from "@/lib/styles";
import LanguageCountryCard from "@/components/get-started/LanguageCountryCard";
import PhoneEmailToggle, { TabType } from "@/components/get-started/PhoneEmailToggle";
import PhoneInput from "@/components/get-started/PhoneInput";

// ─── Inline SVG Back Icon ─────────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

// ─── Mock Credentials ─────────────────────────────────────────────────────────
// Valid phone : +880 1798546751  → goes to /otp
// Valid email : test@onesyncid.com → goes to /otp
// Anything else → State 4 "No account found"
const VALID_PHONE = "1798546751";
const VALID_EMAIL = "test@onesyncid.com";

// ─── Validation ───────────────────────────────────────────────────────────────
const phoneSchema = z.object({
  contact: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});
const emailSchema = z.object({
  contact: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type FormValues = { contact: string };

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GetStartedPage() {
  const router = useRouter();

  const [activeTab,   setActiveTab]   = useState<TabType>("phone");
  const [phoneCode,   setPhoneCode]   = useState("+880");
  const [countryCode, setCountryCode] = useState("BD");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    setValue, watch, handleSubmit,
    formState: { errors },
    clearErrors, reset,
  } = useForm<FormValues>({
    resolver: zodResolver(activeTab === "phone" ? phoneSchema : emailSchema),
    defaultValues: { contact: "" },
  });

  const contact = watch("contact");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setServerError(null);
    reset({ contact: "" });
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const onSubmit = ({ contact }: FormValues) => {
    setServerError(null);

    if (activeTab === "phone") {
      if (contact === VALID_PHONE) {
        // ✅ Pass full phone number (dialCode + number) to OTP page via query param
        const fullPhone = encodeURIComponent(`${phoneCode}${contact}`);
        router.push(`/otp?phone=${fullPhone}&type=phone`);
      } else {
        setServerError(
          "No account found with this phone number.\nCreate an account to continue."
        );
      }
    } else {
      if (contact === VALID_EMAIL) {
        // ✅ Pass email to OTP page
        const encodedEmail = encodeURIComponent(contact);
        router.push(`/otp?email=${encodedEmail}&type=email`);
      } else {
        setServerError(
          "No account found with this email address.\nCreate an account to continue."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/* ── 393×852 Figma frame ── */}
      <div className="relative bg-white overflow-hidden" style={{ width: "393px", minHeight: "852px" }}>

        {/* ── Header — top: 80px ── */}
        <div
          className="absolute left-0 w-full px-[20px] flex flex-col"
          style={{ top: "80px", gap: "10px" }}
        >
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-6 h-6 flex items-center justify-center"
              aria-label="Go back"
            >
              <BackIcon />
            </button>
          </div>
          <p style={fontSwitzer} className="text-[20px] font-semibold leading-normal text-black text-center w-full">
            Welcome. Let&apos;s verify it&apos;s you.
          </p>
        </div>

        {/* ── Body — top: 190px ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="absolute left-0 w-full flex flex-col items-center"
          style={{ top: "190px", gap: "30px" }}
        >
          {/* Inner column — gap 40px */}
          <div className="flex flex-col items-center w-full" style={{ gap: "40px" }}>

            {/* Language & Country */}
            <div className="px-[20px] w-full">
              <LanguageCountryCard
                onCountryChange={(code, cc) => {
                  setPhoneCode(code);
                  setCountryCode(cc);
                }}
              />
            </div>

            {/* Toggle + Input */}
            <div className="flex flex-col w-[353px]" style={{ gap: "30px" }}>
              <PhoneEmailToggle activeTab={activeTab} onTabChange={handleTabChange} />

              <PhoneInput
                activeTab={activeTab}
                phoneNumber={activeTab === "phone" ? contact : ""}
                email={activeTab === "email" ? contact : ""}
                phoneCode={phoneCode}
                countryCode={countryCode}
                onPhoneChange={(val) => {
                  setValue("contact", val);
                  clearErrors("contact");
                  setServerError(null);
                }}
                onEmailChange={(val) => {
                  setValue("contact", val);
                  clearErrors("contact");
                  setServerError(null);
                }}
              />

              {/* Zod field error */}
              {errors.contact && (
                <p style={fontSwitzer} className="text-[12px] text-red-500 leading-normal px-1 -mt-[20px]">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Buttons ── */}
          <div className="flex flex-col items-center" style={{ gap: "12px" }}>
            <button
              type="submit"
              disabled={!contact.trim()}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] rounded-[8px] flex items-center justify-center bg-[#025fc9] transition-opacity ${
                !contact.trim() ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium leading-normal text-white">Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/create-account")}
              style={fontSwitzer}
              className="w-[353px] h-[44px] rounded-[8px] border-[1.5px] border-[#025fc9] flex items-center justify-center bg-white"
            >
              <span className="text-[16px] font-medium leading-normal text-[#025fc9]">Create OneSyncID</span>
            </button>
          </div>

          {/* ── State 4 — No account found ── */}
          {serverError && (
            <div style={fontSwitzer} className="flex flex-col items-center text-[14px] leading-normal text-center w-[353px] pb-6">
              <p className="text-[#f42a41]">{serverError.split("\n")[0]}</p>
              <p className="text-[#5e5757]">{serverError.split("\n")[1]}</p>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}