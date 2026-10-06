/* ==========================================================================
   OmniToolbox - Calculator Tools Suite
   Financial, Everyday, Health, Math, Academic & Science Calculators
   100% Client-Side Real-Time Computation
   ========================================================================== */

const CalculatorTools = {

  // ==========================================
  // 1. GST Calculator (Goods & Services Tax)
  // ==========================================
  renderGstCalculator(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-receipt text-rose"></i> GST Configuration</h4>
            <span class="badge badge-rose">Tax Engine</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">
              <span>Amount</span>
              <span class="badge badge-cyan" id="gst-amount-badge">Base Price</span>
            </label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="gst-amt-presets">
              <button type="button" class="step-btn" data-gst-amt="1000"><span class="curr-sym">₹</span> 1K</button>
              <button type="button" class="step-btn" data-gst-amt="5000"><span class="curr-sym">₹</span> 5K</button>
              <button type="button" class="step-btn active" data-gst-amt="10000"><span class="curr-sym">₹</span> 10K</button>
              <button type="button" class="step-btn" data-gst-amt="50000"><span class="curr-sym">₹</span> 50K</button>
              <button type="button" class="step-btn" data-gst-amt="custom">Custom</button>
            </div>
            <div class="currency-input-wrapper">
              <div class="currency-symbol-tag"><span class="curr-sym">₹</span></div>
              <input type="number" id="gst-amount" class="currency-custom-input" placeholder="Type custom amount..." value="10000" min="0" step="any">
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">
              <span>GST Slab Rate</span>
              <span class="text-cyan font-bold" id="gst-active-rate-badge">18% Standard</span>
            </label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;">
              <button type="button" class="step-btn" data-gst-rate="5">5%</button>
              <button type="button" class="step-btn" data-gst-rate="12">12%</button>
              <button type="button" class="step-btn active" data-gst-rate="18">18%</button>
              <button type="button" class="step-btn" data-gst-rate="28">28%</button>
              <button type="button" class="step-btn" data-gst-rate="custom">Custom</button>
            </div>
            <div id="gst-custom-rate-wrap" style="display:none; margin-top:0.4rem;">
              <input type="number" id="gst-custom-rate" class="tool-input" placeholder="Enter custom rate % (e.g. 7.5)" value="18" min="0" max="100" step="0.1">
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Calculation Type</label>
            <div class="quick-interchange-grid" style="grid-template-columns: 1fr 1fr;">
              <button type="button" class="step-btn active" id="gst-type-exclusive">
                <i class="fa-solid fa-plus-circle text-cyan"></i> Add GST (Exclusive)
              </button>
              <button type="button" class="step-btn" id="gst-type-inclusive">
                <i class="fa-solid fa-minus-circle text-rose"></i> Remove GST (Inclusive)
              </button>
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Tax Split Type</label>
            <select id="gst-split-type" class="tool-select">
              <option value="intra" selected>Intra-State (CGST 50% + SGST 50%)</option>
              <option value="inter">Inter-State (IGST 100%)</option>
            </select>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-chart-pie text-emerald"></i> Tax Breakdown</h4>
            <button type="button" class="btn btn-sm btn-secondary" id="btn-copy-gst"><i class="fa-solid fa-copy"></i> Copy Breakdown</button>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label">Total Final Amount</span>
              <span class="calc-stat-value text-cyan" id="gst-total-amount"><span class="curr-sym">₹</span> 11,800.00</span>
            </div>

            <div class="calc-stat-grid">
              <div class="calc-stat-box">
                <span class="label">Net / Base Amount</span>
                <span class="val text-white" id="gst-net-amount"><span class="curr-sym">₹</span> 10,000.00</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Total GST Tax</span>
                <span class="val text-rose" id="gst-tax-amount"><span class="curr-sym">₹</span> 1,800.00</span>
              </div>
              <div class="calc-stat-box" id="gst-box-cgst">
                <span class="label">CGST (Central)</span>
                <span class="val text-purple" id="gst-cgst-amount"><span class="curr-sym">₹</span> 900.00 (9%)</span>
              </div>
              <div class="calc-stat-box" id="gst-box-sgst">
                <span class="label">SGST (State)</span>
                <span class="val text-purple" id="gst-sgst-amount"><span class="curr-sym">₹</span> 900.00 (9%)</span>
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.4rem; color:var(--text-muted);">
                <span>Base Amount (<span id="gst-bar-base-pct">84.7%</span>)</span>
                <span>GST Tax (<span id="gst-bar-tax-pct">15.3%</span>)</span>
              </div>
              <div style="height:10px; border-radius:5px; background:rgba(255,255,255,0.06); display:flex; overflow:hidden;">
                <div id="gst-bar-base" style="width:84.7%; background:var(--accent-cyan); transition:width 0.3s;"></div>
                <div id="gst-bar-tax" style="width:15.3%; background:var(--accent-rose); transition:width 0.3s;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let calcType = 'exclusive'; // exclusive or inclusive

    const amountInput = container.querySelector('#gst-amount');
    const rateInput = container.querySelector('#gst-custom-rate');
    const customWrap = container.querySelector('#gst-custom-rate-wrap');
    const rateBadge = container.querySelector('#gst-active-rate-badge');
    const splitSelect = container.querySelector('#gst-split-type');
    const rateBtns = container.querySelectorAll('[data-gst-rate]');
    const amtBtns = container.querySelectorAll('[data-gst-amt]');
    const exBtn = container.querySelector('#gst-type-exclusive');
    const inBtn = container.querySelector('#gst-type-inclusive');

    function calculate() {
      const amount = parseFloat(amountInput.value) || 0;
      const rate = parseFloat(rateInput.value) || 0;
      const isIntra = splitSelect.value === 'intra';

      let net = 0;
      let tax = 0;
      let total = 0;

      if (calcType === 'exclusive') {
        net = amount;
        tax = (amount * rate) / 100;
        total = net + tax;
      } else {
        total = amount;
        net = (amount * 100) / (100 + rate);
        tax = total - net;
      }

      container.querySelector('#gst-total-amount').innerHTML = `<span class="curr-sym">₹</span> ${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      container.querySelector('#gst-net-amount').innerHTML = `<span class="curr-sym">₹</span> ${net.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      container.querySelector('#gst-tax-amount').innerHTML = `<span class="curr-sym">₹</span> ${tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      const cgstBox = container.querySelector('#gst-box-cgst');
      const sgstBox = container.querySelector('#gst-box-sgst');

      if (isIntra) {
        cgstBox.style.display = 'flex';
        sgstBox.style.display = 'flex';
        const halfTax = tax / 2;
        const halfRate = rate / 2;
        container.querySelector('#gst-cgst-amount').innerHTML = `<span class="curr-sym">₹</span> ${halfTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size:0.82em; opacity:0.8; font-weight:500;">(${halfRate}%)</span>`;
        container.querySelector('#gst-sgst-amount').innerHTML = `<span class="curr-sym">₹</span> ${halfTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size:0.82em; opacity:0.8; font-weight:500;">(${halfRate}%)</span>`;
      } else {
        cgstBox.style.display = 'flex';
        sgstBox.style.display = 'none';
        cgstBox.querySelector('.label').textContent = 'IGST (Integrated Tax)';
        container.querySelector('#gst-cgst-amount').innerHTML = `<span class="curr-sym">₹</span> ${tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size:0.82em; opacity:0.8; font-weight:500;">(${rate}%)</span>`;
      }

      const totalNonZero = total > 0 ? total : 1;
      const basePct = ((net / totalNonZero) * 100).toFixed(1);
      const taxPct = ((tax / totalNonZero) * 100).toFixed(1);

      container.querySelector('#gst-bar-base-pct').textContent = `${basePct}%`;
      container.querySelector('#gst-bar-tax-pct').textContent = `${taxPct}%`;
      container.querySelector('#gst-bar-base').style.width = `${basePct}%`;
      container.querySelector('#gst-bar-tax').style.width = `${taxPct}%`;
    }

    const rateLabels = {
      '5': '5% (Essential Goods)',
      '12': '12% (Standard Lower)',
      '18': '18% (Standard Rate)',
      '28': '28% (Luxury / Sin Goods)',
      'custom': 'Custom Specified Rate'
    };

    amtBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amtBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.dataset.gstAmt;
        if (val === 'custom') {
          amountInput.focus();
          amountInput.select();
        } else {
          amountInput.value = val;
          calculate();
        }
      });
    });

    amountInput.addEventListener('input', () => {
      const cur = amountInput.value;
      let matched = false;
      amtBtns.forEach(b => {
        if (b.dataset.gstAmt === cur) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const customBtn = container.querySelector('[data-gst-amt="custom"]');
        if (customBtn) customBtn.classList.add('active');
      }
      calculate();
    });

    rateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        rateBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.dataset.gstRate;
        if (val === 'custom') {
          customWrap.style.display = 'block';
          rateBadge.textContent = 'Custom Rate';
          rateInput.focus();
        } else {
          customWrap.style.display = 'none';
          rateInput.value = val;
          rateBadge.textContent = rateLabels[val] || `${val}% Rate`;
        }
        calculate();
      });
    });

    rateInput.addEventListener('input', () => {
      const cur = rateInput.value;
      let matched = false;
      rateBtns.forEach(b => {
        if (b.dataset.gstRate === cur) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const customBtn = container.querySelector('[data-gst-rate="custom"]');
        if (customBtn) customBtn.classList.add('active');
        customWrap.style.display = 'block';
        rateBadge.textContent = `${cur}% (Custom)`;
      }
      calculate();
    });

    exBtn.addEventListener('click', () => {
      calcType = 'exclusive';
      exBtn.classList.add('active');
      inBtn.classList.remove('active');
      container.querySelector('#gst-amount-badge').textContent = 'Base Price';
      calculate();
    });

    inBtn.addEventListener('click', () => {
      calcType = 'inclusive';
      inBtn.classList.add('active');
      exBtn.classList.remove('active');
      container.querySelector('#gst-amount-badge').textContent = 'Total with Tax';
      calculate();
    });

    splitSelect.addEventListener('change', calculate);

    container.querySelector('#btn-copy-gst').addEventListener('click', () => {
      const txt = `GST Calculation Summary:\nBase Amount: ${container.querySelector('#gst-net-amount').textContent}\nGST Tax: ${container.querySelector('#gst-tax-amount').textContent}\nTotal Amount: ${container.querySelector('#gst-total-amount').textContent}`;
      App.copyToClipboard(txt, 'GST summary copied!');
    });

    calculate();
  },

  // ==========================================
  // 2. EMI & Loan Calculator
  // ==========================================
  renderEmiCalculator(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-hand-holding-dollar text-emerald"></i> Loan Parameters</h4>
            <span class="badge badge-emerald">Amortization</span>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Loan Amount</label>
              <span class="text-cyan font-bold" id="emi-disp-principal"><span class="curr-sym">₹</span> 10,00,000</span>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="emi-amt-presets">
              <button type="button" class="step-btn" data-emi-amt="500000"><span class="curr-sym">₹</span> 5L</button>
              <button type="button" class="step-btn active" data-emi-amt="1000000"><span class="curr-sym">₹</span> 10L</button>
              <button type="button" class="step-btn" data-emi-amt="2500000"><span class="curr-sym">₹</span> 25L</button>
              <button type="button" class="step-btn" data-emi-amt="5000000"><span class="curr-sym">₹</span> 50L</button>
              <button type="button" class="step-btn" data-emi-amt="custom">Custom</button>
            </div>
            <input type="range" id="emi-range-principal" min="10000" max="10000000" step="10000" value="1000000" class="tool-slider">
            <div class="currency-input-wrapper">
              <div class="currency-symbol-tag"><span class="curr-sym">₹</span></div>
              <input type="number" id="emi-num-principal" class="currency-custom-input" value="1000000" min="1000" placeholder="Type custom loan amount...">
            </div>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Interest Rate (% P.A.)</label>
              <span class="text-rose font-bold" id="emi-disp-rate">8.5%</span>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="emi-rate-presets">
              <button type="button" class="step-btn" data-emi-rate="7.5">7.5%</button>
              <button type="button" class="step-btn active" data-emi-rate="8.5">8.5%</button>
              <button type="button" class="step-btn" data-emi-rate="9.5">9.5%</button>
              <button type="button" class="step-btn" data-emi-rate="11.5">11.5%</button>
              <button type="button" class="step-btn" data-emi-rate="custom">Custom</button>
            </div>
            <input type="range" id="emi-range-rate" min="1" max="30" step="0.1" value="8.5" class="tool-slider">
            <input type="number" id="emi-num-rate" class="tool-input" value="8.5" min="0.1" max="100" step="0.1" placeholder="Type custom interest rate...">
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Loan Tenure</label>
              <span class="text-amber font-bold" id="emi-disp-tenure">5 Years (60 Mos)</span>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 0.5rem;">
              <button class="step-btn active" id="emi-tenure-years-btn">Years</button>
              <button class="step-btn" id="emi-tenure-months-btn">Months</button>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="emi-tenure-presets">
              <button type="button" class="step-btn" data-emi-tenure="3">3Y</button>
              <button type="button" class="step-btn active" data-emi-tenure="5">5Y</button>
              <button type="button" class="step-btn" data-emi-tenure="10">10Y</button>
              <button type="button" class="step-btn" data-emi-tenure="20">20Y</button>
              <button type="button" class="step-btn" data-emi-tenure="custom">Custom</button>
            </div>
            <input type="range" id="emi-range-tenure" min="1" max="30" step="1" value="5" class="tool-slider">
            <input type="number" id="emi-num-tenure" class="tool-input" value="5" min="1" placeholder="Type custom loan tenure...">
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-chart-simple text-cyan"></i> Repayment Breakdown</h4>
            <button class="btn btn-sm btn-secondary" id="btn-copy-emi"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label">Monthly EMI Payable</span>
              <span class="calc-stat-value text-emerald" id="emi-result-monthly"><span class="curr-sym">₹</span> 20,517</span>
            </div>

            <div class="calc-stat-grid">
              <div class="calc-stat-box">
                <span class="label">Principal Loan Amount</span>
                <span class="val text-white" id="emi-result-principal"><span class="curr-sym">₹</span> 10,00,000</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Total Interest Payable</span>
                <span class="val text-rose" id="emi-result-interest"><span class="curr-sym">₹</span> 2,30,992</span>
              </div>
              <div class="calc-stat-box" style="grid-column: 1 / -1;">
                <span class="label">Total Payment (Principal + Interest)</span>
                <span class="val text-cyan" id="emi-result-total"><span class="curr-sym">₹</span> 12,30,992</span>
              </div>
            </div>

            <!-- Proportion Progress Bar -->
            <div style="margin-top: 1.5rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.4rem; color:var(--text-muted);">
                <span>Principal (<span id="emi-bar-p-pct">81.2%</span>)</span>
                <span>Interest (<span id="emi-bar-i-pct">18.8%</span>)</span>
              </div>
              <div style="height:12px; border-radius:6px; background:rgba(255,255,255,0.06); display:flex; overflow:hidden;">
                <div id="emi-bar-p" style="width:81.2%; background:var(--accent-cyan); transition:width 0.3s;"></div>
                <div id="emi-bar-i" style="width:18.8%; background:var(--accent-rose); transition:width 0.3s;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let isYears = true;
    const rPrinc = container.querySelector('#emi-range-principal');
    const nPrinc = container.querySelector('#emi-num-principal');
    const dPrinc = container.querySelector('#emi-disp-principal');

    const rRate = container.querySelector('#emi-range-rate');
    const nRate = container.querySelector('#emi-num-rate');
    const dRate = container.querySelector('#emi-disp-rate');

    const rTen = container.querySelector('#emi-range-tenure');
    const nTen = container.querySelector('#emi-num-tenure');
    const dTen = container.querySelector('#emi-disp-tenure');

    const yBtn = container.querySelector('#emi-tenure-years-btn');
    const mBtn = container.querySelector('#emi-tenure-months-btn');

    const emiAmtBtns = container.querySelectorAll('[data-emi-amt]');
    const emiRateBtns = container.querySelectorAll('[data-emi-rate]');
    const emiTenureBtns = container.querySelectorAll('[data-emi-tenure]');

    function calculate() {
      const p = parseFloat(nPrinc.value) || 0;
      const rAnnual = parseFloat(nRate.value) || 0;
      let tenVal = parseFloat(nTen.value) || 0;
      const months = isYears ? tenVal * 12 : tenVal;

      dPrinc.innerHTML = `<span class="curr-sym">₹</span> ${p.toLocaleString('en-IN')}`;
      dRate.textContent = `${rAnnual}%`;
      dTen.textContent = isYears ? `${tenVal} Years (${months} Mos)` : `${months} Months (${(months/12).toFixed(1)} Yrs)`;

      if (p <= 0 || months <= 0) return;

      const monthlyRate = rAnnual / (12 * 100);
      let emi = 0;

      if (monthlyRate === 0) {
        emi = p / months;
      } else {
        emi = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      }

      const totalPayment = emi * months;
      const totalInterest = totalPayment - p;

      container.querySelector('#emi-result-monthly').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(emi).toLocaleString('en-IN')}`;
      container.querySelector('#emi-result-principal').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(p).toLocaleString('en-IN')}`;
      container.querySelector('#emi-result-interest').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(totalInterest).toLocaleString('en-IN')}`;
      container.querySelector('#emi-result-total').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(totalPayment).toLocaleString('en-IN')}`;

      const pPct = ((p / totalPayment) * 100).toFixed(1);
      const iPct = ((totalInterest / totalPayment) * 100).toFixed(1);

      container.querySelector('#emi-bar-p-pct').textContent = `${pPct}%`;
      container.querySelector('#emi-bar-i-pct').textContent = `${iPct}%`;
      container.querySelector('#emi-bar-p').style.width = `${pPct}%`;
      container.querySelector('#emi-bar-i').style.width = `${iPct}%`;
    }

    // Sync Sliders and Inputs + Presets
    rPrinc.addEventListener('input', () => {
      nPrinc.value = rPrinc.value;
      updateAmtPresetState(rPrinc.value);
      calculate();
    });

    nPrinc.addEventListener('input', () => {
      const val = parseFloat(nPrinc.value) || 0;
      rPrinc.max = Math.max(10000000, val);
      rPrinc.value = val;
      updateAmtPresetState(nPrinc.value);
      calculate();
    });

    function updateAmtPresetState(val) {
      let matched = false;
      emiAmtBtns.forEach(b => {
        if (b.dataset.emiAmt === String(val)) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const cust = container.querySelector('[data-emi-amt="custom"]');
        if (cust) cust.classList.add('active');
      }
    }

    emiAmtBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emiAmtBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.emiAmt;
        if (v === 'custom') {
          nPrinc.focus();
          nPrinc.select();
        } else {
          nPrinc.value = v;
          rPrinc.max = Math.max(10000000, parseFloat(v));
          rPrinc.value = v;
          calculate();
        }
      });
    });

    rRate.addEventListener('input', () => {
      nRate.value = rRate.value;
      updateRatePresetState(rRate.value);
      calculate();
    });

    nRate.addEventListener('input', () => {
      const val = parseFloat(nRate.value) || 0;
      rRate.max = Math.max(30, val);
      rRate.value = val;
      updateRatePresetState(nRate.value);
      calculate();
    });

    function updateRatePresetState(val) {
      let matched = false;
      emiRateBtns.forEach(b => {
        if (b.dataset.emiRate === String(val)) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const cust = container.querySelector('[data-emi-rate="custom"]');
        if (cust) cust.classList.add('active');
      }
    }

    emiRateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emiRateBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.emiRate;
        if (v === 'custom') {
          nRate.focus();
          nRate.select();
        } else {
          nRate.value = v;
          rRate.value = v;
          calculate();
        }
      });
    });

    rTen.addEventListener('input', () => {
      nTen.value = rTen.value;
      updateTenurePresetState(rTen.value);
      calculate();
    });

    nTen.addEventListener('input', () => {
      const val = parseFloat(nTen.value) || 0;
      rTen.max = Math.max(isYears ? 30 : 360, val);
      rTen.value = val;
      updateTenurePresetState(nTen.value);
      calculate();
    });

    function updateTenurePresetState(val) {
      let matched = false;
      emiTenureBtns.forEach(b => {
        if (b.dataset.emiTenure === String(val)) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const cust = container.querySelector('[data-emi-tenure="custom"]');
        if (cust) cust.classList.add('active');
      }
    }

    emiTenureBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emiTenureBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.emiTenure;
        if (v === 'custom') {
          nTen.focus();
          nTen.select();
        } else {
          nTen.value = v;
          rTen.value = v;
          calculate();
        }
      });
    });

    yBtn.addEventListener('click', () => {
      isYears = true;
      yBtn.classList.add('active');
      mBtn.classList.remove('active');
      rTen.max = '30';
      rTen.value = Math.min(30, Math.max(1, Math.round(nTen.value / 12) || 5));
      nTen.value = rTen.value;
      updateTenurePresetState(nTen.value);
      calculate();
    });

    mBtn.addEventListener('click', () => {
      isYears = false;
      mBtn.classList.add('active');
      yBtn.classList.remove('active');
      rTen.max = '360';
      rTen.value = (parseFloat(nTen.value) || 5) * 12;
      nTen.value = rTen.value;
      updateTenurePresetState(nTen.value);
      calculate();
    });

    container.querySelector('#btn-copy-emi').addEventListener('click', () => {
      const txt = `EMI Loan Summary:\nPrincipal: ${container.querySelector('#emi-result-principal').textContent}\nMonthly EMI: ${container.querySelector('#emi-result-monthly').textContent}\nTotal Interest: ${container.querySelector('#emi-result-interest').textContent}\nTotal Repayment: ${container.querySelector('#emi-result-total').textContent}`;
      App.copyToClipboard(txt, 'Loan summary copied!');
    });

    calculate();
  },

  // ==========================================
  // 3. SIP & Investment Calculator
  // ==========================================
  renderSipCalculator(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-piggy-bank text-purple"></i> Investment Plan</h4>
            <span class="badge badge-purple">Wealth Compounder</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Investment Mode</label>
            <div class="quick-interchange-grid" style="grid-template-columns: 1fr 1fr;">
              <button class="step-btn active" id="sip-mode-monthly">Monthly SIP</button>
              <button class="step-btn" id="sip-mode-lumpsum">One-Time Lumpsum</button>
            </div>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label" id="sip-label-amount">Monthly Investment</label>
              <span class="text-cyan font-bold" id="sip-disp-amount"><span class="curr-sym">₹</span> 5,000</span>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(6, 1fr); margin-bottom: 0.5rem;" id="sip-amt-presets">
              <button type="button" class="step-btn" data-sip-amt="2500">₹ 2.5K</button>
              <button type="button" class="step-btn active" data-sip-amt="5000">₹ 5K</button>
              <button type="button" class="step-btn" data-sip-amt="10000">₹ 10K</button>
              <button type="button" class="step-btn" data-sip-amt="25000">₹ 25K</button>
              <button type="button" class="step-btn" data-sip-amt="50000">₹ 50K</button>
              <button type="button" class="step-btn" data-sip-amt="custom">Custom</button>
            </div>
            <input type="range" id="sip-range-amount" min="500" max="100000" step="500" value="5000" class="tool-slider">
            <div class="currency-input-wrapper purple">
              <div class="currency-symbol-tag purple"><span class="curr-sym">₹</span></div>
              <input type="number" id="sip-num-amount" class="currency-custom-input" value="5000" min="100" placeholder="Type custom investment amount...">
            </div>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Expected Return Rate (% P.A.)</label>
              <span class="text-emerald font-bold" id="sip-disp-rate">12%</span>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="sip-rate-presets">
              <button type="button" class="step-btn" data-sip-rate="8">8%</button>
              <button type="button" class="step-btn" data-sip-rate="10">10%</button>
              <button type="button" class="step-btn active" data-sip-rate="12">12%</button>
              <button type="button" class="step-btn" data-sip-rate="15">15%</button>
              <button type="button" class="step-btn" data-sip-rate="custom">Custom</button>
            </div>
            <input type="range" id="sip-range-rate" min="1" max="30" step="0.5" value="12" class="tool-slider">
            <input type="number" id="sip-num-rate" class="tool-input" value="12" min="1" max="100" step="0.1" placeholder="Type custom return rate...">
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Time Period (Years)</label>
              <span class="text-amber font-bold" id="sip-disp-years">10 Years</span>
            </div>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(6, 1fr); margin-bottom: 0.5rem;" id="sip-years-presets">
              <button type="button" class="step-btn" data-sip-years="5">5Y</button>
              <button type="button" class="step-btn active" data-sip-years="10">10Y</button>
              <button type="button" class="step-btn" data-sip-years="15">15Y</button>
              <button type="button" class="step-btn" data-sip-years="20">20Y</button>
              <button type="button" class="step-btn" data-sip-years="25">25Y</button>
              <button type="button" class="step-btn" data-sip-years="custom">Custom</button>
            </div>
            <input type="range" id="sip-range-years" min="1" max="40" step="1" value="10" class="tool-slider">
            <input type="number" id="sip-num-years" class="tool-input" value="10" min="1" max="50" placeholder="Type custom period in years...">
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-arrow-trend-up text-emerald"></i> Future Wealth Projection</h4>
            <button class="btn btn-sm btn-secondary" id="btn-copy-sip"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label">Expected Maturity Value</span>
              <span class="calc-stat-value text-purple" id="sip-result-total"><span class="curr-sym">₹</span> 11,61,695</span>
            </div>

            <div class="calc-stat-grid">
              <div class="calc-stat-box">
                <span class="label">Total Amount Invested</span>
                <span class="val text-white" id="sip-result-invested"><span class="curr-sym">₹</span> 6,00,000</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Estimated Wealth Gain</span>
                <span class="val text-emerald" id="sip-result-returns"><span class="curr-sym">₹</span> 5,61,695</span>
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.4rem; color:var(--text-muted);">
                <span>Invested (<span id="sip-bar-inv-pct">51.6%</span>)</span>
                <span>Returns (<span id="sip-bar-ret-pct">48.4%</span>)</span>
              </div>
              <div style="height:12px; border-radius:6px; background:rgba(255,255,255,0.06); display:flex; overflow:hidden;">
                <div id="sip-bar-inv" style="width:51.6%; background:var(--accent-cyan); transition:width 0.3s;"></div>
                <div id="sip-bar-ret" style="width:48.4%; background:var(--accent-purple); transition:width 0.3s;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let isMonthly = true;
    const rAmt = container.querySelector('#sip-range-amount');
    const nAmt = container.querySelector('#sip-num-amount');
    const dAmt = container.querySelector('#sip-disp-amount');

    const rRate = container.querySelector('#sip-range-rate');
    const nRate = container.querySelector('#sip-num-rate');
    const dRate = container.querySelector('#sip-disp-rate');

    const rYrs = container.querySelector('#sip-range-years');
    const nYrs = container.querySelector('#sip-num-years');
    const dYrs = container.querySelector('#sip-disp-years');

    const mBtn = container.querySelector('#sip-mode-monthly');
    const lBtn = container.querySelector('#sip-mode-lumpsum');

    const sipAmtGrid = container.querySelector('#sip-amt-presets');
    const sipRateBtns = container.querySelectorAll('[data-sip-rate]');
    const sipYearsBtns = container.querySelectorAll('[data-sip-years]');

    const monthlyPresets = [
      { label: '₹ 2.5K', val: '2500' },
      { label: '₹ 5K', val: '5000' },
      { label: '₹ 10K', val: '10000' },
      { label: '₹ 25K', val: '25000' },
      { label: '₹ 50K', val: '50000' },
      { label: 'Custom', val: 'custom' }
    ];

    const lumpsumPresets = [
      { label: '₹ 50K', val: '50000' },
      { label: '₹ 1L', val: '100000' },
      { label: '₹ 5L', val: '500000' },
      { label: '₹ 10L', val: '1000000' },
      { label: '₹ 25L', val: '2500000' },
      { label: 'Custom', val: 'custom' }
    ];

    function renderAmtPresets(presets) {
      sipAmtGrid.innerHTML = '';
      presets.forEach(p => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'step-btn';
        btn.dataset.sipAmt = p.val;
        btn.textContent = p.label;
        if (p.val === nAmt.value) btn.classList.add('active');
        btn.addEventListener('click', () => {
          sipAmtGrid.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (p.val === 'custom') {
            nAmt.focus();
            nAmt.select();
          } else {
            nAmt.value = p.val;
            rAmt.max = Math.max(isMonthly ? 100000 : 5000000, parseFloat(p.val));
            rAmt.value = p.val;
            calculate();
          }
        });
        sipAmtGrid.appendChild(btn);
      });
      updateAmtPresetState(nAmt.value);
    }

    function updateAmtPresetState(val) {
      let matched = false;
      sipAmtGrid.querySelectorAll('[data-sip-amt]').forEach(b => {
        if (b.dataset.sipAmt === String(val)) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const cust = sipAmtGrid.querySelector('[data-sip-amt="custom"]');
        if (cust) cust.classList.add('active');
      }
    }

    function calculate() {
      const amt = parseFloat(nAmt.value) || 0;
      const rate = parseFloat(nRate.value) || 0;
      const yrs = parseFloat(nYrs.value) || 0;

      dAmt.innerHTML = `<span class="curr-sym">₹</span> ${amt.toLocaleString('en-IN')}`;
      dRate.textContent = `${rate}%`;
      dYrs.textContent = `${yrs} Years`;

      let invested = 0;
      let total = 0;

      if (isMonthly) {
        const months = yrs * 12;
        const i = rate / 12 / 100;
        invested = amt * months;
        if (i === 0) {
          total = invested;
        } else {
          total = amt * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        }
      } else {
        invested = amt;
        total = amt * Math.pow(1 + rate / 100, yrs);
      }

      const returns = total - invested;

      container.querySelector('#sip-result-total').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(total).toLocaleString('en-IN')}`;
      container.querySelector('#sip-result-invested').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(invested).toLocaleString('en-IN')}`;
      container.querySelector('#sip-result-returns').innerHTML = `<span class="curr-sym">₹</span> ${Math.round(returns).toLocaleString('en-IN')}`;

      const totalSafe = total > 0 ? total : 1;
      const invPct = ((invested / totalSafe) * 100).toFixed(1);
      const retPct = ((returns / totalSafe) * 100).toFixed(1);

      container.querySelector('#sip-bar-inv-pct').textContent = `${invPct}%`;
      container.querySelector('#sip-bar-ret-pct').textContent = `${retPct}%`;
      container.querySelector('#sip-bar-inv').style.width = `${invPct}%`;
      container.querySelector('#sip-bar-ret').style.width = `${retPct}%`;
    }

    rAmt.addEventListener('input', () => {
      nAmt.value = rAmt.value;
      updateAmtPresetState(rAmt.value);
      calculate();
    });

    nAmt.addEventListener('input', () => {
      const val = parseFloat(nAmt.value) || 0;
      rAmt.max = Math.max(isMonthly ? 100000 : 5000000, val);
      rAmt.value = val;
      updateAmtPresetState(nAmt.value);
      calculate();
    });

    rRate.addEventListener('input', () => {
      nRate.value = rRate.value;
      updateRatePresetState(rRate.value);
      calculate();
    });

    nRate.addEventListener('input', () => {
      const val = parseFloat(nRate.value) || 0;
      rRate.max = Math.max(30, val);
      rRate.value = val;
      updateRatePresetState(nRate.value);
      calculate();
    });

    function updateRatePresetState(val) {
      let matched = false;
      sipRateBtns.forEach(b => {
        if (b.dataset.sipRate === String(val)) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const cust = container.querySelector('[data-sip-rate="custom"]');
        if (cust) cust.classList.add('active');
      }
    }

    sipRateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sipRateBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.sipRate;
        if (v === 'custom') {
          nRate.focus();
          nRate.select();
        } else {
          nRate.value = v;
          rRate.value = v;
          calculate();
        }
      });
    });

    rYrs.addEventListener('input', () => {
      nYrs.value = rYrs.value;
      updateYearsPresetState(rYrs.value);
      calculate();
    });

    nYrs.addEventListener('input', () => {
      const val = parseFloat(nYrs.value) || 0;
      rYrs.max = Math.max(40, val);
      rYrs.value = val;
      updateYearsPresetState(nYrs.value);
      calculate();
    });

    function updateYearsPresetState(val) {
      let matched = false;
      sipYearsBtns.forEach(b => {
        if (b.dataset.sipYears === String(val)) {
          b.classList.add('active');
          matched = true;
        } else {
          b.classList.remove('active');
        }
      });
      if (!matched) {
        const cust = container.querySelector('[data-sip-years="custom"]');
        if (cust) cust.classList.add('active');
      }
    }

    sipYearsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sipYearsBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.sipYears;
        if (v === 'custom') {
          nYrs.focus();
          nYrs.select();
        } else {
          nYrs.value = v;
          rYrs.value = v;
          calculate();
        }
      });
    });

    mBtn.addEventListener('click', () => {
      isMonthly = true;
      mBtn.classList.add('active');
      lBtn.classList.remove('active');
      container.querySelector('#sip-label-amount').textContent = 'Monthly Investment';
      rAmt.max = '100000';
      renderAmtPresets(monthlyPresets);
      calculate();
    });

    lBtn.addEventListener('click', () => {
      isMonthly = false;
      lBtn.classList.add('active');
      mBtn.classList.remove('active');
      container.querySelector('#sip-label-amount').textContent = 'Total Lumpsum Deposit';
      rAmt.max = '5000000';
      renderAmtPresets(lumpsumPresets);
      calculate();
    });

    container.querySelector('#btn-copy-sip').addEventListener('click', () => {
      const txt = `SIP Wealth Summary:\nInvested: ${container.querySelector('#sip-result-invested').textContent}\nExpected Returns: ${container.querySelector('#sip-result-returns').textContent}\nFinal Maturity Value: ${container.querySelector('#sip-result-total').textContent}`;
      App.copyToClipboard(txt, 'SIP projection copied!');
    });

    renderAmtPresets(monthlyPresets);
    calculate();
  },

  // ==========================================
  // 4. Age & Date Difference Calculator
  // ==========================================
  renderAgeCalculator(container) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-cake-candles text-amber"></i> Date of Birth</h4>
            <span class="badge badge-amber">Chronology</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Quick Age Presets / DOB</label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="age-dob-presets">
              <button type="button" class="step-btn" data-age-y="18">18Y</button>
              <button type="button" class="step-btn" data-age-y="21">21Y</button>
              <button type="button" class="step-btn active" data-age-y="25">25Y</button>
              <button type="button" class="step-btn" data-age-y="30">30Y</button>
              <button type="button" class="step-btn" data-age-y="custom">Custom</button>
            </div>
            <label class="tool-field-label">Date of Birth</label>
            <input type="date" id="age-dob" class="tool-input" value="2001-01-01" max="${todayStr}">
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Calculate Age As Of</label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 0.5rem;" id="age-asof-presets">
              <button type="button" class="step-btn active" data-age-asof="today">Today</button>
              <button type="button" class="step-btn" data-age-asof="eoy">Year End</button>
              <button type="button" class="step-btn" data-age-asof="retire">Age 60</button>
              <button type="button" class="step-btn" data-age-asof="custom">Custom</button>
            </div>
            <input type="date" id="age-asof" class="tool-input" value="${todayStr}">
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-hourglass-half text-cyan"></i> Exact Age Details</h4>
            <button class="btn btn-sm btn-secondary" id="btn-copy-age"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label">Your Age Today</span>
              <span class="calc-stat-value text-amber" id="age-main-display">25 Years, 0 Mos, 0 Days</span>
            </div>

            <div class="calc-stat-grid" style="grid-template-columns: repeat(2, 1fr);">
              <div class="calc-stat-box">
                <span class="label">Total Months Lived</span>
                <span class="val text-cyan" id="age-total-months">300 Months</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Total Weeks Lived</span>
                <span class="val text-purple" id="age-total-weeks">1,304 Weeks</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Total Days Lived</span>
                <span class="val text-emerald" id="age-total-days">9,131 Days</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Total Hours Lived</span>
                <span class="val text-rose" id="age-total-hours">219,144 Hours</span>
              </div>
            </div>

            <div class="info-tip-box" style="margin-top:1.5rem;" id="age-next-bday">
              <i class="fa-solid fa-gift text-rose"></i>
              <span>Next Birthday in: <strong id="age-next-bday-text" class="text-white">Calculating...</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;

    const dobInput = container.querySelector('#age-dob');
    const asofInput = container.querySelector('#age-asof');
    const dobPresets = container.querySelectorAll('[data-age-y]');
    const asofPresets = container.querySelectorAll('[data-age-asof]');

    function calculate() {
      const dobVal = dobInput.value;
      const asofVal = asofInput.value;
      if (!dobVal || !asofVal) return;

      const d1 = new Date(dobVal);
      const d2 = new Date(asofVal);

      if (d1 > d2) {
        container.querySelector('#age-main-display').textContent = 'Birth date must be in the past!';
        return;
      }

      let years = d2.getFullYear() - d1.getFullYear();
      let months = d2.getMonth() - d1.getMonth();
      let days = d2.getDate() - d1.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      container.querySelector('#age-main-display').textContent = `${years} Years, ${months} Months, ${days} Days`;

      const diffMs = d2 - d1;
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = (years * 12) + months;
      const totalHours = totalDays * 24;

      container.querySelector('#age-total-months').textContent = `${totalMonths.toLocaleString()} Months`;
      container.querySelector('#age-total-weeks').textContent = `${totalWeeks.toLocaleString()} Weeks`;
      container.querySelector('#age-total-days').textContent = `${totalDays.toLocaleString()} Days`;
      container.querySelector('#age-total-hours').textContent = `${totalHours.toLocaleString()} Hours`;

      // Next Birthday
      const nextBday = new Date(d2.getFullYear(), d1.getMonth(), d1.getDate());
      if (nextBday < d2) {
        nextBday.setFullYear(d2.getFullYear() + 1);
      }
      const bdayDiffDays = Math.ceil((nextBday - d2) / (1000 * 60 * 60 * 24));
      container.querySelector('#age-next-bday-text').textContent = `${bdayDiffDays} Days (${nextBday.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })})`;
    }

    dobPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        dobPresets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const y = btn.dataset.ageY;
        if (y === 'custom') {
          dobInput.focus();
        } else {
          const targetYear = today.getFullYear() - parseInt(y, 10);
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          dobInput.value = `${targetYear}-${month}-${day}`;
          calculate();
        }
      });
    });

    dobInput.addEventListener('input', () => {
      dobPresets.forEach(b => b.classList.remove('active'));
      const customBtn = container.querySelector('[data-age-y="custom"]');
      if (customBtn) customBtn.classList.add('active');
      calculate();
    });

    asofPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        asofPresets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.ageAsof;
        if (type === 'today') {
          asofInput.value = todayStr;
        } else if (type === 'eoy') {
          asofInput.value = `${today.getFullYear()}-12-31`;
        } else if (type === 'retire') {
          const d1 = new Date(dobInput.value || '2000-01-01');
          const retireYear = d1.getFullYear() + 60;
          asofInput.value = `${retireYear}-${String(d1.getMonth()+1).padStart(2, '0')}-${String(d1.getDate()).padStart(2, '0')}`;
        } else {
          asofInput.focus();
        }
        calculate();
      });
    });

    asofInput.addEventListener('input', () => {
      asofPresets.forEach(b => b.classList.remove('active'));
      const customBtn = container.querySelector('[data-age-asof="custom"]');
      if (customBtn) customBtn.classList.add('active');
      calculate();
    });

    container.querySelector('#btn-copy-age').addEventListener('click', () => {
      const txt = `Age Summary:\nExact Age: ${container.querySelector('#age-main-display').textContent}\nDays Lived: ${container.querySelector('#age-total-days').textContent}\nNext Birthday: ${container.querySelector('#age-next-bday-text').textContent}`;
      App.copyToClipboard(txt, 'Age breakdown copied!');
    });

    calculate();
  },

  // ==========================================
  // 5. BMI & Calorie Calculator
  // ==========================================
  renderBmiCalculator(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-heart-pulse text-rose"></i> Body Metrics</h4>
            <span class="badge badge-rose">Health & Fitness</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Unit System</label>
            <div class="quick-interchange-grid" style="grid-template-columns: 1fr 1fr;">
              <button class="step-btn active" id="bmi-unit-metric">Metric (kg / cm)</button>
              <button class="step-btn" id="bmi-unit-imperial">Imperial (lbs / ft)</button>
            </div>
          </div>

          <div class="tool-field-group" id="bmi-metric-height-box">
            <label class="tool-field-label">Height (cm)</label>
            <input type="number" id="bmi-height-cm" class="tool-input" value="175" min="50" max="250" placeholder="Type custom height (cm)...">
          </div>

          <div class="tool-field-group" id="bmi-imperial-height-box" style="display:none;">
            <label class="tool-field-label">Height (Feet & Inches)</label>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
              <input type="number" id="bmi-height-ft" class="tool-input" value="5" min="1" max="8" placeholder="Feet">
              <input type="number" id="bmi-height-in" class="tool-input" value="9" min="0" max="11" placeholder="Inches">
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label" id="bmi-weight-label">Weight (kg)</label>
            <input type="number" id="bmi-weight" class="tool-input" value="70" min="20" max="300" placeholder="Type custom weight...">
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Daily Activity Level</label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 0.5rem;" id="bmi-activity-presets">
              <button type="button" class="step-btn" data-bmi-act="1.2">1.2x</button>
              <button type="button" class="step-btn" data-bmi-act="1.375">1.37x</button>
              <button type="button" class="step-btn active" data-bmi-act="1.55">1.55x</button>
              <button type="button" class="step-btn" data-bmi-act="1.725">1.72x</button>
              <button type="button" class="step-btn" data-bmi-act="custom">Custom</button>
            </div>
            <div id="bmi-custom-act-wrap" style="display:none; margin-top:0.4rem;">
              <input type="number" id="bmi-custom-act" class="tool-input" placeholder="Type custom activity multiplier (e.g. 1.6)" value="1.55" min="1.0" max="2.5" step="0.05">
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Gender & Age</label>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
              <select id="bmi-gender" class="tool-select">
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
              </select>
              <input type="number" id="bmi-age" class="tool-input" value="25" min="5" max="120" placeholder="Age">
            </div>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-chart-column text-emerald"></i> Diagnostic Results</h4>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label">Body Mass Index (BMI)</span>
              <span class="calc-stat-value text-cyan" id="bmi-score-display">22.9</span>
              <span class="badge badge-emerald" id="bmi-category-badge" style="font-size:0.9rem; padding:0.4rem 1rem; margin-top:0.5rem;">Normal Weight</span>
            </div>

            <div class="calc-stat-grid">
              <div class="calc-stat-box">
                <span class="label">Healthy Weight Range</span>
                <span class="val text-white" id="bmi-healthy-weight">56.7 - 76.6 kg</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">BMR (Basal Metabolic)</span>
                <span class="val text-amber" id="bmi-bmr-display">1,690 kcal/day</span>
              </div>
              <div class="calc-stat-box" style="grid-column: 1 / -1;">
                <span class="label">Daily Calorie Maintenance (<span id="bmi-act-label">1.55x Moderate</span>)</span>
                <span class="val text-emerald" id="bmi-tdee-display">2,620 kcal/day</span>
              </div>
            </div>

            <!-- BMI Color Scale -->
            <div style="margin-top: 1.5rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:0.4rem; color:var(--text-muted);">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5-24.9)</span>
                <span>Overweight (25-29.9)</span>
                <span>Obese (&ge;30)</span>
              </div>
              <div style="height:12px; border-radius:6px; background:linear-gradient(to right, #38bdf8 0%, #34d399 25%, #fbbf24 60%, #f43f5e 100%); position:relative;">
                <div id="bmi-indicator-pin" style="position:absolute; top:-4px; left:40%; width:4px; height:20px; background:#fff; border-radius:2px; box-shadow:0 0 8px rgba(255,255,255,0.8); transition:left 0.3s;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let isMetric = true;
    let activityMultiplier = 1.55;

    const mBtn = container.querySelector('#bmi-unit-metric');
    const iBtn = container.querySelector('#bmi-unit-imperial');
    const hCmBox = container.querySelector('#bmi-metric-height-box');
    const hImpBox = container.querySelector('#bmi-imperial-height-box');
    const wLabel = container.querySelector('#bmi-weight-label');

    const hCm = container.querySelector('#bmi-height-cm');
    const hFt = container.querySelector('#bmi-height-ft');
    const hIn = container.querySelector('#bmi-height-in');
    const weightInp = container.querySelector('#bmi-weight');
    const genderInp = container.querySelector('#bmi-gender');
    const ageInp = container.querySelector('#bmi-age');

    const actBtns = container.querySelectorAll('[data-bmi-act]');
    const customActWrap = container.querySelector('#bmi-custom-act-wrap');
    const customActInp = container.querySelector('#bmi-custom-act');
    const actLabel = container.querySelector('#bmi-act-label');

    function calculate() {
      let weightKg = parseFloat(weightInp.value) || 0;
      let heightCm = 0;

      if (isMetric) {
        heightCm = parseFloat(hCm.value) || 0;
      } else {
        weightKg = weightKg * 0.453592; // lbs to kg
        const ft = parseFloat(hFt.value) || 0;
        const inc = parseFloat(hIn.value) || 0;
        heightCm = (ft * 12 + inc) * 2.54;
      }

      if (heightCm <= 0 || weightKg <= 0) return;

      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);

      const scoreEl = container.querySelector('#bmi-score-display');
      const badgeEl = container.querySelector('#bmi-category-badge');
      const pinEl = container.querySelector('#bmi-indicator-pin');

      scoreEl.textContent = bmi.toFixed(1);

      let catText = 'Normal Weight';
      let badgeClass = 'badge-emerald';

      if (bmi < 18.5) {
        catText = 'Underweight';
        badgeClass = 'badge-cyan';
      } else if (bmi < 25) {
        catText = 'Normal Weight';
        badgeClass = 'badge-emerald';
      } else if (bmi < 30) {
        catText = 'Overweight';
        badgeClass = 'badge-amber';
      } else {
        catText = 'Obese';
        badgeClass = 'badge-rose';
      }

      badgeEl.textContent = catText;
      badgeEl.className = `badge ${badgeClass}`;

      // Pin position between 10 and 40 BMI
      const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
      pinEl.style.left = `${pct}%`;

      // Healthy Weight Range (18.5 to 24.9)
      const minHealthy = (18.5 * heightM * heightM).toFixed(1);
      const maxHealthy = (24.9 * heightM * heightM).toFixed(1);

      if (isMetric) {
        container.querySelector('#bmi-healthy-weight').textContent = `${minHealthy} - ${maxHealthy} kg`;
      } else {
        container.querySelector('#bmi-healthy-weight').textContent = `${(minHealthy * 2.20462).toFixed(1)} - ${(maxHealthy * 2.20462).toFixed(1)} lbs`;
      }

      // BMR (Mifflin-St Jeor)
      const age = parseFloat(ageInp.value) || 25;
      const isMale = genderInp.value === 'male';
      let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + (isMale ? 5 : -161);
      bmr = Math.max(800, Math.round(bmr));

      container.querySelector('#bmi-bmr-display').textContent = `${bmr.toLocaleString()} kcal/day`;
      actLabel.textContent = `${activityMultiplier.toFixed(2)}x Multiplier`;
      container.querySelector('#bmi-tdee-display').textContent = `${Math.round(bmr * activityMultiplier).toLocaleString()} kcal/day`;
    }

    actBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        actBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const actVal = btn.dataset.bmiAct;
        if (actVal === 'custom') {
          customActWrap.style.display = 'block';
          customActInp.focus();
          activityMultiplier = parseFloat(customActInp.value) || 1.55;
        } else {
          customActWrap.style.display = 'none';
          activityMultiplier = parseFloat(actVal);
          customActInp.value = actVal;
        }
        calculate();
      });
    });

    customActInp.addEventListener('input', () => {
      activityMultiplier = parseFloat(customActInp.value) || 1.2;
      calculate();
    });

    mBtn.addEventListener('click', () => {
      isMetric = true;
      mBtn.classList.add('active');
      iBtn.classList.remove('active');
      hCmBox.style.display = 'block';
      hImpBox.style.display = 'none';
      wLabel.textContent = 'Weight (kg)';
      weightInp.value = '70';
      calculate();
    });

    iBtn.addEventListener('click', () => {
      isMetric = false;
      iBtn.classList.add('active');
      mBtn.classList.remove('active');
      hCmBox.style.display = 'none';
      hImpBox.style.display = 'block';
      wLabel.textContent = 'Weight (lbs)';
      weightInp.value = '154';
      calculate();
    });

    [hCm, hFt, hIn, weightInp, genderInp, ageInp].forEach(el => el.addEventListener('input', calculate));
    calculate();
  },

  // ==========================================
  // 6. Scientific Calculator
  // ==========================================
  renderScientificCalculator(container) {
    container.innerHTML = `
      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 1.5rem; box-shadow: var(--shadow-xl);">
        
        <!-- Custom Formula Direct Typing Input -->
        <div style="margin-bottom: 1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <label style="font-size:0.82rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">
              <i class="fa-solid fa-keyboard text-cyan"></i> Custom Formula (Direct Typing)
            </label>
            <span class="badge badge-cyan" style="font-size:0.75rem;">Type & Press Enter</span>
          </div>
          <input type="text" id="sci-custom-input" class="tool-input" placeholder="Type custom math formula, e.g. (25 * 4) + sqrt(144) - sin(30)..." style="font-family: var(--font-mono); font-size:1.05rem; font-weight:600; padding:0.65rem 0.85rem; border-color:var(--border-subtle); background:rgba(0,0,0,0.35);">
        </div>

        <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
          <div id="sci-history" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); min-height: 1.2rem; text-align: right; overflow-x: auto;"></div>
          <div id="sci-display" style="font-family: var(--font-mono); font-size: 2.25rem; font-weight: 700; color: #fff; text-align: right; word-break: break-all;">0</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem;" id="sci-keypad">
          <!-- Row 1 -->
          <button class="btn btn-secondary sci-btn" data-key="rad">DEG</button>
          <button class="btn btn-secondary sci-btn" data-key="sin">sin</button>
          <button class="btn btn-secondary sci-btn" data-key="cos">cos</button>
          <button class="btn btn-secondary sci-btn" data-key="tan">tan</button>
          <button class="btn btn-secondary sci-btn text-rose" data-key="clear">AC</button>

          <!-- Row 2 -->
          <button class="btn btn-secondary sci-btn" data-key="pi">π</button>
          <button class="btn btn-secondary sci-btn" data-key="e">e</button>
          <button class="btn btn-secondary sci-btn" data-key="sqrt">√</button>
          <button class="btn btn-secondary sci-btn" data-key="pow">xʸ</button>
          <button class="btn btn-secondary sci-btn text-rose" data-key="backspace"><i class="fa-solid fa-delete-left"></i></button>

          <!-- Row 3 -->
          <button class="btn btn-secondary sci-btn" data-key="log">log</button>
          <button class="btn btn-secondary sci-btn" data-key="ln">ln</button>
          <button class="btn btn-secondary sci-btn" data-key="(">(</button>
          <button class="btn btn-secondary sci-btn" data-key=")">)</button>
          <button class="btn btn-secondary sci-btn text-cyan" data-key="/">÷</button>

          <!-- Row 4 -->
          <button class="btn btn-secondary sci-btn" data-key="fact">n!</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="7">7</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="8">8</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="9">9</button>
          <button class="btn btn-secondary sci-btn text-cyan" data-key="*">×</button>

          <!-- Row 5 -->
          <button class="btn btn-secondary sci-btn" data-key="pct">%</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="4">4</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="5">5</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="6">6</button>
          <button class="btn btn-secondary sci-btn text-cyan" data-key="-">−</button>

          <!-- Row 6 -->
          <button class="btn btn-secondary sci-btn" data-key="inv">1/x</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="1">1</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="2">2</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="3">3</button>
          <button class="btn btn-secondary sci-btn text-cyan" data-key="+">+</button>

          <!-- Row 7 -->
          <button class="btn btn-secondary sci-btn" data-key="plusminus">±</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key="0" style="grid-column: span 2;">0</button>
          <button class="btn btn-secondary sci-btn font-bold text-white" data-key=".">.</button>
          <button class="btn btn-primary sci-btn font-bold" data-key="=" style="background: var(--primary);">=</button>
        </div>
      </div>
    `;

    let expr = '';
    let isDeg = true;
    const disp = container.querySelector('#sci-display');
    const hist = container.querySelector('#sci-history');
    const customInp = container.querySelector('#sci-custom-input');

    function update() {
      disp.textContent = expr || '0';
      if (document.activeElement !== customInp) {
        customInp.value = expr;
      }
    }

    function factorial(n) {
      if (n < 0) return NaN;
      if (n === 0 || n === 1) return 1;
      let r = 1;
      for (let i = 2; i <= Math.min(n, 170); i++) r *= i;
      return r;
    }

    function evaluateExpression() {
      try {
        let evalExpr = expr
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/\^/g, '**')
          .replace(/sqrt\(/gi, 'Math.sqrt(')
          .replace(/sin\(/gi, isDeg ? 'Math.sin((Math.PI/180)*' : 'Math.sin(')
          .replace(/cos\(/gi, isDeg ? 'Math.cos((Math.PI/180)*' : 'Math.cos(')
          .replace(/tan\(/gi, isDeg ? 'Math.tan((Math.PI/180)*' : 'Math.tan(')
          .replace(/log\(/gi, 'Math.log10(')
          .replace(/ln\(/gi, 'Math.log(');

        const res = Function(`'use strict'; return (${evalExpr})`)();
        hist.textContent = `${expr} =`;
        expr = String(Number(res.toFixed(10)));
        update();
      } catch (e) {
        disp.textContent = 'Error';
        hist.textContent = 'Invalid Formula';
      }
    }

    customInp.addEventListener('input', () => {
      expr = customInp.value;
      disp.textContent = expr || '0';
    });

    customInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        evaluateExpression();
      }
    });

    container.querySelectorAll('.sci-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.key;
        if (k === 'clear') {
          expr = '';
          hist.textContent = '';
          update();
        } else if (k === 'backspace') {
          expr = expr.slice(0, -1);
          update();
        } else if (k === 'rad') {
          isDeg = !isDeg;
          btn.textContent = isDeg ? 'DEG' : 'RAD';
        } else if (k === '=') {
          evaluateExpression();
        } else if (k === 'sin' || k === 'cos' || k === 'tan') {
          try {
            let v = parseFloat(expr) || 0;
            if (isDeg) v = (v * Math.PI) / 180;
            let res = 0;
            if (k === 'sin') res = Math.sin(v);
            if (k === 'cos') res = Math.cos(v);
            if (k === 'tan') res = Math.tan(v);
            hist.textContent = `${k}(${expr})`;
            expr = String(Number(res.toFixed(10)));
            update();
          } catch (e) {
            disp.textContent = 'Error';
          }
        } else if (k === 'sqrt') {
          const v = parseFloat(expr) || 0;
          expr = String(Math.sqrt(v));
          update();
        } else if (k === 'log') {
          const v = parseFloat(expr) || 0;
          expr = String(Math.log10(v));
          update();
        } else if (k === 'ln') {
          const v = parseFloat(expr) || 0;
          expr = String(Math.log(v));
          update();
        } else if (k === 'fact') {
          const v = parseInt(expr, 10) || 0;
          expr = String(factorial(v));
          update();
        } else if (k === 'inv') {
          const v = parseFloat(expr) || 0;
          if (v !== 0) expr = String(1 / v);
          update();
        } else if (k === 'pow') {
          expr += '^';
          update();
        } else if (k === 'pct') {
          expr += '/100';
          update();
        } else if (k === 'plusminus') {
          if (expr.startsWith('-')) expr = expr.slice(1);
          else expr = '-' + expr;
          update();
        } else {
          expr += k;
          update();
        }
      });
    });
  },

  // ==========================================
  // 7. GPA & CGPA Calculator
  // ==========================================
  renderGpaCalculator(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-graduation-cap text-purple"></i> Semester Courses</h4>
            <button class="btn btn-sm btn-primary" id="btn-add-course"><i class="fa-solid fa-plus"></i> Add Course</button>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Grading System / Scale</label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 0.5rem;" id="gpa-scale-presets">
              <button type="button" class="step-btn active" data-gpa-scale="4">4.0 Scale (US)</button>
              <button type="button" class="step-btn" data-gpa-scale="10">10.0 Scale (CGPA)</button>
              <button type="button" class="step-btn" data-gpa-scale="custom">Custom Scale</button>
            </div>
            <div id="gpa-custom-scale-wrap" style="display:none; margin-top:0.4rem;">
              <input type="number" id="gpa-custom-scale" class="tool-input" placeholder="Enter custom maximum scale (e.g. 5.0, 7.0, 10.0)" value="4.0" min="1" max="100" step="0.1">
            </div>
          </div>

          <div id="gpa-courses-list" style="display:flex; flex-direction:column; gap:0.75rem; max-height:360px; overflow-y:auto; padding-right:4px;"></div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-award text-amber"></i> Academic Performance</h4>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label">Semester GPA (<span id="gpa-scale-label">4.0 Scale</span>)</span>
              <span class="calc-stat-value text-purple" id="gpa-score-display">3.75</span>
              <span class="badge badge-emerald" id="gpa-standing-badge" style="font-size:0.9rem; padding:0.35rem 0.8rem; margin-top:0.5rem;">First Class with Distinction</span>
            </div>

            <div class="calc-stat-grid">
              <div class="calc-stat-box">
                <span class="label">Total Credit Hours</span>
                <span class="val text-cyan" id="gpa-total-credits">16 Credits</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Total Grade Points</span>
                <span class="val text-emerald" id="gpa-total-points">60.0</span>
              </div>
              <div class="calc-stat-box" style="grid-column: 1 / -1;">
                <span class="label">Percentage Equivalent</span>
                <span class="val text-amber" id="gpa-pct-equiv">~ 95.0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const list = container.querySelector('#gpa-courses-list');
    const scaleBtns = container.querySelectorAll('[data-gpa-scale]');
    const customScaleWrap = container.querySelector('#gpa-custom-scale-wrap');
    const customScaleInp = container.querySelector('#gpa-custom-scale');
    const scaleLabel = container.querySelector('#gpa-scale-label');

    let currentScaleMax = 4.0;

    const baseGradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0 };

    let courses = [
      { name: 'Computer Architecture', credits: 4, grade: 'A' },
      { name: 'Data Structures & Algorithms', credits: 4, grade: 'A+' },
      { name: 'Linear Algebra & Calculus', credits: 4, grade: 'A-' },
      { name: 'Web Engineering Lab', credits: 4, grade: 'A' }
    ];

    function renderCourses() {
      list.innerHTML = '';
      courses.forEach((c, idx) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:grid; grid-template-columns: 2fr 1fr 1fr auto; gap:0.5rem; align-items:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.5rem;';
        row.innerHTML = `
          <input type="text" class="tool-input" placeholder="Course Name" value="${c.name}" data-idx="${idx}" data-field="name" style="padding:0.4rem 0.6rem; font-size:0.85rem;">
          <input type="number" class="tool-input" placeholder="Credits" value="${c.credits}" min="1" max="10" data-idx="${idx}" data-field="credits" style="padding:0.4rem 0.6rem; font-size:0.85rem;">
          <select class="tool-select" data-idx="${idx}" data-field="grade" style="padding:0.4rem 0.6rem; font-size:0.85rem;">
            ${Object.keys(baseGradePoints).map(g => `<option value="${g}" ${c.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>
          <button class="btn btn-sm btn-secondary text-rose" data-idx="${idx}" data-remove style="padding:0.4rem 0.6rem;"><i class="fa-solid fa-trash-can"></i></button>
        `;
        list.appendChild(row);
      });
      calculate();
    }

    function calculate() {
      let totalCredits = 0;
      let totalPoints = 0;

      courses.forEach(c => {
        const cred = parseFloat(c.credits) || 0;
        const normPts = baseGradePoints[c.grade] || 0;
        // Scale proportionally to currentScaleMax
        const pts = (normPts / 4.0) * currentScaleMax;
        totalCredits += cred;
        totalPoints += cred * pts;
      });

      const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
      const gpaNorm = (gpa / currentScaleMax) * 4.0;

      scaleLabel.textContent = `${currentScaleMax} Scale`;
      container.querySelector('#gpa-score-display').textContent = gpa.toFixed(2);
      container.querySelector('#gpa-total-credits').textContent = `${totalCredits} Credits`;
      container.querySelector('#gpa-total-points').textContent = totalPoints.toFixed(1);

      const pctEquivalent = (gpa / currentScaleMax) * 100;
      container.querySelector('#gpa-pct-equiv').textContent = `~ ${pctEquivalent.toFixed(1)}%`;

      const badge = container.querySelector('#gpa-standing-badge');
      if (gpaNorm >= 3.7) {
        badge.textContent = 'Summa Cum Laude / Distinction';
        badge.className = 'badge badge-emerald';
      } else if (gpaNorm >= 3.0) {
        badge.textContent = 'First Division';
        badge.className = 'badge badge-cyan';
      } else if (gpaNorm >= 2.0) {
        badge.textContent = 'Satisfactory';
        badge.className = 'badge badge-amber';
      } else {
        badge.textContent = 'Academic Probation';
        badge.className = 'badge badge-rose';
      }
    }

    scaleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scaleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const s = btn.dataset.gpaScale;
        if (s === 'custom') {
          customScaleWrap.style.display = 'block';
          customScaleInp.focus();
          currentScaleMax = parseFloat(customScaleInp.value) || 4.0;
        } else {
          customScaleWrap.style.display = 'none';
          currentScaleMax = parseFloat(s);
          customScaleInp.value = s;
        }
        calculate();
      });
    });

    customScaleInp.addEventListener('input', () => {
      currentScaleMax = parseFloat(customScaleInp.value) || 4.0;
      calculate();
    });

    list.addEventListener('input', (e) => {
      const idx = e.target.dataset.idx;
      const field = e.target.dataset.field;
      if (idx !== undefined && field) {
        courses[idx][field] = e.target.value;
        calculate();
      }
    });

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove]');
      if (btn) {
        const idx = parseInt(btn.dataset.idx, 10);
        courses.splice(idx, 1);
        renderCourses();
      }
    });

    container.querySelector('#btn-add-course').addEventListener('click', () => {
      courses.push({ name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' });
      renderCourses();
    });

    renderCourses();
  },

  // ==========================================
  // 8. Ohm's Law & Science Engineering
  // ==========================================
  renderOhmsLaw(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-bolt text-cyan"></i> Circuit Values</h4>
            <span class="badge badge-cyan">Physics & EE</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Pick a circuit preset or type any <strong>two custom values</strong> directly below.
          </p>

          <div class="tool-field-group">
            <label class="tool-field-label">Quick Circuit Presets</label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 0.5rem;" id="ohm-presets">
              <button type="button" class="step-btn active" data-ohm-preset="usb">USB 5V</button>
              <button type="button" class="step-btn" data-ohm-preset="car">Car 12V</button>
              <button type="button" class="step-btn" data-ohm-preset="mains">AC 220V</button>
              <button type="button" class="step-btn" data-ohm-preset="custom">Custom</button>
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Voltage (V) — Volts</label>
            <input type="number" id="ohm-v" class="tool-input" placeholder="Type custom Volts (V)..." value="5" step="any">
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Current (I) — Amperes (A)</label>
            <input type="number" id="ohm-i" class="tool-input" placeholder="Type custom Amperes (I)..." value="2" step="any">
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Resistance (R) — Ohms (Ω)</label>
            <input type="number" id="ohm-r" class="tool-input" placeholder="Type custom Ohms (R)..." step="any">
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Power (P) — Watts (W)</label>
            <input type="number" id="ohm-p" class="tool-input" placeholder="Type custom Watts (P)..." step="any">
          </div>

          <button class="btn btn-secondary" id="ohm-btn-reset" style="width:100%;"><i class="fa-solid fa-rotate-left"></i> Reset Values</button>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-circle-nodes text-purple"></i> Solved Parameters</h4>
          </div>

          <div class="calc-results-card">
            <div class="calc-stat-grid" style="grid-template-columns: repeat(2, 1fr);">
              <div class="calc-stat-box">
                <span class="label">Voltage (V)</span>
                <span class="val text-cyan" id="ohm-res-v">5 V</span>
                <span style="font-size:0.75rem; color:var(--text-muted);">V = I × R</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Current (I)</span>
                <span class="val text-emerald" id="ohm-res-i">2 A</span>
                <span style="font-size:0.75rem; color:var(--text-muted);">I = V / R</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Resistance (R)</span>
                <span class="val text-amber" id="ohm-res-r">2.5 Ω</span>
                <span style="font-size:0.75rem; color:var(--text-muted);">R = V / I</span>
              </div>
              <div class="calc-stat-box">
                <span class="label">Power (P)</span>
                <span class="val text-rose" id="ohm-res-p">10 W</span>
                <span style="font-size:0.75rem; color:var(--text-muted);">P = V × I</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const vIn = container.querySelector('#ohm-v');
    const iIn = container.querySelector('#ohm-i');
    const rIn = container.querySelector('#ohm-r');
    const pIn = container.querySelector('#ohm-p');
    const presetBtns = container.querySelectorAll('[data-ohm-preset]');

    function calculate() {
      let v = parseFloat(vIn.value);
      let i = parseFloat(iIn.value);
      let r = parseFloat(rIn.value);
      let p = parseFloat(pIn.value);

      if (!isNaN(v) && !isNaN(i)) {
        r = v / i;
        p = v * i;
      } else if (!isNaN(v) && !isNaN(r)) {
        i = v / r;
        p = (v * v) / r;
      } else if (!isNaN(v) && !isNaN(p)) {
        i = p / v;
        r = (v * v) / p;
      } else if (!isNaN(i) && !isNaN(r)) {
        v = i * r;
        p = i * i * r;
      } else if (!isNaN(i) && !isNaN(p)) {
        v = p / i;
        r = p / (i * i);
      } else if (!isNaN(r) && !isNaN(p)) {
        v = Math.sqrt(p * r);
        i = Math.sqrt(p / r);
      }

      container.querySelector('#ohm-res-v').textContent = !isNaN(v) ? `${v.toFixed(3).replace(/\.?0+$/, '')} V` : '--';
      container.querySelector('#ohm-res-i').textContent = !isNaN(i) ? `${i.toFixed(3).replace(/\.?0+$/, '')} A` : '--';
      container.querySelector('#ohm-res-r').textContent = !isNaN(r) ? `${r.toFixed(3).replace(/\.?0+$/, '')} Ω` : '--';
      container.querySelector('#ohm-res-p').textContent = !isNaN(p) ? `${p.toFixed(3).replace(/\.?0+$/, '')} W` : '--';
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const p = btn.dataset.ohmPreset;
        if (p === 'usb') {
          vIn.value = '5';
          iIn.value = '2';
          rIn.value = '';
          pIn.value = '';
        } else if (p === 'car') {
          vIn.value = '12';
          iIn.value = '4';
          rIn.value = '';
          pIn.value = '';
        } else if (p === 'mains') {
          vIn.value = '220';
          iIn.value = '10';
          rIn.value = '';
          pIn.value = '';
        } else {
          vIn.focus();
        }
        calculate();
      });
    });

    [vIn, iIn, rIn, pIn].forEach(el => {
      el.addEventListener('input', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        const custBtn = container.querySelector('[data-ohm-preset="custom"]');
        if (custBtn) custBtn.classList.add('active');
        calculate();
      });
    });

    container.querySelector('#ohm-btn-reset').addEventListener('click', () => {
      vIn.value = '12';
      iIn.value = '2';
      rIn.value = '';
      pIn.value = '';
      presetBtns.forEach(b => b.classList.remove('active'));
      const carBtn = container.querySelector('[data-ohm-preset="car"]');
      if (carBtn) carBtn.classList.add('active');
      calculate();
    });

    calculate();
  }
};
