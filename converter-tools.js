/* ==========================================================================
   OmniToolbox - Data & Conversion Suite
   Strict INPUT ➔ OUTPUT Converters, Unit Engine, Code & File Encoders
   100% Client-Side Privacy
   ========================================================================== */

const ConverterTools = {

  // ==========================================
  // 1. JSON ➔ CSV & CSV ➔ JSON
  // ==========================================
  renderJsonCsv(container, defaultMode = 'json-to-csv') {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-arrow-right-arrow-left text-emerald"></i> Data Format Interchange</h4>
            <div class="quick-interchange-grid" style="grid-template-columns: 1fr 1fr;">
              <button class="step-btn ${defaultMode === 'json-to-csv' ? 'active' : ''}" id="jcsv-mode-j2c">JSON → CSV</button>
              <button class="step-btn ${defaultMode === 'csv-to-json' ? 'active' : ''}" id="jcsv-mode-c2j">CSV → JSON</button>
            </div>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <label class="tool-field-label" id="jcsv-input-label">Input JSON Data</label>
              <button class="btn btn-sm btn-secondary" id="jcsv-load-sample">Load Sample</button>
            </div>
            <textarea id="jcsv-input-text" class="tool-textarea" style="height: 280px; font-family:var(--font-mono); font-size:0.85rem;" placeholder="Paste data here..."></textarea>
          </div>

          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-primary" id="jcsv-btn-convert" style="flex:1;">
              <i class="fa-solid fa-bolt"></i> Convert Data
            </button>
            <button class="btn btn-secondary" id="jcsv-btn-clear"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4 id="jcsv-output-label"><i class="fa-solid fa-file-csv text-cyan"></i> CSV Output</h4>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="jcsv-btn-copy"><i class="fa-solid fa-copy"></i> Copy</button>
              <button class="btn btn-sm btn-primary" id="jcsv-btn-download"><i class="fa-solid fa-download"></i> Download</button>
            </div>
          </div>

          <div class="tool-field-group">
            <textarea id="jcsv-output-text" class="tool-textarea" style="height: 380px; font-family:var(--font-mono); font-size:0.85rem;" readonly placeholder="Converted output will appear here..."></textarea>
          </div>
        </div>
      </div>
    `;

    let mode = defaultMode;
    const j2cBtn = container.querySelector('#jcsv-mode-j2c');
    const c2jBtn = container.querySelector('#jcsv-mode-c2j');
    const inLabel = container.querySelector('#jcsv-input-label');
    const outLabel = container.querySelector('#jcsv-output-label');
    const inText = container.querySelector('#jcsv-input-text');
    const outText = container.querySelector('#jcsv-output-text');
    const sampleBtn = container.querySelector('#jcsv-load-sample');

    const sampleJson = JSON.stringify([
      { id: 101, name: "Alice Morgan", role: "Lead Engineer", department: "Architecture", active: true },
      { id: 102, name: "Bob Chen", role: "Product Designer", department: "UX Design", active: true },
      { id: 103, name: "Charlie Davis", role: "DevOps Specialist", department: "Infrastructure", active: false }
    ], null, 2);

    const sampleCsv = `id,name,role,department,active
101,Alice Morgan,Lead Engineer,Architecture,true
102,Bob Chen,Product Designer,UX Design,true
103,Charlie Davis,DevOps Specialist,Infrastructure,false`;

    function setMode(newMode) {
      mode = newMode;
      if (mode === 'json-to-csv') {
        j2cBtn.classList.add('active');
        c2jBtn.classList.remove('active');
        inLabel.textContent = 'Input JSON (Object or Array)';
        outLabel.innerHTML = '<i class="fa-solid fa-file-csv text-cyan"></i> CSV Output';
        inText.placeholder = 'Paste JSON array of objects here...';
        inText.value = sampleJson;
      } else {
        c2jBtn.classList.add('active');
        j2cBtn.classList.remove('active');
        inLabel.textContent = 'Input CSV Text';
        outLabel.innerHTML = '<i class="fa-solid fa-table-list text-purple"></i> JSON Output';
        inText.placeholder = 'Paste comma-separated rows with header here...';
        inText.value = sampleCsv;
      }
      convert();
    }

    function jsonToCsv(jsonStr) {
      const data = JSON.parse(jsonStr);
      const arr = Array.isArray(data) ? data : [data];
      if (!arr.length) return '';

      const keys = Object.keys(arr[0]);
      const headerRow = keys.map(k => `"${k.replace(/"/g, '""')}"`).join(',');

      const dataRows = arr.map(obj => {
        return keys.map(k => {
          let val = obj[k];
          if (val === null || val === undefined) val = '';
          else if (typeof val === 'object') val = JSON.stringify(val);
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(',');
      });

      return [headerRow, ...dataRows].join('\n');
    }

    function csvToJson(csvStr) {
      const lines = csvStr.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
      if (!lines.length) return '[]';

      // Parse headers
      const headers = parseCsvLine(lines[0]);
      const results = [];

      for (let i = 1; i < lines.length; i++) {
        const row = parseCsvLine(lines[i]);
        const obj = {};
        headers.forEach((h, colIdx) => {
          let val = row[colIdx] !== undefined ? row[colIdx] : '';
          // Type casting
          if (val.toLowerCase() === 'true') val = true;
          else if (val.toLowerCase() === 'false') val = false;
          else if (!isNaN(val) && val.trim() !== '') val = Number(val);
          obj[h] = val;
        });
        results.push(obj);
      }

      return JSON.stringify(results, null, 2);
    }

    function parseCsvLine(line) {
      const result = [];
      let cur = '';
      let insideQuote = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          if (insideQuote && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            insideQuote = !insideQuote;
          }
        } else if (c === ',' && !insideQuote) {
          result.push(cur.trim());
          cur = '';
        } else {
          cur += c;
        }
      }
      result.push(cur.trim());
      return result;
    }

    function convert() {
      const val = inText.value.trim();
      if (!val) {
        outText.value = '';
        return;
      }

      try {
        if (mode === 'json-to-csv') {
          outText.value = jsonToCsv(val);
        } else {
          outText.value = csvToJson(val);
        }
      } catch (err) {
        outText.value = `Conversion Error: ${err.message}`;
      }
    }

    j2cBtn.addEventListener('click', () => setMode('json-to-csv'));
    c2jBtn.addEventListener('click', () => setMode('csv-to-json'));

    container.querySelector('#jcsv-btn-convert').addEventListener('click', convert);
    inText.addEventListener('input', convert);

    sampleBtn.addEventListener('click', () => {
      inText.value = mode === 'json-to-csv' ? sampleJson : sampleCsv;
      convert();
    });

    container.querySelector('#jcsv-btn-clear').addEventListener('click', () => {
      inText.value = '';
      outText.value = '';
    });

    container.querySelector('#jcsv-btn-copy').addEventListener('click', () => {
      App.copyToClipboard(outText.value, 'Converted data copied!');
    });

    container.querySelector('#jcsv-btn-download').addEventListener('click', () => {
      const content = outText.value;
      if (!content) return;
      const isCsv = mode === 'json-to-csv';
      const blob = new Blob([content], { type: isCsv ? 'text/csv' : 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = isCsv ? 'converted_data.csv' : 'converted_data.json';
      a.click();
    });

    setMode(defaultMode);
  },

  // ==========================================
  // 2. JSON ➔ TypeScript / Python / C#
  // ==========================================
  renderJsonToCode(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-code text-purple"></i> Schema Converter</h4>
            <span class="badge badge-purple">Types & Models</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Target Language</label>
            <div class="quick-interchange-grid" style="grid-template-columns: repeat(3, 1fr);">
              <button class="step-btn active" data-lang="ts">TypeScript</button>
              <button class="step-btn" data-lang="py">Python</button>
              <button class="step-btn" data-lang="cs">C#</button>
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Root Model Name</label>
            <input type="text" id="jcode-root-name" class="tool-input" value="ApiResponse">
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Input JSON</label>
            <textarea id="jcode-input" class="tool-textarea" style="height:250px; font-family:var(--font-mono); font-size:0.85rem;"></textarea>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4 id="jcode-target-header"><i class="fa-solid fa-file-code text-cyan"></i> Generated TypeScript Interfaces</h4>
            <button class="btn btn-sm btn-secondary" id="jcode-btn-copy"><i class="fa-solid fa-copy"></i> Copy Code</button>
          </div>

          <textarea id="jcode-output" class="tool-textarea" style="height:380px; font-family:var(--font-mono); font-size:0.85rem;" readonly></textarea>
        </div>
      </div>
    `;

    let lang = 'ts';
    const langBtns = container.querySelectorAll('[data-lang]');
    const rootInput = container.querySelector('#jcode-root-name');
    const inArea = container.querySelector('#jcode-input');
    const outArea = container.querySelector('#jcode-output');
    const header = container.querySelector('#jcode-target-header');

    inArea.value = JSON.stringify({
      id: "usr_99182",
      user: {
        firstName: "Sarah",
        lastName: "Connor",
        age: 32,
        isVerified: true
      },
      tags: ["cybersecurity", "cloud", "ai"],
      balance: 1450.75
    }, null, 2);

    function inferType(val) {
      if (val === null) return 'any';
      if (Array.isArray(val)) {
        if (!val.length) return 'any[]';
        return `${inferType(val[0])}[]`;
      }
      const t = typeof val;
      if (t === 'string') return 'string';
      if (t === 'number') return 'number';
      if (t === 'boolean') return 'boolean';
      if (t === 'object') return 'Record<string, any>';
      return 'any';
    }

    function generateCode() {
      const root = rootInput.value.trim() || 'RootModel';
      let json = {};
      try {
        json = JSON.parse(inArea.value);
      } catch (e) {
        outArea.value = `// Invalid JSON: ${e.message}`;
        return;
      }

      if (lang === 'ts') {
        header.innerHTML = '<i class="fa-solid fa-file-code text-cyan"></i> Generated TypeScript Interface';
        outArea.value = generateTypeScript(json, root);
      } else if (lang === 'py') {
        header.innerHTML = '<i class="fa-brands fa-python text-amber"></i> Generated Python Dataclass / Pydantic';
        outArea.value = generatePython(json, root);
      } else {
        header.innerHTML = '<i class="fa-solid fa-file-code text-purple"></i> Generated C# Class';
        outArea.value = generateCSharp(json, root);
      }
    }

    function generateTypeScript(obj, name) {
      let interfaces = [];
      function build(curr, ifName) {
        let lines = [`export interface ${ifName} {`];
        for (const [k, v] of Object.entries(curr)) {
          if (v && typeof v === 'object' && !Array.isArray(v)) {
            const nestedName = k.charAt(0).toUpperCase() + k.slice(1);
            build(v, nestedName);
            lines.push(`  ${k}: ${nestedName};`);
          } else {
            lines.push(`  ${k}: ${inferType(v)};`);
          }
        }
        lines.push('}');
        interfaces.unshift(lines.join('\n'));
      }
      build(obj, name);
      return interfaces.join('\n\n');
    }

    function generatePython(obj, name) {
      let classes = [`from typing import List, Optional\nfrom pydantic import BaseModel\n`];
      function build(curr, clsName) {
        let lines = [`class ${clsName}(BaseModel):`];
        for (const [k, v] of Object.entries(curr)) {
          let pyType = 'str';
          if (typeof v === 'number') pyType = Number.isInteger(v) ? 'int' : 'float';
          else if (typeof v === 'boolean') pyType = 'bool';
          else if (Array.isArray(v)) pyType = 'List[str]';
          else if (v && typeof v === 'object') {
            const nested = k.charAt(0).toUpperCase() + k.slice(1);
            build(v, nested);
            pyType = nested;
          }
          lines.push(`    ${k}: ${pyType}`);
        }
        classes.push(lines.join('\n'));
      }
      build(obj, name);
      return classes.join('\n\n');
    }

    function generateCSharp(obj, name) {
      let classes = [];
      function build(curr, clsName) {
        let lines = [`public class ${clsName}\n{`];
        for (const [k, v] of Object.entries(curr)) {
          let csType = 'string';
          if (typeof v === 'number') csType = Number.isInteger(v) ? 'int' : 'double';
          else if (typeof v === 'boolean') csType = 'bool';
          else if (Array.isArray(v)) csType = 'List<string>';
          else if (v && typeof v === 'object') {
            const nested = k.charAt(0).toUpperCase() + k.slice(1);
            build(v, nested);
            csType = nested;
          }
          const propName = k.charAt(0).toUpperCase() + k.slice(1);
          lines.push(`    public ${csType} ${propName} { get; set; }`);
        }
        lines.push('}');
        classes.push(lines.join('\n'));
      }
      build(obj, name);
      return `using System;\nusing System.Collections.Generic;\n\n` + classes.join('\n\n');
    }

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        lang = btn.dataset.lang;
        generateCode();
      });
    });

    [inArea, rootInput].forEach(el => el.addEventListener('input', generateCode));

    container.querySelector('#jcode-btn-copy').addEventListener('click', () => {
      App.copyToClipboard(outArea.value, 'Generated code copied!');
    });

    generateCode();
  },

  // ==========================================
  // 3. Universal Unit Converter (Length, Weight, Temp, etc.)
  // ==========================================
  renderUnitConverter(container) {
    const unitsData = {
      length: {
        name: 'Length & Distance',
        units: {
          meter: { name: 'Meter (m)', factor: 1 },
          kilometer: { name: 'Kilometer (km)', factor: 1000 },
          centimeter: { name: 'Centimeter (cm)', factor: 0.01 },
          millimeter: { name: 'Millimeter (mm)', factor: 0.001 },
          mile: { name: 'Mile (mi)', factor: 1609.344 },
          yard: { name: 'Yard (yd)', factor: 0.9144 },
          foot: { name: 'Foot (ft)', factor: 0.3048 },
          inch: { name: 'Inch (in)', factor: 0.0254 }
        }
      },
      weight: {
        name: 'Weight & Mass',
        units: {
          kilogram: { name: 'Kilogram (kg)', factor: 1 },
          gram: { name: 'Gram (g)', factor: 0.001 },
          milligram: { name: 'Milligram (mg)', factor: 0.000001 },
          pound: { name: 'Pound (lb)', factor: 0.45359237 },
          ounce: { name: 'Ounce (oz)', factor: 0.02834952 },
          metric_ton: { name: 'Metric Ton (t)', factor: 1000 }
        }
      },
      temperature: {
        name: 'Temperature',
        units: {
          celsius: { name: 'Celsius (°C)', special: true },
          fahrenheit: { name: 'Fahrenheit (°F)', special: true },
          kelvin: { name: 'Kelvin (K)', special: true }
        }
      },
      data: {
        name: 'Digital Storage',
        units: {
          byte: { name: 'Byte (B)', factor: 1 },
          kilobyte: { name: 'Kilobyte (KB)', factor: 1024 },
          megabyte: { name: 'Megabyte (MB)', factor: 1048576 },
          gigabyte: { name: 'Gigabyte (GB)', factor: 1073741824 },
          terabyte: { name: 'Terabyte (TB)', factor: 1099511627776 },
          petabyte: { name: 'Petabyte (PB)', factor: 1125899906842624 }
        }
      },
      speed: {
        name: 'Speed & Velocity',
        units: {
          mps: { name: 'Meters / Sec (m/s)', factor: 1 },
          kmh: { name: 'Kilometers / Hour (km/h)', factor: 0.277778 },
          mph: { name: 'Miles / Hour (mph)', factor: 0.44704 },
          knot: { name: 'Knot (kn)', factor: 0.514444 }
        }
      }
    };

    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-scale-balanced text-cyan"></i> Unit Conversion Engine</h4>
            <span class="badge badge-cyan">Universal</span>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">Category</label>
            <select id="uconv-cat" class="tool-select">
              ${Object.keys(unitsData).map(k => `<option value="${k}">${unitsData[k].name}</option>`).join('')}
            </select>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">From Unit</label>
            <select id="uconv-from-unit" class="tool-select"></select>
            <input type="number" id="uconv-from-val" class="tool-input" value="100" style="margin-top:0.5rem;" step="any">
          </div>

          <div style="text-align:center; margin: 0.5rem 0;">
            <button class="btn btn-secondary" id="uconv-swap-btn" style="border-radius:50%; width:42px; height:42px; padding:0;">
              <i class="fa-solid fa-arrow-down-up-across-line"></i>
            </button>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label">To Unit</label>
            <select id="uconv-to-unit" class="tool-select"></select>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-calculator text-emerald"></i> Exact Converted Value</h4>
            <button class="btn btn-sm btn-secondary" id="uconv-btn-copy"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>

          <div class="calc-results-card">
            <div class="calc-hero-stat">
              <span class="calc-stat-label" id="uconv-formula-text">100 Meter =</span>
              <span class="calc-stat-value text-cyan" id="uconv-result-val">328.084 Feet</span>
            </div>

            <div class="calc-stat-grid" id="uconv-multi-grid" style="grid-template-columns: repeat(2, 1fr);"></div>
          </div>
        </div>
      </div>
    `;

    const catSelect = container.querySelector('#uconv-cat');
    const fromSelect = container.querySelector('#uconv-from-unit');
    const toSelect = container.querySelector('#uconv-to-unit');
    const fromVal = container.querySelector('#uconv-from-val');
    const resVal = container.querySelector('#uconv-result-val');
    const formulaText = container.querySelector('#uconv-formula-text');
    const multiGrid = container.querySelector('#uconv-multi-grid');

    function populateUnits() {
      const cat = catSelect.value;
      const units = unitsData[cat].units;
      const keys = Object.keys(units);

      fromSelect.innerHTML = keys.map(k => `<option value="${k}">${units[k].name}</option>`).join('');
      toSelect.innerHTML = keys.map(k => `<option value="${k}">${units[k].name}</option>`).join('');

      if (keys.length > 1) {
        toSelect.selectedIndex = 1;
      }
      convert();
    }

    function convert() {
      const cat = catSelect.value;
      const uGroup = unitsData[cat].units;
      const fromU = fromSelect.value;
      const toU = toSelect.value;
      const val = parseFloat(fromVal.value);

      if (isNaN(val)) {
        resVal.textContent = '--';
        return;
      }

      let result = 0;

      if (cat === 'temperature') {
        // Temperature custom conversion
        let c = val;
        if (fromU === 'fahrenheit') c = (val - 32) * (5 / 9);
        else if (fromU === 'kelvin') c = val - 273.15;

        if (toU === 'celsius') result = c;
        else if (toU === 'fahrenheit') result = (c * (9 / 5)) + 32;
        else if (toU === 'kelvin') result = c + 273.15;
      } else {
        const base = val * uGroup[fromU].factor;
        result = base / uGroup[toU].factor;
      }

      formulaText.textContent = `${val} ${uGroup[fromU].name} =`;
      resVal.textContent = `${Number(result.toFixed(6))} ${uGroup[toU].name}`;

      // Populate other common equivalents
      multiGrid.innerHTML = '';
      Object.keys(uGroup).forEach(k => {
        if (k === fromU) return;
        let equiv = 0;
        if (cat === 'temperature') {
          let c = val;
          if (fromU === 'fahrenheit') c = (val - 32) * (5 / 9);
          else if (fromU === 'kelvin') c = val - 273.15;
          if (k === 'celsius') equiv = c;
          else if (k === 'fahrenheit') equiv = (c * (9 / 5)) + 32;
          else if (k === 'kelvin') equiv = c + 273.15;
        } else {
          equiv = (val * uGroup[fromU].factor) / uGroup[k].factor;
        }

        const box = document.createElement('div');
        box.className = 'calc-stat-box';
        box.innerHTML = `
          <span class="label">${uGroup[k].name}</span>
          <span class="val text-white" style="font-size:1.05rem;">${Number(equiv.toFixed(4))}</span>
        `;
        multiGrid.appendChild(box);
      });
    }

    catSelect.addEventListener('change', populateUnits);
    [fromSelect, toSelect, fromVal].forEach(el => el.addEventListener('input', convert));

    container.querySelector('#uconv-swap-btn').addEventListener('click', () => {
      const tmp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = tmp;
      convert();
    });

    container.querySelector('#uconv-btn-copy').addEventListener('click', () => {
      App.copyToClipboard(resVal.textContent, 'Converted unit copied!');
    });

    populateUnits();
  },

  // ==========================================
  // 4. Color Converter: HEX ➔ RGB ➔ HSL
  // ==========================================
  renderColorConverter(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-palette text-cyan"></i> Color Converter</h4>
            <span class="badge badge-cyan">CSS / Design</span>
          </div>

          <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1.5rem;">
            <input type="color" id="col-native-picker" value="#38bdf8" style="width:64px; height:64px; border:none; border-radius:12px; cursor:pointer; background:none;">
            <div style="flex:1;">
              <label class="tool-field-label">HEX Code</label>
              <input type="text" id="col-hex-input" class="tool-input" value="#38bdf8" placeholder="#000000">
            </div>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Red (R)</label>
              <span id="col-disp-r" class="font-bold text-rose">56</span>
            </div>
            <input type="range" id="col-range-r" min="0" max="255" value="56" class="tool-slider">
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Green (G)</label>
              <span id="col-disp-g" class="font-bold text-emerald">189</span>
            </div>
            <input type="range" id="col-range-g" min="0" max="255" value="189" class="tool-slider">
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between;">
              <label class="tool-field-label">Blue (B)</label>
              <span id="col-disp-b" class="font-bold text-cyan">248</span>
            </div>
            <input type="range" id="col-range-b" min="0" max="255" value="248" class="tool-slider">
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-swatchbook text-purple"></i> Formats & CSS Codes</h4>
          </div>

          <div id="col-preview-box" style="height:120px; border-radius:var(--radius-lg); background:#38bdf8; margin-bottom:1.5rem; box-shadow:0 10px 25px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; color:#000; font-weight:700; font-size:1.25rem;">
            #38bdf8
          </div>

          <div class="calc-stat-grid" style="grid-template-columns: 1fr;">
            <div class="calc-stat-box" style="cursor:pointer;" id="copy-hex-box" title="Click to copy">
              <span class="label">HEX</span>
              <span class="val text-cyan" id="col-val-hex">#38bdf8</span>
            </div>
            <div class="calc-stat-box" style="cursor:pointer;" id="copy-rgb-box" title="Click to copy">
              <span class="label">RGB</span>
              <span class="val text-emerald" id="col-val-rgb">rgb(56, 189, 248)</span>
            </div>
            <div class="calc-stat-box" style="cursor:pointer;" id="copy-hsl-box" title="Click to copy">
              <span class="label">HSL</span>
              <span class="val text-purple" id="col-val-hsl">hsl(198, 93%, 60%)</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const picker = container.querySelector('#col-native-picker');
    const hexInput = container.querySelector('#col-hex-input');
    const rRange = container.querySelector('#col-range-r');
    const gRange = container.querySelector('#col-range-g');
    const bRange = container.querySelector('#col-range-b');
    const rDisp = container.querySelector('#col-disp-r');
    const gDisp = container.querySelector('#col-disp-g');
    const bDisp = container.querySelector('#col-disp-b');

    const preview = container.querySelector('#col-preview-box');
    const hexVal = container.querySelector('#col-val-hex');
    const rgbVal = container.querySelector('#col-val-rgb');
    const hslVal = container.querySelector('#col-val-hsl');

    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    function updateFromRgb(r, g, b) {
      rDisp.textContent = r;
      gDisp.textContent = g;
      bDisp.textContent = b;

      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      const rgb = `rgb(${r}, ${g}, ${b})`;
      const [h, s, l] = rgbToHsl(r, g, b);
      const hsl = `hsl(${h}, ${s}%, ${l}%)`;

      preview.style.background = rgb;
      preview.textContent = hex.toUpperCase();
      preview.style.color = l > 60 ? '#000' : '#fff';

      picker.value = hex;
      hexInput.value = hex;
      hexVal.textContent = hex.toUpperCase();
      rgbVal.textContent = rgb;
      hslVal.textContent = hsl;
    }

    function handleHexInput() {
      let hex = hexInput.value.trim().replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          rRange.value = r;
          gRange.value = g;
          bRange.value = b;
          updateFromRgb(r, g, b);
        }
      }
    }

    picker.addEventListener('input', () => {
      hexInput.value = picker.value;
      handleHexInput();
    });

    hexInput.addEventListener('input', handleHexInput);

    [rRange, gRange, bRange].forEach(range => {
      range.addEventListener('input', () => {
        updateFromRgb(parseInt(rRange.value, 10), parseInt(gRange.value, 10), parseInt(bRange.value, 10));
      });
    });

    container.querySelector('#copy-hex-box').addEventListener('click', () => App.copyToClipboard(hexVal.textContent, 'HEX copied!'));
    container.querySelector('#copy-rgb-box').addEventListener('click', () => App.copyToClipboard(rgbVal.textContent, 'RGB copied!'));
    container.querySelector('#copy-hsl-box').addEventListener('click', () => App.copyToClipboard(hslVal.textContent, 'HSL copied!'));

    updateFromRgb(56, 189, 248);
  },

  // ==========================================
  // 5. Text ➔ Binary & Binary ➔ Text
  // ==========================================
  renderTextBinary(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-microchip text-cyan"></i> Binary Converter</h4>
            <div class="quick-interchange-grid" style="grid-template-columns: 1fr 1fr;">
              <button class="step-btn active" id="tb-mode-t2b">Text → Binary</button>
              <button class="step-btn" id="tb-mode-b2t">Binary → Text</button>
            </div>
          </div>

          <div class="tool-field-group">
            <label class="tool-field-label" id="tb-input-label">Text Input</label>
            <textarea id="tb-input" class="tool-textarea" style="height:280px; font-family:var(--font-mono); font-size:0.9rem;" placeholder="Type text here...">Hello World! Universal Utilities</textarea>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4 id="tb-output-label"><i class="fa-solid fa-microchip text-emerald"></i> Binary Output (8-bit)</h4>
            <button class="btn btn-sm btn-secondary" id="tb-btn-copy"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>

          <textarea id="tb-output" class="tool-textarea" style="height:360px; font-family:var(--font-mono); font-size:0.9rem; word-break:break-all;" readonly></textarea>
        </div>
      </div>
    `;

    let isTextToBin = true;
    const t2bBtn = container.querySelector('#tb-mode-t2b');
    const b2tBtn = container.querySelector('#tb-mode-b2t');
    const inArea = container.querySelector('#tb-input');
    const outArea = container.querySelector('#tb-output');
    const inLabel = container.querySelector('#tb-input-label');
    const outLabel = container.querySelector('#tb-output-label');

    function convert() {
      const val = inArea.value;
      if (!val) {
        outArea.value = '';
        return;
      }

      if (isTextToBin) {
        outArea.value = Array.from(val).map(char => {
          return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
      } else {
        const binChunks = val.trim().split(/[\s,]+/);
        outArea.value = binChunks.map(bin => {
          return String.fromCharCode(parseInt(bin, 2));
        }).join('');
      }
    }

    t2bBtn.addEventListener('click', () => {
      isTextToBin = true;
      t2bBtn.classList.add('active');
      b2tBtn.classList.remove('active');
      inLabel.textContent = 'Text Input';
      outLabel.innerHTML = '<i class="fa-solid fa-microchip text-emerald"></i> Binary Output (8-bit)';
      inArea.value = 'Hello World!';
      convert();
    });

    b2tBtn.addEventListener('click', () => {
      isTextToBin = false;
      b2tBtn.classList.add('active');
      t2bBtn.classList.remove('active');
      inLabel.textContent = 'Binary Input (8-bit bytes)';
      outLabel.innerHTML = '<i class="fa-solid fa-font text-cyan"></i> Decoded Text';
      inArea.value = '01001000 01100101 01101100 01101100 01101111';
      convert();
    });

    inArea.addEventListener('input', convert);
    container.querySelector('#tb-btn-copy').addEventListener('click', () => App.copyToClipboard(outArea.value, 'Binary result copied!'));

    convert();
  },

  // ==========================================
  // 6. File ➔ SHA-256 & File ➔ SHA-512
  // ==========================================
  renderFileHash(container) {
    container.innerHTML = `
      <div class="tool-workspace-grid">
        <div class="tool-control-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-file-shield text-emerald"></i> File Integrity Suite</h4>
            <span class="badge badge-emerald">CryptoSubtle</span>
          </div>

          <div class="drop-zone" id="fhash-drop-zone">
            <i class="fa-solid fa-cloud-arrow-up drop-icon" style="color:var(--accent-emerald);"></i>
            <h4 class="drop-title">Drop Any File Here</h4>
            <p class="drop-subtitle">Computes SHA-256, SHA-512, and MD5 locally in your browser</p>
            <input type="file" id="fhash-file-input" style="display:none;">
            <button class="btn btn-primary" onclick="document.getElementById('fhash-file-input').click();">
              <i class="fa-solid fa-folder-open"></i> Select File
            </button>
          </div>

          <div id="fhash-file-meta" style="display:none; margin-top:1rem; padding:0.75rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-md);">
            <div style="font-weight:600; color:#fff;" id="fhash-meta-name">file.ext</div>
            <div style="font-size:0.8rem; color:var(--text-muted);" id="fhash-meta-size">0 KB</div>
          </div>
        </div>

        <div class="tool-preview-panel">
          <div class="tool-panel-header">
            <h4><i class="fa-solid fa-fingerprint text-cyan"></i> Cryptographic Hashes</h4>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <label class="tool-field-label text-cyan font-bold">File → SHA-256</label>
              <button class="btn btn-sm btn-secondary" id="fhash-copy-256"><i class="fa-solid fa-copy"></i></button>
            </div>
            <textarea id="fhash-out-256" class="tool-textarea" style="height:70px; font-family:var(--font-mono); font-size:0.8rem;" readonly placeholder="Drop a file to compute..."></textarea>
          </div>

          <div class="tool-field-group">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <label class="tool-field-label text-purple font-bold">File → SHA-512</label>
              <button class="btn btn-sm btn-secondary" id="fhash-copy-512"><i class="fa-solid fa-copy"></i></button>
            </div>
            <textarea id="fhash-out-512" class="tool-textarea" style="height:90px; font-family:var(--font-mono); font-size:0.8rem;" readonly placeholder="Drop a file to compute..."></textarea>
          </div>
        </div>
      </div>
    `;

    const dropZone = container.querySelector('#fhash-drop-zone');
    const fileInput = container.querySelector('#fhash-file-input');
    const metaBox = container.querySelector('#fhash-file-meta');
    const metaName = container.querySelector('#fhash-meta-name');
    const metaSize = container.querySelector('#fhash-meta-size');
    const out256 = container.querySelector('#fhash-out-256');
    const out512 = container.querySelector('#fhash-out-512');

    async function processFile(file) {
      if (!file) return;
      metaBox.style.display = 'block';
      metaName.textContent = file.name;
      metaSize.textContent = `${App.formatBytes(file.size)} (${file.type || 'unknown type'})`;

      out256.value = 'Computing SHA-256 hash...';
      out512.value = 'Computing SHA-512 hash...';

      const arrayBuffer = await file.arrayBuffer();

      // SHA-256
      const hash256 = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray256 = Array.from(new Uint8Array(hash256));
      out256.value = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

      // SHA-512
      const hash512 = await crypto.subtle.digest('SHA-512', arrayBuffer);
      const hashArray512 = Array.from(new Uint8Array(hash512));
      out512.value = hashArray512.map(b => b.toString(16).padStart(2, '0')).join('');

      App.showToast('Cryptographic hashes computed successfully!', 'success');
    }

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) processFile(e.target.files[0]);
    });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
    });

    container.querySelector('#fhash-copy-256').addEventListener('click', () => App.copyToClipboard(out256.value, 'SHA-256 hash copied!'));
    container.querySelector('#fhash-copy-512').addEventListener('click', () => App.copyToClipboard(out512.value, 'SHA-512 hash copied!'));
  }
};
