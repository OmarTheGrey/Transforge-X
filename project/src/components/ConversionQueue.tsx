import React, { useState, useCallback } from 'react';
import { FileItem, ConversionSettings } from '../types';
import { FileConverter } from '../services/FileConverter';
import { Play, Download, Trash2, File, ChevronRight, ChevronDown } from 'lucide-react';

interface ConversionQueueProps {
  files: FileItem[];
  settings: ConversionSettings;
  onFileRemove: (id: string) => void;
  onConversionComplete: (fileId: string, success: boolean, outputSize?: number) => void;
  onFilesUpdate: (files: FileItem[]) => void;
}

const ConversionQueue: React.FC<ConversionQueueProps> = ({
  files,
  settings,
  onFileRemove,
  onConversionComplete,
  onFilesUpdate
}) => {
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const converter = new FileConverter();

  const supportedFormats = {
    image: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'ico', 'avif'],
    document: ['pdf', 'txt', 'html', 'md', 'rtf', 'csv'],
    audio: ['mp3', 'wav', 'ogg', 'flac', 'aac'],
    video: ['mp4', 'webm', 'avi', 'mov'],
    archive: ['zip']
  };

  const getFileCategory = (file: FileItem): keyof typeof supportedFormats => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    if (file.type.includes('zip') || file.type.includes('rar')) return 'archive';
    return 'document';
  };

  const handleFormatSelect = (fileId: string, format: string) => {
    onFilesUpdate(files.map(file => 
      file.id === fileId ? { ...file, outputFormat: format } : file
    ));
  };

  const handleConvertFile = async (file: FileItem) => {
    if (!file.outputFormat) return;

    onFilesUpdate(files.map(f => 
      f.id === file.id ? { ...f, status: 'converting', progress: 0 } : f
    ));

    try {
      const result = await converter.convertFile(file.file, file.outputFormat, settings);
      
      onFilesUpdate(files.map(f => 
        f.id === file.id ? { 
          ...f, 
          status: 'completed', 
          progress: 100,
          outputBlob: result
        } : f
      ));

      onConversionComplete(file.id, true, result.size);
    } catch (error) {
      onFilesUpdate(files.map(f => 
        f.id === file.id ? { 
          ...f, 
          status: 'error', 
          progress: 0,
          error: error instanceof Error ? error.message : 'Conversion failed'
        } : f
      ));

      onConversionComplete(file.id, false);
    }
  };

  const handleConvertAll = async () => {
    setIsConverting(true);
    const filesToConvert = files.filter(file => 
      file.outputFormat && file.status === 'pending'
    );

    for (const file of filesToConvert) {
      await handleConvertFile(file);
    }
    
    setIsConverting(false);
  };

  const handleDownload = (file: FileItem) => {
    if (!file.outputBlob) return;

    const url = URL.createObjectURL(file.outputBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.split('.')[0]}.${file.outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const readyToConvertCount = files.filter(f => f.outputFormat && f.status === 'pending').length;

  if (files.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-win95-darkgray">
        <div className="text-center">
          <File className="w-16 h-16 mx-auto mb-4" />
          <div className="text-lg">No files in queue</div>
          <div className="text-sm">Add files to start converting</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="win95-toolbar h-8 flex items-center px-2 space-x-2">
        {readyToConvertCount > 0 && (
          <button
            onClick={handleConvertAll}
            disabled={isConverting}
            className="win95-button flex items-center space-x-1"
          >
            <Play className="w-3 h-3" />
            <span>Convert All ({readyToConvertCount})</span>
          </button>
        )}
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto">
        {files.map((file, index) => (
          <div key={file.id} className="border-b" style={{ borderColor: '#e0e0e0' }}>
            {/* File Header */}
            <div className="p-2 bg-win95-lightgray flex items-center justify-between hover:bg-win95-gray">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpandedFile(
                    expandedFile === file.id ? null : file.id
                  )}
                  className="win95-button w-4 h-4 flex items-center justify-center"
                >
                  {expandedFile === file.id ? 
                    <ChevronDown className="w-2 h-2" /> : 
                    <ChevronRight className="w-2 h-2" />
                  }
                </button>
                
                <div className="text-xs">
                  <div className="text-win95-black font-bold">
                    {file.name}
                  </div>
                  <div className="text-win95-darkgray">
                    {formatFileSize(file.size)} • {getFileCategory(file).toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {file.status === 'completed' && file.outputBlob && (
                  <button
                    onClick={() => handleDownload(file)}
                    className="win95-button text-xs flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                )}
                
                <button
                  onClick={() => onFileRemove(file.id)}
                  className="win95-button text-xs flex items-center space-x-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {file.status === 'converting' && (
              <div className="px-2 pb-2">
                <div className="flex justify-between text-xs text-win95-black mb-1">
                  <span>Converting...</span>
                  <span>{file.progress}%</span>
                </div>
                <div className="win95-progress h-4">
                  <div 
                    className="win95-progress-bar transition-all duration-500"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Display */}
            {file.status === 'error' && file.error && (
              <div className="px-2 pb-2">
                <div className="win95-window bg-win95-red text-white">
                  <div className="win95-titlebar bg-win95-red">
                    <span className="text-xs">Error</span>
                  </div>
                  <div className="p-2 text-xs">
                    {file.error}
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Options */}
            {expandedFile === file.id && (
              <div className="p-3 bg-white border-t" style={{ borderColor: '#e0e0e0' }}>
                <div className="space-y-3">
                  {/* Format Selection */}
                  <div>
                    <div className="text-xs text-win95-black font-bold mb-2">
                      Output Format:
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {supportedFormats[getFileCategory(file)].map(format => (
                        <button
                          key={format}
                          onClick={() => handleFormatSelect(file.id, format)}
                          className={`
                            text-xs py-1 px-2 border transition-all
                            ${file.outputFormat === format
                              ? 'win95-button-pressed bg-win95-blue text-white'
                              : 'win95-button'
                            }
                          `}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Convert Button */}
                  {file.outputFormat && file.status === 'pending' && (
                    <button
                      onClick={() => handleConvertFile(file)}
                      className="win95-button w-full py-2 text-sm font-bold"
                    >
                      Convert to {file.outputFormat.toUpperCase()}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionQueue;