"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, ChevronDown, Eye, EyeOff, Smartphone } from "lucide-react";

const DEVICE_TYPES = ["Laptop", "Desktop", "Mobile", "Tablet"];

interface RegisteredDevice {
  id: number;
  type: string;
  imei: string;
  lastActive: string;
  isCurrent: boolean;
}

const labelStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", fontWeight: 500,
  color: "#5e5757", letterSpacing: "0.16px", lineHeight: "21px",
};
const fieldBorder: React.CSSProperties = {
  borderBottom: "1px solid #d9d9d9", paddingTop: "10px", paddingBottom: "10px",
};

export default function RegisteredDevicesPage() {
  const router = useRouter();
  const [deviceType, setDeviceType] = useState("Laptop");
  const [imei, setImei] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showImei, setShowImei] = useState(false);

  const [devices, setDevices] = useState<RegisteredDevice[]>([
    { id: 1, type: "iPhone 12", imei: "12349987657898", lastActive: "Active Now", isCurrent: true },
    { id: 2, type: "iPhone 12", imei: "12349987657898", lastActive: "1 day ago",  isCurrent: false },
  ]);

  const removeDevice = (id: number) =>
    setDevices((prev) => prev.filter((d) => d.id !== id));

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Registered Devices
          </span>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[20px] w-full">

          {/* Device Type */}
          <div className="flex flex-col gap-[12px] w-full">
            <p style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px" }}>
              Device Type <span style={{ color: "#fa1212" }}>*</span>
            </p>
            <div
              className="flex items-center gap-[10px] relative"
              style={{ border: "1px solid #d9d9d9", borderRadius: "12px", height: "44px", paddingLeft: "16px", paddingRight: "16px", width: "fit-content" }}
            >
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="appearance-none bg-transparent"
                style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px", border: "none", outline: "none", paddingRight: "24px" }}
              >
                {DEVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={20} className="text-[#333] shrink-0 pointer-events-none absolute right-[12px]" />
            </div>
          </div>

          {/* IMEI / Serial */}
          <div className="flex flex-col gap-[10px] w-full">
            <span style={labelStyle}>IMEI /SERIAL</span>
            <div className="flex items-center justify-between" style={fieldBorder}>
              <input
                type={showImei ? "text" : "password"}
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                placeholder="Enter IMEI or serial number"
                style={{
                  ...fontSwitzer, fontSize: "16px",
                  color: imei ? "#000" : "#a09898",
                  border: "none", outline: "none", background: "transparent",
                  flex: 1, letterSpacing: "0.16px",
                }}
              />
              <button type="button" onClick={() => setShowImei(!showImei)} className="shrink-0 ml-[8px]">
                {showImei ? <EyeOff size={20} className="text-[#5e5757]" /> : <Eye size={20} className="text-[#5e5757]" />}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[10px] w-full">
            <span style={labelStyle}>PASSWORD</span>
            <div className="flex items-center justify-between" style={fieldBorder}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to continue"
                style={{
                  ...fontSwitzer, fontSize: "16px",
                  color: password ? "#000" : "#a09898",
                  border: "none", outline: "none", background: "transparent",
                  flex: 1, letterSpacing: "0.16px",
                }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="shrink-0 ml-[8px]">
                {showPassword ? <EyeOff size={20} className="text-[#5e5757]" /> : <Eye size={20} className="text-[#5e5757]" />}
              </button>
            </div>
          </div>

          {/* Cancel + Register Device */}
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", width: "90px", border: "1px solid #5e5757" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
                Cancel
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#025fc9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
                Register Device
              </span>
            </button>
          </div>
        </div>

        {/* Device list */}
        <div className="flex flex-col w-full gap-[10px]">
          {devices.map((device, idx) => (
            <div
              key={device.id}
              className="flex items-start justify-between w-full"
              style={{
                borderBottom: idx < devices.length - 1 ? "1px solid #d9d9d9" : "none",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {/* Left: details */}
              <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                {/* Device Type */}
                <div className="flex gap-[4px] items-center">
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px", whiteSpace: "nowrap" }}>
                    Device Type:
                  </span>
                  <div className="flex gap-[5px] items-center">
                    <Smartphone size={13} className="text-[#333] shrink-0" />
                    <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "1.3" }}>
                      {device.type}
                    </span>
                  </div>
                </div>
                {/* IMEI */}
                <p style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                  IMEI / Serial:{" "}
                  <span style={{ fontWeight: 500, color: "#000" }}>{device.imei}</span>
                </p>
                {/* Last Active */}
                <p style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                  Last Active:{" "}
                  <span style={{
                    fontWeight: 500,
                    color: device.lastActive === "Active Now" ? "#0c8f3f" : "#000",
                  }}>
                    {device.lastActive}
                  </span>
                </p>
              </div>

              {/* Right: badge or remove */}
              <div className="shrink-0 ml-[12px]">
                {device.isCurrent ? (
                  <div
                    className="flex items-center justify-center rounded-[12px]"
                    style={{ backgroundColor: "rgba(2,95,201,0.1)", paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px" }}
                  >
                    <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#025fc9", lineHeight: "1.3", whiteSpace: "nowrap" }}>
                      Current Device
                    </span>
                  </div>
                ) : (
                  <button type="button" onClick={() => removeDevice(device.id)}>
                    <span style={{ ...fontSwitzer, fontSize: "14px", color: "#fa1212", lineHeight: "1.3", whiteSpace: "nowrap" }}>
                      Remove
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}