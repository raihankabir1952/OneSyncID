"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

        {/* Center Content */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[290px] flex flex-col items-center gap-[10px]">
          
          {/* Logo */}
          <Image
            src="/images/onesync-logo.png"
            alt="OneSyncID Logo"
            width={261}
            height={45}
            priority
          />

          {/* Tagline */}
          <p
            style={fontSwitzer}
            className="text-[16px] font-medium text-[#0052b4] tracking-[0.16px] text-center"
          >
          </p>
        </div>

        {/* Dotted Spinner  */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[407px]">
          <div className="w-[45px] h-[45px] relative animate-spin">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[5px] h-[5px] rounded-full bg-[#0052b4]"
                style={{
                  opacity: 0.2 + (i / 8) * 0.8,
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 45}deg) translate(16px, -50%)`,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}