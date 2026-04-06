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
  BadgeCheck,
  CalendarDays,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const organizations = [
  {
    id: 1,
    name: "City Bank",
    logo: "/images/city-bank-logo.png",
  },
  {
    id: 2,
    name: "BUET",
    logo: "/images/buet-logo.png",
  },
  {
    id: 3,
    name: "Pubali Bank",
    logo: "/images/pubali-bank-logo.png",
  },
];

const activities = [
  {
    id: 1,
    title: "Brac Bank accessed your account",
    time: "2 hours ago",
    icon: <ShieldCheck size={18} className="text-[#025fc9]" />,
  },
  {
    id: 2,
    title: "Logged into BUET portal",
    time: "2 hours ago",
    icon: <BriefcaseBusiness size={18} className="text-[#025fc9]" />,
  },
  {
    id: 3,
    title: "Card shared with Rafiq Ahmed",
    time: "2 hours ago",
    icon: <CreditCard size={18} className="text-[#025fc9]" />,
  },
];

function OrganizationRow({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-[12px] px-[14px] py-[14px]"
      style={{ border: "1px solid #d9d9d9", backgroundColor: "#fff" }}
    >
      <div className="flex items-center gap-[12px] min-w-0">
        <div className="relative w-[22px] h-[22px] shrink-0">
          <Image src={logo} alt={name} fill className="object-contain" />
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
          {name}
        </span>
      </div>

      <span
        style={{
          ...fontSwitzer,
          fontSize: "14px",
          color: "#24a148",
          letterSpacing: "0.14px",
        }}
      >
        Active
      </span>
    </div>
  );
}

function ActivityRow({
  title,
  time,
  icon,
}: {
  title: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[10px]">
      <div
        className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#eaf2ff" }}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-[2px]">
        <span
          style={{
            ...fontSwitzer,
            fontSize: "15px",
            fontWeight: 500,
            color: "#111",
            letterSpacing: "0.15px",
            lineHeight: "20px",
          }}
        >
          {title}
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
          {time}
        </span>
      </div>
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

export default function ProfileDashboardPage() {
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
                      letterSpacing: "0.15px",
                    }}
                  >
                    Search
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Notifications"
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
              {/* Watermark */}
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
                          letterSpacing: "0.18px",
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
                        letterSpacing: "0.14px",
                      }}
                    >
                      onesync_john_doe
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center"
                  aria-label="Work"
                >
                  <BriefcaseBusiness size={22} className="text-[#025fc9]" />
                </button>
              </div>

              <div className="relative z-10 flex items-end justify-between mt-[24px]">
                <div className="flex items-center gap-[6px]">
                  <CalendarDays size={14} className="text-[#025fc9]" />
                  <span
                    style={{
                      ...fontSwitzer,
                      fontSize: "14px",
                      color: "#025fc9",
                      letterSpacing: "0.14px",
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

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "16px",
            paddingBottom: "80px",
          }}
        >
          <div className="flex justify-between mb-[12px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#222",
                letterSpacing: "0.16px",
              }}
            >
              Connected Organizations
            </span>

            <button type="button">
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "14px",
                  color: "#025fc9",
                  letterSpacing: "0.14px",
                }}
              >
                See All
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-[10px] mb-[20px]">
            {organizations.map((org) => (
              <OrganizationRow key={org.id} name={org.name} logo={org.logo} />
            ))}
          </div>

          <div className="mb-[10px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#222",
                letterSpacing: "0.16px",
              }}
            >
              Recent Activity
            </span>
          </div>

          <div className="flex flex-col gap-[16px]">
            {activities.map((activity) => (
              <ActivityRow
                key={activity.id}
                title={activity.title}
                time={activity.time}
                icon={activity.icon}
              />
            ))}
          </div>
        </div>

        {/* Sticky bottom nav */}
        <div
          className="sticky bottom-0 z-10 w-full flex items-center justify-between bg-white"
          style={{
            borderTop: "1px solid #d9d9d9",
            paddingTop: "8px",
            paddingBottom: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
          }}
        >
          <BottomNavItem
            label="Home"
            active
            icon={<Home size={22} strokeWidth={2} />}
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
            icon={<Settings size={22} strokeWidth={1.8} />}
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
    </div>
  );
}