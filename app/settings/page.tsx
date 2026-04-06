"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  ChevronRight,
  Shield,
  BadgeCheck,
  Database,
  Lock,
  KeyRound,
  Bell,
  Home,
  ShieldCheck,
  CreditCard,
  Settings,
} from "lucide-react";

const privacyItems = [
  {
    id: 1,
    title: "Transparency Log",
    icon: <BadgeCheck size={18} className="text-[#025fc9]" />,
  },
  {
    id: 2,
    title: "Consent Manager",
    icon: <Shield size={18} className="text-[#025fc9]" />,
  },
  {
    id: 3,
    title: "Data Export",
    icon: <Database size={18} className="text-[#025fc9]" />,
  },
];

const securityItems = [
  {
    id: 1,
    title: "Password & Biometric",
    icon: <Lock size={18} className="text-[#025fc9]" />,
  },
  {
    id: 2,
    title: "Two-Factor Authentication",
    icon: <KeyRound size={18} className="text-[#025fc9]" />,
  },
];

const appItems = [
  {
    id: 1,
    title: "Notifications",
    icon: <Bell size={18} className="text-[#025fc9]" />,
  },
];

function SettingRow({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between px-[14px] py-[14px] text-left"
      style={{ borderBottom: "1px solid #d9d9d9" }}
    >
      <div className="flex items-center gap-[12px]">
        <div
          className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center"
          style={{ backgroundColor: "#eaf2ff" }}
        >
          {icon}
        </div>

        <span
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            fontWeight: 500,
            color: "#111",
            letterSpacing: "0.16px",
          }}
        >
          {title}
        </span>
      </div>

      <ChevronRight size={18} className="text-[#5e5757]" />
    </button>
  );
}

function SectionCard({
  items,
}: {
  items: { id: number; title: string; icon: React.ReactNode }[];
}) {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ border: "1px solid #d9d9d9", backgroundColor: "#fff" }}
    >
      {items.map((item, index) => (
        <div key={item.id} style={{ borderBottom: index !== items.length - 1 ? "1px solid #d9d9d9" : "none" }}>
          <SettingRow title={item.title} icon={item.icon} />
        </div>
      ))}
    </div>
  );
}

function BottomNavItem({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-[4px] flex-1"
    >
      <div className={active ? "text-[#025fc9]" : "text-[#5e5757]"}>{icon}</div>
      <span
        style={{
          ...fontSwitzer,
          fontSize: "12px",
          fontWeight: active ? 500 : 400,
          color: active ? "#025fc9" : "#5e5757",
          letterSpacing: "0.12px",
          lineHeight: "16px",
        }}
      >
        {label}
      </span>
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#cfe1f6] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col">
        <div
          className="flex-1 overflow-y-auto"
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "56px",
            paddingBottom: "16px",
          }}
        >
          {/* Privacy & Data */}
          <div className="mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "18px",
                fontWeight: 500,
                color: "#222",
              }}
            >
              Privacy & Data
            </span>
          </div>

          <div className="mb-[18px]">
            <SectionCard items={privacyItems} />
          </div>

          {/* Security */}
          <div className="mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "18px",
                fontWeight: 500,
                color: "#222",
              }}
            >
              Security
            </span>
          </div>

          <div className="mb-[18px]">
            <SectionCard items={securityItems} />
          </div>

          {/* App */}
          <div className="mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "18px",
                fontWeight: 500,
                color: "#222",
              }}
            >
              App
            </span>
          </div>

          <div>
            <SectionCard items={appItems} />
          </div>
        </div>

        {/* Bottom nav */}
        <div
          className="w-full flex items-center justify-between bg-white"
          style={{
            borderTop: "1px solid #d9d9d9",
            paddingTop: "8px",
            paddingBottom: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <BottomNavItem
            label="Home"
            icon={<Home size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/profile")}
          />
          <BottomNavItem
            label="SSO"
            icon={<ShieldCheck size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/sso")}
          />
          <BottomNavItem
            label="Card"
            icon={<CreditCard size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/card")}
          />
          <BottomNavItem
            label="Settings"
            active
            icon={<Settings size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
    </div>
  );
}