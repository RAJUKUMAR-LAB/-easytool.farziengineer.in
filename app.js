/* ==========================================================================
   OmniToolbox - Core Application Architecture & Router
   State Management, Tool Registry, Sectional Catalog, & UI Engine
   ========================================================================== */

const App = {
  // Global State
  currentTool: null,
  favorites: JSON.parse(localStorage.getItem('omni_favorites') || '["image-converter","pdf-merger","python-runner","password-generator","qr-studio"]'),
  searchQuery: '',
  selectedCategory: 'all',
  selectedBadgeFilter: 'all',

  // Categories Metadata
  categories: {
    pdf: {
      name: 'PDF Tools',
      desc: 'Merge, split, convert to images/text, watermark, rotate, paginate, & organize PDFs client-side',
      icon: 'fa-solid fa-file-pdf',
      color: 'rose'
    },
    image: {
      name: 'Image Tools',
      desc: 'Convert formats (JPG, PNG, WEBP), compress, crop, enhance, base64, & canvas filters',
      icon: 'fa-solid fa-photo-film',
      color: 'cyan'
    },
    media: {
      name: 'Audio & Video Tools',
      desc: 'Extract audio, waveform trimmer, volume booster, voice recorder, & HD video frame grabber',
      icon: 'fa-solid fa-compact-disc',
      color: 'emerald'
    },
    text: {
      name: 'Text & Language Tools',
      desc: 'Word/char counters, case converter, minifier, diff checker, & smart scratchpad',
      icon: 'fa-solid fa-font',
      color: 'amber'
    },
    calculators: {
      name: 'Calculators',
      desc: 'Financial (GST, EMI, SIP), age, health (BMI), scientific, GPA & Ohm\'s law calculators',
      icon: 'fa-solid fa-calculator',
      color: 'rose'
    },
    converters: {
      name: 'Unit & Data Converters',
      desc: 'Universal unit engine, JSON ↔ CSV, JSON ↔ TypeScript, & HEX ↔ RGB ↔ HSL',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      color: 'cyan'
    },
    code: {
      name: 'Developer & Code Tools',
      desc: 'Python 3 WASM sandbox, HTML/CSS/JS formatters, SQL beautifier, live playground & regex',
      icon: 'fa-solid fa-code',
      color: 'purple'
    },
    security: {
      name: 'Security & Privacy',
      desc: 'Password generator, cryptographic hash suite (SHA-256, SHA-512) & binary encoders',
      icon: 'fa-solid fa-shield-halved',
      color: 'emerald'
    },
    time: {
      name: 'Date & Time Tools',
      desc: 'Live world clocks, stopwatch, pomodoro productivity timer & Unix epoch converter',
      icon: 'fa-solid fa-clock',
      color: 'amber'
    },
    business: {
      name: 'Business & Social Tools',
      desc: 'Professional invoice generator & multi-platform social media image resizer',
      icon: 'fa-solid fa-briefcase',
      color: 'cyan'
    },
    ai: {
      name: 'AI & Smart Tools',
      desc: 'AI text detector, authenticity inspector, prompt assistant, summarizer & background remover',
      icon: 'fa-solid fa-brain',
      color: 'purple'
    }
  },

  // Complete Tool Registry (68 Functional Utilities)
  tools: [
    // === 1. PDF TOOLS ===
    {
      id: 'pdf-to-jpg',
      title: 'PDF → JPG',
      description: 'Convert PDF document pages into high-resolution JPG images with instant download.',
      category: 'pdf',
      icon: 'fa-solid fa-file-image',
      color: 'rose',
      featured: true,
      tags: ['pdf to jpg', 'convert', 'images', 'extract', 'pdf'],
      render: (c) => PdfTools.renderPdfToImages(c)
    },
    {
      id: 'pdf-to-png',
      title: 'PDF → PNG',
      description: 'Convert PDF pages into lossless transparent PNG images.',
      category: 'pdf',
      icon: 'fa-solid fa-file-image',
      color: 'rose',
      tags: ['pdf to png', 'convert', 'png', 'lossless', 'pdf'],
      render: (c) => PdfTools.renderPdfToImages(c)
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG → PDF',
      description: 'Compile JPG, PNG, and WEBP photos into a clean single PDF document.',
      category: 'pdf',
      icon: 'fa-solid fa-images',
      color: 'rose',
      featured: true,
      tags: ['jpg to pdf', 'images to pdf', 'convert', 'photos to pdf'],
      render: (c) => PdfTools.renderImagesToPdf(c)
    },
    {
      id: 'png-to-pdf',
      title: 'PNG → PDF',
      description: 'Convert PNG graphics and transparent images into a standardized PDF.',
      category: 'pdf',
      icon: 'fa-solid fa-file-pdf',
      color: 'rose',
      tags: ['png to pdf', 'convert', 'document', 'pdf'],
      render: (c) => PdfTools.renderImagesToPdf(c)
    },
    {
      id: 'pdf-to-text',
      title: 'PDF → Text',
      description: 'Extract all readable text, titles, word counts, and metadata from PDF files client-side.',
      category: 'pdf',
      icon: 'fa-solid fa-file-lines',
      color: 'rose',
      tags: ['pdf to text', 'extract text', 'ocr', 'metadata', 'copy text'],
      render: (c) => PdfTools.renderExtractText(c)
    },
    {
      id: 'text-to-pdf',
      title: 'Text → PDF',
      description: 'Write notes, memos, or documentation and export straight into formatted print-ready PDF files.',
      category: 'pdf',
      icon: 'fa-solid fa-file-pen',
      color: 'rose',
      tags: ['text to pdf', 'notes to pdf', 'doc', 'export', 'write'],
      render: (c) => PdfTools.renderTextToPdf(c)
    },
    {
      id: 'pdf-merger',
      title: 'PDF Merger',
      description: 'Merge multiple PDF documents into a single consolidated file client-side with 100% privacy.',
      category: 'pdf',
      icon: 'fa-solid fa-layer-group',
      color: 'rose',
      featured: true,
      tags: ['pdf merger', 'merge', 'combine', 'documents', 'join pdf'],
      render: (c) => PdfTools.renderMerger(c)
    },
    {
      id: 'pdf-splitter',
      title: 'PDF Splitter',
      description: 'Extract specific page ranges or split large PDF files into distinct documents.',
      category: 'pdf',
      icon: 'fa-solid fa-scissors',
      color: 'rose',
      tags: ['pdf splitter', 'split', 'extract pages', 'slice', 'separate'],
      render: (c) => PdfTools.renderSplitter(c)
    },
    {
      id: 'rotate-pdf',
      title: 'PDF Page Rotator',
      description: 'Rotate PDF pages by 90°, 180°, or 270° with interactive live thumbnail previews.',
      category: 'pdf',
      icon: 'fa-solid fa-rotate',
      color: 'rose',
      tags: ['pdf rotator', 'rotate', 'turn', 'orientation', 'flip'],
      render: (c) => PdfTools.renderRotatePdf(c)
    },
    {
      id: 'watermark-pdf',
      title: 'PDF Watermark',
      description: 'Stamp custom text or confidential watermarks across pages with opacity, size & position controls.',
      category: 'pdf',
      icon: 'fa-solid fa-stamp',
      color: 'rose',
      tags: ['pdf watermark', 'stamp', 'confidential', 'brand', 'copyright'],
      render: (c) => PdfTools.renderWatermarkPdf(c)
    },
    {
      id: 'page-numbers-pdf',
      title: 'PDF Page Numbers',
      description: 'Insert professional page numbers ("Page 1 of N", "{n}", "{n}/{total}") with custom typography.',
      category: 'pdf',
      icon: 'fa-solid fa-arrow-down-1-9',
      color: 'rose',
      tags: ['pdf page numbers', 'paginate', 'footer', 'numbering'],
      render: (c) => PdfTools.renderPageNumbers(c)
    },
    {
      id: 'organize-pdf',
      title: 'PDF Page Organizer & Deleter',
      description: 'Visual interactive page manager: delete unwanted pages, reorder pages, and export cleaned PDFs.',
      category: 'pdf',
      icon: 'fa-solid fa-table-cells-large',
      color: 'rose',
      tags: ['organize pdf', 'delete pages', 'reorder', 'remove pages'],
      render: (c) => PdfTools.renderOrganizePdf(c)
    },

    // === 2. IMAGE TOOLS ===
    {
      id: 'image-converter',
      title: 'JPG → PNG',
      description: 'Convert JPG to PNG or vice-versa with real-time compression, resize scaling, and format swap.',
      category: 'image',
      icon: 'fa-solid fa-photo-film',
      color: 'cyan',
      featured: true,
      tags: ['jpg to png', 'png to jpg', 'convert', 'image', 'compress', 'resize'],
      render: (c) => ImageTools.renderConverter(c)
    },
    {
      id: 'png-to-jpg',
      title: 'PNG → JPG',
      description: 'Convert PNG graphics to high-compatibility JPG photos with custom background fill & quality tuning.',
      category: 'image',
      icon: 'fa-solid fa-file-image',
      color: 'cyan',
      tags: ['png to jpg', 'convert', 'image', 'photo', 'compress'],
      render: (c) => ImageTools.renderConverter(c)
    },
    {
      id: 'jpg-to-webp',
      title: 'JPG → WEBP',
      description: 'Convert JPG or PNG images to next-gen lightweight WEBP format for 3x faster website loads.',
      category: 'image',
      icon: 'fa-solid fa-bolt',
      color: 'cyan',
      tags: ['jpg to webp', 'png to webp', 'webp', 'compress', 'optimize'],
      render: (c) => ImageTools.renderConverter(c)
    },
    {
      id: 'image-cropper',
      title: 'Image Resizer & Cropper',
      description: 'Crop images with interactive aspect ratios (1:1, 16:9, 9:16, 4:3), 90° rotation, and flips.',
      category: 'image',
      icon: 'fa-solid fa-crop-simple',
      color: 'cyan',
      featured: true,
      tags: ['crop', 'image cropper', 'aspect ratio', 'resize image', 'avatar'],
      render: (c) => ImageTools.renderCropper(c)
    },
    {
      id: 'image-enhancer',
      title: 'Image Enhancer & Super-Resolution',
      description: 'Auto-enhance contrast, sharpen clarity, boost vibrance, and upscale resolution 2x/3x on canvas.',
      category: 'image',
      icon: 'fa-solid fa-wand-magic-sparkles',
      color: 'emerald',
      tags: ['enhance', 'sharpen', 'upscale', 'super resolution', 'quality'],
      render: (c) => ImageTools.renderEnhancer(c)
    },
    {
      id: 'image-base64',
      title: 'Image → Base64',
      description: 'Convert images to Base64 Data URI strings for web embedding, or decode Base64 back to image files.',
      category: 'image',
      icon: 'fa-solid fa-file-code',
      color: 'purple',
      tags: ['image to base64', 'base64 to image', 'data uri', 'encode'],
      render: (c) => ImageTools.renderBase64(c)
    },
    {
      id: 'image-filters',
      title: 'Canvas Filters & Effects',
      description: 'Apply live real-time visual filters (brightness, contrast, vintage sepia, cyberpunk, blur) on canvas.',
      category: 'image',
      icon: 'fa-solid fa-palette',
      color: 'emerald',
      tags: ['filters', 'effects', 'canvas', 'edit', 'photo'],
      render: (c) => ImageTools.renderFilters(c)
    },

    // === 3. VIDEO & AUDIO TOOLS ===
    {
      id: 'video-studio',
      title: 'Video Frame Grabber & Studio',
      description: 'Scrub video frame-by-frame, grab full-HD snapshot screenshots, change playback speeds & check specs.',
      category: 'media',
      icon: 'fa-solid fa-video',
      color: 'purple',
      featured: true,
      tags: ['video', 'snapshot', 'frame grabber', 'screenshot', 'mp4'],
      render: (c) => MediaTools.renderVideoStudio(c)
    },
    {
      id: 'video-to-audio',
      title: 'Video → Audio',
      description: 'Extract crisp audio tracks from MP4, WEBM, or MOV video files directly in your browser.',
      category: 'media',
      icon: 'fa-solid fa-file-audio',
      color: 'emerald',
      tags: ['video to audio', 'extract audio', 'mp4 to mp3', 'sound', 'wav'],
      render: (c) => MediaTools.renderAudioStudio(c)
    },
    {
      id: 'audio-studio',
      title: 'Audio Studio & Voice Trimmer',
      description: 'Waveform visualizer, trim start/end times, boost quiet volume up to 300%, speed controller & mic recorder.',
      category: 'media',
      icon: 'fa-solid fa-music',
      color: 'emerald',
      tags: ['audio studio', 'trimmer', 'cutter', 'volume boost', 'voice recorder', 'wav'],
      render: (c) => MediaTools.renderAudioStudio(c)
    },

    // === 4. TEXT & LANGUAGE TOOLS ===
    {
      id: 'text-tools',
      title: 'Text Analyzer & Case Converter',
      description: 'Transform casing (UPPERCASE, lowercase, camelCase, snake_case) and compute word count & metrics.',
      category: 'text',
      icon: 'fa-solid fa-font',
      color: 'amber',
      tags: ['text analyzer', 'case converter', 'word counter', 'reading time'],
      render: (c) => UtilityTools.renderTextTools(c)
    },
    {
      id: 'text-minifier',
      title: 'Text & Note Size Reducer',
      description: 'Compress text and notes: strip blank lines, remove redundant spaces, collapse tags, and view byte savings.',
      category: 'text',
      icon: 'fa-solid fa-compress',
      color: 'amber',
      featured: true,
      tags: ['reduce size', 'compress text', 'clean text', 'minify', 'bytes'],
      render: (c) => UtilityTools.renderTextMinifier(c)
    },
    {
      id: 'notes-studio',
      title: 'Smart Scratchpad & Daily Notes',
      description: 'Auto-saving private scratchpad with real-time reading stats, clean text tools, and 1-click export to PDF, TXT & MD.',
      category: 'text',
      icon: 'fa-solid fa-pen-to-square',
      color: 'cyan',
      tags: ['notes', 'scratchpad', 'memo', 'write', 'auto save'],
      render: (c) => UtilityTools.renderNotesStudio(c)
    },
    {
      id: 'diff-checker',
      title: 'Text & Code Diff Checker',
      description: 'Compare two text blocks or code files with visual side-by-side addition and deletion highlighting.',
      category: 'text',
      icon: 'fa-solid fa-code-compare',
      color: 'emerald',
      tags: ['diff checker', 'compare', 'difference', 'text diff', 'code diff'],
      render: (c) => UtilityTools.renderDiffChecker(c)
    },
    {
      id: 'lorem-generator',
      title: 'Lorem Ipsum Generator',
      description: 'Generate customizable paragraphs, sentences, or word counts of dummy placeholder text for designs.',
      category: 'text',
      icon: 'fa-solid fa-paragraph',
      color: 'amber',
      tags: ['lorem ipsum', 'dummy text', 'placeholder', 'generator'],
      render: (c) => UtilityTools.renderLoremGenerator(c)
    },
    {
      id: 'url-encoder',
      title: 'Text → URL Encode',
      description: 'Encode or decode complex URLs, special characters, and inspect query parameter key-value pairs.',
      category: 'text',
      icon: 'fa-solid fa-link',
      color: 'cyan',
      tags: ['text to url encode', 'url decode', 'params', 'query'],
      render: (c) => UtilityTools.renderUrlEncoder(c)
    },

    // === 5. CALCULATORS ===
    {
      id: 'gst-calculator',
      title: 'GST Calculator',
      description: 'Calculate exclusive/inclusive GST rates (5%, 12%, 18%, 28%) with CGST, SGST, IGST split & progress bar.',
      category: 'calculators',
      icon: 'fa-solid fa-receipt',
      color: 'rose',
      featured: true,
      tags: ['gst calculator', 'tax', 'finance', 'invoice tax', 'cgst', 'sgst'],
      render: (c) => CalculatorTools.renderGstCalculator(c)
    },
    {
      id: 'emi-calculator',
      title: 'EMI & Loan Calculator',
      description: 'Calculate monthly loan EMI, total interest, and principal amortization with interactive sliders.',
      category: 'calculators',
      icon: 'fa-solid fa-hand-holding-dollar',
      color: 'emerald',
      featured: true,
      tags: ['emi calculator', 'loan', 'mortgage', 'interest', 'monthly payment'],
      render: (c) => CalculatorTools.renderEmiCalculator(c)
    },
    {
      id: 'sip-calculator',
      title: 'SIP & Investment Calculator',
      description: 'Project future maturity wealth from monthly SIPs or one-time lumpsum mutual fund investments.',
      category: 'calculators',
      icon: 'fa-solid fa-piggy-bank',
      color: 'purple',
      featured: true,
      tags: ['sip calculator', 'investment', 'wealth', 'compound interest', 'mutual fund'],
      render: (c) => CalculatorTools.renderSipCalculator(c)
    },
    {
      id: 'age-calculator',
      title: 'Age & Date Difference Calculator',
      description: 'Calculate exact chronological age in years, months, days, hours, and countdown to your next birthday.',
      category: 'calculators',
      icon: 'fa-solid fa-cake-candles',
      color: 'amber',
      tags: ['age calculator', 'date difference', 'birthday', 'how old', 'chronology'],
      render: (c) => CalculatorTools.renderAgeCalculator(c)
    },
    {
      id: 'bmi-calculator',
      title: 'BMI & Calorie Calculator',
      description: 'Compute Body Mass Index, diagnostic category, BMR, and daily calorie maintenance requirements.',
      category: 'calculators',
      icon: 'fa-solid fa-heart-pulse',
      color: 'rose',
      tags: ['bmi calculator', 'calorie', 'health', 'fitness', 'weight', 'bmr'],
      render: (c) => CalculatorTools.renderBmiCalculator(c)
    },
    {
      id: 'scientific-calculator',
      title: 'Scientific Calculator',
      description: 'Scientific calculator with trigonometry (sin, cos, tan), log, ln, powers, roots, factorial, and history.',
      category: 'calculators',
      icon: 'fa-solid fa-calculator',
      color: 'cyan',
      tags: ['scientific calculator', 'math', 'trig', 'equations', 'algebra'],
      render: (c) => CalculatorTools.renderScientificCalculator(c)
    },
    {
      id: 'gpa-calculator',
      title: 'GPA & CGPA Calculator',
      description: 'Semester GPA & Cumulative CGPA calculator with course credits, letter grade points, and percentage equivalent.',
      category: 'calculators',
      icon: 'fa-solid fa-graduation-cap',
      color: 'purple',
      tags: ['gpa calculator', 'cgpa', 'student', 'grades', 'college', 'university'],
      render: (c) => CalculatorTools.renderGpaCalculator(c)
    },
    {
      id: 'ohms-law',
      title: "Ohm's Law & Electrical Suite",
      description: 'Solve Voltage (V), Current (I), Resistance (R), and Power (P) in electrical and physics circuits.',
      category: 'calculators',
      icon: 'fa-solid fa-bolt',
      color: 'cyan',
      tags: ['ohms law', 'physics', 'electrical', 'voltage', 'current', 'watts'],
      render: (c) => CalculatorTools.renderOhmsLaw(c)
    },

    // === 6. UNIT & DATA CONVERTERS ===
    {
      id: 'json-to-csv',
      title: 'JSON → CSV',
      description: 'Convert JSON arrays of objects into formatted CSV spreadsheets with 1-click download & copy.',
      category: 'converters',
      icon: 'fa-solid fa-file-csv',
      color: 'emerald',
      featured: true,
      tags: ['json to csv', 'csv to json', 'convert', 'data', 'table'],
      render: (c) => ConverterTools.renderJsonCsv(c, 'json-to-csv')
    },
    {
      id: 'csv-to-json',
      title: 'CSV → JSON',
      description: 'Parse CSV rows and headers into structured JSON objects and arrays with type casting.',
      category: 'converters',
      icon: 'fa-solid fa-table-list',
      color: 'cyan',
      tags: ['csv to json', 'json to csv', 'convert', 'data', 'json'],
      render: (c) => ConverterTools.renderJsonCsv(c, 'csv-to-json')
    },
    {
      id: 'json-to-code',
      title: 'JSON → TypeScript',
      description: 'Automatically generate TypeScript interfaces, Python Pydantic models, or C# classes from JSON payloads.',
      category: 'converters',
      icon: 'fa-solid fa-code',
      color: 'purple',
      tags: ['json to typescript', 'json to python', 'json to c#', 'models', 'types'],
      render: (c) => ConverterTools.renderJsonToCode(c)
    },
    {
      id: 'unit-converter',
      title: 'Universal Unit Converter',
      description: 'Convert Length, Weight, Temperature, Speed, and Digital Storage units with live bidirectional calculation.',
      category: 'converters',
      icon: 'fa-solid fa-scale-balanced',
      color: 'cyan',
      tags: ['unit converter', 'length', 'weight', 'temperature', 'storage', 'speed'],
      render: (c) => ConverterTools.renderUnitConverter(c)
    },
    {
      id: 'color-converter',
      title: 'HEX → RGB',
      description: 'Convert color codes between HEX, RGB, and HSL formats with live sliders and copyable CSS snippets.',
      category: 'converters',
      icon: 'fa-solid fa-palette',
      color: 'cyan',
      tags: ['hex to rgb', 'rgb to hex', 'rgb to hsl', 'color converter', 'css'],
      render: (c) => ConverterTools.renderColorConverter(c)
    },
    {
      id: 'color-studio',
      title: 'CSS Gradient Generator',
      description: 'Design linear and radial CSS gradients with live angle controls, color stops, and copyable CSS rules.',
      category: 'converters',
      icon: 'fa-solid fa-brush',
      color: 'purple',
      tags: ['gradient generator', 'css gradient', 'palette', 'linear', 'radial'],
      render: (c) => UtilityTools.renderColorStudio(c)
    },

    // === 7. DEVELOPER & CODE TOOLS ===
    {
      id: 'python-runner',
      title: 'Python 3 In-Browser Sandbox',
      description: 'Execute genuine Python 3 code in real-time WebAssembly (Pyodide) with terminal output stdout/stderr.',
      category: 'code',
      icon: 'fa-brands fa-python',
      color: 'cyan',
      featured: true,
      tags: ['python', 'code', 'wasm', 'pyodide', 'runner', 'compiler', 'terminal'],
      render: (c) => CodeTools.renderPythonRunner(c)
    },
    {
      id: 'code-formatter',
      title: 'HTML / CSS / JS Formatter',
      description: 'Beautify messy code or compact/minify for production with syntax coloration and size metrics.',
      category: 'code',
      icon: 'fa-solid fa-code',
      color: 'purple',
      tags: ['code formatter', 'beautify', 'format', 'html', 'css', 'javascript'],
      render: (c) => CodeTools.renderFormatter(c)
    },
    {
      id: 'sql-formatter',
      title: 'SQL Formatter & Beautifier',
      description: 'Auto-align and beautify complex SQL queries with uppercase keyword formatting and custom indenting.',
      category: 'code',
      icon: 'fa-solid fa-database',
      color: 'cyan',
      tags: ['sql formatter', 'query', 'format', 'database', 'beautify'],
      render: (c) => CodeTools.renderSqlFormatter(c)
    },
    {
      id: 'web-playground',
      title: 'Live Web Code Playground',
      description: 'Instant multi-pane HTML, CSS, and JavaScript live scratchpad with real-time sandbox execution.',
      category: 'code',
      icon: 'fa-solid fa-laptop-code',
      color: 'emerald',
      tags: ['playground', 'html', 'css', 'js', 'live', 'preview', 'sandbox'],
      render: (c) => CodeTools.renderPlayground(c)
    },
    {
      id: 'regex-lab',
      title: 'Regex Laboratory',
      description: 'Test regular expressions interactively with live highlight, match breakdown, and quick preset patterns.',
      category: 'code',
      icon: 'fa-solid fa-asterisk',
      color: 'cyan',
      tags: ['regex laboratory', 'pattern', 'test', 'match', 'expression'],
      render: (c) => CodeTools.renderRegex(c)
    },
    {
      id: 'markdown-editor',
      title: 'Markdown Live Editor',
      description: 'Write Markdown with real-time styled preview, instant HTML copy, and downloadable .md files.',
      category: 'code',
      icon: 'fa-brands fa-markdown',
      color: 'purple',
      tags: ['markdown editor', 'preview', 'md', 'html', 'write'],
      render: (c) => CodeTools.renderMarkdownEditor(c)
    },

    // === 8. SECURITY & PRIVACY ===
    {
      id: 'password-generator',
      title: 'Secure Password Generator',
      description: 'Generate high-entropy cryptographically secure passwords with entropy rating and custom rule toggles.',
      category: 'security',
      icon: 'fa-solid fa-key',
      color: 'emerald',
      featured: true,
      tags: ['password generator', 'security', 'crypto', 'entropy'],
      render: (c) => UtilityTools.renderPasswordGenerator(c)
    },
    {
      id: 'hash-generator',
      title: 'Cryptographic Hash Suite',
      description: 'Compute SHA-256, SHA-512, SHA-1, and MD5 hashes simultaneously with checksum validation.',
      category: 'security',
      icon: 'fa-solid fa-fingerprint',
      color: 'cyan',
      tags: ['hash suite', 'sha256', 'sha512', 'md5', 'crypto', 'checksum'],
      render: (c) => UtilityTools.renderHashGenerator(c)
    },
    {
      id: 'file-sha256',
      title: 'File → SHA-256',
      description: 'Compute SHA-256 & SHA-512 cryptographic checksums of any local file with zero server uploads.',
      category: 'security',
      icon: 'fa-solid fa-file-shield',
      color: 'emerald',
      tags: ['file to sha-256', 'file to sha-512', 'file hash', 'checksum', 'integrity'],
      render: (c) => ConverterTools.renderFileHash(c)
    },
    {
      id: 'text-base64',
      title: 'Text → Base64',
      description: 'Encode plain text to Base64 and Hexadecimal bytes or decode back to UTF-8 text safely.',
      category: 'security',
      icon: 'fa-solid fa-shield-halved',
      color: 'purple',
      tags: ['text to base64', 'base64 to text', 'hex', 'decode', 'encode'],
      render: (c) => UtilityTools.renderTextBase64(c)
    },
    {
      id: 'text-binary',
      title: 'Text → Binary',
      description: 'Convert text into 8-bit binary numbers or decode binary back into readable text.',
      category: 'security',
      icon: 'fa-solid fa-microchip',
      color: 'cyan',
      tags: ['text to binary', 'binary to text', '8-bit', 'ascii binary'],
      render: (c) => ConverterTools.renderTextBinary(c)
    },

    // === 9. DATE & TIME TOOLS ===
    {
      id: 'world-clock',
      title: 'World Clock',
      description: 'Live real-time synchronized digital clocks across UTC, New York, London, Paris, Dubai, Mumbai, Tokyo & Sydney.',
      category: 'time',
      icon: 'fa-solid fa-globe',
      color: 'cyan',
      featured: true,
      tags: ['world clock', 'timezones', 'gmt', 'utc', 'international time'],
      render: (c) => TimeTools.renderWorldClock(c)
    },
    {
      id: 'stopwatch',
      title: 'Stopwatch & Lap Timer',
      description: 'High-precision millisecond stopwatch with lap split records, split difference, and copyable lap log.',
      category: 'time',
      icon: 'fa-solid fa-stopwatch',
      color: 'cyan',
      tags: ['stopwatch', 'timer', 'lap timer', 'split', 'milliseconds'],
      render: (c) => TimeTools.renderStopwatch(c)
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro Productivity Timer',
      description: '25m Focus / 5m Break Pomodoro timer with session counter and gentle audio completion chime.',
      category: 'time',
      icon: 'fa-solid fa-hourglass-start',
      color: 'purple',
      tags: ['pomodoro timer', 'focus', 'study timer', 'productivity', 'breaks'],
      render: (c) => TimeTools.renderPomodoro(c)
    },
    {
      id: 'unix-timestamp',
      title: 'Unix Timestamp → Date',
      description: 'Convert Unix epoch timestamps to human readable dates in UTC and local time, or get current epoch seconds.',
      category: 'time',
      icon: 'fa-solid fa-clock',
      color: 'amber',
      tags: ['unix timestamp to date', 'date to unix timestamp', 'epoch', 'seconds'],
      render: (c) => TimeTools.renderTimestampConverter(c)
    },

    // === 10. BUSINESS & SOCIAL MEDIA ===
    {
      id: 'invoice-generator',
      title: 'Invoice & Receipt Generator',
      description: 'Build print-ready professional invoices and receipts with custom line items, tax rates, and PDF printing.',
      category: 'business',
      icon: 'fa-solid fa-file-invoice-dollar',
      color: 'emerald',
      featured: true,
      tags: ['invoice generator', 'receipt', 'billing', 'pdf invoice', 'freelancer'],
      render: (c) => BusinessSocialTools.renderInvoiceGenerator(c)
    },
    {
      id: 'social-resizer',
      title: 'Social Media Resizer & Studio',
      description: 'Crop and resize images for Instagram Post (1:1), Story (9:16), YouTube Thumbnail (16:9), Banner, Twitter & LinkedIn.',
      category: 'business',
      icon: 'fa-solid fa-share-nodes',
      color: 'cyan',
      featured: true,
      tags: ['social media resizer', 'instagram', 'youtube thumbnail', 'banner', 'crop'],
      render: (c) => BusinessSocialTools.renderSocialResizer(c)
    },
    {
      id: 'qr-studio',
      title: 'QR Code Generator & Scanner',
      description: 'Create high-res custom colored QR codes for URLs, WiFis, contacts, and scan/decode QR from image uploads.',
      category: 'business',
      icon: 'fa-solid fa-qrcode',
      color: 'purple',
      tags: ['qr code generator', 'qr scanner', 'wifi qr', 'barcode'],
      render: (c) => UtilityTools.renderQrStudio(c)
    },

    // === 11. AI TOOLS ===
    {
      id: 'ai-text-detector',
      title: 'AI Text & Content Detector',
      description: 'Detect AI-generated text from ChatGPT, Claude, & Gemini using perplexity, burstiness variance, and sentence heatmaps.',
      category: 'ai',
      icon: 'fa-solid fa-robot',
      color: 'purple',
      featured: true,
      tags: ['ai text detector', 'ai content detector', 'chatgpt detector', 'authenticity', 'plagiarism'],
      render: (c) => AiTools.renderAiTextDetector(c)
    },
    {
      id: 'ai-media-detector',
      title: 'AI Image Authenticity Analyzer',
      description: 'Verify whether an image was synthesized by Midjourney, DALL-E, or Stable Diffusion via EXIF provenance & noise inspection.',
      category: 'ai',
      icon: 'fa-solid fa-camera',
      color: 'cyan',
      featured: true,
      tags: ['ai image detector', 'authenticity', 'deepfake', 'midjourney', 'dall-e'],
      render: (c) => AiTools.renderAiMediaDetector(c)
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant & Prompt Studio',
      description: 'Multi-persona AI assistant for software engineering, copywriting, translation, and business problem-solving.',
      category: 'ai',
      icon: 'fa-solid fa-brain',
      color: 'purple',
      tags: ['ai assistant', 'chat', 'prompt', 'gemini', 'writer'],
      render: (c) => AiTools.renderAiAssistant(c)
    },
    {
      id: 'ai-summarizer',
      title: 'AI Document Summarizer',
      description: 'Synthesize long articles, papers, and notes into executive bullet points, TL;DRs, sentiment scores, and keyword clouds.',
      category: 'ai',
      icon: 'fa-solid fa-align-left',
      color: 'cyan',
      tags: ['ai summarizer', 'summary', 'tldr', 'insights', 'bullets'],
      render: (c) => AiTools.renderAiSummarizer(c)
    },
    {
      id: 'ai-rewriter',
      title: 'AI Tone Rewriter & Paraphraser',
      description: 'Instantly transform text into professional, friendly, concise, academic, or persuasive tones with 1-click comparison.',
      category: 'ai',
      icon: 'fa-solid fa-pen-fancy',
      color: 'emerald',
      tags: ['ai tone rewriter', 'paraphrase', 'tone', 'grammar', 'polish'],
      render: (c) => AiTools.renderAiRewriter(c)
    },
    {
      id: 'ai-code-explainer',
      title: 'AI Code Explainer & Bug Detector',
      description: 'Deep logic breakdown, algorithmic Big-O time/space complexity analysis, and automated bug risk refactoring.',
      category: 'ai',
      icon: 'fa-solid fa-microchip',
      color: 'purple',
      tags: ['ai code explainer', 'bugs', 'big o', 'complexity', 'refactor'],
      render: (c) => AiTools.renderAiCodeExplainer(c)
    },
    {
      id: 'ai-bg-remover',
      title: 'Magic Background Remover',
      description: 'Instant client-side background removal for products, portraits, and graphics with custom backdrops.',
      category: 'ai',
      icon: 'fa-solid fa-wand-magic-sparkles',
      color: 'rose',
      tags: ['background remover', 'cutout', 'transparent', 'product', 'magic eraser'],
      render: (c) => AiTools.renderAiBgRemover(c)
    }
  ],

  // Initialization
  init() {
    // Enrich all tools with honest processing badges & privacy notices (Sections 5, 6, 7, 19, 20, 21)
    this.tools.forEach(tool => {
      if (tool.id === 'ai-bg-remover') {
        tool.badge = 'EXTERNAL API';
        tool.badgeType = 'api';
        tool.privacyNotice = 'External Processing: This tool uses an external background-removal service to process your image.';
      } else if (tool.id === 'ai-assistant' || tool.id === 'ai-summarizer' || tool.id === 'ai-code-explainer') {
        tool.badge = 'AI • Gemini API';
        tool.badgeType = 'ai';
        tool.privacyNotice = 'External Processing: This AI feature uses Google Gemini API to process your input. Your input may be transmitted to Google\'s service for processing.';
      } else if (tool.id === 'ai-text-detector') {
        tool.badge = 'LOCAL + AI';
        tool.badgeType = 'local-ai';
        tool.privacyNotice = 'Local Analysis: Evaluates linguistic perplexity, token distributions, and entropy heuristics directly inside your browser.';
      } else if (tool.id === 'ai-media-detector') {
        tool.badge = 'LOCAL + AI';
        tool.badgeType = 'local-ai';
        tool.privacyNotice = 'Local Forensic Inspection: Parses EXIF metadata, quantisation tables, and chroma variance locally in your browser.';
      } else {
        tool.badge = 'LOCAL';
        tool.badgeType = 'local';
        tool.privacyNotice = 'Local Processing: Your file is processed directly in your browser whenever technically possible. EasyTool does not permanently store your file.';
      }
    });

    // Parse URL Query Parameters (e.g. ?cat=pdf or ?q=calculator)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('category');
    if (catParam && (this.categories[catParam] || catParam === 'all' || catParam === 'favorites')) {
      this.selectedCategory = catParam;
      document.querySelectorAll('[data-category]').forEach(b => {
        b.classList.toggle('active', b.dataset.category === catParam);
      });
    }

    const qParam = urlParams.get('q') || urlParams.get('search');
    if (qParam) {
      this.searchQuery = qParam.toLowerCase().trim();
      const sInput = document.getElementById('global-search-input');
      if (sInput) sInput.value = qParam;
    }

    this.bindEvents();
    this.renderCatalog();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  // Event Handlers
  bindEvents() {
    // Header search input
    const headerSearch = document.getElementById('global-search-input');
    if (headerSearch) {
      headerSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        const isToolsPage = window.location.pathname.endsWith('tools.html') || window.location.pathname.includes('/tools');
        if (!isToolsPage) {
          // On Home page, filter featured tools if container exists
          this.renderCatalog();
        } else {
          if (this.currentTool) {
            window.location.hash = '';
          }
          this.renderCatalog();
        }
      });

      headerSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const isToolsPage = window.location.pathname.endsWith('tools.html') || window.location.pathname.includes('/tools');
          if (!isToolsPage) {
            window.location.href = `tools.html?q=${encodeURIComponent(headerSearch.value.trim())}`;
          }
        }
      });
    }

    // Keyboard shortcuts (Ctrl+K or Cmd+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openCommandPalette();
      }
      if (e.key === 'Escape') {
        this.closeCommandPalette();
      }
    });

    // Mobile Navigation Dropdown Toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileDropdown = document.getElementById('mobile-dropdown-menu');
    if (mobileToggle && mobileDropdown) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileDropdown.classList.toggle('active');
      });

      // Close dropdown when clicking any nav link inside it
      mobileDropdown.querySelectorAll('.top-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileDropdown.classList.remove('active');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (mobileDropdown.classList.contains('active') && !mobileDropdown.contains(e.target) && !mobileToggle.contains(e.target)) {
          mobileDropdown.classList.remove('active');
        }
      });
    }

    // Category navigation (filter pills)
    document.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.category;
        this.selectedCategory = cat;

        document.querySelectorAll('[data-category]').forEach(b => {
          b.classList.toggle('active', b.dataset.category === cat);
        });

        if (this.currentTool) {
          window.location.hash = '';
        }
        this.renderCatalog();
      });
    });

    // Badge Processing Filters (All, Local Only, AI, API)
    document.querySelectorAll('[data-badge-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.badgeFilter;
        this.selectedBadgeFilter = filter;

        document.querySelectorAll('[data-badge-filter]').forEach(b => {
          b.classList.toggle('active', b.dataset.badgeFilter === filter);
        });

        this.renderCatalog();
      });
    });

    // Hero Popular Tag Chips
    document.querySelectorAll('.hero-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.tagQuery || chip.textContent.trim().toLowerCase();
        const isToolsPage = window.location.pathname.endsWith('tools.html') || window.location.pathname.includes('/tools');
        if (!isToolsPage) {
          window.location.href = `tools.html?q=${encodeURIComponent(query)}`;
        } else {
          const headerSearch = document.getElementById('global-search-input');
          if (headerSearch) headerSearch.value = query;
          this.searchQuery = query;
          if (this.currentTool) window.location.hash = '';
          this.renderCatalog();
        }
      });
    });

    // Command palette modal overlay click to close
    const modalOverlay = document.getElementById('cmd-palette-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) this.closeCommandPalette();
      });
    }

    // Command palette input search
    const cmdInput = document.getElementById('cmd-search-input');
    if (cmdInput) {
      cmdInput.addEventListener('input', (e) => {
        this.renderCommandResults(e.target.value.toLowerCase().trim());
      });
    }
  },

  // Create HTML for a single tool card with Processing Badge
  createToolCard(tool) {
    const isFav = this.favorites.includes(tool.id);
    const tagsHtml = (tool.tags || []).slice(0, 3).map(t => `<span class="tool-mini-tag">${t}</span>`).join('');
    const iconClass = (tool.icon && tool.icon.trim()) ? tool.icon : (this.categories[tool.category]?.icon || 'fa-solid fa-wrench');

    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML = `
      <div class="tool-card-top">
        <div class="tool-icon-box ${tool.color}">
          <i class="${iconClass}"></i>
        </div>
        <div class="tool-card-actions">
          <span class="tool-badge-pill ${tool.badgeType || 'local'}"><span class="badge-dot"></span>${tool.badge || 'LOCAL'}</span>
          <button class="tool-fav-btn ${isFav ? 'active' : ''}" data-tool-fav="${tool.id}" title="${isFav ? 'Remove favorite' : 'Pin to favorites'}">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-star"></i>
          </button>
        </div>
      </div>
      <h3 class="tool-card-title">${tool.title}</h3>
      <p class="tool-card-desc">${tool.description}</p>
      <div class="tool-tags-cloud">${tagsHtml}</div>
      <div class="tool-card-footer">
        <span class="tool-category-badge">${this.categories[tool.category]?.name || tool.category}</span>
        <span class="arrow" style="font-size:0.8rem; font-weight:700;">Launch <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-tool-fav]')) {
        e.stopPropagation();
        this.toggleFavorite(tool.id);
        return;
      }
      const isToolsPage = window.location.pathname.endsWith('tools.html') || window.location.pathname.includes('/tools');
      if (!isToolsPage) {
        window.location.href = `tools.html#${tool.id}`;
      } else {
        window.location.hash = `#${tool.id}`;
      }
    });

    return card;
  },

  // Helper filter tool
  filterTool(tool) {
    // 1. Badge Filter
    if (this.selectedBadgeFilter === 'local' && tool.badgeType !== 'local' && tool.badgeType !== 'local-ai') return false;
    if (this.selectedBadgeFilter === 'ai' && tool.badgeType !== 'ai' && tool.badgeType !== 'local-ai') return false;
    if (this.selectedBadgeFilter === 'api' && tool.badgeType !== 'api') return false;

    // 2. Search query filter
    if (this.searchQuery) {
      const q = this.searchQuery;
      const match = tool.title.toLowerCase().includes(q) ||
                    tool.description.toLowerCase().includes(q) ||
                    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(q)));
      if (!match) return false;
    }

    return true;
  },

  // Render Organized Sectional Catalog
  renderCatalog() {
    // A) If Homepage Featured Grid exists on page, populate it
    const featuredGrid = document.getElementById('featured-tools-grid');
    if (featuredGrid) {
      featuredGrid.innerHTML = '';
      const priorityIds = ['pdf-to-jpg', 'jpg-to-pdf', 'pdf-merger', 'image-converter', 'gst-calculator', 'emi-calculator', 'python-runner', 'unit-converter', 'invoice-generator', 'ai-text-detector', 'ai-bg-remover', 'ai-assistant'];
      let topFeatured = this.tools.filter(t => priorityIds.includes(t.id));
      if (this.searchQuery) {
        topFeatured = topFeatured.filter(t => this.filterTool(t));
      }
      topFeatured.forEach(t => featuredGrid.appendChild(this.createToolCard(t)));
    }

    // B) If Catalog Sections Container exists (tools.html), populate catalog
    const container = document.getElementById('catalog-sections-container');
    if (!container) return;
    container.innerHTML = '';

    // 1. Search Query Mode
    if (this.searchQuery) {
      const matched = this.tools.filter(t => this.filterTool(t));

      const searchSection = document.createElement('div');
      searchSection.className = 'home-category-section';
      searchSection.innerHTML = `
        <div class="section-header-banner">
          <div class="section-header-left">
            <div class="section-icon-badge"><i class="fa-solid fa-magnifying-glass"></i></div>
            <div>
              <div class="section-title-text">Search Results for "${this.searchQuery}"</div>
              <div class="section-subtitle-text">${matched.length} matching tools found</div>
            </div>
          </div>
          <button class="btn btn-sm btn-secondary" id="btn-clear-search">Clear Search</button>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'tools-grid';

      if (!matched.length) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <i class="fa-solid fa-face-frown" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <h3>No utility tools match "${this.searchQuery}"</h3>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">Try searching for "pdf", "image", "python", "gst", or "calculator".</p>
          </div>
        `;
      } else {
        matched.forEach(t => grid.appendChild(this.createToolCard(t)));
      }

      searchSection.appendChild(grid);
      container.appendChild(searchSection);

      const clearBtn = searchSection.querySelector('#btn-clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.searchQuery = '';
          const sInput = document.getElementById('global-search-input');
          if (sInput) sInput.value = '';
          this.renderCatalog();
        });
      }
      return;
    }

    // 2. Favorites Mode
    if (this.selectedCategory === 'favorites') {
      const favTools = this.tools.filter(t => this.favorites.includes(t.id) && this.filterTool(t));
      const section = document.createElement('div');
      section.className = 'home-category-section';
      section.innerHTML = `
        <div class="section-header-banner">
          <div class="section-header-left">
            <div class="section-icon-badge" style="color:var(--accent-amber);"><i class="fa-solid fa-star"></i></div>
            <div>
              <div class="section-title-text">Pinned Favorites</div>
              <div class="section-subtitle-text">Your personalized quick-access tools</div>
            </div>
          </div>
          <span class="section-count-badge">${favTools.length} Pinned</span>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'tools-grid';

      if (!favTools.length) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <i class="fa-regular fa-star" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-amber);"></i>
            <h3>No favorites pinned yet</h3>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">Click the star icon on any tool card to add it to your pinned quick-access list.</p>
          </div>
        `;
      } else {
        favTools.forEach(t => grid.appendChild(this.createToolCard(t)));
      }

      section.appendChild(grid);
      container.appendChild(section);
      return;
    }

    // 3. Single Specific Category Mode
    if (this.selectedCategory !== 'all') {
      const catMeta = this.categories[this.selectedCategory];
      const catTools = this.tools.filter(t => t.category === this.selectedCategory && this.filterTool(t));

      const section = document.createElement('div');
      section.className = 'home-category-section';
      section.innerHTML = `
        <div class="section-header-banner">
          <div class="section-header-left">
            <div class="section-icon-badge ${catMeta ? catMeta.color : ''}"><i class="${catMeta ? catMeta.icon : 'fa-solid fa-shapes'}"></i></div>
            <div>
              <div class="section-title-text">${catMeta ? catMeta.name : 'Category Tools'}</div>
              <div class="section-subtitle-text">${catMeta ? catMeta.desc : ''}</div>
            </div>
          </div>
          <span class="section-count-badge">${catTools.length} Tools</span>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'tools-grid';
      if (!catTools.length) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">No tools in this category match the selected filter.</div>`;
      } else {
        catTools.forEach(t => grid.appendChild(this.createToolCard(t)));
      }

      section.appendChild(grid);
      container.appendChild(section);
      return;
    }

    // 4. Default: All Organized Sections on Tools Page
    // A) Featured Essentials Section
    const featuredTools = this.tools.filter(t => t.featured && this.filterTool(t));
    if (featuredTools.length) {
      const featSection = document.createElement('div');
      featSection.className = 'home-category-section';
      featSection.innerHTML = `
        <div class="section-header-banner">
          <div class="section-header-left">
            <div class="section-icon-badge" style="color:var(--accent-cyan);"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div>
              <div class="section-title-text">⭐ Daily Essentials & Featured</div>
              <div class="section-subtitle-text">The most frequently used tools for everyday workflows</div>
            </div>
          </div>
          <span class="section-count-badge">Top Picks</span>
        </div>
      `;
      const grid = document.createElement('div');
      grid.className = 'tools-grid';
      featuredTools.forEach(t => grid.appendChild(this.createToolCard(t)));
      featSection.appendChild(grid);
      container.appendChild(featSection);
    }

    // B) Each Category Section
    Object.keys(this.categories).forEach(catKey => {
      const catMeta = this.categories[catKey];
      const catTools = this.tools.filter(t => t.category === catKey && this.filterTool(t));

      if (!catTools.length) return;

      const section = document.createElement('div');
      section.className = 'home-category-section';
      section.innerHTML = `
        <div class="section-header-banner">
          <div class="section-header-left">
            <div class="section-icon-badge ${catMeta.color}"><i class="${catMeta.icon}"></i></div>
            <div>
              <div class="section-title-text">${catMeta.name}</div>
              <div class="section-subtitle-text">${catMeta.desc}</div>
            </div>
          </div>
          <span class="section-count-badge">${catTools.length} Tools</span>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'tools-grid';
      catTools.forEach(t => grid.appendChild(this.createToolCard(t)));

      section.appendChild(grid);
      container.appendChild(section);
    });
  },

  // Toggle Favorite Tool
  toggleFavorite(id) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(x => x !== id);
      this.showToast('Removed from favorites', 'info');
    } else {
      this.favorites.push(id);
      this.showToast('Pinned to favorites!', 'success');
    }
    localStorage.setItem('omni_favorites', JSON.stringify(this.favorites));
    this.renderCatalog();
  },

  // Routing Handler
  handleRoute() {
    const hash = window.location.hash.replace('#', '').trim();
    const dashboardView = document.getElementById('dashboard-view');
    const workspaceView = document.getElementById('tool-workspace-container');

    if (!hash) {
      this.currentTool = null;
      if (dashboardView) dashboardView.style.display = 'block';
      if (workspaceView) workspaceView.style.display = 'none';
      if (window.scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const tool = this.tools.find(t => t.id === hash);
    if (!tool) {
      window.location.hash = '';
      return;
    }

    this.currentTool = tool;
    if (dashboardView) dashboardView.style.display = 'none';
    if (workspaceView) workspaceView.style.display = 'block';

    document.title = `${tool.title} | EasyTool - Free Online Utility Suite`;

    // Update workspace headers
    const crumbEl = document.getElementById('tool-title-crumb');
    if (crumbEl) crumbEl.textContent = tool.title;
    const titleEl = document.getElementById('tool-head-title');
    if (titleEl) titleEl.textContent = tool.title;
    const descEl = document.getElementById('tool-head-desc');
    if (descEl) descEl.textContent = tool.description;
    
    const iconEl = document.getElementById('tool-head-icon');
    if (iconEl) {
      iconEl.className = `tool-view-icon ${tool.color}`;
      iconEl.innerHTML = `<i class="${tool.icon}"></i>`;
    }

    // Inject or update Tool Privacy Notice Banner (Sections 19, 20, 21)
    let privacyBanner = document.getElementById('tool-privacy-banner');
    if (!privacyBanner) {
      privacyBanner = document.createElement('div');
      privacyBanner.id = 'tool-privacy-banner';
      const workspaceHeader = document.querySelector('.tool-view-header');
      if (workspaceHeader && workspaceHeader.parentNode) {
        workspaceHeader.parentNode.insertBefore(privacyBanner, document.getElementById('tool-workspace-body'));
      }
    }
    if (privacyBanner) {
      privacyBanner.className = `tool-privacy-banner ${tool.badgeType}`;
      const iconClass = (tool.badgeType === 'api' || tool.badgeType === 'ai') 
        ? 'fa-solid fa-cloud-arrow-up' 
        : 'fa-solid fa-shield-halved';
      privacyBanner.innerHTML = `
        <i class="${iconClass}"></i>
        <div>
          <strong>${tool.badge}</strong> &bull; ${tool.privacyNotice}
        </div>
      `;
    }

    // Render tool dynamic body
    const bodyContainer = document.getElementById('tool-workspace-body');
    if (bodyContainer) {
      bodyContainer.innerHTML = '';
      tool.render(bodyContainer);
    }

    if (window.scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Command Palette (Ctrl + K)
  openCommandPalette() {
    const overlay = document.getElementById('cmd-palette-overlay');
    const input = document.getElementById('cmd-search-input');
    if (!overlay || !input) return;
    overlay.classList.add('active');
    input.value = '';
    this.renderCommandResults('');
    setTimeout(() => input.focus(), 50);
  },

  closeCommandPalette() {
    const overlay = document.getElementById('cmd-palette-overlay');
    if (overlay) overlay.classList.remove('active');
    const input = document.getElementById('cmd-search-input');
    if (input) input.value = '';
  },

  renderCommandResults(query) {
    const list = document.getElementById('cmd-results-list');
    if (!list) return;

    const matched = this.tools.filter(t => {
      return !query || 
             t.title.toLowerCase().includes(query) || 
             t.description.toLowerCase().includes(query) ||
             t.tags.some(tag => tag.includes(query));
    });

    list.innerHTML = '';
    if (!matched.length) {
      list.innerHTML = `<li style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.9rem;">No matching utility found</li>`;
      return;
    }

    matched.forEach((t, i) => {
      const li = document.createElement('li');
      li.className = `cmd-result-item ${i === 0 ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="cmd-item-icon"><i class="${t.icon}"></i></div>
        <div class="cmd-item-info">
          <div class="cmd-item-title">${t.title}</div>
          <div class="cmd-item-desc">${t.description}</div>
        </div>
        <span class="tool-badge-pill ${t.badgeType || 'local'}"><span class="badge-dot"></span>${t.badge || 'LOCAL'}</span>
      `;
      li.addEventListener('click', () => {
        const isToolsPage = window.location.pathname.endsWith('tools.html') || window.location.pathname.includes('/tools');
        if (!isToolsPage) {
          window.location.href = `tools.html#${t.id}`;
        } else {
          window.location.hash = `#${t.id}`;
        }
        this.closeCommandPalette();
      });
      list.appendChild(li);
    });
  },

  // Toast Notifications
  showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-solid fa-circle-info';
    if (type === 'success') icon = 'fa-solid fa-circle-check';
    if (type === 'error') icon = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="${icon}" style="font-size:1.1rem; color:${type === 'success' ? 'var(--accent-emerald)' : (type === 'error' ? 'var(--accent-rose)' : 'var(--primary)')}"></i>
      <span style="flex:1;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  },

  // Copy helper
  copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    if (!text) return;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMsg, 'success');
      }).catch(() => {
        this.fallbackCopy(text, successMsg);
      });
    } else {
      this.fallbackCopy(text, successMsg);
    }
  },

  fallbackCopy(text, successMsg) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.showToast(successMsg, 'success');
    } catch (e) {
      this.showToast('Could not copy', 'error');
    }
    document.body.removeChild(textarea);
  },

  formatBytes(bytes, decimals = 2) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  // PWA Mobile Web App Installation
  installPwaApp() {
    if (window.deferredPwaPrompt) {
      window.deferredPwaPrompt.prompt();
      window.deferredPwaPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.showToast('EasyTool installed successfully!', 'success');
        }
        window.deferredPwaPrompt = null;
        this.dismissPwaBanner();
      });
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        this.showToast('To install on iPhone/iPad: Tap the Share button (⎋) below, then select "Add to Home Screen".', 'info', 6000);
      } else {
        this.showToast('To install on your phone: Tap browser menu (⋮) and tap "Install App" or "Add to Home Screen".', 'info', 5000);
      }
    }
  },

  dismissPwaBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.style.display = 'none';
    localStorage.setItem('easytool_pwa_dismissed', 'true');
  }
};

// PWA Install Prompt Listener
window.deferredPwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPwaPrompt = e;
  const isDismissed = localStorage.getItem('easytool_pwa_dismissed') === 'true';
  const banner = document.getElementById('pwa-install-banner');
  if (banner && !isDismissed) {
    banner.style.display = 'flex';
  }
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('EasyTool Service Worker registration notice:', err);
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Show install banner on mobile if not standalone and not dismissed
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const isMobile = window.innerWidth <= 768;
  const isDismissed = localStorage.getItem('easytool_pwa_dismissed') === 'true';
  const banner = document.getElementById('pwa-install-banner');
  if (banner && isMobile && !isStandalone && !isDismissed) {
    // Show banner after 2 seconds on mobile device
    setTimeout(() => {
      banner.style.display = 'flex';
    }, 2000);
  }
});

