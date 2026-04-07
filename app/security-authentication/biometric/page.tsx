"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft } from "lucide-react";

// Fixed QR pattern — Math.random() causes hydration mismatch
const QR_PATTERN = [
  1,0,1,1,0,1,0,1,
  0,1,0,1,1,0,1,0,
  1,1,1,0,0,1,1,0,
  0,0,1,1,0,0,1,1,
  1,0,0,1,1,0,0,1,
  0,1,1,0,1,1,0,1,
  1,0,1,0,0,1,0,1,
  0,1,0,1,1,0,1,0,
];

export default function BiometricPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[24px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Biometric Authentication
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[20px] w-full pt-[20px]">
          <h2 style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", textAlign: "center" }}>
            Start Face Scan
          </h2>
          <p style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px", textAlign: "center", lineHeight: "21px" }}>
            Open the OneSyncID app on your mobile device and scan this QR code to complete authentication securely.
          </p>

          {/* QR Code — fixed pattern */}
          <div
            className="flex items-center justify-center rounded-[8px]"
            style={{ width: "160px", height: "160px", border: "2px solid #025fc9", padding: "8px" }}
          >
            <div className="w-full h-full" style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "2px" }}>
              {QR_PATTERN.map((on, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: on ? "#025fc9" : "transparent", borderRadius: "1px" }}
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <p style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
            Code expires in{" "}
            <span style={{ color: timeLeft > 30 ? "#025fc9" : "#f04438", fontWeight: 600 }}>
              {formatTime(timeLeft)}
            </span>
          </p>

          {/* Can't scan */}
          <button type="button">
            <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px", textDecoration: "underline" }}>
              Can&apos;t scan the code?
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}