"use client";

import { fontSwitzer } from "@/lib/styles";

const imgBoxiconsLocation = "https://www.figma.com/api/mcp/asset/b1fe03cc-4c9f-4a87-8790-3fe9beca4b3e";
const imgCity = "https://www.figma.com/api/mcp/asset/f1285097-22e6-46fc-bc9f-8f716cebc09a";
const imgMageLocationFill = "https://www.figma.com/api/mcp/asset/754775ab-c889-4d84-b21a-ed85d4f6ac96";

type Props = {
  state: string;
  city: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
};

export default function LocationSection({ state, city, onStateChange, onCityChange }: Props) {
  return (
    <div className="flex flex-col gap-[15px]">

      {/* State & City */}
      <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">
        <div className="flex items-center h-[61px] px-4 gap-5">

          {/* State */}
          <div className="flex-1 flex items-center gap-2 border-r border-[#d9d9d9] h-full">
            <div className="relative shrink-0 size-[20px]">
              <img
                alt=""
                className="absolute block max-w-none size-full"
                src={imgBoxiconsLocation}
              />
            </div>
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
            <div className="overflow-clip relative shrink-0 size-[20px]">
              <div className="absolute inset-[8.33%]">
                <div className="absolute inset-[-4.5%_-4.49%_-4.5%_-4.5%]">
                  <img
                    alt=""
                    className="block max-w-none size-full"
                    src={imgCity}
                  />
                </div>
              </div>
            </div>
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
      <button
        type="button"
        className="flex items-center gap-2 px-5"
      >
        <div className="relative shrink-0 size-[20px]">
          <img
            alt=""
            className="absolute block max-w-none size-full"
            src={imgMageLocationFill}
          />
        </div>
        <span style={fontSwitzer} className="text-[16px] font-medium text-[#0052b4]">
          Use My Current Location
        </span>
      </button>
    </div>
  );
}