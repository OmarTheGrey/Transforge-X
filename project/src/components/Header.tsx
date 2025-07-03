import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, HardDrive, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const [isMaximized, setIsMaximized] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="relative">
      {/* Vaporwave Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Lines */}
        <motion.div
          className="absolute w-full h-px bg-vaporwave-pink opacity-60"
          animate={{ y: [-10, window.innerHeight + 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-full w-px bg-vaporwave-cyan opacity-40"
          animate={{ x: [-10, window.innerWidth + 10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute w-8 h-8 border-2 border-vaporwave-pink"
          style={{ left: '10%', top: '20%' }}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-6 h-6 bg-vaporwave-cyan opacity-60"
          style={{ right: '15%', top: '30%' }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="win95-window relative z-10 mx-2 sm:mx-4 mt-4"
      >
        {/* Title Bar */}
        <div className="win95-titlebar">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4" />
            <span className="font-bold text-sm">TRANSFORGE-X v2.1.7 - File Converter</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="w-6 h-6 bg-win95-gray border border-win95-darkgray flex items-center justify-center text-xs hover:bg-win95-lightgray">
              _
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-6 h-6 bg-win95-gray border border-win95-darkgray flex items-center justify-center text-xs hover:bg-win95-lightgray"
            >
              {isMaximized ? '❐' : '□'}
            </button>
            <button className="w-6 h-6 bg-win95-gray border border-win95-darkgray flex items-center justify-center text-xs hover:bg-red-300">
              ✕
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-4 bg-win95-gray">
          {/* ASCII Art Logo with Vaporwave Colors */}
          <div className="text-center mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="font-pixel text-xs sm:text-sm leading-tight"
            >
              <div className="text-vaporwave-pink neon-text">
                ████████╗██████╗  █████╗ ███╗   ██╗███████╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
              </div>
              <div className="text-vaporwave-cyan neon-text">
                ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
              </div>
              <div className="text-vaporwave-purple neon-text">
                   ██║   ██████╔╝███████║██╔██╗ ██║███████╗█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
              </div>
              <div className="text-retro-amber neon-text">
                   ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
              </div>
              <div className="text-vaporwave-neon neon-text">
                   ██║   ██║  ██║██║  ██║██║ ╚████║███████║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
              </div>
              <div className="text-vaporwave-pink neon-text">
                   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
              </div>
            </motion.div>
            
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-vaporwave-electric text-sm font-bold mt-2 neon-text"
            >
              ◆◇◆ RETRO FILE CONVERSION MATRIX ◆◇◆
            </motion.div>
          </div>

          {/* System Information Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Left Panel - System Info */}
            <div className="win95-window bg-win95-lightgray">
              <div className="win95-titlebar text-xs">
                <span>System Information</span>
              </div>
              <div className="p-3 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-vaporwave-pink" />
                  <span className="text-win95-black">CPU: PENTIUM-X 486MHz</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-vaporwave-cyan" />
                  <span className="text-win95-black">RAM: 64MB AVAILABLE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-vaporwave-purple" />
                  <span className="text-win95-black">DISPLAY: 1024x768 16-BIT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-vaporwave-neon" />
                  <span className="text-win95-black">STATUS: 
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-retro-green ml-1"
                    >
                      ONLINE
                    </motion.span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Panel - Date/Time */}
            <div className="win95-window bg-win95-lightgray">
              <div className="win95-titlebar text-xs">
                <span>Date & Time</span>
              </div>
              <div className="p-3 space-y-2 text-xs text-win95-black">
                <div>DATE: {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</div>
                <div>TIME: {currentTime.toLocaleTimeString()}</div>
                <div>UPTIME: {formatUptime(uptime)}</div>
                <div className="text-vaporwave-pink">YEAR: 1995 ◆ MILLENNIUM BUG: PENDING</div>
              </div>
            </div>
          </div>

          {/* Command Line Interface */}
          <div className="win95-window bg-win95-black">
            <div className="win95-titlebar text-xs">
              <span>MS-DOS Prompt</span>
            </div>
            <div className="p-3 font-pixel text-xs">
              <div className="text-retro-green">
                <div>Microsoft(R) MS-DOS(R) Version 6.22</div>
                <div>(C)Copyright Microsoft Corp 1981-1994.</div>
                <div className="mt-2">
                  C:\TRANSFORGE&gt; FILECONV.EXE --mode=gui --year=1995
                </div>
                <div className="flex items-center mt-1">
                  <span>C:\TRANSFORGE&gt; </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="bg-retro-green text-win95-black ml-1 px-1"
                  >
                    █
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;