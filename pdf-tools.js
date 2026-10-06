/* ==========================================================================
   OmniToolbox - PDF Studio Tools
   Images to PDF, PDF Merger, Markdown to PDF, PDF Inspector & Text Extractor
   ========================================================================== */

const PdfTools = {
  // 1. Images to PDF Converter
  renderImagesToPdf(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-images"></i> Add Image Pages</span>
            <span class="text-muted" id="img-pdf-count">0 images added</span>
          </div>

          <div class="dropzone" id="img-pdf-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-file-circle-plus"></i></div>
            <div class="dropzone-title">Upload Images to Convert into PDF</div>
            <div class="dropzone-hint">Select multiple images (PNG, JPG, WEBP, BMP)</div>
            <input type="file" id="img-pdf-file-input" accept="image/*" multiple>
          </div>

          <div class="batch-image-grid" id="img-pdf-grid" style="display:none;"></div>

          <div style="display:flex; justify-content:space-between; margin-top:0.75rem;">
            <button class="btn btn-sm btn-secondary" id="btn-clear-img-pdf" style="display:none;">
              <i class="fa-solid fa-trash"></i> Clear All Images
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-gear"></i> Page & Output Settings</span>
          </div>

          <div class="form-group">
            <label class="form-label">Page Format</label>
            <select id="pdf-page-format" class="form-control">
              <option value="a4" selected>A4 Standard (210 × 297 mm)</option>
              <option value="letter">US Letter (8.5 × 11 in)</option>
              <option value="fit">Fit to Exact Image Dimensions</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Page Orientation</label>
            <select id="pdf-orientation" class="form-control">
              <option value="portrait" selected>Portrait (Vertical)</option>
              <option value="landscape">Landscape (Horizontal)</option>
              <option value="auto">Auto (Match each image ratio)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Page Margins</label>
            <select id="pdf-margins" class="form-control">
              <option value="0">No Margins (Full Bleed)</option>
              <option value="5" selected>Small Margins (5 mm)</option>
              <option value="15">Wide Margins (15 mm)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Output Filename</label>
            <input type="text" id="pdf-filename" class="form-control" value="converted_document.pdf">
          </div>

          <div style="margin-top:auto; padding-top:1.5rem;">
            <button class="btn btn-primary" id="btn-generate-img-pdf" style="width:100%; height:48px;" disabled>
              <i class="fa-solid fa-file-pdf"></i> Generate & Download PDF
            </button>
            <small class="text-muted" style="display:block; text-align:center; margin-top:0.75rem;">
              Generated 100% locally in your browser with jsPDF.
            </small>
          </div>
        </div>
      </div>
    `;

    this.initImagesToPdfLogic();
  },

  initImagesToPdfLogic() {
    const fileInput = document.getElementById('img-pdf-file-input');
    const dropzone = document.getElementById('img-pdf-dropzone');
    const grid = document.getElementById('img-pdf-grid');
    const countSpan = document.getElementById('img-pdf-count');
    const clearBtn = document.getElementById('btn-clear-img-pdf');
    const generateBtn = document.getElementById('btn-generate-img-pdf');

    let imageList = []; // array of { file, dataUrl, width, height }

    ['dragenter', 'dragover'].forEach(eName => {
      dropzone.addEventListener(eName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(eName => {
      dropzone.addEventListener(eName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        handleFiles(Array.from(e.dataTransfer.files));
      }
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length) {
        handleFiles(Array.from(e.target.files));
      }
    });

    function handleFiles(files) {
      const validFiles = files.filter(f => f.type.startsWith('image/'));
      if (!validFiles.length) {
        App.showToast('No valid images found', 'error');
        return;
      }

      let loadedCount = 0;
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            imageList.push({
              file,
              dataUrl: e.target.result,
              width: img.naturalWidth,
              height: img.naturalHeight
            });
            loadedCount++;
            if (loadedCount === validFiles.length) {
              renderThumbnails();
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    function renderThumbnails() {
      grid.innerHTML = '';
      countSpan.textContent = `${imageList.length} images added`;

      if (imageList.length > 0) {
        grid.style.display = 'grid';
        clearBtn.style.display = 'inline-flex';
        generateBtn.disabled = false;
      } else {
        grid.style.display = 'none';
        clearBtn.style.display = 'none';
        generateBtn.disabled = true;
        return;
      }

      imageList.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'batch-thumb-card';
        card.innerHTML = `
          <img src="${item.dataUrl}" alt="Page ${index + 1}" />
          <button class="batch-thumb-remove" data-idx="${index}" title="Remove image">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="batch-thumb-badge">Pg ${index + 1}</div>
        `;

        card.querySelector('.batch-thumb-remove').addEventListener('click', (e) => {
          e.stopPropagation();
          imageList.splice(index, 1);
          renderThumbnails();
        });

        grid.appendChild(card);
      });
    }

    clearBtn.addEventListener('click', () => {
      imageList = [];
      renderThumbnails();
      fileInput.value = '';
    });

    generateBtn.addEventListener('click', async () => {
      if (!imageList.length) return;

      generateBtn.disabled = true;
      generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';

      try {
        const { jsPDF } = window.jspdf;
        const pageFormat = document.getElementById('pdf-page-format').value;
        const orientationChoice = document.getElementById('pdf-orientation').value;
        const margin = parseInt(document.getElementById('pdf-margins').value) || 0;
        let filename = document.getElementById('pdf-filename').value.trim() || 'converted_document.pdf';
        if (!filename.endsWith('.pdf')) filename += '.pdf';

        // Initialize jsPDF document
        let doc = null;

        for (let i = 0; i < imageList.length; i++) {
          const item = imageList[i];
          const isLandscape = item.width > item.height;
          let orientation = orientationChoice;
          if (orientationChoice === 'auto') {
            orientation = isLandscape ? 'landscape' : 'portrait';
          }

          let pdfFormat = pageFormat === 'fit' ? [item.width, item.height] : pageFormat;

          if (i === 0) {
            doc = new jsPDF({
              orientation: orientation === 'fit' ? (isLandscape ? 'l' : 'p') : (orientation === 'landscape' ? 'l' : 'p'),
              unit: pageFormat === 'fit' ? 'px' : 'mm',
              format: pdfFormat
            });
          } else {
            doc.addPage(pdfFormat, orientation === 'landscape' ? 'l' : 'p');
          }

          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          const usableWidth = pageWidth - (margin * 2);
          const usableHeight = pageHeight - (margin * 2);

          // Calculate scaling to preserve aspect ratio within margins
          const imgRatio = item.width / item.height;
          let renderW = usableWidth;
          let renderH = usableWidth / imgRatio;

          if (renderH > usableHeight) {
            renderH = usableHeight;
            renderW = usableHeight * imgRatio;
          }

          const posX = margin + (usableWidth - renderW) / 2;
          const posY = margin + (usableHeight - renderH) / 2;

          doc.addImage(item.dataUrl, 'JPEG', posX, posY, renderW, renderH);
        }

        doc.save(filename);
        App.showToast(`Saved PDF "${filename}"!`, 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error generating PDF: ' + err.message, 'error');
      } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Generate & Download PDF';
      }
    });
  },

  // 2. PDF Merger
  renderMerger(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-circle-plus"></i> Select PDF Files to Merge</span>
            <span class="text-muted" id="merge-pdf-count">0 PDFs selected</span>
          </div>

          <div class="dropzone" id="merge-pdf-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-layer-group"></i></div>
            <div class="dropzone-title">Upload Multiple PDFs to Merge</div>
            <div class="dropzone-hint">Drag & drop 2 or more PDF documents</div>
            <input type="file" id="merge-pdf-file-input" accept="application/pdf" multiple>
          </div>

          <div id="merge-file-list" style="margin-top:1.25rem; display:flex; flex-direction:column; gap:0.6rem;"></div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-export"></i> Merge Settings & Download</span>
          </div>

          <div class="form-group">
            <label class="form-label">Merged Output Filename</label>
            <input type="text" id="merge-out-name" class="form-control" value="merged_document.pdf">
          </div>

          <div style="background:var(--bg-surface); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:1.5rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
              <span class="text-muted">Total Files:</span>
              <strong id="merge-stat-files">0</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span class="text-muted">Total Pages (Combined):</span>
              <strong id="merge-stat-pages" style="color:var(--accent-cyan);">0</strong>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-execute-merge" style="width:100%; height:48px;" disabled>
            <i class="fa-solid fa-code-merge"></i> Merge PDF Documents
          </button>
          <small class="text-muted" style="display:block; text-align:center; margin-top:0.75rem;">
            Processed entirely in your browser using PDF-Lib (zero server uploads).
          </small>
        </div>
      </div>
    `;

    this.initMergerLogic();
  },

  initMergerLogic() {
    const fileInput = document.getElementById('merge-pdf-file-input');
    const dropzone = document.getElementById('merge-pdf-dropzone');
    const fileListDiv = document.getElementById('merge-file-list');
    const countSpan = document.getElementById('merge-pdf-count');
    const statFiles = document.getElementById('merge-stat-files');
    const statPages = document.getElementById('merge-stat-pages');
    const mergeBtn = document.getElementById('btn-execute-merge');

    let pdfEntries = []; // array of { file, buffer, pageCount }

    ['dragenter', 'dragover'].forEach(eName => {
      dropzone.addEventListener(eName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(eName => {
      dropzone.addEventListener(eName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files) handleFiles(Array.from(e.dataTransfer.files));
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files) handleFiles(Array.from(e.target.files));
    });

    async function handleFiles(files) {
      const pdfFiles = files.filter(f => f.name.toLowerCase().endsWith('.pdf') || f.type === 'application/pdf');
      if (!pdfFiles.length) {
        App.showToast('Please upload valid PDF files', 'error');
        return;
      }

      for (const file of pdfFiles) {
        try {
          const buffer = await file.arrayBuffer();
          const pdfDoc = await PDFLib.PDFDocument.load(buffer);
          const pageCount = pdfDoc.getPageCount();

          pdfEntries.push({
            file,
            buffer,
            pageCount
          });
        } catch (err) {
          console.error(err);
          App.showToast(`Failed to parse ${file.name}: encrypted or invalid`, 'error');
        }
      }
      renderPdfList();
    }

    function renderPdfList() {
      fileListDiv.innerHTML = '';
      countSpan.textContent = `${pdfEntries.length} PDFs selected`;
      statFiles.textContent = pdfEntries.length;

      let totalPages = 0;
      pdfEntries.forEach((entry, idx) => {
        totalPages += entry.pageCount;
        const row = document.createElement('div');
        row.style.cssText = `
          display:flex; align-items:center; justify-content:space-between;
          background:var(--bg-surface); padding:0.65rem 0.85rem; border-radius:8px;
          border:1px solid var(--border-subtle);
        `;
        row.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.6rem; overflow:hidden;">
            <i class="fa-solid fa-file-pdf" style="color:var(--accent-rose); font-size:1.1rem;"></i>
            <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              <div style="font-size:0.85rem; font-weight:600;">${entry.file.name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${entry.pageCount} pages • ${App.formatBytes(entry.file.size)}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.35rem;">
            <button class="btn btn-icon btn-sm" data-move-up="${idx}" title="Move up" ${idx === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-arrow-up"></i>
            </button>
            <button class="btn btn-icon btn-sm" data-move-down="${idx}" title="Move down" ${idx === pdfEntries.length - 1 ? 'disabled' : ''}>
              <i class="fa-solid fa-arrow-down"></i>
            </button>
            <button class="btn btn-icon btn-sm" data-remove="${idx}" title="Remove" style="color:var(--accent-rose);">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;

        row.querySelector(`[data-remove="${idx}"]`).addEventListener('click', () => {
          pdfEntries.splice(idx, 1);
          renderPdfList();
        });
        if (idx > 0) {
          row.querySelector(`[data-move-up="${idx}"]`).addEventListener('click', () => {
            const temp = pdfEntries[idx - 1];
            pdfEntries[idx - 1] = pdfEntries[idx];
            pdfEntries[idx] = temp;
            renderPdfList();
          });
        }
        if (idx < pdfEntries.length - 1) {
          row.querySelector(`[data-move-down="${idx}"]`).addEventListener('click', () => {
            const temp = pdfEntries[idx + 1];
            pdfEntries[idx + 1] = pdfEntries[idx];
            pdfEntries[idx] = temp;
            renderPdfList();
          });
        }

        fileListDiv.appendChild(row);
      });

      statPages.textContent = totalPages;
      mergeBtn.disabled = pdfEntries.length < 2;
    }

    mergeBtn.addEventListener('click', async () => {
      if (pdfEntries.length < 2) return;

      mergeBtn.disabled = true;
      mergeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Merging PDFs...';

      try {
        const mergedPdf = await PDFLib.PDFDocument.create();

        for (const entry of pdfEntries) {
          const docToCopy = await PDFLib.PDFDocument.load(entry.buffer);
          const copiedPages = await mergedPdf.copyPages(docToCopy, docToCopy.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedBytes = await mergedPdf.save();
        let filename = document.getElementById('merge-out-name').value.trim() || 'merged_document.pdf';
        if (!filename.endsWith('.pdf')) filename += '.pdf';

        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        App.showToast(`Successfully merged ${pdfEntries.length} PDFs into ${filename}!`, 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Failed to merge PDFs: ' + err.message, 'error');
      } finally {
        mergeBtn.disabled = false;
        mergeBtn.innerHTML = '<i class="fa-solid fa-code-merge"></i> Merge PDF Documents';
      }
    });
  },

  // 3. Text & Notes to PDF
  renderTextToPdf(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-pen-nib"></i> Document Editor</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="btn-sample-doc">Load Sample Note</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Document Title</label>
            <input type="text" id="doc-title-input" class="form-control" value="Weekly Engineering Notes">
          </div>

          <div class="form-group" style="flex:1; display:flex; flex-direction:column;">
            <label class="form-label">Body Content</label>
            <textarea id="doc-content-input" class="form-control" style="flex:1; min-height:260px; font-family:var(--font-sans);" placeholder="Write or paste your text here..."></textarea>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> PDF Style & Download</span>
          </div>

          <div class="form-group">
            <label class="form-label">Font Family</label>
            <select id="doc-font" class="form-control">
              <option value="helvetica" selected>Helvetica (Standard Modern)</option>
              <option value="times">Times Roman (Classic Serif)</option>
              <option value="courier">Courier (Monospace Code)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Font Size</label>
            <select id="doc-font-size" class="form-control">
              <option value="10">Small (10 pt)</option>
              <option value="12" selected>Normal (12 pt)</option>
              <option value="14">Large (14 pt)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Page Margins</label>
            <select id="doc-margins" class="form-control">
              <option value="10">Compact (10 mm)</option>
              <option value="15" selected>Standard (15 mm)</option>
              <option value="20">Spacious (20 mm)</option>
            </select>
          </div>

          <button class="btn btn-primary" id="btn-export-text-pdf" style="width:100%; height:46px; margin-top:auto;">
            <i class="fa-solid fa-file-arrow-down"></i> Export to PDF Document
          </button>
        </div>
      </div>
    `;

    const titleInput = document.getElementById('doc-title-input');
    const contentInput = document.getElementById('doc-content-input');
    const sampleBtn = document.getElementById('btn-sample-doc');
    const exportBtn = document.getElementById('btn-export-text-pdf');

    sampleBtn.addEventListener('click', () => {
      titleInput.value = 'Weekly Engineering Sync & Roadmap';
      contentInput.value = `Overview:\nThis week our team completed core development of the daily utility suite, integrating WebAssembly-based Python execution and client-side PDF document manipulation.\n\nKey Achievements:\n1. Zero-server privacy architecture ensures 100% of user data remains on the local device.\n2. Built-in image converter handles PNG, JPG, and WEBP with real-time compression analysis.\n3. PDF tools enable batch image compilation and document merging.\n4. Performance optimizations delivered sub-50ms tool switching.\n\nNext Steps:\n- Expand developer tools with additional regex templates.\n- Add support for offline PWA installation.\n- Maintain top tier aesthetic styling and micro-interactions.`;
      App.showToast('Sample document loaded!', 'info');
    });

    exportBtn.addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const margin = parseInt(document.getElementById('doc-margins').value) || 15;
      const font = document.getElementById('doc-font').value;
      const fontSize = parseInt(document.getElementById('doc-font-size').value) || 12;

      doc.setFont(font);

      // Title
      doc.setFontSize(20);
      doc.text(titleInput.value || 'Document', margin, margin + 8);

      // Date stamp
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(`Generated on ${new Date().toLocaleDateString()} with OmniToolbox`, margin, margin + 14);

      // Divider line
      doc.setDrawColor(200);
      doc.line(margin, margin + 17, 210 - margin, margin + 17);

      // Body text with auto word-wrapping
      doc.setFontSize(fontSize);
      doc.setTextColor(20);
      const splitText = doc.splitTextToSize(contentInput.value || '', 210 - (margin * 2));
      doc.text(splitText, margin, margin + 25);

      const safeName = (titleInput.value || 'document').toLowerCase().replace(/[^a-z0-9]/g, '_') + '.pdf';
      doc.save(safeName);
      App.showToast(`Downloaded ${safeName}!`, 'success');
    });
  },

  // 4. PDF Splitter & Page Extractor
  renderSplitter(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Source PDF Document</span>
            <span class="text-muted" id="split-pdf-info">No document loaded</span>
          </div>

          <div class="dropzone" id="split-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-scissors"></i></div>
            <div class="dropzone-title">Upload PDF to Split or Extract Pages</div>
            <div class="dropzone-hint">Drag & drop your PDF file here</div>
            <input type="file" id="split-file-input" accept="application/pdf">
          </div>

          <div id="split-file-stats" style="display:none; margin-top:1.25rem; background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-weight:700; font-size:0.95rem; margin-bottom:0.4rem;" id="split-doc-name">document.pdf</div>
            <div style="font-size:0.8rem; color:var(--text-muted); display:flex; justify-content:space-between;">
              <span>Total Pages: <strong id="split-total-pages" style="color:var(--accent-cyan);">0</strong></span>
              <span id="split-doc-size">0 KB</span>
            </div>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-gear"></i> Page Range & Extraction</span>
          </div>

          <div class="form-group">
            <label class="form-label">Extract Mode</label>
            <select id="split-mode-select" class="form-control">
              <option value="range" selected>Custom Page Range (e.g. 1-3, 5)</option>
              <option value="single">Single Page</option>
              <option value="odd">Odd Pages Only (1, 3, 5...)</option>
              <option value="even">Even Pages Only (2, 4, 6...)</option>
            </select>
          </div>

          <div class="form-group" id="split-range-group">
            <label class="form-label">Page Numbers / Ranges</label>
            <input type="text" id="split-range-input" class="form-control" placeholder="e.g. 1-2, 4, 6-8" value="1">
            <small class="text-muted" style="display:block; margin-top:4px; font-size:0.75rem;">
              1-indexed page numbers. Commas and hyphens supported.
            </small>
          </div>

          <div class="form-group">
            <label class="form-label">Output Filename</label>
            <input type="text" id="split-out-filename" class="form-control" value="extracted_pages.pdf">
          </div>

          <button class="btn btn-primary" id="btn-execute-split" style="width:100%; height:46px; margin-top:auto;" disabled>
            <i class="fa-solid fa-download"></i> Extract & Download PDF
          </button>
        </div>
      </div>
    `;

    this.initSplitterLogic();
  },

  initSplitterLogic() {
    const fileInput = document.getElementById('split-file-input');
    const dropzone = document.getElementById('split-dropzone');
    const infoSpan = document.getElementById('split-pdf-info');
    const statsBox = document.getElementById('split-file-stats');
    const nameEl = document.getElementById('split-doc-name');
    const pagesEl = document.getElementById('split-total-pages');
    const sizeEl = document.getElementById('split-doc-size');
    const modeSelect = document.getElementById('split-mode-select');
    const rangeGroup = document.getElementById('split-range-group');
    const rangeInput = document.getElementById('split-range-input');
    const outNameInput = document.getElementById('split-out-filename');
    const splitBtn = document.getElementById('btn-execute-split');

    let loadedPdfBytes = null;
    let totalPagesCount = 0;
    let sourceFileName = '';

    ['dragenter', 'dragover'].forEach(eName => {
      dropzone.addEventListener(eName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(eName => {
      dropzone.addEventListener(eName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
    });

    async function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
        App.showToast('Please upload a PDF file', 'error');
        return;
      }

      try {
        sourceFileName = file.name;
        loadedPdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);
        totalPagesCount = pdfDoc.getPageCount();

        infoSpan.textContent = `${totalPagesCount} pages`;
        statsBox.style.display = 'block';
        nameEl.textContent = file.name;
        pagesEl.textContent = totalPagesCount;
        sizeEl.textContent = App.formatBytes(file.size);

        rangeInput.value = `1-${Math.min(totalPagesCount, 3)}`;
        splitBtn.disabled = false;
        App.showToast(`Loaded ${file.name} (${totalPagesCount} pages)`, 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Failed to load PDF: ' + err.message, 'error');
      }
    }

    modeSelect.addEventListener('change', () => {
      const mode = modeSelect.value;
      rangeGroup.style.display = (mode === 'range' || mode === 'single') ? 'block' : 'none';
      if (mode === 'single') {
        rangeInput.placeholder = 'e.g. 1';
        rangeInput.value = '1';
      } else if (mode === 'range') {
        rangeInput.placeholder = 'e.g. 1-3, 5';
        rangeInput.value = `1-${Math.min(totalPagesCount || 1, 3)}`;
      }
    });

    splitBtn.addEventListener('click', async () => {
      if (!loadedPdfBytes || totalPagesCount === 0) return;

      splitBtn.disabled = true;
      splitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Splitting...';

      try {
        const mode = modeSelect.value;
        let selectedIndices = [];

        if (mode === 'odd') {
          for (let i = 0; i < totalPagesCount; i += 2) selectedIndices.push(i);
        } else if (mode === 'even') {
          for (let i = 1; i < totalPagesCount; i += 2) selectedIndices.push(i);
        } else {
          // Parse range string
          const parts = rangeInput.value.split(',').map(s => s.trim()).filter(Boolean);
          parts.forEach(part => {
            if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n.trim()));
              if (!isNaN(start) && !isNaN(end)) {
                const s = Math.max(1, Math.min(start, end));
                const e = Math.min(totalPagesCount, Math.max(start, end));
                for (let p = s; p <= e; p++) {
                  if (!selectedIndices.includes(p - 1)) selectedIndices.push(p - 1);
                }
              }
            } else {
              const p = parseInt(part);
              if (!isNaN(p) && p >= 1 && p <= totalPagesCount) {
                if (!selectedIndices.includes(p - 1)) selectedIndices.push(p - 1);
              }
            }
          });
        }

        if (!selectedIndices.length) {
          App.showToast('No valid page range specified', 'error');
          splitBtn.disabled = false;
          splitBtn.innerHTML = '<i class="fa-solid fa-download"></i> Extract & Download PDF';
          return;
        }

        const sourcePdf = await PDFLib.PDFDocument.load(loadedPdfBytes);
        const newPdf = await PDFLib.PDFDocument.create();
        const copiedPages = await newPdf.copyPages(sourcePdf, selectedIndices);
        copiedPages.forEach(page => newPdf.addPage(page));

        const newPdfBytes = await newPdf.save();
        let filename = outNameInput.value.trim() || 'extracted_pages.pdf';
        if (!filename.endsWith('.pdf')) filename += '.pdf';

        const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();

        App.showToast(`Extracted ${selectedIndices.length} pages into ${filename}!`, 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error splitting PDF: ' + err.message, 'error');
      } finally {
        splitBtn.disabled = false;
        splitBtn.innerHTML = '<i class="fa-solid fa-download"></i> Extract & Download PDF';
      }
    });
  },

  // 5. PDF to JPG / PNG Images (iLovePDF Style)
  renderPdfToImages(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Upload PDF</span>
            <span class="text-muted" id="p2i-doc-info">No document loaded</span>
          </div>

          <div class="dropzone" id="p2i-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-file-image"></i></div>
            <div class="dropzone-title">Upload PDF to Convert to Images</div>
            <div class="dropzone-hint">Convert each page into high-res JPG or PNG</div>
            <input type="file" id="p2i-file-input" accept="application/pdf">
          </div>

          <div style="margin-top:1.25rem;">
            <div class="form-group">
              <label class="form-label">Image Output Format</label>
              <select id="p2i-format-select" class="form-control">
                <option value="image/jpeg" selected>JPEG (.jpg) - Compact & Fast</option>
                <option value="image/png">PNG (.png) - Crisp Lossless</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Render Quality / Resolution</label>
              <select id="p2i-scale-select" class="form-control">
                <option value="1.0">Standard DPI (1.0x)</option>
                <option value="1.5" selected>High Resolution (1.5x - Recommended)</option>
                <option value="2.0">Ultra High Print DPI (2.0x)</option>
              </select>
            </div>

            <button class="btn btn-primary" id="btn-p2i-convert" style="width:100%; height:46px;" disabled>
              <i class="fa-solid fa-wand-magic-sparkles"></i> Render Pages to Images
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-images"></i> Converted Page Images (<span id="p2i-page-count">0</span> pages)</span>
            <button class="btn btn-sm btn-emerald" id="btn-p2i-download-all" style="display:none;">
              <i class="fa-solid fa-download"></i> Download All Images
            </button>
          </div>

          <div id="p2i-gallery" class="pdf-pages-gallery">
            <div class="text-muted" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">
              Upload a PDF to render and preview all pages as images
            </div>
          </div>
        </div>
      </div>
    `;

    const fileInput = document.getElementById('p2i-file-input');
    const dropzone = document.getElementById('p2i-dropzone');
    const convertBtn = document.getElementById('btn-p2i-convert');
    const gallery = document.getElementById('p2i-gallery');
    const countSpan = document.getElementById('p2i-page-count');
    const downloadAllBtn = document.getElementById('btn-p2i-download-all');
    const formatSelect = document.getElementById('p2i-format-select');
    const scaleSelect = document.getElementById('p2i-scale-select');

    let loadedPdfBytes = null;
    let baseFileName = 'document';
    let renderedImages = []; // { pageNum, dataUrl, ext }

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    async function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        App.showToast('Please select a valid PDF file', 'error');
        return;
      }
      baseFileName = file.name.replace(/\.[^/.]+$/, "");
      loadedPdfBytes = await file.arrayBuffer();
      document.getElementById('p2i-doc-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;
      convertBtn.disabled = false;
      renderPages();
    }

    convertBtn.addEventListener('click', () => renderPages());

    async function renderPages() {
      if (!loadedPdfBytes) return;
      if (typeof pdfjsLib === 'undefined') {
        App.showToast('PDF.js library is loading, please wait...', 'info');
        return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      convertBtn.disabled = true;
      convertBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Rendering pages...';
      gallery.innerHTML = '';
      renderedImages = [];

      try {
        const loadingTask = pdfjsLib.getDocument({ data: loadedPdfBytes });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        countSpan.textContent = numPages;

        const scale = parseFloat(scaleSelect.value) || 1.5;
        const format = formatSelect.value;
        const ext = format === 'image/jpeg' ? 'jpg' : 'png';

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;

          const dataUrl = canvas.toDataURL(format, 0.92);
          renderedImages.push({ pageNum: i, dataUrl, ext });

          const card = document.createElement('div');
          card.className = 'pdf-page-card';
          card.innerHTML = `
            <div class="pdf-page-canvas-wrap">
              <img src="${dataUrl}" alt="Page ${i}" />
            </div>
            <div class="pdf-page-badge">Page ${i} of ${numPages}</div>
            <div class="pdf-page-actions">
              <button class="pdf-card-btn" data-download-page="${i}">
                <i class="fa-solid fa-download"></i> Save ${ext.toUpperCase()}
              </button>
            </div>
          `;

          card.querySelector(`[data-download-page="${i}"]`).addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${baseFileName}_page_${i}.${ext}`;
            link.click();
            App.showToast(`Saved Page ${i} image!`, 'success');
          });

          gallery.appendChild(card);
        }

        downloadAllBtn.style.display = 'inline-flex';
        App.showToast(`Converted all ${numPages} pages to images!`, 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error rendering PDF: ' + err.message, 'error');
      } finally {
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Render Pages to Images';
      }
    }

    downloadAllBtn.addEventListener('click', () => {
      if (!renderedImages.length) return;
      renderedImages.forEach((item, idx) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = item.dataUrl;
          a.download = `${baseFileName}_page_${item.pageNum}.${item.ext}`;
          a.click();
        }, idx * 250);
      });
      App.showToast(`Downloading all ${renderedImages.length} images...`, 'success');
    });
  },

  // 6. Rotate PDF Pages (iLovePDF Style)
  renderRotatePdf(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Upload PDF to Rotate</span>
            <span class="text-muted" id="rot-doc-info">No document loaded</span>
          </div>

          <div class="dropzone" id="rot-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-rotate"></i></div>
            <div class="dropzone-title">Upload PDF to Rotate Pages</div>
            <div class="dropzone-hint">Rotate all pages or individual pages</div>
            <input type="file" id="rot-file-input" accept="application/pdf">
          </div>

          <div style="margin-top:1.25rem;">
            <label class="form-label">Batch Quick Rotation</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
              <button class="btn btn-secondary btn-sm" id="btn-rot-all-cw">
                <i class="fa-solid fa-rotate-right"></i> All +90° Right
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-rot-all-ccw">
                <i class="fa-solid fa-rotate-left"></i> All -90° Left
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-rot-all-180">
                <i class="fa-solid fa-arrows-rotate"></i> All 180° Flip
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-rot-reset">
                <i class="fa-solid fa-undo"></i> Reset All
              </button>
            </div>

            <button class="btn btn-primary" id="btn-download-rotated-pdf" style="width:100%; height:46px; margin-top:1.5rem;" disabled>
              <i class="fa-solid fa-download"></i> Save & Download Rotated PDF
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-eye"></i> Pages Preview & Rotation Controls</span>
            <span class="badge" id="rot-page-count">0 pages</span>
          </div>

          <div id="rot-gallery" class="pdf-pages-gallery">
            <div class="text-muted" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">
              Upload a PDF to view and rotate pages interactively
            </div>
          </div>
        </div>
      </div>
    `;

    const fileInput = document.getElementById('rot-file-input');
    const dropzone = document.getElementById('rot-dropzone');
    const gallery = document.getElementById('rot-gallery');
    const saveBtn = document.getElementById('btn-download-rotated-pdf');
    const countBadge = document.getElementById('rot-page-count');

    let loadedPdfBytes = null;
    let baseFileName = 'rotated_document';
    let pageRotations = []; // array of rotation degrees for each page (e.g. 0, 90, 180, 270)
    let totalPages = 0;

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    async function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        App.showToast('Please select a valid PDF file', 'error');
        return;
      }
      baseFileName = file.name.replace(/\.[^/.]+$/, "");
      loadedPdfBytes = await file.arrayBuffer();
      document.getElementById('rot-doc-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;

      const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);
      totalPages = pdfDoc.getPageCount();
      countBadge.textContent = `${totalPages} pages`;
      pageRotations = new Array(totalPages).fill(0);
      saveBtn.disabled = false;

      renderPreviewCards();
    }

    async function renderPreviewCards() {
      gallery.innerHTML = '';
      if (typeof pdfjsLib === 'undefined') return;

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const loadingTask = pdfjsLib.getDocument({ data: loadedPdfBytes });
      const pdf = await loadingTask.promise;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.6 });

        const canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

        const card = document.createElement('div');
        card.className = 'pdf-page-card';
        card.id = `rot-card-${i - 1}`;
        card.innerHTML = `
          <div class="pdf-page-canvas-wrap">
            <img src="${canvas.toDataURL()}" id="rot-img-${i - 1}" style="transform: rotate(${pageRotations[i - 1]}deg);" />
          </div>
          <div class="pdf-page-badge">Page ${i} <span id="rot-badge-${i - 1}" style="color:var(--accent-cyan);">(${pageRotations[i - 1]}°)</span></div>
          <div class="pdf-page-actions">
            <button class="pdf-card-btn" data-rot-page="${i - 1}">
              <i class="fa-solid fa-rotate-right"></i> Rotate +90°
            </button>
          </div>
        `;

        card.querySelector(`[data-rot-page="${i - 1}"]`).addEventListener('click', () => {
          rotateSinglePage(i - 1, 90);
        });

        gallery.appendChild(card);
      }
    }

    function rotateSinglePage(idx, delta) {
      pageRotations[idx] = (pageRotations[idx] + delta) % 360;
      if (pageRotations[idx] < 0) pageRotations[idx] += 360;

      const img = document.getElementById(`rot-img-${idx}`);
      const badge = document.getElementById(`rot-badge-${idx}`);
      if (img) img.style.transform = `rotate(${pageRotations[idx]}deg)`;
      if (badge) badge.textContent = `(${pageRotations[idx]}°)`;
    }

    function rotateAllPages(delta) {
      for (let i = 0; i < totalPages; i++) {
        rotateSinglePage(i, delta);
      }
      App.showToast(`Rotated all pages by ${delta}°!`, 'info');
    }

    document.getElementById('btn-rot-all-cw').addEventListener('click', () => rotateAllPages(90));
    document.getElementById('btn-rot-all-ccw').addEventListener('click', () => rotateAllPages(-90));
    document.getElementById('btn-rot-all-180').addEventListener('click', () => rotateAllPages(180));
    document.getElementById('btn-rot-reset').addEventListener('click', () => {
      for (let i = 0; i < totalPages; i++) {
        pageRotations[i] = 0;
        const img = document.getElementById(`rot-img-${i}`);
        const badge = document.getElementById(`rot-badge-${i}`);
        if (img) img.style.transform = 'rotate(0deg)';
        if (badge) badge.textContent = '(0°)';
      }
      App.showToast('Reset all rotations', 'info');
    });

    saveBtn.addEventListener('click', async () => {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving PDF...';

      try {
        const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);
        const pages = pdfDoc.getPages();

        pages.forEach((page, idx) => {
          const currentRot = page.getRotation().angle;
          const additionalRot = pageRotations[idx] || 0;
          page.setRotation(PDFLib.degrees((currentRot + additionalRot) % 360));
        });

        const rotatedBytes = await pdfDoc.save();
        const blob = new Blob([rotatedBytes], { type: 'application/pdf' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${baseFileName}_rotated.pdf`;
        a.click();

        App.showToast('Rotated PDF downloaded successfully!', 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error saving rotated PDF: ' + err.message, 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fa-solid fa-download"></i> Save & Download Rotated PDF';
      }
    });
  },

  // 7. Watermark PDF (iLovePDF Style)
  renderWatermarkPdf(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Upload PDF</span>
            <span class="text-muted" id="wm-doc-info">No document loaded</span>
          </div>

          <div class="dropzone" id="wm-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-stamp"></i></div>
            <div class="dropzone-title">Upload PDF to Add Watermark</div>
            <div class="dropzone-hint">Stamp text over your document pages</div>
            <input type="file" id="wm-file-input" accept="application/pdf">
          </div>

          <div style="margin-top:1.25rem;">
            <div class="form-group">
              <label class="form-label">Watermark Text</label>
              <input type="text" id="wm-text-input" class="form-control" value="CONFIDENTIAL">
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div class="form-group">
                <label class="form-label" style="display:flex; justify-content:space-between;">
                  <span>Font Size</span><span class="slider-val-badge" id="wm-size-val">50pt</span>
                </label>
                <input type="range" id="wm-size-slider" class="range-slider" min="16" max="90" value="50">
              </div>

              <div class="form-group">
                <label class="form-label" style="display:flex; justify-content:space-between;">
                  <span>Opacity</span><span class="slider-val-badge" id="wm-opacity-val">30%</span>
                </label>
                <input type="range" id="wm-opacity-slider" class="range-slider" min="10" max="90" value="30">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Rotation Angle</span><span class="slider-val-badge" id="wm-angle-val">45°</span>
              </label>
              <input type="range" id="wm-angle-slider" class="range-slider" min="-90" max="90" value="45">
            </div>

            <div class="form-group">
              <label class="form-label">Watermark Color</label>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <input type="color" id="wm-color-picker" value="#94a3b8" style="width:40px; height:36px; border:none; border-radius:6px; cursor:pointer;">
                <button class="btn btn-sm btn-secondary" onclick="document.getElementById('wm-color-picker').value='#ef4444';">Red Alert</button>
                <button class="btn btn-sm btn-secondary" onclick="document.getElementById('wm-color-picker').value='#94a3b8';">Subtle Gray</button>
                <button class="btn btn-sm btn-secondary" onclick="document.getElementById('wm-color-picker').value='#3b82f6';">Corporate Blue</button>
              </div>
            </div>

            <button class="btn btn-primary" id="btn-apply-watermark" style="width:100%; height:46px; margin-top:1.5rem;" disabled>
              <i class="fa-solid fa-stamp"></i> Apply Watermark & Download PDF
            </button>
          </div>
        </div>

        <div class="pane-card" style="align-items:center; justify-content:center; text-align:center;">
          <div class="pane-header" style="width:100%;">
            <span>Watermark Live Preview</span>
          </div>

          <div style="width:260px; height:360px; background:#ffffff; border-radius:8px; box-shadow:var(--shadow-md); position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; border:1px solid var(--border-medium); margin:auto;">
            <!-- Dummy document lines -->
            <div style="position:absolute; top:20px; left:20px; right:20px; display:flex; flex-direction:column; gap:8px; opacity:0.15;">
              <div style="height:10px; background:#000; border-radius:3px; width:70%;"></div>
              <div style="height:6px; background:#000; border-radius:3px;"></div>
              <div style="height:6px; background:#000; border-radius:3px; width:90%;"></div>
              <div style="height:6px; background:#000; border-radius:3px; width:80%;"></div>
              <div style="height:6px; background:#000; border-radius:3px;"></div>
            </div>

            <div id="wm-live-preview-text" style="font-family:Helvetica, sans-serif; font-weight:800; text-transform:uppercase; transform:rotate(45deg); opacity:0.3; color:#94a3b8; font-size:2rem; user-select:none; pointer-events:none; white-space:nowrap;">
              CONFIDENTIAL
            </div>
          </div>
        </div>
      </div>
    `;

    const fileInput = document.getElementById('wm-file-input');
    const dropzone = document.getElementById('wm-dropzone');
    const textInput = document.getElementById('wm-text-input');
    const sizeSlider = document.getElementById('wm-size-slider');
    const sizeVal = document.getElementById('wm-size-val');
    const opacitySlider = document.getElementById('wm-opacity-slider');
    const opacityVal = document.getElementById('wm-opacity-val');
    const angleSlider = document.getElementById('wm-angle-slider');
    const angleVal = document.getElementById('wm-angle-val');
    const colorPicker = document.getElementById('wm-color-picker');
    const applyBtn = document.getElementById('btn-apply-watermark');
    const previewText = document.getElementById('wm-live-preview-text');

    let loadedPdfBytes = null;
    let baseFileName = 'watermarked_document';

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    async function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        App.showToast('Please select a valid PDF file', 'error');
        return;
      }
      baseFileName = file.name.replace(/\.[^/.]+$/, "");
      loadedPdfBytes = await file.arrayBuffer();
      document.getElementById('wm-doc-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;
      applyBtn.disabled = false;
      App.showToast(`Loaded ${file.name}`, 'success');
    }

    function updatePreview() {
      const text = textInput.value || 'CONFIDENTIAL';
      const size = sizeSlider.value;
      const opacity = opacitySlider.value / 100;
      const angle = angleSlider.value;
      const color = colorPicker.value;

      sizeVal.textContent = `${size}pt`;
      opacityVal.textContent = `${opacitySlider.value}%`;
      angleVal.textContent = `${angle}°`;

      previewText.textContent = text;
      previewText.style.fontSize = `${Math.max(16, size / 2.2)}px`;
      previewText.style.opacity = opacity;
      previewText.style.transform = `rotate(${angle}deg)`;
      previewText.style.color = color;
    }

    [textInput, sizeSlider, opacitySlider, angleSlider, colorPicker].forEach(el => el.addEventListener('input', updatePreview));

    applyBtn.addEventListener('click', async () => {
      if (!loadedPdfBytes) return;

      applyBtn.disabled = true;
      applyBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Stamping Watermark...';

      try {
        const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

        const text = textInput.value.trim() || 'CONFIDENTIAL';
        const size = parseInt(sizeSlider.value) || 50;
        const opacity = parseFloat(opacitySlider.value) / 100 || 0.3;
        const angle = parseInt(angleSlider.value) || 45;

        // Parse hex color to 0..1 RGB
        const hex = colorPicker.value;
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        pages.forEach(page => {
          const { width, height } = page.getSize();
          const textWidth = font.widthOfTextAtSize(text, size);
          const textHeight = font.heightAtSize(size);

          page.drawText(text, {
            x: (width - textWidth) / 2,
            y: (height - textHeight) / 2,
            size,
            font,
            color: PDFLib.rgb(r, g, b),
            opacity,
            rotate: PDFLib.degrees(angle)
          });
        });

        const watermarkedBytes = await pdfDoc.save();
        const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${baseFileName}_watermarked.pdf`;
        a.click();

        App.showToast('Watermarked PDF saved successfully!', 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error stamping watermark: ' + err.message, 'error');
      } finally {
        applyBtn.disabled = false;
        applyBtn.innerHTML = '<i class="fa-solid fa-stamp"></i> Apply Watermark & Download PDF';
      }
    });

    updatePreview();
  },

  // 8. Add Page Numbers to PDF (iLovePDF Style)
  renderPageNumbers(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Upload PDF</span>
            <span class="text-muted" id="pn-doc-info">No document loaded</span>
          </div>

          <div class="dropzone" id="pn-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-arrow-down-1-9"></i></div>
            <div class="dropzone-title">Upload PDF to Add Page Numbers</div>
            <div class="dropzone-hint">Stamp customized page numbering onto your document</div>
            <input type="file" id="pn-file-input" accept="application/pdf">
          </div>

          <div style="margin-top:1.25rem;">
            <div class="form-group">
              <label class="form-label">Numbering Format</label>
              <select id="pn-format-select" class="form-control">
                <option value="Page {n} of {total}" selected>Page {n} of {total}</option>
                <option value="{n} / {total}">{n} / {total}</option>
                <option value="Page {n}">Page {n}</option>
                <option value="{n}">{n} (Number only)</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div class="form-group">
                <label class="form-label">Font Size</label>
                <select id="pn-size-select" class="form-control">
                  <option value="9">Small (9 pt)</option>
                  <option value="11" selected>Medium (11 pt)</option>
                  <option value="13">Large (13 pt)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Start Number</label>
                <input type="number" id="pn-start-input" class="form-control" value="1" min="1">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Placement Position</label>
              <select id="pn-position-select" class="form-control">
                <option value="bottom-center" selected>Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-center">Top Center</option>
              </select>
            </div>

            <button class="btn btn-primary" id="btn-apply-page-numbers" style="width:100%; height:46px; margin-top:1.5rem;" disabled>
              <i class="fa-solid fa-list-ol"></i> Stamp Page Numbers & Download
            </button>
          </div>
        </div>

        <div class="pane-card" style="align-items:center; justify-content:center;">
          <div class="pane-header" style="width:100%;">
            <span>Placement Position Preview</span>
          </div>

          <div style="width:240px; height:340px; background:#ffffff; border-radius:8px; box-shadow:var(--shadow-md); position:relative; overflow:hidden; border:1px solid var(--border-medium); margin:auto; display:flex; flex-direction:column; justify-content:space-between; padding:1.25rem;">
            <div id="pn-preview-top" style="text-align:center; font-family:Helvetica, sans-serif; font-size:10px; color:#475569; font-weight:600; min-height:16px;"></div>

            <!-- Dummy lines -->
            <div style="display:flex; flex-direction:column; gap:6px; opacity:0.15;">
              <div style="height:8px; background:#000; border-radius:3px; width:70%;"></div>
              <div style="height:5px; background:#000; border-radius:3px;"></div>
              <div style="height:5px; background:#000; border-radius:3px; width:90%;"></div>
            </div>

            <div id="pn-preview-bottom" style="text-align:center; font-family:Helvetica, sans-serif; font-size:10px; color:#475569; font-weight:600; min-height:16px;">
              Page 1 of 5
            </div>
          </div>
        </div>
      </div>
    `;

    const fileInput = document.getElementById('pn-file-input');
    const dropzone = document.getElementById('pn-dropzone');
    const formatSelect = document.getElementById('pn-format-select');
    const posSelect = document.getElementById('pn-position-select');
    const applyBtn = document.getElementById('btn-apply-page-numbers');
    const prevTop = document.getElementById('pn-preview-top');
    const prevBottom = document.getElementById('pn-preview-bottom');

    let loadedPdfBytes = null;
    let baseFileName = 'numbered_document';

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    async function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        App.showToast('Please select a valid PDF file', 'error');
        return;
      }
      baseFileName = file.name.replace(/\.[^/.]+$/, "");
      loadedPdfBytes = await file.arrayBuffer();
      document.getElementById('pn-doc-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;
      applyBtn.disabled = false;
      App.showToast(`Loaded ${file.name}`, 'success');
    }

    function updatePreview() {
      const pos = posSelect.value;
      const sample = formatSelect.value.replace('{n}', '1').replace('{total}', '5');

      if (pos.startsWith('top')) {
        prevTop.textContent = sample;
        prevTop.style.textAlign = pos.includes('right') ? 'right' : (pos.includes('left') ? 'left' : 'center');
        prevBottom.textContent = '';
      } else {
        prevBottom.textContent = sample;
        prevBottom.style.textAlign = pos.includes('right') ? 'right' : (pos.includes('left') ? 'left' : 'center');
        prevTop.textContent = '';
      }
    }

    formatSelect.addEventListener('change', updatePreview);
    posSelect.addEventListener('change', updatePreview);
    updatePreview();

    applyBtn.addEventListener('click', async () => {
      if (!loadedPdfBytes) return;

      applyBtn.disabled = true;
      applyBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Stamping Page Numbers...';

      try {
        const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);
        const pages = pdfDoc.getPages();
        const total = pages.length;
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

        const format = formatSelect.value;
        const size = parseInt(document.getElementById('pn-size-select').value) || 11;
        const start = parseInt(document.getElementById('pn-start-input').value) || 1;
        const pos = posSelect.value;
        const margin = 28;

        pages.forEach((page, idx) => {
          const { width, height } = page.getSize();
          const currentNum = start + idx;
          const label = format.replace('{n}', currentNum).replace('{total}', total);
          const textWidth = font.widthOfTextAtSize(label, size);

          let x = (width - textWidth) / 2;
          let y = margin;

          if (pos === 'bottom-right') x = width - textWidth - margin;
          else if (pos === 'bottom-left') x = margin;
          else if (pos === 'top-center') { y = height - margin; }
          else if (pos === 'top-right') { x = width - textWidth - margin; y = height - margin; }

          page.drawText(label, {
            x,
            y,
            size,
            font,
            color: PDFLib.rgb(0.25, 0.3, 0.38)
          });
        });

        const numberedBytes = await pdfDoc.save();
        const blob = new Blob([numberedBytes], { type: 'application/pdf' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${baseFileName}_numbered.pdf`;
        a.click();

        App.showToast('Page numbers applied successfully!', 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error stamping numbers: ' + err.message, 'error');
      } finally {
        applyBtn.disabled = false;
        applyBtn.innerHTML = '<i class="fa-solid fa-list-ol"></i> Stamp Page Numbers & Download';
      }
    });
  },

  // 9. Organize & Remove Pages (iLovePDF Style)
  renderOrganizePdf(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Upload PDF to Organize</span>
            <span class="text-muted" id="org-doc-info">No document loaded</span>
          </div>

          <div class="dropzone" id="org-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-table-cells-large"></i></div>
            <div class="dropzone-title">Upload PDF to Organize & Remove Pages</div>
            <div class="dropzone-hint">Delete unwanted pages, reorder or duplicate</div>
            <input type="file" id="org-file-input" accept="application/pdf">
          </div>

          <div style="margin-top:1.25rem;">
            <div class="image-meta-strip" style="margin-bottom:1.25rem;">
              <div>Remaining Pages: <strong id="org-remaining-count" style="color:var(--accent-emerald);">0</strong></div>
              <div>Deleted: <strong id="org-deleted-count" style="color:var(--accent-rose);">0</strong></div>
            </div>

            <button class="btn btn-primary" id="btn-save-organized-pdf" style="width:100%; height:46px;" disabled>
              <i class="fa-solid fa-file-export"></i> Save Reorganized PDF
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-layer-group"></i> Visual Page Cards (Click trash icon to delete)</span>
          </div>

          <div id="org-gallery" class="pdf-pages-gallery">
            <div class="text-muted" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">
              Upload a PDF to view all pages and remove unwanted ones
            </div>
          </div>
        </div>
      </div>
    `;

    const fileInput = document.getElementById('org-file-input');
    const dropzone = document.getElementById('org-dropzone');
    const gallery = document.getElementById('org-gallery');
    const saveBtn = document.getElementById('btn-save-organized-pdf');
    const remainEl = document.getElementById('org-remaining-count');
    const delEl = document.getElementById('org-deleted-count');

    let loadedPdfBytes = null;
    let baseFileName = 'organized_document';
    let pagesList = []; // array of { originalIndex, pageNum, canvasUrl }
    let initialCount = 0;

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    async function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        App.showToast('Please select a valid PDF file', 'error');
        return;
      }
      baseFileName = file.name.replace(/\.[^/.]+$/, "");
      loadedPdfBytes = await file.arrayBuffer();
      document.getElementById('org-doc-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;

      loadAndRenderPages();
    }

    async function loadAndRenderPages() {
      if (typeof pdfjsLib === 'undefined') return;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      gallery.innerHTML = '<div class="text-muted" style="grid-column:1/-1; text-align:center; padding:2rem;"><i class="fa-solid fa-spinner fa-spin"></i> Rendering thumbnails...</div>';
      const pdf = await pdfjsLib.getDocument({ data: loadedPdfBytes }).promise;
      initialCount = pdf.numPages;
      pagesList = [];

      for (let i = 1; i <= initialCount; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

        pagesList.push({
          originalIndex: i - 1,
          pageNum: i,
          canvasUrl: canvas.toDataURL()
        });
      }

      renderGallery();
    }

    function renderGallery() {
      gallery.innerHTML = '';
      remainEl.textContent = pagesList.length;
      delEl.textContent = initialCount - pagesList.length;
      saveBtn.disabled = pagesList.length === 0;

      if (!pagesList.length) {
        gallery.innerHTML = '<div class="text-muted" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">All pages deleted. Cannot export empty PDF.</div>';
        return;
      }

      pagesList.forEach((item, pos) => {
        const card = document.createElement('div');
        card.className = 'pdf-page-card';
        card.innerHTML = `
          <div class="pdf-page-canvas-wrap">
            <img src="${item.canvasUrl}" alt="Page ${item.pageNum}" />
          </div>
          <div class="pdf-page-badge">Page ${pos + 1} (Orig #${item.pageNum})</div>
          <div class="pdf-page-actions">
            <button class="pdf-card-btn" data-move-left="${pos}" ${pos === 0 ? 'disabled' : ''} title="Move left">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button class="pdf-card-btn" data-move-right="${pos}" ${pos === pagesList.length - 1 ? 'disabled' : ''} title="Move right">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button class="pdf-card-btn danger" data-delete-page="${pos}" title="Delete page">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;

        card.querySelector(`[data-delete-page="${pos}"]`).addEventListener('click', () => {
          pagesList.splice(pos, 1);
          renderGallery();
          App.showToast(`Deleted page ${pos + 1}`, 'info');
        });

        if (pos > 0) {
          card.querySelector(`[data-move-left="${pos}"]`).addEventListener('click', () => {
            const temp = pagesList[pos - 1];
            pagesList[pos - 1] = pagesList[pos];
            pagesList[pos] = temp;
            renderGallery();
          });
        }

        if (pos < pagesList.length - 1) {
          card.querySelector(`[data-move-right="${pos}"]`).addEventListener('click', () => {
            const temp = pagesList[pos + 1];
            pagesList[pos + 1] = pagesList[pos];
            pagesList[pos] = temp;
            renderGallery();
          });
        }

        gallery.appendChild(card);
      });
    }

    saveBtn.addEventListener('click', async () => {
      if (!pagesList.length) return;

      saveBtn.disabled = true;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving PDF...';

      try {
        const sourceDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);
        const newDoc = await PDFLib.PDFDocument.create();

        const indicesToCopy = pagesList.map(p => p.originalIndex);
        const copied = await newDoc.copyPages(sourceDoc, indicesToCopy);
        copied.forEach(p => newDoc.addPage(p));

        const newBytes = await newDoc.save();
        const blob = new Blob([newBytes], { type: 'application/pdf' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${baseFileName}_organized.pdf`;
        a.click();

        App.showToast(`Organized PDF downloaded (${pagesList.length} pages)!`, 'success');
      } catch (err) {
        console.error(err);
        App.showToast('Error saving organized PDF: ' + err.message, 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fa-solid fa-file-export"></i> Save Reorganized PDF';
      }
    });
  },

  // 10. Extract Text from PDF (iLovePDF Style)
  renderExtractText(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-pdf"></i> Upload PDF</span>
            <span class="text-muted" id="et-doc-info">No document loaded</span>
          </div>

          <div class="dropzone" id="et-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-file-lines"></i></div>
            <div class="dropzone-title">Upload PDF to Extract Raw Text</div>
            <div class="dropzone-hint">Scrapes all readable text into an editable format</div>
            <input type="file" id="et-file-input" accept="application/pdf">
          </div>

          <div class="image-meta-strip" style="margin-top:1.25rem;">
            <div>Pages: <strong id="et-pages-stat" style="color:var(--accent-cyan);">0</strong></div>
            <div>Words: <strong id="et-words-stat">0</strong></div>
            <div>Chars: <strong id="et-chars-stat">0</strong></div>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Extracted Text Content</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-emerald" id="btn-copy-et-text">
                <i class="fa-solid fa-copy"></i> Copy Text
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-download-et-txt">
                <i class="fa-solid fa-download"></i> Save .txt
              </button>
            </div>
          </div>

          <textarea id="et-output-text" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-sans); line-height:1.6;" placeholder="Extracted text from PDF will appear here..." readonly></textarea>
        </div>
      </div>
    `;

    const fileInput = document.getElementById('et-file-input');
    const dropzone = document.getElementById('et-dropzone');
    const output = document.getElementById('et-output-text');
    const pagesStat = document.getElementById('et-pages-stat');
    const wordsStat = document.getElementById('et-words-stat');
    const charsStat = document.getElementById('et-chars-stat');
    const copyBtn = document.getElementById('btn-copy-et-text');
    const downloadBtn = document.getElementById('btn-download-et-txt');

    let baseFileName = 'extracted_text';

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, e => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', e => { if (e.dataTransfer.files[0]) extractText(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) extractText(e.target.files[0]); });

    async function extractText(file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        App.showToast('Please select a valid PDF file', 'error');
        return;
      }
      baseFileName = file.name.replace(/\.[^/.]+$/, "");
      document.getElementById('et-doc-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;

      if (typeof pdfjsLib === 'undefined') {
        App.showToast('PDF extraction library loading...', 'info');
        return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      output.value = '>>> Extracting text from document pages...\n';

      try {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        const total = pdf.numPages;
        pagesStat.textContent = total;

        let fullText = '';
        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          fullText += `--- [PAGE ${i}] ---\n` + strings.join(' ') + '\n\n';
        }

        output.value = fullText.trim();
        const words = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;
        wordsStat.textContent = words;
        charsStat.textContent = fullText.length;

        App.showToast(`Extracted text from ${total} pages!`, 'success');
      } catch (err) {
        console.error(err);
        output.value = 'Error extracting text: ' + err.message;
        App.showToast('Failed to extract text: ' + err.message, 'error');
      }
    }

    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(output.value, 'Extracted text copied to clipboard!');
    });

    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${baseFileName}.txt`;
      a.click();
      App.showToast(`Saved ${baseFileName}.txt!`, 'success');
    });
  }
};

