"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import LanguageCountryCard from "@/components/get-started/LanguageCountryCard";
import PhoneEmailToggle from "@/components/get-started/PhoneEmailToggle";
import PhoneInput from "@/components/get-started/PhoneInput";

type TabType = "phone" | "email";

const phoneSchema = z.object({
  contact: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^1[3-9]\d{8}$/, "Enter a valid  phone number")
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
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center w-full">
            Welcome. Let&apos;s verify it&apos;s you.
          </h1>
        </div>

        {/* Main Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-[30px] px-5 pt-[30px] flex-1"
        >
          <div className="flex flex-col gap-[40px]">
            <LanguageCountryCard
              onCountryChange={(code, cc) => {
                setPhoneCode(code);
                setCountryCode(cc);
              }}
            />

            <div className="flex flex-col gap-[10px]">
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

              {/* Error message */}
              {errors.contact && (
                <p style={fontSwitzer} className="text-[12px] text-red-500 px-1">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-[12px] pb-8 mt-auto">
            <button
              type="submit"
              disabled={!contact.trim()}
              style={fontSwitzer}
              className={`w-full h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !contact.trim() ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/create-account")}
              style={fontSwitzer}
              className="w-full h-[44px] border-[1.5px] border-[#025fc9] rounded-[8px] flex items-center justify-center"
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