import React from 'react';
import { ConversionSettings } from '../types';
import { Image, Music, Video, Archive, Zap } from 'lucide-react';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onSettingsChange: (settings: ConversionSettings) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange }) => {
  const handleSettingChange = (key: keyof ConversionSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="h-full overflow-auto space-y-4">
      {/* Image Settings */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Image className="w-3 h-3" />
            <span className="text-xs">Image Quality</span>
          </div>
        </div>
        <div className="p-3 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-win95-black">Quality Level:</span>
            <span className="text-win95-blue font-bold">
              {settings.imageQuality}%
            </span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="10"
              max="100"
              value={settings.imageQuality}
              onChange={(e) => handleSettingChange('imageQuality', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-win95-darkgray">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Music className="w-3 h-3" />
            <span className="text-xs">Audio Quality</span>
          </div>
        </div>
        <div className="p-3 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-win95-black">Bitrate (kbps):</span>
            <span className="text-win95-blue font-bold">
              {settings.audioQuality}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-1">
            {[128, 192, 256, 320].map(bitrate => (
              <button
                key={bitrate}
                onClick={() => handleSettingChange('audioQuality', bitrate)}
                className={`
                  text-xs py-2 px-2 border transition-all
                  ${settings.audioQuality === bitrate
                    ? 'win95-button-pressed bg-win95-blue text-white'
                    : 'win95-button'
                  }
                `}
              >
                {bitrate}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Settings */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Video className="w-3 h-3" />
            <span className="text-xs">Video Quality</span>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-3 gap-1">
            {(['low', 'medium', 'high'] as const).map(quality => (
              <button
                key={quality}
                onClick={() => handleSettingChange('videoQuality', quality)}
                className={`
                  text-xs py-2 px-3 border transition-all
                  ${settings.videoQuality === quality
                    ? 'win95-button-pressed bg-win95-blue text-white'
                    : 'win95-button'
                  }
                `}
              >
                {quality.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Compression Settings */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Archive className="w-3 h-3" />
            <span className="text-xs">Compression</span>
          </div>
        </div>
        <div className="p-3 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-win95-black">Compression Level:</span>
            <span className="text-win95-blue font-bold">
              {settings.compressionLevel}/9
            </span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="1"
              max="9"
              value={settings.compressionLevel}
              onChange={(e) => handleSettingChange('compressionLevel', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-win95-darkgray">
            <span>Fast</span>
            <span>Best</span>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="win95-window bg-white">
        <div className="win95-titlebar-inactive">
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span className="text-xs">Quick Presets</span>
          </div>
        </div>
        <div className="p-3 grid grid-cols-3 gap-2">
          <button
            onClick={() => onSettingsChange({
              imageQuality: 60,
              audioQuality: 128,
              videoQuality: 'low',
              compressionLevel: 3
            })}
            className="win95-button text-xs p-3"
          >
            <div className="font-bold text-win95-red">FAST</div>
            <div className="text-xs opacity-70">Quick</div>
          </button>
          
          <button
            onClick={() => onSettingsChange({
              imageQuality: 80,
              audioQuality: 192,
              videoQuality: 'medium',
              compressionLevel: 6
            })}
            className="win95-button text-xs p-3"
          >
            <div className="font-bold text-win95-blue">BALANCED</div>
            <div className="text-xs opacity-70">Good</div>
          </button>
          
          <button
            onClick={() => onSettingsChange({
              imageQuality: 95,
              audioQuality: 320,
              videoQuality: 'high',
              compressionLevel: 9
            })}
            className="win95-button text-xs p-3"
          >
            <div className="font-bold text-win95-green">QUALITY</div>
            <div className="text-xs opacity-70">Best</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;