"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, BadgeCheck, Smartphone } from "lucide-react";

interface SyncedContact {
  id: number;
  name: string;
  username: string;
  phoneNumber: string;
  sourceDevice: string;
  lastSynced: string;
}

export default function SyncedContactsPage() {
  const router = useRouter();

  const [contacts, setContacts] = useState<SyncedContact[]>([
    {
      id: 1,
      name: "Jackie Doe",
      username: "@onesyncid_jackie_doe",
      phoneNumber: "+8801234998765",
      sourceDevice: "iPhone 12",
      lastSynced: "1 day ago",
    },
    {
      id: 2,
      name: "Jackie Doe",
      username: "@onesyncid_jackie_doe",
      phoneNumber: "+8801234998765",
      sourceDevice: "iPhone 12",
      lastSynced: "1 day ago",
    },
  ]);

  const removeContact = (id: number) =>
    setContacts((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Manage Synced Contacts
          </span>
        </div>

        {/* Contact list */}
        <div className="flex flex-col w-full">
          {contacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="flex flex-col gap-[20px] py-[20px]"
              style={{ borderBottom: idx < contacts.length - 1 ? "1px solid #d9d9d9" : "none" }}
            >
              {/* Avatar + name + remove */}
              <div className="flex items-start justify-between w-full">
                <div className="flex gap-[10px] items-start">
                  <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
                    <Image src="/images/profile-avatar.png" alt={contact.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex gap-[8px] items-center">
                      <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                        {contact.name}
                      </span>
                      <BadgeCheck size={16} className="text-[#025fc9]" fill="#025fc9" color="white" strokeWidth={2} />
                    </div>
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#025fc9", letterSpacing: "0.12px" }}>
                      {contact.username}
                    </span>
                  </div>
                </div>
                <button type="button" onClick={() => removeContact(contact.id)}>
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#fa1212", letterSpacing: "0.14px", lineHeight: "1.3" }}>
                    Remove
                  </span>
                </button>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-[8px]">
                {/* Phone Number */}
                <p style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                  Phone Number:{" "}
                  <span style={{ fontWeight: 500, color: "#000" }}>{contact.phoneNumber}</span>
                </p>
                {/* Source Device */}
                <div className="flex gap-[4px] items-center">
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                    Source Device:
                  </span>
                  <div className="flex gap-[5px] items-center">
                    <Smartphone size={14} className="text-[#333] shrink-0" />
                    <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#000" }}>
                      {contact.sourceDevice}
                    </span>
                  </div>
                </div>
                {/* Last Synced */}
                <p style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
                  Last Synced:{" "}
                  <span style={{ fontWeight: 500, color: "#000" }}>{contact.lastSynced}</span>
                </p>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="flex items-center justify-center w-full pt-[60px]">
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#a09898", letterSpacing: "0.14px" }}>
                No synced contacts
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}