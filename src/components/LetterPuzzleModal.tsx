import React, { useState } from 'react';
import { LETTER_PARTS } from '../data/gameData';
import { LetterSection } from '../types/game';
import { X, ArrowUp, ArrowDown, Check, HelpCircle, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LetterPuzzleModalProps {
  onClose: () => void;
  onSuccess: (score: number) => void;
  alreadySolved?: boolean;
}

export const LetterPuzzleModal: React.FC<LetterPuzzleModalProps> = ({
  onClose,
  onSuccess,
  alreadySolved = false
}) => {
  const [items, setItems] = useState<LetterSection[]>(() => {
    if (alreadySolved) {
      return [...LETTER_PARTS].sort((a, b) => a.correctOrder - b.correctOrder);
    }
    const shuffled = [...LETTER_PARTS];
    return [
      shuffled[3],
      shuffled[0],
      shuffled[4],
      shuffled[1],
      shuffled[5],
      shuffled[7],
      shuffled[2],
      shuffled[6],
      shuffled[8]
    ];
  });

  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'wrong' | 'hint' | null;
    message: string;
  }>(() =>
    alreadySolved
      ? {
          type: 'correct',
          message: 'Excellent! You have successfully mastered the 9 parts of an application letter.'
        }
      : {
          type: 'hint',
          message: 'Rearrange the segments into the correct standard sequence from 1 to 9.'
        }
  );

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
    setSelectedIdx(null);
  };

  const handleItemClick = (index: number) => {
    sound.playClick();
    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else if (selectedIdx === index) {
      setSelectedIdx(null);
    } else {
      const newItems = [...items];
      const temp = newItems[selectedIdx];
      newItems[selectedIdx] = newItems[index];
      newItems[index] = temp;
      setItems(newItems);
      setSelectedIdx(null);
    }
  };

  const handleVerify = () => {
    const isAllCorrect = items.every((item, idx) => item.correctOrder === idx + 1);

    if (isAllCorrect) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setFeedback({
        type: 'correct',
        message: 'Perfect Order! You assembled the complete Application Letter structure correctly! (+10 PTS)'
      });

      onSuccess(10);
    } else {
      sound.playWrong();
      let firstErrorIdx = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].correctOrder !== i + 1) {
          firstErrorIdx = i;
          break;
        }
      }

      const expectedPart = LETTER_PARTS.find((p) => p.correctOrder === firstErrorIdx + 1);

      setFeedback({
        type: 'wrong',
        message: `Almost there! Section #${firstErrorIdx + 1} should be "${expectedPart?.name}". ${expectedPart?.hint}`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl max-h-[94vh] flex flex-col bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-400 border-b-2 border-slate-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              APPLICATION LETTER PUZZLE
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

        {/* Instructions & Feedback Area */}
        <div className="p-3.5 bg-amber-100/90 border-b border-slate-200 text-xs">
          <div className="flex items-start gap-2.5">
            {feedback.type === 'correct' ? (
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className={`font-semibold ${
                  feedback.type === 'correct'
                    ? 'text-emerald-900'
                    : feedback.type === 'wrong'
                    ? 'text-red-900'
                    : 'text-slate-900'
                }`}
              >
                {feedback.message}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Tip: Tap any two cards to swap them, or use the ▲ ▼ arrow buttons.
          </p>
        </div>

        {/* Letter Segments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {items.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            const isItemCorrect = item.correctOrder === idx + 1;

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(idx)}
                className={`flex items-center justify-between gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-200 border-amber-600 ring-2 ring-amber-500 shadow-[2px_2px_0px_0px_#000]'
                    : isItemCorrect && feedback.type === 'correct'
                    ? 'bg-emerald-50 border-emerald-700 shadow-[1px_1px_0px_0px_#000]'
                    : 'bg-white hover:bg-amber-50/60 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="font-pixel text-[11px] font-bold w-6 h-6 flex items-center justify-center bg-slate-900 text-amber-300 rounded-md border border-slate-800 shrink-0">
                    {idx + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-pixel text-[10px] sm:text-xs text-slate-900 font-bold truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-700 truncate font-mono bg-slate-50 px-2 py-1 mt-1 rounded-md border border-slate-200">
                      {item.sampleContent.split('\n')[0]}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, 'up')}
                    className="p-1.5 bg-slate-100 hover:bg-amber-300 disabled:opacity-30 border border-slate-900 rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-slate-800" />
                  </button>
                  <button
                    disabled={idx === items.length - 1}
                    onClick={() => moveItem(idx, 'down')}
                    className="p-1.5 bg-slate-100 hover:bg-amber-300 disabled:opacity-30 border border-slate-900 rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-slate-800" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between gap-2">
          <div className="text-xs text-slate-700 font-pixel text-[10px]">
            {feedback.type === 'correct' ? '✓ STATUS: VERIFIED' : 'STATUS: ARRANGING...'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVerify}
              className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-4 py-2 text-xs font-pixel flex items-center gap-1.5 cursor-pointer rounded-xl"
            >
              <Check className="w-4 h-4" />
              <span>VERIFY ORDER</span>
            </button>
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
    </div>
  );
};
