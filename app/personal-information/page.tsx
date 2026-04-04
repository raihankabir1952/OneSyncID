"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Pencil, ChevronDown, Plus } from "lucide-react";

const GENDERS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const RELIGIONS = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];
const ETHNICITIES = ["Bengali", "Chakma", "Marma", "Other"];
const CITIZENSHIP_TYPES = ["By Birth", "By Descent", "Naturalized"];

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-[6px] w-full py-[16px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
}

function SelectField({ label, value, placeholder, options, onChange }: SelectFieldProps) {
  return (
    <Field label={label}>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent pr-6"
          style={{ ...fontSwitzer, fontSize: "16px", color: value ? "#000" : "#a09898", letterSpacing: "0.16px", border: "none", outline: "none" }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none" />
      </div>
    </Field>
  );
}

export default function PersonalInformationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstMiddleNames: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    country: "",
    citizenshipType: "",
    religion: "",
    maritalStatus: "",
    ethnicity: "",
    disabilitiesVisible: false,
  });

  const update = (key: keyof typeof form, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  // Calculate age from DOB
  const calcAge = (dob: string) => {
    if (!dob) return "";
    const birth = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    return isNaN(age) ? "" : String(age);
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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px" }}
        >
          {/* Heading */}
          <div className="flex items-center justify-between w-full" style={{ marginBottom: "20px" }}>
            <div className="flex items-center gap-[5px]">
              <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
                Personal Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>
            <Pencil size={20} className="text-[#5e5757]" />
          </div>

          {/* Form fields */}
          <Field label="FIRST AND MIDDLE NAMES">
            <input
              value={form.firstMiddleNames}
              onChange={(e) => update("firstMiddleNames", e.target.value)}
              placeholder="Your first and middle names"
              style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px", border: "none", outline: "none", width: "100%", background: "transparent" }}
            />
          </Field>

          <Field label="LAST NAME">
            <input
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Your last name"
              style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px", border: "none", outline: "none", width: "100%", background: "transparent" }}
            />
          </Field>

          <Field label="DATE OF BIRTH">
            <div className="flex items-center justify-between w-full">
              <input
                type="date"
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
                placeholder="mm/dd/yyyy"
                style={{ ...fontSwitzer, fontSize: "16px", color: form.dob ? "#000" : "#a09898", letterSpacing: "0.16px", border: "none", outline: "none", background: "transparent", flex: 1 }}
              />
            </div>
          </Field>

          <Field label="AGE">
            <span style={{ ...fontSwitzer, fontSize: "16px", color: form.dob ? "#000" : "#a09898", letterSpacing: "0.16px" }}>
              {form.dob ? calcAge(form.dob) : "Calculated from Date of Birth"}
            </span>
          </Field>

          <SelectField label="GENDER" value={form.gender} placeholder="Select gender" options={GENDERS} onChange={(v) => update("gender", v)} />
          <SelectField label="BLOOD GROUP" value={form.bloodGroup} placeholder="Select blood group" options={BLOOD_GROUPS} onChange={(v) => update("bloodGroup", v)} />
          <SelectField label="COUNTRY" value={form.country} placeholder="Select country" options={["Bangladesh", "India", "USA", "UK"]} onChange={(v) => update("country", v)} />

          {/* Citizenship Type */}
          <SelectField label="CITIZENSHIP TYPE" value={form.citizenshipType} placeholder="Select citizenship type" options={CITIZENSHIP_TYPES} onChange={(v) => update("citizenshipType", v)} />

          {/* Add another country */}
          <button className="flex items-center gap-[6px] py-[12px]">
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
              Add another country
            </span>
          </button>

          <SelectField label="RELIGION" value={form.religion} placeholder="Select religion" options={RELIGIONS} onChange={(v) => update("religion", v)} />
          <SelectField label="MARITAL STATUS" value={form.maritalStatus} placeholder="Select marital status" options={MARITAL_STATUSES} onChange={(v) => update("maritalStatus", v)} />
          <SelectField label="ETHNICITY" value={form.ethnicity} placeholder="Select ethnicity" options={ETHNICITIES} onChange={(v) => update("ethnicity", v)} />

          {/* Disabilities toggle */}
          <div className="flex items-center justify-between w-full py-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                DISABILITIES
              </span>
              <span style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px" }}>
                Confidential · Optional
              </span>
            </div>
            <button
              onClick={() => update("disabilitiesVisible", !form.disabilitiesVisible)}
              className="relative inline-flex items-center rounded-full shrink-0"
              style={{
                width: "44px",
                height: "24px",
                backgroundColor: form.disabilitiesVisible ? "#025fc9" : "#d9d9d9",
                transition: "background-color 0.2s",
              }}
            >
              <span
                className="inline-block rounded-full bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  transform: form.disabilitiesVisible ? "translateX(22px)" : "translateX(2px)",
                  transition: "transform 0.2s",
                }}
              />
            </button>
          </div>

          {/* Save button */}
          <button
            onClick={() => router.push("/address")}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "24px" }}
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