import React, { useState, useEffect } from 'react';
import { NPC, DayNumber, Gender } from '../types/game';
import { NPCPixelSprite, PlayerPixelSprite } from './PixelSprites';
import { X, ChevronRight, Flame, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface DialogueModalProps {
  npc: NPC;
  currentDay: DayNumber;
  playerGender?: Gender;
  onClose: () => void;
  onDialogueComplete?: (pointsGained: number) => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({
  npc,
  currentDay,
  playerGender = 'boy',
  onClose,
  onDialogueComplete
}) => {
  const lines = npc.dialogueByDay[currentDay] || npc.dialogueByDay[1];
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  const currentLine = lines[currentLineIdx] || lines[0];

  // Determine speaker gender
  const isPlayer = currentLine.speaker === 'Player';
  const speakerGender: 'male' | 'female' = isPlayer
    ? playerGender === 'boy'
      ? 'male'
      : 'female'
    : npc.gender;

  // Speak line on mount and line change
  useEffect(() => {
    sound.playCharacterVoice(speakerGender, currentLine.en);
  }, [currentLineIdx, speakerGender, currentLine.en]);

  const handleNext = () => {
    sound.playClick();
    if (currentLineIdx + 1 < lines.length) {
      setCurrentLineIdx((prev) => prev + 1);
    } else {
      sound.playCorrect();
      if (onDialogueComplete) onDialogueComplete(5);
      onClose();
    }
  };

  const handleReplayVoice = () => {
    sound.playCharacterVoice(speakerGender, currentLine.en);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-2xs select-none">
      <div className="relative w-full max-w-xl bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Dialogue Header */}
        <div className="px-4 py-2.5 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              {npc.name} ({npc.role})
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

        {/* Dialogue Body */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start gap-3.5">
            {/* Avatar Portrait */}
            <div className="shrink-0 p-2 bg-amber-100 border-2 border-slate-900 rounded-2xl shadow-[2px_2px_0px_0px_#0F172A] flex flex-col items-center min-w-[70px]">
              {isPlayer ? (
                <PlayerPixelSprite gender={playerGender} size={48} />
              ) : (
                <NPCPixelSprite avatarType={npc.avatarType} size={48} />
              )}
              <span className="font-pixel text-[8px] text-slate-800 mt-1 font-bold text-center">
                {currentLine.speaker}
              </span>
              <span className="text-[9px] text-slate-500 font-semibold mt-0.5">
                {speakerGender === 'female' ? '♀ Female' : '♂ Deep Voice'}
              </span>
            </div>

            {/* Speech Content */}
            <div className="flex-1 space-y-2">
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[2px_2px_0px_0px_#0F172A] relative">
                <p className="text-sm font-semibold text-slate-900 leading-relaxed pr-8">
                  "{currentLine.en}"
                </p>

                {/* Replay Voice Button */}
                <button
                  onClick={handleReplayVoice}
                  className="absolute top-3 right-3 p-1.5 bg-amber-100 hover:bg-amber-200 border border-slate-800 rounded-lg text-slate-800 shadow-xs cursor-pointer transition-colors"
                  title="Listen to Voice"
                >
                  <Volume2 className="w-4 h-4 text-slate-900" />
                </button>
              </div>

              {/* Expression Tip */}
              {currentLine.expressionTip && (
                <div className="flex items-center gap-2 bg-amber-100/90 border border-amber-800/30 px-3 py-1.5 rounded-xl text-xs text-amber-950">
                  <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500 shrink-0" />
                  <span className="font-medium">Expression: {currentLine.expressionTip}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-pixel text-slate-600">
            <span>DIALOGUE {currentLineIdx + 1}/{lines.length}</span>
            <span className="hidden sm:inline">· SMK MUHAMMADIYAH BAWANG</span>
          </div>
          <button
            onClick={handleNext}
            className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 py-2 text-xs font-pixel flex items-center gap-1.5 cursor-pointer rounded-xl"
          >
            <span>{currentLineIdx + 1 < lines.length ? 'CONTINUE' : 'FINISH TALK (+5 PTS)'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
