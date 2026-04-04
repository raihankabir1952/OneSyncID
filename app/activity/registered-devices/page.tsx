"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft, ChevronDown, Eye, EyeOff } from "lucide-react";

const DEVICE_TYPES = ["Laptop", "Desktop", "Mobile", "Tablet"];

interface RegisteredDevice {
  id: number;
  type: string;
  imei: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function RegisteredDevicesPage() {
  const router = useRouter();
  const [deviceType, setDeviceType] = useState("Laptop");
  const [imei, setImei] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [devices] = useState<RegisteredDevice[]>([
    { id: 1, type: "iPhone 12", imei: "12349987657898", lastActive: "Active Now", isCurrent: true },
    { id: 2, type: "iPhone 12", imei: "12349987657898", lastActive: "1 day ago", isCurrent: false },
  ]);

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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px", gap: "20px" }}
        >
          {/* Back + Title */}
          <div className="flex items-center gap-[12px]">
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} className="text-black" />
            </button>
            <span style={{ ...fontSwitzer, fontSize: "18px", fontWeight: 600, color: "#000", letterSpacing: "0.8px" }}>
              Registered Devices
            </span>
          </div>

          {/* Device Type */}
          <div className="flex flex-col gap-[8px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px" }}>
              Device Type <span style={{ color: "#f04438" }}>*</span>
            </span>
            <div className="relative" style={{ width: "120px" }}>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="appearance-none bg-white pl-3 pr-8 py-2 rounded-[8px]"
                style={{ ...fontSwitzer, fontSize: "14px", color: "#000", border: "1px solid #d9d9d9", outline: "none", width: "100%" }}
              >
                {DEVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none" />
            </div>
          </div>

          {/* IMEI / Serial */}
          <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
            <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
              IMEI /SERIAL
            </span>
            <div className="flex items-center w-full gap-[8px]">
              <input
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                placeholder="Enter IMEI or serial number"
                style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
              />
              <Eye size={20} className="text-[#5e5757]" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
            <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
              PASSWORD
            </span>
            <div className="flex items-center w-full gap-[8px]">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to continue"
                style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} className="text-[#5e5757]" /> : <Eye size={20} className="text-[#5e5757]" />}
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
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", paddingLeft: "24px", paddingRight: "24px", backgroundColor: "#025fc9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>Register Device</span>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0" }} />

          {/* Device list */}
          <div className="flex flex-col gap-[16px] w-full">
            {devices.map((device) => (
              <div key={device.id} className="flex flex-col gap-[4px] w-full" style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}>
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                    Device Type: 📱 {device.type}
                  </span>
                  {device.isCurrent && (
                    <div
                      className="flex items-center justify-center rounded-[6px]"
                      style={{ backgroundColor: "#e8f0fb", paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px" }}
                    >
                      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.12px" }}>
                        Current Device
                      </span>
                    </div>
                  )}
                  {!device.isCurrent && (
                    <button>
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#f04438", letterSpacing: "0.14px" }}>
                        Remove
                      </span>
                    </button>
                  )}
                </div>
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", fontWeight: 500, letterSpacing: "0.14px" }}>
                  IMEI / Serial: {device.imei}
                </span>
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                  Last Active:{" "}
                  <span style={{ color: device.lastActive === "Active Now" ? "#2e7d32" : "#000", fontWeight: 500 }}>
                    {device.lastActive}
                  </span>
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}