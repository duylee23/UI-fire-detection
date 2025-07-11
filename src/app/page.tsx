'use client';

import { useState } from 'react';
import {
  Settings,
  Monitor,
  BookText,
  Maximize,
  Video,
  AlertTriangle,
} from 'lucide-react';

function SettingsPanel({
  interval,
  setInterval,
  flameThreshold,
  setFlameThreshold,
  smokeThreshold,
  setSmokeThreshold,
  onApply,
}: {
  interval: number;
  setInterval: (v: number) => void;
  flameThreshold: number;
  setFlameThreshold: (v: number) => void;
  smokeThreshold: number;
  setSmokeThreshold: (v: number) => void;
  onApply: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Interval */}
      <div>
        <label className="block text-xs text-slate-600 mb-2">
          Interval: {interval}ms
        </label>
        <div className="relative">
          <input
            type="range"
            min="50"
            max="1000"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
      {/* Flame Sensitivity */}
      <div>
        <label className="block text-xs text-slate-600 mb-2">
          Flame sensitivity: {flameThreshold.toFixed(2)}
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={flameThreshold}
            onChange={(e) => setFlameThreshold(Number(e.target.value))}
            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer slider flame-slider"
          />
        </div>
      </div>
      {/* Smoke Sensitivity */}
      <div>
        <label className="block text-xs text-slate-600 mb-2">
          Smoke sensitivity: {smokeThreshold.toFixed(2)}
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={smokeThreshold}
            onChange={(e) => setSmokeThreshold(Number(e.target.value))}
            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer slider smoke-slider"
          />
        </div>
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
        onClick={onApply}
      >
        Apply Settings
      </button>
    </div>
  );
}

export { SettingsPanel };

