import React from 'react';
import { Major } from '../types/game';
import { MAJOR_VACANCIES } from '../data/gameData';
import { X, CheckCircle, Calendar, Mail, Building, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';

interface BrochureModalProps {
  major: Major;
  onClose: () => void;
  onClaimClue?: () => void;
  alreadyClaimed?: boolean;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  major,
  onClose,
  onClaimClue,
  alreadyClaimed = false
}) => {
  const vacancy = MAJOR_VACANCIES[major];

  const handleClaim = () => {
    sound.playClueFound();
    if (onClaimClue) onClaimClue();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#FFF9EB] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden">
        {/* Retro Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-400 border-b-2 border-slate-900">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-900" />
            <span className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              OFFICIAL VACANCY BROCHURE
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

        {/* Vintage Poster Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-900 font-sans">
          {/* Company Banner */}
          <div className="text-center pb-3 border-b border-dashed border-amber-900/30">
            <div className="inline-block bg-slate-900 text-amber-300 font-pixel text-[10px] px-3 py-1 mb-2 rounded-md border border-slate-700">
              SMK MUHAMMADIYAH BAWANG CAREER PARTNER
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {vacancy.companyName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 italic font-medium">
              "{vacancy.tagline}"
            </p>
          </div>

          {/* Position Box */}
          <div className="bg-amber-100/90 border-2 border-slate-900 rounded-2xl p-3.5 text-center shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="font-pixel text-[10px] text-amber-900 font-bold uppercase tracking-wider block mb-1">
              OPEN VACANCY:
            </span>
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-blue-950">
              {vacancy.position}
            </h3>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{vacancy.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 bg-white/80 p-3.5 rounded-xl border border-amber-300">
            {vacancy.description}
          </p>

          {/* Requirements Checklist */}
          <div className="space-y-2">
            <h4 className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              QUALIFICATIONS & REQUIREMENTS:
            </h4>
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-3.5 space-y-2 shadow-[2px_2px_0px_0px_#0F172A]">
              {vacancy.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-amber-200 border-2 border-amber-800 rounded-2xl p-3 text-center space-y-1">
            <p className="font-pixel text-xs text-amber-950 font-bold">
              INSTRUCTION TO APPLICANTS:
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              "{vacancy.instruction}"
            </p>
          </div>

          {/* Contact & Deadline Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-300">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Contact: {vacancy.contact}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Deadline: {vacancy.deadline}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between gap-2">
          <p className="text-xs text-slate-700 font-medium hidden sm:block">
            {alreadyClaimed ? '✓ Clue collected!' : 'Read carefully to gather your career clues.'}
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!alreadyClaimed && onClaimClue && (
              <button
                onClick={handleClaim}
                className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-3.5 py-2 text-xs font-pixel flex items-center gap-1 cursor-pointer rounded-xl"
              >
                <span>COLLECT CLUE (+10 PTS)</span>
              </button>
            )}
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
