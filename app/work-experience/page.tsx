"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown, Plus, Users, Calendar, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";

// ── Badge definitions — images from /public/images/ ───────────────────────────
const BADGES = [
  { name: "Leadership",      image: "/images/Leadership.png" },
  { name: "People-oriented", image: "/images/People-oriented.png" },
  { name: "Collaborator",    image: "/images/Collaborator.png" },
  { name: "Independent",     image: "/images/Independent.png" },
  { name: "Skilled",         image: "/images/Skilled.png" },
] as const;
type BadgeName = typeof BADGES[number]["name"];

const HEAR_OPTIONS = ["LinkedIn", "Job Portal", "Referral", "Company Website", "Direct Apply", "Other"];

// ── Shared styles (same as EducationInformationPage) ─────────────────────────
const labelStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757",
  letterSpacing: "0.16px", lineHeight: "21px",
};
const inputStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", color: "#000", border: "none",
  outline: "none", background: "transparent", width: "100%", letterSpacing: "0.16px",
};
const fieldBorder: React.CSSProperties = {
  borderBottom: "1px solid #d9d9d9", paddingTop: "10px", paddingBottom: "10px",
};

// ── Reusable field components ─────────────────────────────────────────────────
function SelectField({ label, placeholder, options, value, onChange }: {
  label: string; placeholder: string; options: string[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <span style={labelStyle}>{label}</span>
      <div className="flex items-center justify-between" style={fieldBorder}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 appearance-none bg-transparent"
          style={{ ...fontSwitzer, fontSize: "16px", color: value ? "#000" : "#a09898", border: "none", outline: "none", letterSpacing: "0.16px" }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={18} className="text-[#5e5757] shrink-0 pointer-events-none" />
      </div>
    </div>
  );
}

function TextField({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <span style={labelStyle}>{label}</span>
      <div style={fieldBorder}>
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      </div>
    </div>
  );
}

function DateField({ label, placeholder, value, onChange, disabled, rightSlot }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
  disabled?: boolean; rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="flex items-center justify-between">
        <span style={labelStyle}>{label}</span>
        {rightSlot}
      </div>
      <div className="flex items-center justify-between" style={{ ...fieldBorder, opacity: disabled ? 0.5 : 1 }}>
        <input
          type="number" min="1950" max="2099"
          value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} disabled={disabled}
          style={{ ...inputStyle, color: value ? "#000" : "#a09898" }}
        />
        <Calendar size={18} className="text-[#5e5757] shrink-0" />
      </div>
    </div>
  );
}

