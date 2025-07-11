"use client";
import React from "react";
import { Download, ChevronLeft, ChevronRight, FileText, CalendarDays, Search, Image as ImageIcon } from "lucide-react";

const mockData = [
  { id: 1, camera: "CAM1", time: "6/1/2023 9:41 AM", event: "SMOKE", file: "D:/.../img1.jpg" },
  { id: 2, camera: "CAM2", time: "6/1/2023 9:42 AM", event: "FIRE", file: "D:/.../img2.jpg" },
  { id: 3, camera: "CAM3", time: "6/1/2023 9:43 AM", event: "FIRE", file: "D:/.../img3.jpg" },
  { id: 4, camera: "CAM4", time: "6/1/2023 9:44 AM", event: "SMOKE", file: "D:/.../img4.jpg" },
  { id: 5, camera: "CAM1", time: "6/1/2023 9:45 AM", event: "FIRE", file: "D:/.../img5.jpg" },
  { id: 6, camera: "CAM2", time: "6/1/2023 9:46 AM", event: "SMOKE", file: "D:/.../img6.jpg" },
  { id: 7, camera: "CAM3", time: "6/1/2023 9:47 AM", event: "FIRE", file: "D:/.../img7.jpg" },
  { id: 8, camera: "CAM4", time: "6/1/2023 9:48 AM", event: "SMOKE", file: "D:/.../img8.jpg" },
  { id: 9, camera: "CAM1", time: "6/1/2023 9:49 AM", event: "FIRE", file: "D:/.../img9.jpg" },
  { id: 10, camera: "CAM2", time: "6/1/2023 9:50 AM", event: "SMOKE", file: "D:/.../img10.jpg" },
  { id: 11, camera: "CAM3", time: "6/1/2023 9:51 AM", event: "FIRE", file: "D:/.../img11.jpg" },
  { id: 12, camera: "CAM4", time: "6/1/2023 9:52 AM", event: "SMOKE", file: "D:/.../img12.jpg" },
  { id: 13, camera: "CAM1", time: "6/1/2023 9:53 AM", event: "FIRE", file: "D:/.../img13.jpg" },
  { id: 14, camera: "CAM2", time: "6/1/2023 9:54 AM", event: "SMOKE", file: "D:/.../img14.jpg" },
  { id: 15, camera: "CAM3", time: "6/1/2023 9:55 AM", event: "FIRE", file: "D:/.../img15.jpg" },
  { id: 16, camera: "CAM4", time: "6/1/2023 9:56 AM", event: "SMOKE", file: "D:/.../img16.jpg" },
  { id: 17, camera: "CAM1", time: "6/1/2023 9:57 AM", event: "FIRE", file: "D:/.../img17.jpg" },
  { id: 18, camera: "CAM2", time: "6/1/2023 9:58 AM", event: "SMOKE", file: "D:/.../img18.jpg" },
  { id: 19, camera: "CAM3", time: "6/1/2023 9:59 AM", event: "FIRE", file: "D:/.../img19.jpg" },
  { id: 20, camera: "CAM4", time: "6/1/2023 10:00 AM", event: "SMOKE", file: "D:/.../img20.jpg" },
];

const PAGE_SIZE = 10;
const totalRows = mockData.length;
const totalPages = Math.ceil(totalRows / PAGE_SIZE);
const currentPage = 1; // For now, static

export default function LogPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-[var(--foreground)] font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white/90 dark:bg-black/30 border-r border-blue-100 dark:border-gray-800 p-6 flex flex-col gap-6 shadow-2xl rounded-r-3xl">
        <div className="flex flex-col items-center gap-2 mb-4">
          <img src="/window.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold tracking-wide text-blue-700">STATISTIC</span>
        </div>
        {/* Date Range */}
        <div className="bg-blue-50/60 dark:bg-blue-900/30 rounded-xl p-4 mb-2 flex flex-col gap-3 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-1 text-blue-700 font-semibold text-sm">
            <CalendarDays className="w-4 h-4" /> Date Range
          </div>
          <input type="date" className="rounded border px-2 py-1 text-sm" />
          <input type="date" className="rounded border px-2 py-1 text-sm" />
        </div>
        {/* Search */}
        <div className="bg-blue-50/60 dark:bg-blue-900/30 rounded-xl p-4 mb-2 flex flex-col gap-3 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-1 text-blue-700 font-semibold text-sm">
            <Search className="w-4 h-4" /> Search
          </div>
          <input type="text" placeholder="Search..." className="rounded border px-2 py-1 text-sm" />
        </div>
        {/* Preview */}
        <div className="bg-blue-50/60 dark:bg-blue-900/30 rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-1 text-blue-700 font-semibold text-sm">
            <ImageIcon className="w-4 h-4" /> Preview
          </div>
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-gray-400 text-xs border border-blue-200 shadow-inner overflow-hidden">
            <img src="/globe.svg" alt="Preview Placeholder" className="object-contain w-24 h-24 opacity-80" />
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center overflow-auto">
        <div className="w-full max-w-6xl">
          {/* Accent bar */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 rounded-t-xl mb-0.5" />
          <div className="bg-white/90 dark:bg-black/30 rounded-xl shadow-2xl overflow-hidden border border-blue-100">
            <div className="flex items-center gap-3 px-8 py-6 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-blue-100">
              <FileText className="w-7 h-7 text-blue-500" />
              <h1 className="text-2xl font-bold text-blue-700 tracking-tight">Log</h1>
              <span className="ml-auto">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-semibold shadow transition">
                  <Download className="w-5 h-5" /> Export
                </button>
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-100 to-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">STT</th>
                    <th className="px-4 py-3 text-left font-semibold">Camera</th>
                    <th className="px-4 py-3 text-left font-semibold">Time</th>
                    <th className="px-4 py-3 text-left font-semibold">Event</th>
                    <th className="px-4 py-3 text-left font-semibold">File Name</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={
                        `transition-colors duration-150 ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-blue-50 dark:bg-gray-800"} hover:bg-blue-100/70 dark:hover:bg-blue-900/70`
                      }
                    >
                      <td className="px-4 py-2 font-mono text-blue-700">{row.id}</td>
                      <td className="px-4 py-2 font-semibold">{row.camera}</td>
                      <td className="px-4 py-2">{row.time}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${row.event === "FIRE" ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-700"}`}>
                          {row.event}
                        </span>
                      </td>
                      <td className="px-4 py-2 truncate max-w-xs">{row.file}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination and Export Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>Total: <span className="font-bold text-blue-700">{totalRows}</span> rows</span>
                <span>|</span>
                <span>Page <span className="font-bold text-blue-700">{currentPage}</span> / <span className="font-bold text-blue-700">{totalPages}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full border border-blue-200 bg-white hover:bg-blue-100 text-blue-600 disabled:opacity-50" disabled={currentPage === 1}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-semibold text-blue-700">{currentPage}</span>
                <button className="p-2 rounded-full border border-blue-200 bg-white hover:bg-blue-100 text-blue-600 disabled:opacity-50" disabled={currentPage === totalPages}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-semibold shadow transition md:hidden">
                <Download className="w-5 h-5" /> Export
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 