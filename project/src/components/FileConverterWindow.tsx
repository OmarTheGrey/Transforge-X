import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileItem, ConversionSettings } from '../types';
import { Minimize2, Maximize2, X, Folder, Settings, BarChart3 } from 'lucide-react';
import FileDropZone from './FileDropZone';
import ConversionQueue from './ConversionQueue';
import SettingsPanel from './SettingsPanel';
import StatsPanel from './StatsPanel';

const FileConverterWindow: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isMaximized, setIsMaximized] = useState(true);
  const [activeTab, setActiveTab] = useState<'files' | 'queue' | 'settings' | 'stats'>('files');
  const [settings, setSettings] = useState<ConversionSettings>({
    imageQuality: 90,
    audioQuality: 320,
    videoQuality: 'high',
    compressionLevel: 6
  });
  const [stats, setStats] = useState({
    totalConverted: 0,
    totalSize: 0,
    conversionTime: 0
  });

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      outputFormat: '',
      error: null
    }));
    
    setFiles(prev => [...prev, ...fileItems]);
    if (files.length === 0) {
      setActiveTab('queue');
    }
  }, [files.length]);

  const handleFileRemove = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const handleConversionComplete = useCallback((fileId: string, success: boolean, outputSize?: number) => {
    if (success) {
      setStats(prev => ({
        ...prev,
        totalConverted: prev.totalConverted + 1,
        totalSize: prev.totalSize + (outputSize || 0)
      }));
    }
  }, []);

  const tabs = [
    { id: 'files', label: 'Files', icon: Folder },
    { id: 'queue', label: 'Queue', icon: BarChart3, badge: files.length > 0 ? files.length : undefined },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`win95-window ${isMaximized ? 'fixed inset-4' : 'w-4/5 h-4/5 mx-auto mt-8'} flex flex-col`}
    >
      {/* Title Bar */}
      <div className="win95-titlebar">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-win95-gray border flex items-center justify-center" style={{ borderColor: '#dfdfdf #808080 #808080 #dfdfdf' }}>
            <Folder className="w-3 h-3 text-win95-black" />
          </div>
          <span>Universal File Converter - [TRANSFORGE.EXE]</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="win95-button w-4 h-4 flex items-center justify-center text-xs">
            <Minimize2 className="w-2 h-2" />
          </button>
          <button 
            className="win95-button w-4 h-4 flex items-center justify-center text-xs"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            <Maximize2 className="w-2 h-2" />
          </button>
          <button className="win95-button w-4 h-4 flex items-center justify-center text-xs hover:bg-win95-red hover:text-white">
            <X className="w-2 h-2" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="win95-toolbar h-6 flex items-center px-1 space-x-4 text-xs">
        <span className="hover:bg-win95-blue hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-win95-blue hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-win95-blue hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-win95-blue hover:text-white px-1 cursor-pointer">Tools</span>
        <span className="hover:bg-win95-blue hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Tab Bar */}
      <div className="bg-win95-gray border-b flex" style={{ borderColor: '#808080 #dfdfdf #dfdfdf #808080' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1 text-xs border-r flex items-center space-x-1 ${
              activeTab === tab.id 
                ? 'bg-white border-t-2 border-l border-r' 
                : 'bg-win95-gray hover:bg-win95-lightgray'
            }`}
            style={{ 
              borderColor: activeTab === tab.id 
                ? '#dfdfdf #808080 transparent #dfdfdf' 
                : '#dfdfdf #808080 #808080 #dfdfdf' 
            }}
          >
            <tab.icon className="w-3 h-3" />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="bg-win95-red text-white px-1 rounded-full text-xs min-w-4 h-4 flex items-center justify-center">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-hidden">
        {activeTab === 'files' && (
          <div className="h-full p-2">
            <FileDropZone onFilesAdded={handleFilesAdded} files={files} />
          </div>
        )}
        
        {activeTab === 'queue' && (
          <div className="h-full p-2 overflow-auto">
            <ConversionQueue
              files={files}
              settings={settings}
              onFileRemove={handleFileRemove}
              onConversionComplete={handleConversionComplete}
              onFilesUpdate={setFiles}
            />
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="h-full p-2 overflow-auto">
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
            />
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="h-full p-2">
            <StatsPanel stats={stats} />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="win95-statusbar flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Ready</span>
          <div className="w-px h-3 bg-win95-darkgray"></div>
          <span>{files.length} file(s)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-3 win95-progress">
            <div className="win95-progress-bar w-0"></div>
          </div>
          <span>100%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FileConverterWindow;