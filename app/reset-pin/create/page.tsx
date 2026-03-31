"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

// ─── PIN dot-field sub-component ─────────────────────────────────────────────
/*
 * Figma:
 *   Label: Switzer Medium 16px #5e5757 leading-[21px] tracking-[0.16px]
 *   Row:   border-b #d9d9d9 | py 10px | flat (no card border)
 *   Dots:  6 circles | 16×16px | centered in row
 *          filled:  bg #025fc9 border #025fc9
 *          empty:   bg transparent border #d9d9d9 border-2
 *   gap between dots: 8px
 *   Figma dot container: w-[136px] h-[16px] — centered in full-width row
 */
function PinField({
  label,
  value,
  onChange,
  inputId,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  inputId: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col w-full" style={{ gap: "10px" }}>
      {/* Label — Switzer Medium 16px #5e5757 */}
      <p
        style={fontSwitzer}
        className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]"
      >
        {label}
      </p>

      {/* Underline row — border-b #d9d9d9 | py 10px */}
      <div
        className="w-full border-b border-[#d9d9d9] py-[10px] cursor-pointer"
        onClick={() => document.getElementById(inputId)?.focus()}
      >
        {/* Dots — centered in row using flex justify-center */}
        <div className="flex items-center justify-center" style={{ gap: "8px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-[16px] h-[16px] rounded-full border-2 shrink-0 transition-all ${
                i < value.length
                  ? "bg-[#025fc9] border-[#025fc9]"
                  : "bg-transparent border-[#d9d9d9]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hidden tel input */}
      <input
        id={inputId}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="opacity-0 absolute w-0 h-0"
      />

      {/* Error message */}
      {error && (
        <p style={fontSwitzer} className="text-[12px] text-red-500 leading-normal">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CreateNewPinPage() {
  const router = useRouter();

  const [newPin,     setNewPin]     = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [logoutAll,  setLogoutAll]  = useState(false);

  const pinsMatch = newPin.length === 6 && confirmPin.length === 6 && newPin === confirmPin;
  const isValid   = pinsMatch;

  const handleReset = () => {
    if (!isValid) return;
    router.push("/reset-pin/success");
  };

  return (
    /*
     * Figma: 393 × 852px (fixed)
     * No back button — empty 24px placeholder in header
     */
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="relative bg-white overflow-hidden"
        style={{ width: "393px", height: "852px" }}
      >
        <div className="absolute inset-0 overflow-y-auto">

          {/*
           * Header
           * Figma: px 20px | gap 10px
           * Back button area: empty h-[24px] placeholder (no back icon on this screen)
           * Title: Switzer Semibold 20px #000 | centered
           */}
          <div
            className="px-5 flex flex-col"
            style={{ paddingTop: "80px", gap: "10px" }}
          >
            {/* Empty back placeholder — 24px */}
            <div className="h-6 w-full" />

            <div className="flex justify-center">
              <h1
                style={fontSwitzer}
                className="text-[20px] font-semibold leading-normal text-black"
              >
                Create a new PIN
              </h1>
            </div>
          </div>

          {/*
           * Body
           * Figma: pt 50px | w 353px | outer gap 40px
           */}
          <div
            className="flex flex-col items-start px-5 pb-10"
            style={{ paddingTop: "50px", gap: "40px" }}
          >
            <div className="flex flex-col w-[353px]" style={{ gap: "30px" }}>

              {/*
               * Description
               * Figma: Switzer Regular 16px #333 leading-normal
               */}
              <p
                style={fontSwitzer}
                className="text-[16px] leading-normal text-[#333]"
              >
                Your new PIN must be different from your previous PINs.
              </p>

              {/* PIN fields + checkbox — gap 20px outer */}
              <div className="flex flex-col w-[353px]" style={{ gap: "20px" }}>

                {/* NEW PIN */}
                <PinField
                  label="NEW PIN"
                  value={newPin}
                  onChange={setNewPin}
                  inputId="new-pin-input"
                />

                {/* CONFIRM NEW PIN + checkbox — gap 12px */}
                <div className="flex flex-col w-full" style={{ gap: "12px" }}>
                  <PinField
                    label="CONFIRM NEW PIN"
                    value={confirmPin}
                    onChange={setConfirmPin}
                    inputId="confirm-pin-input"
                    error={
                      confirmPin.length === 6 && newPin !== confirmPin
                        ? "PINs do not match"
                        : undefined
                    }
                  />

                  {/*
                   * Log out of all devices
                   * Figma: checkbox 16×16px | border #5e5757 | radius 2px | gap 8px
                   * Label: Switzer Regular 14px #5e5757
                   */}
                  <button
                    type="button"
                    onClick={() => setLogoutAll((v) => !v)}
                    className="flex items-center"
                    style={{ gap: "8px" }}
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all shrink-0 ${
                        logoutAll
                          ? "bg-[#025fc9] border-[#025fc9]"
                          : "border-[#5e5757]"
                      }`}
                    >
                      {logoutAll && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      style={fontSwitzer}
                      className="text-[14px] leading-normal text-[#5e5757]"
                    >
                      Log out of all devices
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/*
             * Reset & Log In button
             * Figma: bg #025fc9 | h 44px | radius 8px | w 353px
             * Label: Switzer Medium 16px white
             * Disabled: opacity-60
             */}
            <button
              disabled={!isValid}
              onClick={handleReset}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !isValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium leading-normal text-white">
                Reset &amp; Log In
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}