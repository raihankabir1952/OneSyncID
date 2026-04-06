"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  Menu,
  Bell,
  Mail,
  Search,
  Info,
  Pencil,
  ChevronDown,
  ChevronUp,
  Plus,
  Users,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const RELATIONSHIPS = ["Father", "Mother", "Spouse", "Sibling", "Grandparent", "Other"];
const GENDERS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const RELIGIONS = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];

function SelectField({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: string[];
}) {
  const [value, setValue] = useState("");

  return (
    <div
      className="flex flex-col gap-[6px] py-[14px]"
      style={{ borderBottom: "1px solid #d9d9d9" }}
    >
      <span
        style={{
          ...fontSwitzer,
          fontSize: "12px",
          fontWeight: 500,
          color: "#767676",
          letterSpacing: "0.12px",
        }}
      >
        {label}
      </span>

      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full appearance-none bg-transparent pr-6"
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            color: value ? "#000" : "#a09898",
            border: "none",
            outline: "none",
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none"
        />
      </div>
    </div>
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
  hasTag = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hasTag?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-[6px] py-[14px]"
      style={{ borderBottom: "1px solid #d9d9d9" }}
    >
      <div className="flex items-center justify-between w-full">
        <span
          style={{
            ...fontSwitzer,
            fontSize: "12px",
            fontWeight: 500,
            color: "#767676",
            letterSpacing: "0.12px",
          }}
        >
          {label}
        </span>

        {hasTag && (
          <button className="flex items-center gap-[4px]">
            <Users size={14} className="text-[#025fc9]" />
            <span
              style={{
                ...fontSwitzer,
                fontSize: "12px",
                color: "#025fc9",
                letterSpacing: "0.12px",
              }}
            >
              Tag OneSyncID
            </span>
          </button>
        )}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...fontSwitzer,
          fontSize: "16px",
          color: "#000",
          border: "none",
          outline: "none",
          background: "transparent",
          width: "100%",
        }}
      />
    </div>
  );
}

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-[16px]"
        style={{ borderBottom: open ? "none" : "1px solid #f0f0f0" }}
      >
        <span
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            color: "#000",
            letterSpacing: "0.16px",
          }}
        >
          {title}
        </span>

        {open ? (
          <ChevronUp size={20} className="text-[#5e5757]" />
        ) : (
          <ChevronDown size={20} className="text-[#5e5757]" />
        )}
      </button>

      {open && (
        <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

interface GuardianEntry {
  id: number;
  relationship: string;
  firstName: string;
  lastName: string;
  dob: string;
  nid: string;
}

export default function GuardianInformationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sidebar state add
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [guardians, setGuardians] = useState<GuardianEntry[]>([
    { id: 1, relationship: "", firstName: "", lastName: "", dob: "", nid: "" },
  ]);

  const updateGuardian = (id: number, key: keyof GuardianEntry, val: string) => {
    setGuardians((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [key]: val } : g))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Sticky Header */}
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

              <Image
                src="/images/Vector.png"
                alt="OneSyncID"
                width={116}
                height={20}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="flex items-center" style={{ gap: "20px" }}>
              <button
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell size={24} className="text-black" />
              </button>

              <button
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Messages"
              >
                <Mail size={24} className="text-black" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "3px",
              paddingBottom: "10px",
            }}
          >
            <div
              className="flex items-center w-full"
              style={{
                height: "44px",
                border: "1px solid #9fbfe4",
                borderRadius: "28px",
                paddingLeft: "20px",
                gap: "10px",
              }}
            >
              <Search size={20} className="text-[#5e5757] shrink-0" />
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#5e5757",
                  letterSpacing: "0.5px",
                }}
              >
                Search
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "30px",
            paddingBottom: "40px",
            gap: "4px",
          }}
        >
          {/* Heading */}
          <div
            className="flex items-center justify-between w-full"
            style={{ marginBottom: "20px" }}
          >
            <div className="flex items-center gap-[5px]">
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#000",
                  letterSpacing: "0.8px",
                  lineHeight: "32px",
                }}
              >
                Guardian Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>

            <Pencil size={20} className="text-[#5e5757]" />
          </div>

          {guardians.map((guardian) => (
            <div
              key={guardian.id}
              className="flex flex-col w-full"
              style={{ marginBottom: "16px" }}
            >
              {/* Guardian Identity */}
              <div
                className="flex flex-col gap-[8px] py-[14px]"
                style={{ borderBottom: "1px solid #d9d9d9" }}
              >
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    letterSpacing: "0.14px",
                  }}
                >
                  Guardian's Identity
                </span>

                <div className="relative" style={{ width: "180px" }}>
                  <select
                    value={guardian.relationship}
                    onChange={(e) =>
                      updateGuardian(guardian.id, "relationship", e.target.value)
                    }
                    className="appearance-none bg-white pr-8 pl-3 py-2 rounded-[8px]"
                    style={{
                      ...fontSwitzer,
                      fontSize: "14px",
                      color: guardian.relationship ? "#000" : "#5e5757",
                      border: "1px solid #d9d9d9",
                      outline: "none",
                      width: "100%",
                    }}
                  >
                    <option value="" disabled>
                      Choose Relationship
                    </option>
                    {RELATIONSHIPS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none"
                  />
                </div>
              </div>

              <TextField
                label="FIRST AND MIDDLE NAMES"
                placeholder="Guardian's first and middle names"
                value={guardian.firstName}
                onChange={(v) => updateGuardian(guardian.id, "firstName", v)}
                hasTag={true}
              />

              <TextField
                label="LAST NAME"
                placeholder="Guardian's last name"
                value={guardian.lastName}
                onChange={(v) => updateGuardian(guardian.id, "lastName", v)}
              />

              {/* Date of Birth */}
              <div
                className="flex flex-col gap-[6px] py-[14px]"
                style={{ borderBottom: "1px solid #d9d9d9" }}
              >
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#767676",
                    letterSpacing: "0.12px",
                  }}
                >
                  DATE OF BIRTH
                </span>

                <input
                  type="date"
                  value={guardian.dob}
                  onChange={(e) => updateGuardian(guardian.id, "dob", e.target.value)}
                  style={{
                    ...fontSwitzer,
                    fontSize: "16px",
                    color: guardian.dob ? "#000" : "#a09898",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                  }}
                />
              </div>

              <TextField
                label="NID NUMBER"
                placeholder="Enter NID number"
                value={guardian.nid}
                onChange={(v) => updateGuardian(guardian.id, "nid", v)}
              />

              <SelectField label="GENDER" placeholder="Select gender" options={GENDERS} />
              <SelectField
                label="BLOOD GROUP"
                placeholder="Select blood group"
                options={BLOOD_GROUPS}
              />
              <SelectField
                label="RELIGION"
                placeholder="Select religion"
                options={RELIGIONS}
              />
              <SelectField
                label="MARITAL STATUS"
                placeholder="Select marital status"
                options={MARITAL_STATUSES}
              />
            </div>
          ))}

          {/* Add another guardian */}
          <button
            onClick={() =>
              setGuardians((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  relationship: "",
                  firstName: "",
                  lastName: "",
                  dob: "",
                  nid: "",
                },
              ])
            }
            className="flex items-center gap-[6px] py-[8px]"
          >
            <Plus size={18} className="text-[#025fc9]" />
            <span
              style={{
                ...fontSwitzer,
                fontSize: "14px",
                fontWeight: 500,
                color: "#025fc9",
                letterSpacing: "0.14px",
              }}
            >
              Add another guardian
            </span>
          </button>

          {/* Accordion sections */}
          <AccordionSection title="Address Details">
            <SelectField
              label="COUNTRY"
              placeholder="Select country"
              options={["Bangladesh", "India", "USA", "UK"]}
            />
            <SelectField
              label="DIVISION"
              placeholder="Select division"
              options={["Dhaka", "Chittagong", "Rajshahi", "Khulna"]}
            />
            <SelectField
              label="DISTRICT"
              placeholder="Select district"
              options={["Dhaka", "Gazipur", "Narayanganj"]}
            />
          </AccordionSection>

          <AccordionSection title="Contact Information">
            <div
              className="flex flex-col gap-[6px] py-[14px]"
              style={{ borderBottom: "1px solid #d9d9d9" }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#767676",
                  letterSpacing: "0.12px",
                }}
              >
                PHONE NUMBER
              </span>

              <div className="flex items-center gap-[8px]">
                <span style={{ fontSize: "16px" }}>🇧🇩</span>
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000" }}>
                  +880
                </span>
                <ChevronDown size={14} className="text-[#5e5757]" />
                <input
                  placeholder="Enter phone number"
                  style={{
                    ...fontSwitzer,
                    fontSize: "16px",
                    color: "#000",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    flex: 1,
                  }}
                />
              </div>
            </div>

            <div
              className="flex flex-col gap-[6px] py-[14px]"
              style={{ borderBottom: "1px solid #d9d9d9" }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#767676",
                  letterSpacing: "0.12px",
                }}
              >
                EMAIL ADDRESS
              </span>

              <input
                placeholder="Enter email address"
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#000",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
          </AccordionSection>

          <AccordionSection title="Professional Information">
            <div
              className="flex flex-col gap-[6px] py-[14px]"
              style={{ borderBottom: "1px solid #d9d9d9" }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#767676",
                  letterSpacing: "0.12px",
                }}
              >
                OCCUPATION
              </span>
              <input
                placeholder="Enter occupation"
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#000",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>

            <div
              className="flex flex-col gap-[6px] py-[14px]"
              style={{ borderBottom: "1px solid #d9d9d9" }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#767676",
                  letterSpacing: "0.12px",
                }}
              >
                ORGANIZATION
              </span>
              <input
                placeholder="Enter organization"
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#000",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
          </AccordionSection>

          <AccordionSection title="Supporting Document">
            <div
              className="flex flex-col items-center justify-center w-full rounded-[12px] gap-[12px] mt-[12px]"
              style={{
                border: "2px dashed #d9d9d9",
                padding: "24px",
                minHeight: "140px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: "48px", height: "48px", backgroundColor: "#e8f0fb" }}
              >
                <span style={{ fontSize: "22px" }}>📄</span>
              </div>

              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "14px",
                  color: "#5e5757",
                  textAlign: "center",
                }}
              >
                Drag & drop your file here
              </p>

              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#a09898",
                  textAlign: "center",
                }}
              >
                Accepted Formats: PDF, JPG, PNG · (Max 5 MB per file)
              </p>

              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898" }}>or</p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center rounded-[8px]"
                style={{
                  height: "36px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  backgroundColor: "#025fc9",
                }}
              >
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  Browse files
                </span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
            </div>

            <button className="flex items-center gap-[6px] py-[12px]">
              <Plus size={18} className="text-[#025fc9]" />
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#025fc9",
                  letterSpacing: "0.14px",
                }}
              >
                Upload another
              </span>
            </button>
          </AccordionSection>

          {/* Save button */}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "24px" }}
          >
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "0.16px",
              }}
            >
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}