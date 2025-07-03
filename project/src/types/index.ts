export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress: number;
  outputFormat: string;
  outputBlob?: Blob;
  error?: string | null;
}

export interface ConversionSettings {
  imageQuality: number;
  audioQuality: number;
  videoQuality: 'low' | 'medium' | 'high';
  compressionLevel: number;
}

export interface SupportedFormat {
  extension: string;
  name: string;
  category: 'image' | 'document' | 'audio' | 'video' | 'archive';
}

export interface ConversionStats {
  totalConverted: number;
  totalSize: number;
  conversionTime: number;
}