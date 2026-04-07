"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  ChevronRight,
  Lock,
  KeyRound,
  ShieldCheck,
  Users,
  Database,
  Smartphone,
  Contact,
  UserX,
  Bell,
  Home,
  CreditCard,
  Settings,
} from "lucide-react";

// ── Sections with navigation routes ──────────────────────────────────────────
const sections = [
  {
    title: "Security",
    items: [
      { id: 1, title: "Sign-in Methods",           icon: <Lock size={18} className="text-[#025fc9]" />,      route: "/sign-in-methods" },
      { id: 2, title: "Two-Factor Authentication", icon: <KeyRound size={18} className="text-[#025fc9]" />,   route: "/security-authentication" },
      { id: 3, title: "Account Recovery",          icon: <KeyRound size={18} className="text-[#025fc9]" />,   route: "/account-recovery" },
      { id: 4, title: "Merged Accounts",           icon: <KeyRound size={18} className="text-[#025fc9]" />,   route: "/merge-account" },
    ],
  },
  {
    title: "Privacy & Data",
    items: [
      { id: 1, title: "App Permissions",    icon: <ShieldCheck size={18} className="text-[#025fc9]" />, route: "" },
      { id: 2, title: "Devices & Sessions", icon: <Smartphone size={18} className="text-[#025fc9]" />,  route: "/activity" },
      { id: 3, title: "Contacts Sync",      icon: <Contact size={18} className="text-[#025fc9]" />,     route: "/phone-number-sync" },
      { id: 4, title: "Data Export",        icon: <Database size={18} className="text-[#025fc9]" />,    route: "" },
    ],
  },
  {
    title: "Access Control",
    items: [
      { id: 1, title: "Delegate Access", icon: <Users size={18} className="text-[#025fc9]" />,  route: "/delegate-access" },
      { id: 2, title: "Blocked Users",   icon: <UserX size={18} className="text-[#025fc9]" />,  route: "" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { id: 1, title: "Updates & Alerts", icon: <Bell size={18} className="text-[#025fc9]" />, route: "" },
    ],
  },
];

// ── Setting Row ───────────────────────────────────────────────────────────────
function SettingRow({ title, icon, onClick }: {
  title: string; icon: React.ReactNode; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between text-left"
      style={{ height: "62px", paddingLeft: "20px", paddingRight: "20px" }}
    >
      <div className="flex items-center gap-[8px]">
        <div
          className="flex items-center justify-center rounded-[8px] shrink-0"
          style={{ width: "30px", height: "30px", backgroundColor: "rgba(2,95,201,0.1)" }}
        >
          {icon}
        </div>
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000" }}>
          {title}
        </span>
      </div>
      <ChevronRight size={20} className="text-[#5e5757] shrink-0" />
    </button>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ items, onNavigate }: {
  items: { id: number; title: string; icon: React.ReactNode; route: string }[];
  onNavigate: (route: string) => void;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[12px]" style={{ border: "1px solid #d9d9d9" }}>
      {items.map((item, index) => (
        <div key={item.id} style={{ borderBottom: index !== items.length - 1 ? "1px solid #d9d9d9" : "none" }}>
          <SettingRow
            title={item.title}
            icon={item.icon}
            onClick={() => item.route && onNavigate(item.route)}
          />
        </div>
      ))}
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────
function BottomNavItem({ label, icon, active = false, onClick }: {
  label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center justify-center gap-[2px] flex-1">
      <div className={active ? "text-[#025fc9]" : "text-[#5e5757]"}>{icon}</div>
      <span style={{
        ...fontSwitzer, fontSize: "12px", fontWeight: active ? 500 : 400,
        color: active ? "#025fc9" : "#5e5757", letterSpacing: "0.5px",
      }}>
        {label}
      </span>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#cfe1f6] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col">

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-[20px] px-[20px] pt-[20px] pb-[20px]">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-[20px]">
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#333" }}>
                {section.title}
              </span>
              <SectionCard
                items={section.items}
                onNavigate={(route) => router.push(route)}
              />
            </div>
          ))}
        </div>

        {/* Sticky Bottom Nav */}
        <div
          className="sticky bottom-0 z-10 w-full flex items-center justify-between bg-white px-[10px] pt-[8px] pb-[10px]"
          style={{ borderTop: "1px solid #d9d9d9", boxShadow: "0 -2px 10px rgba(0,0,0,0.04)" }}
        >
          <BottomNavItem label="Home"     icon={<Home size={22} strokeWidth={1.8} />}        onClick={() => router.push("/profile")} />
          <BottomNavItem label="SSO"      icon={<ShieldCheck size={22} strokeWidth={1.8} />}  onClick={() => router.push("/sso")} />
          <BottomNavItem label="Card"     icon={<CreditCard size={22} strokeWidth={1.8} />}   onClick={() => router.push("/card")} />
          <BottomNavItem label="Settings" active icon={<Settings size={22} strokeWidth={1.8} />} onClick={() => router.push("/settings")} />
        </div>
      </div>
    </div>
  );
}