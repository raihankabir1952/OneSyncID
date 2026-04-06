"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import {
  Menu,
  Search,
  Bell,
  BriefcaseBusiness,
  QrCode,
  Home,
  ShieldCheck,
  CreditCard,
  Settings,
  BadgeCheck,
  CalendarDays,
  IdCard,
  Link2,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const shareItems = [
  {
    id: 1,
    title: "Digital Card",
    icon: <IdCard size={18} className="text-[#5e5757]" />,
  },
  {
    id: 2,
    title: "QR Code",
    icon: <QrCode size={18} className="text-[#5e5757]" />,
  },
  {
    id: 3,
    title: "Share Link",
    icon: <Link2 size={18} className="text-[#5e5757]" />,
  },
];

const stats = [
  {
    id: 1,
    value: "14",
    label: "Card Views",
  },
  {
    id: 2,
    value: "4",
    label: "QR Scanned",
  },
  {
    id: 3,
    value: "10",
    label: "Link Used",
  },
];

function ShareCard({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center rounded-[12px]"
      style={{
        width: "100%",
        height: "82px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div className="mb-[8px]">{icon}</div>
      <span
        style={{
          ...fontSwitzer,
          fontSize: "13px",
          color: "#5e5757",
          letterSpacing: "0.13px",
        }}
      >
        {title}
      </span>
    </button>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[12px]"
      style={{
        width: "100%",
        height: "72px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <span
        style={{
          ...fontSwitzer,
          fontSize: "28px",
          fontWeight: 500,
          color: "#333",
          lineHeight: "28px",
          marginBottom: "8px",
        }}
      >
        {value}
      </span>

      <span
        style={{
          ...fontSwitzer,
          fontSize: "13px",
          color: "#5e5757",
          letterSpacing: "0.13px",
        }}
      >
        {label}
      </span>
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

export default function CardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#cfe1f6] flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Sticky top section */}
        <div className="sticky top-0 z-10">
          <div
            style={{
              backgroundColor: "#0637a6",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "48px",
              paddingBottom: "16px",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-[18px]">
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center"
                onClick={() => setSidebarOpen(true)}
                aria-label="Menu"
              >
                <Menu size={22} className="text-white" />
              </button>

              <div className="flex-1 flex justify-center px-[10px]">
                <div
                  className="flex items-center rounded-[28px] w-full max-w-[200px]"
                  style={{
                    height: "36px",
                    border: "1px solid rgba(255,255,255,0.95)",
                    paddingLeft: "14px",
                    gap: "8px",
                  }}
                >
                  <Search size={18} className="text-white shrink-0" />
                  <span
                    style={{
                      ...fontSwitzer,
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    Search
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center"
              >
                <Bell size={20} className="text-white" />
              </button>
            </div>

            {/* Profile card */}
            <div
              className="rounded-[16px] relative overflow-hidden"
              style={{
                backgroundColor: "#f7f7f7",
                padding: "16px",
                minHeight: "150px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
                <Image
                  src="/images/onesyncid-watermark.png"
                  alt="Watermark"
                  width={230}
                  height={230}
                  className="object-contain"
                />
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-start gap-[12px]">
                  <div className="relative w-[56px] h-[56px] rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/images/profile-avatar.png"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-[4px] pt-[4px]">
                    <div className="flex items-center gap-[6px]">
                      <span
                        style={{
                          ...fontSwitzer,
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#111",
                        }}
                      >
                        John Doe
                      </span>
                      <BadgeCheck
                        size={16}
                        className="text-[#025fc9]"
                        fill="#025fc9"
                        strokeWidth={2}
                        color="white"
                      />
                    </div>

                    <span
                      style={{
                        ...fontSwitzer,
                        fontSize: "14px",
                        color: "#025fc9",
                      }}
                    >
                      onesync_john_doe
                    </span>
                  </div>
                </div>

                <BriefcaseBusiness size={22} className="text-[#025fc9]" />
              </div>

              <div className="relative z-10 flex items-end justify-between mt-[24px]">
                <div className="flex items-center gap-[6px]">
                  <CalendarDays size={14} className="text-[#025fc9]" />
                  <span
                    style={{
                      ...fontSwitzer,
                      fontSize: "14px",
                      color: "#025fc9",
                    }}
                  >
                    Joined on: 02 Nov 2025
                  </span>
                </div>

                <QrCode size={22} className="text-[#025fc9]" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          {/* Share */}
          <div className="mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#222",
              }}
            >
              Share
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[12px] mb-[22px]">
            {shareItems.map((item) => (
              <ShareCard key={item.id} title={item.title} icon={item.icon} />
            ))}
          </div>

          {/* Card Stats */}
          <div className="mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#222",
              }}
            >
              Card Stats
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[12px]">
            {stats.map((stat) => (
              <StatCard key={stat.id} value={stat.value} label={stat.label} />
            ))}
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
            active
            icon={<CreditCard size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/card")}
          />
          <BottomNavItem
            label="Settings"
            icon={<Settings size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
    </div>
  );
}