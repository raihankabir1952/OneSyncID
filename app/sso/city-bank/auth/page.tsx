"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Eye } from "lucide-react";

export default function CityBankAuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"password" | "pin">("password");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    router.push("/sso/city-bank/loading");
  };

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
            className="rounded-[12px] flex mb-[16px]"
            style={{ border: "1px solid #d9d9d9", overflow: "hidden" }}
          >
            <button
              type="button"
              onClick={() => setTab("password")}
              className="flex-1"
              style={{
                height: "38px",
                borderBottom: tab === "password" ? "3px solid #025fc9" : "3px solid transparent",
                color: tab === "password" ? "#025fc9" : "#5e5757",
                fontWeight: 500,
                ...fontSwitzer,
                fontSize: "16px",
              }}
            >
              Password
            </button>

            <button
              type="button"
              onClick={() => setTab("pin")}
              className="flex-1"
              style={{
                height: "38px",
                borderBottom: tab === "pin" ? "3px solid #025fc9" : "3px solid transparent",
                color: tab === "pin" ? "#025fc9" : "#5e5757",
                fontWeight: 500,
                ...fontSwitzer,
                fontSize: "16px",
              }}
            >
              PIN
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                ...fontSwitzer,
                fontSize: "14px",
                fontWeight: 600,
                color: "#767676",
                display: "block",
                marginBottom: "10px",
              }}
            >
              {tab === "password" ? "PASSWORD" : "PIN"}
            </label>

            <div
              className="flex items-center justify-between"
              style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}
            >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={tab === "password" ? "password" : "password"}
                placeholder={tab === "password" ? "Enter your password" : "Enter your PIN"}
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#111",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                }}
              />
              <Eye size={18} className="text-[#767676] shrink-0" />
            </div>
          </div>

          <div className="flex gap-[10px]">
            <button
              type="button"
              onClick={() => router.push("/sso/city-bank")}
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
              onClick={handleContinue}
              className="flex-1 rounded-[10px]"
              style={{
                height: "44px",
                backgroundColor: "#025fc9",
              }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#fff", fontWeight: 500 }}>
                Continue
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}