import React, { useState, useEffect } from 'react';
import { OPENING_DIALOGUE } from '../data/gameData';
import { PlayerPixelSprite } from './PixelSprites';
import { ChevronRight, ArrowRight, Target, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface OpeningStoryModalProps {
  onStoryFinished: () => void;
}

export const OpeningStoryModal: React.FC<OpeningStoryModalProps> = ({
  onStoryFinished
}) => {
  const [lineIdx, setLineIdx] = useState(0);
  const [showObjectiveBanner, setShowObjectiveBanner] = useState(false);

  const currentLine = OPENING_DIALOGUE[lineIdx];

  // Determine speaker gender
  const speakerGender: 'male' | 'female' =
    currentLine.avatar === 'girl_hijab' ? 'female' : 'male';

  // Play voice when dialogue line changes
  useEffect(() => {
    if (!showObjectiveBanner) {
      sound.playCharacterVoice(speakerGender, currentLine.en);
    }
  }, [lineIdx, showObjectiveBanner, speakerGender, currentLine.en]);

  const handleNext = () => {
    sound.playClick();
    if (lineIdx + 1 < OPENING_DIALOGUE.length) {
      setLineIdx((prev) => prev + 1);
    } else {
      setShowObjectiveBanner(true);
      sound.playFanfare();
    }
  };

  const handleReplayVoice = () => {
    sound.playCharacterVoice(speakerGender, currentLine.en);
  };

  const handleBeginExploration = () => {
    sound.playClick();
    onStoryFinished();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-xl bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Header */}
        <div className="px-5 py-3.5 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <span className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
            PROLOGUE: SCHOOL COURTYARD
          </span>
          <span className="font-pixel text-[10px] bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-md">
            SMK MUHAMMADIYAH BAWANG
          </span>
        </div>

        {/* Story Scenery Illustration */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="relative bg-gradient-to-b from-amber-200 to-emerald-200 border-2 border-slate-900 rounded-2xl p-4 pt-6 pb-2 shadow-[2px_2px_0px_0px_#0F172A] flex flex-col items-center">
            <div className="absolute top-2.5 right-4 w-8 h-8 rounded-full bg-amber-400 border-2 border-slate-900 shadow-sm" />
            <div className="absolute top-3 left-4 bg-white/90 border border-slate-700 rounded-md px-2 py-0.5 text-[9px] font-pixel text-slate-700">
              AFTERNOON AT BAWANG
            </div>

            {/* Three Chibi Students */}
            <div className="flex items-end justify-center gap-6 mt-4 mb-2">
              <div className="flex flex-col items-center">
                <PlayerPixelSprite gender="boy" size={48} />
                <span className="font-pixel text-[8px] bg-slate-900 text-white px-1.5 py-0.5 rounded mt-1">
                  Raka
                </span>
              </div>
              <div className="flex flex-col items-center">
                <PlayerPixelSprite gender="girl_hijab" size={48} />
                <span className="font-pixel text-[8px] bg-slate-900 text-white px-1.5 py-0.5 rounded mt-1">
                  Sinta
                </span>
              </div>
              <div className="flex flex-col items-center">
                <PlayerPixelSprite gender="boy" size={48} />
                <span className="font-pixel text-[8px] bg-slate-900 text-white px-1.5 py-0.5 rounded mt-1">
                  Dimas
                </span>
              </div>
            </div>

            <div className="w-56 h-2 bg-amber-900 border-t border-slate-900 rounded-full -mt-2" />
          </div>

          {!showObjectiveBanner ? (
            /* Dialogue Box */
            <div className="space-y-3">
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[2px_2px_0px_0px_#0F172A] relative">
                <div className="flex items-center justify-between mb-1.5 pr-8">
                  <span className="font-pixel text-xs text-amber-800 font-bold">
                    {currentLine.speaker}:
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {speakerGender === 'female' ? '♀ Female' : '♂ Deep Voice'}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed pr-8">
                  "{currentLine.en}"
                </p>

                {/* Voice Replay Button */}
                <button
                  onClick={handleReplayVoice}
                  className="absolute top-3.5 right-3.5 p-1.5 bg-amber-100 hover:bg-amber-200 border border-slate-800 rounded-lg text-slate-800 shadow-xs cursor-pointer transition-colors"
                  title="Listen to Voice"
                >
                  <Volume2 className="w-4 h-4 text-slate-900" />
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-5 py-2.5 text-xs font-pixel flex items-center gap-1.5 cursor-pointer rounded-xl"
                >
                  <span>{lineIdx + 1 < OPENING_DIALOGUE.length ? 'NEXT' : 'REVEAL OBJECTIVE'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Objective Unlocked Banner */
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-100 border-2 border-amber-800 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] space-y-2">
                <div className="flex items-center gap-2 font-pixel text-xs text-amber-950 font-bold">
                  <Target className="w-4 h-4 text-amber-700" />
                  <span>FIRST MISSION OBJECTIVE:</span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-extrabold text-slate-900">
                  "Find information about your future after graduation."
                </h4>
                <p className="text-xs text-slate-700">
                  Explore the school campus and consult with your classmates and teachers to discover career opportunities.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleBeginExploration}
                  className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-6 py-3 text-xs font-pixel flex items-center gap-2 mx-auto cursor-pointer rounded-xl"
                >
                  <span>START EXPLORATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
