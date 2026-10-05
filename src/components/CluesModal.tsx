import React from 'react';
import { DayNumber } from '../types/game';
import { GAME_CLUES } from '../data/gameData';
import { X, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface CluesModalProps {
  currentDay: DayNumber;
  cluesFound: string[];
  onClose: () => void;
}

export const CluesModal: React.FC<CluesModalProps> = ({
  cluesFound,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              COLLECTED CAREER CLUES ({cluesFound.length} FOUND)
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 hover:bg-amber-300 border border-slate-900 bg-white rounded-lg transition-colors cursor-pointer shadow-[1px_1px_0px_0px_#000]"
          >
            <X className="w-4 h-4 text-slate-900" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {GAME_CLUES.map((clue) => {
            const isFound = cluesFound.includes(clue.id);

            return (
              <div
                key={clue.id}
                className={`p-3.5 rounded-2xl border-2 transition-all ${
                  isFound
                    ? 'bg-amber-50 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]'
                    : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl border border-slate-900 shrink-0 mt-0.5 ${
                        isFound ? 'bg-amber-300 text-slate-900' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-[10px] bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                          DAY {clue.day}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          {isFound ? clue.title : '??? Undiscovered Clue ???'}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">
                        {isFound ? clue.description : 'Explore the school campus to discover this clue.'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 font-pixel text-[10px]">
                    {isFound ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>FOUND</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">LOCKED</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between">
          <p className="text-xs text-slate-600 italic">
            Clues assist you in answering daily verification quizzes and building your letter.
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 py-2 text-xs font-pixel cursor-pointer rounded-xl"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
