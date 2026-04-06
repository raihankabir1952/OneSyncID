"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  Shield,
  Settings,
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Landmark,
  Users,
  Activity,
  ChevronDown,
  Plus,
  LogOut,
  Globe,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Menu Items ───────────────────────────────────────────────────────────────
const MY_ACCOUNT_ITEMS = [
  { icon: Shield,        label: "Quick Verify",             href: "/quick-verify"             },
  { icon: Settings,      label: "Quick Setup",              href: "/upload-file"              },
  { icon: User,          label: "Profile Overview",         href: "/personal-information"     },
  { icon: FileText,      label: "Identification Documents", href: "/identification-documents" },
  { icon: GraduationCap, label: "Education Information",    href: "/education-information"    },
  { icon: Briefcase,     label: "Work Experience",          href: "/work-experience"          },
  { icon: Landmark,      label: "Banking Information",      href: "/banking-information"      },
  { icon: Users,         label: "Guardian Information",     href: "/guardian-information"     },
  { icon: Users,         label: "Relatives",                href: "/relatives"                },
  { icon: Activity,      label: "Activity",                 href: "/activity"                 },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
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
    <div className="w-full border-b border-[#d9d9d9] py-[12px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <span style={fontSwitzer} className="text-[16px] font-semibold text-black tracking-[0.16px]">
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
        style={{ maxHeight: isOpen ? "1000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="pt-[10px] flex flex-col gap-[2px]">{children}</div>
      </div>
    </div>
  );
}

// ─── Menu Item ────────────────────────────────────────────────────────────────
function MenuItem({
  icon: Icon,
  label,
  href,
  onClick,
}: {
  icon: React.ElementType;
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
      className={`flex items-center gap-[13px] px-[8px] py-[10px] rounded-[8px] transition-colors ${
        isActive ? "bg-[rgba(2,95,201,0.08)]" : "hover:bg-gray-50"
      }`}
    >
      <Icon size={24} className={isActive ? "text-[#025fc9]" : "text-[#333]"} />
      <span
        style={fontSwitzer}
        className={`text-[16px] font-medium ${isActive ? "text-[#025fc9]" : "text-[#333]"}`}
      >
        {label}
      </span>
    </Link>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
// fixed position — main screen এর উপরে overlay হয়ে আসে, Uber style
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── Dim Overlay (sidebar এর পেছনে) ── */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      {/* ── Sidebar Panel (fixed, slide in from left) ── */}
      <div
        className="fixed top-0 left-0 z-50 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        style={{
          width: "300px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Scrollable content */}
        <div className="h-full overflow-y-auto px-[24px] pt-[60px] pb-[30px]">

          {/* ── Profile Header ── */}
          <div className="flex items-start justify-between pb-[20px] border-b border-[#d9d9d9]">
            <div className="flex gap-[10px] items-start">
              <div className="w-[40px] h-[40px] rounded-full bg-[#d9d9d9] flex items-center justify-center shrink-0">
                <User size={20} className="text-[#5e5757]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex items-center gap-[5px]">
                  <span style={fontSwitzer} className="text-[16px] font-semibold text-black whitespace-nowrap">
                    John Doe
                  </span>
                  <span className="text-[#025fc9] text-[14px]">✔</span>
                </div>
                <span style={fontSwitzer} className="text-[12px] text-[#5e5757] whitespace-nowrap">
                  onesync_john_doe
                </span>
              </div>
            </div>
            <div className="bg-[#d9d9d9] px-[8px] py-[5px] rounded-[10px] ml-[8px] shrink-0">
              <span style={fontSwitzer} className="text-[12px] font-medium text-black">Personal</span>
            </div>
          </div>

          {/* ── My Account ── */}
          <AccordionSection title="My Account" defaultOpen={true}>
            {MY_ACCOUNT_ITEMS.map((item) => (
              <MenuItem key={item.href} icon={item.icon} label={item.label} href={item.href} onClick={onClose} />
            ))}
          </AccordionSection>

          {/* ── Connected Apps ── */}
          <AccordionSection title="Connected Apps" defaultOpen={false}>
            <div className="py-[8px]">
              <p style={fontSwitzer} className="text-[12px] text-[#5e5757] mb-[6px]">Recently Used</p>
              <p style={fontSwitzer} className="text-[14px] text-[#333]">No apps connected yet</p>
            </div>
          </AccordionSection>

          {/* ── Manage Profiles ── */}
          <AccordionSection title="Manage Profiles" defaultOpen={false}>
            <div className="py-[8px]">
              <p style={fontSwitzer} className="text-[12px] text-[#5e5757] mb-[8px]">Recently Visited</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-[8px] items-center">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#d9d9d9]" />
                  <div>
                    <div className="flex items-center gap-[4px]">
                      <span style={fontSwitzer} className="text-[14px] font-semibold text-black">John Doe</span>
                      <span className="text-[#025fc9] text-[12px]">✔</span>
                    </div>
                    <p style={fontSwitzer} className="text-[11px] text-[#5e5757]">onesync_john_doe</p>
                  </div>
                </div>
                <div className="bg-[#d9d9d9] px-[8px] py-[4px] rounded-[10px]">
                  <span style={fontSwitzer} className="text-[11px] font-medium text-black">Personal</span>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* ── Add Account ── */}
          <button
            onClick={() => { onClose(); router.push("/create-account"); }}
            className="w-full flex items-center gap-[10px] py-[12px] px-[8px] hover:bg-gray-50 rounded-[8px] transition-colors"
          >
            <Plus size={24} className="text-[#333]" />
            <span style={fontSwitzer} className="text-[16px] font-semibold text-[#333]">Add Account</span>
          </button>

          {/* ── Logout ── */}
          <button
            onClick={() => { onClose(); router.push("/sign-in"); }}
            className="w-full flex items-center gap-[10px] py-[12px] px-[8px] hover:bg-gray-50 rounded-[8px] transition-colors"
          >
            <LogOut size={24} className="text-[#333]" />
            <span style={fontSwitzer} className="text-[16px] font-semibold text-[#333]">Logout</span>
          </button>

          {/* ── Language ── */}
          <div className="flex items-center justify-between pt-[30px] pb-[10px]">
            <span style={fontSwitzer} className="text-[14px] font-medium text-[#5e5757]">Select language</span>
            <div className="flex items-center gap-[4px]">
              <span style={fontSwitzer} className="text-[14px] font-medium text-[#5e5757]">English</span>
              <Globe size={18} className="text-[#5e5757]" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}