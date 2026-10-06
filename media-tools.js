/* ==========================================================================
   OmniToolbox - Audio & Video Media Studio
   Audio Waveform Trimmer, Voice Recorder, Volume Booster, Video Frame Grabber
   100% Client-Side Processing via Web Audio API & HTML5 Video Canvas
   ========================================================================== */

const MediaTools = {
  // 1. Audio Studio & Waveform Trimmer / Volume Booster / Voice Recorder
  renderAudioStudio(container) {
    container.innerHTML = `
      <div class="split-pane">
        <!-- Controls & Waveform Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-music"></i> Audio Studio & Voice</span>
            <span class="text-muted" id="audio-file-info">No audio loaded</span>
          </div>

          <!-- Upload & Mic Recording Actions -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
            <div class="dropzone" id="audio-dropzone" style="padding:1.25rem 0.5rem; min-height:auto;">
              <div class="dropzone-icon" style="font-size:1.5rem; margin-bottom:0.25rem;"><i class="fa-solid fa-file-audio"></i></div>
              <div class="dropzone-title" style="font-size:0.85rem;">Upload Audio</div>
              <div class="dropzone-hint" style="font-size:0.7rem;">MP3, WAV, OGG, AAC</div>
              <input type="file" id="audio-file-input" accept="audio/*">
            </div>

            <div class="dropzone" id="mic-record-zone" style="padding:1.25rem 0.5rem; min-height:auto; cursor:pointer;">
              <div class="dropzone-icon" id="mic-icon" style="font-size:1.5rem; margin-bottom:0.25rem; color:var(--accent-rose);"><i class="fa-solid fa-microphone"></i></div>
              <div class="dropzone-title" id="mic-title" style="font-size:0.85rem;">Record Voice</div>
              <div class="dropzone-hint" id="mic-hint" style="font-size:0.7rem;">Click to Start Mic</div>
            </div>
          </div>

          <div id="audio-controls-panel" style="display:none;">
            <!-- Real-Time Waveform Visualizer -->
            <div class="waveform-canvas-box">
              <canvas id="audio-waveform-canvas"></canvas>
            </div>

            <!-- Player & Playhead bar -->
            <div class="audio-controls-bar">
              <button class="btn btn-sm btn-primary" id="btn-audio-play">
                <i class="fa-solid fa-play"></i> Play
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-audio-stop">
                <i class="fa-solid fa-stop"></i> Stop
              </button>
              <div style="flex:1; display:flex; align-items:center; gap:0.5rem; font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">
                <span id="audio-current-time">0:00</span>
                <span>/</span>
                <span id="audio-total-time">0:00</span>
              </div>
            </div>

            <!-- Trimmer Range Controls -->
            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                <span><i class="fa-solid fa-scissors"></i> Trim Audio (Start & End Seconds)</span>
                <span class="slider-val-badge" id="trim-duration-badge">Full Audio</span>
              </label>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                <div>
                  <small class="text-muted">Start Time (sec):</small>
                  <input type="number" id="trim-start-sec" class="form-control" value="0" min="0" step="0.1">
                </div>
                <div>
                  <small class="text-muted">End Time (sec):</small>
                  <input type="number" id="trim-end-sec" class="form-control" value="0" min="0" step="0.1">
                </div>
              </div>
            </div>

            <!-- Volume Booster & Speed Controls -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div class="form-group">
                <label class="form-label" style="display:flex; justify-content:space-between;">
                  <span><i class="fa-solid fa-volume-high"></i> Volume Boost</span>
                  <span class="slider-val-badge" id="val-audio-volume">100%</span>
                </label>
                <input type="range" id="audio-volume-slider" class="range-slider" min="10" max="300" value="100">
                <small class="text-muted" style="font-size:0.72rem;">Boost quiet audio up to 300%</small>
              </div>

              <div class="form-group">
                <label class="form-label" style="display:flex; justify-content:space-between;">
                  <span><i class="fa-solid fa-gauge"></i> Playback Speed</span>
                  <span class="slider-val-badge" id="val-audio-speed">1.0x</span>
                </label>
                <div class="quick-interchange-pills">
                  <button type="button" class="interchange-pill" data-audio-speed="0.5">0.5x</button>
                  <button type="button" class="interchange-pill active" data-audio-speed="1.0">1.0x</button>
                  <button type="button" class="interchange-pill" data-audio-speed="1.5">1.5x</button>
                  <button type="button" class="interchange-pill" data-audio-speed="2.0">2.0x</button>
                </div>
              </div>
            </div>

            <!-- Export Button -->
            <button class="btn btn-emerald" id="btn-export-audio" style="width:100%; margin-top:1rem;">
              <i class="fa-solid fa-download"></i> Process & Export Trimmed / Boosted Audio (.WAV)
            </button>
          </div>
        </div>

        <!-- Output / Preview Pane -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-circle-check"></i> Processed Audio Player</span>
          </div>

          <div id="processed-audio-box" style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; min-height:240px; text-align:center;">
            <div style="font-size:2.5rem; color:var(--text-muted); opacity:0.4; margin-bottom:1rem;">
              <i class="fa-solid fa-headphones"></i>
            </div>
            <p class="text-muted" style="font-size:0.9rem;">
              Load an audio track or record your voice to visualize waveforms and adjust volume / trimming.
            </p>
          </div>
        </div>
      </div>
    `;

    this.initAudioLogic();
  },

  initAudioLogic() {
    const fileInput = document.getElementById('audio-file-input');
    const dropzone = document.getElementById('audio-dropzone');
    const micZone = document.getElementById('mic-record-zone');
    const micIcon = document.getElementById('mic-icon');
    const micTitle = document.getElementById('mic-title');
    const micHint = document.getElementById('mic-hint');
    const controlsPanel = document.getElementById('audio-controls-panel');
    const fileInfo = document.getElementById('audio-file-info');

    const canvas = document.getElementById('audio-waveform-canvas');
    const canvasCtx = canvas.getContext('2d');
    const playBtn = document.getElementById('btn-audio-play');
    const stopBtn = document.getElementById('btn-audio-stop');
    const currentTimeSpan = document.getElementById('audio-current-time');
    const totalTimeSpan = document.getElementById('audio-total-time');

    const startSecInput = document.getElementById('trim-start-sec');
    const endSecInput = document.getElementById('trim-end-sec');
    const trimBadge = document.getElementById('trim-duration-badge');
    const volumeSlider = document.getElementById('audio-volume-slider');
    const volumeVal = document.getElementById('val-audio-volume');
    const exportBtn = document.getElementById('btn-export-audio');
    const processedBox = document.getElementById('processed-audio-box');

    let audioCtx = null;
    let audioBuffer = null;
    let sourceNode = null;
    let gainNode = null;
    let isPlaying = false;
    let playbackRate = 1.0;
    let startTimeOffset = 0;
    let startPlayTimestamp = 0;
    let animFrameId = null;

    // Mic recording state
    let mediaRecorder = null;
    let recordedChunks = [];
    let isRecordingMic = false;

    // Click to upload
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) loadAudioFile(e.target.files[0]);
    });

    // Drag / drop
    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) loadAudioFile(e.dataTransfer.files[0]);
    });

    async function loadAudioFile(file) {
      if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|aac|m4a|flac)$/i)) {
        return App.showToast('Please select a valid audio file', 'error');
      }
      fileInfo.textContent = `${file.name} (${App.formatBytes(file.size)})`;
      const arrayBuffer = await file.arrayBuffer();

      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      try {
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        setupAudioUI();
        App.showToast('Audio loaded and decoded successfully!', 'success');
      } catch (err) {
        App.showToast('Could not decode audio: ' + err.message, 'error');
      }
    }

    // Voice Recorder
    micZone.addEventListener('click', async () => {
      if (!isRecordingMic) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorder = new MediaRecorder(stream);
          recordedChunks = [];

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
          };

          mediaRecorder.onstop = async () => {
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            fileInfo.textContent = `Microphone Recording (${App.formatBytes(blob.size)})`;
            const arrayBuffer = await blob.arrayBuffer();
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            setupAudioUI();
            App.showToast('Voice recording ready for editing!', 'success');
          };

          mediaRecorder.start();
          isRecordingMic = true;
          micIcon.style.color = '#ef4444';
          micIcon.innerHTML = '<i class="fa-solid fa-circle-stop"></i>';
          micTitle.textContent = 'Stop Recording';
          micHint.textContent = 'Recording in progress...';
          App.showToast('Microphone recording started', 'info');
        } catch (err) {
          App.showToast('Microphone access denied: ' + err.message, 'error');
        }
      } else {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          mediaRecorder.stream.getTracks().forEach(t => t.stop());
        }
        isRecordingMic = false;
        micIcon.style.color = 'var(--accent-rose)';
        micIcon.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        micTitle.textContent = 'Record Voice';
        micHint.textContent = 'Click to Start Mic';
      }
    });

    function setupAudioUI() {
      stopAudio();
      controlsPanel.style.display = 'block';

      const dur = audioBuffer.duration;
      totalTimeSpan.textContent = formatSec(dur);
      startSecInput.value = 0;
      endSecInput.value = dur.toFixed(1);
      endSecInput.max = dur.toFixed(1);
      startSecInput.max = dur.toFixed(1);
      trimBadge.textContent = `${dur.toFixed(1)}s Total`;

      drawStaticWaveform();
    }

    function formatSec(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // Draw Waveform onto Canvas
    function drawStaticWaveform() {
      if (!audioBuffer) return;
      canvas.width = canvas.parentElement.clientWidth || 500;
      canvas.height = canvas.parentElement.clientHeight || 140;

      const rawData = audioBuffer.getChannelData(0);
      const step = Math.ceil(rawData.length / canvas.width);
      const amp = canvas.height / 2;

      canvasCtx.fillStyle = '#05070c';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient Waveform
      const grad = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#06b6d4');
      grad.addColorStop(0.5, '#6366f1');
      grad.addColorStop(1, '#a855f7');
      canvasCtx.fillStyle = grad;

      for (let i = 0; i < canvas.width; i++) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = rawData[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        const y1 = Math.max(0, (1 + min) * amp);
        const y2 = Math.min(canvas.height, (1 + max) * amp);
        canvasCtx.fillRect(i, y1, 1, Math.max(1, y2 - y1));
      }
    }

    // Play Audio
    function playAudio(fromTime = 0) {
      if (!audioBuffer) return;
      stopAudio();

      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      sourceNode = audioCtx.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.playbackRate.value = playbackRate;

      gainNode = audioCtx.createGain();
      gainNode.gain.value = parseInt(volumeSlider.value) / 100;

      sourceNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const start = Math.max(0, parseFloat(startSecInput.value) || 0);
      const end = Math.min(audioBuffer.duration, parseFloat(endSecInput.value) || audioBuffer.duration);
      const playFrom = Math.max(start, fromTime);

      sourceNode.start(0, playFrom, Math.max(0.1, end - playFrom));
      isPlaying = true;
      startTimeOffset = playFrom;
      startPlayTimestamp = audioCtx.currentTime;

      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';

      sourceNode.onended = () => {
        if (isPlaying) stopAudio();
      };

      animatePlayhead();
    }

    function stopAudio() {
      if (sourceNode) {
        try { sourceNode.stop(); } catch (e) {}
        sourceNode.disconnect();
        sourceNode = null;
      }
      isPlaying = false;
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
      if (animFrameId) cancelAnimationFrame(animFrameId);
      currentTimeSpan.textContent = '0:00';
      drawStaticWaveform();
    }

    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopAudio();
      } else {
        const start = parseFloat(startSecInput.value) || 0;
        playAudio(start);
      }
    });

    stopBtn.addEventListener('click', stopAudio);

    function animatePlayhead() {
      if (!isPlaying || !audioBuffer || !audioCtx) return;

      const elapsed = (audioCtx.currentTime - startPlayTimestamp) * playbackRate;
      const current = startTimeOffset + elapsed;
      currentTimeSpan.textContent = formatSec(current);

      drawStaticWaveform();

      // Draw vertical red playhead bar
      const pct = current / audioBuffer.duration;
      const px = Math.min(canvas.width, Math.max(0, pct * canvas.width));
      canvasCtx.fillStyle = '#ef4444';
      canvasCtx.fillRect(px, 0, 2, canvas.height);

      const end = parseFloat(endSecInput.value) || audioBuffer.duration;
      if (current >= end) {
        stopAudio();
        return;
      }

      animFrameId = requestAnimationFrame(animatePlayhead);
    }

    // Volume Slider
    volumeSlider.addEventListener('input', () => {
      volumeVal.textContent = `${volumeSlider.value}%`;
      if (gainNode) {
        gainNode.gain.value = parseInt(volumeSlider.value) / 100;
      }
    });

    // Speed chips
    document.querySelectorAll('[data-audio-speed]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-audio-speed]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playbackRate = parseFloat(btn.dataset.audioSpeed);
        document.getElementById('val-audio-speed').textContent = `${playbackRate}x`;
        if (sourceNode) sourceNode.playbackRate.value = playbackRate;
      });
    });

    // Trimmer input updates
    [startSecInput, endSecInput].forEach(inp => {
      inp.addEventListener('input', () => {
        const s = parseFloat(startSecInput.value) || 0;
        const e = parseFloat(endSecInput.value) || (audioBuffer ? audioBuffer.duration : 0);
        trimBadge.textContent = `${Math.max(0, e - s).toFixed(1)}s Trimmed`;
      });
    });

    // Export Trimmed & Boosted Audio to WAV
    exportBtn.addEventListener('click', () => {
      if (!audioBuffer) return;

      const start = Math.max(0, parseFloat(startSecInput.value) || 0);
      const end = Math.min(audioBuffer.duration, parseFloat(endSecInput.value) || audioBuffer.duration);
      const trimDur = Math.max(0.1, end - start);
      const sampleRate = audioBuffer.sampleRate;
      const channels = audioBuffer.numberOfChannels;
      const startSample = Math.floor(start * sampleRate);
      const totalSamples = Math.floor(trimDur * sampleRate);
      const gain = parseInt(volumeSlider.value) / 100;

      // Extract trimmed channel data
      const channelData = [];
      for (let c = 0; c < channels; c++) {
        const orig = audioBuffer.getChannelData(c);
        const sub = new Float32Array(totalSamples);
        for (let i = 0; i < totalSamples; i++) {
          sub[i] = (orig[startSample + i] || 0) * gain;
        }
        channelData.push(sub);
      }

      // Encode into WAV
      const wavBlob = encodeWAV(channelData, channels, sampleRate);
      const wavUrl = URL.createObjectURL(wavBlob);

      processedBox.innerHTML = `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1.5rem; width:100%; max-width:400px; box-shadow:var(--shadow-md);">
          <div style="color:var(--accent-emerald); font-size:1.5rem; margin-bottom:0.5rem;"><i class="fa-solid fa-circle-check"></i></div>
          <h4 style="margin-bottom:0.25rem;">Trimmed Audio Ready!</h4>
          <p class="text-muted" style="font-size:0.8rem; margin-bottom:1rem;">Duration: ${trimDur.toFixed(1)}s • Size: ${App.formatBytes(wavBlob.size)}</p>
          <audio controls src="${wavUrl}" style="width:100%; margin-bottom:1rem; outline:none;"></audio>
          <a href="${wavUrl}" download="omni_audio_export.wav" class="btn btn-primary" style="width:100%; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:0.5rem;">
            <i class="fa-solid fa-download"></i> Download Exported WAV
          </a>
        </div>
      `;

      App.showToast('Audio trimmed and exported!', 'success');
    });

    // Pure Client-Side WAV Encoder
    function encodeWAV(channels, numChannels, sampleRate) {
      const numSamples = channels[0].length;
      const buffer = new ArrayBuffer(44 + numSamples * numChannels * 2);
      const view = new DataView(buffer);

      function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }

      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + numSamples * numChannels * 2, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
      view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
      view.setUint16(32, numChannels * 2, true);              // BlockAlign
      view.setUint16(34, 16, true);                           // BitsPerSample
      writeString(view, 36, 'data');
      view.setUint32(40, numSamples * numChannels * 2, true);

      // Write PCM interleaved 16-bit samples
      let offset = 44;
      for (let i = 0; i < numSamples; i++) {
        for (let c = 0; c < numChannels; c++) {
          let s = Math.max(-1, Math.min(1, channels[c][i]));
          s = s < 0 ? s * 0x8000 : s * 0x7FFF;
          view.setInt16(offset, s, true);
          offset += 2;
        }
      }

      return new Blob([buffer], { type: 'audio/wav' });
    }
  },

  // 2. Video Studio & Frame Grabber / Snapshot Extractor
  renderVideoStudio(container) {
    container.innerHTML = `
      <div class="split-pane">
        <!-- Video Player & Scrubber Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-video"></i> Video Studio & Player</span>
            <span class="text-muted" id="video-file-info">No video loaded</span>
          </div>

          <div class="dropzone" id="video-dropzone">
            <div class="dropzone-icon"><i class="fa-solid fa-file-video"></i></div>
            <div class="dropzone-title">Upload Video to Extract Frames & Snapshots</div>
            <div class="dropzone-hint">Supports MP4, WEBM, MOV, MKV</div>
            <input type="file" id="video-file-input" accept="video/*">
          </div>

          <div id="video-player-wrap" style="display:none; margin-top:1.25rem;">
            <div class="video-player-frame">
              <video id="studio-video" controls></video>
            </div>

            <!-- Frame Scrubber & Stepper -->
            <div class="video-scrub-controls">
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <button type="button" class="btn btn-sm btn-secondary" id="btn-vid-step-back" title="Previous Frame">
                  <i class="fa-solid fa-backward-step"></i> -0.1s
                </button>
                <button type="button" class="btn btn-sm btn-secondary" id="btn-vid-step-fwd" title="Next Frame">
                  +0.1s <i class="fa-solid fa-forward-step"></i>
                </button>
              </div>

              <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-cyan);" id="vid-timestamp-badge">
                00:00.00
              </div>

              <div style="display:flex; align-items:center; gap:0.5rem;">
                <button type="button" class="btn btn-sm btn-primary" id="btn-grab-snapshot">
                  <i class="fa-solid fa-camera"></i> Grab HD Frame
                </button>
              </div>
            </div>

            <!-- Playback Speed & Mute -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <small class="text-muted">Speed:</small>
                <div class="quick-interchange-pills">
                  <button type="button" class="interchange-pill" data-vid-speed="0.25">0.25x</button>
                  <button type="button" class="interchange-pill" data-vid-speed="0.5">0.5x</button>
                  <button type="button" class="interchange-pill active" data-vid-speed="1.0">1.0x</button>
                  <button type="button" class="interchange-pill" data-vid-speed="1.5">1.5x</button>
                  <button type="button" class="interchange-pill" data-vid-speed="2.0">2.0x</button>
                </div>
              </div>

              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; cursor:pointer;">
                <input type="checkbox" id="chk-vid-mute"> Mute Audio
              </label>
            </div>
          </div>
        </div>

        <!-- Captured Snapshots Gallery Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-images"></i> Captured Snapshots (<span id="snap-count">0</span>)</span>
            <button class="btn btn-sm btn-secondary" id="btn-clear-snapshots" style="display:none;">
              <i class="fa-solid fa-trash"></i> Clear All
            </button>
          </div>

          <div id="snapshots-empty-hint" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
            <i class="fa-solid fa-camera-retro" style="font-size:2.5rem; opacity:0.4; margin-bottom:1rem;"></i>
            <p style="font-size:0.88rem;">Scrub to any frame in the video and click <strong>"Grab HD Frame"</strong> to capture crystal clear PNG/JPG screenshots.</p>
          </div>

          <div class="snapshot-gallery-grid" id="snapshots-grid" style="display:none;"></div>
        </div>
      </div>
    `;

    this.initVideoLogic();
  },

  initVideoLogic() {
    const fileInput = document.getElementById('video-file-input');
    const dropzone = document.getElementById('video-dropzone');
    const playerWrap = document.getElementById('video-player-wrap');
    const video = document.getElementById('studio-video');
    const fileInfo = document.getElementById('video-file-info');
    const timestampBadge = document.getElementById('vid-timestamp-badge');

    const stepBack = document.getElementById('btn-vid-step-back');
    const stepFwd = document.getElementById('btn-vid-step-fwd');
    const grabBtn = document.getElementById('btn-grab-snapshot');
    const muteChk = document.getElementById('chk-vid-mute');
    const clearBtn = document.getElementById('btn-clear-snapshots');
    const emptyHint = document.getElementById('snapshots-empty-hint');
    const grid = document.getElementById('snapshots-grid');
    const countSpan = document.getElementById('snap-count');

    let snapshots = []; // { id, dataUrl, time, width, height }
    let videoFileName = 'video';

    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) loadVideo(e.target.files[0]);
    });

    ['dragenter', 'dragover'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach(n => dropzone.addEventListener(n, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); }));
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) loadVideo(e.dataTransfer.files[0]);
    });

    function loadVideo(file) {
      if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|mkv|avi|m4v)$/i)) {
        return App.showToast('Please select a valid video file', 'error');
      }
      videoFileName = file.name.substring(0, file.name.lastIndexOf('.')) || 'video';
      fileInfo.textContent = `${file.name} (${App.formatBytes(file.size)})`;

      const blobUrl = URL.createObjectURL(file);
      video.src = blobUrl;
      playerWrap.style.display = 'block';

      video.onloadedmetadata = () => {
        App.showToast(`Loaded video: ${video.videoWidth} × ${video.videoHeight}px (${video.duration.toFixed(1)}s)`, 'success');
      };
    }

    video.addEventListener('timeupdate', () => {
      const cur = video.currentTime;
      const m = Math.floor(cur / 60);
      const s = Math.floor(cur % 60);
      const ms = Math.floor((cur % 1) * 100);
      timestampBadge.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}.${ms < 10 ? '0' : ''}${ms}`;
    });

    // Step frame buttons
    stepBack.addEventListener('click', () => {
      video.currentTime = Math.max(0, video.currentTime - 0.1);
    });
    stepFwd.addEventListener('click', () => {
      video.currentTime = Math.min(video.duration, video.currentTime + 0.1);
    });

    // Speed chips
    document.querySelectorAll('[data-vid-speed]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-vid-speed]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        video.playbackRate = parseFloat(btn.dataset.vidSpeed);
      });
    });

    // Mute toggle
    muteChk.addEventListener('change', () => {
      video.muted = muteChk.checked;
    });

    // Grab Frame Snapshot
    grabBtn.addEventListener('click', () => {
      if (!video.videoWidth) return App.showToast('No video loaded to capture', 'error');

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/png');
      const timeStr = timestampBadge.textContent;

      snapshots.unshift({
        id: Date.now(),
        dataUrl,
        time: timeStr,
        width: canvas.width,
        height: canvas.height
      });

      renderSnapshots();
      App.showToast(`Captured frame at ${timeStr} (${canvas.width}×${canvas.height})`, 'success');
    });

    function renderSnapshots() {
      countSpan.textContent = snapshots.length;
      if (!snapshots.length) {
        emptyHint.style.display = 'block';
        grid.style.display = 'none';
        clearBtn.style.display = 'none';
        return;
      }

      emptyHint.style.display = 'none';
      grid.style.display = 'grid';
      clearBtn.style.display = 'inline-flex';
      grid.innerHTML = '';

      snapshots.forEach((snap, idx) => {
        const card = document.createElement('div');
        card.className = 'snapshot-card';
        card.innerHTML = `
          <img src="${snap.dataUrl}" alt="Frame ${snap.time}" />
          <div class="snapshot-card-footer">
            <span style="color:var(--accent-cyan); font-weight:700;">${snap.time}</span>
            <div style="display:flex; gap:0.25rem;">
              <button class="pdf-card-btn" data-snap-dl="${snap.id}" title="Download Frame">
                <i class="fa-solid fa-download"></i>
              </button>
              <button class="pdf-card-btn danger" data-snap-del="${snap.id}" title="Delete Frame">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;

        card.querySelector(`[data-snap-dl="${snap.id}"]`).addEventListener('click', () => {
          const a = document.createElement('a');
          a.href = snap.dataUrl;
          a.download = `${videoFileName}_frame_${snap.time.replace(/[:.]/g, '-')}.png`;
          a.click();
        });

        card.querySelector(`[data-snap-del="${snap.id}"]`).addEventListener('click', () => {
          snapshots = snapshots.filter(s => s.id !== snap.id);
          renderSnapshots();
        });

        grid.appendChild(card);
      });
    }

    clearBtn.addEventListener('click', () => {
      snapshots = [];
      renderSnapshots();
      App.showToast('Cleared all snapshots', 'info');
    });
  }
};
