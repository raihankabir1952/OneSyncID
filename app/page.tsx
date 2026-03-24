"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/get-started");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen relative">

        {/* Logo + Tagline */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px]"
          style={{ top: "290px" }}
        >
          {/* Logo — local file */}
          <img
            src="/images/onesync-logo.png"
            alt="OneSyncID"
            style={{ width: "261px", height: "45px", objectFit: "contain" }}
          />

          {/* Tagline */}
          <p
            style={fontSwitzer}
            className="text-[16px] font-medium text-[#0052b4] tracking-[0.16px] text-center whitespace-nowrap"
          >
            {/* Verify Once. Access Everything. */}
          </p>
        </div>

        {/* Spinner */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "407px", width: "45.255px", height: "45.255px" }}
        >
          <style>{`
            @keyframes onesync-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .onesync-spinner {
              animation: onesync-spin 1s linear infinite;
              width: 45.255px;
              height: 45.255px;
              position: relative;
            }
          `}</style>

          <div className="onesync-spinner">
            {[...Array(8)].map((_, i) => {
              const angle = i * 45;
              const rad = (angle * Math.PI) / 180;
              const radius = 16;
              const cx = 22.5 + radius * Math.sin(rad);
              const cy = 22.5 - radius * Math.cos(rad);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: "#0052b4",
                    opacity: (i + 1) / 8,
                    top: `${cy - 2.5}px`,
                    left: `${cx - 2.5}px`,
                    transform: "none",
                  }}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}