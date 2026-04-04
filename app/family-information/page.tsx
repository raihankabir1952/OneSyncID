"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Pencil, ChevronDown, Plus, Users, RefreshCw, X } from "lucide-react";

type TagStatus = "untagged" | "manual" | "tagged" | "pending" | "failed";

interface FamilyMember {
  id: string;
  label: string;
  status: TagStatus;
  taggedName?: string;
  taggedUsername?: string;
  firstName?: string;
  lastName?: string;
  nid?: string;
  email?: string;
  phone?: string;
  socialMedia?: string;
}

function TagCard({
  member,
  onTag,
  onManual,
  onRetry,
  onRemove,
  onFieldChange,
}: {
  member: FamilyMember;
  onTag: () => void;
  onManual: () => void;
  onRetry: () => void;
  onRemove: () => void;
  onFieldChange: (key: string, val: string) => void;
}) {
  if (member.status === "untagged") {
    return (
      <div
        className="flex flex-col items-center gap-[12px] w-full rounded-[12px] p-[16px]"
        style={{ border: "1px solid #d9d9d9" }}
      >
        <p style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
          Link via OneSyncID or enter manually
        </p>
        <button
          onClick={onTag}
          className="flex items-center justify-center w-full rounded-[8px] gap-[8px]"
          style={{ height: "44px", backgroundColor: "rgba(2,95,201,0.1)", border: "1px solid rgba(2,95,201,0.2)" }}
        >
          <Users size={18} className="text-[#025fc9]" />
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
            Tag OneSyncID
          </span>
        </button>
        <button className="flex items-center gap-[4px]">
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#025fc9", letterSpacing: "0.14px" }}>
            Having trouble tagging
          </span>
          <ChevronDown size={14} className="text-[#025fc9]" />
        </button>
      </div>
    );
  }

  if (member.status === "tagged") {
    return (
      <div className="flex flex-col gap-[0px] w-full">
        {/* Tagged chip */}
        <div
          className="flex items-center gap-[8px] rounded-[20px] self-start mb-[16px]"
          style={{ backgroundColor: "#e8f5e9", border: "1px solid #c8e6c9", paddingLeft: "10px", paddingRight: "10px", paddingTop: "4px", paddingBottom: "4px" }}
        >
          <div className="w-5 h-5 rounded-full bg-gray-300 overflow-hidden">
            <div className="w-full h-full bg-[#bdbdbd]" />
          </div>
          <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#2e7d32", letterSpacing: "0.14px" }}>
            {member.taggedName}
          </span>
          <span style={{ color: "#2e7d32", fontSize: "14px" }}>✓</span>
        </div>

        {/* Fields */}
        {[
          { label: "FATHER'S FIRST AND MIDDLE NAMES", key: "firstName", placeholder: "Father's first and middle names", value: member.firstName || "" },
          { label: "LAST NAME", key: "lastName", placeholder: "Father's last name", value: member.lastName || "" },
        ].map((f) => (
          <div key={f.key} className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
            <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>{f.label}</span>
            <input
              value={f.value}
              onChange={(e) => onFieldChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (member.status === "pending") {
    return (
      <div className="flex flex-col gap-[0px] w-full">
        <p style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#996500", letterSpacing: "0.12px", marginBottom: "8px" }}>
          Pending approval
        </p>
        <div
          className="flex items-center gap-[8px] rounded-[20px] self-start"
          style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082", paddingLeft: "10px", paddingRight: "10px", paddingTop: "4px", paddingBottom: "4px" }}
        >
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#996500", letterSpacing: "0.14px" }}>
            {member.taggedUsername}
          </span>
          <button onClick={onRemove}>
            <X size={14} className="text-[#996500]" />
          </button>
        </div>
      </div>
    );
  }

  if (member.status === "failed") {
    return (
      <div className="flex flex-col gap-[0px] w-full">
        <p style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#f04438", letterSpacing: "0.12px", marginBottom: "8px" }}>
          Approval failed
        </p>
        <div
          className="flex items-center gap-[8px] rounded-[20px] self-start"
          style={{ backgroundColor: "#fff0f0", border: "1px solid #fde3e0", paddingLeft: "10px", paddingRight: "10px", paddingTop: "4px", paddingBottom: "4px" }}
        >
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#f04438", letterSpacing: "0.14px" }}>
            {member.taggedUsername}
          </span>
          <button onClick={onRetry}>
            <RefreshCw size={14} className="text-[#f04438]" />
          </button>
          <button onClick={onRemove}>
            <X size={14} className="text-[#f04438]" />
          </button>
        </div>
      </div>
    );
  }

  // manual entry
  return (
    <div className="flex flex-col gap-[0px] w-full">
      {[
        { label: "FATHER'S FIRST AND MIDDLE NAMES", key: "firstName", placeholder: "Father's first and middle names", value: member.firstName || "" },
        { label: "LAST NAME", key: "lastName", placeholder: "Father's last name", value: member.lastName || "" },
        { label: "NID NUMBER", key: "nid", placeholder: "Enter NID card number", value: member.nid || "" },
        { label: "EMAIL ADDRESS", key: "email", placeholder: "Enter your email address", value: member.email || "" },
        { label: "PHONE NUMBER", key: "phone", placeholder: "Enter your number", value: member.phone || "" },
        { label: "SOCIAL MEDIA / WEBSITE LINK", key: "socialMedia", placeholder: "Enter social media or website link", value: member.socialMedia || "" },
      ].map((f) => (
        <div key={f.key} className="flex flex-col gap-[6px] py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
          <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>{f.label}</span>
          <input
            value={f.value}
            onChange={(e) => onFieldChange(f.key, e.target.value)}
            placeholder={f.placeholder}
            style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function FamilyInformationPage() {
  const router = useRouter();

  const [members, setMembers] = useState<FamilyMember[]>([
    { id: "father", label: "FATHER'S DETAILS", status: "untagged" },
    { id: "mother", label: "MOTHER'S DETAILS", status: "untagged" },
    { id: "spouse", label: "SPOUSE'S DETAILS", status: "untagged" },
  ]);

  const [extraMembers, setExtraMembers] = useState<FamilyMember[]>([]);

  const updateStatus = (id: string, status: TagStatus, extra?: Partial<FamilyMember>) => {
    const update = (list: FamilyMember[]) =>
      list.map((m) => m.id === id ? { ...m, status, ...extra } : m);
    setMembers((prev) => update(prev));
    setExtraMembers((prev) => update(prev));
  };

  const updateField = (id: string, key: string, val: string) => {
    const update = (list: FamilyMember[]) =>
      list.map((m) => m.id === id ? { ...m, [key]: val } : m);
    setMembers((prev) => update(prev));
    setExtraMembers((prev) => update(prev));
  };

  const handleTag = (id: string) => {
    // Simulate tagging — in real app this opens a search/modal
    updateStatus(id, "pending", { taggedUsername: "onesync_user_" + id });
  };

  const allMembers = [...members, ...extraMembers];

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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "24px" }}
        >
          {/* Heading */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[5px]">
              <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
                Family Information
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>
            <Pencil size={20} className="text-[#5e5757]" />
          </div>

          {/* Family members */}
          {allMembers.map((member) => (
            <div key={member.id} className="flex flex-col gap-[12px] w-full">
              <div className="flex items-center justify-between w-full">
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  {member.label}
                </span>
                {(member.status === "manual" || member.status === "tagged") && (
                  <button
                    onClick={() => updateStatus(member.id, "untagged")}
                    className="flex items-center gap-[4px]"
                  >
                    <Users size={14} className="text-[#025fc9]" />
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>
                      Tag OneSyncID
                    </span>
                  </button>
                )}
              </div>

              <TagCard
                member={member}
                onTag={() => handleTag(member.id)}
                onManual={() => updateStatus(member.id, "manual")}
                onRetry={() => updateStatus(member.id, "pending", { taggedUsername: member.taggedUsername })}
                onRemove={() => updateStatus(member.id, "untagged")}
                onFieldChange={(key, val) => updateField(member.id, key, val)}
              />
            </div>
          ))}

          {/* Add children & sibling */}
          <button
            onClick={() => setExtraMembers((prev) => [...prev, {
              id: "child_" + Date.now(),
              label: "CHILD'S DETAILS",
              status: "untagged",
            }])}
            className="flex items-center gap-[6px]"
          >
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
              Add children details
            </span>
          </button>

          <button
            onClick={() => setExtraMembers((prev) => [...prev, {
              id: "sibling_" + Date.now(),
              label: "SIBLING'S DETAILS",
              status: "untagged",
            }])}
            className="flex items-center gap-[6px]"
          >
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
              Add sibling details
            </span>
          </button>

          {/* Save button */}
          <button
            onClick={() => router.push("/")}
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