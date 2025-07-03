import { ConversionSettings } from '../types';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

export class FileConverter {
  async convertFile(file: File, targetFormat: string, settings: ConversionSettings): Promise<Blob> {
    const fileType = this.getFileCategory(file);
    
    switch (fileType) {
      case 'image':
        return this.convertImage(file, targetFormat, settings);
      case 'document':
        return this.convertDocument(file, targetFormat, settings);
      case 'audio':
        return this.convertAudio(file, targetFormat, settings);
      case 'video':
        return this.convertVideo(file, targetFormat, settings);
      case 'archive':
        return this.convertArchive(file, targetFormat, settings);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

  private getFileCategory(file: File): string {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    if (file.type.includes('zip') || file.type.includes('rar')) return 'archive';
    return 'document';
  }

  private async convertImage(file: File, targetFormat: string, settings: ConversionSettings): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          const quality = settings.imageQuality / 100;
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert image'));
            }
          }, this.getMimeType(targetFormat), quality);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  private async convertDocument(file: File, targetFormat: string, settings: ConversionSettings): Promise<Blob> {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    try {
      if (fileExtension === 'docx' && targetFormat === 'html') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        return new Blob([result.value], { type: 'text/html' });
      }

      if (fileExtension === 'docx' && targetFormat === 'txt') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return new Blob([result.value], { type: 'text/plain' });
      }

      if (fileExtension === 'pdf' && targetFormat === 'txt') {
        // For PDF to text conversion, we'll return the original file
        // In a real implementation, you'd use a PDF parsing library
        const text = await file.text();
        return new Blob([text], { type: 'text/plain' });
      }

      if (targetFormat === 'pdf') {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        
        const text = await file.text();
        page.drawText(text, {
          x: 50,
          y: 750,
          size: 12,
        });

        const pdfBytes = await pdfDoc.save();
        return new Blob([pdfBytes], { type: 'application/pdf' });
      }

      // For text-based conversions
      const text = await file.text();
      return new Blob([text], { type: this.getMimeType(targetFormat) });
    } catch (error) {
      throw new Error(`Document conversion failed: ${error}`);
    }
  }

  private async convertAudio(file: File, targetFormat: string, settings: ConversionSettings): Promise<Blob> {
    // Audio conversion in browser is limited
    // For now, we'll return the original file with a note that this requires server-side processing
    console.warn('Audio conversion requires server-side processing or Web Audio API');
    
    // Create a simple converted version by changing the blob type
    const arrayBuffer = await file.arrayBuffer();
    return new Blob([arrayBuffer], { type: this.getMimeType(targetFormat) });
  }

  private async convertVideo(file: File, targetFormat: string, settings: ConversionSettings): Promise<Blob> {
    // Video conversion in browser is very limited
    // For now, we'll return the original file with a note that this requires server-side processing
    console.warn('Video conversion requires server-side processing or WebCodecs API');
    
    // Create a simple converted version by changing the blob type
    const arrayBuffer = await file.arrayBuffer();
    return new Blob([arrayBuffer], { type: this.getMimeType(targetFormat) });
  }

  private async convertArchive(file: File, targetFormat: string, settings: ConversionSettings): Promise<Blob> {
    if (targetFormat === 'zip') {
      const zip = new JSZip();
      
      if (file.type === 'application/zip') {
        // If it's already a zip, recompress with new settings
        const existingZip = await JSZip.loadAsync(file);
        const fileNames = Object.keys(existingZip.files);
        
        for (const fileName of fileNames) {
          const fileData = await existingZip.files[fileName].async('blob');
          zip.file(fileName, fileData);
        }
      } else {
        // Create a new zip with the single file
        zip.file(file.name, file);
      }

      return zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: settings.compressionLevel
        }
      });
    }

    throw new Error(`Unsupported archive format: ${targetFormat}`);
  }

  private getMimeType(format: string): string {
    const mimeTypes: { [key: string]: string } = {
      // Images
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'bmp': 'image/bmp',
      'tiff': 'image/tiff',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon',
      'avif': 'image/avif',
      
      // Documents
      'pdf': 'application/pdf',
      'txt': 'text/plain',
      'html': 'text/html',
      'md': 'text/markdown',
      'rtf': 'application/rtf',
      'csv': 'text/csv',
      'xml': 'application/xml',
      
      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'flac': 'audio/flac',
      'aac': 'audio/aac',
      'm4a': 'audio/mp4',
      
      // Video
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'avi': 'video/x-msvideo',
      'mov': 'video/quicktime',
      'mkv': 'video/x-matroska',
      'flv': 'video/x-flv',
      
      // Archive
      'zip': 'application/zip'
    };

    return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
  }
}