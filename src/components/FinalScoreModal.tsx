import React from 'react';
import { PlayerState } from '../types/game';
import { getCandidateTier } from '../data/gameData';
import { NPCPixelSprite } from './PixelSprites';
import { Award, Send, CheckCircle2, ShieldCheck, Sparkles, BookOpen, FileText } from 'lucide-react';
import { sound } from '../utils/audio';

interface FinalScoreModalProps {
  player: PlayerState;
  onSendToMrHendra: () => void;
}

export const FinalScoreModal: React.FC<FinalScoreModalProps> = ({
  player,
  onSendToMrHendra
}) => {
  const tierInfo = getCandidateTier(player.scores.totalScore);

  const careerTrackTitle =
    player.major === 'AKL'
      ? 'Muhiba Bank Partner (Junior Accounting Assistant)'
      : player.major === 'OTOMOTIF'
      ? 'Muhiba Auto Garage (Junior Automotive Technician)'
      : 'Muhiba Telecom (Junior Network Technician)';

  const handleSend = () => {
    sound.playClick();
    onSendToMrHendra();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-xs select-none overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto bg-[#FFFDF5] border-3 sm:border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Banner Header */}
        <div className="px-4 py-3 bg-amber-400 border-b-3 border-slate-900 text-center">
          <div className="inline-block bg-slate-900 text-amber-300 font-pixel text-[10px] px-2.5 py-0.5 mb-1 border border-slate-700">
            SMK MUHAMMADIYAH BAWANG
          </div>
          <h2 className="font-display text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            MISSION COMPLETE!
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-semibold italic">
            "Your career adventure is complete."
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 text-slate-900">
          {/* Candidate Tier Ribbon */}
          <div
            style={{ backgroundColor: tierInfo.badgeBg, borderColor: tierInfo.badgeColor }}
            className="border-2 p-3 text-center shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <span className="font-pixel text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
              OFFICIAL CANDIDATE EVALUATION TIER:
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display text-base sm:text-xl font-extrabold text-slate-900">
                {tierInfo.tier}
              </h3>
            </div>
            <p className="text-xs text-slate-700 mt-1 max-w-md mx-auto">
              {tierInfo.summaryEn}
            </p>
          </div>

          {/* Student Profile Card */}
          <div className="bg-amber-100/80 border-2 border-slate-900 p-3 sm:p-4 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-amber-800/30 pb-1.5">
              <span className="text-slate-600 font-bold">CANDIDATE NAME:</span>
              <span className="font-bold text-slate-900 font-pixel text-[11px]">
                {player.name || 'Siswa Muhiba'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-amber-800/30 pb-1.5">
              <span className="text-slate-600 font-bold">VOCATIONAL MAJOR:</span>
              <span className="font-bold text-slate-900">{player.major}</span>
            </div>
            <div className="flex items-center justify-between border-b border-amber-800/30 pb-1.5">
              <span className="text-slate-600 font-bold">CAREER TRACK:</span>
              <span className="font-semibold text-slate-900 text-right truncate max-w-[240px]">
                {careerTrackTitle}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-bold">POST-GRADUATION CHOICE:</span>
              <span className="font-bold text-emerald-800">
                {player.finalDecision === 'WORK' ? 'Enter Workforce (Kerja)' : 'Higher Studies (Kuliah)'}
              </span>
            </div>
          </div>

          {/* Detailed Score Breakdown */}
          <div className="space-y-2">
            <span className="font-pixel text-xs text-slate-900 font-bold block">
              CAREER READINESS SCORE BREAKDOWN:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#000] flex justify-between items-center">
                <span className="text-slate-600">English Skill:</span>
                <span className="font-pixel font-bold text-slate-900">
                  {player.scores.englishScore} pts
                </span>
              </div>
              <div className="bg-white p-2.5 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#000] flex justify-between items-center">
                <span className="text-slate-600">App Letter:</span>
                <span className="font-pixel font-bold text-slate-900">
                  {player.scores.letterScore} pts
                </span>
              </div>
              <div className="bg-white p-2.5 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#000] flex justify-between items-center">
                <span className="text-slate-600">Problem Solving:</span>
                <span className="font-pixel font-bold text-slate-900">
                  {player.scores.problemSolvingScore} pts
                </span>
              </div>
              <div className="bg-white p-2.5 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#000] flex justify-between items-center">
                <span className="text-slate-600">Daily Quizzes:</span>
                <span className="font-pixel font-bold text-slate-900">
                  {player.scores.quiz} pts
                </span>
              </div>
            </div>

            {/* Total Grand Score */}
            <div className="bg-amber-300 border-2 border-slate-900 p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
              <span className="font-pixel text-xs font-bold text-slate-900">
                TOTAL FINAL SCORE:
              </span>
              <span className="font-pixel text-lg font-black text-slate-950">
                {player.scores.totalScore} PTS
              </span>
            </div>
          </div>

          {/* Mr. Hendra's Note */}
          <div className="flex items-center gap-3 bg-amber-50 border border-slate-300 p-2.5">
            <NPCPixelSprite avatarType="coordinator" size={36} />
            <p className="text-xs text-slate-700 italic">
              "Congratulations! Submit your verified score to our career database to record your achievement."
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-3 bg-amber-100 border-t-3 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600 italic text-center sm:text-left">
            Ready to send to BKK SMK Muhammadiyah Bawang?
          </p>
          <button
            onClick={handleSend}
            className="w-full sm:w-auto pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-6 py-2.5 text-xs font-pixel flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#0F172A]"
          >
            <Send className="w-4 h-4" />
            <span>Send your result to Mr. Hendra</span>
          </button>
        </div>
      </div>
    </div>
  );
};
