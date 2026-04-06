"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Pencil, ChevronDown, Plus, X, Check } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface PhoneEntry {
  id: number;
  number: string;
  otpOnly: boolean;
}

interface EmailEntry {
  id: number;
  email: string;
  otpOnly: boolean;
}

interface LinkEntry {
  id: number;
  link: string;
}

// ─── Verified Badge ───────────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <div
      className="flex items-center justify-center self-start rounded-[8px]"
      style={{ backgroundColor: "#e5ffe9", border: "1px solid #b7ebc3", paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", paddingBottom: "3px" }}
    >
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#006a4e", letterSpacing: "0.12px" }}>
        Verified
      </span>
    </div>
  );
}

// ─── OTP Checkbox ─────────────────────────────────────────────────────────────
function OtpCheckbox({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
        {label}
      </span>
      <button
        onClick={onToggle}
        className="flex items-center justify-center rounded-[4px] shrink-0"
        style={{
          width: "18px", height: "18px",
          backgroundColor: checked ? "#025fc9" : "#fff",
          border: checked ? "none" : "2px solid #d9d9d9",
        }}
      >
        {checked && <Check size={12} color="white" strokeWidth={3} />}
      </button>
    </div>
  );
}

export default function ContactInformationPage() {
  const router = useRouter();

  // ── Sidebar state ──
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [phones, setPhones] = useState<PhoneEntry[]>([
    { id: 1, number: "", otpOnly: true },
  ]);

  const [emails, setEmails] = useState<EmailEntry[]>([
    { id: 1, email: "", otpOnly: true },
  ]);

  const [links, setLinks] = useState<LinkEntry[]>([
    { id: 1, link: "" },
  ]);

  const updatePhone = (id: number, key: keyof PhoneEntry, val: string | boolean) =>
    setPhones((prev) => prev.map((p) => p.id === id ? { ...p, [key]: val } : p));

  const updateEmail = (id: number, key: keyof EmailEntry, val: string | boolean) =>
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, [key]: val } : e));

  const updateLink = (id: number, val: string) =>
    setLinks((prev) => prev.map((l) => l.id === id ? { ...l, link: val } : l));

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* ── Sidebar ── */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* ── Sticky Header (Nav + Search) ── */}
        <div className="sticky top-0 z-10 bg-white">

          {/* Nav */}
          <div
            className="flex items-center justify-between"
            style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
          >
            <div className="flex items-center" style={{ gap: "20px" }}>
              <button
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Menu"
                onClick={() => setSidebarOpen(true)}
              >
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
          <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px", paddingBottom: "10px" }}>
            <div
              className="flex items-center w-full"
              style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
            >
              <Search size={20} className="text-[#5e5757] shrink-0" />
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
            </div>
          </div>

        </div>
        {/* ── End Sticky Header ── */}

        {/* ── Scrollable Body ── */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px", gap: "32px" }}
        >
          {/* Heading */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[5px]">
              <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
                Contact Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>
            <Pencil size={20} className="text-[#5e5757]" />
          </div>

          {/* ── Phone Numbers ── */}
          <div className="flex flex-col gap-[20px] w-full">
            {phones.map((phone) => (
              <div key={phone.id} className="flex flex-col gap-[12px] w-full">
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
                  PHONE NUMBER
                </span>

                {/* Input row with BD flag */}
                <div
                  className="flex items-center w-full justify-between"
                  style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}
                >
                  <div className="flex items-center gap-[3px] shrink-0">
                    <div className="flex items-center gap-[8px]">
                      {/* Bangladesh flag */}
                      <div
                        className="relative shrink-0 overflow-hidden"
                        style={{ width: "30px", height: "20px", border: "0.5px solid #eee" }}
                      >
                        <Image src="/images/bd-flag.png" alt="BD" fill style={{ objectFit: "cover" }} />
                      </div>
                      <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757" }}>+880</span>
                    </div>
                    <ChevronDown size={16} className="text-[#5e5757]" />
                  </div>
                  <input
                    value={phone.number}
                    onChange={(e) => updatePhone(phone.id, "number", e.target.value)}
                    placeholder="Enter your number"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1, marginLeft: "8px" }}
                  />
                  {phones.length > 1 && (
                    <button onClick={() => setPhones((prev) => prev.filter((p) => p.id !== phone.id))}>
                      <X size={16} className="text-[#5e5757]" />
                    </button>
                  )}
                </div>

                <VerifiedBadge />

                <OtpCheckbox
                  checked={phone.otpOnly}
                  onToggle={() => updatePhone(phone.id, "otpOnly", !phone.otpOnly)}
                  label="Tick to use this number only for OTP purposes"
                />
              </div>
            ))}

            <button
              onClick={() => setPhones((prev) => [...prev, { id: Date.now(), number: "", otpOnly: false }])}
              className="flex items-center gap-[8px]"
            >
              <Plus size={20} className="text-[#025fc9]" />
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                Add another number
              </span>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0" }} />

          {/* ── Email Addresses ── */}
          <div className="flex flex-col gap-[20px] w-full">
            {emails.map((email) => (
              <div key={email.id} className="flex flex-col gap-[12px] w-full">
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
                  EMAIL ADDRESS
                </span>

                <div
                  className="flex items-center w-full gap-[10px]"
                  style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}
                >
                  <input
                    value={email.email}
                    onChange={(e) => updateEmail(email.id, "email", e.target.value)}
                    placeholder="Enter your email address"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                  {emails.length > 1 && (
                    <button onClick={() => setEmails((prev) => prev.filter((e) => e.id !== email.id))}>
                      <X size={16} className="text-[#5e5757]" />
                    </button>
                  )}
                </div>

                <VerifiedBadge />

                <OtpCheckbox
                  checked={email.otpOnly}
                  onToggle={() => updateEmail(email.id, "otpOnly", !email.otpOnly)}
                  label="Tick to use this email only for OTP purposes"
                />
              </div>
            ))}

            <button
              onClick={() => setEmails((prev) => [...prev, { id: Date.now(), email: "", otpOnly: false }])}
              className="flex items-center gap-[8px]"
            >
              <Plus size={20} className="text-[#025fc9]" />
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                Add another email
              </span>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0" }} />

          {/* ── Social Media / Website Links ── */}
          <div className="flex flex-col gap-[20px] w-full">
            {links.map((link) => (
              <div key={link.id} className="flex flex-col gap-[10px] w-full">
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
                  SOCIAL MEDIA / WEBSITE LINK
                </span>
                <div
                  className="flex items-center w-full gap-[10px]"
                  style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}
                >
                  <input
                    value={link.link}
                    onChange={(e) => updateLink(link.id, e.target.value)}
                    placeholder="Enter social media or website link"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                  {links.length > 1 && (
                    <button onClick={() => setLinks((prev) => prev.filter((l) => l.id !== link.id))}>
                      <X size={16} className="text-[#5e5757]" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={() => setLinks((prev) => [...prev, { id: Date.now(), link: "" }])}
              className="flex items-center gap-[8px]"
            >
              <Plus size={20} className="text-[#025fc9]" />
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                Add another link
              </span>
            </button>
          </div>

          {/* Save */}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "8px" }}
          >
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
              Save
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}