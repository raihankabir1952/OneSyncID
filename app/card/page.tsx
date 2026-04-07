"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import Sidebar from "@/components/Sidebar";
import {
  Menu,
  Search,
  Bell,
  QrCode,
  ShieldCheck,
  CreditCard,
  Home,
  Settings,
  BadgeCheck,
  CalendarDays,
  IdCard,
  FileUp,
  Phone,
  Mail,
  GraduationCap,
  MapPin,
  Users,
  FileText,
  CheckCircle,
  MoreHorizontal,
  Briefcase,
  Link2,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const shareItems = [
  { id: 1, title: "Digital Card", icon: <IdCard size={20} className="text-[#5e5757]" /> },
  { id: 2, title: "QR Code",      icon: <QrCode size={20} className="text-[#5e5757]" /> },
  { id: 3, title: "Share Link",   icon: <Link2 size={20} className="text-[#5e5757]" /> },
];

const stats = [
  { id: 1, value: "14", label: "Card Views" },
  { id: 2, value: "4",  label: "QR Scanned" },
  { id: 3, value: "10", label: "Link Used" },
];

const documents = [
  { id: 1, name: "HSC Certificate", date: "17 Nov 2025", uploader: "Sam Williams" },
  { id: 2, name: "SSC Certificate", date: "17 Nov 2025", uploader: "Sam Williams" },
  { id: 3, name: "JSC Certificate", date: "17 Nov 2025", uploader: "Sam Williams" },
];

// ── Overview content ──────────────────────────────────────────────────────────
function OverviewContent() {
  return (
    <div className="flex flex-col gap-[24px] pt-[4px]">
      <div className="flex gap-[10px] items-start">
        <Phone size={18} className="text-white shrink-0 mt-[3px]" />
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 600 }}>Phone</p>
          <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>+880 1726 776412</p>
        </div>
      </div>
      <div className="flex gap-[10px] items-start">
        <Mail size={18} className="text-white shrink-0 mt-[3px]" />
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 600 }}>Email</p>
          <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>johndoe@mail.com</p>
        </div>
      </div>
      <div className="flex gap-[10px] items-start">
        <Briefcase size={18} className="text-white shrink-0 mt-[3px]" />
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 600 }}>Work Experience</p>
          <div className="flex flex-col gap-[6px] pt-[6px]">
            <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 500 }}>MNC Limited</p>
            <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>Manager</p>
            <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>10 Oct 2025 - Present</p>
            <div className="flex gap-[6px] items-center">
              <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>Hired via</p>
              <Image src="/images/next.png" alt="Applying Next" width={90} height={16} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-start">
        <GraduationCap size={18} className="text-white shrink-0 mt-[3px]" />
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 600 }}>Education</p>
          <div className="flex flex-col gap-[16px] pt-[6px]">
            <div className="flex flex-col gap-[3px]">
              <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>HSC (2019)</p>
              <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>Result - 5.00</p>
            </div>
            <div className="flex flex-col gap-[3px]">
              <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>SSC (2017)</p>
              <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>Result - 5.00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-start">
        <Users size={18} className="text-white shrink-0 mt-[3px]" />
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 600 }}>Family & Relationships</p>
          <div className="flex flex-col gap-[16px] pt-[6px]">
            <div className="flex gap-[8px] items-center">
              <div className="w-[24px] h-[24px] rounded-full overflow-hidden shrink-0">
                <Image src="/images/profile-avatar.png" alt="" width={24} height={24} className="object-cover" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 500 }}>Newaz Ahmed</p>
                <p className="text-white text-[13px] opacity-80" style={{ ...fontSwitzer, fontWeight: 400 }}>Father</p>
              </div>
            </div>
            <div className="flex gap-[8px] items-center">
              <div className="w-[24px] h-[24px] rounded-full overflow-hidden shrink-0">
                <Image src="/images/profile-avatar.png" alt="" width={24} height={24} className="object-cover" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 500 }}>Razia Khatun</p>
                <p className="text-white text-[13px] opacity-80" style={{ ...fontSwitzer, fontWeight: 400 }}>Mother</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-start">
        <MapPin size={18} className="text-white shrink-0 mt-[3px]" />
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[15px]" style={{ ...fontSwitzer, fontWeight: 600 }}>From</p>
          <p className="text-white text-[15px] opacity-90" style={{ ...fontSwitzer, fontWeight: 400 }}>Gazipur, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
}

