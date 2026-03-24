"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { fontSwitzer } from "@/lib/styles";
import LanguageCountryCard from "@/components/get-started/LanguageCountryCard";
import PhoneEmailToggle from "@/components/get-started/PhoneEmailToggle";
import PhoneInput from "@/components/get-started/PhoneInput";

// Inline SVG — no expiry
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

type TabType = "phone" | "email";

const phoneSchema = z.object({
  contact: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^1[3-9]\d{8}$/, "Enter a valid phone number"),
});

const emailSchema = z.object({
  contact: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type FormValues = { contact: string };

export default function GetStartedPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("phone");
  const [phoneCode, setPhoneCode] = useState("+880");
  const [countryCode, setCountryCode] = useState("BD");

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(activeTab === "phone" ? phoneSchema : emailSchema),
    defaultValues: { contact: "" },
  });

  const contact = watch("contact");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    reset({ contact: "" });
  };

  const onSubmit = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen relative">

        {/* Header — top: 80px */}
        <div
          className="absolute left-0 w-full px-5 flex flex-col gap-[10px]"
          style={{ top: "80px" }}
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
          <p
            style={fontSwitzer}
            className="text-[20px] font-semibold text-black text-center w-full"
          >
            Welcome. Let&apos;s verify it&apos;s you.
          </p>
        </div>

        {/* Main Content — top: 190px */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="absolute left-0 w-full flex flex-col gap-[30px] items-center"
          style={{ top: "190px" }}
        >
          <div className="flex flex-col gap-[40px] items-center w-full">

            {/* Language & Country Card */}
            <div className="px-5 w-full">
              <LanguageCountryCard
                onCountryChange={(code, cc) => {
                  setPhoneCode(code);
                  setCountryCode(cc);
                }}
              />
            </div>

            {/* Phone/Email Toggle + Input */}
            <div className="flex flex-col gap-[10px] w-[353px]">
              <PhoneEmailToggle
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
              <PhoneInput
                activeTab={activeTab}
                phoneNumber={activeTab === "phone" ? contact : ""}
                email={activeTab === "email" ? contact : ""}
                phoneCode={phoneCode}
                countryCode={countryCode}
                onPhoneChange={(val) => {
                  setValue("contact", val);
                  clearErrors("contact");
                }}
                onEmailChange={(val) => {
                  setValue("contact", val);
                  clearErrors("contact");
                }}
              />

              {/* Error */}
              {errors.contact && (
                <p style={fontSwitzer} className="text-[12px] text-red-500 px-1">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-[12px] items-center w-full pb-8">
            <button
              type="submit"
              disabled={!contact.trim()}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !contact.trim() ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/create-account")}
              style={fontSwitzer}
              className="w-[353px] h-[44px] border-[1.5px] border-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-[#025fc9]">
                Create OneSyncID
              </span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}