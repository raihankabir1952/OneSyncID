"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  Menu, Bell, Mail, Search, Info, ChevronDown, Plus, Users, Calendar, Trash2,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const EDUCATION_TYPES = [
  "University / Diploma / Degree",
  "SSC / DAKHIL",
  "HSC / ALIM",
  "JSC / JDC",
] as const;
type EducationType = typeof EDUCATION_TYPES[number];

// ── Shared styles ─────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", lineHeight: "21px",
};
const placeholderStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", color: "#a09898", letterSpacing: "0.16px", lineHeight: "21px",
};
const inputStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none",
  background: "transparent", width: "100%", letterSpacing: "0.16px",
};
const fieldBorder: React.CSSProperties = {
  borderBottom: "1px solid #d9d9d9", paddingTop: "10px", paddingBottom: "10px",
};

// ── Field components ──────────────────────────────────────────────────────────
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
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle }}
        />
      </div>
    </div>
  );
}

function YearField({ label, placeholder, value, onChange, disabled = false, rightSlot }: {
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
          type="number"
          min="1950"
          max="2099"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={{ ...inputStyle, color: value ? "#000" : "#a09898" }}
        />
        <Calendar size={18} className="text-[#5e5757] shrink-0" />
      </div>
    </div>
  );
}

// ── Document upload ───────────────────────────────────────────────────────────
function DocumentUpload({ files, onAdd, onFileSelect }: {
  files: { id: number; filename: string }[];
  onAdd: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
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
        {/* Upload area */}
        {files.length === 0 && (
          <div
            className="flex flex-col gap-[20px] items-center py-[30px] rounded-[12px] w-full"
            style={{ border: "1px dashed #002d94", backgroundColor: "rgba(2,95,201,0.02)" }}
          >
            {/* Document icon */}
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
              onClick={() => ref.current?.click()}
              className="flex items-center justify-center rounded-[10px]"
              style={{ height: "40px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#025fc9", minWidth: "111px" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
                Browse files
              </span>
            </button>
          </div>
        )}

        {/* Uploaded files list */}
        {files.map((file) => (
          <div key={file.id} className="flex items-center px-[12px] py-[10px] rounded-[8px]" style={{ border: "1px solid #d9d9d9" }}>
            <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000" }}>{file.filename}</span>
          </div>
        ))}

        <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={onFileSelect} />

        {/* Upload another */}
        <button onClick={() => ref.current?.click()} className="flex items-center gap-[8px]">
          <Plus size={18} className="text-[#025fc9]" />
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
            Upload another
          </span>
        </button>
      </div>
    </div>
  );
}

// ── Education Entry ───────────────────────────────────────────────────────────
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

function newEntry(): EducationEntry {
  return {
    id: Date.now(),
    type: "University / Diploma / Degree",
    institutionName: "", country: "", city: "", studentId: "",
    degreeName: "", departmentName: "", major: "", minor: "",
    enrollmentYear: "", graduationYear: "", currentlyEnrolled: false,
    gpa: "", proofFiles: [],
  };
}

function EntryForm({
  entry,
  isFirst,
  onUpdate,
  onDelete,
  onFileSelect,
}: {
  entry: EducationEntry;
  isFirst: boolean;
  onUpdate: (key: keyof EducationEntry, val: string | boolean) => void;
  onDelete: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-[20px] w-full pt-[10px]" style={!isFirst ? { borderTop: "1px solid #d9d9d9" } : {}}>

      {/* Delete button — only for non-first entries */}
      {!isFirst && (
        <div className="flex justify-end w-full pt-[5px]">
          <button onClick={onDelete} aria-label="Delete education">
            <Trash2 size={22} className="text-[#e53935]" />
          </button>
        </div>
      )}

      {/* Education type */}
      <div className="flex flex-col gap-[10px] w-full">
        <span style={labelStyle}>EDUCATION TYPE</span>
        <div className="flex flex-wrap gap-[12px]">
          {EDUCATION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onUpdate("type", type)}
              className="flex items-center justify-center rounded-[8px]"
              style={{
                paddingLeft: "12px", paddingRight: "12px", paddingTop: "5px", paddingBottom: "5px",
                border: entry.type === type ? "1px solid #025fc9" : "1px solid #d9d9d9",
                backgroundColor: entry.type === type ? "rgba(2,95,201,0.08)" : "#fff",
              }}
            >
              <span style={{
                ...fontSwitzer, fontSize: "16px",
                color: entry.type === type ? "#025fc9" : "#767676",
                letterSpacing: "0.16px", lineHeight: "21px", whiteSpace: "nowrap",
              }}>
                {type}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Institution Name */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex items-center justify-between w-full">
          <span style={labelStyle}>INSTITUITION NAME</span>
          <button className="flex items-center gap-[8px]">
            <Users size={14} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.8px" }}>
              Tag OneSyncID
            </span>
          </button>
        </div>
        <div style={fieldBorder}>
          <input
            value={entry.institutionName}
            onChange={(e) => onUpdate("institutionName", e.target.value)}
            placeholder="Your instituition name"
            style={inputStyle}
          />
        </div>
      </div>

      <SelectField label="COUNTRY" placeholder="Select country"
        options={["Bangladesh", "India", "USA", "UK", "Canada", "Australia"]}
        value={entry.country} onChange={(v) => onUpdate("country", v)} />

      <SelectField label="CITY" placeholder="Select city"
        options={["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal"]}
        value={entry.city} onChange={(v) => onUpdate("city", v)} />

      <TextField label="STUDENT ID / REGISTRATION NUMBER"
        placeholder="Enter student ID or registration number"
        value={entry.studentId} onChange={(v) => onUpdate("studentId", v)} />

      <SelectField label="DEGREE NAME" placeholder="Select your degree"
        options={["Bachelor's", "Master's", "PhD", "Diploma", "Certificate", "Associate"]}
        value={entry.degreeName} onChange={(v) => onUpdate("degreeName", v)} />

      <SelectField label="DEPARTMENT NAME" placeholder="Select department name"
        options={["Computer Science", "Business Administration", "Engineering", "Arts", "Social Science", "Law"]}
        value={entry.departmentName} onChange={(v) => onUpdate("departmentName", v)} />

      <SelectField label="MAJOR" placeholder="Select course major"
        options={["Software Engineering", "Data Science", "Finance", "Marketing", "Electrical Engineering"]}
        value={entry.major} onChange={(v) => onUpdate("major", v)} />

      <SelectField label="MINOR" placeholder="Select course minor"
        options={["Mathematics", "Psychology", "Economics", "Statistics", "Physics"]}
        value={entry.minor} onChange={(v) => onUpdate("minor", v)} />

      <YearField
        label="ENROLLMENT YEAR"
        placeholder="Select enrollment year"
        value={entry.enrollmentYear}
        onChange={(v) => onUpdate("enrollmentYear", v)}
      />

      <YearField
        label="GRADUATION YEAR"
        placeholder="Select graduation year"
        value={entry.graduationYear}
        onChange={(v) => onUpdate("graduationYear", v)}
        disabled={entry.currentlyEnrolled}
        rightSlot={
          <div className="flex items-center gap-[8px]">
            <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
              Currently enrolled
            </span>
            <button
              onClick={() => onUpdate("currentlyEnrolled", !entry.currentlyEnrolled)}
              style={{
                width: "12px", height: "12px", flexShrink: 0,
                border: entry.currentlyEnrolled ? "none" : "1px solid #5e5757",
                backgroundColor: entry.currentlyEnrolled ? "#025fc9" : "#fff",
                borderRadius: "2px",
              }}
            />
          </div>
        }
      />

      <SelectField label="GPA / CGPA / RESULT" placeholder="Enter your gpa or cgpa or result"
        options={["5.00", "4.75", "4.50", "4.00", "3.50", "A+", "A", "B+"]}
        value={entry.gpa} onChange={(v) => onUpdate("gpa", v)} />

      <DocumentUpload
        files={entry.proofFiles}
        onAdd={() => {}}
        onFileSelect={onFileSelect}
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function EducationInformationPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entries, setEntries] = useState<EducationEntry[]>([newEntry()]);

  const updateEntry = (id: number, key: keyof EducationEntry, val: string | boolean) =>
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
          {/* Nav */}
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

          {/* Search */}
          <div className="px-[20px] pb-[10px] pt-[3px]">
            <div className="flex items-center w-full" style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}>
              <Search size={20} className="text-[#5e5757] shrink-0" />
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex flex-col overflow-y-auto px-[20px] pt-[20px] pb-[40px] gap-[20px]">

          {/* Heading + buttons */}
          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex items-center gap-[5px]">
              <span style={{ ...fontSwitzer, fontSize: "24px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
                Education Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>
            <div className="flex items-center justify-end gap-[20px] w-full">
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

          {/* Add another education button */}
          <button onClick={() => setEntries((prev) => [...prev, newEntry()])} className="flex items-center gap-[8px]">
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
              Add another education
            </span>
          </button>

          {/* Education entries */}
          {entries.map((entry, idx) => (
            <EntryForm
              key={entry.id}
              entry={entry}
              isFirst={idx === 0}
              onUpdate={(key, val) => updateEntry(entry.id, key, val)}
              onDelete={() => deleteEntry(entry.id)}
              onFileSelect={(e) => handleFileSelect(entry.id, e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}