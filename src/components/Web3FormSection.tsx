import React, { useEffect, useRef, useState } from 'react';
import { PlayerState } from '../types/game';
import { getCandidateTier } from '../data/gameData';
import { Send, CheckCircle2, AlertTriangle, Building, Award, Flame, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Web3FormSectionProps {
  player: PlayerState;
  onReturnToHome: () => void;
}

export const Web3FormSection: React.FC<Web3FormSectionProps> = ({
  player,
  onReturnToHome
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);

  const tierInfo = getCandidateTier(player.scores.totalScore);

  const careerPath =
    player.major === 'AKL'
      ? 'Muhiba Bank Partner - Junior Accounting Assistant'
      : player.major === 'OTOMOTIF'
      ? 'Muhiba Auto Garage - Junior Automotive Technician'
      : 'Muhiba Telecom - Junior Network Technician';

  useEffect(() => {
    const form = document.getElementById('form') as HTMLFormElement;
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!submitBtn) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("access_key", "b71a1e03-8d9c-4552-a9ef-653af39df983");

      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      setSubmissionStatus('sending');

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          sound.playFanfare();
          try {
            confetti({ particleCount: 80, spread: 80 });
          } catch {}
          try {
            alert("Success! Your message has been sent.");
          } catch {}
          setStatusMessage("Success! Your message has been sent.");
          setSubmissionStatus('success');
          form.reset();
          setCountdown(3);
        } else {
          sound.playWrong();
          try {
            alert("Error: " + data.message);
          } catch {}
          setStatusMessage("Error: " + data.message);
          setSubmissionStatus('error');
        }
      } catch (error) {
        sound.playWrong();
        try {
          alert("Something went wrong. Please try again.");
        } catch {}
        setStatusMessage("Something went wrong. Please try again.");
        setSubmissionStatus('error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [player, careerPath, onReturnToHome]);

  // Handle countdown return to home
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      onReturnToHome();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onReturnToHome]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xs select-none overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl my-auto bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-slate-900" />
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
                FINAL CAREER SCORE & SUBMISSION
              </h2>
              <p className="text-xs text-slate-800">
                Vocational Career Center (BKK) · SMK Muhammadiyah Bawang
              </p>
            </div>
          </div>
          <button
            onClick={onReturnToHome}
            className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-900 rounded-xl text-xs font-pixel text-slate-900 cursor-pointer shadow-xs"
            title="Return to Main Title"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HOME</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Candidate Tier Badge */}
          <div
            style={{ backgroundColor: tierInfo.badgeBg, borderColor: tierInfo.badgeColor }}
            className="border-2 rounded-2xl p-4 text-center shadow-xs"
          >
            <span className="font-pixel text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
              OFFICIAL EVALUATION TIER:
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
              <h3 className="font-display text-base sm:text-xl font-extrabold text-slate-900">
                {tierInfo.tier}
              </h3>
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-700 mt-1 max-w-md mx-auto">
              {tierInfo.summaryEn}
            </p>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-900 shadow-xs">
              <span className="text-[10px] text-slate-500 block">English Skill</span>
              <span className="font-pixel font-bold text-slate-900 text-sm">
                {player.scores.englishScore} pts
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-900 shadow-xs">
              <span className="text-[10px] text-slate-500 block">App Letter</span>
              <span className="font-pixel font-bold text-slate-900 text-sm">
                {player.scores.letterScore} pts
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-900 shadow-xs">
              <span className="text-[10px] text-slate-500 block">Quiz Score</span>
              <span className="font-pixel font-bold text-slate-900 text-sm">
                {player.scores.quiz} pts
              </span>
            </div>
            <div className="bg-amber-300 p-3 rounded-xl border border-slate-900 shadow-xs">
              <span className="text-[10px] text-slate-700 block font-bold">TOTAL SCORE</span>
              <span className="font-pixel font-black text-slate-900 text-sm">
                {player.scores.totalScore} PTS
              </span>
            </div>
          </div>

          {/* Status Alert */}
          {submissionStatus === 'success' && (
            <div className="p-4 bg-emerald-100 border-2 border-emerald-700 rounded-2xl text-emerald-950 text-xs sm:text-sm font-semibold space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              {countdown !== null && (
                <p className="text-xs text-emerald-800 font-pixel mt-1">
                  Returning to title screen in {countdown}...
                </p>
              )}
            </div>
          )}

          {submissionStatus === 'error' && (
            <div className="p-4 bg-red-100 border-2 border-red-700 rounded-2xl text-red-950 flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Form with id="form" */}
          <form id="form" ref={formRef} className="space-y-3.5 bg-amber-50/70 p-4 rounded-2xl border border-amber-800/20">
            {/* Hidden fields so FormData(form) includes student career quest achievements */}
            <input type="hidden" name="student_name" value={player.name || 'Student'} />
            <input type="hidden" name="major" value={player.major} />
            <input type="hidden" name="career_path" value={careerPath} />
            <input type="hidden" name="final_score" value={String(player.scores.totalScore)} />
            <input type="hidden" name="english_score" value={String(player.scores.englishScore)} />
            <input type="hidden" name="application_letter_score" value={String(player.scores.letterScore)} />
            <input type="hidden" name="quiz_score" value={String(player.scores.quiz)} />
            <input type="hidden" name="clues_completed" value={String(player.cluesFound.length)} />
            <input type="hidden" name="final_decision" value={player.finalDecision || 'WORK'} />
            <input type="hidden" name="game_title" value="Application Letter Adventure: Muhiba Career Quest" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-pixel text-[10px] text-slate-700 uppercase mb-1">
                  Student Name:
                </label>
                <input
                  type="text"
                  name="student_name_input"
                  defaultValue={player.name || 'Student'}
                  required
                  className="w-full bg-white border border-slate-900 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-slate-700 uppercase mb-1">
                  Major:
                </label>
                <input
                  type="text"
                  name="major_input"
                  defaultValue={player.major}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-900 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-pixel text-[10px] text-slate-700 uppercase mb-1">
                  Career Path / Company:
                </label>
                <input
                  type="text"
                  name="career_path_input"
                  defaultValue={careerPath}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-800 cursor-not-allowed truncate"
                />
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-slate-700 uppercase mb-1">
                  Career Decision:
                </label>
                <input
                  type="text"
                  name="decision_input"
                  defaultValue={player.finalDecision === 'WORK' ? 'Work in Industry' : 'Continue to Higher Studies'}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-900 rounded-xl px-3 py-2 text-xs font-bold text-emerald-800 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block font-pixel text-[10px] text-slate-700 uppercase mb-1">
                Reflective Note to Mr. Hendra (Optional):
              </label>
              <textarea
                name="student_notes"
                rows={2}
                placeholder="Share your experience and aspirations after completing the quest..."
                className="w-full bg-white border border-slate-900 rounded-xl p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
              <p className="text-[11px] text-slate-500 italic text-center sm:text-left">
                Your verified scores will be forwarded to BKK SMK Muhammadiyah Bawang.
              </p>
              <button
                type="submit"
                disabled={submissionStatus === 'sending'}
                className="w-full sm:w-auto pixel-btn bg-emerald-400 hover:bg-emerald-500 disabled:opacity-50 text-slate-900 px-6 py-3 text-xs font-pixel flex items-center justify-center gap-2 cursor-pointer rounded-xl shadow-[3px_3px_0px_0px_#0F172A]"
              >
                <Send className="w-4 h-4" />
                <span>Send to Mr. Hendra</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between">
          <span className="font-pixel text-[9px] text-slate-600">
            SMK MUHAMMADIYAH BAWANG · "ISLAMI, TERAMPIL, MANDIRI"
          </span>
          <button
            onClick={onReturnToHome}
            className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 py-2 text-xs font-pixel cursor-pointer rounded-xl"
          >
            RETURN TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};
