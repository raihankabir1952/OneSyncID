"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function CityBankErrorPage() {
  const router = useRouter();

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
              marginBottom: "28px",
            }}
          >
            app.citybank.com
          </p>

          <p
            style={{
              ...fontSwitzer,
              fontSize: "16px",
              color: "#ff3b30",
              lineHeight: "24px",
              marginBottom: "18px",
            }}
          >
            Could not connect to the organization. Please try again.
          </p>

          <div className="flex gap-[10px]">
            <button
              type="button"
              onClick={() => router.push("/sso")}
              className="flex-1 rounded-[10px]"
              style={{
                height: "44px",
                border: "1px solid #d9d9d9",
                backgroundColor: "#fff",
              }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757" }}>
                Cancel
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/sso/city-bank")}
              className="flex-1 rounded-[10px]"
              style={{
                height: "44px",
                backgroundColor: "#025fc9",
              }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#fff", fontWeight: 500 }}>
                Try Again
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}