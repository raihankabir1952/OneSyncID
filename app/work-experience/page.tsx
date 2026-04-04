"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown, Plus, Users } from "lucide-react";

const BADGES = ["Leadership", "People-oriented", "Collaborator", "Independent", "Skilled"] as const;
type Badge = typeof BADGES[number];

const HEAR_OPTIONS = ["LinkedIn", "Job Portal", "Referral", "Direct Apply", "Other"];

function SelectField({ label, placeholder, options }: { label: string; placeholder: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
        {label}
      </span>
      <div className="relative w-full">
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

function TextField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
      />
    </div>
  );
}

interface WorkEntry {
  id: number;
  companyName: string;
  role: string;
  companyWebsite: string;
  enrollmentStartDate: string;
  employmentEndDate: string;
  currentlyWorking: boolean;
  aboutRole: string;
  selectedBadges: Badge[];
  howDidYouHear: string;
  showOnProfile: boolean;
  proofFiles: { id: number; filename: string }[];
}

export default function WorkExperiencePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [entries, setEntries] = useState<WorkEntry[]>([
    {
      id: 1,
      companyName: "",
      role: "",
      companyWebsite: "",
      enrollmentStartDate: "",
      employmentEndDate: "",
      currentlyWorking: false,
      aboutRole: "",
      selectedBadges: ["Leadership", "People-oriented"],
      howDidYouHear: "",
      showOnProfile: false,
      proofFiles: [],
    },
  ]);

  const updateEntry = (id: number, key: keyof WorkEntry, val: string | boolean | Badge[]) => {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, [key]: val } : e));
  };

  const toggleBadge = (entryId: number, badge: Badge, current: Badge[]) => {
    const has = current.includes(badge);
    if (!has && current.length >= 3) return; // max 3 badges
    const updated = has ? current.filter((b) => b !== badge) : [...current, badge];
    updateEntry(entryId, "selectedBadges", updated);
  };

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

        {/* Nav */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
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
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "4px" }}
        >
          {/* Heading */}
          <div className="flex items-center gap-[5px]" style={{ marginBottom: "20px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Work Experience
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {entries.map((entry) => (
            <div key={entry.id} className="flex flex-col w-full" style={{ marginBottom: "24px" }}>

              {/* Company Name with Tag */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                    COMPANY NAME
                  </span>
                  <button className="flex items-center gap-[4px]">
                    <Users size={14} className="text-[#025fc9]" />
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>Tag OneSyncID</span>
                  </button>
                </div>
                <input
                  value={entry.companyName}
                  onChange={(e) => updateEntry(entry.id, "companyName", e.target.value)}
                  placeholder="Your institution name"
                  style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
                />
              </div>

              <TextField label="ROLE" placeholder="Your role or designation" value={entry.role} onChange={(v) => updateEntry(entry.id, "role", v)} />
              <TextField label="COMPANY WEBSITE" placeholder="Enter company website address" value={entry.companyWebsite} onChange={(v) => updateEntry(entry.id, "companyWebsite", v)} />
              <SelectField label="COUNTRY" placeholder="Select country" options={["Bangladesh", "India", "USA", "UK"]} />
              <SelectField label="DIVISION" placeholder="Select division" options={["Dhaka", "Chittagong", "Rajshahi", "Khulna"]} />

              {/* Enrollment Start Date */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  ENROLLMENT START DATE
                </span>
                <input
                  type="date"
                  value={entry.enrollmentStartDate}
                  onChange={(e) => updateEntry(entry.id, "enrollmentStartDate", e.target.value)}
                  style={{ ...fontSwitzer, fontSize: "16px", color: entry.enrollmentStartDate ? "#000" : "#a09898", border: "none", outline: "none", background: "transparent", width: "100%" }}
                />
              </div>

              {/* Employment End Date + Currently Working */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                    EMPLOYMENT END DATE
                  </span>
                  <div className="flex items-center gap-[6px]">
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                      Currently working here
                    </span>
                    <button
                      onClick={() => updateEntry(entry.id, "currentlyWorking", !entry.currentlyWorking)}
                      className="flex items-center justify-center rounded-[4px] shrink-0"
                      style={{
                        width: "18px", height: "18px",
                        border: entry.currentlyWorking ? "none" : "2px solid #d9d9d9",
                        backgroundColor: entry.currentlyWorking ? "#025fc9" : "#fff",
                      }}
                    >
                      {entry.currentlyWorking && <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>}
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  value={entry.employmentEndDate}
                  onChange={(e) => updateEntry(entry.id, "employmentEndDate", e.target.value)}
                  disabled={entry.currentlyWorking}
                  style={{
                    ...fontSwitzer, fontSize: "16px",
                    color: entry.currentlyWorking ? "#a09898" : (entry.employmentEndDate ? "#000" : "#a09898"),
                    border: "none", outline: "none", background: "transparent", width: "100%",
                    opacity: entry.currentlyWorking ? 0.5 : 1,
                  }}
                />
              </div>

              <SelectField label="WORK TYPE" placeholder="Select work type" options={["Full-time", "Part-time", "Remote", "Hybrid", "Freelance"]} />
              <SelectField label="CONTRACT TYPE" placeholder="Select contract type" options={["Permanent", "Contractual", "Internship", "Temporary"]} />

              {/* Add another education */}
              <button
                onClick={() => setEntries((prev) => [...prev, {
                  id: Date.now(), companyName: "", role: "", companyWebsite: "",
                  enrollmentStartDate: "", employmentEndDate: "", currentlyWorking: false,
                  aboutRole: "", selectedBadges: [], howDidYouHear: "",
                  showOnProfile: false, proofFiles: [],
                }])}
                className="flex items-center gap-[6px] py-[12px]"
              >
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
                  Add another education
                </span>
              </button>

              {/* About Your Role */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px" }}>
                  About Your Role
                </span>
                <textarea
                  value={entry.aboutRole}
                  onChange={(e) => updateEntry(entry.id, "aboutRole", e.target.value)}
                  placeholder="Outline your duties, achievements, and impact..."
                  rows={3}
                  style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%", resize: "none" }}
                />
              </div>

              {/* Attach file */}
              <button className="flex items-center gap-[6px] py-[12px]">
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
                  Attach file
                </span>
              </button>
              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px", marginBottom: "12px" }}>
                Add images, screenshots, slides, or other media that highlight your work or achievements.
              </p>

              {/* Badges */}
              <div className="flex flex-col gap-[8px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px" }}>
                  Badges
                </span>
                <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px" }}>
                  Select up to 3 badges that best describe your work style.
                </p>
                <div className="flex flex-wrap gap-2">
                  {BADGES.map((badge) => (
                    <button
                      key={badge}
                      onClick={() => toggleBadge(entry.id, badge, entry.selectedBadges)}
                      className="flex items-center justify-center rounded-[8px] gap-[4px]"
                      style={{
                        paddingLeft: "10px", paddingRight: "10px", paddingTop: "4px", paddingBottom: "4px",
                        border: entry.selectedBadges.includes(badge) ? "1px solid #025fc9" : "1px solid #d9d9d9",
                        backgroundColor: entry.selectedBadges.includes(badge) ? "rgba(2,95,201,0.08)" : "#fff",
                      }}
                    >
                      <span style={{
                        ...fontSwitzer, fontSize: "13px", fontWeight: 500,
                        color: entry.selectedBadges.includes(badge) ? "#025fc9" : "#5e5757",
                        letterSpacing: "0.13px", whiteSpace: "nowrap",
                      }}>
                        {badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* How did you hear */}
              <div className="flex flex-col gap-[8px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px" }}>
                  How did you hear about this position?
                </span>
                <div className="relative w-full">
                  <select
                    value={entry.howDidYouHear}
                    onChange={(e) => updateEntry(entry.id, "howDidYouHear", e.target.value)}
                    className="w-full appearance-none bg-transparent pr-6"
                    style={{ ...fontSwitzer, fontSize: "16px", color: entry.howDidYouHear ? "#000" : "#a09898", border: "1px solid #d9d9d9", borderRadius: "8px", padding: "8px 12px", outline: "none" }}
                  >
                    <option value="" disabled>Select an option</option>
                    {HEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none" />
                </div>

                {/* Show on profile checkbox */}
                <div className="flex items-center gap-[8px]">
                  <button
                    onClick={() => updateEntry(entry.id, "showOnProfile", !entry.showOnProfile)}
                    className="flex items-center justify-center rounded-[4px] shrink-0"
                    style={{
                      width: "18px", height: "18px",
                      border: entry.showOnProfile ? "none" : "2px solid #d9d9d9",
                      backgroundColor: entry.showOnProfile ? "#025fc9" : "#fff",
                    }}
                  >
                    {entry.showOnProfile && <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>}
                  </button>
                  <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                    Show this on my profile
                  </span>
                </div>
              </div>

              {/* Educational Document */}
              <div className="flex flex-col gap-[10px] w-full py-[14px]">
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000", letterSpacing: "0.14px" }}>
                  Educational Document
                </span>
                <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px" }}>
                  Attach a valid education document such as a certificate or transcript.
                </p>

                {entry.proofFiles.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center w-full rounded-[12px] gap-[12px]"
                    style={{ border: "2px dashed #d9d9d9", padding: "24px", minHeight: "160px" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{ width: "48px", height: "48px", backgroundColor: "#e8f0fb" }}
                    >
                      <span style={{ fontSize: "22px" }}>📄</span>
                    </div>
                    <p style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", textAlign: "center" }}>
                      Drag & drop your file here
                    </p>
                    <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", textAlign: "center" }}>
                      Accepted Formats: PDF, JPG, PNG · (Max 5 MB per file)
                    </p>
                    <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898" }}>or</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center rounded-[8px]"
                      style={{ height: "36px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#025fc9" }}
                    >
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#fff" }}>
                        Browse files
                      </span>
                    </button>
                  </div>
                )}

                {entry.proofFiles.map((file) => (
                  <div key={file.id} className="flex items-center p-[12px] rounded-[8px]" style={{ border: "1px solid #d9d9d9" }}>
                    <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000" }}>{file.filename}</span>
                  </div>
                ))}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileSelect(entry.id, e)}
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-[6px]"
                >
                  <Plus size={18} className="text-[#025fc9]" />
                  <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
                    Upload another
                  </span>
                </button>
              </div>

            </div>
          ))}

          {/* Save button */}
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