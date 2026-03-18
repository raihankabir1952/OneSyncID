"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

export default function SetupPasskeyPage() {
  const router = useRouter();

  const handleContinue = async () => {
    try {
      const available = await PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable();

      if (!available) {
        alert("Your device doesn't support passkeys.");
        return;
      }

      // Trigger biometric — backend registration needed in production
      router.push("/passkey/success");
    } catch {
      alert("Passkey setup failed. Please try again.");
    }
  };

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

        {/* Content */}
        <div className="flex-1 flex flex-col gap-[50px] pt-6 pb-10">

          {/* Header */}
          <div className="flex flex-col gap-[10px] px-5">
            <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
              <ArrowLeft size={24} className="text-black" />
            </button>
            <div className="flex justify-center">
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
                Set up your passkey
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-[40px]">
            {/* Instructions */}
            <div className="flex flex-col gap-[20px] px-5">
              <p style={fontSwitzer} className="text-[16px] text-[#333]">
                Use your device&apos;s biometric authentication to create a{" "}
                <span className="font-medium">secure passkey</span> for this account.
              </p>

              <ul style={fontSwitzer} className="flex flex-col gap-3 text-[14px] text-[#5e5757]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#5e5757] shrink-0" />
                  <span>Tap Continue to launch your device&apos;s biometric prompt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#5e5757] shrink-0" />
                  <span>Authenticate with Face ID, fingerprint, or your device PIN.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#5e5757] shrink-0" />
                  <span>Your passkey is stored securely on this device — never shared.</span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 px-5">
              <button
                onClick={handleContinue}
                style={fontSwitzer}
                className="w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-white">Continue</span>
              </button>

              <button
                onClick={() => router.back()}
                style={fontSwitzer}
                className="w-full h-11 border-[1.5px] border-[#d9d9d9] rounded-lg flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-[#5e5757]">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
