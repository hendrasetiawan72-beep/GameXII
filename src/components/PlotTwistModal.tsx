import React, { useState, useEffect } from 'react';
import { Major } from '../types/game';
import { NPCPixelSprite } from './PixelSprites';
import { Mail, Flame, Briefcase, GraduationCap, ArrowRight, Award, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface PlotTwistModalProps {
  major: Major;
  playerName: string;
  onDecisionMade: (decision: 'WORK' | 'COLLEGE') => void;
}

export const PlotTwistModal: React.FC<PlotTwistModalProps> = ({
  playerName,
  onDecisionMade
}) => {
  const [phase, setPhase] = useState<'RECRUITER_MSG' | 'REVELATION' | 'DECISION' | 'CONCLUSION'>('RECRUITER_MSG');
  const [decision, setDecision] = useState<'WORK' | 'COLLEGE' | null>(null);

  const hendraQuote = "You were not only looking for a job. You were preparing yourself for your entire future.";

  useEffect(() => {
    if (phase === 'REVELATION') {
      sound.playCharacterVoice('male', hendraQuote);
    }
  }, [phase]);

  const handleNextPhase = (next: 'REVELATION' | 'DECISION' | 'CONCLUSION') => {
    sound.playClick();
    setPhase(next);
    if (next === 'REVELATION') {
      sound.playFanfare();
    }
  };

  const handleSelectDecision = (choice: 'WORK' | 'COLLEGE') => {
    sound.playFanfare();
    setDecision(choice);
    setPhase('CONCLUSION');
  };

  const handleFinalAdvance = () => {
    if (decision) {
      onDecisionMade(decision);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-xl bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Phase 1: Incoming Recruiter Message */}
        {phase === 'RECRUITER_MSG' && (
          <div>
            <div className="bg-sky-500 p-3.5 border-b-2 border-slate-900 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm">
                <Mail className="w-4 h-4" />
                <span>INCOMING NOTIFICATION</span>
              </div>
              <span className="font-pixel text-[10px] bg-slate-900 px-2.5 py-0.5 rounded-md">NEW EMAIL</span>
            </div>

            <div className="p-6 sm:p-8 space-y-4 text-center">
              <div className="w-16 h-16 mx-auto bg-sky-100 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                <Mail className="w-8 h-8 text-sky-700 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="font-pixel text-xs text-sky-800 font-bold block uppercase tracking-wide">
                  FROM: HR HIRING COMMITTEE
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  "Congratulations! Your application has been received."
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your formal application letter and vocational profile have been thoroughly reviewed.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleNextPhase('REVELATION')}
                  className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 text-xs font-pixel flex items-center gap-2 mx-auto cursor-pointer rounded-xl"
                >
                  <span>OPEN CONFIRMATION NOTICE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: The Grand Revelation / Plot Twist */}
        {phase === 'REVELATION' && (
          <div>
            <div className="bg-amber-400 p-3.5 border-b-2 border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm text-slate-900">
                <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                <span>THE REVELATION · MR. HENDRA</span>
              </div>
              <span className="font-pixel text-[10px] bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-md">
                BKK MUHIBA
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Mr. Hendra Avatar Dialogue */}
              <div className="flex items-start gap-4 bg-amber-50 border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0F172A] relative">
                <div className="shrink-0 flex flex-col items-center">
                  <NPCPixelSprite avatarType="coordinator" size={54} />
                  <span className="font-pixel text-[9px] text-slate-800 mt-1 font-bold">
                    Mr. Hendra
                  </span>
                  <span className="text-[9px] text-slate-500 font-semibold mt-0.5">
                    ♂ Deep Voice
                  </span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-800 pr-8">
                  <p className="font-bold text-amber-950 font-display text-base">
                    "You were not only looking for a job."
                  </p>
                  <p className="italic text-slate-700">
                    "You were preparing yourself for your entire future."
                  </p>
                  <p className="text-slate-600 text-xs">
                    The vacancy brochure and all the challenges you solved since Day 1 were actually{' '}
                    <strong className="text-slate-900">
                      The Official SMK Muhammadiyah Bawang Career Readiness Simulation
                    </strong>
                    ! We designed this quest to test your English communication, critical thinking, problem-solving, and job application skills in a realistic setting.
                  </p>
                </div>
                <button
                  onClick={() => sound.playCharacterVoice('male', hendraQuote)}
                  className="absolute top-3.5 right-3.5 p-1.5 bg-amber-200 hover:bg-amber-300 border border-slate-800 rounded-lg text-slate-900 shadow-xs cursor-pointer transition-colors"
                  title="Listen to Voice"
                >
                  <Volume2 className="w-4 h-4 text-slate-900" />
                </button>
              </div>

              {/* Core Lessons Tested */}
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-3.5 text-xs space-y-1.5 shadow-[2px_2px_0px_0px_#0F172A]">
                <span className="font-pixel text-[10px] text-slate-900 font-bold block mb-1">
                  CORE COMPETENCIES TESTED THROUGHOUT THE QUEST:
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>✓ English Communication (CEFR A2-B1)</div>
                  <div>✓ Application Letter Structure (9 Parts)</div>
                  <div>✓ Vocational Requirement Matching</div>
                  <div>✓ Independent Problem Solving</div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => handleNextPhase('DECISION')}
                  className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-6 py-3 text-xs font-pixel flex items-center gap-2 mx-auto cursor-pointer rounded-xl"
                >
                  <span>STEP FORWARD: YOUR FUTURE DECISION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: The Career Choice (Work vs College) */}
        {phase === 'DECISION' && (
          <div>
            <div className="bg-amber-400 p-3.5 border-b-2 border-slate-900 text-slate-900 text-center">
              <h3 className="font-display text-sm sm:text-base font-bold">
                YOUR FUTURE IS NOT A MULTIPLE-CHOICE QUESTION
              </h3>
              <p className="font-pixel text-[10px] text-slate-800 mt-1">
                Choose the path you wish to pursue after graduating from SMK Muhammadiyah Bawang:
              </p>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Choice: WORK */}
                <button
                  onClick={() => handleSelectDecision('WORK')}
                  className="pixel-box-amber p-4 text-left border-2 border-slate-900 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-amber-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-3">
                      <Briefcase className="w-5 h-5 text-slate-900" />
                    </div>
                    <h4 className="font-display text-base font-bold text-slate-900 mb-1">
                      "I want to work."
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Enter the workforce directly, apply vocational expertise, achieve financial independence, and submit professional Application Letters to prospective employers.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-amber-800/20 font-pixel text-[10px] text-amber-900 font-bold flex items-center gap-1">
                    <span>CHOOSE WORK PATH</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>

                {/* Choice: COLLEGE */}
                <button
                  onClick={() => handleSelectDecision('COLLEGE')}
                  className="pixel-box-blue p-4 text-left border-2 border-slate-900 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-sky-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-3">
                      <GraduationCap className="w-5 h-5 text-slate-900" />
                    </div>
                    <h4 className="font-display text-base font-bold text-slate-900 mb-1">
                      "I want to continue my studies."
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Advance to higher education, deepen your technical and academic mastery, and leverage your English application letter skills for university grants and research internships.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-sky-800/20 font-pixel text-[10px] text-sky-900 font-bold flex items-center gap-1">
                    <span>CHOOSE COLLEGE PATH</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </div>

              <div className="bg-amber-100 border border-amber-800/20 p-3 rounded-xl text-center text-xs text-slate-700">
                <span className="font-bold">Important note:</span> Both choices are honorable and impactful. Your future is in your hands!
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Inspiring Conclusion */}
        {phase === 'CONCLUSION' && (
          <div>
            <div className="bg-emerald-400 p-3.5 border-b-2 border-slate-900 flex items-center justify-between text-slate-900">
              <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold">
                <Award className="w-4 h-4" />
                <span>DECISION CONFIRMED: {decision}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-100 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                {decision === 'WORK' ? (
                  <Briefcase className="w-8 h-8 text-emerald-800" />
                ) : (
                  <GraduationCap className="w-8 h-8 text-sky-800" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  {decision === 'WORK'
                    ? 'Entering the Professional Workforce'
                    : 'Continuing Higher Academic Studies'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
                  {decision === 'WORK' ? (
                    <>
                      Congratulations, <strong className="text-slate-900">{playerName || 'Student'}</strong>!
                      With your proven English communication and application letter expertise, you are fully prepared to enter the workforce with high confidence and professional standards.
                    </>
                  ) : (
                    <>
                      Congratulations, <strong className="text-slate-900">{playerName || 'Student'}</strong>!
                      Your journey into higher education is backed by strong vocational craftsmanship. Your English application letter skills will help you secure prestigious scholarships and competitive internships!
                    </>
                  )}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleFinalAdvance}
                  className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-6 py-3 text-xs font-pixel flex items-center gap-2 mx-auto cursor-pointer rounded-xl"
                >
                  <span>SEE FINAL SCORE & SUBMIT TO MR. HENDRA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
