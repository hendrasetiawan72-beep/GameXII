import React from 'react';
import { Major, DayNumber } from '../types/game';
import { Volume2, VolumeX, Music, Award, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderHUDProps {
  isMoving: boolean;
  gameTitle: string;
  day: DayNumber;
  playerName: string;
  major: Major;
  objectiveEn: string;
  cluesCount: number;
  totalClues: number;
  score: number;
  onOpenHelp?: () => void;
  onOpenClues?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  isMoving,
  gameTitle,
  day,
  playerName,
  major,
  objectiveEn,
  cluesCount,
  totalClues,
  score,
  onOpenHelp,
  onOpenClues
}) => {
  const [muted, setMuted] = React.useState(sound.getMuted());
  const [musicOn, setMusicOn] = React.useState(sound.isMusicOn());

  const handleToggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      sound.playClick();
    }
  };

  const handleToggleMusic = () => {
    const isNowPlaying = sound.toggleBgm();
    setMusicOn(isNowPlaying);
    setMuted(sound.getMuted());
  };

  const majorColorBadge =
    major === 'AKL'
      ? 'bg-sky-100 text-sky-800 border-sky-400'
      : major === 'OTOMOTIF'
      ? 'bg-amber-100 text-amber-800 border-amber-400'
      : 'bg-emerald-100 text-emerald-800 border-emerald-400';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out pointer-events-none ${
        isMoving
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-4xl mx-auto px-3 pt-2.5 pb-1">
        {/* Main HUD Bar */}
        <div className="pixel-box bg-[#FFFDF5] p-3 pointer-events-auto rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
          {/* Top Row: Brand & Vital Stats */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] sm:text-xs bg-amber-400 text-slate-900 px-2.5 py-1 rounded-lg border border-slate-900 font-bold shadow-[1px_1px_0px_0px_#000]">
                DAY {day}
              </span>
              <span className={`font-pixel text-[10px] sm:text-xs px-2.5 py-1 rounded-lg border font-bold ${majorColorBadge}`}>
                {major}
              </span>
              <h1 className="hidden md:inline-block font-display text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[200px] lg:max-w-xs">
                {gameTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              {/* Player Name */}
              <div className="hidden sm:flex items-center gap-1 font-pixel text-[10px] text-slate-700">
                <span className="text-slate-400">STUDENT:</span>
                <span className="font-bold text-slate-900 max-w-[90px] truncate">{playerName || 'Student'}</span>
              </div>

              {/* Clues Pill */}
              <button
                onClick={onOpenClues}
                className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-slate-900 px-2.5 py-1 rounded-lg border border-slate-900 text-[10px] sm:text-xs font-pixel shadow-[1px_1px_0px_0px_#000] cursor-pointer transition-transform active:translate-x-0.5 active:translate-y-0.5"
                title="View Collected Clues"
              >
                <span>CLUES:</span>
                <span className="text-amber-700 font-bold">{cluesCount}/{totalClues}</span>
              </button>

              {/* Score Meter */}
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-lg border border-slate-900 text-[10px] sm:text-xs font-pixel shadow-[1px_1px_0px_0px_#000]">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span className="tabular-nums font-bold">{score}</span>
              </div>

              {/* Quick Audio Controls */}
              <div className="flex items-center gap-1.5 ml-1">
                <button
                  onClick={handleToggleMusic}
                  className={`p-1.5 rounded-lg border border-slate-900 text-xs transition-colors shadow-[1px_1px_0px_0px_#000] cursor-pointer ${
                    musicOn ? 'bg-amber-300 text-slate-900' : 'bg-slate-200 text-slate-500'
                  }`}
                  title={musicOn ? 'Music Playing (Click to Stop)' : 'Music Off (Click to Play)'}
                >
                  <Music className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleToggleSound}
                  className={`p-1.5 rounded-lg border border-slate-900 text-xs transition-colors shadow-[1px_1px_0px_0px_#000] cursor-pointer ${
                    !muted ? 'bg-amber-300 text-slate-900' : 'bg-slate-200 text-slate-500'
                  }`}
                  title={muted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                {onOpenHelp && (
                  <button
                    onClick={onOpenHelp}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-900 text-xs shadow-[1px_1px_0px_0px_#000] cursor-pointer"
                    title="How to Play"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Current Objective Banner */}
          <div className="flex items-center gap-2.5 bg-amber-100/90 border border-amber-800/20 px-3 py-1.5 rounded-xl">
            <span className="font-pixel text-[9px] sm:text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-md font-bold shrink-0">
              OBJECTIVE:
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                {objectiveEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
