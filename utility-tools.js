/* ==========================================================================
   OmniToolbox - Daily Productivity & Utility Tools
   QR Code Studio, Password Generator, Text Analyzer & Case Converter,
   Diff Checker, Unit & Timestamp Converter, Hash Generator, Color Studio
   ========================================================================== */

const UtilityTools = {
  // 1. QR Code Generator & Scanner
  renderQrStudio(container) {
    container.innerHTML = `
      <div class="tabs-header">
        <button class="tab-btn active" data-qr-tab="gen"><i class="fa-solid fa-qrcode"></i> Generate QR Code</button>
        <button class="tab-btn" data-qr-tab="scan"><i class="fa-solid fa-camera"></i> Scan / Decode QR</button>
      </div>

      <!-- Tab 1: QR Generator -->
      <div id="tab-qr-gen" class="tab-content-panel">
        <div class="qr-split-pane">
          <!-- Left Control Column -->
          <div class="pane-card" style="display:flex; flex-direction:column; gap:1.25rem;">
            
            <!-- Section 0: 1-Click Pro Design Themes (16 Curated Styles) -->
            <div>
              <div class="pane-header" style="margin-bottom:0.6rem;">
                <span><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--accent-purple);"></i> 1-Click Pro Design Themes</span>
              </div>
              <div class="qr-preset-grid">
                <div class="qr-theme-card active" data-qr-theme="classic">
                  <div class="qr-theme-icon" style="background:#000000; color:#ffffff;"><i class="fa-solid fa-qrcode"></i></div>
                  <div class="qr-theme-name">Classic Clean</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="cyber">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #06b6d4, #ec4899); color:#ffffff;"><i class="fa-solid fa-bolt"></i></div>
                  <div class="qr-theme-name">Cyberpunk Neon</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="emerald">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #059669, #10b981); color:#ffffff;"><i class="fa-solid fa-leaf"></i></div>
                  <div class="qr-theme-name">Emerald Eco</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="sunset">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #f97316, #a855f7); color:#ffffff;"><i class="fa-solid fa-sun"></i></div>
                  <div class="qr-theme-name">Sunset Glow</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="royal">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #f59e0b, #b45309); color:#ffffff;"><i class="fa-solid fa-crown"></i></div>
                  <div class="qr-theme-name">Royal Luxury</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="violet">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #8b5cf6, #6366f1); color:#ffffff;"><i class="fa-solid fa-gem"></i></div>
                  <div class="qr-theme-name">Midnight Violet</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="candy">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #f43f5e, #fb7185); color:#ffffff;"><i class="fa-solid fa-heart"></i></div>
                  <div class="qr-theme-name">Candy Pop</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="navy">
                  <div class="qr-theme-icon" style="background:#1e3a8a; color:#ffffff;"><i class="fa-solid fa-building"></i></div>
                  <div class="qr-theme-name">Corporate Pro</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="crimson">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #dc2626, #991b1b); color:#ffffff;"><i class="fa-solid fa-fire"></i></div>
                  <div class="qr-theme-name">Ruby Bold</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="minimal-dark">
                  <div class="qr-theme-icon" style="background:#18181b; color:#ffffff; border:1px solid #3f3f46;"><i class="fa-solid fa-moon"></i></div>
                  <div class="qr-theme-name">Minimal Dark</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="ocean">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #0284c7, #06b6d4); color:#ffffff;"><i class="fa-solid fa-water"></i></div>
                  <div class="qr-theme-name">Ocean Breeze</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="matrix">
                  <div class="qr-theme-icon" style="background:#000000; color:#22c55e; border:1px solid #22c55e;"><i class="fa-solid fa-terminal"></i></div>
                  <div class="qr-theme-name">Matrix Cyber</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="sakura">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #f472b6, #fb7185); color:#ffffff;"><i class="fa-solid fa-fan"></i></div>
                  <div class="qr-theme-name">Sakura Bloom</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="coffee">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #78350f, #d97706); color:#ffffff;"><i class="fa-solid fa-mug-hot"></i></div>
                  <div class="qr-theme-name">Coffee Latte</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="arctic">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #38bdf8, #818cf8); color:#ffffff;"><i class="fa-solid fa-snowflake"></i></div>
                  <div class="qr-theme-name">Arctic Glacier</div>
                </div>
                <div class="qr-theme-card" data-qr-theme="solar">
                  <div class="qr-theme-icon" style="background:linear-gradient(135deg, #ef4444, #facc15); color:#ffffff;"><i class="fa-solid fa-sun-plant-wilt"></i></div>
                  <div class="qr-theme-name">Solar Flare</div>
                </div>
              </div>
            </div>

            <!-- Section 1: QR Payload & Type -->
            <div style="border-top:1px solid var(--border-subtle); padding-top:1rem;">
              <div class="pane-header" style="margin-bottom:0.75rem;">
                <span><i class="fa-solid fa-pen-to-square"></i> QR Content & Type</span>
              </div>
              <div class="form-group">
                <label class="form-label">Content Type</label>
                <select id="qr-type-select" class="form-control">
                  <option value="url">Website URL (https://...)</option>
                  <option value="text">Plain Text / Note</option>
                  <option value="wifi">WiFi Network Login</option>
                  <option value="email">Email Address</option>
                  <option value="phone">Phone / WhatsApp</option>
                </select>
              </div>

              <div id="qr-input-fields">
                <div class="form-group" id="qr-main-wrap">
                  <label class="form-label" id="qr-main-label">Website URL</label>
                  <input type="text" id="qr-main-input" class="form-control" value="https://google.com" placeholder="https://example.com">
                </div>

                <div id="qr-wifi-fields" style="display:none;">
                  <div class="form-group">
                    <label class="form-label">Network Name (SSID)</label>
                    <input type="text" id="qr-wifi-ssid" class="form-control" placeholder="HomeWiFi_5G">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" id="qr-wifi-pass" class="form-control" placeholder="WiFiPassword123">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Encryption Type</label>
                    <select id="qr-wifi-type" class="form-control">
                      <option value="WPA">WPA / WPA2 / WPA3 (Default)</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open Network)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: QR Shapes & Patterns (Design Customization) -->
            <div style="border-top:1px solid var(--border-subtle); padding-top:1rem;">
              <div class="pane-header" style="margin-bottom:0.75rem;">
                <span><i class="fa-solid fa-shapes"></i> QR Body Dots & Corner Eye Designs</span>
              </div>

              <!-- Body Dot Shapes -->
              <div class="form-group">
                <label class="form-label">Body Pattern Shape (Dots)</label>
                <div class="qr-shape-btn-group" id="qr-body-dot-group">
                  <button type="button" class="qr-shape-btn active" data-body-dot="square"><i class="fa-solid fa-square"></i> Square</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="circle"><i class="fa-solid fa-circle"></i> Dots / Circles</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="rounded"><i class="fa-regular fa-square"></i> Soft Squircle</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="diamond"><i class="fa-solid fa-diamond"></i> Diamond</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="cross"><i class="fa-solid fa-plus"></i> Tech Cross</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="star"><i class="fa-solid fa-star"></i> Sparkle Star</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="heart"><i class="fa-solid fa-heart"></i> Heart Love</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="bar-horizontal"><i class="fa-solid fa-bars"></i> Modern Bars</button>
                  <button type="button" class="qr-shape-btn" data-body-dot="leaf"><i class="fa-solid fa-leaf"></i> Organic Leaf</button>
                </div>
              </div>

              <!-- Corner Eye Frame & Pupil in 2 columns -->
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.8rem;">Corner Eye Frame</label>
                  <select id="qr-eye-frame-shape" class="form-control" style="font-size:0.82rem;">
                    <option value="square">Classic Square</option>
                    <option value="rounded">Smooth Rounded</option>
                    <option value="circle">Circular Frame</option>
                    <option value="leaf">Leaf / Shield Curve</option>
                    <option value="cut-corner">Cut-Corner Frame</option>
                    <option value="diamond">Diamond Frame</option>
                  </select>
                </div>

                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.8rem;">Corner Eye Pupil</label>
                  <select id="qr-eye-pupil-shape" class="form-control" style="font-size:0.82rem;">
                    <option value="square">Classic Square</option>
                    <option value="circle">Round Dot</option>
                    <option value="rounded">Soft Squircle</option>
                    <option value="diamond">Diamond Pupil</option>
                    <option value="leaf">Leaf Pupil</option>
                    <option value="star">Star Pupil</option>
                    <option value="heart">Heart Pupil</option>
                  </select>
                </div>
              </div>

              <!-- Eye Colors Customization Toggle -->
              <div style="margin-top:0.75rem;">
                <label style="display:inline-flex; align-items:center; gap:0.45rem; font-size:0.82rem; cursor:pointer; color:var(--text-secondary);">
                  <input type="checkbox" id="qr-custom-eye-colors" style="accent-color:var(--primary); cursor:pointer;">
                  <span>Customize Corner Eye Colors Separately</span>
                </label>
                
                <div id="qr-eye-colors-wrap" style="display:none; margin-top:0.6rem; padding:0.6rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:8px;">
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                    <div>
                      <label class="form-label" style="font-size:0.75rem;">Eye Frame Color</label>
                      <div class="color-input-wrapper">
                        <input type="color" id="qr-eye-frame-color" value="#000000">
                        <input type="text" id="qr-eye-frame-hex" class="form-control" value="#000000" style="width:78px; font-family:var(--font-mono); font-size:0.75rem; padding:0.25rem 0.4rem;">
                      </div>
                    </div>
                    <div>
                      <label class="form-label" style="font-size:0.75rem;">Eye Pupil Color</label>
                      <div class="color-input-wrapper">
                        <input type="color" id="qr-eye-pupil-color" value="#000000">
                        <input type="text" id="qr-eye-pupil-hex" class="form-control" value="#000000" style="width:78px; font-family:var(--font-mono); font-size:0.75rem; padding:0.25rem 0.4rem;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 3: Pattern Colors & Gradients -->
            <div style="border-top:1px solid var(--border-subtle); padding-top:1rem;">
              <div class="pane-header" style="margin-bottom:0.75rem;">
                <span><i class="fa-solid fa-palette"></i> Pattern Color & Gradients</span>
              </div>

              <div class="form-group">
                <label class="form-label">Color Style Mode</label>
                <select id="qr-fg-color-mode" class="form-control">
                  <option value="solid">Solid Color</option>
                  <option value="grad-horizontal">Horizontal Gradient (Left → Right)</option>
                  <option value="grad-diagonal">Diagonal Gradient (45° Angle)</option>
                  <option value="grad-radial">Radial Center Glow</option>
                </select>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                <div class="form-group">
                  <label class="form-label" id="qr-fg-label-1">Pattern Color 1</label>
                  <div class="color-input-wrapper">
                    <input type="color" id="qr-fg-color" value="#000000">
                    <input type="text" id="qr-fg-hex" class="form-control" value="#000000" style="width:88px; font-family:var(--font-mono); font-size:0.8rem; padding:0.3rem 0.45rem;">
                  </div>
                </div>
                <div class="form-group" id="qr-fg-color-2-wrap" style="display:none;">
                  <label class="form-label">Pattern Color 2</label>
                  <div class="color-input-wrapper">
                    <input type="color" id="qr-fg-color-2" value="#4f46e5">
                    <input type="text" id="qr-fg-hex-2" class="form-control" value="#4f46e5" style="width:88px; font-family:var(--font-mono); font-size:0.8rem; padding:0.3rem 0.45rem;">
                  </div>
                </div>
              </div>

              <div class="color-swatches-row">
                <span class="color-swatch-dot" data-fg-color="#000000" style="background:#000000;" title="Deep Black"></span>
                <span class="color-swatch-dot" data-fg-color="#0f172a" style="background:#0f172a;" title="Slate Charcoal"></span>
                <span class="color-swatch-dot" data-fg-color="#4f46e5" style="background:#4f46e5;" title="Royal Indigo"></span>
                <span class="color-swatch-dot" data-fg-color="#0284c7" style="background:#0284c7;" title="Cyan Blue"></span>
                <span class="color-swatch-dot" data-fg-color="#059669" style="background:#059669;" title="Emerald Green"></span>
                <span class="color-swatch-dot" data-fg-color="#e11d48" style="background:#e11d48;" title="Crimson Rose"></span>
                <span class="color-swatch-dot" data-fg-color="#7c3aed" style="background:#7c3aed;" title="Deep Purple"></span>
                <span class="color-swatch-dot" data-fg-color="#f59e0b" style="background:#f59e0b;" title="Amber Gold"></span>
                <span class="color-swatch-dot" data-fg-color="#ffffff" style="background:#ffffff;" title="White"></span>
              </div>

              <!-- Center Logo Upload -->
              <div class="form-group" style="margin-top:0.85rem; margin-bottom:0;">
                <label class="form-label" style="font-size:0.8rem; display:flex; justify-content:space-between; align-items:center;">
                  <span>Center Brand Logo / Icon (Optional)</span>
                  <button type="button" class="btn btn-xs btn-outline" id="btn-clear-center-logo" style="display:none; padding:2px 8px; font-size:0.72rem;">Clear Logo</button>
                </label>
                <input type="file" id="qr-center-logo-file" class="form-control" accept="image/*" style="font-size:0.78rem;">
              </div>
            </div>

            <!-- Section 4: "Scan Me" Frames & Badges -->
            <div style="border-top:1px solid var(--border-subtle); padding-top:1rem;">
              <div class="pane-header" style="margin-bottom:0.75rem;">
                <span><i class="fa-solid fa-id-badge"></i> "Scan Me" Frame & Call-To-Action</span>
              </div>

              <div class="form-group">
                <label class="form-label">Frame Style</label>
                <select id="qr-frame-style" class="form-control">
                  <option value="none">No Frame (Clean QR Code)</option>
                  <option value="bottom-banner">Modern Bottom Banner ("SCAN ME")</option>
                  <option value="top-banner">Top Ribbon Banner ("SCAN ME")</option>
                  <option value="polaroid-card">Polaroid Photo Card Frame</option>
                  <option value="phone-frame">Smartphone Outline Mockup Frame</option>
                  <option value="neon-border">Cyberpunk Glowing Corner Brackets</option>
                </select>
              </div>

              <div id="qr-frame-settings-wrap" style="display:none; margin-top:0.6rem; padding:0.75rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:8px;">
                <div class="form-group" style="margin-bottom:0.6rem;">
                  <label class="form-label" style="font-size:0.78rem;">Frame Call-To-Action Text</label>
                  <input type="text" id="qr-frame-text" class="form-control" value="SCAN ME" placeholder="e.g. SCAN ME, SCAN TO VISIT">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                  <div>
                    <label class="form-label" style="font-size:0.75rem;">Frame Banner Color</label>
                    <div class="color-input-wrapper">
                      <input type="color" id="qr-frame-bg-color" value="#000000">
                      <input type="text" id="qr-frame-bg-hex" class="form-control" value="#000000" style="width:78px; font-family:var(--font-mono); font-size:0.75rem; padding:0.25rem 0.4rem;">
                    </div>
                  </div>
                  <div>
                    <label class="form-label" style="font-size:0.75rem;">Frame Text Color</label>
                    <div class="color-input-wrapper">
                      <input type="color" id="qr-frame-txt-color" value="#ffffff">
                      <input type="text" id="qr-frame-txt-hex" class="form-control" value="#ffffff" style="width:78px; font-family:var(--font-mono); font-size:0.75rem; padding:0.25rem 0.4rem;">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 5: Height & Width Resolution Controls -->
            <div style="border-top:1px solid var(--border-subtle); padding-top:1rem;">
              <div class="pane-header" style="margin-bottom:0.75rem;">
                <span><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Dimensions & Resolution</span>
                <span class="slider-val-badge" id="val-qr-resolution">512 × 512 px</span>
              </div>

              <div class="qr-dim-row">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.8rem;">Width (px)</label>
                  <input type="number" id="qr-width-input" class="form-control" value="512" min="64" max="4096" step="16">
                </div>
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.8rem;">Height (px)</label>
                  <input type="number" id="qr-height-input" class="form-control" value="512" min="64" max="4096" step="16">
                </div>
              </div>

              <div style="display:flex; align-items:center; justify-content:space-between; margin-top:0.6rem;">
                <label style="display:inline-flex; align-items:center; gap:0.45rem; font-size:0.82rem; cursor:pointer; color:var(--text-secondary);">
                  <input type="checkbox" id="qr-aspect-lock" checked style="accent-color:var(--primary); cursor:pointer;">
                  <span>Lock 1:1 Aspect Ratio (Square)</span>
                </label>
              </div>

              <!-- Quick Resolution Presets -->
              <div style="margin-top:0.75rem;">
                <label class="form-label" style="font-size:0.76rem; color:var(--text-muted); margin-bottom:0.35rem;">Quick Resolution Presets:</label>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
                  <button type="button" class="interchange-pill" data-qr-size="128">128 × 128</button>
                  <button type="button" class="interchange-pill" data-qr-size="256">256 × 256</button>
                  <button type="button" class="interchange-pill active" data-qr-size="512">512 × 512 (HD)</button>
                  <button type="button" class="interchange-pill" data-qr-size="1024">1024 × 1024 (2K)</button>
                  <button type="button" class="interchange-pill" data-qr-size="2048">2048 × 2048 (Print)</button>
                </div>
              </div>

              <!-- Quiet Zone / Margin Slider -->
              <div class="form-group" style="margin-top:0.9rem; margin-bottom:0;">
                <label class="form-label" style="display:flex; justify-content:space-between; font-size:0.8rem;">
                  <span>Border Padding (Quiet Zone)</span>
                  <span class="slider-val-badge" id="val-qr-margin" style="min-width:40px;">24px</span>
                </label>
                <input type="range" id="qr-margin-slider" class="range-slider" min="0" max="80" step="4" value="24">
              </div>
            </div>

            <!-- Section 6: Background Customization -->
            <div style="border-top:1px solid var(--border-subtle); padding-top:1rem;">
              <div class="pane-header" style="margin-bottom:0.75rem;">
                <span><i class="fa-solid fa-fill-drip"></i> Background Customization</span>
              </div>

              <!-- Background Style Selection -->
              <div class="form-group">
                <label class="form-label">Background Style</label>
                <select id="qr-bg-type" class="form-control">
                  <option value="color">Solid Background Color</option>
                  <option value="transparent">Transparent Background (Alpha Channel)</option>
                  <option value="gradient-sunset">Gradient: Sunset Glow (Orange → Magenta → Purple)</option>
                  <option value="gradient-cyber">Gradient: Cyberpunk Neon (Cyan → Electric Blue)</option>
                  <option value="gradient-emerald">Gradient: Emerald Aura (Mint → Forest Green)</option>
                  <option value="gradient-aurora">Gradient: Aurora Nebula (Purple → Violet → Teal)</option>
                  <option value="gradient-dark">Gradient: Obsidian Dark (Slate → OLED Midnight)</option>
                </select>
              </div>

              <!-- Solid Color Controls -->
              <div id="qr-bg-solid-wrap">
                <div class="form-group">
                  <label class="form-label">Background Color</label>
                  <div class="color-input-wrapper">
                    <input type="color" id="qr-bg-color" value="#ffffff">
                    <input type="text" id="qr-bg-hex" class="form-control" value="#ffffff" style="width:96px; font-family:var(--font-mono); font-size:0.82rem; padding:0.35rem 0.5rem;">
                  </div>
                  <div class="color-swatches-row">
                    <span class="color-swatch-dot" data-bg-color="#ffffff" style="background:#ffffff;" title="Pure White"></span>
                    <span class="color-swatch-dot" data-bg-color="#0f172a" style="background:#0f172a;" title="Slate Dark"></span>
                    <span class="color-swatch-dot" data-bg-color="#000000" style="background:#000000;" title="OLED Pure Black"></span>
                    <span class="color-swatch-dot" data-bg-color="#f8fafc" style="background:#f8fafc;" title="Soft White"></span>
                    <span class="color-swatch-dot" data-bg-color="#fef3c7" style="background:#fef3c7;" title="Warm Cream"></span>
                    <span class="color-swatch-dot" data-bg-color="#eff6ff" style="background:#eff6ff;" title="Sky Blue Tint"></span>
                    <span class="color-swatch-dot" data-bg-color="#ecfdf5" style="background:#ecfdf5;" title="Mint Green Tint"></span>
                    <span class="color-swatch-dot" data-bg-color="#fff1f2" style="background:#fff1f2;" title="Rose Tint"></span>
                  </div>
                </div>
              </div>

              <!-- Transparent Toggle Checkbox -->
              <div style="margin-top:0.6rem;">
                <label style="display:inline-flex; align-items:center; gap:0.45rem; font-size:0.82rem; cursor:pointer; color:var(--text-secondary);">
                  <input type="checkbox" id="qr-bg-transparent" style="accent-color:var(--primary); cursor:pointer;">
                  <span>Make Background Transparent (PNG format)</span>
                </label>
                <div class="form-hint" style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                  Preserved in PNG download. JPG exports will automatically render with a clean white backdrop.
                </div>
              </div>

              <!-- Custom Background Image Overlay -->
              <div style="margin-top:0.85rem;">
                <label class="form-label" style="font-size:0.8rem; display:flex; justify-content:space-between; align-items:center;">
                  <span>Background Wallpaper / Photo (Optional)</span>
                  <button type="button" class="btn btn-xs btn-outline" id="btn-clear-bg-img" style="display:none; padding:2px 8px; font-size:0.72rem;">Clear Image</button>
                </label>
                <input type="file" id="qr-bg-img-file" class="form-control" accept="image/*" style="font-size:0.78rem;">
                <div id="qr-bg-img-opacity-wrap" style="display:none; margin-top:0.5rem;">
                  <label class="form-label" style="display:flex; justify-content:space-between; font-size:0.76rem;">
                    <span>Background Image Opacity</span>
                    <span class="slider-val-badge" id="val-qr-bg-opacity" style="min-width:36px;">35%</span>
                  </label>
                  <input type="range" id="qr-bg-img-opacity" class="range-slider" min="5" max="95" step="5" value="35">
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Sticky, Scrollable Preview with Centered Canvas & 4-Action Export Bar -->
          <div class="qr-sticky-preview">
            <div class="pane-header" style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:0.15rem;">
              <span><i class="fa-solid fa-eye" style="color:var(--primary);"></i> Live QR Preview</span>
              <span id="qr-specs-badge" class="slider-val-badge" style="font-size:0.76rem; color:var(--text-muted);">512 × 512 px</span>
            </div>

            <!-- Preview Box (Strictly Centered horizontally & vertically) -->
            <div style="width:100%; display:flex; align-items:center; justify-content:center; padding:0.4rem 0;">
              <div class="qr-preview-box" id="qr-render-box">
                <canvas id="qr-composite-canvas" style="display:block;"></canvas>
              </div>
            </div>

            <!-- Hidden container for QRCode.js calculation (using visibility:hidden to avoid 0x0 canvas glitches) -->
            <div id="qrcode-hidden-buffer" style="visibility:hidden; position:absolute; left:-9999px; top:-9999px; width:256px; height:256px;"></div>

            <!-- Action Buttons Grid: PNG, JPG, PDF & Print -->
            <div style="width:100%; border-top:1px solid var(--border-subtle); padding-top:1rem; margin-top:auto;">
              <div class="qr-download-actions-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:0.6rem; margin-bottom:0.6rem;">
                <button class="btn btn-emerald" id="btn-download-qr-png" style="font-weight:700; padding:0.65rem 0.75rem; font-size:0.88rem; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
                  <i class="fa-solid fa-file-arrow-down"></i> Download PNG
                </button>
                <button class="btn btn-primary" id="btn-download-qr-jpg" style="font-weight:700; padding:0.65rem 0.75rem; font-size:0.88rem; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
                  <i class="fa-solid fa-file-image"></i> Download JPG
                </button>
                <button class="btn btn-warning" id="btn-download-qr-pdf" style="font-weight:700; padding:0.65rem 0.75rem; font-size:0.88rem; display:flex; align-items:center; justify-content:center; gap:0.4rem; background:linear-gradient(135deg, #f59e0b, #d97706); color:#ffffff; border:none; box-shadow:0 2px 10px rgba(245,158,11,0.25);">
                  <i class="fa-solid fa-file-pdf"></i> Download PDF
                </button>
                <button class="btn btn-secondary" id="btn-print-qr" style="font-weight:700; padding:0.65rem 0.75rem; font-size:0.88rem; display:flex; align-items:center; justify-content:center; gap:0.4rem; background:rgba(255,255,255,0.08); border:1px solid var(--border-subtle);">
                  <i class="fa-solid fa-print"></i> Print QR Code
                </button>
              </div>

              <div style="display:flex; gap:0.5rem; justify-content:center; margin-bottom:0.75rem;">
                <button class="btn btn-secondary btn-sm" id="btn-copy-qr-clipboard" style="width:100%; font-size:0.82rem; padding:0.45rem 0.75rem;">
                  <i class="fa-solid fa-copy"></i> Copy QR Image to Clipboard
                </button>
              </div>

              <div style="font-size:0.74rem; color:var(--text-muted); line-height:1.55; text-align:left; background:rgba(255,255,255,0.02); padding:0.6rem 0.8rem; border-radius:6px; border:1px solid var(--border-subtle);">
                <div><i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> <strong>PNG:</strong> Lossless quality with transparency support.</div>
                <div><i class="fa-solid fa-circle-check" style="color:var(--primary);"></i> <strong>JPG:</strong> Standard print photo format, clean solid backdrop.</div>
                <div><i class="fa-solid fa-circle-check" style="color:#f59e0b;"></i> <strong>PDF:</strong> Document-ready vector A4 sheet with title & payload.</div>
                <div><i class="fa-solid fa-circle-check" style="color:#38bdf8;"></i> <strong>Print:</strong> 1-Click direct printer dialog with clean badge.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: QR Scanner -->
      <div id="tab-qr-scan" class="tab-content-panel" style="display:none;">
        <div class="split-pane">
          <div class="pane-card">
            <div class="pane-header"><span>Upload QR Image to Scan</span></div>
            <div class="dropzone" id="qr-scan-dropzone">
              <div class="dropzone-icon"><i class="fa-solid fa-qrcode"></i></div>
              <div class="dropzone-title">Upload Image with QR Code</div>
              <div class="dropzone-hint">PNG, JPG, WEBP, Screenshots</div>
              <input type="file" id="qr-scan-file-input" accept="image/*">
            </div>
            <div id="qr-scan-preview" style="margin-top:1rem; text-align:center;"></div>
          </div>

          <div class="pane-card">
            <div class="pane-header">
              <span>Decoded Data</span>
              <button class="btn btn-sm btn-emerald" id="btn-copy-scanned-qr" style="display:none;">
                <i class="fa-solid fa-copy"></i> Copy
              </button>
            </div>
            <textarea id="qr-scanned-result" class="form-control" style="flex:1; min-height:220px; font-family:var(--font-mono);" placeholder="Decoded QR text/URL will appear here..." readonly></textarea>
            <div id="qr-scan-action-link" style="margin-top:0.75rem;"></div>
          </div>
        </div>
      </div>
    `;

    this.initQrLogic();
  },

  initQrLogic() {
    // Tabs
    const tabs = document.querySelectorAll('[data-qr-tab]');
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const isGen = t.dataset.qrTab === 'gen';
        document.getElementById('tab-qr-gen').style.display = isGen ? 'block' : 'none';
        document.getElementById('tab-qr-scan').style.display = isGen ? 'none' : 'block';
      });
    });

    // Content Elements
    const typeSelect = document.getElementById('qr-type-select');
    const mainWrap = document.getElementById('qr-main-wrap');
    const mainLabel = document.getElementById('qr-main-label');
    const mainInput = document.getElementById('qr-main-input');
    const wifiFields = document.getElementById('qr-wifi-fields');
    const wifiSsid = document.getElementById('qr-wifi-ssid');
    const wifiPass = document.getElementById('qr-wifi-pass');
    const wifiType = document.getElementById('qr-wifi-type');

    // 1-Click Design Themes
    const themeCards = document.querySelectorAll('.qr-theme-card');

    // Shapes & Patterns Elements
    const bodyDotButtons = document.querySelectorAll('[data-body-dot]');
    const eyeFrameShapeSelect = document.getElementById('qr-eye-frame-shape');
    const eyePupilShapeSelect = document.getElementById('qr-eye-pupil-shape');
    const customEyeColorsCheckbox = document.getElementById('qr-custom-eye-colors');
    const eyeColorsWrap = document.getElementById('qr-eye-colors-wrap');
    const eyeFrameColorInput = document.getElementById('qr-eye-frame-color');
    const eyeFrameHexInput = document.getElementById('qr-eye-frame-hex');
    const eyePupilColorInput = document.getElementById('qr-eye-pupil-color');
    const eyePupilHexInput = document.getElementById('qr-eye-pupil-hex');

    // Pattern Colors & Gradients
    const fgColorModeSelect = document.getElementById('qr-fg-color-mode');
    const fgColorInput = document.getElementById('qr-fg-color');
    const fgHexInput = document.getElementById('qr-fg-hex');
    const fgColor2Wrap = document.getElementById('qr-fg-color-2-wrap');
    const fgColor2Input = document.getElementById('qr-fg-color-2');
    const fgHex2Input = document.getElementById('qr-fg-hex-2');
    const fgLabel1 = document.getElementById('qr-fg-label-1');
    const centerLogoInput = document.getElementById('qr-center-logo-file');
    const clearCenterLogoBtn = document.getElementById('btn-clear-center-logo');

    // "Scan Me" Frames Elements
    const frameStyleSelect = document.getElementById('qr-frame-style');
    const frameSettingsWrap = document.getElementById('qr-frame-settings-wrap');
    const frameTextInput = document.getElementById('qr-frame-text');
    const frameBgColorInput = document.getElementById('qr-frame-bg-color');
    const frameBgHexInput = document.getElementById('qr-frame-bg-hex');
    const frameTxtColorInput = document.getElementById('qr-frame-txt-color');
    const frameTxtHexInput = document.getElementById('qr-frame-txt-hex');

    // Dimension Elements
    const widthInput = document.getElementById('qr-width-input');
    const heightInput = document.getElementById('qr-height-input');
    const aspectLock = document.getElementById('qr-aspect-lock');
    const resolutionBadge = document.getElementById('val-qr-resolution');
    const marginSlider = document.getElementById('qr-margin-slider');
    const marginBadge = document.getElementById('val-qr-margin');
    const sizePills = document.querySelectorAll('[data-qr-size]');

    // Background Elements
    const bgTypeSelect = document.getElementById('qr-bg-type');
    const bgSolidWrap = document.getElementById('qr-bg-solid-wrap');
    const bgColorInput = document.getElementById('qr-bg-color');
    const bgHexInput = document.getElementById('qr-bg-hex');
    const bgTransparentCheckbox = document.getElementById('qr-bg-transparent');
    const bgImgInput = document.getElementById('qr-bg-img-file');
    const bgImgOpacityWrap = document.getElementById('qr-bg-img-opacity-wrap');
    const bgImgOpacitySlider = document.getElementById('qr-bg-img-opacity');
    const bgImgOpacityBadge = document.getElementById('val-qr-bg-opacity');
    const clearBgImgBtn = document.getElementById('btn-clear-bg-img');

    // Preview & Export Elements
    const previewBox = document.getElementById('qr-render-box');
    const compositeCanvas = document.getElementById('qr-composite-canvas');
    const hiddenBuffer = document.getElementById('qrcode-hidden-buffer');
    const specsBadge = document.getElementById('qr-specs-badge');
    const downloadPngBtn = document.getElementById('btn-download-qr-png');
    const downloadJpgBtn = document.getElementById('btn-download-qr-jpg');
    const downloadPdfBtn = document.getElementById('btn-download-qr-pdf');
    const printQrBtn = document.getElementById('btn-print-qr');
    const copyClipboardBtn = document.getElementById('btn-copy-qr-clipboard');

    // In-memory state
    let currentBodyDot = 'square';
    let uploadedBgImg = null;
    let uploadedCenterLogo = null;
    let debounceTimer = null;

    function triggerRegen() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updatePreview, 60);
    }

    function updateResolutionDisplay() {
      const w = parseInt(widthInput.value) || 512;
      const h = parseInt(heightInput.value) || 512;
      if (resolutionBadge) resolutionBadge.textContent = `${w} × ${h} px`;
      if (specsBadge) specsBadge.textContent = `${w} × ${h} px`;
    }

    // 1-Click Design Presets Definition (16 Curated Themes)
    const DESIGN_PRESETS = {
      'classic': {
        bodyDot: 'square', eyeFrame: 'square', eyePupil: 'square',
        colorMode: 'solid', fgColor: '#000000', fgColor2: '#000000',
        bgType: 'color', bgColor: '#ffffff', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'cyber': {
        bodyDot: 'cross', eyeFrame: 'cut-corner', eyePupil: 'diamond',
        colorMode: 'grad-diagonal', fgColor: '#06b6d4', fgColor2: '#ec4899',
        bgType: 'color', bgColor: '#0b0f19', transparent: false,
        customEyes: true, eyeFrame: '#06b6d4', eyePupil: '#ec4899',
        frameStyle: 'neon-border'
      },
      'emerald': {
        bodyDot: 'leaf', eyeFrame: 'leaf', eyePupil: 'leaf',
        colorMode: 'grad-horizontal', fgColor: '#059669', fgColor2: '#10b981',
        bgType: 'color', bgColor: '#f0fdf4', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'sunset': {
        bodyDot: 'circle', eyeFrame: 'rounded', eyePupil: 'circle',
        colorMode: 'grad-diagonal', fgColor: '#f97316', fgColor2: '#a855f7',
        bgType: 'color', bgColor: '#fffbeb', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'royal': {
        bodyDot: 'diamond', eyeFrame: 'rounded', eyePupil: 'diamond',
        colorMode: 'grad-horizontal', fgColor: '#f59e0b', fgColor2: '#b45309',
        bgType: 'color', bgColor: '#09090b', transparent: false,
        customEyes: true, eyeFrame: '#f59e0b', eyePupil: '#f59e0b',
        frameStyle: 'none'
      },
      'violet': {
        bodyDot: 'rounded', eyeFrame: 'circle', eyePupil: 'rounded',
        colorMode: 'grad-horizontal', fgColor: '#8b5cf6', fgColor2: '#6366f1',
        bgType: 'color', bgColor: '#0f172a', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'candy': {
        bodyDot: 'heart', eyeFrame: 'circle', eyePupil: 'heart',
        colorMode: 'grad-horizontal', fgColor: '#f43f5e', fgColor2: '#fb7185',
        bgType: 'color', bgColor: '#fff1f2', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'navy': {
        bodyDot: 'square', eyeFrame: 'rounded', eyePupil: 'square',
        colorMode: 'solid', fgColor: '#1e3a8a', fgColor2: '#1e3a8a',
        bgType: 'color', bgColor: '#f8fafc', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'crimson': {
        bodyDot: 'rounded', eyeFrame: 'cut-corner', eyePupil: 'diamond',
        colorMode: 'grad-diagonal', fgColor: '#dc2626', fgColor2: '#991b1b',
        bgType: 'color', bgColor: '#000000', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'minimal-dark': {
        bodyDot: 'circle', eyeFrame: 'rounded', eyePupil: 'circle',
        colorMode: 'solid', fgColor: '#ffffff', fgColor2: '#ffffff',
        bgType: 'color', bgColor: '#18181b', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'ocean': {
        bodyDot: 'bar-horizontal', eyeFrame: 'rounded', eyePupil: 'circle',
        colorMode: 'grad-horizontal', fgColor: '#0284c7', fgColor2: '#06b6d4',
        bgType: 'color', bgColor: '#f0f9ff', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'matrix': {
        bodyDot: 'cross', eyeFrame: 'square', eyePupil: 'square',
        colorMode: 'solid', fgColor: '#22c55e', fgColor2: '#22c55e',
        bgType: 'color', bgColor: '#000000', transparent: false,
        customEyes: true, eyeFrame: '#22c55e', eyePupil: '#4ade80',
        frameStyle: 'none'
      },
      'sakura': {
        bodyDot: 'leaf', eyeFrame: 'leaf', eyePupil: 'leaf',
        colorMode: 'grad-diagonal', fgColor: '#f472b6', fgColor2: '#fb7185',
        bgType: 'color', bgColor: '#fff5f7', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'coffee': {
        bodyDot: 'rounded', eyeFrame: 'rounded', eyePupil: 'circle',
        colorMode: 'grad-horizontal', fgColor: '#78350f', fgColor2: '#d97706',
        bgType: 'color', bgColor: '#fefce8', transparent: false,
        customEyes: false, frameStyle: 'none'
      },
      'arctic': {
        bodyDot: 'diamond', eyeFrame: 'circle', eyePupil: 'diamond',
        colorMode: 'grad-diagonal', fgColor: '#38bdf8', fgColor2: '#818cf8',
        bgType: 'color', bgColor: '#0f172a', transparent: false,
        customEyes: true, eyeFrame: '#38bdf8', eyePupil: '#818cf8',
        frameStyle: 'none'
      },
      'solar': {
        bodyDot: 'circle', eyeFrame: 'cut-corner', eyePupil: 'circle',
        colorMode: 'grad-diagonal', fgColor: '#ef4444', fgColor2: '#facc15',
        bgType: 'color', bgColor: '#1c1917', transparent: false,
        customEyes: true, eyeFrame: '#facc15', eyePupil: '#ef4444',
        frameStyle: 'none'
      }
    };

    // Apply Preset Theme
    themeCards.forEach(card => {
      card.addEventListener('click', () => {
        themeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const themeId = card.dataset.qrTheme;
        const theme = DESIGN_PRESETS[themeId];
        if (!theme) return;

        // Apply dot shape
        currentBodyDot = theme.bodyDot;
        bodyDotButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.bodyDot === currentBodyDot));

        // Apply eyes
        eyeFrameShapeSelect.value = theme.eyeFrame;
        eyePupilShapeSelect.value = theme.eyePupil;

        // Custom eyes toggle
        if (theme.customEyes) {
          customEyeColorsCheckbox.checked = true;
          eyeColorsWrap.style.display = 'block';
          eyeFrameColorInput.value = theme.eyeFrame.startsWith('#') ? theme.eyeFrame : theme.fgColor;
          eyeFrameHexInput.value = eyeFrameColorInput.value;
          eyePupilColorInput.value = theme.eyePupil.startsWith('#') ? theme.eyePupil : theme.fgColor2 || theme.fgColor;
          eyePupilHexInput.value = eyePupilColorInput.value;
        } else {
          customEyeColorsCheckbox.checked = false;
          eyeColorsWrap.style.display = 'none';
        }

        // Apply colors
        fgColorModeSelect.value = theme.colorMode;
        fgColorInput.value = theme.fgColor;
        fgHexInput.value = theme.fgColor;
        fgColor2Input.value = theme.fgColor2;
        fgHex2Input.value = theme.fgColor2;
        fgColor2Wrap.style.display = theme.colorMode === 'solid' ? 'none' : 'block';
        fgLabel1.textContent = theme.colorMode === 'solid' ? 'QR Code Color' : 'Color 1 (Start)';

        // Apply Background
        bgTypeSelect.value = theme.bgType;
        bgColorInput.value = theme.bgColor;
        bgHexInput.value = theme.bgColor;
        bgTransparentCheckbox.checked = theme.transparent;
        bgSolidWrap.style.opacity = theme.transparent ? '0.4' : '1';
        bgSolidWrap.style.pointerEvents = theme.transparent ? 'none' : 'auto';

        // Apply Frame
        frameStyleSelect.value = theme.frameStyle || 'none';
        frameSettingsWrap.style.display = frameStyleSelect.value === 'none' ? 'none' : 'block';

        triggerRegen();
        App.showToast(`Applied "${card.querySelector('.qr-theme-name').textContent}" style!`, 'info');
      });
    });

    // Body Dot Shape Selector
    bodyDotButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        bodyDotButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBodyDot = btn.dataset.bodyDot;
        triggerRegen();
      });
    });

    eyeFrameShapeSelect.addEventListener('change', triggerRegen);
    eyePupilShapeSelect.addEventListener('change', triggerRegen);

    customEyeColorsCheckbox.addEventListener('change', () => {
      eyeColorsWrap.style.display = customEyeColorsCheckbox.checked ? 'block' : 'none';
      triggerRegen();
    });

    eyeFrameColorInput.addEventListener('input', () => {
      eyeFrameHexInput.value = eyeFrameColorInput.value;
      triggerRegen();
    });
    eyeFrameHexInput.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(eyeFrameHexInput.value)) {
        eyeFrameColorInput.value = eyeFrameHexInput.value;
        triggerRegen();
      }
    });

    eyePupilColorInput.addEventListener('input', () => {
      eyePupilHexInput.value = eyePupilColorInput.value;
      triggerRegen();
    });
    eyePupilHexInput.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(eyePupilHexInput.value)) {
        eyePupilColorInput.value = eyePupilHexInput.value;
        triggerRegen();
      }
    });

    // Pattern Colors & Gradients
    fgColorModeSelect.addEventListener('change', () => {
      const isGrad = fgColorModeSelect.value !== 'solid';
      fgColor2Wrap.style.display = isGrad ? 'block' : 'none';
      fgLabel1.textContent = isGrad ? 'Color 1 (Start)' : 'QR Code Color';
      triggerRegen();
    });

    fgColorInput.addEventListener('input', () => {
      fgHexInput.value = fgColorInput.value;
      triggerRegen();
    });
    fgHexInput.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(fgHexInput.value)) {
        fgColorInput.value = fgHexInput.value;
        triggerRegen();
      }
    });

    fgColor2Input.addEventListener('input', () => {
      fgHex2Input.value = fgColor2Input.value;
      triggerRegen();
    });
    fgHex2Input.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(fgHex2Input.value)) {
        fgColor2Input.value = fgHex2Input.value;
        triggerRegen();
      }
    });

    // "Scan Me" Frames
    frameStyleSelect.addEventListener('change', () => {
      frameSettingsWrap.style.display = frameStyleSelect.value === 'none' ? 'none' : 'block';
      triggerRegen();
    });
    frameTextInput.addEventListener('input', triggerRegen);
    frameBgColorInput.addEventListener('input', () => {
      frameBgHexInput.value = frameBgColorInput.value;
      triggerRegen();
    });
    frameBgHexInput.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(frameBgHexInput.value)) {
        frameBgColorInput.value = frameBgHexInput.value;
        triggerRegen();
      }
    });
    frameTxtColorInput.addEventListener('input', () => {
      frameTxtHexInput.value = frameTxtColorInput.value;
      triggerRegen();
    });
    frameTxtHexInput.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(frameTxtHexInput.value)) {
        frameTxtColorInput.value = frameTxtHexInput.value;
        triggerRegen();
      }
    });

    // Content type switch
    typeSelect.addEventListener('change', () => {
      const val = typeSelect.value;
      if (val === 'wifi') {
        mainWrap.style.display = 'none';
        wifiFields.style.display = 'block';
      } else {
        mainWrap.style.display = 'block';
        wifiFields.style.display = 'none';
        if (val === 'url') {
          mainLabel.textContent = 'Website URL';
          mainInput.placeholder = 'https://example.com';
        } else if (val === 'email') {
          mainLabel.textContent = 'Email Address';
          mainInput.placeholder = 'hello@example.com';
        } else if (val === 'phone') {
          mainLabel.textContent = 'Phone Number or WhatsApp (e.g. +1234567890)';
          mainInput.placeholder = '+1234567890';
        } else {
          mainLabel.textContent = 'Plain Text / Message';
          mainInput.placeholder = 'Enter note or message';
        }
      }
      triggerRegen();
    });

    mainInput.addEventListener('input', triggerRegen);
    wifiSsid.addEventListener('input', triggerRegen);
    wifiPass.addEventListener('input', triggerRegen);
    wifiType.addEventListener('change', triggerRegen);

    // Dimension Inputs
    widthInput.addEventListener('input', () => {
      const val = parseInt(widthInput.value) || 512;
      if (aspectLock.checked) {
        heightInput.value = val;
      }
      updateResolutionDisplay();
      triggerRegen();
    });

    heightInput.addEventListener('input', () => {
      const val = parseInt(heightInput.value) || 512;
      if (aspectLock.checked) {
        widthInput.value = val;
      }
      updateResolutionDisplay();
      triggerRegen();
    });

    aspectLock.addEventListener('change', () => {
      if (aspectLock.checked) {
        heightInput.value = widthInput.value;
        updateResolutionDisplay();
        triggerRegen();
      }
    });

    // Preset Pills
    sizePills.forEach(pill => {
      pill.addEventListener('click', () => {
        sizePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const sz = parseInt(pill.dataset.qrSize) || 512;
        widthInput.value = sz;
        heightInput.value = sz;
        updateResolutionDisplay();
        triggerRegen();
      });
    });

    // Margin Slider
    marginSlider.addEventListener('input', () => {
      marginBadge.textContent = marginSlider.value + 'px';
      triggerRegen();
    });

    // Background type selector
    bgTypeSelect.addEventListener('change', () => {
      const val = bgTypeSelect.value;
      if (val === 'transparent') {
        bgTransparentCheckbox.checked = true;
        bgSolidWrap.style.opacity = '0.4';
        bgSolidWrap.style.pointerEvents = 'none';
      } else if (val.startsWith('gradient-')) {
        bgTransparentCheckbox.checked = false;
        bgSolidWrap.style.opacity = '0.4';
        bgSolidWrap.style.pointerEvents = 'none';
      } else {
        bgTransparentCheckbox.checked = false;
        bgSolidWrap.style.opacity = '1';
        bgSolidWrap.style.pointerEvents = 'auto';
      }
      triggerRegen();
    });

    bgTransparentCheckbox.addEventListener('change', () => {
      if (bgTransparentCheckbox.checked) {
        bgTypeSelect.value = 'transparent';
        bgSolidWrap.style.opacity = '0.4';
        bgSolidWrap.style.pointerEvents = 'none';
      } else {
        bgTypeSelect.value = 'color';
        bgSolidWrap.style.opacity = '1';
        bgSolidWrap.style.pointerEvents = 'auto';
      }
      triggerRegen();
    });

    // Color inputs & Hex sync
    bgColorInput.addEventListener('input', () => {
      bgHexInput.value = bgColorInput.value;
      bgTransparentCheckbox.checked = false;
      bgTypeSelect.value = 'color';
      bgSolidWrap.style.opacity = '1';
      bgSolidWrap.style.pointerEvents = 'auto';
      triggerRegen();
    });

    bgHexInput.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(bgHexInput.value)) {
        bgColorInput.value = bgHexInput.value;
        bgTransparentCheckbox.checked = false;
        bgTypeSelect.value = 'color';
        triggerRegen();
      }
    });

    // Swatches
    document.querySelectorAll('[data-bg-color]').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const col = swatch.dataset.bgColor;
        bgColorInput.value = col;
        bgHexInput.value = col;
        bgTransparentCheckbox.checked = false;
        bgTypeSelect.value = 'color';
        bgSolidWrap.style.opacity = '1';
        bgSolidWrap.style.pointerEvents = 'auto';
        triggerRegen();
      });
    });

    document.querySelectorAll('[data-fg-color]').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const col = swatch.dataset.fgColor;
        fgColorInput.value = col;
        fgHexInput.value = col;
        triggerRegen();
      });
    });

    // Background Image Upload
    bgImgInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            uploadedBgImg = img;
            bgImgOpacityWrap.style.display = 'block';
            clearBgImgBtn.style.display = 'inline-block';
            triggerRegen();
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    clearBgImgBtn.addEventListener('click', () => {
      uploadedBgImg = null;
      bgImgInput.value = '';
      bgImgOpacityWrap.style.display = 'none';
      clearBgImgBtn.style.display = 'none';
      triggerRegen();
    });

    bgImgOpacitySlider.addEventListener('input', () => {
      bgImgOpacityBadge.textContent = bgImgOpacitySlider.value + '%';
      triggerRegen();
    });

    // Center Logo Upload
    centerLogoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            uploadedCenterLogo = img;
            clearCenterLogoBtn.style.display = 'inline-block';
            triggerRegen();
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    clearCenterLogoBtn.addEventListener('click', () => {
      uploadedCenterLogo = null;
      centerLogoInput.value = '';
      clearCenterLogoBtn.style.display = 'none';
      triggerRegen();
    });

    function getQrPayload() {
      const type = typeSelect.value;
      if (type === 'wifi') {
        const ssid = wifiSsid.value || 'MyWiFi';
        const pass = wifiPass.value || '';
        const enc = wifiType.value || 'WPA';
        return `WIFI:T:${enc};S:${ssid};P:${pass};;`;
      } else if (type === 'email') {
        const email = mainInput.value.trim() || 'hello@example.com';
        return `mailto:${email}`;
      } else if (type === 'phone') {
        const phone = mainInput.value.trim();
        return phone.startsWith('+') ? `tel:${phone}` : `tel:+${phone}`;
      } else {
        return mainInput.value.trim() || 'https://google.com';
      }
    }

    // Helper: Draw Finder Eye (Outer Frame + Inner Pupil)
    function drawEye(ctx, eyeX, eyeY, outerSize, cellSize, frameShape, pupilShape, frameColor, pupilColor) {
      ctx.save();
      ctx.fillStyle = frameColor;
      const innerOffset = cellSize;
      const innerSize = outerSize - (2 * innerOffset);

      ctx.beginPath();
      if (frameShape === 'circle') {
        const cx = eyeX + outerSize / 2;
        const cy = eyeY + outerSize / 2;
        ctx.arc(cx, cy, outerSize / 2, 0, Math.PI * 2, false);
        ctx.arc(cx, cy, innerSize / 2, 0, Math.PI * 2, true);
      } else if (frameShape === 'rounded') {
        const rOuter = cellSize * 1.8;
        const rInner = cellSize * 0.9;
        if (ctx.roundRect) {
          ctx.roundRect(eyeX, eyeY, outerSize, outerSize, rOuter);
          ctx.roundRect(eyeX + innerOffset, eyeY + innerOffset, innerSize, innerSize, rInner);
        } else {
          ctx.rect(eyeX, eyeY, outerSize, outerSize);
          ctx.rect(eyeX + innerOffset, eyeY + innerOffset, innerSize, innerSize);
        }
      } else if (frameShape === 'leaf') {
        const rOuter = cellSize * 2.8;
        const rInner = cellSize * 1.6;
        if (ctx.roundRect) {
          ctx.roundRect(eyeX, eyeY, outerSize, outerSize, [rOuter, 0, rOuter, 0]);
          ctx.roundRect(eyeX + innerOffset, eyeY + innerOffset, innerSize, innerSize, [rInner, 0, rInner, 0]);
        } else {
          ctx.rect(eyeX, eyeY, outerSize, outerSize);
          ctx.rect(eyeX + innerOffset, eyeY + innerOffset, innerSize, innerSize);
        }
      } else if (frameShape === 'cut-corner') {
        const cut = cellSize * 1.6;
        ctx.moveTo(eyeX + cut, eyeY);
        ctx.lineTo(eyeX + outerSize - cut, eyeY);
        ctx.lineTo(eyeX + outerSize, eyeY + cut);
        ctx.lineTo(eyeX + outerSize, eyeY + outerSize - cut);
        ctx.lineTo(eyeX + outerSize - cut, eyeY + outerSize);
        ctx.lineTo(eyeX + cut, eyeY + outerSize);
        ctx.lineTo(eyeX, eyeY + outerSize - cut);
        ctx.lineTo(eyeX, eyeY + cut);
        ctx.closePath();

        const icut = cellSize * 0.9;
        const ix = eyeX + innerOffset;
        const iy = eyeY + innerOffset;
        ctx.moveTo(ix + icut, iy);
        ctx.lineTo(ix, iy + icut);
        ctx.lineTo(ix, iy + innerSize - icut);
        ctx.lineTo(ix + icut, iy + innerSize);
        ctx.lineTo(ix + innerSize - icut, iy + innerSize);
        ctx.lineTo(ix + innerSize, iy + innerSize - icut);
        ctx.lineTo(ix + innerSize, iy + icut);
        ctx.lineTo(ix + innerSize - icut, iy);
        ctx.closePath();
      } else if (frameShape === 'diamond') {
        const cx = eyeX + outerSize / 2;
        const cy = eyeY + outerSize / 2;
        ctx.moveTo(cx, eyeY);
        ctx.lineTo(eyeX + outerSize, cy);
        ctx.lineTo(cx, eyeY + outerSize);
        ctx.lineTo(eyeX, cy);
        ctx.closePath();

        const icx = cx;
        const icy = cy;
        ctx.moveTo(icx, eyeY + innerOffset);
        ctx.lineTo(eyeX + outerSize - innerOffset, icy);
        ctx.lineTo(icx, eyeY + outerSize - innerOffset);
        ctx.lineTo(eyeX + innerOffset, icy);
        ctx.closePath();
      } else {
        // Square
        ctx.rect(eyeX, eyeY, outerSize, outerSize);
        ctx.rect(eyeX + innerOffset, eyeY + innerOffset, innerSize, innerSize);
      }
      ctx.fill('evenodd');
      ctx.restore();

      // Inner Pupil
      ctx.save();
      ctx.fillStyle = pupilColor;
      const px = eyeX + (2 * cellSize);
      const py = eyeY + (2 * cellSize);
      const pSize = 3 * cellSize;
      const pRadius = pSize / 2;
      const pcx = px + pRadius;
      const pcy = py + pRadius;

      ctx.beginPath();
      if (pupilShape === 'circle') {
        ctx.arc(pcx, pcy, pRadius * 0.96, 0, Math.PI * 2);
        ctx.fill();
      } else if (pupilShape === 'rounded') {
        if (ctx.roundRect) {
          ctx.roundRect(px, py, pSize, pSize, pSize * 0.35);
        } else {
          ctx.rect(px, py, pSize, pSize);
        }
        ctx.fill();
      } else if (pupilShape === 'diamond') {
        ctx.moveTo(pcx, py);
        ctx.lineTo(px + pSize, pcy);
        ctx.lineTo(pcx, py + pSize);
        ctx.lineTo(px, pcy);
        ctx.closePath();
        ctx.fill();
      } else if (pupilShape === 'leaf') {
        if (ctx.roundRect) {
          ctx.roundRect(px, py, pSize, pSize, [pSize * 0.55, 0, pSize * 0.55, 0]);
        } else {
          ctx.rect(px, py, pSize, pSize);
        }
        ctx.fill();
      } else if (pupilShape === 'star') {
        const rOut = pRadius * 0.98;
        const rIn = pRadius * 0.44;
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          const r = i % 2 === 0 ? rOut : rIn;
          const sx = pcx + Math.cos(a) * r;
          const sy = pcy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();
      } else if (pupilShape === 'heart') {
        const hd = pRadius * 0.9;
        const hx = pcx;
        const hy = pcy - hd * 0.15;
        ctx.moveTo(hx, hy);
        ctx.bezierCurveTo(hx, hy - hd * 0.6, hx - hd, hy - hd * 0.6, hx - hd, hy);
        ctx.bezierCurveTo(hx - hd, hy + hd * 0.5, hx, hy + hd * 0.9, hx, hy + hd);
        ctx.bezierCurveTo(hx, hy + hd * 0.9, hx + hd, hy + hd * 0.5, hx + hd, hy);
        ctx.bezierCurveTo(hx + hd, hy - hd * 0.6, hx, hy - hd * 0.6, hx, hy);
        ctx.fill();
      } else {
        ctx.fillRect(px, py, pSize, pSize);
      }
      ctx.restore();
    }

    // Canvas Compositing Engine with Designs & Frames
    function buildCompositeCanvas(targetW, targetH, forFormat = 'png') {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(64, Math.min(4096, targetW));
      canvas.height = Math.max(64, Math.min(4096, targetH));
      const ctx = canvas.getContext('2d');

      const isTransparent = bgTransparentCheckbox.checked;
      const bgType = bgTypeSelect.value;
      const bgColor = bgColorInput.value || '#ffffff';
      const fgColor = fgColorInput.value || '#000000';
      const fgColor2 = fgColor2Input.value || '#4f46e5';
      const fgColorMode = fgColorModeSelect.value;
      const margin = Math.max(0, parseInt(marginSlider.value) || 0);

      const frameStyle = frameStyleSelect.value;
      const frameText = (frameTextInput.value || 'SCAN ME').toUpperCase();
      const frameBgColor = frameBgColorInput.value || '#000000';
      const frameTxtColor = frameTxtColorInput.value || '#ffffff';

      // 1. Draw Background
      if (forFormat === 'jpg' && isTransparent) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (isTransparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'gradient-sunset') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#f97316');
        grad.addColorStop(0.5, '#ec4899');
        grad.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'gradient-cyber') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#06b6d4');
        grad.addColorStop(0.6, '#3b82f6');
        grad.addColorStop(1, '#6366f1');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'gradient-emerald') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#34d399');
        grad.addColorStop(0.6, '#10b981');
        grad.addColorStop(1, '#064e3b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'gradient-aurora') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#a855f7');
        grad.addColorStop(0.5, '#6366f1');
        grad.addColorStop(1, '#06b6d4');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'gradient-dark') {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(1, '#020617');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 1b. Uploaded custom background image overlay
      if (uploadedBgImg) {
        ctx.save();
        const opacity = (parseInt(bgImgOpacitySlider.value) || 35) / 100;
        ctx.globalAlpha = opacity;
        const hRatio = canvas.width / uploadedBgImg.width;
        const vRatio = canvas.height / uploadedBgImg.height;
        const ratio = Math.max(hRatio, vRatio);
        const shiftX = (canvas.width - uploadedBgImg.width * ratio) / 2;
        const shiftY = (canvas.height - uploadedBgImg.height * ratio) / 2;
        ctx.drawImage(uploadedBgImg, 0, 0, uploadedBgImg.width, uploadedBgImg.height,
                      shiftX, shiftY, uploadedBgImg.width * ratio, uploadedBgImg.height * ratio);
        ctx.restore();
      }

      // Calculate Frame Accommodations
      let qrAreaW = canvas.width;
      let qrAreaH = canvas.height;
      let qrOffsetY = 0;

      let bannerHeight = 0;
      if (frameStyle === 'bottom-banner' || frameStyle === 'top-banner') {
        bannerHeight = Math.max(38, Math.round(canvas.height * 0.15));
        qrAreaH -= bannerHeight;
        if (frameStyle === 'top-banner') {
          qrOffsetY = bannerHeight;
        }
      } else if (frameStyle === 'polaroid-card') {
        bannerHeight = Math.max(32, Math.round(canvas.height * 0.12));
        qrAreaH -= bannerHeight;
      }

      // Calculate square QR bounding box
      const availW = Math.max(32, qrAreaW - (margin * 2));
      const availH = Math.max(32, qrAreaH - (margin * 2));
      const qrBoxSize = Math.min(availW, availH);
      const qrX = Math.round((qrAreaW - qrBoxSize) / 2);
      const qrY = qrOffsetY + Math.round((qrAreaH - qrBoxSize) / 2);

      // Generate raw QR via QRCode.js
      hiddenBuffer.innerHTML = '';
      const text = getQrPayload();

      try {
        if (typeof QRCode !== 'undefined') {
          const qrcode = new QRCode(hiddenBuffer, {
            text: text,
            width: qrBoxSize,
            height: qrBoxSize,
            colorDark: fgColor,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          });

          if (qrcode && qrcode._oQRCode && typeof qrcode._oQRCode.getModuleCount === 'function') {
            const model = qrcode._oQRCode;
            const count = model.getModuleCount();
            const cellSize = qrBoxSize / count;

            // Pattern Fill Style (Solid or Gradients)
            let bodyFill = fgColor;
            if (fgColorMode === 'grad-horizontal') {
              const grad = ctx.createLinearGradient(qrX, 0, qrX + qrBoxSize, 0);
              grad.addColorStop(0, fgColor);
              grad.addColorStop(1, fgColor2);
              bodyFill = grad;
            } else if (fgColorMode === 'grad-diagonal') {
              const grad = ctx.createLinearGradient(qrX, qrY, qrX + qrBoxSize, qrY + qrBoxSize);
              grad.addColorStop(0, fgColor);
              grad.addColorStop(1, fgColor2);
              bodyFill = grad;
            } else if (fgColorMode === 'grad-radial') {
              const cx = qrX + qrBoxSize / 2;
              const cy = qrY + qrBoxSize / 2;
              const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, qrBoxSize / 1.4);
              grad.addColorStop(0, fgColor);
              grad.addColorStop(1, fgColor2);
              bodyFill = grad;
            }
            ctx.fillStyle = bodyFill;

            // 2. Draw Body Modules (Skipping the 3 corner eyes)
            for (let r = 0; r < count; r++) {
              for (let c = 0; c < count; c++) {
                // Check if cell is in one of the 3 finder eyes
                const inTopLeft = (r <= 6 && c <= 6);
                const inTopRight = (r <= 6 && c >= count - 7);
                const inBottomLeft = (r >= count - 7 && c <= 6);

                if (inTopLeft || inTopRight || inBottomLeft) {
                  continue; // Skip eyes here; will be rendered with custom shapes below
                }

                if (model.isDark(r, c)) {
                  const x = Math.round(qrX + c * cellSize);
                  const y = Math.round(qrY + r * cellSize);
                  const w = Math.round(qrX + (c + 1) * cellSize) - x;
                  const h = Math.round(qrY + (r + 1) * cellSize) - y;
                  const minDim = Math.min(w, h);
                  const cx = x + w / 2;
                  const cy = y + h / 2;

                  if (currentBodyDot === 'circle') {
                    ctx.beginPath();
                    ctx.arc(cx, cy, (minDim / 2) * 0.94, 0, Math.PI * 2);
                    ctx.fill();
                  } else if (currentBodyDot === 'rounded') {
                    ctx.beginPath();
                    if (ctx.roundRect) {
                      ctx.roundRect(x, y, w, h, minDim * 0.35);
                    } else {
                      ctx.rect(x, y, w, h);
                    }
                    ctx.fill();
                  } else if (currentBodyDot === 'diamond') {
                    ctx.beginPath();
                    ctx.moveTo(cx, y);
                    ctx.lineTo(x + w, cy);
                    ctx.lineTo(cx, y + h);
                    ctx.lineTo(x, cy);
                    ctx.closePath();
                    ctx.fill();
                  } else if (currentBodyDot === 'cross') {
                    const arm = minDim * 0.32;
                    ctx.fillRect(cx - arm / 2, y, arm, h);
                    ctx.fillRect(x, cy - arm / 2, w, arm);
                  } else if (currentBodyDot === 'star') {
                    ctx.beginPath();
                    const rOuter = minDim * 0.52;
                    const rInner = minDim * 0.22;
                    for (let i = 0; i < 8; i++) {
                      const angle = (i * Math.PI) / 4;
                      const rDist = i % 2 === 0 ? rOuter : rInner;
                      const px = cx + Math.cos(angle) * rDist;
                      const py = cy + Math.sin(angle) * rDist;
                      if (i === 0) ctx.moveTo(px, py);
                      else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.fill();
                  } else if (currentBodyDot === 'heart') {
                    ctx.beginPath();
                    const d = minDim * 0.44;
                    const hx = cx;
                    const hy = cy - d * 0.15;
                    ctx.moveTo(hx, hy);
                    ctx.bezierCurveTo(hx, hy - d * 0.6, hx - d, hy - d * 0.6, hx - d, hy);
                    ctx.bezierCurveTo(hx - d, hy + d * 0.5, hx, hy + d * 0.9, hx, hy + d);
                    ctx.bezierCurveTo(hx, hy + d * 0.9, hx + d, hy + d * 0.5, hx + d, hy);
                    ctx.bezierCurveTo(hx + d, hy - d * 0.6, hx, hy - d * 0.6, hx, hy);
                    ctx.fill();
                  } else if (currentBodyDot === 'bar-horizontal') {
                    const barH = minDim * 0.58;
                    ctx.beginPath();
                    if (ctx.roundRect) {
                      ctx.roundRect(x, cy - barH / 2, w, barH, barH / 2);
                    } else {
                      ctx.rect(x, cy - barH / 2, w, barH);
                    }
                    ctx.fill();
                  } else if (currentBodyDot === 'leaf') {
                    ctx.beginPath();
                    if (ctx.roundRect) {
                      ctx.roundRect(x, y, w, h, [minDim * 0.55, 0, minDim * 0.55, 0]);
                    } else {
                      ctx.rect(x, y, w, h);
                    }
                    ctx.fill();
                  } else {
                    // Classic Square
                    ctx.fillRect(x, y, w, h);
                  }
                }
              }
            }

            // 3. Draw 3 Corner Eyes with custom shapes & colors
            const frameShape = eyeFrameShapeSelect.value || 'square';
            const pupilShape = eyePupilShapeSelect.value || 'square';
            let eyeFrameCol = fgColor;
            let eyePupilCol = fgColor;

            if (customEyeColorsCheckbox.checked) {
              eyeFrameCol = eyeFrameColorInput.value || fgColor;
              eyePupilCol = eyePupilColorInput.value || fgColor;
            }

            const eyeSize = Math.round(7 * cellSize);

            // Eye 1: Top-Left
            drawEye(ctx, qrX, qrY, eyeSize, cellSize, frameShape, pupilShape, eyeFrameCol, eyePupilCol);
            // Eye 2: Top-Right
            const trX = Math.round(qrX + (count - 7) * cellSize);
            drawEye(ctx, trX, qrY, eyeSize, cellSize, frameShape, pupilShape, eyeFrameCol, eyePupilCol);
            // Eye 3: Bottom-Left
            const blY = Math.round(qrY + (count - 7) * cellSize);
            drawEye(ctx, qrX, blY, eyeSize, cellSize, frameShape, pupilShape, eyeFrameCol, eyePupilCol);

          } else {
            // Fallback: draw directly from raw canvas
            const rawCanvas = hiddenBuffer.querySelector('canvas');
            if (rawCanvas) {
              ctx.drawImage(rawCanvas, qrX, qrY, qrBoxSize, qrBoxSize);
            }
          }
        }
      } catch (err) {
        console.error('QR build error:', err);
      }

      // 4. Draw "Scan Me" Frames & Badges if enabled
      if (frameStyle === 'bottom-banner') {
        const bW = Math.round(canvas.width * 0.86);
        const bH = bannerHeight - Math.round(canvas.height * 0.03);
        const bX = Math.round((canvas.width - bW) / 2);
        const bY = canvas.height - bH - Math.round(canvas.height * 0.02);

        ctx.save();
        ctx.fillStyle = frameBgColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bX, bY, bW, bH, bH / 2);
        } else {
          ctx.rect(bX, bY, bW, bH);
        }
        ctx.fill();

        ctx.fillStyle = frameTxtColor;
        ctx.font = `bold ${Math.max(14, Math.round(bH * 0.44))}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frameText, canvas.width / 2, bY + bH / 2);
        ctx.restore();

      } else if (frameStyle === 'top-banner') {
        const bW = Math.round(canvas.width * 0.86);
        const bH = bannerHeight - Math.round(canvas.height * 0.03);
        const bX = Math.round((canvas.width - bW) / 2);
        const bY = Math.round(canvas.height * 0.02);

        ctx.save();
        ctx.fillStyle = frameBgColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bX, bY, bW, bH, bH / 2);
        } else {
          ctx.rect(bX, bY, bW, bH);
        }
        ctx.fill();

        ctx.fillStyle = frameTxtColor;
        ctx.font = `bold ${Math.max(14, Math.round(bH * 0.44))}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frameText, canvas.width / 2, bY + bH / 2);
        ctx.restore();

      } else if (frameStyle === 'polaroid-card') {
        ctx.save();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = Math.max(1, Math.round(canvas.width * 0.005));
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        ctx.fillStyle = frameTxtColor || '#000000';
        ctx.font = `bold ${Math.max(13, Math.round(bannerHeight * 0.45))}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frameText, canvas.width / 2, canvas.height - bannerHeight / 2);
        ctx.restore();

      } else if (frameStyle === 'phone-frame') {
        ctx.save();
        ctx.strokeStyle = frameBgColor;
        ctx.lineWidth = Math.max(3, Math.round(canvas.width * 0.015));
        const phoneRadius = Math.round(canvas.width * 0.08);
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(8, 8, canvas.width - 16, canvas.height - 16, phoneRadius);
        } else {
          ctx.rect(8, 8, canvas.width - 16, canvas.height - 16);
        }
        ctx.stroke();

        // Top speaker notch
        ctx.fillStyle = frameBgColor;
        const notchW = Math.round(canvas.width * 0.22);
        const notchH = Math.max(5, Math.round(canvas.height * 0.018));
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect((canvas.width - notchW) / 2, 14, notchW, notchH, notchH / 2);
        } else {
          ctx.rect((canvas.width - notchW) / 2, 14, notchW, notchH);
        }
        ctx.fill();
        ctx.restore();

      } else if (frameStyle === 'neon-border') {
        ctx.save();
        ctx.strokeStyle = frameBgColor || '#06b6d4';
        ctx.lineWidth = Math.max(2, Math.round(canvas.width * 0.01));
        const bracketLen = Math.max(16, Math.round(qrBoxSize * 0.14));
        const offset = Math.max(6, Math.round(qrBoxSize * 0.035));

        const left = qrX - offset;
        const top = qrY - offset;
        const right = qrX + qrBoxSize + offset;
        const bottom = qrY + qrBoxSize + offset;

        // 4 corner brackets
        ctx.beginPath();
        // Top-Left
        ctx.moveTo(left, top + bracketLen); ctx.lineTo(left, top); ctx.lineTo(left + bracketLen, top);
        // Top-Right
        ctx.moveTo(right - bracketLen, top); ctx.lineTo(right, top); ctx.lineTo(right, top + bracketLen);
        // Bottom-Right
        ctx.moveTo(right, bottom - bracketLen); ctx.lineTo(right, bottom); ctx.lineTo(right - bracketLen, bottom);
        // Bottom-Left
        ctx.moveTo(left + bracketLen, bottom); ctx.lineTo(left, bottom); ctx.lineTo(left, bottom - bracketLen);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Center Brand Logo if uploaded
      if (uploadedCenterLogo) {
        ctx.save();
        const logoSize = Math.round(qrBoxSize * 0.22);
        const logoX = Math.round(qrX + (qrBoxSize - logoSize) / 2);
        const logoY = Math.round(qrY + (qrBoxSize - logoSize) / 2);
        const pad = Math.round(logoSize * 0.12);
        const badgeX = logoX - pad;
        const badgeY = logoY - pad;
        const badgeSize = logoSize + (pad * 2);
        const radius = Math.round(badgeSize * 0.2);

        // Draw badge backdrop
        ctx.fillStyle = (forFormat === 'jpg' || !isTransparent) ? (bgType === 'color' ? bgColor : '#ffffff') : '#ffffff';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, radius);
        } else {
          ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
        }
        ctx.fill();

        ctx.lineWidth = Math.max(1, Math.round(badgeSize * 0.04));
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.stroke();

        ctx.drawImage(uploadedCenterLogo, logoX, logoY, logoSize, logoSize);
        ctx.restore();
      }

      return canvas;
    }

    // Live preview update
    function updatePreview() {
      const w = Math.max(64, Math.min(4096, parseInt(widthInput.value) || 512));
      const h = Math.max(64, Math.min(4096, parseInt(heightInput.value) || 512));

      // Draw onto the visible canvas
      const renderedCanvas = buildCompositeCanvas(w, h, 'png');
      compositeCanvas.width = renderedCanvas.width;
      compositeCanvas.height = renderedCanvas.height;
      const ctx = compositeCanvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(renderedCanvas, 0, 0);

      // Handle preview box background
      if (bgTransparentCheckbox.checked) {
        previewBox.classList.add('is-transparent');
        previewBox.style.background = '';
      } else {
        previewBox.classList.remove('is-transparent');
        const bgType = bgTypeSelect.value;
        if (bgType === 'color') {
          previewBox.style.background = bgColorInput.value;
        } else {
          previewBox.style.background = '';
        }
      }

      updateResolutionDisplay();
    }

    // Download PNG
    downloadPngBtn.addEventListener('click', () => {
      const w = Math.max(64, Math.min(4096, parseInt(widthInput.value) || 512));
      const h = Math.max(64, Math.min(4096, parseInt(heightInput.value) || 512));
      const canvas = buildCompositeCanvas(w, h, 'png');
      const link = document.createElement('a');
      link.download = `qrcode_${w}x${h}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      App.showToast(`PNG QR Code (${w}×${h}px) downloaded!`, 'success');
    });

    // Download JPG
    downloadJpgBtn.addEventListener('click', () => {
      const w = Math.max(64, Math.min(4096, parseInt(widthInput.value) || 512));
      const h = Math.max(64, Math.min(4096, parseInt(heightInput.value) || 512));
      const canvas = buildCompositeCanvas(w, h, 'jpg');
      const link = document.createElement('a');
      link.download = `qrcode_${w}x${h}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      App.showToast(`JPG QR Code (${w}×${h}px) downloaded!`, 'success');
    });

    // Download PDF (Vector-compatible A4 document)
    downloadPdfBtn.addEventListener('click', () => {
      try {
        const w = Math.max(64, Math.min(4096, parseInt(widthInput.value) || 512));
        const h = Math.max(64, Math.min(4096, parseInt(heightInput.value) || 512));
        const canvas = buildCompositeCanvas(w, h, 'png');
        const imgData = canvas.toDataURL('image/png');

        if (window.jspdf && window.jspdf.jsPDF) {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          // Title & Header on PDF
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(22);
          doc.setTextColor(15, 23, 42);
          doc.text('QR Code Document', pageWidth / 2, 28, { align: 'center' });

          // Subtitle / Payload
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(100, 116, 139);
          const rawPayload = getQrPayload();
          const safePayload = rawPayload.length > 70 ? rawPayload.substring(0, 67) + '...' : rawPayload;
          doc.text(`Payload: ${safePayload}`, pageWidth / 2, 36, { align: 'center' });

          // QR Image centered on A4 paper (110mm x 110mm)
          const qrPrintSize = 110;
          const qrX = (pageWidth - qrPrintSize) / 2;
          const qrY = 50;
          doc.addImage(imgData, 'PNG', qrX, qrY, qrPrintSize, qrPrintSize);

          // Call to action
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(79, 70, 229);
          doc.text('Point camera to scan QR Code', pageWidth / 2, qrY + qrPrintSize + 14, { align: 'center' });

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(148, 163, 184);
          doc.text('Generated via OmniToolbox QR Code Studio', pageWidth / 2, pageHeight - 16, { align: 'center' });

          doc.save(`qrcode_${w}x${h}.pdf`);
          App.showToast('QR Code PDF downloaded successfully!', 'success');
        } else {
          App.showToast('jsPDF library loading... Please try again.', 'warning');
        }
      } catch (err) {
        console.error('PDF generation error:', err);
        App.showToast('Failed to generate PDF: ' + err.message, 'error');
      }
    });

    // Direct Print QR Code
    printQrBtn.addEventListener('click', () => {
      try {
        const w = Math.max(64, Math.min(4096, parseInt(widthInput.value) || 512));
        const h = Math.max(64, Math.min(4096, parseInt(heightInput.value) || 512));
        const canvas = buildCompositeCanvas(w, h, 'png');
        const imgData = canvas.toDataURL('image/png');
        const contentPayload = getQrPayload() || 'QR Code';
        const safePayload = String(contentPayload)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

        const printWindow = window.open('', '_blank', 'width=800,height=750');
        if (!printWindow) {
          App.showToast('Please allow browser popups to print QR Code', 'warning');
          return;
        }

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Print QR Code - OmniToolbox</title>
            <style>
              @page { size: auto; margin: 12mm; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 85vh;
                margin: 0;
                color: #1e293b;
                text-align: center;
                background: #f8fafc;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .no-print-toolbar {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
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
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
              }
              .toolbar-btn.primary {
                background: #4f46e5;
                color: #ffffff;
                border-color: #4338ca;
              }
              .print-card {
                background: #ffffff;
                border: 2px solid #e2e8f0;
                border-radius: 18px;
                padding: 36px 42px;
                max-width: 440px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.06);
              }
              .title {
                font-size: 22px;
                font-weight: 800;
                margin-bottom: 6px;
                color: #0f172a;
              }
              .subtitle {
                font-size: 13px;
                color: #64748b;
                word-break: break-all;
                margin-bottom: 24px;
                line-height: 1.4;
              }
              #qr-print-img {
                width: 280px;
                height: 280px;
                object-fit: contain;
                border-radius: 8px;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
                display: block;
                margin: 0 auto;
              }
              .badge {
                display: inline-block;
                margin-top: 22px;
                background: #4f46e5;
                color: white;
                padding: 8px 20px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.5px;
              }
              .footer {
                margin-top: 16px;
                font-size: 11px;
                color: #94a3b8;
              }
              @media print {
                body {
                  background: #ffffff !important;
                  min-height: auto !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                .no-print-toolbar {
                  display: none !important;
                }
                .print-card {
                  border: 2px solid #cbd5e1 !important;
                  box-shadow: none !important;
                  margin: 10px auto !important;
                  page-break-inside: avoid !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="no-print-toolbar">
              <button class="toolbar-btn primary" onclick="window.print()">Print Document</button>
              <button class="toolbar-btn" onclick="window.close()">Close Window</button>
            </div>
            <div class="print-card">
              <div class="title">Scan QR Code</div>
              <div class="subtitle">${safePayload}</div>
              <img id="qr-print-img" src="${imgData}" alt="QR Code">
              <div><span class="badge">POINT CAMERA TO SCAN</span></div>
              <div class="footer">Generated via OmniToolbox QR Studio</div>
            </div>
            <script>
              window.addEventListener('afterprint', function() {
                setTimeout(function() { window.close(); }, 300);
              });
              window.onload = function() {
                var img = document.getElementById('qr-print-img');
                function triggerPrint() {
                  window.focus();
                  setTimeout(function() { window.print(); }, 200);
                }
                if (img && !img.complete) {
                  img.onload = triggerPrint;
                  img.onerror = triggerPrint;
                } else {
                  triggerPrint();
                }
              };
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      } catch (err) {
        console.error('Print QR error:', err);
        App.showToast('Could not open print dialog: ' + err.message, 'error');
      }
    });

    // Copy to Clipboard
    copyClipboardBtn.addEventListener('click', () => {
      const w = Math.max(64, Math.min(4096, parseInt(widthInput.value) || 512));
      const h = Math.max(64, Math.min(4096, parseInt(heightInput.value) || 512));
      const canvas = buildCompositeCanvas(w, h, 'png');
      if (canvas.toBlob && navigator.clipboard && navigator.clipboard.write) {
        canvas.toBlob(blob => {
          if (!blob) {
            App.showToast('Could not export image blob', 'error');
            return;
          }
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            .then(() => App.showToast('QR Code copied to clipboard!', 'success'))
            .catch(() => App.showToast('Clipboard permissions not granted', 'error'));
        }, 'image/png');
      } else {
        App.showToast('Image clipboard not supported in this browser', 'error');
      }
    });

    // Initial render
    updatePreview();

    // QR Scanner Tab Logic
    const scanInput = document.getElementById('qr-scan-file-input');
    const scanPreview = document.getElementById('qr-scan-preview');
    const scanResult = document.getElementById('qr-scanned-result');
    const copyScanBtn = document.getElementById('btn-copy-scanned-qr');
    const scanLinkDiv = document.getElementById('qr-scan-action-link');

    scanInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            scanPreview.innerHTML = `<img src="${ev.target.result}" style="max-height:160px; border-radius:8px;" />`;
            decodeQRFromImage(img);
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    function decodeQRFromImage(img) {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (typeof jsQR !== 'undefined') {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          scanResult.value = code.data;
          copyScanBtn.style.display = 'inline-flex';
          App.showToast('QR Code decoded successfully!', 'success');

          if (code.data.startsWith('http://') || code.data.startsWith('https://')) {
            scanLinkDiv.innerHTML = `<a href="${code.data}" target="_blank" class="btn btn-sm btn-cyan"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open URL</a>`;
          } else {
            scanLinkDiv.innerHTML = '';
          }
        } else {
          scanResult.value = 'No QR code could be detected in this image. Try another clear image.';
          copyScanBtn.style.display = 'none';
          scanLinkDiv.innerHTML = '';
          App.showToast('Could not find a QR code in the image', 'error');
        }
      }
    }

    copyScanBtn.addEventListener('click', () => {
      App.copyToClipboard(scanResult.value, 'Scanned QR content copied!');
    });
  },

  // 2. Ultra-Secure Password Generator
  renderPasswordGenerator(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header"><span>Password Configuration</span></div>

          <div class="form-group">
            <label class="form-label" style="display:flex; justify-content:space-between;">
              <span>Password Length</span><span class="slider-val-badge" id="val-pwd-len">18 chars</span>
            </label>
            <input type="range" id="pwd-len-slider" class="range-slider" min="6" max="64" value="18">
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1.25rem;">
            <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
              <input type="checkbox" id="pwd-opt-upper" checked> Include Uppercase (A - Z)
            </label>
            <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
              <input type="checkbox" id="pwd-opt-lower" checked> Include Lowercase (a - z)
            </label>
            <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
              <input type="checkbox" id="pwd-opt-nums" checked> Include Numbers (0 - 9)
            </label>
            <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
              <input type="checkbox" id="pwd-opt-syms" checked> Include Symbols (!@#$%^&*~)
            </label>
            <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
              <input type="checkbox" id="pwd-opt-no-ambig"> Avoid Ambiguous Characters (l, 1, I, O, 0)
            </label>
          </div>

          <button class="btn btn-primary" id="btn-gen-pwd" style="margin-top:1.5rem; width:100%;">
            <i class="fa-solid fa-arrows-rotate"></i> Generate New Password
          </button>
        </div>

        <div class="pane-card" style="justify-content:center;">
          <div class="pane-header"><span>Generated Password</span></div>

          <div style="background:#05070c; border:1px solid var(--border-medium); border-radius:var(--radius-sm); padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; gap:1rem;">
            <span id="pwd-display-text" style="font-family:var(--font-mono); font-size:1.25rem; font-weight:700; color:var(--text-primary); word-break:break-all; user-select:all;">••••••••••••</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-pwd">
              <i class="fa-solid fa-copy"></i> Copy
            </button>
          </div>

          <div class="strength-meter" style="margin-top:1.25rem;">
            <div class="strength-bar" id="pwd-strength-bar"></div>
          </div>
          <div class="strength-text">
            <span id="pwd-strength-label" style="color:var(--text-muted);">Strength: Analyzing</span>
            <span id="pwd-entropy-label" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">0 bits entropy</span>
          </div>

          <div style="margin-top:1.5rem; background:rgba(255,255,255,0.03); padding:0.85rem; border-radius:8px; font-size:0.8rem; color:var(--text-secondary); line-height:1.5;">
            <i class="fa-solid fa-shield-halved" style="color:var(--accent-emerald);"></i> <strong>Cryptographically Secure:</strong> Generated using the Web Crypto API (<code>crypto.getRandomValues</code>) right on your CPU.
          </div>
        </div>
      </div>
    `;

    this.initPasswordLogic();
  },

  initPasswordLogic() {
    const lenSlider = document.getElementById('pwd-len-slider');
    const lenBadge = document.getElementById('val-pwd-len');
    const upperCheck = document.getElementById('pwd-opt-upper');
    const lowerCheck = document.getElementById('pwd-opt-lower');
    const numsCheck = document.getElementById('pwd-opt-nums');
    const symsCheck = document.getElementById('pwd-opt-syms');
    const noAmbigCheck = document.getElementById('pwd-opt-no-ambig');
    const genBtn = document.getElementById('btn-gen-pwd');
    const copyBtn = document.getElementById('btn-copy-pwd');
    const displayText = document.getElementById('pwd-display-text');
    const strengthBar = document.getElementById('pwd-strength-bar');
    const strengthLabel = document.getElementById('pwd-strength-label');
    const entropyLabel = document.getElementById('pwd-entropy-label');

    lenSlider.addEventListener('input', () => {
      lenBadge.textContent = lenSlider.value + ' chars';
      generatePassword();
    });

    [upperCheck, lowerCheck, numsCheck, symsCheck, noAmbigCheck].forEach(c => {
      c.addEventListener('change', generatePassword);
    });
    genBtn.addEventListener('click', generatePassword);

    function generatePassword() {
      let chars = '';
      let poolSize = 0;

      let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lower = 'abcdefghijklmnopqrstuvwxyz';
      let nums = '0123456789';
      let syms = '!@#$%^&*()_+~|}{[]:;?><,.-=';

      if (noAmbigCheck.checked) {
        upper = upper.replace(/[IO]/g, '');
        lower = lower.replace(/[lo]/g, '');
        nums = nums.replace(/[01]/g, '');
      }

      if (upperCheck.checked) { chars += upper; poolSize += upper.length; }
      if (lowerCheck.checked) { chars += lower; poolSize += lower.length; }
      if (numsCheck.checked) { chars += nums; poolSize += nums.length; }
      if (symsCheck.checked) { chars += syms; poolSize += syms.length; }

      if (!chars) {
        displayText.textContent = 'Select at least one set';
        return;
      }

      const length = parseInt(lenSlider.value);
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);

      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }

      displayText.textContent = result;

      // Entropy = L * log2(R)
      const entropy = Math.round(length * Math.log2(poolSize));
      entropyLabel.textContent = `${entropy} bits entropy`;

      if (entropy < 40) {
        strengthBar.style.width = '25%';
        strengthBar.style.background = '#ef4444';
        strengthLabel.textContent = 'Strength: Weak';
        strengthLabel.style.color = '#ef4444';
      } else if (entropy < 65) {
        strengthBar.style.width = '55%';
        strengthBar.style.background = '#f59e0b';
        strengthLabel.textContent = 'Strength: Moderate';
        strengthLabel.style.color = '#f59e0b';
      } else if (entropy < 90) {
        strengthBar.style.width = '85%';
        strengthBar.style.background = '#10b981';
        strengthLabel.textContent = 'Strength: Strong';
        strengthLabel.style.color = '#10b981';
      } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = '#06b6d4';
        strengthLabel.textContent = 'Strength: Military-Grade';
        strengthLabel.style.color = '#06b6d4';
      }
    }

    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(displayText.textContent, 'Password copied to clipboard!');
    });

    generatePassword();
  },

  // 3. Text Analyzer & Case Converter
  renderTextTools(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>Input Text</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="btn-clear-text-tool">Clear</button>
            </div>
          </div>

          <textarea id="text-tool-input" class="form-control" style="flex:1; min-height:260px; font-family:var(--font-sans); font-size:0.95rem;" placeholder="Type or paste your text here to transform cases or analyze metrics..."></textarea>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:0.5rem; margin-top:1rem;">
            <button class="btn btn-sm btn-secondary" data-case="upper">UPPERCASE</button>
            <button class="btn btn-sm btn-secondary" data-case="lower">lowercase</button>
            <button class="btn btn-sm btn-secondary" data-case="title">Title Case</button>
            <button class="btn btn-sm btn-secondary" data-case="sentence">Sentence case</button>
            <button class="btn btn-sm btn-secondary" data-case="camel">camelCase</button>
            <button class="btn btn-sm btn-secondary" data-case="snake">snake_case</button>
            <button class="btn btn-sm btn-secondary" data-case="kebab">kebab-case</button>
            <button class="btn btn-sm btn-secondary" data-case="reverse">esreveR</button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Text Analytics & Counts</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-transformed-text">
              <i class="fa-solid fa-copy"></i> Copy Text
            </button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); text-align:center;">
              <div style="font-size:1.8rem; font-weight:800; color:var(--primary);" id="stat-words">0</div>
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Words</div>
            </div>
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); text-align:center;">
              <div style="font-size:1.8rem; font-weight:800; color:var(--accent-cyan);" id="stat-chars">0</div>
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Characters</div>
            </div>
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); text-align:center;">
              <div style="font-size:1.8rem; font-weight:800; color:var(--accent-emerald);" id="stat-sentences">0</div>
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Sentences</div>
            </div>
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); text-align:center;">
              <div style="font-size:1.8rem; font-weight:800; color:var(--accent-purple);" id="stat-reading-time">0s</div>
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Reading Time</div>
            </div>
          </div>

          <div class="image-meta-strip" style="margin-top:1.25rem; flex-direction:column; align-items:flex-start; gap:0.5rem;">
            <div>Chars without spaces: <strong id="stat-chars-no-space">0</strong></div>
            <div>Paragraphs: <strong id="stat-paragraphs">0</strong></div>
          </div>
        </div>
      </div>
    `;

    this.initTextLogic();
  },

  initTextLogic() {
    const input = document.getElementById('text-tool-input');
    const wordsSpan = document.getElementById('stat-words');
    const charsSpan = document.getElementById('stat-chars');
    const sentencesSpan = document.getElementById('stat-sentences');
    const readingSpan = document.getElementById('stat-reading-time');
    const noSpacesSpan = document.getElementById('stat-chars-no-space');
    const parasSpan = document.getElementById('stat-paragraphs');

    input.value = `Welcome to OmniToolbox! This modern web application provides everyday utilities directly within your browser. Convert images, merge PDF documents, format code, and execute Python 3 with zero server uploads.`;

    function updateAnalytics() {
      const text = input.value;
      charsSpan.textContent = text.length;
      noSpacesSpan.textContent = text.replace(/\s/g, '').length;

      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      wordsSpan.textContent = words;

      const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (text.trim().length ? 1 : 0) : 0;
      sentencesSpan.textContent = sentences;

      const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
      parasSpan.textContent = paragraphs;

      // 200 words per minute average reading
      const seconds = Math.round((words / 200) * 60);
      readingSpan.textContent = seconds < 60 ? `${seconds}s` : `${Math.round(seconds / 60)}m`;
    }

    input.addEventListener('input', updateAnalytics);

    document.querySelectorAll('[data-case]').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.dataset.case;
        const text = input.value;
        if (!text) return;

        if (c === 'upper') {
          input.value = text.toUpperCase();
        } else if (c === 'lower') {
          input.value = text.toLowerCase();
        } else if (c === 'title') {
          input.value = text.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
        } else if (c === 'sentence') {
          input.value = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, s => s.toUpperCase());
        } else if (c === 'camel') {
          input.value = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        } else if (c === 'snake') {
          input.value = text.trim().toLowerCase().replace(/[\s\W-]+/g, '_');
        } else if (c === 'kebab') {
          input.value = text.trim().toLowerCase().replace(/[\s\W_]+/g, '-');
        } else if (c === 'reverse') {
          input.value = text.split('').reverse().join('');
        }
        updateAnalytics();
        App.showToast(`Applied ${c} case!`, 'info');
      });
    });

    document.getElementById('btn-clear-text-tool').addEventListener('click', () => {
      input.value = '';
      updateAnalytics();
    });

    document.getElementById('btn-copy-transformed-text').addEventListener('click', () => {
      App.copyToClipboard(input.value, 'Text copied to clipboard!');
    });

    updateAnalytics();
  },

  // 4. Text Diff Checker
  renderDiffChecker(container) {
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div class="split-pane">
          <div class="pane-card">
            <div class="pane-header"><span>Original Text</span></div>
            <textarea id="diff-orig" class="form-control" style="min-height:180px; font-family:var(--font-mono); font-size:0.85rem;" placeholder="Original text..."></textarea>
          </div>
          <div class="pane-card">
            <div class="pane-header"><span>Modified Text</span></div>
            <textarea id="diff-mod" class="form-control" style="min-height:180px; font-family:var(--font-mono); font-size:0.85rem;" placeholder="Modified text..."></textarea>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:0.75rem;">
          <button class="btn btn-primary" id="btn-compute-diff">
            <i class="fa-solid fa-code-compare"></i> Compare Differences
          </button>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Visual Difference Results</span>
            <div style="display:flex; gap:0.75rem; font-size:0.78rem;">
              <span style="color:#34d399;">+ Additions</span>
              <span style="color:#f87171;">- Deletions</span>
            </div>
          </div>
          <div id="diff-output-box" class="diff-result-container">
            <div class="text-muted" style="padding:1rem; text-align:center;">Click "Compare Differences" to view line-by-line diff</div>
          </div>
        </div>
      </div>
    `;

    const orig = document.getElementById('diff-orig');
    const mod = document.getElementById('diff-mod');
    const outBox = document.getElementById('diff-output-box');
    const compareBtn = document.getElementById('btn-compute-diff');

    orig.value = `const server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello World');\n});`;
    mod.value = `const server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'application/json');\n  res.end(JSON.stringify({ status: 'ok', msg: 'Hello Modern Web' }));\n});`;

    compareBtn.addEventListener('click', () => {
      const origLines = orig.value.split('\n');
      const modLines = mod.value.split('\n');

      outBox.innerHTML = '';

      if (typeof Diff !== 'undefined') {
        const diff = Diff.diffLines(orig.value, mod.value);
        diff.forEach(part => {
          const colorClass = part.added ? 'added' : (part.removed ? 'removed' : 'unchanged');
          const prefix = part.added ? '+ ' : (part.removed ? '- ' : '  ');
          const lines = part.value.replace(/\n$/, '').split('\n');
          lines.forEach(l => {
            const div = document.createElement('div');
            div.className = `diff-line ${colorClass}`;
            div.textContent = `${prefix}${l}`;
            outBox.appendChild(div);
          });
        });
      } else {
        // Fallback naive line comparison
        const max = Math.max(origLines.length, modLines.length);
        for (let i = 0; i < max; i++) {
          const ol = origLines[i];
          const ml = modLines[i];
          if (ol !== ml) {
            if (ol !== undefined) {
              const d = document.createElement('div');
              d.className = 'diff-line removed';
              d.textContent = `- ${ol}`;
              outBox.appendChild(d);
            }
            if (ml !== undefined) {
              const d = document.createElement('div');
              d.className = 'diff-line added';
              d.textContent = `+ ${ml}`;
              outBox.appendChild(d);
            }
          } else {
            const d = document.createElement('div');
            d.className = 'diff-line unchanged';
            d.textContent = `  ${ol}`;
            outBox.appendChild(d);
          }
        }
      }
      App.showToast('Diff calculated!', 'success');
    });
  },

  // 5. Hash Generator & Checksum
  renderHashGenerator(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header"><span>Input String or Secret</span></div>
          <textarea id="hash-input-text" class="form-control" style="min-height:160px; font-family:var(--font-mono);" placeholder="Type any string to compute cryptographic hashes in real-time..."></textarea>

          <div class="form-group" style="margin-top:1.25rem;">
            <label class="form-label">Compare Against Checksum (Verify Hash)</label>
            <input type="text" id="hash-compare-input" class="form-control" placeholder="Paste hash to verify matches...">
            <div id="hash-compare-result" style="margin-top:0.4rem; font-size:0.8rem; font-weight:600;"></div>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header"><span>Computed Hashes</span></div>

          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; font-size:0.8rem; font-weight:700; color:var(--accent-cyan);">
                <span>SHA-256</span>
                <span class="copy-link" data-copy-id="hash-sha256" style="cursor:pointer; color:var(--text-secondary);"><i class="fa-solid fa-copy"></i></span>
              </div>
              <input type="text" id="hash-sha256" class="form-control" style="font-family:var(--font-mono); font-size:0.82rem;" readonly>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; font-size:0.8rem; font-weight:700; color:var(--primary);">
                <span>SHA-512</span>
                <span class="copy-link" data-copy-id="hash-sha512" style="cursor:pointer; color:var(--text-secondary);"><i class="fa-solid fa-copy"></i></span>
              </div>
              <input type="text" id="hash-sha512" class="form-control" style="font-family:var(--font-mono); font-size:0.82rem;" readonly>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; font-size:0.8rem; font-weight:700; color:var(--accent-emerald);">
                <span>SHA-1</span>
                <span class="copy-link" data-copy-id="hash-sha1" style="cursor:pointer; color:var(--text-secondary);"><i class="fa-solid fa-copy"></i></span>
              </div>
              <input type="text" id="hash-sha1" class="form-control" style="font-family:var(--font-mono); font-size:0.82rem;" readonly>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; font-size:0.8rem; font-weight:700; color:var(--accent-purple);">
                <span>MD5 (Fast JS implementation)</span>
                <span class="copy-link" data-copy-id="hash-md5" style="cursor:pointer; color:var(--text-secondary);"><i class="fa-solid fa-copy"></i></span>
              </div>
              <input type="text" id="hash-md5" class="form-control" style="font-family:var(--font-mono); font-size:0.82rem;" readonly>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initHashLogic();
  },

  initHashLogic() {
    const input = document.getElementById('hash-input-text');
    const sha256Out = document.getElementById('hash-sha256');
    const sha512Out = document.getElementById('hash-sha512');
    const sha1Out = document.getElementById('hash-sha1');
    const md5Out = document.getElementById('hash-md5');
    const compareInput = document.getElementById('hash-compare-input');
    const compareResult = document.getElementById('hash-compare-result');

    input.value = "Hello OmniToolbox!";

    async function computeSubtleHash(algo, text) {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Fast pure JS MD5 fallback implementation
    function md5(string) {
      function rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
      }
      function addUnsigned(lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
          if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
          else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else return (lResult ^ lX8 ^ lY8);
      }
      function F(x, y, z) { return (x & y) | ((~x) & z); }
      function G(x, y, z) { return (x & z) | (y & (~z)); }
      function H(x, y, z) { return (x ^ y ^ z); }
      function I(x, y, z) { return (y ^ (x | (~z))); }
      function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function convertToWordArray(string) {
        let lWordCount;
        const lMessageLength = string.length;
        const lNumberOfWords_temp1 = lMessageLength + 8;
        const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        const lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
          lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
      }
      function wordToHex(lValue) {
        let WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = (lValue >>> (lCount * 8)) & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
      }
      let x = convertToWordArray(string);
      let k, AA, BB, CC, DD, a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
      const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
      const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
      const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
      const S41 = 6, S42 = 10, S43 = 15, S44 = 21;
      for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA); b = addUnsigned(b, BB);
        c = addUnsigned(c, CC); d = addUnsigned(d, DD);
      }
      return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
    }

    async function updateHashes() {
      const text = input.value;
      if (!text) {
        sha256Out.value = sha512Out.value = sha1Out.value = md5Out.value = '';
        checkMatch();
        return;
      }

      sha256Out.value = await computeSubtleHash('SHA-256', text);
      sha512Out.value = await computeSubtleHash('SHA-512', text);
      sha1Out.value = await computeSubtleHash('SHA-1', text);
      md5Out.value = md5(text);
      checkMatch();
    }

    function checkMatch() {
      const target = compareInput.value.trim().toLowerCase();
      if (!target) {
        compareResult.textContent = '';
        return;
      }
      const hashes = [sha256Out.value, sha512Out.value, sha1Out.value, md5Out.value];
      if (hashes.includes(target)) {
        compareResult.textContent = '✓ Checksum Match Verified!';
        compareResult.style.color = 'var(--accent-emerald)';
      } else {
        compareResult.textContent = '✗ Checksum does not match any current hash.';
        compareResult.style.color = 'var(--accent-rose)';
      }
    }

    input.addEventListener('input', updateHashes);
    compareInput.addEventListener('input', checkMatch);

    document.querySelectorAll('[data-copy-id]').forEach(link => {
      link.addEventListener('click', () => {
        const id = link.dataset.copyId;
        const val = document.getElementById(id).value;
        App.copyToClipboard(val, 'Hash copied!');
      });
    });

    updateHashes();
  },

  // 6. Unit & Timestamp Converter
  renderUnitConverter(container) {
    container.innerHTML = `
      <div class="tabs-header">
        <button class="tab-btn active" data-unit-tab="data"><i class="fa-solid fa-hard-drive"></i> Data Storage</button>
        <button class="tab-btn" data-unit-tab="epoch"><i class="fa-solid fa-clock"></i> Unix Epoch & Time</button>
        <button class="tab-btn" data-unit-tab="length"><i class="fa-solid fa-ruler"></i> Length & Dist</button>
        <button class="tab-btn" data-unit-tab="temp"><i class="fa-solid fa-temperature-half"></i> Temperature</button>
      </div>

      <!-- Tab: Digital Storage -->
      <div id="u-tab-data" class="unit-pane">
        <div class="unit-calc-row">
          <div class="form-group">
            <label class="form-label">Value</label>
            <input type="number" id="data-val-in" class="form-control" value="1024">
            <select id="data-unit-in" class="form-control" style="margin-top:0.5rem;">
              <option value="1">Bytes (B)</option>
              <option value="1024" selected>Kilobytes (KB)</option>
              <option value="1048576">Megabytes (MB)</option>
              <option value="1073741824">Gigabytes (GB)</option>
              <option value="1099511627776">Terabytes (TB)</option>
            </select>
          </div>

          <div class="swap-units-btn" id="btn-swap-data"><i class="fa-solid fa-right-left"></i></div>

          <div class="form-group">
            <label class="form-label">Converted Result</label>
            <input type="text" id="data-val-out" class="form-control" readonly>
            <select id="data-unit-out" class="form-control" style="margin-top:0.5rem;">
              <option value="1">Bytes (B)</option>
              <option value="1024">Kilobytes (KB)</option>
              <option value="1048576" selected>Megabytes (MB)</option>
              <option value="1073741824">Gigabytes (GB)</option>
              <option value="1099511627776">Terabytes (TB)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tab: Unix Epoch -->
      <div id="u-tab-epoch" class="unit-pane" style="display:none;">
        <div class="pane-card" style="margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span class="text-muted" style="font-size:0.8rem;">CURRENT UNIX TIMESTAMP</span>
              <div id="live-epoch-clock" style="font-size:1.8rem; font-family:var(--font-mono); font-weight:800; color:var(--primary);">0</div>
            </div>
            <button class="btn btn-sm btn-secondary" id="btn-copy-epoch"><i class="fa-solid fa-copy"></i> Copy Current</button>
          </div>
        </div>

        <div class="split-pane">
          <div class="pane-card">
            <div class="pane-header"><span>Epoch Timestamp to Date</span></div>
            <input type="number" id="epoch-to-date-in" class="form-control" placeholder="e.g. 1775432100">
            <div id="epoch-to-date-res" style="margin-top:0.85rem; font-family:var(--font-mono); font-size:0.88rem; line-height:1.6;"></div>
          </div>

          <div class="pane-card">
            <div class="pane-header"><span>Date Picker to Epoch</span></div>
            <input type="datetime-local" id="date-to-epoch-in" class="form-control">
            <div id="date-to-epoch-res" style="margin-top:0.85rem; font-family:var(--font-mono); font-size:0.88rem; line-height:1.6;"></div>
          </div>
        </div>
      </div>

      <!-- Tab: Length -->
      <div id="u-tab-length" class="unit-pane" style="display:none;">
        <div class="unit-calc-row">
          <div class="form-group">
            <label class="form-label">From</label>
            <input type="number" id="len-val-in" class="form-control" value="100">
            <select id="len-unit-in" class="form-control" style="margin-top:0.5rem;">
              <option value="1" selected>Meters (m)</option>
              <option value="1000">Kilometers (km)</option>
              <option value="0.3048">Feet (ft)</option>
              <option value="0.0254">Inches (in)</option>
              <option value="1609.34">Miles (mi)</option>
            </select>
          </div>
          <div class="swap-units-btn" id="btn-swap-len"><i class="fa-solid fa-right-left"></i></div>
          <div class="form-group">
            <label class="form-label">To</label>
            <input type="text" id="len-val-out" class="form-control" readonly>
            <select id="len-unit-out" class="form-control" style="margin-top:0.5rem;">
              <option value="1">Meters (m)</option>
              <option value="1000">Kilometers (km)</option>
              <option value="0.3048" selected>Feet (ft)</option>
              <option value="0.0254">Inches (in)</option>
              <option value="1609.34">Miles (mi)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tab: Temperature -->
      <div id="u-tab-temp" class="unit-pane" style="display:none;">
        <div class="unit-calc-row">
          <div class="form-group">
            <label class="form-label">Degrees</label>
            <input type="number" id="temp-val-in" class="form-control" value="25">
            <select id="temp-unit-in" class="form-control" style="margin-top:0.5rem;">
              <option value="C" selected>Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>
          <div class="swap-units-btn" id="btn-swap-temp"><i class="fa-solid fa-right-left"></i></div>
          <div class="form-group">
            <label class="form-label">Converted</label>
            <input type="text" id="temp-val-out" class="form-control" readonly>
            <select id="temp-unit-out" class="form-control" style="margin-top:0.5rem;">
              <option value="C">Celsius (°C)</option>
              <option value="F" selected>Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>
        </div>
      </div>
    `;

    this.initUnitLogic();
  },

  initUnitLogic() {
    // Tab switching
    const tabs = document.querySelectorAll('[data-unit-tab]');
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const target = t.dataset.unitTab;
        ['data', 'epoch', 'length', 'temp'].forEach(k => {
          document.getElementById(`u-tab-${k}`).style.display = k === target ? 'block' : 'none';
        });
      });
    });

    // 1. Data converter
    const dataIn = document.getElementById('data-val-in');
    const dataUnitIn = document.getElementById('data-unit-in');
    const dataOut = document.getElementById('data-val-out');
    const dataUnitOut = document.getElementById('data-unit-out');

    function calcData() {
      const val = parseFloat(dataIn.value) || 0;
      const factorIn = parseFloat(dataUnitIn.value);
      const factorOut = parseFloat(dataUnitOut.value);
      const bytes = val * factorIn;
      const res = bytes / factorOut;
      dataOut.value = Number.isInteger(res) ? res : res.toFixed(4);
    }
    dataIn.addEventListener('input', calcData);
    dataUnitIn.addEventListener('change', calcData);
    dataUnitOut.addEventListener('change', calcData);
    document.getElementById('btn-swap-data').addEventListener('click', () => {
      const temp = dataUnitIn.value;
      dataUnitIn.value = dataUnitOut.value;
      dataUnitOut.value = temp;
      calcData();
    });
    calcData();

    // 2. Epoch
    const clock = document.getElementById('live-epoch-clock');
    setInterval(() => {
      clock.textContent = Math.floor(Date.now() / 1000);
    }, 1000);
    clock.textContent = Math.floor(Date.now() / 1000);

    document.getElementById('btn-copy-epoch').addEventListener('click', () => {
      App.copyToClipboard(clock.textContent, 'Current timestamp copied!');
    });

    const epochIn = document.getElementById('epoch-to-date-in');
    const epochRes = document.getElementById('epoch-to-date-res');
    epochIn.value = Math.floor(Date.now() / 1000);

    function updateEpochToDate() {
      const val = parseInt(epochIn.value);
      if (isNaN(val)) return;
      const d = new Date(val * 1000);
      epochRes.innerHTML = `
        <div><strong>GMT:</strong> ${d.toUTCString()}</div>
        <div style="margin-top:4px;"><strong>Local:</strong> ${d.toLocaleString()}</div>
      `;
    }
    epochIn.addEventListener('input', updateEpochToDate);
    updateEpochToDate();

    const dateIn = document.getElementById('date-to-epoch-in');
    const dateRes = document.getElementById('date-to-epoch-res');
    const nowIso = new Date().toISOString().slice(0, 16);
    dateIn.value = nowIso;

    function updateDateToEpoch() {
      const ms = Date.parse(dateIn.value);
      if (isNaN(ms)) return;
      const sec = Math.floor(ms / 1000);
      dateRes.innerHTML = `<div><strong>Timestamp:</strong> ${sec}</div>`;
    }
    dateIn.addEventListener('input', updateDateToEpoch);
    updateDateToEpoch();

    // 3. Length
    const lenIn = document.getElementById('len-val-in');
    const lenUnitIn = document.getElementById('len-unit-in');
    const lenOut = document.getElementById('len-val-out');
    const lenUnitOut = document.getElementById('len-unit-out');

    function calcLen() {
      const val = parseFloat(lenIn.value) || 0;
      const fIn = parseFloat(lenUnitIn.value);
      const fOut = parseFloat(lenUnitOut.value);
      const meters = val * fIn;
      const res = meters / fOut;
      lenOut.value = Number.isInteger(res) ? res : res.toFixed(4);
    }
    lenIn.addEventListener('input', calcLen);
    lenUnitIn.addEventListener('change', calcLen);
    lenUnitOut.addEventListener('change', calcLen);
    document.getElementById('btn-swap-len').addEventListener('click', () => {
      const t = lenUnitIn.value;
      lenUnitIn.value = lenUnitOut.value;
      lenUnitOut.value = t;
      calcLen();
    });
    calcLen();

    // 4. Temp
    const tempIn = document.getElementById('temp-val-in');
    const tempUnitIn = document.getElementById('temp-unit-in');
    const tempOut = document.getElementById('temp-val-out');
    const tempUnitOut = document.getElementById('temp-unit-out');

    function calcTemp() {
      const val = parseFloat(tempIn.value) || 0;
      const from = tempUnitIn.value;
      const to = tempUnitOut.value;

      let celsius = val;
      if (from === 'F') celsius = (val - 32) * (5 / 9);
      if (from === 'K') celsius = val - 273.15;

      let target = celsius;
      if (to === 'F') target = (celsius * 9 / 5) + 32;
      if (to === 'K') target = celsius + 273.15;

      tempOut.value = target.toFixed(2);
    }
    tempIn.addEventListener('input', calcTemp);
    tempUnitIn.addEventListener('change', calcTemp);
    tempUnitOut.addEventListener('change', calcTemp);
    document.getElementById('btn-swap-temp').addEventListener('click', () => {
      const t = tempUnitIn.value;
      tempUnitIn.value = tempUnitOut.value;
      tempUnitOut.value = t;
      calcTemp();
    });
    calcTemp();
  },

  // 7. URL Encoder & Query Param Inspector
  renderUrlEncoder(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>Input URL or String</span>
            <button class="btn btn-sm btn-secondary" id="btn-sample-url">Sample URL</button>
          </div>

          <textarea id="url-input-text" class="form-control" style="flex:1; min-height:160px; font-family:var(--font-mono); font-size:0.85rem;" placeholder="https://example.com/search?q=omnitoolbox&category=dev tools"></textarea>

          <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
            <button class="btn btn-primary btn-sm" id="btn-url-encode">Encode URL</button>
            <button class="btn btn-secondary btn-sm" id="btn-url-decode">Decode URL</button>
            <button class="btn btn-secondary btn-sm" id="btn-url-comp-encode">Encode Component</button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Result & Output</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-url-res">
              <i class="fa-solid fa-copy"></i> Copy
            </button>
          </div>

          <textarea id="url-output-text" class="form-control" style="flex:1; min-height:160px; font-family:var(--font-mono); font-size:0.85rem;" readonly></textarea>
        </div>
      </div>

      <div class="pane-card" style="margin-top:1.25rem;">
        <div class="pane-header">
          <span><i class="fa-solid fa-list-check"></i> URL Query Parameters Breakdown</span>
          <span id="param-count-badge" class="badge">0 parameters</span>
        </div>
        <div id="url-params-table" style="max-height:220px; overflow-y:auto;">
          <div class="text-muted" style="text-align:center; padding:1rem;">Enter a URL with query parameters (e.g. ?key=val) to view table breakdown</div>
        </div>
      </div>
    `;

    const input = document.getElementById('url-input-text');
    const output = document.getElementById('url-output-text');
    const tableDiv = document.getElementById('url-params-table');
    const countBadge = document.getElementById('param-count-badge');

    const sample = 'https://omnitoolbox.dev/search?q=developer utilities&lang=en&theme=dark&page=1&ref=product hunt';
    input.value = sample;

    function parseParams() {
      try {
        const urlStr = input.value.trim();
        const url = new URL(urlStr);
        const entries = [...url.searchParams.entries()];

        countBadge.textContent = `${entries.length} parameters`;

        if (!entries.length) {
          tableDiv.innerHTML = `<div class="text-muted" style="text-align:center; padding:1rem;">No query parameters found in URL</div>`;
          return;
        }

        let html = `
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem; font-family:var(--font-mono);">
            <thead>
              <tr style="border-bottom:1px solid var(--border-medium); text-align:left; color:var(--text-muted);">
                <th style="padding:0.5rem;">Key (Parameter)</th>
                <th style="padding:0.5rem;">Value</th>
                <th style="padding:0.5rem; text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
        `;

        entries.forEach(([k, v]) => {
          html += `
            <tr style="border-bottom:1px solid var(--border-subtle);">
              <td style="padding:0.55rem; color:var(--accent-cyan); font-weight:600;">${k}</td>
              <td style="padding:0.55rem; color:var(--text-primary); word-break:break-all;">${v}</td>
              <td style="padding:0.55rem; text-align:right;">
                <button class="btn btn-sm btn-icon" onclick="App.copyToClipboard('${v}', 'Copied parameter value!')" title="Copy value"><i class="fa-solid fa-copy"></i></button>
              </td>
            </tr>
          `;
        });

        html += `</tbody></table>`;
        tableDiv.innerHTML = html;
      } catch (e) {
        countBadge.textContent = '0 parameters';
        tableDiv.innerHTML = `<div class="text-muted" style="text-align:center; padding:1rem;">Enter a valid URL (including https://) to view parameters</div>`;
      }
    }

    document.getElementById('btn-url-encode').addEventListener('click', () => {
      output.value = encodeURI(input.value);
      App.showToast('URL Encoded!', 'success');
    });

    document.getElementById('btn-url-decode').addEventListener('click', () => {
      try {
        output.value = decodeURIComponent(input.value);
        App.showToast('URL Decoded!', 'success');
      } catch (e) {
        output.value = decodeURI(input.value);
      }
    });

    document.getElementById('btn-url-comp-encode').addEventListener('click', () => {
      output.value = encodeURIComponent(input.value);
      App.showToast('Component Encoded!', 'success');
    });

    document.getElementById('btn-sample-url').addEventListener('click', () => {
      input.value = sample;
      output.value = encodeURI(sample);
      parseParams();
    });

    document.getElementById('btn-copy-url-res').addEventListener('click', () => {
      App.copyToClipboard(output.value, 'Result copied!');
    });

    input.addEventListener('input', parseParams);
    output.value = encodeURI(sample);
    parseParams();
  },

  // 8. Text Base64 & Hex Encoder / Decoder
  renderTextBase64(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>Input String</span>
            <button class="btn btn-sm btn-secondary" id="btn-sample-t64">Sample</button>
          </div>

          <textarea id="t64-input" class="form-control" style="flex:1; min-height:240px; font-family:var(--font-mono); font-size:0.9rem;" placeholder="Type text here to encode or paste Base64/Hex to decode..."></textarea>

          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.75rem;">
            <button class="btn btn-primary btn-sm" id="btn-txt-to-b64">Text &rarr; Base64</button>
            <button class="btn btn-secondary btn-sm" id="btn-b64-to-txt">Base64 &rarr; Text</button>
            <button class="btn btn-cyan btn-sm" id="btn-txt-to-hex">Text &rarr; Hex</button>
            <button class="btn btn-secondary btn-sm" id="btn-hex-to-txt">Hex &rarr; Text</button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Encoded / Decoded Result</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-t64">
              <i class="fa-solid fa-copy"></i> Copy Result
            </button>
          </div>

          <textarea id="t64-output" class="form-control" style="flex:1; min-height:240px; font-family:var(--font-mono); font-size:0.9rem;" readonly placeholder="Result will appear here..."></textarea>
        </div>
      </div>
    `;

    const input = document.getElementById('t64-input');
    const output = document.getElementById('t64-output');

    input.value = "OmniToolbox: Universal daily utilities running 100% in your browser.";

    // UTF-8 Safe Base64
    function utf8ToBase64(str) {
      return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
    }
    function base64ToUtf8(str) {
      return decodeURIComponent(Array.prototype.map.call(window.atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }

    // Text to Hex & Hex to Text
    function textToHex(str) {
      return Array.from(new TextEncoder().encode(str)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    }
    function hexToText(hex) {
      const clean = hex.replace(/[^0-9a-fA-F]/g, '');
      const bytes = new Uint8Array(clean.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      return new TextDecoder().decode(bytes);
    }

    document.getElementById('btn-txt-to-b64').addEventListener('click', () => {
      try {
        output.value = utf8ToBase64(input.value);
        App.showToast('Encoded to Base64!', 'success');
      } catch (e) {
        App.showToast('Encoding error: ' + e.message, 'error');
      }
    });

    document.getElementById('btn-b64-to-txt').addEventListener('click', () => {
      try {
        output.value = base64ToUtf8(input.value.trim());
        App.showToast('Decoded Base64 to Text!', 'success');
      } catch (e) {
        App.showToast('Invalid Base64 string', 'error');
      }
    });

    document.getElementById('btn-txt-to-hex').addEventListener('click', () => {
      output.value = textToHex(input.value);
      App.showToast('Converted to Hex bytes!', 'success');
    });

    document.getElementById('btn-hex-to-txt').addEventListener('click', () => {
      try {
        output.value = hexToText(input.value);
        App.showToast('Decoded Hex to Text!', 'success');
      } catch (e) {
        App.showToast('Invalid Hex string', 'error');
      }
    });

    document.getElementById('btn-sample-t64').addEventListener('click', () => {
      input.value = "Hello Developers! WebAssembly & Cryptography utilities.";
      output.value = utf8ToBase64(input.value);
    });

    document.getElementById('btn-copy-t64').addEventListener('click', () => {
      App.copyToClipboard(output.value, 'Result copied to clipboard!');
    });

    output.value = utf8ToBase64(input.value);
  },

  // 9. Lorem Ipsum & Dummy Text Generator
  renderLoremGenerator(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header"><span>Generator Controls</span></div>

          <div class="form-group">
            <label class="form-label">Type to Generate</label>
            <select id="lorem-type" class="form-control">
              <option value="paragraphs" selected>Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
              <option value="list">Bullet List Items</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" style="display:flex; justify-content:space-between;">
              <span>Count / Quantity</span>
              <span class="slider-val-badge" id="val-lorem-count">3</span>
            </label>
            <input type="range" id="lorem-count-slider" class="range-slider" min="1" max="20" value="3">
          </div>

          <label style="display:flex; align-items:center; gap:0.5rem; margin-top:1rem; cursor:pointer;">
            <input type="checkbox" id="lorem-start-standard" checked> Start with "Lorem ipsum dolor sit amet..."
          </label>

          <button class="btn btn-primary" id="btn-generate-lorem" style="width:100%; margin-top:1.5rem;">
            <i class="fa-solid fa-arrows-rotate"></i> Generate Dummy Text
          </button>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Generated Content</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-lorem">
              <i class="fa-solid fa-copy"></i> Copy Text
            </button>
          </div>

          <textarea id="lorem-output-text" class="form-control" style="flex:1; min-height:280px; font-family:var(--font-sans); font-size:0.95rem; line-height:1.7;" readonly></textarea>
        </div>
      </div>
    `;

    const typeSelect = document.getElementById('lorem-type');
    const countSlider = document.getElementById('lorem-count-slider');
    const countBadge = document.getElementById('val-lorem-count');
    const startCheck = document.getElementById('lorem-start-standard');
    const genBtn = document.getElementById('btn-generate-lorem');
    const copyBtn = document.getElementById('btn-copy-lorem');
    const output = document.getElementById('lorem-output-text');

    const sampleWords = [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
      "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
      "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
      "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
      "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint",
      "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt",
      "mollit", "anim", "id", "est", "laborum", "architecto", "beatae", "vitae", "dicta", "explicabo"
    ];

    countSlider.addEventListener('input', () => {
      countBadge.textContent = countSlider.value;
      generateLorem();
    });

    typeSelect.addEventListener('change', () => {
      if (typeSelect.value === 'words') {
        countSlider.max = 100;
        countSlider.value = 30;
      } else {
        countSlider.max = 20;
        countSlider.value = 3;
      }
      countBadge.textContent = countSlider.value;
      generateLorem();
    });

    startCheck.addEventListener('change', generateLorem);
    genBtn.addEventListener('click', generateLorem);

    function getRandomSentence() {
      const len = 8 + Math.floor(Math.random() * 10);
      let words = [];
      for (let i = 0; i < len; i++) {
        words.push(sampleWords[Math.floor(Math.random() * sampleWords.length)]);
      }
      let sentence = words.join(' ');
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    }

    function generateLorem() {
      const type = typeSelect.value;
      const count = parseInt(countSlider.value);
      const startWithStandard = startCheck.checked;

      let result = '';

      if (type === 'paragraphs') {
        let paras = [];
        for (let p = 0; p < count; p++) {
          let sCount = 4 + Math.floor(Math.random() * 4);
          let sentences = [];
          for (let s = 0; s < sCount; s++) {
            if (p === 0 && s === 0 && startWithStandard) {
              sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
            } else {
              sentences.push(getRandomSentence());
            }
          }
          paras.push(sentences.join(' '));
        }
        result = paras.join('\n\n');
      } else if (type === 'sentences') {
        let sentences = [];
        for (let s = 0; s < count; s++) {
          if (s === 0 && startWithStandard) {
            sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
          } else {
            sentences.push(getRandomSentence());
          }
        }
        result = sentences.join(' ');
      } else if (type === 'words') {
        let words = [];
        if (startWithStandard) {
          words.push("Lorem", "ipsum", "dolor", "sit", "amet");
        }
        while (words.length < count) {
          words.push(sampleWords[Math.floor(Math.random() * sampleWords.length)]);
        }
        result = words.slice(0, count).join(' ');
      } else if (type === 'list') {
        let items = [];
        for (let i = 0; i < count; i++) {
          items.push(`• ${getRandomSentence()}`);
        }
        result = items.join('\n');
      }

      output.value = result;
    }

    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(output.value, 'Lorem Ipsum copied to clipboard!');
    });

    generateLorem();
  },

  // 10. Color Palette & CSS Gradient Studio
  renderColorStudio(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header"><span>CSS Gradient Creator</span></div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Color 1</label>
              <div class="color-input-wrapper">
                <input type="color" id="grad-color-1" value="#6366f1">
                <span id="grad-hex-1" style="font-family:var(--font-mono); font-size:0.85rem;">#6366f1</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Color 2</label>
              <div class="color-input-wrapper">
                <input type="color" id="grad-color-2" value="#06b6d4">
                <span id="grad-hex-2" style="font-family:var(--font-mono); font-size:0.85rem;">#06b6d4</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Gradient Type</label>
            <select id="grad-type" class="form-control">
              <option value="linear" selected>Linear Gradient</option>
              <option value="radial">Radial (Circular) Gradient</option>
            </select>
          </div>

          <div class="form-group" id="grad-angle-group">
            <label class="form-label" style="display:flex; justify-content:space-between;">
              <span>Angle / Direction</span>
              <span class="slider-val-badge" id="val-grad-angle">135deg</span>
            </label>
            <input type="range" id="grad-angle-slider" class="range-slider" min="0" max="360" value="135">
          </div>

          <div class="form-group">
            <label class="form-label">CSS Output Rule</label>
            <textarea id="grad-css-out" class="form-control" style="height:70px; font-family:var(--font-mono); font-size:0.85rem;" readonly></textarea>
            <button class="btn btn-primary btn-sm" id="btn-copy-grad-css" style="margin-top:0.6rem; width:100%;">
              <i class="fa-solid fa-copy"></i> Copy CSS Rule
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header"><span>Live Gradient Canvas</span></div>
          <div id="grad-preview-canvas" style="flex:1; min-height:260px; border-radius:12px; border:1px solid var(--border-medium); box-shadow:var(--shadow-md); transition:background 0.2s ease;"></div>
        </div>
      </div>
    `;

    const c1 = document.getElementById('grad-color-1');
    const c2 = document.getElementById('grad-color-2');
    const hex1 = document.getElementById('grad-hex-1');
    const hex2 = document.getElementById('grad-hex-2');
    const type = document.getElementById('grad-type');
    const angleSlider = document.getElementById('grad-angle-slider');
    const angleBadge = document.getElementById('val-grad-angle');
    const angleGroup = document.getElementById('grad-angle-group');
    const preview = document.getElementById('grad-preview-canvas');
    const cssOut = document.getElementById('grad-css-out');
    const copyBtn = document.getElementById('btn-copy-grad-css');

    function updateGradient() {
      hex1.textContent = c1.value;
      hex2.textContent = c2.value;
      const angle = angleSlider.value;
      angleBadge.textContent = `${angle}deg`;

      let cssRule = '';
      if (type.value === 'radial') {
        angleGroup.style.display = 'none';
        cssRule = `background: radial-gradient(circle, ${c1.value} 0%, ${c2.value} 100%);`;
        preview.style.background = `radial-gradient(circle, ${c1.value} 0%, ${c2.value} 100%)`;
      } else {
        angleGroup.style.display = 'block';
        cssRule = `background: linear-gradient(${angle}deg, ${c1.value} 0%, ${c2.value} 100%);`;
        preview.style.background = `linear-gradient(${angle}deg, ${c1.value} 0%, ${c2.value} 100%)`;
      }

      cssOut.value = cssRule;
    }

    [c1, c2, angleSlider, type].forEach(el => el.addEventListener('input', updateGradient));
    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(cssOut.value, 'CSS Gradient copied to clipboard!');
    });

    updateGradient();
  },

  // 11. Text & Note Size Reducer / Minifier
  renderTextMinifier(container) {
    container.innerHTML = `
      <div class="split-pane">
        <!-- Input Text Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-file-contract"></i> Original Text / Notes / Code</span>
            <button class="btn btn-sm btn-secondary" id="btn-load-sample-min">Load Sample</button>
          </div>

          <textarea id="minifier-input" class="form-control" style="height:280px; font-family:var(--font-mono); font-size:0.85rem;" placeholder="Paste text, notes, JSON, HTML, or logs to compress and reduce file size..."></textarea>

          <div class="form-group" style="margin-top:1rem;">
            <label class="form-label">Compression & Reduction Options</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.82rem;">
              <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                <input type="checkbox" id="min-opt-spaces" checked> Collapse Multiple Spaces
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                <input type="checkbox" id="min-opt-lines" checked> Remove Blank Lines
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                <input type="checkbox" id="min-opt-trim" checked> Trim Line Ends
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                <input type="checkbox" id="min-opt-tags"> Strip HTML / XML Tags
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                <input type="checkbox" id="min-opt-dedup"> Deduplicate Lines
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                <input type="checkbox" id="min-opt-json"> Compact JSON
              </label>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-run-minify" style="width:100%; margin-top:0.75rem;">
            <i class="fa-solid fa-compress"></i> Reduce Text Size Now
          </button>
        </div>

        <!-- Output Column & Savings Stats -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-bolt"></i> Minified / Reduced Output</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="btn-copy-min">
                <i class="fa-solid fa-copy"></i> Copy
              </button>
              <button class="btn btn-sm btn-emerald" id="btn-dl-min">
                <i class="fa-solid fa-download"></i> Download .txt
              </button>
            </div>
          </div>

          <textarea id="minifier-output" class="form-control" style="height:280px; font-family:var(--font-mono); font-size:0.85rem;" readonly placeholder="Reduced text will appear here with savings metrics..."></textarea>

          <div class="reduction-stats-grid">
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-orig-bytes">0 B</div>
              <div class="reduction-stat-label">Original Size</div>
            </div>
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-min-bytes" style="color:var(--accent-emerald);">0 B</div>
              <div class="reduction-stat-label">Reduced Size</div>
            </div>
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-saved-pct" style="color:var(--accent-cyan);">0%</div>
              <div class="reduction-stat-label">Space Saved</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('minifier-input');
    const output = document.getElementById('minifier-output');
    const runBtn = document.getElementById('btn-run-minify');
    const copyBtn = document.getElementById('btn-copy-min');
    const dlBtn = document.getElementById('btn-dl-min');
    const sampleBtn = document.getElementById('btn-load-sample-min');

    const optSpaces = document.getElementById('min-opt-spaces');
    const optLines = document.getElementById('min-opt-lines');
    const optTrim = document.getElementById('min-opt-trim');
    const optTags = document.getElementById('min-opt-tags');
    const optDedup = document.getElementById('min-opt-dedup');
    const optJson = document.getElementById('min-opt-json');

    const origStat = document.getElementById('stat-orig-bytes');
    const minStat = document.getElementById('stat-min-bytes');
    const savedStat = document.getElementById('stat-saved-pct');

    function minifyText() {
      let txt = input.value;
      if (!txt) {
        output.value = '';
        origStat.textContent = '0 B';
        minStat.textContent = '0 B';
        savedStat.textContent = '0%';
        return;
      }

      const origBytes = new Blob([txt]).size;

      // JSON Compact if requested and valid
      if (optJson.checked) {
        try {
          const parsed = JSON.parse(txt);
          txt = JSON.stringify(parsed);
        } catch (e) {}
      }

      // Strip HTML tags
      if (optTags.checked) {
        txt = txt.replace(/<[^>]*>/g, '');
      }

      // Trim line ends
      if (optTrim.checked) {
        txt = txt.split('\n').map(l => l.trimEnd()).join('\n');
      }

      // Collapse multiple spaces
      if (optSpaces.checked) {
        txt = txt.replace(/[ \t]+/g, ' ');
      }

      // Remove blank lines
      if (optLines.checked) {
        txt = txt.split('\n').filter(l => l.trim().length > 0).join('\n');
      }

      // Deduplicate lines
      if (optDedup.checked) {
        const lines = txt.split('\n');
        txt = Array.from(new Set(lines)).join('\n');
      }

      output.value = txt;

      const minBytes = new Blob([txt]).size;
      const savedBytes = Math.max(0, origBytes - minBytes);
      const savedPct = origBytes > 0 ? Math.round((savedBytes / origBytes) * 100) : 0;

      origStat.textContent = App.formatBytes(origBytes);
      minStat.textContent = App.formatBytes(minBytes);
      savedStat.textContent = `-${savedPct}%`;

      App.showToast(`Reduced by ${savedPct}% (saved ${App.formatBytes(savedBytes)})`, 'success');
    }

    runBtn.addEventListener('click', minifyText);
    [optSpaces, optLines, optTrim, optTags, optDedup, optJson].forEach(el => {
      el.addEventListener('change', minifyText);
    });

    sampleBtn.addEventListener('click', () => {
      input.value = `   
      
   OmniToolbox   Daily   Utilities        

   <div class="card">
       <h1>Welcome to Ultra Fast Tools</h1>
   </div>

   Duplicate Line 1
   Duplicate Line 1
   Duplicate Line 1

   100% Client-Side    Privacy      with zero server    uploads!
      `;
      minifyText();
    });

    copyBtn.addEventListener('click', () => {
      if (!output.value) return;
      App.copyToClipboard(output.value, 'Minified text copied to clipboard!');
    });

    dlBtn.addEventListener('click', () => {
      if (!output.value) return;
      const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'reduced_text.txt';
      a.click();
      App.showToast('Downloaded reduced text file', 'success');
    });
  },

  // 12. Smart Scratchpad & Daily Notes Studio
  renderNotesStudio(container) {
    const savedNote = localStorage.getItem('omni_scratchpad_note') || '';

    container.innerHTML = `
      <div class="split-pane">
        <!-- Editor Column -->
        <div class="pane-card" style="flex:1.4;">
          <div class="pane-header">
            <span><i class="fa-solid fa-pen-to-square"></i> Smart Scratchpad (Auto-Saved)</span>
            <span class="text-muted" id="note-auto-save-status"><i class="fa-solid fa-cloud-arrow-up"></i> Saved</span>
          </div>

          <!-- Quick Formatting Toolbar -->
          <div class="quick-interchange-pills" style="margin-bottom:0.75rem;">
            <button type="button" class="interchange-pill" id="btn-note-timestamp">
              <i class="fa-solid fa-clock"></i> Timestamp
            </button>
            <button type="button" class="interchange-pill" id="btn-note-bullet">
              <i class="fa-solid fa-list-ul"></i> Bullet List
            </button>
            <button type="button" class="interchange-pill" id="btn-note-num">
              <i class="fa-solid fa-list-ol"></i> Numbered
            </button>
            <button type="button" class="interchange-pill" id="btn-note-upper">UPPERCASE</button>
            <button type="button" class="interchange-pill" id="btn-note-lower">lowercase</button>
            <button type="button" class="interchange-pill" id="btn-note-clean">
              <i class="fa-solid fa-broom"></i> Clean Spaces
            </button>
          </div>

          <textarea id="scratchpad-editor" class="form-control" style="height:380px; font-family:var(--font-sans); font-size:0.95rem; line-height:1.7;" placeholder="Start writing daily notes, code snippets, memos, or ideas... (Auto-saved in browser)"></textarea>
        </div>

        <!-- Metrics & Export Actions Column -->
        <div class="pane-card" style="flex:0.8;">
          <div class="pane-header">
            <span><i class="fa-solid fa-chart-simple"></i> Note Stats & Export</span>
          </div>

          <div class="reduction-stats-grid" style="grid-template-columns:1fr 1fr; margin-top:0;">
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-note-words">0</div>
              <div class="reduction-stat-label">Words</div>
            </div>
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-note-chars" style="color:var(--accent-purple);">0</div>
              <div class="reduction-stat-label">Characters</div>
            </div>
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-note-lines" style="color:var(--accent-cyan);">0</div>
              <div class="reduction-stat-label">Lines</div>
            </div>
            <div class="reduction-stat-card">
              <div class="reduction-stat-val" id="stat-note-time" style="color:var(--accent-emerald);">0s</div>
              <div class="reduction-stat-label">Reading Time</div>
            </div>
          </div>

          <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.6rem;">
            <button class="btn btn-primary" id="btn-export-note-txt">
              <i class="fa-solid fa-file-lines"></i> Export as Plain Text (.txt)
            </button>
            <button class="btn btn-secondary" id="btn-export-note-md">
              <i class="fa-brands fa-markdown"></i> Export as Markdown (.md)
            </button>
            <button class="btn btn-emerald" id="btn-export-note-pdf">
              <i class="fa-solid fa-file-pdf"></i> Export as PDF Document
            </button>
            <button class="btn btn-secondary" id="btn-clear-note" style="color:var(--accent-rose); margin-top:0.5rem;">
              <i class="fa-solid fa-trash"></i> Clear Note
            </button>
          </div>
        </div>
      </div>
    `;

    const editor = document.getElementById('scratchpad-editor');
    const autoSaveStatus = document.getElementById('note-auto-save-status');
    const wordsSpan = document.getElementById('stat-note-words');
    const charsSpan = document.getElementById('stat-note-chars');
    const linesSpan = document.getElementById('stat-note-lines');
    const timeSpan = document.getElementById('stat-note-time');

    editor.value = savedNote;

    function updateStats() {
      const val = editor.value;
      const chars = val.length;
      const words = val.trim() ? val.trim().split(/\s+/).length : 0;
      const lines = val.trim() ? val.split('\n').length : 0;
      const readSec = Math.ceil(words / (200 / 60));

      charsSpan.textContent = chars.toLocaleString();
      wordsSpan.textContent = words.toLocaleString();
      linesSpan.textContent = lines.toLocaleString();
      timeSpan.textContent = readSec > 60 ? `${Math.ceil(readSec / 60)}m` : `${readSec}s`;

      localStorage.setItem('omni_scratchpad_note', val);
      autoSaveStatus.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Auto-Saved';
    }

    editor.addEventListener('input', updateStats);
    updateStats();

    // Toolbar buttons
    document.getElementById('btn-note-timestamp').addEventListener('click', () => {
      const stamp = `[${new Date().toLocaleString()}]\n`;
      editor.setRangeText(stamp, editor.selectionStart, editor.selectionEnd, 'end');
      updateStats();
    });

    document.getElementById('btn-note-bullet').addEventListener('click', () => {
      const sel = editor.value.substring(editor.selectionStart, editor.selectionEnd);
      const rep = sel ? sel.split('\n').map(l => `• ${l}`).join('\n') : '• ';
      editor.setRangeText(rep, editor.selectionStart, editor.selectionEnd, 'end');
      updateStats();
    });

    document.getElementById('btn-note-num').addEventListener('click', () => {
      const sel = editor.value.substring(editor.selectionStart, editor.selectionEnd);
      const rep = sel ? sel.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n') : '1. ';
      editor.setRangeText(rep, editor.selectionStart, editor.selectionEnd, 'end');
      updateStats();
    });

    document.getElementById('btn-note-upper').addEventListener('click', () => {
      const sel = editor.value.substring(editor.selectionStart, editor.selectionEnd);
      if (sel) {
        editor.setRangeText(sel.toUpperCase(), editor.selectionStart, editor.selectionEnd, 'end');
      } else {
        editor.value = editor.value.toUpperCase();
      }
      updateStats();
    });

    document.getElementById('btn-note-lower').addEventListener('click', () => {
      const sel = editor.value.substring(editor.selectionStart, editor.selectionEnd);
      if (sel) {
        editor.setRangeText(sel.toLowerCase(), editor.selectionStart, editor.selectionEnd, 'end');
      } else {
        editor.value = editor.value.toLowerCase();
      }
      updateStats();
    });

    document.getElementById('btn-note-clean').addEventListener('click', () => {
      editor.value = editor.value.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n').trim();
      updateStats();
      App.showToast('Cleaned whitespace in note', 'info');
    });

    // Exports
    document.getElementById('btn-export-note-txt').addEventListener('click', () => {
      if (!editor.value) return App.showToast('Note is empty', 'error');
      const blob = new Blob([editor.value], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `note_${Date.now()}.txt`;
      a.click();
      App.showToast('Downloaded .txt note', 'success');
    });

    document.getElementById('btn-export-note-md').addEventListener('click', () => {
      if (!editor.value) return App.showToast('Note is empty', 'error');
      const blob = new Blob([editor.value], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `note_${Date.now()}.md`;
      a.click();
      App.showToast('Downloaded .md note', 'success');
    });

    document.getElementById('btn-export-note-pdf').addEventListener('click', () => {
      if (!editor.value) return App.showToast('Note is empty', 'error');
      if (typeof window.jspdf === 'undefined') return App.showToast('jsPDF library not loaded', 'error');

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      const splitText = doc.splitTextToSize(editor.value, 180);
      doc.text(splitText, 15, 20);
      doc.save(`note_${Date.now()}.pdf`);
      App.showToast('Exported note to PDF', 'success');
    });

    document.getElementById('btn-clear-note').addEventListener('click', () => {
      if (!editor.value) return;
      if (confirm('Are you sure you want to clear your scratchpad?')) {
        editor.value = '';
        updateStats();
        App.showToast('Scratchpad cleared', 'info');
      }
    });
  }
};

