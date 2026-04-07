"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import Sidebar from "@/components/Sidebar";
import { Menu, Bell, Mail, Search, Info, ChevronDown } from "lucide-react";

const FILTER_OPTIONS = ["Last 7 Days", "Last 30 Days", "Last 3 Months", "Last Year"];

// Simple line chart data
const CHART_DATA = [
  { day: "Nov 1", value: 3 },
  { day: "Nov 2", value: 7 },
  { day: "Nov 3", value: 5 },
  { day: "Nov 4", value: 10 },
  { day: "Nov 5", value: 8 },
  { day: "Nov 6", value: 12 },
  { day: "Nov 7", value: 6 },
];

function LineChart({ data }: { data: { day: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const width = 320;
  const height = 120;
  const padding = { top: 10, right: 10, bottom: 20, left: 30 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (d.value / maxValue) * chartHeight,
    day: d.day,
    value: d.value,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  return (
    <svg width={width} height={height} style={{ width: "100%", height: "auto" }}>
      {[0, 5, 10, 15].map((v) => (
        <text
          key={v}
          x={padding.left - 4}
          y={padding.top + chartHeight - (v / maxValue) * chartHeight + 4}
          textAnchor="end"
          style={{ fontSize: "9px", fill: "#a09898" }}
        >
          {v}
        </text>
      ))}

      <path d={areaD} fill="rgba(2,95,201,0.08)" />
      <path d={pathD} fill="none" stroke="#025fc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p) => (
        <text
          key={p.day}
          x={p.x}
          y={height - 4}
          textAnchor="middle"
          style={{ fontSize: "9px", fill: "#a09898" }}
        >
          {p.day}
        </text>
      ))}
    </svg>
  );
}

function TopNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div
      className="flex items-center justify-between bg-white shrink-0"
      style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
    >
      <div className="flex items-center" style={{ gap: "20px" }}>
        <button
          type="button"
          onClick={onMenuOpen}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="Menu"
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
        <button type="button" className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
          <Bell size={24} className="text-black" />
        </button>
        <button type="button" className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
          <Mail size={24} className="text-black" />
        </button>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px", paddingBottom: "10px" }}>
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
        <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>
          Search
        </span>
      </div>
    </div>
  );
}

export default function ActivityOverviewPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Last 7 Days");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white">
          <TopNav onMenuOpen={() => setSidebarOpen(true)} />
          <SearchBar />
        </div>

        {/* Body */}
        <div
          className="bg-white flex-1 overflow-y-auto flex flex-col"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "30px",
            paddingBottom: "40px",
            gap: "20px",
          }}
        >
          {/* Heading */}
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
              Activity
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Stats cards */}
          <div className="flex items-center gap-[12px] w-full">
            {/* Last Login Time */}
            <div
              className="flex flex-col items-center gap-[8px] rounded-[12px] p-[16px] flex-1"
              style={{ border: "1px solid #d9d9d9" }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: "44px", height: "44px", backgroundColor: "#e8f0fb" }}
              >
                <span style={{ fontSize: "20px" }}>🕐</span>
              </div>
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#025fc9",
                  letterSpacing: "0.14px",
                  textAlign: "center",
                }}
              >
                11 Nov 2025, 11:05
              </span>
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  letterSpacing: "0.12px",
                  textAlign: "center",
                }}
              >
                Last Login Time
              </span>
            </div>

            {/* Total Active Hours */}
            <div
              className="flex flex-col items-center gap-[8px] rounded-[12px] p-[16px] flex-1"
              style={{ border: "1px solid #d9d9d9" }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: "44px", height: "44px", backgroundColor: "#e8f0fb" }}
              >
                <span style={{ fontSize: "20px" }}>⏳</span>
              </div>
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#025fc9",
                  letterSpacing: "0.14px",
                  textAlign: "center",
                }}
              >
                100 Hours
              </span>
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  letterSpacing: "0.12px",
                  textAlign: "center",
                }}
              >
                Total Active Hours
              </span>
            </div>
          </div>

          {/* Upload Data History */}
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex items-center gap-[8px]">
              <span style={{ fontSize: "18px" }}>🖥️</span>
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#000",
                  letterSpacing: "0.16px",
                }}
              >
                Upload Data History
              </span>
            </div>

            <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
              Records of data or content uploaded to the account.
            </p>

            <div className="flex flex-col w-full rounded-[12px] p-[16px]" style={{ border: "1px solid #d9d9d9" }}>
              {/* Filter dropdown */}
              <div className="flex justify-end w-full" style={{ marginBottom: "12px" }}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center gap-[6px] rounded-[8px] px-[12px] py-[6px]"
                    style={{ border: "1px solid #d9d9d9" }}
                  >
                    <span style={{ ...fontSwitzer, fontSize: "13px", color: "#000", letterSpacing: "0.13px" }}>
                      {selectedFilter}
                    </span>
                    <ChevronDown size={14} className="text-[#5e5757]" />
                  </button>

                  {showFilterDropdown && (
                    <div
                      className="absolute right-0 top-full mt-1 rounded-[8px] z-10 w-[140px]"
                      style={{
                        border: "1px solid #d9d9d9",
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      {FILTER_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedFilter(option);
                            setShowFilterDropdown(false);
                          }}
                          className="flex items-center w-full px-[12px] py-[8px]"
                          style={{ backgroundColor: selectedFilter === option ? "rgba(2,95,201,0.08)" : "#fff" }}
                        >
                          <span
                            style={{
                              ...fontSwitzer,
                              fontSize: "13px",
                              color: selectedFilter === option ? "#025fc9" : "#000",
                              letterSpacing: "0.13px",
                            }}
                          >
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Line chart */}
              <LineChart data={CHART_DATA} />
            </div>
          </div>

          {/* Account Updates & Alerts */}
          <div
            className="flex flex-col gap-[8px] w-full rounded-[12px] p-[16px]"
            style={{ border: "1px solid #d9d9d9" }}
          >
            <div className="flex items-center gap-[8px]">
              <span style={{ fontSize: "18px" }}>🔔</span>
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#000",
                  letterSpacing: "0.16px",
                }}
              >
                Account Updates & Alerts
              </span>
            </div>

            <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
              Important Account Updates & Alerts.
            </p>

            <div
              className="flex items-center justify-center self-start rounded-[20px]"
              style={{
                backgroundColor: "#025fc9",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "4px",
                paddingBottom: "4px",
              }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "0.12px",
                }}
              >
                3 Unread
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}