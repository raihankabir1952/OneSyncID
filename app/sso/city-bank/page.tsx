"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function CityBankApprovalPage() {
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
              marginBottom: "24px",
            }}
          >
            app.citybank.com
          </p>

          <div
            className="rounded-[12px]"
            style={{ border: "1px solid #d9d9d9", padding: "16px" }}
          >
            <p
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#333",
                marginBottom: "10px",
              }}
            >
              They will receive:
            </p>

            <ul
              style={{
                ...fontSwitzer,
                fontSize: "15px",
                color: "#444",
                lineHeight: "28px",
                paddingLeft: "18px",
                marginBottom: "18px",
              }}
            >
              <li>Your name on display</li>
              <li>Your account username</li>
              <li>Your verification status</li>
            </ul>

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
                onClick={() => router.push("/sso/city-bank/auth")}
                className="flex-1 rounded-[10px]"
                style={{
                  height: "44px",
                  backgroundColor: "#025fc9",
                }}
              >
                <span style={{ ...fontSwitzer, fontSize: "16px", color: "#fff", fontWeight: 500 }}>
                  Approve
                </span>
              </button>
            </div>
          </div>

          <p
            style={{
              ...fontSwitzer,
              fontSize: "13px",
              color: "#767676",
              marginTop: "12px",
            }}
          >
            Approval requires authentication via password or PIN.
          </p>
        </div>
      </div>
    </div>
  );
}