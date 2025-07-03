import React, { useState } from 'react';
import { Monitor, Folder, FileText, Settings, HardDrive, Trash2 } from 'lucide-react';

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const desktopIcons = [
    { name: 'My Computer', icon: Monitor, x: 20, y: 20 },
    { name: 'My Documents', icon: Folder, x: 20, y: 100 },
    { name: 'Recycle Bin', icon: Trash2, x: 20, y: 180 },
    { name: 'Network', icon: HardDrive, x: 20, y: 260 },
  ];

  return (
    <div className="min-h-screen bg-win95-cyan relative overflow-hidden">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #008080, #20b2aa)',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `
        }}
      />

      {/* Desktop Icons */}
      {desktopIcons.map((icon, index) => (
        <div
          key={index}
          className="win95-desktop-icon absolute"
          style={{ left: icon.x, top: icon.y }}
        >
          <div className="win95-icon bg-win95-gray border mb-1" style={{ borderColor: '#dfdfdf #808080 #808080 #dfdfdf' }}>
            <icon.icon className="w-6 h-6 text-win95-black" />
          </div>
          <span className="text-xs max-w-16 text-center leading-tight">{icon.name}</span>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 p-4">
        {children}
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-7 bg-win95-gray border-t" style={{ borderColor: '#dfdfdf #808080 #808080 #dfdfdf' }}>
        <div className="flex items-center h-full px-1">
          {/* Start Button */}
          <button className="win95-button h-5 px-2 mr-1 flex items-center font-bold">
            <div className="w-4 h-4 bg-win95-red mr-1 flex items-center justify-center text-white text-xs font-bold">
              ⊞
            </div>
            Start
          </button>

          {/* Taskbar Separator */}
          <div className="w-px h-4 bg-win95-darkgray mx-1"></div>

          {/* Running Applications */}
          <button className="win95-button-pressed h-5 px-2 mr-1 text-xs">
            File Converter
          </button>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* System Tray */}
          <div className="flex items-center space-x-1 mr-1">
            <div className="w-4 h-4 bg-win95-gray border" style={{ borderColor: '#808080 #dfdfdf #dfdfdf #808080' }}>
              <div className="w-full h-full bg-win95-yellow"></div>
            </div>
          </div>

          {/* Clock */}
          <div className="win95-statusbar h-5 px-2 text-xs flex items-center min-w-16">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;