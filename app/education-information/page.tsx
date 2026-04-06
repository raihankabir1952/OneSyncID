"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown, Plus, Users } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const EDUCATION_TYPES = ["University / Diploma / Degree", "SSC / DAKHIL", "HSC / ALIM", "JSC / JDC"] as const;
type EducationType = typeof EDUCATION_TYPES[number];

// ─── Field Label style (Figma: #5e5757, 16px medium) ─────────────────────────
const labelStyle = { ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" } as React.CSSProperties;
const inputStyle = { ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" } as React.CSSProperties;
const placeholderColor = "#a09898";

// ─── Select Field ─────────────────────────────────────────────────────────────
function SelectField({ label, placeholder, options }: { label: string; placeholder: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <span style={labelStyle}>{label}</span>
      <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 appearance-none bg-transparent"
          style={{ ...fontSwitzer, fontSize: "16px", color: value ? "#000" : placeholderColor, border: "none", outline: "none" }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="text-[#5e5757] shrink-0 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Text Field ───────────────────────────────────────────────────────────────
function TextField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <span style={labelStyle}>{label}</span>
      <div style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
      </div>
    </div>
  );
}

interface EducationEntry {
  id: number;
  type: EducationType;
  institutionName: string;
  country: string;
  city: string;
  studentId: string;
  degreeName: string;
  departmentName: string;
  major: string;
  minor: string;
  enrollmentYear: string;
  graduationYear: string;
  currentlyEnrolled: boolean;
  gpa: string;
  proofFiles: { id: number; filename: string }[];
}

export default function EducationInformationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Sidebar state ──
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [entries, setEntries] = useState<EducationEntry[]>([
    {
      id: 1,
      type: "University / Diploma / Degree",
      institutionName: "",
      country: "",
      city: "",
      studentId: "",
      degreeName: "",
      departmentName: "",
      major: "",
      minor: "",
      enrollmentYear: "",
      graduationYear: "",
      currentlyEnrolled: false,
      gpa: "",
      proofFiles: [],
    },
  ]);

  const updateEntry = (id: number, key: keyof EducationEntry, val: string | boolean) =>
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, [key]: val } : e));

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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "40px", gap: "20px" }}
        >
          {/* ── Heading + Cancel/Save ── */}
          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex items-center gap-[5px]">
              <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
                Education Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>

            {/* Cancel + Save Changes — right aligned, Figma exact */}
            <div className="flex items-center justify-end gap-[20px] w-full">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "44px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #5e5757", minWidth: "90px" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>Cancel</span>
              </button>
              <button
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "44px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px", backgroundColor: "#025fc9" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>Save Changes</span>
              </button>
            </div>
          </div>

          {/* ── Education Entries ── */}
          {entries.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-[20px] w-full pt-[10px]">

              {/* Education type chips */}
              <div className="flex flex-col gap-[10px] w-full">
                <span style={labelStyle}>EDUCATION TYPE</span>
                <div className="flex flex-wrap gap-[12px]">
                  {EDUCATION_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateEntry(entry.id, "type", type)}
                      className="flex items-center justify-center rounded-[8px]"
                      style={{
                        paddingLeft: "12px", paddingRight: "12px", paddingTop: "5px", paddingBottom: "5px",
                        border: entry.type === type ? "1px solid #025fc9" : "1px solid #d9d9d9",
                        backgroundColor: entry.type === type ? "rgba(2,95,201,0.08)" : "#fff",
                      }}
                    >
                      <span style={{ ...fontSwitzer, fontSize: "16px", color: entry.type === type ? "#025fc9" : "#767676", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
                        {type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add another education */}
              <button
                onClick={() => setEntries((prev) => [...prev, {
                  id: Date.now(), type: "University / Diploma / Degree",
                  institutionName: "", country: "", city: "", studentId: "",
                  degreeName: "", departmentName: "", major: "", minor: "",
                  enrollmentYear: "", graduationYear: "", currentlyEnrolled: false,
                  gpa: "", proofFiles: [],
                }])}
                className="flex items-center gap-[8px]"
              >
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                  Add another education
                </span>
              </button>

              {/* Institution Name with Tag */}
              <div className="flex flex-col gap-[10px] w-full">
                <div className="flex items-center justify-between w-full">
                  <span style={labelStyle}>INSTITUITION NAME</span>
                  <button className="flex items-center gap-[8px]">
                    <Users size={14} className="text-[#025fc9]" />
                    <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>Tag OneSyncID</span>
                  </button>
                </div>
                <div style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
                  <input
                    value={entry.institutionName}
                    onChange={(e) => updateEntry(entry.id, "institutionName", e.target.value)}
                    placeholder="Your instituition name"
                    style={inputStyle}
                  />
                </div>
              </div>

              <SelectField label="COUNTRY" placeholder="Select country" options={["Bangladesh", "India", "USA", "UK"]} />
              <SelectField label="CITY" placeholder="Select city" options={["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]} />
              <TextField label="STUDENT ID / REGISTRATION NUMBER" placeholder="Enter student ID or registration number" value={entry.studentId} onChange={(v) => updateEntry(entry.id, "studentId", v)} />
              <SelectField label="DEGREE NAME" placeholder="Select your degree" options={["Bachelor's", "Master's", "PhD", "Diploma", "Certificate"]} />
              <SelectField label="DEPARTMENT NAME" placeholder="Select department name" options={["Computer Science", "Business", "Engineering", "Arts"]} />
              <SelectField label="MAJOR" placeholder="Select course major" options={["Software Engineering", "Data Science", "Finance", "Marketing"]} />
              <SelectField label="MINOR" placeholder="Select course minor" options={["Mathematics", "Psychology", "Economics"]} />

              {/* Enrollment Year — with calendar icon */}
              <div className="flex flex-col gap-[10px] w-full">
                <span style={labelStyle}>ENROLLMENT YEAR</span>
                <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
                  <input
                    type="date"
                    value={entry.enrollmentYear}
                    onChange={(e) => updateEntry(entry.id, "enrollmentYear", e.target.value)}
                    style={{ ...fontSwitzer, fontSize: "16px", color: entry.enrollmentYear ? "#000" : placeholderColor, border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                </div>
              </div>

              {/* Graduation Year + Currently Enrolled checkbox */}
              <div className="flex flex-col gap-[10px] w-full">
                <div className="flex items-center justify-between pb-[5px]">
                  <span style={labelStyle}>GRADUATION YEAR</span>
                  <div className="flex items-center gap-[8px]">
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>Currently enrolled</span>
                    <button
                      onClick={() => updateEntry(entry.id, "currentlyEnrolled", !entry.currentlyEnrolled)}
                      className="shrink-0"
                      style={{
                        width: "12px", height: "12px",
                        border: entry.currentlyEnrolled ? "none" : "1px solid #5e5757",
                        backgroundColor: entry.currentlyEnrolled ? "#025fc9" : "#fff",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "10px" }}>
                  <input
                    type="date"
                    value={entry.graduationYear}
                    onChange={(e) => updateEntry(entry.id, "graduationYear", e.target.value)}
                    disabled={entry.currentlyEnrolled}
                    style={{ ...fontSwitzer, fontSize: "16px", color: entry.currentlyEnrolled ? placeholderColor : (entry.graduationYear ? "#000" : placeholderColor), border: "none", outline: "none", background: "transparent", flex: 1, opacity: entry.currentlyEnrolled ? 0.5 : 1 }}
                  />
                </div>
              </div>

              <SelectField label="GPA / CGPA / RESULT" placeholder="Enter your gpa or cgpa or result" options={["5.00", "4.00", "3.50", "A+", "A", "B+"]} />

              {/* Educational Document — Figma: blue dashed border */}
              <div className="flex flex-col gap-[30px] w-full">
                <div className="flex flex-col gap-[10px] w-full">
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#333", letterSpacing: "0.16px" }}>
                    Educational Document
                  </span>
                  <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                    Attach a valid education document such as a certificate or transcript.
                  </p>
                </div>

                <div className="flex flex-col gap-[10px] w-full">
                  {entry.proofFiles.length === 0 && (
                    <div
                      className="flex flex-col items-center justify-center w-full rounded-[12px] gap-[20px] py-[30px]"
                      style={{ border: "1px dashed #002d94", backgroundColor: "rgba(2,95,201,0.02)" }}
                    >
                      {/* Document icon */}
                      <div className="relative shrink-0" style={{ width: "50px", height: "50px" }}>
                        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <rect x="8" y="4" width="28" height="36" rx="3" fill="#e8f0fb" stroke="#025fc9" strokeWidth="1.5" />
                          <rect x="14" y="12" width="16" height="2" rx="1" fill="#025fc9" />
                          <rect x="14" y="18" width="16" height="2" rx="1" fill="#025fc9" />
                          <rect x="14" y="24" width="10" height="2" rx="1" fill="#025fc9" />
                          <circle cx="36" cy="36" r="10" fill="#025fc9" />
                          <path d="M31 36l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

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

                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-[8px]">
                    <Plus size={18} className="text-[#025fc9]" />
                    <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                      Upload another
                    </span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}