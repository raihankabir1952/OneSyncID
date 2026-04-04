"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { PlusCircle } from "lucide-react";

export default function ScanCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Body */}
        <div
          className="flex flex-col"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "60px", gap: "24px" }}
        >
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
            Scan complete
          </h1>

          {/* Scanned page thumbnail */}
          <div className="flex flex-col" style={{ gap: "12px" }}>
            <div
              className="rounded-[12px] overflow-hidden bg-[#e8e8e8] relative"
              style={{ width: "140px", height: "100px" }}
            >
              {/* Placeholder thumbnail */}
              <div className="w-full h-full bg-[#c8c8c8] flex items-end justify-center">
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "12px",
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    width: "100%",
                    textAlign: "center",
                    padding: "4px",
                  }}
                >
                  Page 1
                </span>
              </div>
            </div>

            {/* Add another page */}
            <button className="flex items-center gap-[6px]">
              <PlusCircle size={20} className="text-[#025fc9]" />
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#025fc9",
                  letterSpacing: "0.14px",
                }}
              >
                Add another page
              </span>
            </button>
          </div>

          {/* Continue to Verify button */}
          <button
            onClick={() => router.push("/upload-file/processing")}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "12px" }}
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
              Continue to Verify
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}