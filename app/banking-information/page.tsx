"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown, ChevronUp, Plus, Users } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const MOBILE_WALLET_TYPES = ["bKash", "Nagad", "Other"] as const;
type WalletType = typeof MOBILE_WALLET_TYPES[number];

interface BankAccount {
  id: number;
  nameOnAccount: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  branch: string;
  routingNumber: string;
  swiftCode: string;
}

interface MobileBanking {
  id: number;
  phone: string;
  walletType: WalletType;
}

interface DebitCreditCard {
  id: number;
  cardType: string;
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, isOpen, onToggle }: { title: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-[16px]"
      style={{ borderBottom: isOpen ? "none" : "1px solid #f0f0f0" }}
    >
      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#333", letterSpacing: "0.16px" }}>
        {title}
      </span>
      {isOpen
        ? <ChevronUp size={20} className="text-[#5e5757]" />
        : <ChevronDown size={20} className="text-[#5e5757]" />
      }
    </button>
  );
}

// ─── Text Field ───────────────────────────────────────────────────────────────
function TextField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
        {label}
      </span>
      <div style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
        />
      </div>
    </div>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────
function SelectField({ label, placeholder, options }: { label: string; placeholder: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
        {label}
      </span>
      <div className="relative w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full appearance-none bg-transparent pr-6"
          style={{ ...fontSwitzer, fontSize: "16px", color: value ? "#000" : "#a09898", border: "none", outline: "none" }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none" />
      </div>
    </div>
  );
}

export default function BankingInformationPage() {
  const router = useRouter();

  // ── Sidebar state ──
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    bankAccount: false,
    mobileBanking: false,
    debitCreditCards: false,
    savedCards: false,
  });

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { id: 1, nameOnAccount: "", bankName: "", accountNumber: "", accountType: "", branch: "", routingNumber: "", swiftCode: "" },
  ]);

  const [mobileAccounts, setMobileAccounts] = useState<MobileBanking[]>([
    { id: 1, phone: "", walletType: "bKash" },
  ]);

  const [cards, setCards] = useState<DebitCreditCard[]>([
    { id: 1, cardType: "", nameOnCard: "", cardNumber: "", expiryDate: "" },
  ]);

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const updateBank = (id: number, key: keyof BankAccount, val: string) =>
    setBankAccounts((prev) => prev.map((b) => b.id === id ? { ...b, [key]: val } : b));

  const updateMobile = (id: number, key: keyof MobileBanking, val: string) =>
    setMobileAccounts((prev) => prev.map((m) => m.id === id ? { ...m, [key]: val } : m));

  const updateCard = (id: number, key: keyof DebitCreditCard, val: string) =>
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, [key]: val } : c));

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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px" }}
        >
          {/* Heading */}
          <div className="flex items-center gap-[5px]" style={{ marginBottom: "20px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Banking Information
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* ── Bank Account Details ── */}
          <SectionHeader title="Bank Account  Details" isOpen={openSections.bankAccount} onToggle={() => toggleSection("bankAccount")} />
          {openSections.bankAccount && (
            <div className="flex flex-col gap-[20px] w-full pb-[16px]">
              {bankAccounts.map((bank) => (
                <div key={bank.id} className="flex flex-col gap-[20px] w-full">
                  <TextField label="NAME ON ACCOUNT" placeholder="Your first and middle names" value={bank.nameOnAccount} onChange={(v) => updateBank(bank.id, "nameOnAccount", v)} />

                  {/* Bank Name with Tag */}
                  <div className="flex flex-col gap-[10px] w-full">
                    <div className="flex items-center justify-between w-full">
                      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>BANK NAME</span>
                      <button className="flex items-center gap-[8px]">
                        <Users size={14} className="text-[#025fc9]" />
                        <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>Tag OneSyncID</span>
                      </button>
                    </div>
                    <div style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
                      <input
                        value={bank.bankName}
                        onChange={(e) => updateBank(bank.id, "bankName", e.target.value)}
                        placeholder="Your bank name"
                        style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
                      />
                    </div>
                  </div>

                  <TextField label="ACCOUNT NUMBER" placeholder="Enter account number" value={bank.accountNumber} onChange={(v) => updateBank(bank.id, "accountNumber", v)} />
                  <SelectField label="ACCOUNT TYPE" placeholder="Select account type" options={["Savings", "Current", "Fixed Deposit"]} />
                  <TextField label="BRANCH" placeholder="Enter bank's branch name" value={bank.branch} onChange={(v) => updateBank(bank.id, "branch", v)} />
                  <TextField label="ROUTING NUMBER" placeholder="Enter routing number" value={bank.routingNumber} onChange={(v) => updateBank(bank.id, "routingNumber", v)} />
                  <TextField label="SWIFT CODE" placeholder="Enter swift code" value={bank.swiftCode} onChange={(v) => updateBank(bank.id, "swiftCode", v)} />
                </div>
              ))}
              <button
                onClick={() => setBankAccounts((prev) => [...prev, { id: Date.now(), nameOnAccount: "", bankName: "", accountNumber: "", accountType: "", branch: "", routingNumber: "", swiftCode: "" }])}
                className="flex items-center gap-[8px]"
              >
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                  Add another bank account
                </span>
              </button>
            </div>
          )}

          {/* ── Mobile Banking / Wallet ── */}
          <SectionHeader title="Mobile Banking / Wallet" isOpen={openSections.mobileBanking} onToggle={() => toggleSection("mobileBanking")} />
          {openSections.mobileBanking && (
            <div className="flex flex-col gap-[20px] w-full pb-[16px]">
              {mobileAccounts.map((mobile) => (
                <div key={mobile.id} className="flex flex-col gap-[20px] w-full">
                  {/* Phone with BD flag */}
                  <div className="flex flex-col gap-[10px] w-full">
                    <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>PHONE NUMBER</span>
                    <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
                      <div className="flex items-center gap-[3px]">
                        <div className="flex items-center gap-[8px]">
                          <div className="relative overflow-hidden shrink-0" style={{ width: "30px", height: "20px", border: "0.5px solid #eee" }}>
                            <Image src="/images/bd-flag.png" alt="BD" fill style={{ objectFit: "cover" }} />
                          </div>
                          <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757" }}>+880</span>
                        </div>
                        <ChevronDown size={16} className="text-[#5e5757]" />
                      </div>
                      <input
                        value={mobile.phone}
                        onChange={(e) => updateMobile(mobile.id, "phone", e.target.value)}
                        placeholder="Enter your number"
                        style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1, marginLeft: "8px" }}
                      />
                    </div>
                  </div>

                  {/* Wallet type chips */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>SELECT MOBILE WALLET TYPE</span>
                    <div className="flex flex-wrap gap-[12px]">
                      {MOBILE_WALLET_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateMobile(mobile.id, "walletType", type)}
                          className="flex items-center justify-center rounded-[8px]"
                          style={{
                            paddingLeft: "12px", paddingRight: "12px", paddingTop: "5px", paddingBottom: "5px",
                            border: mobile.walletType === type ? "1px solid #025fc9" : "1px solid #d9d9d9",
                            backgroundColor: mobile.walletType === type ? "rgba(2,95,201,0.08)" : "#fff",
                          }}
                        >
                          <span style={{ ...fontSwitzer, fontSize: "16px", color: mobile.walletType === type ? "#025fc9" : "#767676", letterSpacing: "0.16px" }}>
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setMobileAccounts((prev) => [...prev, { id: Date.now(), phone: "", walletType: "bKash" }])}
                className="flex items-center gap-[8px]"
              >
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                  Add another number
                </span>
              </button>
            </div>
          )}

          {/* ── Debit / Credit Cards ── */}
          <SectionHeader title="Debit / Credit Cards" isOpen={openSections.debitCreditCards} onToggle={() => toggleSection("debitCreditCards")} />
          {openSections.debitCreditCards && (
            <div className="flex flex-col gap-[20px] w-full pb-[16px]">
              {cards.map((card) => (
                <div key={card.id} className="flex flex-col gap-[20px] w-full">
                  <SelectField label="CARD TYPE" placeholder="Select card type" options={["Debit", "Credit", "Prepaid"]} />
                  <TextField label="NAME ON CARD" placeholder="Enter name on card" value={card.nameOnCard} onChange={(v) => updateCard(card.id, "nameOnCard", v)} />
                  <TextField label="CARD NUMBER" placeholder="Enter card number" value={card.cardNumber} onChange={(v) => updateCard(card.id, "cardNumber", v)} />

                  {/* Expiry Date */}
                  <div className="flex flex-col gap-[10px] w-full">
                    <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>EXPIRY DATE</span>
                    <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
                      <input
                        type="date"
                        value={card.expiryDate}
                        onChange={(e) => updateCard(card.id, "expiryDate", e.target.value)}
                        style={{ ...fontSwitzer, fontSize: "16px", color: card.expiryDate ? "#000" : "#a09898", border: "none", outline: "none", background: "transparent", flex: 1 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setCards((prev) => [...prev, { id: Date.now(), cardType: "", nameOnCard: "", cardNumber: "", expiryDate: "" }])}
                className="flex items-center gap-[8px]"
              >
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                  Add another card
                </span>
              </button>
            </div>
          )}

          {/* ── Saved Cards ── */}
          <SectionHeader title="Saved Cards" isOpen={openSections.savedCards} onToggle={() => toggleSection("savedCards")} />
          {openSections.savedCards && (
            <div className="flex items-start justify-between w-full pt-[12px] pb-[16px]">
              {/* Card — Figma design: blue tinted card */}
              <div
                className="flex flex-col gap-[10px] rounded-[12px] shrink-0"
                style={{
                  width: "207px",
                  backgroundColor: "rgba(2,95,201,0.1)",
                  border: "1px solid rgba(2,95,201,0.2)",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                {/* Card number row */}
                <div className="flex items-center justify-between px-[20px]">
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "2px" }}>••••</span>
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "2px" }}>••••</span>
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "2px" }}>••••</span>
                  <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#025fc9" }}>2294</span>
                </div>
                {/* Name */}
                <div
                  className="flex items-center px-[20px]"
                  style={{ backgroundColor: "rgba(2,95,201,0.2)", height: "28px", borderLeft: "1px solid rgba(2,95,201,0.2)", borderRight: "1px solid rgba(2,95,201,0.2)" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 600, color: "#025fc9" }}>John Doe</span>
                </div>
                {/* Valid thru + VISA */}
                <div className="flex items-center justify-between px-[20px]">
                  <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#025fc9", lineHeight: "16px" }}>
                    Valid Thru{"\n"}06/28
                  </span>
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 700, fontStyle: "italic", color: "#025fc9" }}>VISA</span>
                </div>
              </div>

              {/* Meatball menu */}
              <button className="flex items-center justify-center w-6 h-6">
                <span style={{ fontSize: "20px", color: "#5e5757", letterSpacing: "1px" }}>⋮</span>
              </button>
            </div>
          )}

          {/* Save */}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "24px" }}
          >
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>Save</span>
          </button>

        </div>
      </div>
    </div>
  );
}