export default function MainScreen() {
  const [showSettings, setShowSettings] = useState(false);
  const [interval, setInterval] = useState(100);
  const [flameThreshold, setFlameThreshold] = useState(0.5);
  const [smokeThreshold, setSmokeThreshold] = useState(0.3);
  const [fullscreenCamera, setFullscreenCamera] = useState<number | null>(null); // camera id or null

  // Dummy event log data
  const eventLog = Array.from({ length: 30 }, (_, i) => ({
    camera: 'CAM2',
    time: '7/7/2025 4:1' + (i % 10),
    event: 'SMOKE',
  }));

  // Camera grid placeholders
  const cameras = [
    { id: 1, name: 'CAM1', hasAlert: false },
    { id: 2, name: 'CAM2', hasAlert: true }, // Example: CAM2 has alert
    { id: 3, name: 'CAM3', hasAlert: false },
    { id: 4, name: 'CAM4', hasAlert: false },
  ];

  // Fullscreen camera data
  const fullscreenData = fullscreenCamera ? cameras.find(c => c.id === fullscreenCamera) : null;

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white/80 px-8 py-3 border-b border-blue-200 shadow-md backdrop-blur-md" style={{ minHeight: 64 }}>
        <div className="flex items-center gap-5">
          <img src="/inflogo.png" alt="logo" className="h-12 w-auto drop-shadow-md" />
          <div>
            <div className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">INFINIQ FIRE DETECTION</div>
            <div className="text-xs text-slate-500 font-medium">Released Date</div>
            <div className="text-xs text-slate-400 font-semibold">VER 1.0.0</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg shadow-md flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all focus:outline-none">
            <Monitor className="w-5 h-5" /> MONITOR
          </button>
          <a
            href="/setting"
            className="px-5 py-2 bg-gradient-to-r from-green-300 to-green-500 text-green-900 font-bold rounded-lg shadow-md flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all focus:outline-none"
          >
            <Settings className="w-5 h-5" /> SETTING
          </a>
          <a
            href="/log"
            className="px-5 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all focus:outline-none"
          >
            <BookText className="w-5 h-5" /> LOG
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Event Log Table */}
        <div className="w-72 bg-white/90 border-r border-blue-100 overflow-y-auto shadow-inner rounded-tr-3xl rounded-br-3xl my-4 ml-4 flex flex-col">
          <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-2xl shadow p-4">
            <div className="text-lg font-bold text-blue-700 tracking-wide mb-1">Event Log</div>
            <div className="text-xs text-slate-500">Recent fire/smoke events</div>
          </div>
          <table className="w-full text-sm mt-2">
            <thead className="sticky top-20 bg-slate-100 z-10">
              <tr>
                <th className="py-2 px-2 border-b border-blue-100 text-left font-semibold text-slate-600">Camera</th>
                <th className="py-2 px-2 border-b border-blue-100 text-left font-semibold text-slate-600">Time</th>
                <th className="py-2 px-2 border-b border-blue-100 text-left font-semibold text-slate-600">Event</th>
              </tr>
            </thead>
            <tbody>
              {eventLog.map((row, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-blue-50 hover:bg-blue-100 transition-colors">
                  <td className="py-1 px-2 border-b border-blue-50 font-mono text-blue-700">{row.camera}</td>
                  <td className="py-1 px-2 border-b border-blue-50 font-mono text-slate-600">{row.time}</td>
                  <td className="py-1 px-2 border-b border-blue-50 font-semibold text-orange-600 tracking-wide">{row.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Camera Grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 bg-gradient-to-br from-blue-100 to-blue-200 md:p-2 lg:p-4 rounded-2xl shadow-2xl m-2 md:m-4 lg:m-6">
          {cameras.map((cam) => (
            <div
              key={cam.id}
              className={`relative bg-gradient-to-br from-slate-200 via-blue-100 to-blue-300 flex items-center justify-center rounded-2xl border min-h-[180px] md:min-h-[220px] shadow-lg hover:shadow-2xl transition-all group overflow-hidden
                ${cam.hasAlert ? 'animate-blink-red border-2 border-red-500 shadow-lg' : 'border-blue-200'}
              `}
            >
              {/* Top Bar: Video Icon + Camera Name (left), Fullscreen Button (right) */}
              <div className="absolute top-0 left-0 w-full flex items-center justify-between px-3  bg-white/80 border-b border-blue-100 rounded-t-2xl shadow group-hover:bg-blue-50 transition-all z-10">
                <div className="flex items-center gap-2">
                  <span className="flex items-center text-slate-400"><Video className="w-4 h-4" /></span>
                  <span className="text-blue-700 font-semibold text-sm tracking-wide flex items-center gap-2">
                    {cam.name}
                    {cam.hasAlert && <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>}
                  </span>
                </div>
                <button
                  className="p-2 bg-white/80 rounded-full hover:bg-blue-100 shadow-md transition-all z-20"
                  onClick={() => setFullscreenCamera(cam.id)}
                >
                  <Maximize className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              {/* Alert Banner */}
              {cam.hasAlert && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1 bg-red-500/20 border border-red-500/50 rounded-full animate-blink-red">
                  <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-xs text-red-600 font-bold animate-pulse">FIRE/SMOKE DETECTED</span>
                </div>
              )}
              <span className="text-slate-300 text-4xl font-extrabold drop-shadow-lg group-hover:text-blue-400 transition-all select-none pointer-events-none">{cam.name}</span>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-70">No video feed</div>
            </div>
          ))}
        </div>
      </div>
      {/* Fullscreen Camera Overlay */}
      {fullscreenData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className={`relative w-full h-full flex flex-col items-center justify-center ${fullscreenData.hasAlert ? 'animate-blink-red border-4 border-red-500' : ''}`}>
            <button
              className="absolute top-8 left-8 px-4 py-2 bg-white/80 text-blue-700 font-bold rounded-lg shadow hover:bg-blue-100 z-50"
              onClick={() => setFullscreenCamera(null)}
            >
              Return
            </button>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-32 h-32 mb-6 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                <Video className="w-16 h-16 text-blue-600" />
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">{fullscreenData.name}</h2>
              {fullscreenData.hasAlert && (
                <div className="flex items-center gap-3 px-6 py-3 bg-red-500/30 border border-red-500/60 rounded-2xl animate-blink-red mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                  <span className="text-2xl text-red-100 font-bold animate-pulse">FIRE/SMOKE DETECTED</span>
                </div>
              )}
              <div className="text-lg text-white/80">No video feed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
