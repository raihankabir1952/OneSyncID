"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft } from "lucide-react";

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
    { id: 1, name: "Jackie Doe", username: "@onesyncid_jackie_doe", phoneNumber: "+8801234998765", sourceDevice: "iPhone 12", lastSynced: "1 day ago" },
    { id: 2, name: "Jackie Doe", username: "@onesyncid_jackie_doe", phoneNumber: "+8801234998765", sourceDevice: "iPhone 12", lastSynced: "1 day ago" },
  ]);

  const removeContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
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
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px", gap: "0px" }}
        >
          {/* Back + Title */}
          <div className="flex items-center gap-[12px]" style={{ marginBottom: "24px" }}>
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} className="text-black" />
            </button>
            <span style={{ ...fontSwitzer, fontSize: "18px", fontWeight: 600, color: "#000", letterSpacing: "0.8px" }}>
              Synced Contacts
            </span>
          </div>

          {/* Contact list */}
          {contacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="flex flex-col gap-[10px] w-full py-[16px]"
              style={{ borderBottom: idx < contacts.length - 1 ? "1px solid #d9d9d9" : "none" }}
            >
              {/* User row */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[10px]">
                  <div
                    className="rounded-full shrink-0"
                    style={{ width: "40px", height: "40px", backgroundColor: "#c8c8c8" }}
                  />
                  <div className="flex flex-col gap-[2px]">
                    <div className="flex items-center gap-[4px]">
                      <span style={{ ...fontSwitzer, fontSize: "15px", fontWeight: 600, color: "#000", letterSpacing: "0.15px" }}>
                        {contact.name}
                      </span>
                      <span style={{ color: "#025fc9", fontSize: "14px" }}>✓</span>
                    </div>
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                      {contact.username}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeContact(contact.id)}>
                  <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#f04438", letterSpacing: "0.14px" }}>
                    Remove
                  </span>
                </button>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-[4px]">
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                  Phone Number: <span style={{ color: "#000", fontWeight: 500 }}>{contact.phoneNumber}</span>
                </span>
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                  Source Device: 📱 <span style={{ color: "#000", fontWeight: 500 }}>{contact.sourceDevice}</span>
                </span>
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                  Last Synced: <span style={{ color: "#000", fontWeight: 500 }}>{contact.lastSynced}</span>
                </span>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="flex items-center justify-center w-full" style={{ paddingTop: "60px" }}>
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