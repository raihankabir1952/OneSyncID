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

// ─── Inline SVG Back Icon (no expiry) ─────────────────────────────────────────
/*
 * Figma: ep:back — left-pointing arrow
 * 24×24px | stroke #000 | strokeWidth 1.5
 */
const BackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

// ─── Types & Validation ───────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
  const router = useRouter();
  const [activeTab,   setActiveTab]   = useState<TabType>("phone");
  const [phoneCode,   setPhoneCode]   = useState("+880");
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
    /*
     * Outer wrapper — centers the 393px frame on larger screens
     */
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/*
       * ── Figma frame ──
       * width  : 393px (Figma exact)
       * height : 852px (Figma exact — fixed)
       * overflow: hidden
       */}
      <div
        className="relative bg-white overflow-hidden"
        style={{ width: "393px", height: "852px" }}
      >

        {/*
         * ── Header ──
         * Figma: top: 80px | px: 20px | gap: 10px
         */}
        <div
          className="absolute left-0 w-full px-5 flex flex-col"
          style={{ top: "80px", gap: "10px" }}
        >
          {/* Back button — 24×24px */}
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="w-6 h-6 flex items-center justify-center"
              aria-label="Go back"
            >
              <BackIcon />
            </button>
          </div>

          {/*
           * Figma: Switzer Semibold | 20px | leading-normal | #000
           * text-center per user request
           */}
          <p
            style={fontSwitzer}
            className="text-[20px] font-semibold leading-normal text-black text-center w-full"
          >
            Welcome. Let&apos;s verify it&apos;s you.
          </p>
        </div>

        {/*
         * ── Main Content ──
         * Figma: top: 190px | gap: 30px
         */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="absolute left-0 w-full flex flex-col items-center"
          style={{ top: "190px", gap: "30px" }}
        >
          {/* Inner column — Figma gap: 40px */}
          <div
            className="flex flex-col items-center w-full"
            style={{ gap: "40px" }}
          >
            {/*
             * Language & Country Card
             * Figma: px: 20px | border 1px #d9d9d9 | radius 12px
             * Row: px 16px | py 20px | h 64px each
             */}
            <div className="px-5 w-full">
              <LanguageCountryCard
                onCountryChange={(code, cc) => {
                  setPhoneCode(code);
                  setCountryCode(cc);
                }}
              />
            </div>

            {/*
             * Phone/Email Toggle + Input
             * Figma: w 353px | gap 10px
             */}
            <div className="flex flex-col w-[353px]" style={{ gap: "10px" }}>
              {/*
               * Tab Switcher
               * Figma: bg #f5f5f5 | border 1px #d9d9d9 | radius 12px
               *        px 10px | py 8px | h 53px
               * Active: bg white | border 1px #025fc9 | radius 8px | p 8px
               * Label: Switzer Medium | 16px | leading-[21px] | tracking-[0.16px]
               */}
              <PhoneEmailToggle
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/*
               * Input Field
               * Figma: border 1px #d9d9d9 | radius 12px | px 16px | py 20px
               * Dial code:   Switzer Regular 16px #5e5757
               * Field label: Switzer Medium  16px #5e5757 tracking-[0.16px] leading-[21px]
               * Placeholder: Switzer Regular 16px #a09898
               */}
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

              {/* Validation error — Switzer Regular 12px red-500 */}
              {errors.contact && (
                <p
                  style={fontSwitzer}
                  className="text-[12px] font-normal leading-normal text-red-500 px-1"
                >
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          {/*
           * ── Buttons ──
           * Figma: gap 12px | w 353px | h 44px | radius 8px
           * Primary  : bg #025fc9 | white   | Switzer Medium 16px
           * Secondary: border 1.5px #025fc9 | #025fc9 | Switzer Medium 16px
           */}
          <div
            className="flex flex-col items-center w-full pb-8"
            style={{ gap: "12px" }}
          >
            {/* Sign In — Primary */}
            <button
              type="submit"
              disabled={!contact.trim()}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] rounded-[8px] flex items-center justify-center bg-[#025fc9] transition-opacity ${
                !contact.trim() ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium leading-normal text-white">
                Sign In
              </span>
            </button>

            {/* Create OneSyncID — Secondary */}
            <button
              type="button"
              onClick={() => router.push("/create-account")}
              style={fontSwitzer}
              className="w-[353px] h-[44px] rounded-[8px] border-[1.5px] border-[#025fc9] flex items-center justify-center bg-white"
            >
              <span className="text-[16px] font-medium leading-normal text-[#025fc9]">
                Create OneSyncID
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}