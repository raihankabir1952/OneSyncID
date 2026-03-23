"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, User, Copy, FileText, Shield, ChevronDown, AlertCircle } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const TIME_SLOTS = ["8-10 AM", "10 AM - 12 PM", "1 - 2 PM", "4 - 6 PM"];
const ACCESSIBILITY_OPTIONS = ["Hearing Aid", "Tourette Syndrome", "Autism", "Visual Support"];
const LANGUAGES = ["Bengali", "English"];
const DAYS = ["Any day this week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

interface FormErrors {
  title?: string;
  description?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
}

export default function AgentSupportPage() {
  const router = useRouter();

  const [preferredMode, setPreferredMode] = useState<"phone" | "email">("phone");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState("Any day this week");
  const [selectedLanguage, setSelectedLanguage] = useState("Bengali");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const CASE_ID = "OSY-658902";

  const handleCopy = () => {
    navigator.clipboard.writeText(CASE_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAccessibility = (option: string) => {
    setSelectedAccessibility((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim())
      newErrors.title = "Title is required";

    if (!description.trim())
      newErrors.description = "Description is required";
    else if (description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";

    if (!fullName.trim())
      newErrors.fullName = "Full name is required";

    if (preferredMode === "phone") {
      if (!phoneNumber.trim())
        newErrors.phoneNumber = "Phone number is required";
      else if (!/^[0-9]{10,11}$/.test(phoneNumber.replace(/\s/g, "")))
        newErrors.phoneNumber = "Enter a valid phone number";
    } else {
      if (!email.trim())
        newErrors.email = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    router.push("/support/case");
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isSubmitDisabled =
    !title.trim() ||
    !description.trim() ||
    !fullName.trim() ||
    (preferredMode === "phone" ? !phoneNumber.trim() : !email.trim());

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
          <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
            Agent Support
          </h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-[30px] px-5 pt-[20px] pb-10">

            {/* Preferred Mode */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                PREFERRED MODE
              </p>
              <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-[12px] flex items-center px-[10px] py-[8px] gap-[8px]">
                <button
                  onClick={() => {
                    setPreferredMode("phone");
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  style={fontSwitzer}
                  className={`flex flex-1 gap-[8px] items-center justify-center p-[8px] rounded-[8px] transition-all ${
                    preferredMode === "phone"
                      ? "bg-white border border-[#025fc9] text-[#025fc9]"
                      : "text-[#5e5757]"
                  }`}
                >
                  <Phone size={18} />
                  <span className="text-[16px] font-medium">Phone</span>
                </button>
                <button
                  onClick={() => {
                    setPreferredMode("email");
                    setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                  }}
                  style={fontSwitzer}
                  className={`flex flex-1 gap-[8px] items-center justify-center p-[8px] rounded-[8px] transition-all ${
                    preferredMode === "email"
                      ? "bg-white border border-[#025fc9] text-[#025fc9]"
                      : "text-[#5e5757]"
                  }`}
                >
                  <Mail size={18} />
                  <span className="text-[16px] font-medium">Email</span>
                </button>
              </div>
            </div>

            {/* Case ID */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                CASE ID (AUTO-GENERATED)
              </p>
              <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-5">
                  <p style={fontSwitzer} className="text-[16px] text-[#5e5757]">{CASE_ID}</p>
                  <button onClick={handleCopy} className="flex items-center gap-1">
                    <Copy size={18} className={copied ? "text-[#025fc9]" : "text-[#a09898]"} />
                    {copied && (
                      <span style={fontSwitzer} className="text-[12px] text-[#025fc9]">Copied!</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Issue Details */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                ISSUE DETAILS
              </p>
              <div className={`bg-white border rounded-[12px] overflow-hidden ${
                errors.title || errors.description ? "border-red-400" : "border-[#d9d9d9]"
              }`}>
                {/* Title */}
                <div className={`border-b px-4 py-5 ${errors.title ? "border-red-200" : "border-[#d9d9d9]"}`}>
                  <div className="flex gap-[8px] items-start">
                    <User size={20} className="text-[#a09898] shrink-0 mt-[2px]" />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">
                        TITLE <span className="text-red-500">*</span>
                      </p>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); clearError("title"); }}
                        placeholder="Can't sign in, password not working"
                        style={fontSwitzer}
                        className="text-[16px] text-black placeholder:text-[#a09898] outline-none w-full bg-transparent"
                      />
                      {errors.title && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle size={12} className="text-red-500" />
                          <p style={fontSwitzer} className="text-[12px] text-red-500">{errors.title}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div className="px-4 py-5">
                  <div className="flex gap-[8px] items-start">
                    <FileText size={20} className="text-[#a09898] shrink-0 mt-[2px]" />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">
                        DESCRIPTION <span className="text-red-500">*</span>
                      </p>
                      <textarea
                        value={description}
                        onChange={(e) => { setDescription(e.target.value); clearError("description"); }}
                        placeholder="I'm unable to sign in to my OneSync account..."
                        rows={4}
                        style={fontSwitzer}
                        className="text-[16px] text-black placeholder:text-[#a09898] outline-none w-full bg-transparent resize-none"
                      />
                      {errors.description && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle size={12} className="text-red-500" />
                          <p style={fontSwitzer} className="text-[12px] text-red-500">{errors.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload File */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                UPLOAD FILE (OPTIONAL)
              </p>
              <div className="border border-[#d9d9d9] rounded-[12px] flex flex-col items-center gap-[8px] py-[16px] px-4">
                <FileText size={24} className="text-[#a09898]" />
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#5e5757] text-center">
                  Upload your file here
                </p>
                <div className="flex items-center gap-[5px]">
                  <p style={fontSwitzer} className="text-[12px] text-[#a0a0a0]">Accepted Formats: PDF, JPG, PNG</p>
                  <p style={fontSwitzer} className="text-[12px] text-[#a0a0a0]">(Max 5 MB per file)</p>
                </div>
                <button style={fontSwitzer} className="bg-[#025fc9] text-white text-[16px] font-medium px-[10px] py-[8px] rounded-[8px]">
                  Upload
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                CONTACT DETAILS
              </p>
              <div className={`bg-white border rounded-[12px] overflow-hidden ${
                errors.fullName || errors.phoneNumber || errors.email ? "border-red-400" : "border-[#d9d9d9]"
              }`}>
                {/* Full Name */}
                <div className={`border-b px-4 py-5 ${errors.fullName ? "border-red-200" : "border-[#d9d9d9]"}`}>
                  <div className="flex gap-[8px] items-start">
                    <User size={20} className="text-[#a09898] shrink-0 mt-[2px]" />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">
                        FULL NAME <span className="text-red-500">*</span>
                      </p>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value); clearError("fullName"); }}
                        placeholder="Your full name"
                        style={fontSwitzer}
                        className="text-[16px] text-black placeholder:text-[#a09898] outline-none w-full bg-transparent"
                      />
                      {errors.fullName && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle size={12} className="text-red-500" />
                          <p style={fontSwitzer} className="text-[12px] text-red-500">{errors.fullName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className={`border-b px-4 py-5 ${errors.phoneNumber ? "border-red-200" : "border-[#d9d9d9]"}`}>
                  <div className="flex items-start">
                    <div className="flex items-center gap-[8px] shrink-0 pt-[2px]">
                      <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">🇧🇩 +880</span>
                      <ChevronDown size={16} className="text-[#5e5757]" />
                    </div>
                    <div className="w-[1px] h-[48px] bg-[#d9d9d9] mx-3" />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">
                        PHONE NUMBER {preferredMode === "phone" && <span className="text-red-500">*</span>}
                      </p>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value); clearError("phoneNumber"); }}
                        placeholder="Enter your phone number"
                        style={fontSwitzer}
                        className="text-[16px] text-black placeholder:text-[#a09898] outline-none w-full bg-transparent"
                      />
                      {errors.phoneNumber && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle size={12} className="text-red-500" />
                          <p style={fontSwitzer} className="text-[12px] text-red-500">{errors.phoneNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="px-4 py-5">
                  <div className="flex gap-[8px] items-start">
                    <Mail size={20} className="text-[#a09898] shrink-0 mt-[2px]" />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">
                        EMAIL ADDRESS {preferredMode === "email" && <span className="text-red-500">*</span>}
                      </p>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                        placeholder="example@mail.com"
                        style={fontSwitzer}
                        className="text-[16px] text-black placeholder:text-[#a09898] outline-none w-full bg-transparent"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle size={12} className="text-red-500" />
                          <p style={fontSwitzer} className="text-[12px] text-red-500">{errors.email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferred Call Time */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                PREFERRED CALL TIME
              </p>
              <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                <div className="border-b border-[#d9d9d9] px-4 py-5">
                  <div className="flex flex-col gap-[10px]">
                    <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">SELECT A TIME</p>
                    <div className="flex flex-wrap gap-[10px]">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          style={fontSwitzer}
                          className={`px-[12px] py-[5px] rounded-[8px] border text-[16px] transition-all ${
                            selectedTime === slot
                              ? "border-[#025fc9] text-[#025fc9] bg-[rgba(2,95,201,0.05)]"
                              : "border-[#d9d9d9] text-[#767676]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5">
                  <div className="flex flex-col gap-[6px]">
                    <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">PREFERRED DAY</p>
                    <div className="flex items-center justify-between">
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        style={fontSwitzer}
                        className="text-[16px] text-black outline-none bg-transparent w-full appearance-none"
                      >
                        {DAYS.map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      <ChevronDown size={20} className="text-[#5e5757] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Language */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                CONTACT LANGUAGE
              </p>
              <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                <div className="px-4 py-5">
                  <div className="flex flex-col gap-[6px]">
                    <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">PREFERRED LANGUAGE</p>
                    <div className="flex items-center justify-between">
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        style={fontSwitzer}
                        className="text-[16px] text-black outline-none bg-transparent w-full appearance-none"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                      <ChevronDown size={20} className="text-[#5e5757] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility Needs */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                ACCESSIBILITY NEEDS (IF ANY)
              </p>
              <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                <div className="px-4 py-5">
                  <div className="flex flex-col gap-[10px]">
                    <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">
                      SELECT ALL THAT APPLIES
                    </p>
                    <div className="flex flex-wrap gap-[10px]">
                      {ACCESSIBILITY_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleAccessibility(option)}
                          style={fontSwitzer}
                          className={`px-[12px] py-[5px] rounded-[8px] border text-[16px] transition-all ${
                            selectedAccessibility.includes(option)
                              ? "border-[#025fc9] text-[#025fc9] bg-[rgba(2,95,201,0.05)]"
                              : "border-[#d9d9d9] text-[#767676]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="border border-[#d9d9d9] rounded-[12px] flex gap-[8px] items-start px-4 py-[10px]">
              <Shield size={14} className="text-[#a09898] shrink-0 mt-[1px]" />
              <p style={fontSwitzer} className="text-[12px] text-[#a09898] leading-[14px] tracking-[0.12px]">
                Your case will be assigned a reference number. Average response time is under 4 hours during business hours.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              style={fontSwitzer}
              className={`w-full h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white tracking-[0.16px]">
                Submit Case
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
