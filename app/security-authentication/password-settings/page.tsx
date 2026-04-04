"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft, Eye, EyeOff } from "lucide-react";

type PasswordStep = "current" | "new";

export default function PasswordSettingsPage() {
  const router = useRouter();
  const [step, setStep] = useState<PasswordStep>("current");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

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
            <button onClick={() => step === "new" ? setStep("current") : router.back()}>
              <ArrowLeft size={22} className="text-black" />
            </button>
            <span style={{ ...fontSwitzer, fontSize: "18px", fontWeight: 600, color: "#000", letterSpacing: "0.8px" }}>
              Password Settings
            </span>
          </div>

          {step === "current" ? (
            <>
              {/* Current Password */}
              <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  PASSWORD
                </span>
                <div className="flex items-center w-full gap-[8px]">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter password to continue"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                  <button onClick={() => setShowCurrent(!showCurrent)}>
                    {showCurrent ? <EyeOff size={20} className="text-[#5e5757]" /> : <Eye size={20} className="text-[#5e5757]" />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() => router.back()}
                  className="flex items-center justify-center rounded-[8px]"
                  style={{ height: "44px", paddingLeft: "20px", paddingRight: "20px", border: "1px solid #d9d9d9" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>Cancel</span>
                </button>
                <button
                  onClick={() => {
                    if (!currentPassword) {
                      setError("Please enter your current password!");
                      return;
                    }
                    setError("");
                    setStep("new");
                  }}
                  className="flex items-center justify-center rounded-[8px]"
                  style={{ height: "44px", paddingLeft: "32px", paddingRight: "32px", backgroundColor: "#025fc9" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>Next</span>
                </button>
              </div>

              {error && (
                <p style={{ ...fontSwitzer, fontSize: "13px", color: "#f04438", letterSpacing: "0.13px" }}>
                  {error}
                </p>
              )}
            </>
          ) : (
            <>
              {/* New Password */}
              <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  NEW PASSWORD
                </span>
                <div className="flex items-center w-full gap-[8px]">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter a password you've never used before"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                  <button onClick={() => setShowNew(!showNew)}>
                    {showNew ? <EyeOff size={20} className="text-[#5e5757]" /> : <Eye size={20} className="text-[#5e5757]" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  CONFIRM PASSWORD
                </span>
                <div className="flex items-center w-full gap-[8px]">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Re-enter password"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                  <button onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff size={20} className="text-[#5e5757]" /> : <Eye size={20} className="text-[#5e5757]" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p style={{ ...fontSwitzer, fontSize: "13px", color: "#f04438", letterSpacing: "0.13px" }}>
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() => {
                    setStep("current");
                    setError("");
                  }}
                  className="flex items-center justify-center rounded-[8px]"
                  style={{ height: "44px", paddingLeft: "20px", paddingRight: "20px", border: "1px solid #d9d9d9" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>Cancel</span>
                </button>
                <button
                  onClick={() => {
                    if (!newPassword) {
                      setError("Please enter a new password!");
                      return;
                    }
                    if (newPassword.length < 6) {
                      setError("Password must be at least 6 characters!");
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      setError("Passwords do not match!");
                      return;
                    }
                    setError("");
                    router.push("/security-authentication");
                  }}
                  className="flex items-center justify-center rounded-[8px]"
                  style={{ height: "44px", paddingLeft: "32px", paddingRight: "32px", backgroundColor: "#025fc9" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>Confirm</span>
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}