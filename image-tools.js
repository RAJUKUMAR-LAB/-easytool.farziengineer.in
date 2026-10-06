/* ==========================================================================
   OmniToolbox - Image Studio Tools
   Universal Image Converter, Compressor, Resizer, Effects & Base64
   ========================================================================== */

const ImageTools = {
  // 1. Universal Image Converter & Compressor
  renderConverter(container) {
    container.innerHTML = `
      <div class="split-pane">
        <!-- Controls & Upload Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-image"></i> Source Image</span>
            <span class="text-muted" id="img-source-info">No file loaded</span>
          </div>

          <div class="dropzone" id="converter-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
            <div class="dropzone-title">Drop your image here or click to browse</div>
            <div class="dropzone-hint">Supports PNG, JPG, WEBP, GIF, SVG, BMP, AVIF</div>
            <input type="file" id="converter-file-input" accept="image/*">
          </div>

          <div id="converter-settings" style="display:none; margin-top:1.5rem;">
            <!-- Quick Interchange & Presets Bar -->
            <div class="quick-interchange-box">
              <div class="quick-interchange-label">
                <i class="fa-solid fa-arrows-rotate"></i> Quick Format Interchange
              </div>
              <div class="quick-interchange-pills">
                <button type="button" class="interchange-pill accent-cyan" id="btn-quick-png">PNG ➔ JPG</button>
                <button type="button" class="interchange-pill accent-purple" id="btn-quick-jpg">JPG ➔ PNG</button>
                <button type="button" class="interchange-pill" id="btn-quick-webp">Any ➔ WEBP</button>
                <button type="button" class="interchange-pill accent-rose" id="btn-quick-swap">
                  <i class="fa-solid fa-arrow-right-arrow-left"></i> Swap Format
                </button>
              </div>

              <div class="quick-interchange-label" style="margin-top:0.75rem;">
                <i class="fa-solid fa-gauge-high"></i> Size & Scale Presets
              </div>
              <div class="quick-interchange-pills">
                <button type="button" class="interchange-pill" data-preset-scale="0.25">25% (Thumb)</button>
                <button type="button" class="interchange-pill" data-preset-scale="0.5">50% (Half Size)</button>
                <button type="button" class="interchange-pill" data-preset-scale="0.75">75%</button>
                <button type="button" class="interchange-pill active" data-preset-scale="1.0">100% (Original)</button>
                <button type="button" class="interchange-pill" data-preset-scale="1.5">150% (Enlarge)</button>
                <button type="button" class="interchange-pill" data-preset-scale="2.0">200% (2x Upscale)</button>
                <button type="button" class="interchange-pill" id="btn-quick-compress-100k">
                  <i class="fa-solid fa-compress"></i> Web (<100KB)
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Convert Target Format</label>
              <select id="target-format" class="form-control">
                <option value="image/png">PNG (.png) - High Quality / Transparency</option>
                <option value="image/jpeg" selected>JPEG (.jpg) - Universal / Compact</option>
                <option value="image/webp">WEBP (.webp) - Modern Web Standard</option>
                <option value="image/bmp">BMP (.bmp) - Uncompressed Bitmap</option>
              </select>
            </div>

            <div class="form-group" id="quality-slider-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Quality / Compression</span>
                <span class="slider-val-badge" id="quality-val">90%</span>
              </label>
              <div class="range-slider-wrap">
                <input type="range" id="converter-quality" class="range-slider" min="10" max="100" value="90">
              </div>
              <small class="text-muted" style="font-size:0.75rem; display:block; margin-top:4px;">
                Lower quality decreases file size significantly while retaining good visual clarity.
              </small>
            </div>

            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label class="form-label" style="margin-bottom:0;">Dimensions (Resize / Scale)</label>
                <div class="stepper-row" style="margin-top:0;">
                  <button type="button" class="stepper-btn" id="step-minus-25">-25%</button>
                  <button type="button" class="stepper-btn" id="step-minus-10">-10%</button>
                  <button type="button" class="stepper-btn" id="step-plus-10">+10%</button>
                  <button type="button" class="stepper-btn" id="step-plus-25">+25%</button>
                  <button type="button" class="stepper-btn" id="step-2x">2x</button>
                </div>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:0.4rem;">
                <input type="number" id="resize-w" class="form-control" placeholder="Width (px)">
                <input type="number" id="resize-h" class="form-control" placeholder="Height (px)">
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; flex-wrap:wrap; gap:0.5rem;">
                <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; cursor:pointer;">
                  <input type="checkbox" id="keep-aspect" checked> Maintain Aspect Ratio
                </label>
                <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; cursor:pointer; color:var(--accent-cyan);">
                  <input type="checkbox" id="auto-enhance-chk"> Auto-Enhance & Sharpen
                </label>
              </div>
            </div>

            <button class="btn btn-primary" id="btn-process-image" style="width:100%; margin-top:0.75rem;">
              <i class="fa-solid fa-bolt"></i> Convert & Process Image
            </button>
          </div>
        </div>

        <!-- Preview & Output Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-eye"></i> Live Preview & Export</span>
            <div id="export-actions" style="display:none; gap:0.5rem;">
              <button class="btn btn-sm btn-emerald" id="btn-download-img">
                <i class="fa-solid fa-download"></i> Download
              </button>
            </div>
          </div>

          <div class="image-preview-container" id="img-preview-box">
            <span class="text-muted" style="font-size:0.88rem;">Select or drop an image to preview</span>
          </div>

          <div class="image-meta-strip" id="img-meta-strip" style="display:none;">
            <div class="meta-chip">
              <span>Original:</span>
              <strong id="meta-orig-size">0 KB</strong>
            </div>
            <div class="meta-chip">
              <span>Output:</span>
              <strong id="meta-out-size" style="color:var(--accent-emerald);">0 KB</strong>
            </div>
            <div class="meta-chip">
              <span>Dimensions:</span>
              <strong id="meta-dims">0 x 0</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initConverterLogic();
  },

  initConverterLogic() {
    const fileInput = document.getElementById('converter-file-input');
    const dropzone = document.getElementById('converter-dropzone');
    const settings = document.getElementById('converter-settings');
    const qualitySlider = document.getElementById('converter-quality');
    const qualityVal = document.getElementById('quality-val');
    const previewBox = document.getElementById('img-preview-box');
    const metaStrip = document.getElementById('img-meta-strip');
    const origSizeSpan = document.getElementById('meta-orig-size');
    const outSizeSpan = document.getElementById('meta-out-size');
    const dimsSpan = document.getElementById('meta-dims');
    const exportActions = document.getElementById('export-actions');
    const downloadBtn = document.getElementById('btn-download-img');
    const processBtn = document.getElementById('btn-process-image');
    const targetFormat = document.getElementById('target-format');
    const resizeW = document.getElementById('resize-w');
    const resizeH = document.getElementById('resize-h');
    const keepAspect = document.getElementById('keep-aspect');
    const autoEnhanceChk = document.getElementById('auto-enhance-chk');

    let currentFile = null;
    let originalImg = new Image();
    let originalAspectRatio = 1;
    let processedBlob = null;

    qualitySlider.addEventListener('input', () => {
      qualityVal.textContent = qualitySlider.value + '%';
    });

    // Drag and drop events
    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    });

    function handleFile(file) {
      if (!file.type.startsWith('image/')) {
        App.showToast('Please select a valid image file', 'error');
        return;
      }
      currentFile = file;
      document.getElementById('img-source-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;
      settings.style.display = 'block';

      const reader = new FileReader();
      reader.onload = (e) => {
        originalImg.onload = () => {
          originalAspectRatio = originalImg.naturalWidth / originalImg.naturalHeight;
          resizeW.value = originalImg.naturalWidth;
          resizeH.value = originalImg.naturalHeight;
          processImage();
        };
        originalImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Quick Interchange Format Buttons
    const btnQuickPng = document.getElementById('btn-quick-png');
    const btnQuickJpg = document.getElementById('btn-quick-jpg');
    const btnQuickWebp = document.getElementById('btn-quick-webp');
    const btnQuickSwap = document.getElementById('btn-quick-swap');

    if (btnQuickPng) {
      btnQuickPng.addEventListener('click', () => {
        targetFormat.value = 'image/jpeg';
        qualitySlider.value = 90;
        qualityVal.textContent = '90%';
        processImage();
        App.showToast('Converted to JPEG format', 'info');
      });
    }

    if (btnQuickJpg) {
      btnQuickJpg.addEventListener('click', () => {
        targetFormat.value = 'image/png';
        processImage();
        App.showToast('Converted to PNG format (lossless)', 'info');
      });
    }

    if (btnQuickWebp) {
      btnQuickWebp.addEventListener('click', () => {
        targetFormat.value = 'image/webp';
        qualitySlider.value = 85;
        qualityVal.textContent = '85%';
        processImage();
        App.showToast('Converted to WEBP format', 'info');
      });
    }

    if (btnQuickSwap) {
      btnQuickSwap.addEventListener('click', () => {
        if (targetFormat.value === 'image/jpeg') {
          targetFormat.value = 'image/png';
        } else if (targetFormat.value === 'image/png') {
          targetFormat.value = 'image/jpeg';
        } else {
          targetFormat.value = 'image/jpeg';
        }
        processImage();
        App.showToast(`Swapped format to ${targetFormat.value.split('/')[1].toUpperCase()}`, 'info');
      });
    }

    // Quick Scale Presets (25%, 50%, 75%, 100%, 150%, 200%)
    document.querySelectorAll('[data-preset-scale]').forEach(chip => {
      chip.addEventListener('click', () => {
        if (!originalImg.naturalWidth) return;
        document.querySelectorAll('[data-preset-scale]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const scale = parseFloat(chip.dataset.presetScale);
        resizeW.value = Math.max(1, Math.round(originalImg.naturalWidth * scale));
        resizeH.value = Math.max(1, Math.round(originalImg.naturalHeight * scale));
        processImage();
        App.showToast(`Scaled to ${scale * 100}% (${resizeW.value} × ${resizeH.value}px)`, 'info');
      });
    });

    // Web <100KB Compress preset
    const btn100k = document.getElementById('btn-quick-compress-100k');
    if (btn100k) {
      btn100k.addEventListener('click', () => {
        if (!originalImg.naturalWidth) return;
        targetFormat.value = 'image/webp';
        qualitySlider.value = 65;
        qualityVal.textContent = '65%';
        const maxDim = 1200;
        if (originalImg.naturalWidth > maxDim || originalImg.naturalHeight > maxDim) {
          if (originalImg.naturalWidth > originalImg.naturalHeight) {
            resizeW.value = maxDim;
            resizeH.value = Math.round(maxDim / originalAspectRatio);
          } else {
            resizeH.value = maxDim;
            resizeW.value = Math.round(maxDim * originalAspectRatio);
          }
        }
        processImage();
        App.showToast('Optimized for Web (<100KB target)', 'success');
      });
    }

    // Step Buttons (+-10%, +-25%, 2x)
    function applyStep(factor) {
      let w = parseInt(resizeW.value) || originalImg.naturalWidth || 100;
      w = Math.max(1, Math.round(w * factor));
      resizeW.value = w;
      if (keepAspect.checked && originalAspectRatio) {
        resizeH.value = Math.max(1, Math.round(w / originalAspectRatio));
      }
      processImage();
    }

    const stepM25 = document.getElementById('step-minus-25');
    const stepM10 = document.getElementById('step-minus-10');
    const stepP10 = document.getElementById('step-plus-10');
    const stepP25 = document.getElementById('step-plus-25');
    const step2x = document.getElementById('step-2x');

    if (stepM25) stepM25.addEventListener('click', () => applyStep(0.75));
    if (stepM10) stepM10.addEventListener('click', () => applyStep(0.9));
    if (stepP10) stepP10.addEventListener('click', () => applyStep(1.1));
    if (stepP25) stepP25.addEventListener('click', () => applyStep(1.25));
    if (step2x) step2x.addEventListener('click', () => applyStep(2.0));

    // Aspect ratio locking
    resizeW.addEventListener('input', () => {
      if (keepAspect.checked && originalAspectRatio) {
        resizeH.value = Math.round(resizeW.value / originalAspectRatio);
      }
    });
    resizeH.addEventListener('input', () => {
      if (keepAspect.checked && originalAspectRatio) {
        resizeW.value = Math.round(resizeH.value * originalAspectRatio);
      }
    });

    targetFormat.addEventListener('change', () => {
      const qGroup = document.getElementById('quality-slider-group');
      if (targetFormat.value === 'image/png' || targetFormat.value === 'image/bmp') {
        qGroup.style.opacity = '0.5';
        qGroup.style.pointerEvents = 'none';
      } else {
        qGroup.style.opacity = '1';
        qGroup.style.pointerEvents = 'auto';
      }
      processImage();
    });

    processBtn.addEventListener('click', () => processImage());
    qualitySlider.addEventListener('change', () => processImage());
    if (autoEnhanceChk) autoEnhanceChk.addEventListener('change', () => processImage());

    function processImage() {
      if (!originalImg.src) return;

      const targetW = parseInt(resizeW.value) || originalImg.naturalWidth;
      const targetH = parseInt(resizeH.value) || originalImg.naturalHeight;
      const format = targetFormat.value;
      const quality = parseInt(qualitySlider.value) / 100;

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      // Fill white background for JPEG if transparency
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(originalImg, 0, 0, targetW, targetH);

      // Auto-Enhance & Sharpen filter if enabled
      if (autoEnhanceChk && autoEnhanceChk.checked) {
        try {
          const imgData = ctx.getImageData(0, 0, targetW, targetH);
          const d = imgData.data;
          // Contrast & Vibrance stretch
          const factor = (259 * (30 + 255)) / (255 * (259 - 30));
          for (let i = 0; i < d.length; i += 4) {
            d[i] = factor * (d[i] - 128) + 128;     // R
            d[i+1] = factor * (d[i+1] - 128) + 128; // G
            d[i+2] = factor * (d[i+2] - 128) + 128; // B
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (e) {
          console.warn('Canvas filter error:', e);
        }
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          App.showToast('Conversion failed', 'error');
          return;
        }
        processedBlob = blob;
        const blobUrl = URL.createObjectURL(blob);

        previewBox.innerHTML = '';
        const previewImg = document.createElement('img');
        previewImg.src = blobUrl;
        previewBox.appendChild(previewImg);

        // Update stats
        metaStrip.style.display = 'flex';
        origSizeSpan.textContent = App.formatBytes(currentFile.size);
        outSizeSpan.textContent = App.formatBytes(blob.size);
        dimsSpan.textContent = `${targetW} × ${targetH} px`;
        exportActions.style.display = 'flex';

        // Calculation badge if reduced
        if (blob.size < currentFile.size) {
          const saved = Math.round((1 - blob.size / currentFile.size) * 100);
          outSizeSpan.textContent = `${App.formatBytes(blob.size)} (-${saved}%)`;
          outSizeSpan.style.color = 'var(--accent-emerald)';
        } else if (blob.size > currentFile.size) {
          const inc = Math.round((blob.size / currentFile.size - 1) * 100);
          outSizeSpan.textContent = `${App.formatBytes(blob.size)} (+${inc}%)`;
          outSizeSpan.style.color = 'var(--accent-amber)';
        } else {
          outSizeSpan.textContent = App.formatBytes(blob.size);
        }
      }, format, quality);
    }

    downloadBtn.addEventListener('click', () => {
      if (!processedBlob) return;
      const ext = targetFormat.value.split('/')[1].replace('jpeg', 'jpg');
      const baseName = currentFile.name.substring(0, currentFile.name.lastIndexOf('.')) || 'converted_image';
      const fileName = `${baseName}_omni.${ext}`;

      const link = document.createElement('a');
      link.href = URL.createObjectURL(processedBlob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      App.showToast(`Saved ${fileName}`, 'success');
    });
  },

  // 2. Image to Base64 & Base64 to Image
  renderBase64(container) {
    container.innerHTML = `
      <div class="tabs-header">
        <button class="tab-btn active" data-b64-tab="to-b64"><i class="fa-solid fa-code"></i> Image to Base64</button>
        <button class="tab-btn" data-b64-tab="from-b64"><i class="fa-solid fa-image"></i> Base64 to Image</button>
      </div>

      <!-- Tab 1: Image to Base64 -->
      <div id="tab-to-b64" class="tab-content-panel">
        <div class="split-pane">
          <div class="pane-card">
            <div class="pane-header"><span>Upload Image</span></div>
            <div class="dropzone" id="b64-dropzone">
              <div class="dropzone-icon"><i class="fa-solid fa-file-arrow-up"></i></div>
              <div class="dropzone-title">Upload Image for Base64 Data URI</div>
              <div class="dropzone-hint">PNG, JPG, SVG, WEBP, GIF, ICO</div>
              <input type="file" id="b64-file-input" accept="image/*">
            </div>
            <div id="b64-img-preview" style="margin-top:1rem; text-align:center;"></div>
          </div>

          <div class="pane-card">
            <div class="pane-header">
              <span>Base64 String Output</span>
              <button class="btn btn-sm btn-primary" id="btn-copy-b64">
                <i class="fa-solid fa-copy"></i> Copy Data URI
              </button>
            </div>
            <div class="code-output-wrap" style="flex:1; display:flex; flex-direction:column;">
              <textarea id="b64-output-text" class="form-control" style="flex:1; min-height:220px;" placeholder="Base64 Data URI will appear here..." readonly></textarea>
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
              <button class="btn btn-sm btn-secondary" id="btn-copy-raw-b64">Copy Raw Base64</button>
              <button class="btn btn-sm btn-secondary" id="btn-copy-html-img">Copy HTML &lt;img&gt;</button>
              <button class="btn btn-sm btn-secondary" id="btn-copy-css-bg">Copy CSS background</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Base64 to Image -->
      <div id="tab-from-b64" class="tab-content-panel" style="display:none;">
        <div class="split-pane">
          <div class="pane-card">
            <div class="pane-header"><span>Paste Base64 or Data URI</span></div>
            <textarea id="b64-input-text" class="form-control" style="height:260px;" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."></textarea>
            <button class="btn btn-primary" id="btn-render-b64" style="margin-top:1rem;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Render Image
            </button>
          </div>

          <div class="pane-card">
            <div class="pane-header">
              <span>Decoded Image Preview</span>
              <button class="btn btn-sm btn-emerald" id="btn-download-from-b64" style="display:none;">
                <i class="fa-solid fa-download"></i> Download Image
              </button>
            </div>
            <div class="image-preview-container" id="from-b64-preview">
              <span class="text-muted">Image preview will render here</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initBase64Logic();
  },

  initBase64Logic() {
    // Tabs toggle
    const tabs = document.querySelectorAll('[data-b64-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.b64Tab;
        document.getElementById('tab-to-b64').style.display = target === 'to-b64' ? 'block' : 'none';
        document.getElementById('tab-from-b64').style.display = target === 'from-b64' ? 'block' : 'none';
      });
    });

    const fileInput = document.getElementById('b64-file-input');
    const outputText = document.getElementById('b64-output-text');
    const previewDiv = document.getElementById('b64-img-preview');

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          outputText.value = ev.target.result;
          previewDiv.innerHTML = `<img src="${ev.target.result}" style="max-height:120px; border-radius:8px; border:1px solid var(--border-subtle); box-shadow:var(--shadow-sm);" />`;
          App.showToast(`Converted ${file.name} to Base64`, 'success');
        };
        reader.readAsDataURL(file);
      }
    });

    document.getElementById('btn-copy-b64').addEventListener('click', () => {
      App.copyToClipboard(outputText.value, 'Base64 Data URI copied to clipboard!');
    });
    document.getElementById('btn-copy-raw-b64').addEventListener('click', () => {
      const parts = outputText.value.split(',');
      const raw = parts.length > 1 ? parts[1] : outputText.value;
      App.copyToClipboard(raw, 'Raw Base64 string copied!');
    });
    document.getElementById('btn-copy-html-img').addEventListener('click', () => {
      const htmlTag = `<img src="${outputText.value}" alt="Embedded Image" />`;
      App.copyToClipboard(htmlTag, 'HTML <img> tag copied!');
    });
    document.getElementById('btn-copy-css-bg').addEventListener('click', () => {
      const css = `background-image: url('${outputText.value}');`;
      App.copyToClipboard(css, 'CSS background rule copied!');
    });

    // From Base64 to Image
    const inputB64 = document.getElementById('b64-input-text');
    const renderBtn = document.getElementById('btn-render-b64');
    const fromPreview = document.getElementById('from-b64-preview');
    const downloadFromBtn = document.getElementById('btn-download-from-b64');

    renderBtn.addEventListener('click', () => {
      let val = inputB64.value.trim();
      if (!val) {
        App.showToast('Please paste a Base64 string', 'error');
        return;
      }
      if (!val.startsWith('data:image')) {
        val = 'data:image/png;base64,' + val;
      }
      fromPreview.innerHTML = `<img src="${val}" id="rendered-b64-img" style="max-height:380px; object-fit:contain;" />`;
      downloadFromBtn.style.display = 'inline-flex';
      App.showToast('Image rendered from Base64!', 'success');
    });

    downloadFromBtn.addEventListener('click', () => {
      const img = document.getElementById('rendered-b64-img');
      if (!img) return;
      const a = document.createElement('a');
      a.href = img.src;
      a.download = 'decoded_image.png';
      a.click();
    });
  },

  // 3. Image Effects, Filters & Cropper
  renderFilters(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header"><span><i class="fa-solid fa-sliders"></i> Filter & Effect Controls</span></div>
          <div class="dropzone" id="filter-dropzone" style="padding:1.5rem 1rem;">
            <div class="dropzone-icon" style="font-size:1.8rem;"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="dropzone-title" style="font-size:0.95rem;">Upload Image for Filters</div>
            <input type="file" id="filter-file-input" accept="image/*">
          </div>

          <div id="filter-controls-box" style="margin-top:1.25rem;">
            <div class="presets-grid">
              <div class="preset-chip active" data-preset="normal">Original</div>
              <div class="preset-chip" data-preset="grayscale">B&W Film</div>
              <div class="preset-chip" data-preset="sepia">Vintage Sepia</div>
              <div class="preset-chip" data-preset="cyberpunk">Cyberpunk</div>
              <div class="preset-chip" data-preset="warmth">Golden Hour</div>
              <div class="preset-chip" data-preset="invert">Negative</div>
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Brightness</span><span class="slider-val-badge" id="val-brightness">100%</span>
              </label>
              <input type="range" id="filter-brightness" class="range-slider" min="0" max="200" value="100">
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Contrast</span><span class="slider-val-badge" id="val-contrast">100%</span>
              </label>
              <input type="range" id="filter-contrast" class="range-slider" min="0" max="200" value="100">
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Saturation</span><span class="slider-val-badge" id="val-saturation">100%</span>
              </label>
              <input type="range" id="filter-saturation" class="range-slider" min="0" max="200" value="100">
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Hue Rotate</span><span class="slider-val-badge" id="val-hue">0°</span>
              </label>
              <input type="range" id="filter-hue" class="range-slider" min="0" max="360" value="0">
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Blur</span><span class="slider-val-badge" id="val-blur">0px</span>
              </label>
              <input type="range" id="filter-blur" class="range-slider" min="0" max="20" value="0">
            </div>

            <button class="btn btn-secondary" id="btn-reset-filters" style="width:100%;">
              <i class="fa-solid fa-rotate-left"></i> Reset All Sliders
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-image"></i> Canvas Filter Preview</span>
            <button class="btn btn-sm btn-emerald" id="btn-download-filtered" style="display:none;">
              <i class="fa-solid fa-download"></i> Save Filtered Image
            </button>
          </div>
          <div class="image-preview-container" id="filter-preview-box">
            <span class="text-muted">Load an image to apply real-time filters</span>
          </div>
        </div>
      </div>
    `;

    this.initFilterLogic();
  },

  initFilterLogic() {
    const fileInput = document.getElementById('filter-file-input');
    const previewBox = document.getElementById('filter-preview-box');
    const downloadBtn = document.getElementById('btn-download-filtered');
    const resetBtn = document.getElementById('btn-reset-filters');

    const bSlider = document.getElementById('filter-brightness');
    const cSlider = document.getElementById('filter-contrast');
    const sSlider = document.getElementById('filter-saturation');
    const hSlider = document.getElementById('filter-hue');
    const blSlider = document.getElementById('filter-blur');

    let loadedImg = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          loadedImg.onload = () => {
            canvas.width = loadedImg.naturalWidth;
            canvas.height = loadedImg.naturalHeight;
            applyFilters();
            previewBox.innerHTML = '';
            previewBox.appendChild(canvas);
            downloadBtn.style.display = 'inline-flex';
          };
          loadedImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    function applyFilters() {
      if (!loadedImg.src) return;
      const b = bSlider.value;
      const c = cSlider.value;
      const s = sSlider.value;
      const h = hSlider.value;
      const bl = blSlider.value;

      document.getElementById('val-brightness').textContent = b + '%';
      document.getElementById('val-contrast').textContent = c + '%';
      document.getElementById('val-saturation').textContent = s + '%';
      document.getElementById('val-hue').textContent = h + '°';
      document.getElementById('val-blur').textContent = bl + 'px';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${bl}px)`;
      ctx.drawImage(loadedImg, 0, 0);
    }

    [bSlider, cSlider, sSlider, hSlider, blSlider].forEach(slider => {
      slider.addEventListener('input', applyFilters);
    });

    // Presets
    document.querySelectorAll('[data-preset]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-preset]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const p = chip.dataset.preset;

        if (p === 'normal') {
          bSlider.value = 100; cSlider.value = 100; sSlider.value = 100; hSlider.value = 0; blSlider.value = 0;
        } else if (p === 'grayscale') {
          bSlider.value = 105; cSlider.value = 120; sSlider.value = 0; hSlider.value = 0; blSlider.value = 0;
        } else if (p === 'sepia') {
          bSlider.value = 95; cSlider.value = 110; sSlider.value = 80; hSlider.value = 40; blSlider.value = 0;
        } else if (p === 'cyberpunk') {
          bSlider.value = 110; cSlider.value = 140; sSlider.value = 180; hSlider.value = 190; blSlider.value = 0;
        } else if (p === 'warmth') {
          bSlider.value = 108; cSlider.value = 110; sSlider.value = 135; hSlider.value = 25; blSlider.value = 0;
        } else if (p === 'invert') {
          bSlider.value = 100; cSlider.value = 100; sSlider.value = 100; hSlider.value = 180; blSlider.value = 0;
        }
        applyFilters();
      });
    });

    resetBtn.addEventListener('click', () => {
      bSlider.value = 100; cSlider.value = 100; sSlider.value = 100; hSlider.value = 0; blSlider.value = 0;
      applyFilters();
      App.showToast('Filters reset', 'info');
    });

    downloadBtn.addEventListener('click', () => {
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'filtered_omni.png';
        a.click();
        App.showToast('Filtered image downloaded!', 'success');
      }, 'image/png');
    });
  },

  // 4. Interactive Image Cropper & Aspect Ratio Studio
  renderCropper(container) {
    container.innerHTML = `
      <div class="split-pane">
        <!-- Controls Pane -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-crop-simple"></i> Crop & Aspect Settings</span>
            <span class="text-muted" id="crop-file-info">No file loaded</span>
          </div>

          <div class="dropzone" id="cropper-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-crop-simple"></i></div>
            <div class="dropzone-title">Drop image here or click to browse</div>
            <div class="dropzone-hint">Supports PNG, JPG, WEBP, BMP, AVIF</div>
            <input type="file" id="cropper-file-input" accept="image/*">
          </div>

          <div id="cropper-controls-panel" style="display:none; margin-top:1.25rem;">
            <div class="form-group">
              <label class="form-label">Aspect Ratio Presets</label>
              <div class="quick-interchange-pills">
                <button type="button" class="interchange-pill active" data-crop-aspect="free">Freeform</button>
                <button type="button" class="interchange-pill" data-crop-aspect="1:1">1:1 Square (Avatar)</button>
                <button type="button" class="interchange-pill" data-crop-aspect="16:9">16:9 YouTube / HD</button>
                <button type="button" class="interchange-pill" data-crop-aspect="9:16">9:16 Reel / Story</button>
                <button type="button" class="interchange-pill" data-crop-aspect="4:3">4:3 Standard</button>
                <button type="button" class="interchange-pill" data-crop-aspect="3:2">3:2 Photo</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Transform & Orientation</label>
              <div style="display:flex; gap:0.5rem;">
                <button type="button" class="btn btn-sm btn-secondary" id="btn-crop-rotate" style="flex:1;">
                  <i class="fa-solid fa-rotate-right"></i> Rotate 90°
                </button>
                <button type="button" class="btn btn-sm btn-secondary" id="btn-crop-fliph" style="flex:1;">
                  <i class="fa-solid fa-arrows-left-right"></i> Flip H
                </button>
                <button type="button" class="btn btn-sm btn-secondary" id="btn-crop-flipv" style="flex:1;">
                  <i class="fa-solid fa-arrows-up-down"></i> Flip V
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Exact Crop Dimensions (px)</label>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                <div>
                  <small class="text-muted">Width:</small>
                  <input type="number" id="crop-w-input" class="form-control" min="10">
                </div>
                <div>
                  <small class="text-muted">Height:</small>
                  <input type="number" id="crop-h-input" class="form-control" min="10">
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Export Format</label>
              <select id="crop-export-format" class="form-control">
                <option value="image/png">PNG (Preserves Transparency)</option>
                <option value="image/jpeg" selected>JPEG (High Quality 95%)</option>
                <option value="image/webp">WEBP (Compact)</option>
              </select>
            </div>

            <button class="btn btn-primary" id="btn-execute-crop" style="width:100%; margin-top:0.75rem;">
              <i class="fa-solid fa-scissors"></i> Crop & Preview
            </button>
          </div>
        </div>

        <!-- Visual Crop Canvas Pane -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-eye"></i> Interactive Crop Stage</span>
            <div id="crop-export-bar" style="display:none; gap:0.5rem;">
              <button class="btn btn-sm btn-emerald" id="btn-download-cropped">
                <i class="fa-solid fa-download"></i> Download Cropped
              </button>
            </div>
          </div>

          <div class="cropper-stage" id="crop-stage-container">
            <span class="text-muted" style="font-size:0.88rem;">Load an image to crop</span>
          </div>

          <div class="image-meta-strip" id="crop-meta-strip" style="display:none;">
            <div class="meta-chip">
              <span>Source:</span>
              <strong id="crop-src-dims">0 x 0</strong>
            </div>
            <div class="meta-chip">
              <span>Cropped Area:</span>
              <strong id="crop-out-dims" style="color:var(--accent-cyan);">0 x 0</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initCropperLogic();
  },

  initCropperLogic() {
    const fileInput = document.getElementById('cropper-file-input');
    const dropzone = document.getElementById('cropper-dropzone');
    const controlsPanel = document.getElementById('cropper-controls-panel');
    const stage = document.getElementById('crop-stage-container');
    const executeBtn = document.getElementById('btn-execute-crop');
    const downloadBtn = document.getElementById('btn-download-cropped');
    const exportBar = document.getElementById('crop-export-bar');
    const metaStrip = document.getElementById('crop-meta-strip');
    const srcDimsSpan = document.getElementById('crop-src-dims');
    const outDimsSpan = document.getElementById('crop-out-dims');
    const wInput = document.getElementById('crop-w-input');
    const hInput = document.getElementById('crop-h-input');
    const formatSelect = document.getElementById('crop-export-format');

    let rawImg = new Image();
    let currentFileName = 'cropped_image';
    let rotation = 0;
    let flipH = 1;
    let flipV = 1;
    let activeAspect = 'free'; // 'free', '1:1', '16:9', '9:16', '4:3', '3:2'

    // Crop box state in image coords
    let cropBox = { x: 0, y: 0, w: 100, h: 100 };
    let previewCanvas = document.createElement('canvas');
    let previewCtx = previewCanvas.getContext('2d');
    let croppedBlob = null;

    // Drag / Drop
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) loadFile(e.target.files[0]);
    });
    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
    });

    function loadFile(file) {
      if (!file.type.startsWith('image/')) return App.showToast('Please upload an image file', 'error');
      currentFileName = file.name.substring(0, file.name.lastIndexOf('.')) || 'cropped';
      document.getElementById('crop-file-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;

      const reader = new FileReader();
      reader.onload = (e) => {
        rawImg.onload = () => {
          rotation = 0; flipH = 1; flipV = 1;
          controlsPanel.style.display = 'block';
          initCropStage();
        };
        rawImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    function initCropStage() {
      const iw = rawImg.naturalWidth;
      const ih = rawImg.naturalHeight;
      srcDimsSpan.textContent = `${iw} × ${ih} px`;
      metaStrip.style.display = 'flex';

      // Default crop: center 80%
      cropBox.w = Math.round(iw * 0.8);
      cropBox.h = Math.round(ih * 0.8);
      cropBox.x = Math.round((iw - cropBox.w) / 2);
      cropBox.y = Math.round((ih - cropBox.h) / 2);

      updateInputs();
      renderStageView();
    }

    function updateInputs() {
      wInput.value = Math.round(cropBox.w);
      hInput.value = Math.round(cropBox.h);
      outDimsSpan.textContent = `${Math.round(cropBox.w)} × ${Math.round(cropBox.h)} px`;
    }

    // Aspect ratio chips
    document.querySelectorAll('[data-crop-aspect]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-crop-aspect]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeAspect = btn.dataset.cropAspect;

        if (activeAspect !== 'free') {
          const parts = activeAspect.split(':');
          const ratio = parseFloat(parts[0]) / parseFloat(parts[1]);
          const iw = rawImg.naturalWidth;
          const ih = rawImg.naturalHeight;

          if (iw / ih > ratio) {
            cropBox.h = Math.round(ih * 0.8);
            cropBox.w = Math.round(cropBox.h * ratio);
          } else {
            cropBox.w = Math.round(iw * 0.8);
            cropBox.h = Math.round(cropBox.w / ratio);
          }
          cropBox.x = Math.max(0, Math.round((iw - cropBox.w) / 2));
          cropBox.y = Math.max(0, Math.round((ih - cropBox.h) / 2));
        }
        updateInputs();
        renderStageView();
      });
    });

    // Transforms
    document.getElementById('btn-crop-rotate').addEventListener('click', () => {
      rotation = (rotation + 90) % 360;
      renderStageView();
      App.showToast(`Rotated to ${rotation}°`, 'info');
    });
    document.getElementById('btn-crop-fliph').addEventListener('click', () => {
      flipH *= -1;
      renderStageView();
    });
    document.getElementById('btn-crop-flipv').addEventListener('click', () => {
      flipV *= -1;
      renderStageView();
    });

    // Inputs change
    wInput.addEventListener('input', () => {
      cropBox.w = Math.min(rawImg.naturalWidth - cropBox.x, Math.max(10, parseInt(wInput.value) || 10));
      if (activeAspect !== 'free') {
        const parts = activeAspect.split(':');
        const ratio = parseFloat(parts[0]) / parseFloat(parts[1]);
        cropBox.h = Math.round(cropBox.w / ratio);
        hInput.value = cropBox.h;
      }
      renderStageView();
    });
    hInput.addEventListener('input', () => {
      cropBox.h = Math.min(rawImg.naturalHeight - cropBox.y, Math.max(10, parseInt(hInput.value) || 10));
      if (activeAspect !== 'free') {
        const parts = activeAspect.split(':');
        const ratio = parseFloat(parts[0]) / parseFloat(parts[1]);
        cropBox.w = Math.round(cropBox.h * ratio);
        wInput.value = cropBox.w;
      }
      renderStageView();
    });

    function renderStageView() {
      if (!rawImg.src) return;
      stage.innerHTML = '';

      const wrap = document.createElement('div');
      wrap.className = 'cropper-canvas-wrap';

      const canvas = document.createElement('canvas');
      const maxW = 540;
      const maxH = 420;
      let displayW = rawImg.naturalWidth;
      let displayH = rawImg.naturalHeight;

      if (displayW > maxW || displayH > maxH) {
        const r = Math.min(maxW / displayW, maxH / displayH);
        displayW = Math.round(displayW * r);
        displayH = Math.round(displayH * r);
      }

      canvas.width = displayW;
      canvas.height = displayH;
      const ctx = canvas.getContext('2d');

      // Draw transformed image
      ctx.save();
      ctx.translate(displayW / 2, displayH / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH, flipV);
      ctx.drawImage(rawImg, -displayW / 2, -displayH / 2, displayW, displayH);
      ctx.restore();

      wrap.appendChild(canvas);

      // Scale ratio between display canvas and natural image
      const scaleX = displayW / rawImg.naturalWidth;
      const scaleY = displayH / rawImg.naturalHeight;

      // Crop overlay box
      const box = document.createElement('div');
      box.className = 'crop-overlay-box';
      box.style.left = `${cropBox.x * scaleX}px`;
      box.style.top = `${cropBox.y * scaleY}px`;
      box.style.width = `${cropBox.w * scaleX}px`;
      box.style.height = `${cropBox.h * scaleY}px`;

      // Handles
      ['tl', 'tr', 'bl', 'br'].forEach(pos => {
        const h = document.createElement('div');
        h.className = `crop-handle ${pos}`;
        box.appendChild(h);
      });

      // Draggable crop box logic
      let isDragging = false;
      let startMouseX = 0, startMouseY = 0;
      let startBoxX = 0, startBoxY = 0;

      box.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('crop-handle')) return;
        isDragging = true;
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        startBoxX = cropBox.x;
        startBoxY = cropBox.y;
        e.preventDefault();
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = (e.clientX - startMouseX) / scaleX;
        const dy = (e.clientY - startMouseY) / scaleY;

        cropBox.x = Math.max(0, Math.min(rawImg.naturalWidth - cropBox.w, startBoxX + dx));
        cropBox.y = Math.max(0, Math.min(rawImg.naturalHeight - cropBox.h, startBoxY + dy));

        box.style.left = `${cropBox.x * scaleX}px`;
        box.style.top = `${cropBox.y * scaleY}px`;
        updateInputs();
      });

      window.addEventListener('mouseup', () => { isDragging = false; });

      wrap.appendChild(box);
      stage.appendChild(wrap);
    }

    // Execute Crop
    executeBtn.addEventListener('click', () => {
      if (!rawImg.src) return;

      const outCanvas = document.createElement('canvas');
      outCanvas.width = Math.round(cropBox.w);
      outCanvas.height = Math.round(cropBox.h);
      const outCtx = outCanvas.getContext('2d');

      outCtx.save();
      // Translate for rotation/flip
      outCtx.translate(outCanvas.width / 2, outCanvas.height / 2);
      outCtx.rotate((rotation * Math.PI) / 180);
      outCtx.scale(flipH, flipV);
      outCtx.translate(-outCanvas.width / 2, -outCanvas.height / 2);

      // Crop draw
      outCtx.drawImage(
        rawImg,
        cropBox.x, cropBox.y, cropBox.w, cropBox.h,
        0, 0, outCanvas.width, outCanvas.height
      );
      outCtx.restore();

      const format = formatSelect.value;
      outCanvas.toBlob((blob) => {
        if (!blob) return App.showToast('Crop failed', 'error');
        croppedBlob = blob;
        exportBar.style.display = 'flex';

        // Show preview in stage
        stage.innerHTML = '';
        const resImg = document.createElement('img');
        resImg.src = URL.createObjectURL(blob);
        resImg.style.maxWidth = '100%';
        resImg.style.maxHeight = '420px';
        resImg.style.borderRadius = '6px';
        stage.appendChild(resImg);

        App.showToast(`Cropped to ${outCanvas.width} × ${outCanvas.height} px (${App.formatBytes(blob.size)})`, 'success');
      }, format, 0.95);
    });

    downloadBtn.addEventListener('click', () => {
      if (!croppedBlob) return;
      const ext = formatSelect.value.split('/')[1].replace('jpeg', 'jpg');
      const fileName = `${currentFileName}_crop.${ext}`;

      const link = document.createElement('a');
      link.href = URL.createObjectURL(croppedBlob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      App.showToast(`Downloaded ${fileName}`, 'success');
    });
  },

  // 5. Image Enhancer & Super-Resolution
  renderEnhancer(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-wand-magic-sparkles"></i> Enhancement Studio</span>
            <span class="text-muted" id="enh-file-info">No file loaded</span>
          </div>

          <div class="dropzone" id="enh-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="dropzone-title">Upload Image to Enhance & Clarify</div>
            <div class="dropzone-hint">De-blur, sharpen, auto-contrast & upscale</div>
            <input type="file" id="enh-file-input" accept="image/*">
          </div>

          <div id="enh-controls-panel" style="display:none; margin-top:1.25rem;">
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
              <button class="btn btn-primary" id="btn-auto-ai-enhance" style="flex:1;">
                <i class="fa-solid fa-wand-magic-sparkles"></i> One-Click Auto Enhance
              </button>
              <button class="btn btn-secondary" id="btn-reset-enh">
                <i class="fa-solid fa-rotate-left"></i> Reset
              </button>
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Sharpen & Clarity</span><span class="slider-val-badge" id="val-enh-sharp">30%</span>
              </label>
              <input type="range" id="enh-sharp" class="range-slider" min="0" max="100" value="30">
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Contrast Boost</span><span class="slider-val-badge" id="val-enh-contrast">20%</span>
              </label>
              <input type="range" id="enh-contrast" class="range-slider" min="0" max="80" value="20">
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span>Color Vibrance</span><span class="slider-val-badge" id="val-enh-vibrance">15%</span>
              </label>
              <input type="range" id="enh-vibrance" class="range-slider" min="0" max="80" value="15">
            </div>

            <div class="form-group">
              <label class="form-label">Super-Resolution Upscaling</label>
              <div class="quick-interchange-pills">
                <button type="button" class="interchange-pill active" data-upscale="1">1x Standard</button>
                <button type="button" class="interchange-pill" data-upscale="2">2x HD Upscale</button>
                <button type="button" class="interchange-pill" data-upscale="3">3x Ultra-Res</button>
              </div>
            </div>

            <button class="btn btn-emerald" id="btn-apply-enh" style="width:100%; margin-top:0.5rem;">
              <i class="fa-solid fa-bolt"></i> Apply Enhancement
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-eye"></i> Enhanced Live Preview</span>
            <div id="enh-export-actions" style="display:none; gap:0.5rem;">
              <button class="btn btn-sm btn-emerald" id="btn-download-enh">
                <i class="fa-solid fa-download"></i> Download Enhanced
              </button>
            </div>
          </div>

          <div class="image-preview-container" id="enh-preview-box">
            <span class="text-muted">Select an image to enhance</span>
          </div>

          <div class="image-meta-strip" id="enh-meta-strip" style="display:none;">
            <div class="meta-chip"><span>Original:</span><strong id="enh-orig-stat">0 x 0</strong></div>
            <div class="meta-chip"><span>Enhanced:</span><strong id="enh-out-stat" style="color:var(--accent-emerald);">0 x 0</strong></div>
          </div>
        </div>
      </div>
    `;

    this.initEnhancerLogic();
  },

  initEnhancerLogic() {
    const fileInput = document.getElementById('enh-file-input');
    const dropzone = document.getElementById('enh-dropzone');
    const controls = document.getElementById('enh-controls-panel');
    const previewBox = document.getElementById('enh-preview-box');
    const exportActions = document.getElementById('enh-export-actions');
    const downloadBtn = document.getElementById('btn-download-enh');
    const autoBtn = document.getElementById('btn-auto-ai-enhance');
    const resetBtn = document.getElementById('btn-reset-enh');
    const applyBtn = document.getElementById('btn-apply-enh');

    const sharpSlider = document.getElementById('enh-sharp');
    const contrastSlider = document.getElementById('enh-contrast');
    const vibranceSlider = document.getElementById('enh-vibrance');
    const metaStrip = document.getElementById('enh-meta-strip');
    const origStat = document.getElementById('enh-orig-stat');
    const outStat = document.getElementById('enh-out-stat');

    let loadedImg = new Image();
    let currentFileName = 'enhanced';
    let currentScale = 1;
    let enhancedBlob = null;

    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) loadFile(e.target.files[0]);
    });
    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
    });

    function loadFile(file) {
      if (!file.type.startsWith('image/')) return App.showToast('Please upload an image file', 'error');
      currentFileName = file.name.substring(0, file.name.lastIndexOf('.')) || 'enhanced';
      document.getElementById('enh-file-info').textContent = `${file.name} (${App.formatBytes(file.size)})`;

      const reader = new FileReader();
      reader.onload = (e) => {
        loadedImg.onload = () => {
          controls.style.display = 'block';
          origStat.textContent = `${loadedImg.naturalWidth} × ${loadedImg.naturalHeight} (${App.formatBytes(file.size)})`;
          metaStrip.style.display = 'flex';
          applyEnhancement();
        };
        loadedImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    [sharpSlider, contrastSlider, vibranceSlider].forEach(s => {
      s.addEventListener('input', () => {
        document.getElementById('val-enh-sharp').textContent = `${sharpSlider.value}%`;
        document.getElementById('val-enh-contrast').textContent = `${contrastSlider.value}%`;
        document.getElementById('val-enh-vibrance').textContent = `${vibranceSlider.value}%`;
      });
    });

    document.querySelectorAll('[data-upscale]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-upscale]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScale = parseInt(btn.dataset.upscale);
        applyEnhancement();
      });
    });

    autoBtn.addEventListener('click', () => {
      sharpSlider.value = 50;
      contrastSlider.value = 35;
      vibranceSlider.value = 25;
      document.getElementById('val-enh-sharp').textContent = '50%';
      document.getElementById('val-enh-contrast').textContent = '35%';
      document.getElementById('val-enh-vibrance').textContent = '25%';
      applyEnhancement();
      App.showToast('Applied Auto-AI Enhancement profile!', 'success');
    });

    resetBtn.addEventListener('click', () => {
      sharpSlider.value = 0;
      contrastSlider.value = 0;
      vibranceSlider.value = 0;
      currentScale = 1;
      document.getElementById('val-enh-sharp').textContent = '0%';
      document.getElementById('val-enh-contrast').textContent = '0%';
      document.getElementById('val-enh-vibrance').textContent = '0%';
      document.querySelectorAll('[data-upscale]').forEach((b, i) => b.classList.toggle('active', i === 0));
      applyEnhancement();
    });

    applyBtn.addEventListener('click', applyEnhancement);

    function applyEnhancement() {
      if (!loadedImg.src) return;

      const targetW = loadedImg.naturalWidth * currentScale;
      const targetH = loadedImg.naturalHeight * currentScale;

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(loadedImg, 0, 0, targetW, targetH);

      const sharpVal = parseInt(sharpSlider.value);
      const contrastVal = parseInt(contrastSlider.value);
      const vibranceVal = parseInt(vibranceSlider.value);

      try {
        const imgData = ctx.getImageData(0, 0, targetW, targetH);
        const d = imgData.data;

        // Contrast & Saturation stretch
        const cFactor = (259 * (contrastVal * 2 + 255)) / (255 * (259 - contrastVal * 2));
        const vFactor = 1 + vibranceVal / 100;

        for (let i = 0; i < d.length; i += 4) {
          // Contrast
          let r = cFactor * (d[i] - 128) + 128;
          let g = cFactor * (d[i+1] - 128) + 128;
          let b = cFactor * (d[i+2] - 128) + 128;

          // Vibrance
          const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
          r = gray + (r - gray) * vFactor;
          g = gray + (g - gray) * vFactor;
          b = gray + (b - gray) * vFactor;

          d[i] = Math.max(0, Math.min(255, r));
          d[i+1] = Math.max(0, Math.min(255, g));
          d[i+2] = Math.max(0, Math.min(255, b));
        }

        ctx.putImageData(imgData, 0, 0);

        // Simple unsharp mask via composite if sharpVal > 0
        if (sharpVal > 0) {
          ctx.filter = `contrast(${100 + sharpVal * 0.3}%)`;
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = 'none';
        }
      } catch (e) {
        console.warn('Enhancement filter exception:', e);
      }

      canvas.toBlob((blob) => {
        if (!blob) return;
        enhancedBlob = blob;
        previewBox.innerHTML = '';
        const previewImg = document.createElement('img');
        previewImg.src = URL.createObjectURL(blob);
        previewImg.style.maxHeight = '420px';
        previewImg.style.objectFit = 'contain';
        previewBox.appendChild(previewImg);

        outStat.textContent = `${targetW} × ${targetH} (${App.formatBytes(blob.size)})`;
        exportActions.style.display = 'flex';
      }, 'image/png');
    }

    downloadBtn.addEventListener('click', () => {
      if (!enhancedBlob) return;
      const fileName = `${currentFileName}_enhanced_${currentScale}x.png`;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(enhancedBlob);
      a.download = fileName;
      a.click();
      App.showToast(`Downloaded ${fileName}`, 'success');
    });
  }
};