// ── Documents content ─────────────────────────────────────────────────────────
function DocumentsContent() {
  return (
    <div className="flex flex-col gap-[20px] pt-[4px]">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-start justify-between w-full">
          <div className="flex gap-[10px] items-start flex-1 min-w-0">
            <FileText size={16} className="text-white shrink-0 mt-[4px]" />
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[8px] items-center flex-wrap">
                <p className="text-white text-[16px] underline" style={{ ...fontSwitzer, fontWeight: 500 }}>{doc.name}</p>
                <p className="text-white text-[13px] opacity-80" style={{ ...fontSwitzer, fontWeight: 400 }}>{doc.date}</p>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-white text-[13px] opacity-80" style={{ ...fontSwitzer, fontWeight: 500 }}>Uploaded by</p>
                <div className="flex gap-[6px] items-center">
                  <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0">
                    <Image src="/images/profile-avatar.png" alt="" width={20} height={20} className="object-cover" />
                  </div>
                  <p className="text-white text-[14px]" style={{ ...fontSwitzer, fontWeight: 400 }}>{doc.uploader}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[6px] items-center shrink-0 ml-[8px]">
            <CheckCircle size={20} className="text-white opacity-90" />
            <MoreHorizontal size={18} className="text-white opacity-70" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Profile Card with flip ────────────────────────────────────────────────────
function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "documents">("overview");

  return (
    <div style={{ width: "353px", perspective: "1200px", flexShrink: 0, height: "170px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT SIDE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            border: "4px solid rgba(185,185,185,0.05)",
            backdropFilter: "blur(5px)",
            backgroundColor: "#f8f8f8",
            boxShadow: "inset 0px 2px 4px 0px rgba(185,185,185,0.1)",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <Image src="/images/onesyncid-watermark.png" alt="" width={220} height={38} className="object-contain opacity-[0.82]" />
          </div>
          <div className="relative z-10 flex flex-col gap-[10px] items-start">
            <div className="relative w-[60px] h-[60px]">
              <Image src="/images/profile-avatar.png" alt="Profile" fill className="rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-[2px] w-[20px] h-[20px] flex items-center justify-center">
                <ShieldCheck size={13} className="text-[#025fc9]" />
              </div>
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="flex gap-[5px] items-center">
                <p className="text-black text-[20px] leading-[30px] tracking-[0.2px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 700 }}>John Doe</p>
                <BadgeCheck size={20} className="text-[#025fc9]" fill="#025fc9" color="white" strokeWidth={2} />
              </div>
              <p className="text-[#025fc9] text-[12px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 500 }}>onesync_john_doe</p>
            </div>
            <div className="flex gap-[4px] items-center">
              <CalendarDays size={14} className="text-[#025fc9]" />
              <p className="text-[#025fc9] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 500 }}>Joined on: 02 Nov 2025</p>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-between self-stretch">
            <button type="button" aria-label="Flip card" onClick={() => { setIsFlipped(true); setActiveTab("overview"); }}>
              <Image src="/images/flip.png" alt="Flip" width={28} height={28} className="object-contain" />
            </button>
            <button type="button" aria-label="QR Code">
              <QrCode size={26} className="text-[#025fc9]" />
            </button>
          </div>
        </div>

        {/* ── BACK SIDE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "4px solid rgba(185,185,185,0.05)",
            backdropFilter: "blur(5px)",
            backgroundColor: "#025fc9",
            boxShadow: "inset 0px 2px 4px 0px rgba(185,185,185,0.1)",
            borderRadius: "12px",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Tab buttons */}
          <div className="flex items-center justify-between w-full shrink-0">
            <div className="flex gap-[6px] items-center">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="flex gap-[6px] items-center px-[12px] py-[5px] rounded-[10px] transition-all"
                style={{
                  border: activeTab === "overview" ? "2px solid rgba(255,255,255,0.3)" : "2px solid transparent",
                  backgroundColor: activeTab === "overview" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
                }}
              >
                <IdCard size={15} className="text-white" />
                <span className="text-white text-[13px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 500 }}>Overview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("documents")}
                className="flex gap-[6px] items-center px-[12px] py-[5px] rounded-[10px] transition-all"
                style={{
                  border: activeTab === "documents" ? "2px solid rgba(255,255,255,0.3)" : "2px solid transparent",
                  backgroundColor: activeTab === "documents" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
                }}
              >
                <FileUp size={15} className="text-white" />
                <span className="text-white text-[13px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 500 }}>Documents Uploaded</span>
              </button>
            </div>
            <button type="button" aria-label="Flip back" onClick={() => { setIsFlipped(false); setActiveTab("overview"); }} className="shrink-0">
              <Image src="/images/flip.png" alt="Flip back" width={26} height={26} className="object-contain opacity-80" />
            </button>
          </div>

          {/* Content — scrolls inside card */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              scrollbarWidth: "none",
              minHeight: 0,
            }}
          >
            {activeTab === "overview" ? <OverviewContent /> : <DocumentsContent />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Other components ──────────────────────────────────────────────────────────
function ShareCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <button type="button" className="flex flex-col items-center justify-center gap-[6px] rounded-[12px] flex-1 h-[70px] p-[10px]" style={{ backgroundColor: "rgba(185,185,185,0.2)" }}>
      {icon}
      <span className="text-[#5e5757] text-[14px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 400 }}>{title}</span>
    </button>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[6px] rounded-[12px] flex-1 h-[100px] p-[10px]" style={{ backgroundColor: "rgba(185,185,185,0.2)" }}>
      <span className="text-[#333] text-[20px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 600 }}>{value}</span>
      <span className="text-[#5e5757] text-[14px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: 400 }}>{label}</span>
    </div>
  );
}

function BottomNavItem({ label, icon, active = false, onClick }: { label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center justify-center gap-[2px] flex-1">
      <div className={active ? "text-[#025fc9]" : "text-[#5e5757]"}>{icon}</div>
      <span className="text-[12px] tracking-[0.5px] whitespace-nowrap" style={{ ...fontSwitzer, fontWeight: active ? 500 : 400, color: active ? "#025fc9" : "#5e5757" }}>
        {label}
      </span>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#cfe1f6] flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* TopNav sticky */}
        <div className="sticky top-0 z-10">
          <div className="flex flex-col items-center" style={{ backgroundColor: "#002d94" }}>
            <TopNav onMenuOpen={() => setSidebarOpen(true)} />
          </div>
        </div>

        {/* ProfileCard outside sticky so internal scroll works */}
        <div className="flex flex-col items-center pb-[20px]" style={{ backgroundColor: "#002d94" }}>
          <ProfileCard />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-[20px] pb-[20px]">
          <div className="flex flex-col gap-[20px] px-[20px] pt-[20px]">
            <span className="text-[#333] text-[16px]" style={{ ...fontSwitzer, fontWeight: 500 }}>Share</span>
            <div className="flex gap-[20px] items-center w-full">
              {shareItems.map((item) => <ShareCard key={item.id} title={item.title} icon={item.icon} />)}
            </div>
          </div>
          <div className="flex flex-col gap-[20px] px-[20px] pb-[10px]">
            <span className="text-[#333] text-[16px]" style={{ ...fontSwitzer, fontWeight: 500 }}>Card Stats</span>
            <div className="flex gap-[20px] items-center w-full">
              {stats.map((stat) => <StatCard key={stat.id} value={stat.value} label={stat.label} />)}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 w-full flex items-center justify-between bg-white px-[10px] pt-[8px] pb-[10px]" style={{ borderTop: "1px solid #d9d9d9", boxShadow: "0 -2px 10px rgba(0,0,0,0.04)" }}>
          <BottomNavItem label="Home" icon={<Home size={22} strokeWidth={1.8} />} onClick={() => router.push("/profile")} />
          <BottomNavItem label="SSO" icon={<ShieldCheck size={22} strokeWidth={1.8} />} onClick={() => router.push("/sso")} />
          <BottomNavItem label="Card" active icon={<CreditCard size={22} strokeWidth={1.8} />} onClick={() => router.push("/card")} />
          <BottomNavItem label="Settings" icon={<Settings size={22} strokeWidth={1.8} />} onClick={() => router.push("/settings")} />
        </div>
      </div>
    </div>
  );
}

function TopNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div className="flex gap-[10px] items-center px-[20px] py-[16px] w-full">
      <button type="button" onClick={onMenuOpen} className="w-[40px] h-[40px] flex items-center justify-center shrink-0" aria-label="Menu">
        <Menu size={22} className="text-white" />
      </button>
      <div className="flex flex-1 items-center gap-[10px] border border-white rounded-[20px] px-[16px] py-[8px] overflow-hidden">
        <Search size={18} className="text-white shrink-0" />
        <span className="text-white text-[15px] leading-[24px] tracking-[0.5px]" style={{ ...fontSwitzer }}>Search</span>
      </div>
      <button type="button" className="w-[40px] h-[40px] flex items-center justify-center shrink-0" aria-label="Notifications">
        <Bell size={20} className="text-white" />
      </button>
    </div>
  );
}