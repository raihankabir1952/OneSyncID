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

// ─── Inline SVG Icons (no expiry) ────────────────────────────────────────────

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
    <path d="M15 18L9 12L15 6" />
  </svg>
);

// ─── Types & Schemas ──────────────────────────────────────────────────────────

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
    /*
     * Figma canvas: 393 × 852px (iPhone 14 frame)
     * Centered on gray bg to match mobile preview
     */
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="relative bg-white"
        style={{ width: "393px", minHeight: "852px" }}
      >

        {/* ── Header  (Figma: top: 80px, px: 20px, gap: 10px) ── */}
        <div
          className="absolute left-0 w-full px-5 flex flex-col gap-[10px]"
          style={{ top: "80px" }}
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
           * Figma:
           *   font-family : Switzer Semibold
           *   font-size   : 20px
           *   line-height : normal
           *   color       : #000000
           *   text-align  : left (not centered — matches Figma layout)
           */}
          <p
            style={fontSwitzer}
            className="text-[20px] font-semibold leading-normal text-black text-center w-full"
          >
            Welcome. Let&apos;s verify it&apos;s you.
          </p>
        </div>

        {/* ── Main Content (Figma: top: 190px, gap: 30px) ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="absolute left-0 w-full flex flex-col items-center"
          style={{ top: "190px", gap: "30px" }}
        >

          {/* Inner column — gap: 40px */}
          <div className="flex flex-col items-center w-full" style={{ gap: "40px" }}>

            {/*
             * Language & Country Card
             * Figma: px: 20px, border: 1px #d9d9d9, border-radius: 12px
             * Row height: py: 20px px: 16px
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
             * Phone/Email toggle + input
             * Figma: w: 353px, gap: 10px
             */}
            <div className="flex flex-col w-[353px]" style={{ gap: "10px" }}>

              {/*
               * Tab switcher
               * Figma: bg #f5f5f5, border 1px #d9d9d9, radius 12px
               *        px 10px py 8px
               * Active tab: bg white, border 1px #025fc9, radius 8px, p 8px
               * Label: Switzer Medium 16px leading-[21px] tracking-[0.16px]
               */}
              <PhoneEmailToggle
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/*
               * Phone input field
               * Figma: border 1px #d9d9d9, radius 12px, px 16px py 20px
               * Dial code: Switzer Regular 16px #5e5757
               * Label:     Switzer Medium  16px #5e5757 tracking-[0.16px] leading-[21px]
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
           * Buttons
           * Figma: gap 12px, w 353px, h 44px, radius 8px
           * Primary  : bg #025fc9, text white,    Switzer Medium 16px
           * Secondary: border 1.5px #025fc9, text #025fc9, Switzer Medium 16px
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
              className={`
                w-[353px] h-[44px] rounded-[8px]
                flex items-center justify-center
                bg-[#025fc9] transition-opacity
                ${!contact.trim() ? "opacity-60 cursor-not-allowed" : "opacity-100"}
              `}
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
              className="
                w-[353px] h-[44px] rounded-[8px]
                border-[1.5px] border-[#025fc9]
                flex items-center justify-center
                bg-white
              "
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