// ── Document Upload (same pattern as EducationInformationPage) ────────────────
function DocumentUpload({ files, fileInputRef, onFileSelect }: {
  files: { id: number; filename: string }[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-[30px] w-full">
      <div className="flex flex-col gap-[10px] w-full">
        <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#333", letterSpacing: "0.16px" }}>
          Educational Document
        </p>
        <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
          Attach a valid education document such as a certificate or transcript.
        </p>
      </div>
      <div className="flex flex-col gap-[10px] w-full">
        {files.length === 0 && (
          <div
            className="flex flex-col gap-[20px] items-center py-[30px] rounded-[12px] w-full"
            style={{ border: "1px dashed #002d94", backgroundColor: "rgba(2,95,201,0.02)" }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect x="8" y="4" width="28" height="36" rx="3" fill="#e8f0fb" stroke="#025fc9" strokeWidth="1.5" />
              <rect x="14" y="12" width="16" height="2" rx="1" fill="#025fc9" />
              <rect x="14" y="18" width="16" height="2" rx="1" fill="#025fc9" />
              <rect x="14" y="24" width="10" height="2" rx="1" fill="#025fc9" />
              <circle cx="36" cy="36" r="10" fill="#025fc9" />
              <path d="M31 36l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col gap-[8px] items-center w-full">
              <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#333", textAlign: "center", letterSpacing: "0.16px" }}>
                Drag & drop your file here
              </p>
              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", textAlign: "center", letterSpacing: "0.12px" }}>
                Accepted Formats: PDF, JPG, PNG (Max 5 MB per file)
              </p>
              <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#333", textAlign: "center" }}>or</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center rounded-[10px]"
              style={{ height: "40px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#025fc9", minWidth: "111px" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
                Browse files
              </span>
            </button>
          </div>
        )}
        {files.map((file) => (
          <div key={file.id} className="flex items-center px-[12px] py-[10px] rounded-[8px]" style={{ border: "1px solid #d9d9d9" }}>
            <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000" }}>{file.filename}</span>
          </div>
        ))}
        <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={onFileSelect} />
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-[8px]">
          <Plus size={18} className="text-[#025fc9]" />
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
            Upload another
          </span>
        </button>
      </div>
    </div>
  );
}

// ── Work Entry interface ───────────────────────────────────────────────────────
interface WorkEntry {
  id: number;
  companyName: string;
  role: string;
  companyWebsite: string;
  country: string;
  division: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workType: string;
  contractType: string;
  aboutRole: string;
  selectedBadges: BadgeName[];
  howDidYouHear: string;
  showOnProfile: boolean;
  proofFiles: { id: number; filename: string }[];
}

function newEntry(): WorkEntry {
  return {
    id: Date.now(),
    companyName: "", role: "", companyWebsite: "",
    country: "", division: "",
    startDate: "", endDate: "", currentlyWorking: false,
    workType: "", contractType: "",
    aboutRole: "",
    selectedBadges: [],
    howDidYouHear: "", showOnProfile: false,
    proofFiles: [],
  };
}

// ── Entry Form ────────────────────────────────────────────────────────────────
function EntryForm({ entry, isFirst, onUpdate, onDelete, fileInputRef, onFileSelect }: {
  entry: WorkEntry;
  isFirst: boolean;
  onUpdate: (key: keyof WorkEntry, val: string | boolean | BadgeName[]) => void;
  onDelete: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const toggleBadge = (badge: BadgeName) => {
    const has = entry.selectedBadges.includes(badge);
    if (!has && entry.selectedBadges.length >= 3) return;
    onUpdate("selectedBadges", has
      ? entry.selectedBadges.filter((b) => b !== badge)
      : [...entry.selectedBadges, badge]
    );
  };

  return (
    <div className="flex flex-col gap-[20px] w-full" style={!isFirst ? { borderTop: "1px solid #d9d9d9", paddingTop: "20px" } : {}}>

      {/* Delete button — only non-first entries */}
      {!isFirst && (
        <div className="flex justify-end w-full">
          <button onClick={onDelete} aria-label="Delete">
            <Trash2 size={22} className="text-[#e53935]" />
          </button>
        </div>
      )}

      {/* Company Name */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex items-center justify-between w-full">
          <span style={labelStyle}>COMPANY NAME</span>
          <button className="flex items-center gap-[8px]">
            <Users size={14} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.8px" }}>
              Tag OneSyncID
            </span>
          </button>
        </div>
        <div style={fieldBorder}>
          <input
            value={entry.companyName}
            onChange={(e) => onUpdate("companyName", e.target.value)}
            placeholder="Your institution name"
            style={inputStyle}
          />
        </div>
      </div>

      <TextField label="ROLE" placeholder="Your role or designation"
        value={entry.role} onChange={(v) => onUpdate("role", v)} />

      <TextField label="COMPANY WEBSITE" placeholder="Enter company website address"
        value={entry.companyWebsite} onChange={(v) => onUpdate("companyWebsite", v)} />

      <SelectField label="COUNTRY" placeholder="Select country"
        options={["Bangladesh", "India", "USA", "UK", "Canada", "Australia"]}
        value={entry.country} onChange={(v) => onUpdate("country", v)} />

      <SelectField label="DIVISION" placeholder="Select division"
        options={["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet"]}
        value={entry.division} onChange={(v) => onUpdate("division", v)} />

      <DateField label="ENROLLMENT START DATE" placeholder="Select enrollment year"
        value={entry.startDate} onChange={(v) => onUpdate("startDate", v)} />

      <DateField
        label="EMPLOYMENT END DATE" placeholder="Select graduation year"
        value={entry.endDate} onChange={(v) => onUpdate("endDate", v)}
        disabled={entry.currentlyWorking}
        rightSlot={
          <div className="flex items-center gap-[8px]">
            <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
              Currently working here
            </span>
            <button
              onClick={() => onUpdate("currentlyWorking", !entry.currentlyWorking)}
              style={{
                width: "12px", height: "12px", flexShrink: 0, borderRadius: "2px",
                border: entry.currentlyWorking ? "none" : "1px solid #5e5757",
                backgroundColor: entry.currentlyWorking ? "#025fc9" : "#fff",
              }}
            />
          </div>
        }
      />

      <SelectField label="WORK TYPE" placeholder="Select work type"
        options={["Full-time", "Part-time", "Remote", "Hybrid", "Freelance"]}
        value={entry.workType} onChange={(v) => onUpdate("workType", v)} />

      <SelectField label="CONTRACT TYPE" placeholder="Select contract type"
        options={["Permanent", "Contractual", "Internship", "Temporary"]}
        value={entry.contractType} onChange={(v) => onUpdate("contractType", v)} />

      {/* About Your Role */}
      <div className="flex flex-col gap-[10px] w-full">
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
          About Your Role
        </span>
        <div style={fieldBorder}>
          <textarea
            value={entry.aboutRole}
            onChange={(e) => onUpdate("aboutRole", e.target.value)}
            placeholder="Outline your duties, achievements, and impact..."
            rows={3}
            style={{ ...inputStyle, resize: "none", color: entry.aboutRole ? "#000" : "#5e5757" }}
          />
        </div>
      </div>

      {/* Attach file */}
      <div className="flex flex-col gap-[8px]">
        <button className="flex items-center gap-[8px]">
          <Plus size={18} className="text-[#025fc9]" />
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
            Attach file
          </span>
        </button>
        <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
          Add images, screenshots, slides, or other media that highlight your work or achievements.
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex flex-col gap-[4px]">
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
            Badges
          </span>
          <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
            Select up to 3 badges that best describe your work style.
          </p>
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {BADGES.map(({ name, image }) => {
            const selected = entry.selectedBadges.includes(name);
            return (
              <button
                key={name}
                onClick={() => toggleBadge(name)}
                className="flex items-center gap-[5px] rounded-[15px]"
                style={{
                  paddingLeft: "10px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px",
                  border: selected ? "2px solid #4396f5" : "1px solid #d9d9d9",
                  backgroundColor: "#fff",
                }}
              >
                <div className="relative shrink-0" style={{ width: "16px", height: "16px" }}>
                  <Image src={image} alt={name} fill className="object-contain" />
                </div>
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px", whiteSpace: "nowrap" }}>
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* How did you hear */}
      <div className="flex flex-col gap-[10px] w-full">
        <span style={{ ...fontSwitzer, fontSize: "16px", color: "#333", letterSpacing: "0.16px" }}>
          How did you hear about this position?
        </span>
        <div className="flex items-center gap-[8px] relative" style={{ border: "1px solid #a09898", borderRadius: "12px", height: "40px", paddingLeft: "16px", paddingRight: "12px" }}>
          <select
            value={entry.howDidYouHear}
            onChange={(e) => onUpdate("howDidYouHear", e.target.value)}
            className="flex-1 appearance-none bg-transparent"
            style={{ ...fontSwitzer, fontSize: "16px", color: entry.howDidYouHear ? "#333" : "#333", border: "none", outline: "none", letterSpacing: "0.16px" }}
          >
            <option value="" disabled>Select an option</option>
            {HEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown size={20} className="text-[#333] shrink-0 pointer-events-none" />
        </div>
        {/* Show on profile checkbox */}
        <div className="flex items-center gap-[8px]">
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
            Show this on my profile
          </span>
          <button
            onClick={() => onUpdate("showOnProfile", !entry.showOnProfile)}
            style={{
              width: "14px", height: "14px", flexShrink: 0, borderRadius: "2px",
              border: entry.showOnProfile ? "none" : "1px solid #5e5757",
              backgroundColor: entry.showOnProfile ? "#025fc9" : "#fff",
            }}
          />
        </div>
      </div>

      {/* Document upload */}
      <DocumentUpload files={entry.proofFiles} fileInputRef={fileInputRef} onFileSelect={onFileSelect} />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function WorkExperiencePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entries, setEntries] = useState<WorkEntry[]>([newEntry()]);

  const updateEntry = (id: number, key: keyof WorkEntry, val: string | boolean | BadgeName[]) =>
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, [key]: val } : e));

  const deleteEntry = (id: number) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const handleFileSelect = (entryId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEntries((prev) => prev.map((entry) =>
      entry.id === entryId
        ? { ...entry, proofFiles: [...entry.proofFiles, { id: Date.now(), filename: file.name }] }
        : entry
    ));
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* ── Sticky Header ── */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between px-[20px]" style={{ height: "54px" }}>
            <div className="flex items-center gap-[20px]">
              <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu" onClick={() => setSidebarOpen(true)}>
                <Menu size={24} className="text-black" />
              </button>
              <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} className="object-contain" />
            </div>
            <div className="flex items-center gap-[20px]">
              <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
                <Bell size={24} className="text-black" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
                <Mail size={24} className="text-black" />
              </button>
            </div>
          </div>
          <div className="px-[20px] pb-[10px] pt-[3px]">
            <div className="flex items-center w-full" style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}>
              <Search size={20} className="text-[#5e5757] shrink-0" />
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex flex-col overflow-y-auto px-[20px] pt-[20px] pb-[40px] gap-[20px]">

          {/* Heading */}
          <div className="flex items-center gap-[5px]">
            <span style={{ ...fontSwitzer, fontSize: "24px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Work Experience
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Add another experience */}
          <button onClick={() => setEntries((prev) => [...prev, newEntry()])} className="flex items-center gap-[8px]">
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
              Add another experience
            </span>
          </button>

          {/* Entries */}
          {entries.map((entry, idx) => (
            <EntryForm
              key={entry.id}
              entry={entry}
              isFirst={idx === 0}
              onUpdate={(key, val) => updateEntry(entry.id, key, val)}
              onDelete={() => deleteEntry(entry.id)}
              fileInputRef={fileInputRef}
              onFileSelect={(e) => handleFileSelect(entry.id, e)}
            />
          ))}

          {/* Cancel + Save buttons */}
          <div className="flex items-center justify-end gap-[20px] w-full pt-[10px]">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", paddingLeft: "10px", paddingRight: "10px", border: "1px solid #5e5757", minWidth: "90px" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>Cancel</span>
            </button>
            <button
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "44px", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#025fc9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
                Save Changes
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}