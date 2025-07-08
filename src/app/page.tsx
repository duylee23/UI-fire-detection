'use client';

import { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Video, 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  RotateCcw,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Activity,
  AlertTriangle
} from 'lucide-react';

export default function FireDetectionTool() {
  const [selectedCamera, setSelectedCamera] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flameThreshold, setFlameThreshold] = useState(0.5);
  const [smokeThreshold, setSmokeThreshold] = useState(0.3);
  const [interval, setInterval] = useState(100);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [motionDetection, setMotionDetection] = useState(true);
  const [colCamera, setColCamera] = useState('');
  const [rowCamera, setRowCamera] = useState('');

  const cameras = [
    { id: 1, name: 'CAMERA 1', status: 'online', hasAlert: false },
    { id: 2, name: 'CAMERA 2', status: 'online', hasAlert: true },
    { id: 3, name: 'CAMERA 3', status: 'offline', hasAlert: false },
    { id: 4, name: 'CAMERA 4', status: 'online', hasAlert: false },
    { id: 5, name: 'CAMERA 5', status: 'online', hasAlert: false },
    { id: 6, name: 'CAMERA 6', status: 'online', hasAlert: false },
    { id: 7, name: 'CAMERA 7', status: 'online', hasAlert: false },
    { id: 8, name: 'CAMERA 8', status: 'offline', hasAlert: false },
    { id: 9, name: 'CAMERA 9', status: 'online', hasAlert: false },
  ];

  const selectedCameraData = cameras.find(cam => cam.id === selectedCamera);

  const handleConfigCamera = () => {
    if (colCamera && rowCamera) {
      console.log('Configuring camera position:', { col: colCamera, row: rowCamera });
      alert(`Camera configured at Column: ${colCamera}, Row: ${rowCamera}`);
      setColCamera('');
      setRowCamera('');
    } else {
      alert('Please enter both column and row values.');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-blue-200 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-4 pt-2">
          <img src="/inflogo.png" alt="logo" className="w-50 h-10 rounded-lg object-cover" />
          <div className="text-center">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Fire Detection
            </h1>
            <p className="text-xs text-slate-500">Real-time monitoring</p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="px-6 pb-6 border-b border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-slate-700">SETTINGS</h2>
          </div>
          
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

            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
              Apply Settings
            </button>
          </div>
        </div>

        {/* Camera Configuration */}
        <div className="px-6 pb-6 border-b border-blue-200">
          <div className="flex items-center gap-2 mb-4 mt-2">
            <Video className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-slate-700">CAMERA CONFIG</h2>
          </div>

          {/* Config Camera Section */}
          <div className="rounded-lg px-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1">
                  Col Camera
                </label>
                <input
                  type="text"
                  value={colCamera}
                  onChange={(e) => setColCamera(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter column"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">
                  Row Camera
                </label>
                <input
                  type="text"
                  value={rowCamera}
                  onChange={(e) => setRowCamera(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter row"
                />
              </div>
            </div>
            <button 
              onClick={handleConfigCamera}
              className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg transition-colors mt-3"
            >
              Configure Camera Position
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Manage Cameras</span>
            <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Camera List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xs text-slate-600 mb-3 font-semibold">CAMERAS</h3>
            <div className="space-y-2">
              {cameras.map((camera) => (
                <button
                  key={camera.id}
                  onClick={() => setSelectedCamera(camera.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedCamera === camera.id
                      ? 'bg-blue-100 border border-blue-300 text-blue-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Video className="w-4 h-4" />
                      <span className="text-sm font-medium">{camera.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {camera.hasAlert && (
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                      )}
                      <div
                        className={`w-2 h-2 rounded-full ${
                          camera.status === 'online'
                            ? 'bg-green-400'
                            : 'bg-red-400'
                        }`}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                {selectedCameraData?.name}
              </h2>
              {selectedCameraData?.hasAlert && (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-orange-300">Fire Detected</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button className="p-2 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-lg transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-lg transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMotionDetection(!motionDetection)}
                className={`p-2 rounded-lg transition-colors ${
                  motionDetection
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
                }`}
              >
                {motionDetection ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button className="p-2 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-lg transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Display Area */}
        <div className="flex-1 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center relative">
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
            </div>
            
            {/* Camera Feed Simulation */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {selectedCameraData?.name} Feed
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Status: <span className={`${
                  selectedCameraData?.status === 'online' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {selectedCameraData?.status?.toUpperCase()}
                </span>
              </p>
              {selectedCameraData?.status === 'online' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-700">Live</span>
                </div>
              )}
            </div>

            {/* Detection Overlay */}
            {selectedCameraData?.hasAlert && (
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold text-red-300">
                      FIRE DETECTED - Alert Triggered
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white/90 backdrop-blur-sm border-t border-blue-200 p-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span>FPS: 30</span>
              <span>Resolution: 1920x1080</span>
              <span>Bitrate: 2.5 Mbps</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Flame: {(flameThreshold * 100).toFixed(0)}%</span>
              <span>Smoke: {(smokeThreshold * 100).toFixed(0)}%</span>
              <span className={`${
                selectedCameraData?.status === 'online' ? 'text-green-600' : 'text-red-500'
              }`}>
                {selectedCameraData?.status?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
