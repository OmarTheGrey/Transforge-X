import React, { useState, useEffect } from 'react';
import { ConversionStats } from '../types';
import { BarChart3, Clock, HardDrive, Activity, Cpu, Monitor } from 'lucide-react';

interface StatsPanelProps {
  stats: ConversionStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="h-full overflow-auto space-y-4">
      {/* Conversion Statistics */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-3 h-3" />
            <span className="text-xs">Conversion Statistics</span>
          </div>
        </div>
        <div className="p-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-win95-blue" />
              <span className="text-xs text-win95-black">Files Processed:</span>
            </div>
            <div className="text-win95-blue font-bold font-mono">
              {String(stats.totalConverted).padStart(6, '0')}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-win95-green" />
              <span className="text-xs text-win95-black">Data Processed:</span>
            </div>
            <div className="text-win95-green font-bold font-mono">
              {formatFileSize(stats.totalSize)}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-win95-purple" />
              <span className="text-xs text-win95-black">Total Time:</span>
            </div>
            <div className="text-win95-purple font-bold font-mono">
              {formatTime(stats.conversionTime)}
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Monitor className="w-3 h-3" />
            <span className="text-xs">System Information</span>
          </div>
        </div>
        <div className="p-3 space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-win95-red" />
            <span className="text-win95-black">CPU: Pentium 133MHz</span>
          </div>
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-win95-blue" />
            <span className="text-win95-black">RAM: 32MB Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-win95-green" />
            <span className="text-win95-black">Display: 800x600 256 Colors</span>
          </div>
        </div>
      </div>

      {/* System Load */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Cpu className="w-3 h-3" />
            <span className="text-xs">System Load</span>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="text-xs text-win95-black">CPU Usage:</div>
          <div className="win95-progress h-4">
            <div className="win95-progress-bar w-2/5" />
          </div>
          <div className="text-xs text-win95-darkgray text-right">40%</div>
          
          <div className="text-xs text-win95-black mt-2">Memory:</div>
          <div className="win95-progress h-4">
            <div className="win95-progress-bar w-3/4" />
          </div>
          <div className="text-xs text-win95-darkgray text-right">24MB / 32MB</div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span className="text-xs">Date & Time</span>
          </div>
        </div>
        <div className="p-3 space-y-1 text-xs text-win95-black font-mono">
          <div>Date: {currentTime.toLocaleDateString()}</div>
          <div>Time: {currentTime.toLocaleTimeString()}</div>
          <div>Uptime: {formatUptime(uptime)}</div>
        </div>
      </div>

      {/* MS-DOS Prompt */}
      <div className="win95-window bg-win95-black">
        <div className="win95-titlebar-inactive">
          <span className="text-xs">MS-DOS Prompt</span>
        </div>
        <div className="p-3 font-mono text-xs text-win95-lime">
          <div>Microsoft(R) MS-DOS(R) Version 6.22</div>
          <div>(C)Copyright Microsoft Corp 1981-1994.</div>
          <div className="mt-2">C:\TRANSFRM&gt; FILECONV.EXE</div>
          <div className="flex items-center mt-1">
            <span>C:\TRANSFRM&gt; </span>
            <span className="bg-win95-lime text-win95-black ml-1 px-1 animate-pulse">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;