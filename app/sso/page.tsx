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
  ShieldCheck,
  CreditCard,
  Home,
  Settings,
  CalendarDays,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const sessions = [
  {
    id: 1,
    name: "City Bank",
    logo: "/images/city-bank-logo.png",
    lastUsed: "Last used 2 mins ago",
    href: "/sso/city-bank",
  },
  {
    id: 2,
    name: "BUET",
    logo: "/images/buet-logo.png",
    lastUsed: "Last used 2 days ago",
    href: "",
  },
  {
    id: 3,
    name: "Pubali Bank",
    logo: "/images/pubali-bank-logo.png",
    lastUsed: "Last used 3 days ago",
    href: "",
  },
];

function SessionRow({
  name,
  logo,
  lastUsed,
  href,
}: {
  name: string;
  logo: string;
  lastUsed: string;
  href?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => href && router.push(href)}
      className="w-full flex items-center justify-between rounded-[12px] px-[14px] py-[14px] text-left"
      style={{ border: "1px solid #d9d9d9", backgroundColor: "#fff" }}
    >
      <div className="flex items-center gap-[12px] min-w-0">
        <div className="relative w-[26px] h-[26px] shrink-0">
          <Image src={logo} alt={name} fill className="object-contain" />
        </div>

        <div className="flex flex-col min-w-0">
          <span
            style={{
              ...fontSwitzer,
              fontSize: "16px",
              fontWeight: 500,
              color: "#111",
              letterSpacing: "0.16px",
            }}
          >
            {name}
          </span>

          <span
            style={{
              ...fontSwitzer,
              fontSize: "13px",
              color: "#767676",
              letterSpacing: "0.13px",
              lineHeight: "18px",
            }}
          >
            {lastUsed}
          </span>
        </div>
      </div>

      <span
        style={{
          ...fontSwitzer,
          fontSize: "14px",
          fontWeight: 500,
          color: "#ff3b30",
          letterSpacing: "0.14px",
        }}
      >
        Revoke
      </span>
    </button>
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

export default function SSOPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#cfe1f6] flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="sticky top-0 z-10">
          <div
            style={{
              backgroundColor: "#0637a6",
              padding: "16px",
              paddingTop: "48px",
              paddingBottom: "16px",
            }}
          >
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
                    border: "1px solid white",
                    paddingLeft: "14px",
                    gap: "8px",
                  }}
                >
                  <Search size={18} className="text-white" />
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

              <button type="button" className="w-6 h-6 flex items-center justify-center">
                <Bell size={20} className="text-white" />
              </button>
            </div>

            <div
              className="rounded-[16px] relative overflow-hidden"
              style={{
                backgroundColor: "#f6f6f6",
                padding: "16px",
                minHeight: "150px",
              }}
            >
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-start gap-[12px]">
                  <div className="relative w-[56px] h-[56px] rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/images/profile-avatar.png"
                      alt="John Doe"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-[4px] pt-[4px]">
                    <div
                      style={{
                        ...fontSwitzer,
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#111",
                      }}
                    >
                      John Doe
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

        <div
          className="flex-1 overflow-y-auto"
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "14px",
            paddingBottom: "16px",
          }}
        >
          <div className="mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#222",
              }}
            >
              Active Sessions
            </span>
          </div>

          <div className="flex flex-col gap-[10px]">
            {sessions.map((session) => (
              <SessionRow
                key={session.id}
                name={session.name}
                logo={session.logo}
                lastUsed={session.lastUsed}
                href={session.href}
              />
            ))}
          </div>
        </div>

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
            active
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
            icon={<Settings size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
    </div>
  );
}