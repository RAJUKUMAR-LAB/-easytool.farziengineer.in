/* ==========================================================================
   OmniToolbox - Business & Social Media Suite
   Invoice Generator, Social Image Resizer, Hashtags & SEO Meta Tags
   100% Client-Side Privacy
   ========================================================================== */

const BusinessSocialTools = {

  // ==========================================
  // 1. Invoice & Receipt Generator
  // ==========================================
  renderInvoiceGenerator(container) {
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-file-invoice-dollar text-emerald"></i> Invoice Details</h4>
            <span class="badge badge-emerald">PDF Print Ready</span>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-bottom:0.75rem;">
            <div class="tool-field-group">
              <label class="tool-field-label">Invoice #</label>
              <input type="text" id="inv-num" class="tool-input" value="INV-2026-001">
            </div>
            <div class="tool-field-group">
              <label class="tool-field-label">Invoice Date</label>
              <input type="date" id="inv-date" class="tool-input" value="${today}">
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">From (Your Business / Freelancer)</label>
            <textarea id="inv-from" class="tool-textarea" style="height:60px;" placeholder="Your Name or Studio&#10;contact@studio.com&#10;New York, NY">Omni Studio Design&#10;billing@omnistudio.design&#10;San Francisco, CA</textarea>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Bill To (Client / Customer)</label>
            <textarea id="inv-to" class="tool-textarea" style="height:60px;" placeholder="Client Name / Company&#10;client@acme.corp">Acme Global Technologies&#10;accounts@acme.corp&#10;Austin, TX</textarea>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <label class="tool-field-label">Line Items</label>
              <button class="btn btn-sm btn-primary" id="inv-add-item"><i class="fa-solid fa-plus"></i> Add Item</button>
            </div>
            <div id="inv-items-list" style="display:flex; flex-direction:column; gap:0.5rem; max-height:220px; overflow-y:auto;"></div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
            <div class="tool-field-group">
              <label class="tool-field-label">Tax Rate (%)</label>
              <input type="number" id="inv-tax-rate" class="tool-input" value="10" min="0" max="100">
            </div>
            <div class="tool-field-group">
              <label class="tool-field-label">Currency Symbol</label>
              <input type="text" id="inv-currency" class="tool-input" value="$">
            </div>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-file-pdf text-rose"></i> Invoice Document Preview</h4>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-primary" id="inv-btn-print"><i class="fa-solid fa-print"></i> Print / PDF</button>
            </div>
          </div>

          <div id="inv-preview-sheet" style="background:#fff; color:#0f172a; padding:2rem; border-radius:var(--radius-lg); box-shadow:var(--shadow-xl); font-family:sans-serif; min-height:480px;">
            <div style="display:flex; justify-content:space-between; border-bottom:2px solid #e2e8f0; padding-bottom:1.25rem; margin-bottom:1.5rem;">
              <div>
                <h2 style="font-size:1.75rem; font-weight:800; color:#0f172a; margin:0;" id="prev-inv-brand">Omni Studio Design</h2>
                <div style="font-size:0.85rem; color:#64748b; white-space:pre-line; margin-top:0.25rem;" id="prev-inv-from"></div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.5rem; font-weight:700; color:#3b82f6;">INVOICE</div>
                <div style="font-size:0.9rem; font-weight:600; color:#334155; margin-top:0.25rem;" id="prev-inv-num">INV-2026-001</div>
                <div style="font-size:0.8rem; color:#64748b;" id="prev-inv-date"></div>
              </div>
            </div>

            <div style="margin-bottom:1.5rem;">
              <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#94a3b8; letter-spacing:0.5px;">Billed To:</div>
              <div style="font-size:0.95rem; font-weight:600; color:#1e293b; white-space:pre-line; margin-top:0.25rem;" id="prev-inv-to"></div>
            </div>

            <table style="width:100%; border-collapse:collapse; margin-bottom:1.5rem;">
              <thead>
                <tr style="background:#f8fafc; border-bottom:1px solid #cbd5e1; font-size:0.8rem; text-transform:uppercase; color:#64748b;">
                  <th style="padding:0.6rem; text-align:left;">Description</th>
                  <th style="padding:0.6rem; text-align:center;">Qty</th>
                  <th style="padding:0.6rem; text-align:right;">Rate</th>
                  <th style="padding:0.6rem; text-align:right;">Amount</th>
                </tr>
              </thead>
              <tbody id="prev-inv-table-body" style="font-size:0.9rem; color:#334155;"></tbody>
            </table>

            <div style="display:flex; justify-content:flex-end;">
              <div style="width:240px; font-size:0.9rem;">
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0; color:#64748b;">
                  <span>Subtotal:</span>
                  <span id="prev-inv-subtotal" style="font-weight:600; color:#1e293b;">$0.00</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0; color:#64748b;">
                  <span id="prev-inv-tax-label">Tax (10%):</span>
                  <span id="prev-inv-tax" style="font-weight:600; color:#1e293b;">$0.00</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:0.6rem 0; border-top:2px solid #0f172a; font-size:1.15rem; font-weight:800; color:#0f172a; margin-top:0.4rem;">
                  <span>Total Due:</span>
                  <span id="prev-inv-total">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let items = [
      { desc: 'Full-Stack Web Application Architecture', qty: 1, rate: 2500 },
      { desc: 'Custom Responsive UI/UX Design System', qty: 1, rate: 1200 },
      { desc: 'Client-Side High Performance Optimization', qty: 1, rate: 800 }
    ];

    const numIn = container.querySelector('#inv-num');
    const dateIn = container.querySelector('#inv-date');
    const fromIn = container.querySelector('#inv-from');
    const toIn = container.querySelector('#inv-to');
    const taxIn = container.querySelector('#inv-tax-rate');
    const currIn = container.querySelector('#inv-currency');
    const itemsList = container.querySelector('#inv-items-list');

    const prevNum = container.querySelector('#prev-inv-num');
    const prevDate = container.querySelector('#prev-inv-date');
    const prevFrom = container.querySelector('#prev-inv-from');
    const prevTo = container.querySelector('#prev-inv-to');
    const prevBody = container.querySelector('#prev-inv-table-body');
    const prevSub = container.querySelector('#prev-inv-subtotal');
    const prevTaxLabel = container.querySelector('#prev-inv-tax-label');
    const prevTax = container.querySelector('#prev-inv-tax');
    const prevTot = container.querySelector('#prev-inv-total');

    function renderItems() {
      itemsList.innerHTML = '';
      items.forEach((it, idx) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:grid; grid-template-columns: 2fr 1fr 1fr auto; gap:0.4rem; align-items:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.4rem;';
        row.innerHTML = `
          <input type="text" class="tool-input" value="${it.desc}" placeholder="Description" data-idx="${idx}" data-field="desc" style="font-size:0.85rem; padding:0.35rem 0.5rem;">
          <input type="number" class="tool-input" value="${it.qty}" placeholder="Qty" min="1" data-idx="${idx}" data-field="qty" style="font-size:0.85rem; padding:0.35rem 0.5rem;">
          <input type="number" class="tool-input" value="${it.rate}" placeholder="Rate" min="0" data-idx="${idx}" data-field="rate" style="font-size:0.85rem; padding:0.35rem 0.5rem;">
          <button class="btn btn-sm btn-secondary text-rose" data-idx="${idx}" data-remove style="padding:0.35rem 0.5rem;"><i class="fa-solid fa-trash"></i></button>
        `;
        itemsList.appendChild(row);
      });
      updatePreview();
    }

    function updatePreview() {
      const cur = currIn.value.trim() || '$';
      const taxRate = parseFloat(taxIn.value) || 0;

      prevNum.textContent = numIn.value || 'INV-001';
      prevDate.textContent = `Date: ${dateIn.value}`;
      prevFrom.textContent = fromIn.value;
      prevTo.textContent = toIn.value;

      prevBody.innerHTML = '';
      let subtotal = 0;

      items.forEach(it => {
        const amount = (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
        subtotal += amount;

        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #f1f5f9';
        tr.innerHTML = `
          <td style="padding:0.6rem 0.4rem;">${it.desc}</td>
          <td style="padding:0.6rem 0.4rem; text-align:center;">${it.qty}</td>
          <td style="padding:0.6rem 0.4rem; text-align:right;">${cur}${Number(it.rate).toLocaleString()}</td>
          <td style="padding:0.6rem 0.4rem; text-align:right; font-weight:600;">${cur}${amount.toLocaleString()}</td>
        `;
        prevBody.appendChild(tr);
      });

      const taxAmount = (subtotal * taxRate) / 100;
      const total = subtotal + taxAmount;

      prevSub.textContent = `${cur}${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      prevTaxLabel.textContent = `Tax (${taxRate}%):`;
      prevTax.textContent = `${cur}${taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      prevTot.textContent = `${cur}${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    itemsList.addEventListener('input', (e) => {
      const idx = e.target.dataset.idx;
      const field = e.target.dataset.field;
      if (idx !== undefined && field) {
        items[idx][field] = e.target.value;
        updatePreview();
      }
    });

    itemsList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove]');
      if (btn) {
        const idx = parseInt(btn.dataset.idx, 10);
        items.splice(idx, 1);
        renderItems();
      }
    });

    container.querySelector('#inv-add-item').addEventListener('click', () => {
      items.push({ desc: 'New Service Item', qty: 1, rate: 100 });
      renderItems();
    });

    [numIn, dateIn, fromIn, toIn, taxIn, currIn].forEach(el => el.addEventListener('input', updatePreview));

    container.querySelector('#inv-btn-print').addEventListener('click', () => {
      const invSheet = container.querySelector('#inv-preview-sheet');
      if (!invSheet) return;
      const printContents = invSheet.outerHTML;
      const invoiceTitle = (numIn.value || 'Invoice').trim();
      const printWindow = window.open('', '_blank', 'width=900,height=750');
      if (!printWindow) {
        if (typeof App !== 'undefined' && App.showToast) {
          App.showToast('Please allow browser popups to print Invoice', 'warning');
        } else {
          alert('Please allow browser popups to print Invoice');
        }
        return;
      }
      printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${invoiceTitle} - Print</title>
  <style>
    @page { size: auto; margin: 12mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 24px;
      margin: 0;
      background: #f8fafc;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .no-print-toolbar {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-bottom: 20px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    .toolbar-btn {
      padding: 8px 18px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
    }
    .toolbar-btn.primary {
      background: #10b981;
      color: #ffffff;
      border-color: #059669;
    }
    #inv-preview-sheet {
      max-width: 800px;
      margin: 0 auto;
    }
    @media print {
      body {
        padding: 0 !important;
        background: #ffffff !important;
      }
      .no-print-toolbar {
        display: none !important;
      }
      #inv-preview-sheet {
        box-shadow: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-toolbar">
    <button class="toolbar-btn primary" onclick="window.print()">Print Invoice</button>
    <button class="toolbar-btn" onclick="window.close()">Close</button>
  </div>
  ${printContents}
  <script>
    window.addEventListener('afterprint', function() {
      setTimeout(function() { window.close(); }, 300);
    });
    window.onload = function() {
      window.focus();
      setTimeout(function() { window.print(); }, 250);
    };
  </script>
</body>
</html>`);
      printWindow.document.close();
    });

    renderItems();
  },

  // ==========================================
  // 2. Social Media Post & Banner Resizer
  // ==========================================
  renderSocialResizer(container) {
    const presets = [
      { name: 'Instagram Post (1:1)', w: 1080, h: 1080, icon: 'fa-instagram' },
      { name: 'Instagram Story / Reel (9:16)', w: 1080, h: 1920, icon: 'fa-instagram' },
      { name: 'YouTube Thumbnail (16:9)', w: 1280, h: 720, icon: 'fa-youtube' },
      { name: 'YouTube Banner', w: 2560, h: 1440, icon: 'fa-youtube' },
      { name: 'Twitter / X Post', w: 1200, h: 675, icon: 'fa-x-twitter' },
      { name: 'Twitter / X Header', w: 1500, h: 500, icon: 'fa-x-twitter' },
      { name: 'LinkedIn Post', w: 1200, h: 627, icon: 'fa-linkedin' },
      { name: 'LinkedIn Banner', w: 1584, h: 396, icon: 'fa-linkedin' }
    ];

    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-share-nodes text-cyan"></i> Social Presets</h4>
            <span class="badge badge-cyan">Resolution Optimizer</span>
          </div>

          <div class="drop-zone" id="soc-drop-zone">
            <i class="fa-solid fa-image drop-icon" style="color:var(--accent-cyan);"></i>
            <h4 class="drop-title">Upload Image to Resize</h4>
            <p class="drop-subtitle">PNG, JPG, or WEBP</p>
            <input type="file" id="soc-file-input" accept="image/*" style="display:none;">
            <button class="btn btn-primary" onclick="document.getElementById('soc-file-input').click();">
              <i class="fa-solid fa-folder-open"></i> Select Image
            </button>
          </div>

          <div class="tool-field-group" style="margin-top:1.25rem;">
            <label class="tool-field-label">Target Platform Resolution</label>
            <div id="soc-presets-list" style="display:grid; grid-template-columns: 1fr; gap:0.5rem; max-height:260px; overflow-y:auto;">
              ${presets.map((p, i) => `
                <button class="step-btn ${i === 0 ? 'active' : ''}" data-idx="${i}" style="text-align:left; justify-content:space-between; padding:0.6rem 0.8rem;">
                  <span><i class="fa-brands ${p.icon}"></i> ${p.name}</span>
                  <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${p.w} × ${p.h}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-eye text-emerald"></i> Rendered Output Canvas</h4>
            <button class="btn btn-sm btn-primary" id="soc-btn-download" disabled><i class="fa-solid fa-download"></i> Download Image</button>
          </div>

          <div style="display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1rem; min-height:360px; overflow:hidden;">
            <canvas id="soc-canvas" style="max-width:100%; max-height:420px; object-fit:contain; box-shadow:0 8px 30px rgba(0,0,0,0.5);"></canvas>
          </div>
        </div>
      </div>
    `;

    let activePreset = presets[0];
    let loadedImage = null;

    const fileInput = container.querySelector('#soc-file-input');
    const dropZone = container.querySelector('#soc-drop-zone');
    const canvas = container.querySelector('#soc-canvas');
    const downloadBtn = container.querySelector('#soc-btn-download');
    const presetBtns = container.querySelectorAll('#soc-presets-list .step-btn');

    function draw() {
      if (!loadedImage) return;
      canvas.width = activePreset.w;
      canvas.height = activePreset.h;
      const ctx = canvas.getContext('2d');

      // Fill background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fit image with aspect ratio
      const imgRatio = loadedImage.width / loadedImage.height;
      const targetRatio = canvas.width / canvas.height;

      let drawW, drawH, drawX, drawY;

      if (imgRatio > targetRatio) {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * imgRatio;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(loadedImage, drawX, drawY, drawW, drawH);
      downloadBtn.disabled = false;
    }

    function loadImage(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          loadedImage = img;
          draw();
          App.showToast(`Loaded ${file.name} successfully!`, 'success');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) loadImage(e.target.files[0]);
    });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      if (e.dataTransfer.files.length) loadImage(e.dataTransfer.files[0]);
    });

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePreset = presets[parseInt(btn.dataset.idx, 10)];
        draw();
      });
    });

    downloadBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.download = `social_${activePreset.w}x${activePreset.h}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    });
  }
};
