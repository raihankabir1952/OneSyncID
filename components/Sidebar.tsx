"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  Shield,
  Settings2,
  CircleUser,
  FileText,
  GraduationCap,
  Briefcase,
  Landmark,
  Activity,
  ChevronDown,
  Plus,
  LogOut,
  Globe,
  BadgeCheck,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MY_ACCOUNT_ITEMS: {
  icon: React.ElementType | string;
  label: string;
  href: string;
}[] = [
  { icon: Shield, label: "Quick Verify", href: "/upload-file/quick-verify" },
  { icon: Settings2, label: "Quick Setup", href: "/upload-file" },
  { icon: CircleUser, label: "Profile Overview", href: "/personal-information" },
  { icon: FileText, label: "Identification Documents", href: "/identification-documents" },
  { icon: GraduationCap, label: "Education Information", href: "/education-information" },
  { icon: Briefcase, label: "Work Experience", href: "/work-experience" },
  { icon: Landmark, label: "Banking Information", href: "/banking-information" },
  { icon: "/icons/guardian.svg", label: "Guardian Information", href: "/guardian-information" },
  { icon: "/icons/relatives.svg", label: "Relatives", href: "/relatives" },
  { icon: Activity, label: "Activity", href: "/activity" },
];

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full py-[12px]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <span
          style={fontSwitzer}
          className="text-[16px] font-semibold text-black tracking-[0.16px]"
        >
          {title}
        </span>

        <ChevronDown
          size={24}
          className="text-black transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-[8px] flex flex-col">{children}</div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  href,
  onClick,
}: {
  icon: React.ElementType | string;
  label: string;
  href: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-[13px] py-[10px] rounded-[8px] transition-colors ${
        isActive ? "bg-[rgba(2,95,201,0.08)]" : ""
      }`}
    >
      {typeof icon === "string" ? (
        <img
          src={icon}
          alt=""
          className="shrink-0 size-[24px]"
          style={{ opacity: isActive ? 1 : 0.8 }}
        />
      ) : (
        (() => {
          const Icon = icon as React.ElementType;
          return (
            <Icon
              size={24}
              className={isActive ? "text-[#025fc9]" : "text-[#333]"}
              strokeWidth={1.5}
            />
          );
        })()
      )}

      <span
        style={fontSwitzer}
        className={`text-[16px] font-medium ${
          isActive ? "text-[#025fc9]" : "text-[#333]"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isProfileActive = pathname === "/profile";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      <div
        className="fixed top-0 left-0 z-50 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden"
        style={{
          width: "300px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden px-[30px] pb-[30px]">
          {/* Profile Header */}
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/profile");
            }}
            className={`flex items-start justify-between border-b border-[#d9d9d9] w-full text-left rounded-[10px] transition-colors ${
              isProfileActive ? "bg-[rgba(2,95,201,0.08)]" : ""
            }`}
            style={{ paddingTop: "70px", paddingBottom: "20px" }}
          >
            <div className="flex gap-[10px] items-start">
              <div className="relative shrink-0 size-[20px] rounded-full bg-[#d9d9d9] flex items-center justify-center">
                <CircleUser
                  size={18}
                  className={isProfileActive ? "text-[#025fc9]" : "text-[#5e5757]"}
                />
              </div>

              <div className="flex flex-col gap-[5px]">
                <div className="flex items-center gap-[5px]">
                  <span
                    className={`text-[16px] font-semibold whitespace-nowrap ${
                      isProfileActive ? "text-[#025fc9]" : "text-black"
                    }`}
                    style={{ fontFamily: "SF Pro Text, sans-serif" }}
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
                  className={`text-[12px] ${
                    isProfileActive ? "text-[#025fc9]" : "text-[#5e5757]"
                  }`}
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  onesync_john_doe
                </span>
              </div>
            </div>

            <div className="bg-[#d9d9d9] px-[8px] py-[5px] rounded-[10px] shrink-0">
              <span
                className="text-[12px] font-medium text-black"
                style={{ fontFamily: "SF Pro Text, sans-serif" }}
              >
                Personal
              </span>
            </div>
          </button>

          {/* My Account */}
          <AccordionSection title="My Account" defaultOpen={true}>
            {MY_ACCOUNT_ITEMS.map((item) => (
              <MenuItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                onClick={onClose}
              />
            ))}
          </AccordionSection>

          {/* Connected Apps */}
          <AccordionSection title="Connected Apps" defaultOpen={false}>
            <div className="py-[10px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  Recently Used
                </p>
                <p className="text-[14px] text-[#333]" style={fontSwitzer}>
                  No apps connected yet
                </p>
              </div>
            </div>
          </AccordionSection>

          {/* Manage Profiles */}
          <AccordionSection title="Manage Profiles" defaultOpen={false}>
            <div className="py-[10px] flex flex-col gap-[8px]">
              <p
                className="text-[12px] text-[#5e5757]"
                style={{ fontFamily: "SF Pro Text, sans-serif" }}
              >
                Recently Visited
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/profile");
                }}
                className="flex items-start justify-between w-full text-left"
              >
                <div className="flex gap-[10px] items-start">
                  <div className="relative shrink-0 size-[20px] rounded-full bg-[#d9d9d9] flex items-center justify-center">
                    <CircleUser size={18} className="text-[#5e5757]" />
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center gap-[5px]">
                      <span
                        className="text-[16px] font-semibold text-black whitespace-nowrap"
                        style={{ fontFamily: "SF Pro Text, sans-serif" }}
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
                      className="text-[12px] text-[#5e5757]"
                      style={{ fontFamily: "SF Pro Text, sans-serif" }}
                    >
                      onesync_john_doe
                    </span>
                  </div>
                </div>

                <div className="bg-[#d9d9d9] px-[8px] py-[5px] rounded-[10px] shrink-0">
                  <span
                    className="text-[12px] font-medium text-black"
                    style={{ fontFamily: "SF Pro Text, sans-serif" }}
                  >
                    Personal
                  </span>
                </div>
              </button>
            </div>
          </AccordionSection>

          {/* Add Account */}
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/create-account");
            }}
            className="w-full flex items-center gap-[10px] py-[12px]"
          >
            <Plus size={24} className="text-[#333]" strokeWidth={1.5} />
            <span
              className="text-[16px] font-semibold text-[#333]"
              style={{ fontFamily: "SF Pro Text, sans-serif" }}
            >
              Add Account
            </span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/sign-in");
            }}
            className="w-full flex items-center gap-[10px] py-[12px]"
          >
            <LogOut size={24} className="text-[#333]" strokeWidth={1.5} />
            <span
              className="text-[16px] font-semibold text-[#333]"
              style={{ fontFamily: "SF Pro Text, sans-serif" }}
            >
              Logout
            </span>
          </button>

          {/* Language */}
          <div
            className="flex items-center justify-between"
            style={{ paddingTop: "40px", paddingBottom: "30px" }}
          >
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                color: "#5e5757",
                letterSpacing: "0.16px",
              }}
            >
              Select language
            </span>

            <div className="flex items-center gap-[3px]">
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#5e5757",
                  letterSpacing: "0.16px",
                }}
              >
                English
              </span>
              <Globe size={24} className="text-[#5e5757]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}