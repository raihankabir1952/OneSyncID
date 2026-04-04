"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown, Plus, Pencil, MoreVertical, Trash2 } from "lucide-react";

const ADDRESS_TYPES = ["Present", "Permanent", "Business", "Mailing"] as const;
type AddressType = typeof ADDRESS_TYPES[number];

const DOC_TYPES = ["Identity", "Work", "Financial", "Educational", "Property", "Medical", "Other"] as const;
type DocType = typeof DOC_TYPES[number];

interface ProofFile {
  id: number;
  filename: string;
  docType: DocType;
}

interface AddressEntry {
  id: number;
  types: AddressType[];
  sameAsPresent: boolean;
}

function SelectField({ label, placeholder, options }: { label: string; placeholder: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-[6px] w-full py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
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

function TextField({ label, placeholder }: { label: string; placeholder: string }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-[6px] w-full py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
      />
    </div>
  );
}

export default function AddressPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [proofFiles, setProofFiles] = useState<ProofFile[]>([]);
  const [addresses, setAddresses] = useState<AddressEntry[]>([
    { id: 1, types: ["Present"], sameAsPresent: false },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProofFiles((prev) => [...prev, { id: Date.now(), filename: file.name, docType: "Identity" }]);
    e.target.value = "";
  };

  const updateDocType = (id: number, docType: DocType) => {
    setProofFiles((prev) => prev.map((f) => f.id === id ? { ...f, docType } : f));
  };

  const removeFile = (id: number) => {
    setProofFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleAddressType = (addressId: number, type: AddressType) => {
    setAddresses((prev) => prev.map((a) => {
      if (a.id !== addressId) return a;
      const has = a.types.includes(type);
      return { ...a, types: has ? a.types.filter((t) => t !== type) : [...a.types, type] };
    }));
  };

  const addAddress = () => {
    setAddresses((prev) => [...prev, { id: Date.now(), types: [], sameAsPresent: false }]);
  };

  const removeAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
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
                Address
              </span>
              <Info size={16} className="text-[#025fc9]" />
            </div>
            <div className="flex items-center gap-[12px]">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "32px", paddingLeft: "16px", paddingRight: "16px", border: "1px solid #d9d9d9" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>Cancel</span>
              </button>
              <button
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "32px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#025fc9" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#fff", letterSpacing: "0.14px" }}>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Address entries */}
          {addresses.map((address, idx) => (
            <div key={address.id} className="flex flex-col w-full" style={{ marginBottom: "24px" }}>

              {/* Address Type chips */}
              <div className="flex flex-col gap-[8px] w-full py-[14px]" style={{ borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  ADDRESS TYPE
                </span>
                <div className="flex flex-wrap gap-2">
                  {ADDRESS_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleAddressType(address.id, type)}
                      className="flex items-center justify-center rounded-[8px]"
                      style={{
                        paddingLeft: "12px", paddingRight: "12px", paddingTop: "4px", paddingBottom: "4px",
                        border: address.types.includes(type) ? "1px solid #025fc9" : "1px solid #d9d9d9",
                        backgroundColor: address.types.includes(type) ? "rgba(2,95,201,0.08)" : "#fff",
                      }}
                    >
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: address.types.includes(type) ? "#025fc9" : "#5e5757", letterSpacing: "0.14px" }}>
                        {type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <SelectField label="COUNTRY" placeholder="Select country" options={["Bangladesh", "India", "USA", "UK"]} />
              <SelectField label="CITIZENSHIP TYPE" placeholder="Select citizenship type" options={["By Birth", "By Descent", "Naturalized"]} />

              {/* Add another country */}
              <button className="flex items-center gap-[6px] py-[12px]">
                <Plus size={18} className="text-[#025fc9]" />
                <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
                  Add another country
                </span>
              </button>

              <TextField label="ADDRESS" placeholder="House / Street, Area / Block, Road No" />
              <TextField label="ADDITIONAL INSTRUCTIONS" placeholder="Any extra details to identify your address" />
              <SelectField label="DIVISION" placeholder="Select division" options={["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet", "Barisal", "Rangpur", "Mymensingh"]} />
              <SelectField label="DISTRICT" placeholder="Select district" options={["Dhaka", "Gazipur", "Narayanganj"]} />
              <SelectField label="SUB-DISTRICT / UPAZILA" placeholder="Select sub-district or upazila" options={["Dhanmondi", "Gulshan", "Mirpur"]} />
              <SelectField label="POLICE" placeholder="Select police station" options={["Dhanmondi", "Gulshan", "Mirpur"]} />
              <TextField label="POSTAL CODE" placeholder="e.g. 1205" />

              {/* Proof of Address */}
              <div className="flex flex-col gap-[10px] w-full py-[14px]">
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  Proof of Address
                </span>
                <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px" }}>
                  Upload a recent proof of your address (utility bill, rent receipt, bank statement)
                </p>

                {/* Upload box — shown when no files */}
                {proofFiles.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center w-full rounded-[12px] gap-[12px]"
                    style={{ border: "2px dashed #d9d9d9", padding: "24px", minHeight: "140px" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{ width: "48px", height: "48px", backgroundColor: "#e8f0fb" }}
                    >
                      <span style={{ fontSize: "22px" }}>📄</span>
                    </div>
                    <p style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", textAlign: "center", letterSpacing: "0.14px" }}>
                      Drag & drop your file here
                    </p>
                    <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", textAlign: "center", letterSpacing: "0.12px" }}>
                      Accepted Formats: PDF, JPG, PNG · (Max 5 MB per file)
                    </p>
                    <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px" }}>or</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center rounded-[8px]"
                      style={{ height: "36px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#025fc9" }}
                    >
                      <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#fff", letterSpacing: "0.14px" }}>
                        Browse files
                      </span>
                    </button>
                  </div>
                )}

                {/* Uploaded files */}
                {proofFiles.map((file) => (
                  <div key={file.id} className="flex flex-col gap-[10px] p-[16px] rounded-[12px]" style={{ border: "1px solid #d9d9d9" }}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-[10px]">
                        <div className="rounded-[6px] overflow-hidden" style={{ width: "44px", height: "32px", backgroundColor: "#f0f0f0" }} />
                        <div className="flex flex-col gap-[2px]">
                          <div className="flex items-center gap-[6px]">
                            <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>{file.filename}</span>
                            <Pencil size={14} className="text-[#5e5757]" />
                          </div>
                          <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>Upload Date: 24/10/2025</span>
                        </div>
                      </div>
                      <button onClick={() => removeFile(file.id)}>
                        <MoreVertical size={20} className="text-[#5e5757]" />
                      </button>
                    </div>

                    {/* Doc type chips */}
                    <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px" }}>Select document type</p>
                    <div className="flex flex-wrap gap-2">
                      {DOC_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateDocType(file.id, type)}
                          className="flex items-center justify-center rounded-[8px]"
                          style={{
                            paddingLeft: "8px", paddingRight: "8px", paddingTop: "3px", paddingBottom: "3px",
                            border: file.docType === type ? "1px solid #025fc9" : "1px solid #d9d9d9",
                            backgroundColor: file.docType === type ? "rgba(2,95,201,0.1)" : "#fff",
                          }}
                        >
                          <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: file.docType === type ? "#025fc9" : "#5e5757", letterSpacing: "0.12px" }}>
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Upload another */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-[6px]"
                >
                  <Plus size={18} className="text-[#025fc9]" />
                  <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
                    Upload another
                  </span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {/* Same as Present checkbox */}
              {idx > 0 && (
                <div className="flex items-center justify-between w-full py-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <span style={{ ...fontSwitzer, fontSize: "14px", color: "#5e5757", letterSpacing: "0.14px" }}>
                      Same as
                    </span>
                    <div className="flex items-center gap-[4px]">
                      <span style={{ ...fontSwitzer, fontSize: "14px", color: "#025fc9", letterSpacing: "0.14px" }}>Present address</span>
                      <ChevronDown size={14} className="text-[#025fc9]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757" }}>tick the checkbox</span>
                    <button
                      onClick={() => setAddresses((prev) => prev.map((a) => a.id === address.id ? { ...a, sameAsPresent: !a.sameAsPresent } : a))}
                      className="flex items-center justify-center rounded-[4px]"
                      style={{
                        width: "20px", height: "20px",
                        border: address.sameAsPresent ? "none" : "2px solid #d9d9d9",
                        backgroundColor: address.sameAsPresent ? "#025fc9" : "#fff",
                      }}
                    >
                      {address.sameAsPresent && <span style={{ color: "#fff", fontSize: "12px" }}>✓</span>}
                    </button>
                  </div>
                </div>
              )}

              {/* Delete address */}
              {idx > 0 && (
                <button
                  onClick={() => removeAddress(address.id)}
                  className="flex items-center gap-[6px] py-[8px]"
                >
                  <Trash2 size={16} className="text-red-500" />
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#f04438", letterSpacing: "0.14px" }}>Remove address</span>
                </button>
              )}
            </div>
          ))}

          {/* Add another address */}
          <button onClick={addAddress} className="flex items-center gap-[6px] py-[8px]">
            <Plus size={18} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "14px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>
              Add another address
            </span>
          </button>

          {/* Save button */}
          <button
            onClick={() => router.push("/family-information")}
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