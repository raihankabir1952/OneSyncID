"use client";

import { useState } from "react";
import { User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fontSwitzer } from "@/lib/styles";

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say" | "";

type Props = {
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  isActive: boolean;
  onFullNameChange: (value: string) => void;
  onDateOfBirthChange: (value: string) => void;
  onGenderChange: (value: Gender) => void;
};

const genderOptions: { label: string; value: Gender }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-binary", value: "non-binary" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
];

// Validation functions
function validateFullName(name: string): string {
  if (!name.trim()) return "Full name is required";
  if (name.trim().length < 3) return "Name must be at least 3 characters";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
  return "";
}

// Max date: 13 years ago
function getMaxDate(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 13);
  return date;
}

// Min date: 120 years ago
function getMinDate(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 120);
  return date;
}

export default function PersonalInfoSection({
  fullName,
  dateOfBirth,
  gender,
  isActive,
  onFullNameChange,
  onDateOfBirthChange,
  onGenderChange,
}: Props) {
  const [nameTouched, setNameTouched] = useState(false);
  const [dobTouched, setDobTouched] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dateOfBirth ? new Date(dateOfBirth) : null
  );

  const nameError = nameTouched ? validateFullName(fullName) : "";

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setDobTouched(true);
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      onDateOfBirthChange(`${month}/${day}/${year}`);
    } else {
      onDateOfBirthChange("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p style={fontSwitzer} className="text-[14px] text-[#767676]">
        PERSONAL INFORMATION
      </p>
      <div
        className={`border rounded-xl overflow-hidden transition-all ${
          isActive
            ? "border-[rgba(2,95,201,0.4)] shadow-[0_0_3px_2px_rgba(2,95,201,0.1)]"
            : "border-[#d9d9d9]"
        }`}
      >
        {/* Full Name */}
        <div className="flex items-start gap-2 px-4 py-5 border-b border-[#d9d9d9]">
          <User size={20} className="text-[#5e5757] mt-1 shrink-0" />
          <div className="flex flex-col gap-1 flex-1">
            <label
              style={fontSwitzer}
              className={`text-[16px] font-medium tracking-[0.16px] ${
                isActive && fullName ? "text-[#025fc9]" : "text-[#5e5757]"
              }`}
            >
              FULL NAME
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              onBlur={() => setNameTouched(true)}
              style={fontSwitzer}
              className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none"
            />
            {nameError && (
              <p style={fontSwitzer} className="text-[12px] text-[#ff3838] mt-1">
                {nameError}
              </p>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex items-start gap-2 px-4 py-5 border-b border-[#d9d9d9]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <div className="flex flex-col gap-1 flex-1">
            <label style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
              DATE OF BIRTH
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              maxDate={getMaxDate()}
              minDate={getMinDate()}
              dateFormat="MM/dd/yyyy"
              placeholderText="mm/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none w-full"
              calendarClassName="onesync-calendar"
              wrapperClassName="w-full"
            />
            {dobTouched && !selectedDate && (
              <p style={fontSwitzer} className="text-[12px] text-[#ff3838] mt-1">
                Date of birth is required
              </p>
            )}
            {selectedDate && (
              <p style={fontSwitzer} className="text-[12px] text-[#11a75c] mt-1">
                ✓ Valid date of birth
              </p>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-start gap-2 px-4 py-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
            <circle cx="12" cy="8" r="4" />
            <line x1="12" y1="12" x2="12" y2="22" />
            <line x1="8" y1="18" x2="16" y2="18" />
            <line x1="12" y1="4" x2="12" y2="0" />
            <line x1="10" y1="2" x2="14" y2="2" />
          </svg>
          <div className="flex flex-col gap-3 flex-1">
            <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
              GENDER
            </p>
            <div className="flex flex-wrap gap-3">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onGenderChange(option.value)}
                  style={fontSwitzer}
                  className={`px-3 py-1 rounded-lg text-[16px] border transition-all ${
                    gender === option.value
                      ? "border-[#025fc9] text-[#025fc9] bg-[rgba(2,95,201,0.05)]"
                      : "border-[#d9d9d9] text-[#767676]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {!gender && (
              <p style={fontSwitzer} className="text-[12px] text-[#a09898]">
                Please select your gender
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Calendar custom styles */}
      <style>{`
        .onesync-calendar {
          font-family: 'Switzer', sans-serif !important;
          border: 1px solid #d9d9d9 !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }

        .onesync-calendar .react-datepicker__header {
          background-color: #025fc9 !important;
          border-radius: 12px 12px 0 0 !important;
          border: none !important;
        }
        .onesync-calendar .react-datepicker__current-month,
        .onesync-calendar .react-datepicker__day-name {
          color: white !important;
        }
        .onesync-calendar .react-datepicker__navigation-icon::before {
          border-color: white !important;
        }
        .onesync-calendar .react-datepicker__day--selected {
          background-color: #025fc9 !important;
          border-radius: 50% !important;
        }
        .onesync-calendar .react-datepicker__day:hover {
          background-color: rgba(2,95,201,0.1) !important;
          border-radius: 50% !important;
        }
        .onesync-calendar .react-datepicker__month-select,
        .onesync-calendar .react-datepicker__year-select {
          border: 1px solid #d9d9d9 !important;
          border-radius: 6px !important;
          padding: 2px 4px !important;
          color: white !important;
          background-color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </div>
  );
}
