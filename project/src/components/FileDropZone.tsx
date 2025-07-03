import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileItem } from '../types';
import { Upload, File, Image, Music, Video, Archive, FileText } from 'lucide-react';

interface FileDropZoneProps {
  onFilesAdded: (files: File[]) => void;
  files: FileItem[];
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFilesAdded, files }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
    setDragActive(false);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    multiple: true,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.ico', '.avif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/*': ['.txt', '.rtf', '.csv', '.xml', '.html', '.md'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    }
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (file.type.includes('zip') || file.type.includes('rar')) return <Archive className="w-4 h-4" />;
    if (file.type.includes('pdf') || file.type.includes('document')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          flex-1 border-2 border-dashed p-8 cursor-pointer transition-colors
          ${isDragActive || dragActive 
            ? 'border-win95-blue bg-win95-blue bg-opacity-10' 
            : 'border-win95-darkgray bg-win95-lightgray'
          }
        `}
        style={{
          borderColor: isDragActive ? '#000080' : '#808080'
        }}
      >
        <input {...getInputProps()} />
        
        <div className="text-center h-full flex flex-col justify-center">
          <div className="mb-4">
            <Upload className={`w-16 h-16 mx-auto ${isDragActive ? 'text-win95-blue' : 'text-win95-darkgray'}`} />
          </div>
          
          <div className="text-lg font-bold text-win95-black mb-2">
            {isDragActive ? 'Drop files here!' : 'Drag & drop files here'}
          </div>
          
          <div className="text-sm text-win95-darkgray mb-4">
            or click to browse your computer
          </div>

          {/* Supported Formats */}
          <div className="win95-window bg-white max-w-md mx-auto">
            <div className="win95-titlebar-inactive">
              <span className="text-xs">Supported File Types</span>
            </div>
            <div className="p-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex items-center space-x-1 text-win95-blue font-bold mb-1">
                  <Image className="w-3 h-3" />
                  <span>Images</span>
                </div>
                <div className="text-win95-black space-y-0.5">
                  <div>JPG, PNG, GIF</div>
                  <div>WEBP, SVG, TIFF</div>
                  <div>BMP, ICO, AVIF</div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-win95-purple font-bold mb-1">
                  <FileText className="w-3 h-3" />
                  <span>Documents</span>
                </div>
                <div className="text-win95-black space-y-0.5">
                  <div>PDF, DOCX, TXT</div>
                  <div>HTML, MD, RTF</div>
                  <div>CSV, XML</div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-win95-green font-bold mb-1">
                  <Music className="w-3 h-3" />
                  <span>Audio</span>
                </div>
                <div className="text-win95-black space-y-0.5">
                  <div>MP3, WAV, OGG</div>
                  <div>FLAC, AAC, M4A</div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-win95-red font-bold mb-1">
                  <Video className="w-3 h-3" />
                  <span>Video</span>
                </div>
                <div className="text-win95-black space-y-0.5">
                  <div>MP4, AVI, MOV</div>
                  <div>MKV, WEBM, FLV</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 win95-window bg-white">
          <div className="win95-titlebar-inactive">
            <span className="text-xs">Loaded Files ({files.length})</span>
          </div>
          
          <div className="win95-listbox max-h-32 overflow-auto">
            {/* Header */}
            <div className="bg-win95-gray border-b px-2 py-1 grid grid-cols-12 gap-2 text-xs font-bold" style={{ borderColor: '#808080' }}>
              <div className="col-span-1">Type</div>
              <div className="col-span-7">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* File Items */}
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`px-2 py-1 grid grid-cols-12 gap-2 text-xs border-b hover:bg-win95-blue hover:text-white cursor-pointer ${
                  index % 2 === 0 ? 'bg-white' : 'bg-win95-lightgray'
                }`}
                style={{ borderColor: '#e0e0e0' }}
              >
                <div className="col-span-1 flex justify-center">
                  {getFileIcon(file)}
                </div>
                <div className="col-span-7 truncate font-mono">
                  {file.name}
                </div>
                <div className="col-span-2 font-mono">
                  {formatFileSize(file.size)}
                </div>
                <div className="col-span-2">
                  <span className={`
                    px-1 text-xs font-mono
                    ${file.status === 'pending' ? 'text-win95-black' :
                      file.status === 'converting' ? 'text-win95-blue' :
                      file.status === 'completed' ? 'text-win95-green' :
                      'text-win95-red'}
                  `}>
                    {file.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;