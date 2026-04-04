"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft } from "lucide-react";

export default function BiometricPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(120); // 2:00

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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Nav */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} style={{ objectFit: "contain" }} />
          </div>
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
              <Bell size={24} className="text-black" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
              <Mail size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px", gap: "24px" }}
        >
          {/* Back + Title */}
          <div className="flex items-center gap-[12px]">
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} className="text-black" />
            </button>
            <span style={{ ...fontSwitzer, fontSize: "18px", fontWeight: 600, color: "#000", letterSpacing: "0.8px" }}>
              Biometric Authentication
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-[20px] w-full" style={{ paddingTop: "20px" }}>
            <h2 style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", textAlign: "center" }}>
              Start Face Scan
            </h2>
            <p style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px", textAlign: "center", lineHeight: "21px" }}>
              Open the OneSyncID app on your mobile device and scan this QR code to complete authentication securely.
            </p>

            {/* QR Code placeholder */}
            <div
              className="flex items-center justify-center rounded-[8px]"
              style={{ width: "160px", height: "160px", border: "2px solid #025fc9", padding: "8px" }}
            >
              {/* QR pattern simulation */}
              <div className="w-full h-full relative" style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "2px" }}>
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: Math.random() > 0.5 ? "#025fc9" : "transparent",
                      borderRadius: "1px",
                    }}
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
            <button>
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px", textDecoration: "underline" }}>
                Can't scan the code?
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}