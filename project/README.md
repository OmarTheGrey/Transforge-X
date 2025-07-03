# Transforge-X - Windows 95 File Converter

A nostalgic file conversion tool with authentic Windows 95 aesthetics and modern functionality.

![Transforge-X Screenshot](https://dulcet-kitsune-b714fb.netlify.app)

## Features

- **Multi-format Support**: Convert between images, documents, audio, video, and archive formats
- **Authentic Windows 95 UI**: Complete with classic window chrome, buttons, and system aesthetics
- **Drag & Drop Interface**: Easy file management with visual feedback
- **Batch Processing**: Convert multiple files simultaneously
- **Quality Settings**: Customizable conversion parameters for optimal results
- **Real-time Progress**: Visual progress tracking for all conversions
- **Statistics Panel**: Monitor conversion history and system information

## Supported Formats

### Images
- **Input/Output**: JPG, PNG, GIF, WEBP, SVG, TIFF, BMP, ICO, AVIF

### Documents
- **Input/Output**: PDF, TXT, HTML, MD, RTF, CSV, XML
- **Special**: DOCX to HTML/TXT conversion

### Audio
- **Input/Output**: MP3, WAV, OGG, FLAC, AAC, M4A

### Video
- **Input/Output**: MP4, WEBM, AVI, MOV, MKV, FLV

### Archives
- **Input/Output**: ZIP with customizable compression levels

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom Windows 95 components
- **Build Tool**: Vite
- **File Processing**: 
  - PDF-lib for PDF operations
  - Mammoth for DOCX conversion
  - JSZip for archive handling
  - Canvas API for image conversion
- **UI Components**: Lucide React icons
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OmarThegrey/Transforge-X.git
cd Transforge-X
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Add Files**: Drag and drop files onto the drop zone or click to browse
2. **Select Format**: Choose your desired output format for each file
3. **Configure Settings**: Adjust quality and compression settings in the Settings tab
4. **Convert**: Click "Convert" for individual files or "Convert All" for batch processing
5. **Download**: Download converted files individually or monitor progress in real-time

## Project Structure

```
src/
├── components/          # React components
│   ├── Desktop.tsx     # Windows 95 desktop environment
│   ├── FileConverterWindow.tsx  # Main application window
│   ├── FileDropZone.tsx # File upload interface
│   ├── ConversionQueue.tsx # File processing queue
│   ├── SettingsPanel.tsx # Conversion settings
│   └── StatsPanel.tsx  # Statistics and system info
├── services/           # Business logic
│   └── FileConverter.ts # File conversion engine
├── types/             # TypeScript definitions
│   └── index.ts       # Type definitions
└── styles/            # Styling
    └── index.css      # Global styles and Windows 95 theme
```

## Windows 95 Design System

The application faithfully recreates the Windows 95 aesthetic with:

- **Authentic Color Palette**: Classic gray (#c0c0c0) backgrounds with proper highlight/shadow borders
- **Typography**: MS Sans Serif font family for authentic text rendering
- **Window Chrome**: Proper title bars, borders, and button styling
- **Interactive Elements**: Hover states, pressed button effects, and focus indicators
- **System Elements**: Taskbar, desktop icons, and system tray simulation
- **Progress Indicators**: Classic Windows 95 progress bars with animated fills

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Limitations

- Audio and video conversion uses format container changes (full transcoding requires server-side processing)
- Large file processing is limited by browser memory constraints
- Some advanced document features may not be preserved during conversion

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is released into the public domain under The Unlicense - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Windows 95 operating system
- Icons provided by [Lucide React](https://lucide.dev/)
- File processing libraries: PDF-lib, Mammoth, JSZip
- Built with modern web technologies while honoring retro aesthetics

## Live Demo

Visit the live application: [https://dulcet-kitsune-b714fb.netlify.app](https://dulcet-kitsune-b714fb.netlify.app)

---

*Experience the nostalgia of 90s computing with modern file conversion capabilities.*