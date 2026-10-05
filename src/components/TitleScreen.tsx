import React from 'react';
import { PlayerPixelSprite } from './PixelSprites';
import { Play, Volume2, VolumeX, Music, HelpCircle, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface TitleScreenProps {
  onStart: () => void;
  onOpenHelp: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  onOpenHelp
}) => {
  const [muted, setMuted] = React.useState(sound.getMuted());
  const [musicOn, setMusicOn] = React.useState(sound.isMusicOn());

  const toggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
    if (!isMuted) sound.playClick();
  };

  const toggleMusic = () => {
    const isPlaying = sound.toggleBgm();
    setMusicOn(isPlaying);
    setMuted(sound.getMuted());
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 bg-amber-50 select-none overflow-x-hidden font-sans">
      {/* Background Pixel Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Top Bar Controls */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 bg-white/90 border-2 border-slate-900 rounded-xl px-3.5 py-1.5 shadow-[2px_2px_0px_0px_#0F172A]">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span className="font-pixel text-[10px] sm:text-xs text-slate-900 font-bold">
            SMK MUHAMMADIYAH BAWANG
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className={`p-2 border-2 border-slate-900 rounded-xl text-xs shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer transition-colors ${
              musicOn ? 'bg-amber-300 text-slate-900' : 'bg-white text-slate-500'
            }`}
            title="Toggle Retro BGM"
          >
            <Music className="w-4 h-4" />
          </button>
          <button
            onClick={toggleSound}
            className={`p-2 border-2 border-slate-900 rounded-xl text-xs shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer transition-colors ${
              !muted ? 'bg-amber-300 text-slate-900' : 'bg-white text-slate-500'
            }`}
            title="Toggle Sound FX"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenHelp();
            }}
            className="p-2 bg-white hover:bg-slate-100 border-2 border-slate-900 rounded-xl text-xs shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer"
            title="How to Play"
          >
            <HelpCircle className="w-4 h-4 text-slate-800" />
          </button>
        </div>
      </header>

      {/* Main Title Centerpiece */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6 max-w-2xl text-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-200 border-2 border-slate-900 rounded-full px-3.5 py-1 mb-3 shadow-[2px_2px_0px_0px_#0F172A]">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span className="font-pixel text-[9px] sm:text-[10px] text-amber-950 font-bold uppercase tracking-wider">
            English Career Adventure · CEFR A2-B1
          </span>
        </div>

        {/* Main Pixel Title Banner */}
        <div className="pixel-box-amber p-5 sm:p-7 mb-4 max-w-xl mx-auto border-2 sm:border-3 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7]">
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            APPLICATION LETTER
            <span className="block text-amber-600">ADVENTURE</span>
          </h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto my-2.5 rounded-full" />
          <h2 className="font-pixel text-xs sm:text-base font-bold text-slate-800 tracking-wider">
            MUHIBA CAREER QUEST
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">
            An Educational Career Adventure & Cover Letter Game for Final-Year Vocational Students
          </p>
        </div>

        {/* Chibi Character Lineup */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 my-4 py-2">
          <div className="flex flex-col items-center">
            <PlayerPixelSprite gender="boy" size={54} />
            <span className="font-pixel text-[8px] bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md mt-1 border border-slate-700">
              OTOMOTIF
            </span>
          </div>

          <div className="flex flex-col items-center -translate-y-2">
            <PlayerPixelSprite gender="girl_hijab" size={64} />
            <span className="font-pixel text-[9px] bg-slate-900 text-sky-300 px-2 py-0.5 rounded-md mt-1 border border-slate-700 font-bold">
              AKL
            </span>
          </div>

          <div className="flex flex-col items-center">
            <PlayerPixelSprite gender="girl" size={54} />
            <span className="font-pixel text-[8px] bg-slate-900 text-emerald-300 px-2 py-0.5 rounded-md mt-1 border border-slate-700">
              TJKT
            </span>
          </div>
        </div>

        {/* Start Game Action Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              sound.playFanfare();
              onStart();
            }}
            className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 sm:px-12 py-3.5 sm:py-4 text-sm sm:text-base font-pixel flex items-center gap-3 cursor-pointer rounded-2xl shadow-[5px_5px_0px_0px_#0F172A] transform hover:-translate-y-0.5 active:translate-y-1"
          >
            <Play className="w-5 h-5 fill-slate-900" />
            <span>START GAME</span>
          </button>
        </div>

        {/* Feature Points */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 mt-6">
          <span>🎮 2D Pixel Exploration</span>
          <span>·</span>
          <span>📜 9 Letter Parts</span>
          <span>·</span>
          <span>🏫 3 Distinct Majors</span>
          <span>·</span>
          <span>✨ Big Plot Twist</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl text-center py-2.5 border-t border-amber-200 text-slate-600 text-xs">
        <p>
          SMK Muhammadiyah Bawang · "Islami, Terampil, Mandiri"
        </p>
      </footer>
    </div>
  );
};
