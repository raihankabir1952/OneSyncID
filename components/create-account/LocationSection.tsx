"use client";

import { MapPin } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type Props = {
  state: string;
  city: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
};

export default function LocationSection({ state, city, onStateChange, onCityChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p style={fontSwitzer} className="text-[14px] text-[#767676]">
        LOCATION
      </p>
      <div className="flex flex-col gap-4">
        {/* State & City */}
        <div className="border border-[#d9d9d9] rounded-xl overflow-hidden">
          <div className="flex items-center h-[61px] px-4 gap-5">
            {/* State */}
            <div className="flex-1 flex items-center gap-2 border-r border-[#d9d9d9] h-full">
              <MapPin size={20} className="text-[#5e5757] shrink-0" />
              <input
                type="text"
                placeholder="STATE"
                value={state}
                onChange={(e) => onStateChange(e.target.value)}
                style={fontSwitzer}
                className="text-[16px] font-medium text-[#5e5757] placeholder-[#5e5757] bg-transparent outline-none border-none w-full tracking-[0.16px]"
              />
            </div>
            {/* City */}
            <div className="flex-1 flex items-center gap-2 h-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="2" y="7" width="20" height="15" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="12" />
              </svg>
              <input
                type="text"
                placeholder="CITY"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                style={fontSwitzer}
                className="text-[16px] font-medium text-[#5e5757] placeholder-[#5e5757] bg-transparent outline-none border-none w-full tracking-[0.16px]"
              />
            </div>
          </div>
        </div>

        {/* Use My Current Location */}
        <button className="flex items-center gap-2 px-5">
          <MapPin size={20} className="text-[#0052b4]" fill="#0052b4" />
          <span style={fontSwitzer} className="text-[16px] font-medium text-[#0052b4]">
            Use My Current Location
          </span>
        </button>
      </div>
    </div>
  );
}
