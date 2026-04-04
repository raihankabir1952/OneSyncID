"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown, Plus, Users } from "lucide-react";

const EDUCATION_TYPES = ["University / Diploma / Degree", "SSC / DAKHIL", "HSC / ALIM", "JSC / JDC"] as const;
type EducationType = typeof EDUCATION_TYPES[number];

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

  const updateEntry = (id: number, key: keyof EducationEntry, val: string | boolean) => {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, [key]: val } : e));
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
          {/* Heading + actions */}
          <div className="flex items-center justify-between w-full" style={{ marginBottom: "20px" }}>
            <div className="flex items-center gap-[5px]">
              <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
                Education Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "32px", paddingLeft: "16px", paddingRight: "16px", border: "1px solid #d9d9d9" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757" }}>Cancel</span>
              </button>
              <button
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "32px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#025fc9" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#fff" }}>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Education entries */}
          {entries.map((entry) => (
            <div key={entry.id} className="flex flex-col w-full" style={{ marginBottom: "24px" }}>

              {/* Education type chips */}
              <div className="flex flex-col gap-[8px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  EDUCATION TYPE
                </span>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateEntry(entry.id, "type", type)}
                      className="flex items-center justify-center rounded-[8px]"
                      style={{
                        paddingLeft: "10px", paddingRight: "10px", paddingTop: "4px", paddingBottom: "4px",
                        border: entry.type === type ? "1px solid #025fc9" : "1px solid #d9d9d9",
                        backgroundColor: entry.type === type ? "rgba(2,95,201,0.08)" : "#fff",
                      }}
                    >
                      <span style={{
                        ...fontSwitzer, fontSize: "13px", fontWeight: 500,
                        color: entry.type === type ? "#025fc9" : "#5e5757",
                        letterSpacing: "0.13px", whiteSpace: "nowrap",
                      }}>
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
                className="flex items-center gap-[6px] py-[12px]"
              >
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
                  Add another education
                </span>
              </button>

              {/* Institution Name with Tag */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                    INSTITUTION NAME
                  </span>
                  <button className="flex items-center gap-[4px]">
                    <Users size={14} className="text-[#025fc9]" />
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>Tag OneSyncID</span>
                  </button>
                </div>
                <input
                  value={entry.institutionName}
                  onChange={(e) => updateEntry(entry.id, "institutionName", e.target.value)}
                  placeholder="Your institution name"
                  style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
                />
              </div>

              <SelectField label="COUNTRY" placeholder="Select country" options={["Bangladesh", "India", "USA", "UK"]} />
              <SelectField label="CITY" placeholder="Select city" options={["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]} />
              <TextField label="STUDENT ID / REGISTRATION NUMBER" placeholder="Enter student ID or registration number" value={entry.studentId} onChange={(v) => updateEntry(entry.id, "studentId", v)} />
              <SelectField label="DEGREE NAME" placeholder="Select your degree" options={["Bachelor's", "Master's", "PhD", "Diploma", "Certificate"]} />
              <SelectField label="DEPARTMENT NAME" placeholder="Select department name" options={["Computer Science", "Business", "Engineering", "Arts"]} />
              <SelectField label="MAJOR" placeholder="Select course major" options={["Software Engineering", "Data Science", "Finance", "Marketing"]} />
              <SelectField label="MINOR" placeholder="Select course minor" options={["Mathematics", "Psychology", "Economics"]} />

              {/* Enrollment Year */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  ENROLLMENT YEAR
                </span>
                <input
                  type="date"
                  value={entry.enrollmentYear}
                  onChange={(e) => updateEntry(entry.id, "enrollmentYear", e.target.value)}
                  style={{ ...fontSwitzer, fontSize: "16px", color: entry.enrollmentYear ? "#000" : "#a09898", border: "none", outline: "none", background: "transparent", width: "100%" }}
                />
              </div>

              {/* Graduation Year + Currently Enrolled */}
              <div className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                    GRADUATION YEAR
                  </span>
                  <div className="flex items-center gap-[6px]">
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                      Currently enrolled
                    </span>
                    <button
                      onClick={() => updateEntry(entry.id, "currentlyEnrolled", !entry.currentlyEnrolled)}
                      className="flex items-center justify-center rounded-[4px] shrink-0"
                      style={{
                        width: "18px", height: "18px",
                        border: entry.currentlyEnrolled ? "none" : "2px solid #d9d9d9",
                        backgroundColor: entry.currentlyEnrolled ? "#025fc9" : "#fff",
                      }}
                    >
                      {entry.currentlyEnrolled && <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>}
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  value={entry.graduationYear}
                  onChange={(e) => updateEntry(entry.id, "graduationYear", e.target.value)}
                  disabled={entry.currentlyEnrolled}
                  style={{
                    ...fontSwitzer, fontSize: "16px",
                    color: entry.currentlyEnrolled ? "#a09898" : (entry.graduationYear ? "#000" : "#a09898"),
                    border: "none", outline: "none", background: "transparent", width: "100%",
                    opacity: entry.currentlyEnrolled ? 0.5 : 1,
                  }}
                />
              </div>

              <SelectField label="GPA / CGPA / RESULT" placeholder="Enter your gpa or cgpa or result" options={["5.00", "4.00", "3.50", "A+", "A", "B+"]} />

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
                  <div key={file.id} className="flex items-center justify-between p-[12px] rounded-[8px]" style={{ border: "1px solid #d9d9d9" }}>
                    <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>{file.filename}</span>
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

        </div>
      </div>
    </div>
  );
}