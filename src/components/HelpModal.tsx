import React from 'react';
import { X, Smartphone, Keyboard, EyeOff, Award, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-lg bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              HOW TO PLAY / GAME CONTROLS
            </h3>
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
        <div className="p-4 sm:p-6 space-y-3.5 text-xs text-slate-800 overflow-y-auto max-h-[75vh]">
          {/* Controls */}
          <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-pixel text-slate-900 font-bold">
              <Smartphone className="w-4 h-4 text-amber-700" />
              <span>MOBILE & TOUCHSCREEN:</span>
            </div>
            <p className="leading-relaxed">
              • <strong>Swipe Gestures:</strong> Swipe up, down, left, or right anywhere on the map to navigate smoothly.
            </p>
            <p className="leading-relaxed">
              • <strong>Tap-to-Walk:</strong> Tap any path or location on the map to walk toward it.
            </p>
            <p className="leading-relaxed">
              • <strong>Natural Interaction:</strong> Simply walk close to characters and objects to engage with them.
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-pixel text-slate-900 font-bold">
              <Keyboard className="w-4 h-4 text-sky-700" />
              <span>DESKTOP CONTROLS:</span>
            </div>
            <p className="leading-relaxed">
              • Use <strong>W, A, S, D</strong> or the <strong>Arrow Keys</strong> on your keyboard to navigate around campus.
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-pixel text-slate-900 font-bold">
              <EyeOff className="w-4 h-4 text-emerald-700" />
              <span>DYNAMIC HUD:</span>
            </div>
            <p className="leading-relaxed">
              • While moving, the top information header automatically glides upward out of view to preserve screen space.
            </p>
            <p className="leading-relaxed">
              • When you pause, the header slides down to display your current day, objective, and score.
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-pixel text-slate-900 font-bold">
              <Award className="w-4 h-4 text-purple-700" />
              <span>QUEST PROGRESSION:</span>
            </div>
            <p className="leading-relaxed">
              • Complete daily clues and challenges to unlock verification quizzes and progress across 5 school days.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-5 py-2 text-xs font-pixel cursor-pointer rounded-xl"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};
