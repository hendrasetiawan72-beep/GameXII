/**
 * Web Audio API Sound Generator & Character Voice Synthesizer
 * Generates retro 8-bit sound effects, calm background music,
 * and distinct male (deep bass) and female vocal speech effects.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private bgmNoteIndex: number = 0;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBgm();
      this.isBgmPlaying = false;
    }
    if (this.isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isMusicOn(): boolean {
    return this.isBgmPlaying;
  }

  // Play a simple retro tone
  private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay or permissions handled gracefully
    }
  }

  public playClick() {
    this.playTone(600, 'square', 0.06, 0.08);
  }

  public playStep() {
    this.playTone(180, 'triangle', 0.04, 0.03);
  }

  public playClueFound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.18, 0.12);
        }, idx * 80);
      });
    } catch {}
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.playTone(587.33, 'triangle', 0.12, 0.15); // D5
      setTimeout(() => {
        this.playTone(880, 'triangle', 0.25, 0.15); // A5
      }, 100);
    } catch {}
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.playTone(220, 'sawtooth', 0.15, 0.1);
      setTimeout(() => {
        this.playTone(180, 'sawtooth', 0.25, 0.1);
      }, 120);
    } catch {}
  }

  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const melody = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
      const durations = [0.12, 0.12, 0.12, 0.25, 0.12, 0.4];
      let delay = 0;
      melody.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', durations[idx], 0.16);
        }, delay);
        delay += durations[idx] * 800;
      });
    } catch {}
  }

  public playEngineRev() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const freqs = [100, 140, 220, 320, 280, 440];
      freqs.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sawtooth', 0.1, 0.12);
        }, idx * 70);
      });
    } catch {}
  }

  public playCablePlug() {
    this.playTone(720, 'sine', 0.08, 0.12);
    setTimeout(() => {
      this.playTone(960, 'sine', 0.15, 0.12);
    }, 60);
  }

  /**
   * Character Speech Voice:
   * - 'female': Higher, pleasant, bright melodious vocal formants (~300Hz - 420Hz).
   * - 'male': Deep masculine bass voice (suara berat ~85Hz - 110Hz).
   * Also utilizes SpeechSynthesis if accessible.
   */
  public playCharacterVoice(gender: 'male' | 'female', text?: string) {
    if (this.isMuted) return;

    try {
      this.initCtx();
      if (this.ctx) {
        if (gender === 'male') {
          // Deep voice (suara berat): low frequencies with subtle pitch modulation
          const malePitches = [95, 88, 105, 92];
          malePitches.forEach((pitch, i) => {
            setTimeout(() => {
              if (this.isMuted || !this.ctx) return;
              const osc = this.ctx.createOscillator();
              const gain = this.ctx.createGain();
              const filter = this.ctx.createBiquadFilter();

              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

              // Low-pass filter to create warm deep chest resonance
              filter.type = 'lowpass';
              filter.frequency.setValueAtTime(260, this.ctx.currentTime);
              filter.Q.setValueAtTime(3, this.ctx.currentTime);

              gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

              osc.connect(filter);
              filter.connect(gain);
              gain.connect(this.ctx.destination);

              osc.start();
              osc.stop(this.ctx.currentTime + 0.12);
            }, i * 75);
          });
        } else {
          // Female voice: bright, clear, cheerful higher pitch formants
          const femalePitches = [340, 390, 360, 420];
          femalePitches.forEach((pitch, i) => {
            setTimeout(() => {
              if (this.isMuted || !this.ctx) return;
              const osc = this.ctx.createOscillator();
              const gain = this.ctx.createGain();
              const filter = this.ctx.createBiquadFilter();

              osc.type = 'triangle';
              osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

              filter.type = 'bandpass';
              filter.frequency.setValueAtTime(650, this.ctx.currentTime);
              filter.Q.setValueAtTime(2, this.ctx.currentTime);

              gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.11);

              osc.connect(filter);
              filter.connect(gain);
              gain.connect(this.ctx.destination);

              osc.start();
              osc.stop(this.ctx.currentTime + 0.11);
            }, i * 70);
          });
        }
      }
    } catch {}

    // SpeechSynthesis API (if supported and unmuted)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
      try {
        window.speechSynthesis.cancel();
        // Clean text to avoid special character stutters
        const cleanText = text.replace(/["'#_*]/g, '').trim();
        if (cleanText) {
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'en-US';

          if (gender === 'male') {
            // Suara berat laki-laki: pitch rendah
            utterance.pitch = 0.72;
            utterance.rate = 0.95;
          } else {
            // Suara perempuan: pitch lebih tinggi dan jernih
            utterance.pitch = 1.35;
            utterance.rate = 1.05;
          }

          // Pick appropriate system voice if available
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
            if (englishVoices.length > 0) {
              if (gender === 'female') {
                const femaleVoice = englishVoices.find((v) =>
                  /female|girl|zira|samantha|karen|victoria/i.test(v.name)
                );
                if (femaleVoice) utterance.voice = femaleVoice;
              } else {
                const maleVoice = englishVoices.find((v) =>
                  /male|david|george|alex|daniel/i.test(v.name)
                );
                if (maleVoice) utterance.voice = maleVoice;
              }
            }
          }

          window.speechSynthesis.speak(utterance);
        }
      } catch {}
    }
  }

  // Soft retro background music
  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.isBgmPlaying = false;
    } else {
      this.isMuted = false;
      this.startBgm();
      this.isBgmPlaying = true;
    }
    return this.isBgmPlaying;
  }

  private startBgm() {
    this.initCtx();
    if (!this.ctx) return;

    const notes = [
      392.0, 440.0, 493.88, 587.33, 493.88, 440.0, 392.0, 329.63,
      392.0, 440.0, 587.33, 659.25, 587.33, 493.88, 440.0, 392.0
    ];

    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
    }

    this.bgmInterval = window.setInterval(() => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const freq = notes[this.bgmNoteIndex % notes.length];
      this.playTone(freq, 'sine', 0.22, 0.035);
      this.bgmNoteIndex++;
    }, 450);
  }

  public stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
  }
}

export const sound = new SoundManager();
