"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { X } from "lucide-react";

export default function VerificationFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col items-center justify-center">

        <div
          className="flex flex-col items-center"
          style={{ gap: "16px", paddingLeft: "40px", paddingRight: "40px", width: "100%" }}
        >
          {/* X icon */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: "72px", height: "72px", backgroundColor: "#fff0f0" }}
          >
            <X size={32} className="text-[#f04438]" />
          </div>

          {/* Title */}
          <h1
            style={{
              ...fontSwitzer,
              fontSize: "20px",
              fontWeight: 600,
              color: "#f04438",
              letterSpacing: "0.8px",
              textAlign: "center",
            }}
          >
            Identity Verification Failed
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
            Your profile name doesn't matches with your document.
          </p>

          {/* Try Again button */}
          <button
            onClick={() => router.push("/upload-file/quick-verify")}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#f04438", marginTop: "8px" }}
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
              Try Again
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}