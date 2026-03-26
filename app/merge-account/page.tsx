"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import MergeWarningBanner from "@/components/merge-account/MergeWarningBanner";
import NewAccountBadge from "@/components/merge-account/NewAccountBadge";
import ExistingAccountForm from "@/components/merge-account/ExistingAccountForm";
import OtpVerifySection from "@/components/merge-account/OtpVerifySection";

// ─── Inline Back Icon (no expiry) ────────────────────────────────────────────
/*
 * Figma: ep:back | 24×24px | left-pointing arrow
 */
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <path d="M12 19l-7-7 7-7"/>
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MergeAccountPage() {
  const router = useRouter();

  const [authTab,         setAuthTab]         = useState<"password" | "pin">("password");
  const [otpTab,          setOtpTab]          = useState<"phone" | "email">("phone");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password,        setPassword]        = useState("");
  const [pin,             setPin]             = useState("");
  const [phoneNumber,     setPhoneNumber]     = useState("");
  const [emailOtp,        setEmailOtp]        = useState("");

  const isFormValid =
    usernameOrEmail.trim().length > 0 &&
    (authTab === "password" ? password.length >= 6 : pin.length >= 4);

  return (
    /*
     * ── Figma frame ──
     * width : 393px (Figma exact)
     * height: 1011px (Figma exact — scrollable content)
     * Outer: min-h-screen to fill viewport, scroll inside
     */
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="relative bg-white"
        style={{ width: "393px", minHeight: "1011px" }}
      >
        {/* Scrollable inner */}
        <div className="absolute inset-0 overflow-y-auto">

          {/*
           * ── Header ──
           * Figma: top: 80px | px: 20px | gap: 10px
           * Title: Switzer Semibold | 20px | #000 | centered (x:117.5 in 393px)
           */}
          <div
            className="px-5 flex flex-col"
            style={{ paddingTop: "80px", gap: "10px" }}
          >
            {/* Back — 24×24px */}
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
             * centered in frame
             */}
            <div className="flex items-center justify-center w-full">
              <h1
                style={fontSwitzer}
                className="text-[20px] font-semibold leading-normal text-black"
              >
                Merge accounts
              </h1>
            </div>
          </div>

          {/*
           * ── Body ──
           * Figma: top of content: 110px from frame top
           *        left: 20px | w: 353px | gap between sections: 25px (outer), 40px (inner)
           */}
          <div
            className="flex flex-col items-center px-5 pb-10"
            style={{ paddingTop: "50px", gap: "25px" }}
          >

            {/*
             * Warning Banner
             * Figma: bg rgba(255,244,229,0.7) | border #fde3e0 | radius 12px
             *        px 16px | py 10px | h 62px | w 353px
             */}
            <MergeWarningBanner />

            {/*
             * New Account Badge
             * Figma: bg rgba(2,95,201,0.05) | border rgba(2,95,201,0.2) | radius 12px
             *        px 16px | py 10px | h 68px | w 353px
             */}
            <NewAccountBadge email="johndoe@mail.com" />

            {/* Inner sections — gap: 40px */}
            <div className="flex flex-col w-[353px]" style={{ gap: "40px" }}>

              {/* ── Sign In Section ──
               * Section label: Switzer Medium | 14px | #767676 | tracking-[0.14px]
               * gap: 10px
               */}
              <div className="flex flex-col w-full" style={{ gap: "10px" }}>
                <p
                  style={fontSwitzer}
                  className="text-[14px] font-medium text-[#767676] tracking-[0.14px] leading-normal"
                >
                  SIGN INTO YOUR EXISTING ACCOUNT
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

                {/*
                 * Forgot password — right-aligned
                 * Figma: Switzer Regular | 14px | #0052b4
                 */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    style={fontSwitzer}
                    className="text-[14px] leading-normal text-[#0052b4]"
                    onClick={() => router.push("/reset-password")}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* ── OTP Section ──
               * Section label: Switzer Medium | 14px | #767676 | tracking-[0.14px]
               * gap: 10px
               */}
              <div className="flex flex-col w-full" style={{ gap: "10px" }}>
                <p
                  style={fontSwitzer}
                  className="text-[14px] font-medium text-[#767676] tracking-[0.14px] leading-normal"
                >
                  OR VERIFY WITH OTP INSTEAD
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

            {/*
             * ── Continue Button ──
             * Figma: bg #025fc9 | h 44px | radius 8px | w 353px
             * Label: Switzer Medium | 16px | white
             */}
            <button
              disabled={!isFormValid}
              onClick={() => router.push("/merge-account/verify")}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium leading-normal text-white">
                Continue
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}