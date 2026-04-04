"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Check } from "lucide-react";

export default function IdentityVerifiedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col items-center justify-center">

        <div
          className="flex flex-col items-center"
          style={{ gap: "16px", paddingLeft: "40px", paddingRight: "40px", width: "100%" }}
        >
          {/* Check icon */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: "72px", height: "72px", backgroundColor: "#e8f0fb" }}
          >
            <Check size={32} className="text-[#025fc9]" />
          </div>

          {/* Title */}
          <h1
            style={{
              ...fontSwitzer,
              fontSize: "20px",
              fontWeight: 600,
              color: "#000",
              letterSpacing: "0.8px",
              textAlign: "center",
            }}
          >
            Identity Verified
          </h1>

          {/* Subtitle */}
          <p
            style={{
              ...fontSwitzer,
              fontSize: "14px",
              color: "#5e5757",
              letterSpacing: "0.14px",
              textAlign: "center",
              lineHeight: "21px",
            }}
          >
            You can now access and edit your entire profile.
          </p>

          {/* Continue to App button */}
          <button
            onClick={() => router.push("/upload-file/preview")}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "8px" }}
          >
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "0.16px",
              }}
            >
              Continue to App
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}