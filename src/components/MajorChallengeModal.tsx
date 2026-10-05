import React, { useState } from 'react';
import { Major } from '../types/game';
import { MAJOR_MATCHING_PAIRS } from '../data/gameData';
import { X, Check, Wrench, Cpu, Calculator, Flame } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface MajorChallengeModalProps {
  major: Major;
  playerName: string;
  onClose: () => void;
  onComplete: (score: number) => void;
  alreadyCompleted?: boolean;
}

export const MajorChallengeModal: React.FC<MajorChallengeModalProps> = ({
  major,
  playerName,
  onClose,
  onComplete,
  alreadyCompleted = false
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Challenge 1: Skill Matching state
  const pairs = MAJOR_MATCHING_PAIRS[major];
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [c1Complete, setC1Complete] = useState(alreadyCompleted);

  // Challenge 2 state
  const [c2SelectedOption, setC2SelectedOption] = useState<string | null>(null);
  const [engineParts, setEngineParts] = useState<string[]>(['Body', 'Opening', 'Closing']);
  const [cables, setCables] = useState<string[]>([
    'Opening',
    'Salutation',
    'Complimentary Close',
    'Body',
    'Closing'
  ]);
  const [c2Complete, setC2Complete] = useState(alreadyCompleted);

  // Challenge 3 state
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [c3Complete, setC3Complete] = useState(alreadyCompleted);

  const handleSelectSkill = (skill: string) => {
    sound.playClick();
    setSelectedSkill(skill);
  };

  const handleMatchWithRequirement = (req: string) => {
    if (!selectedSkill) return;
    sound.playClick();

    const expectedPair = pairs.find((p) => p.skill === selectedSkill);
    if (expectedPair && expectedPair.requirement === req) {
      sound.playCorrect();
      const updated = { ...matchedPairs, [selectedSkill]: req };
      setMatchedPairs(updated);
      setSelectedSkill(null);

      if (Object.keys(updated).length === pairs.length) {
        setC1Complete(true);
      }
    } else {
      sound.playWrong();
      setSelectedSkill(null);
    }
  };

  const swapEngineParts = (i: number, j: number) => {
    sound.playClick();
    const updated = [...engineParts];
    const temp = updated[i];
    updated[i] = updated[j];
    updated[j] = temp;
    setEngineParts(updated);

    if (updated[0] === 'Opening' && updated[1] === 'Body' && updated[2] === 'Closing') {
      sound.playEngineRev();
      setC2Complete(true);
    }
  };

  const swapCables = (i: number, j: number) => {
    sound.playCablePlug();
    const updated = [...cables];
    const temp = updated[i];
    updated[i] = updated[j];
    updated[j] = temp;
    setCables(updated);

    const target = ['Salutation', 'Opening', 'Body', 'Closing', 'Complimentary Close'];
    const isCorrect = updated.every((val, idx) => val === target[idx]);
    if (isCorrect) {
      sound.playCorrect();
      setC2Complete(true);
    }
  };

  const skillOptions =
    major === 'AKL'
      ? [
          { text: 'Basic Accounting & Journaling', correct: true },
          { text: 'Microsoft Excel Financial Formulas', correct: true },
          { text: 'Motorcycle Valve Overhaul', correct: false },
          { text: 'Financial Report Preparation', correct: true },
          { text: 'Teamwork & Integrity', correct: true },
          { text: 'Deep Frying Cooking Pan', correct: false }
        ]
      : major === 'OTOMOTIF'
      ? [
          { text: 'Wrench & Screwdriver Tool Mastery', correct: true },
          { text: 'Engine Maintenance & Tune-Up', correct: true },
          { text: 'Accounting Balance Sheet Audit', correct: false },
          { text: 'Diagnostic Scanner Inspection', correct: true },
          { text: 'Safety Procedures & Teamwork', correct: true },
          { text: 'Cooking Fried Rice in Canteen', correct: false }
        ]
      : [
          { text: 'Basic IP Addressing & Subnetting', correct: true },
          { text: 'Network Troubleshooting & Ping Tests', correct: true },
          { text: 'Car Engine Piston Repair', correct: false },
          { text: 'LAN RJ45 Cabling & Crimping', correct: true },
          { text: 'Client Communication & Teamwork', correct: true },
          { text: 'Baking Pastry Dough', correct: false }
        ];

  const toggleSkill = (text: string) => {
    sound.playClick();
    setSelectedSkills((prev) =>
      prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]
    );
  };

  const verifySkills = () => {
    const requiredCorrect = skillOptions.filter((o) => o.correct).map((o) => o.text);
    const chosenIncorrect = selectedSkills.filter(
      (s) => !skillOptions.find((o) => o.text === s && o.correct)
    );

    if (
      chosenIncorrect.length === 0 &&
      requiredCorrect.every((r) => selectedSkills.includes(r))
    ) {
      sound.playFanfare();
      setC3Complete(true);
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}
    } else {
      sound.playWrong();
    }
  };

  const handleFinish = () => {
    sound.playFanfare();
    onComplete(10);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl max-h-[94vh] flex flex-col bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-400 border-b-2 border-slate-900">
          <div className="flex items-center gap-2">
            {major === 'AKL' ? (
              <Calculator className="w-4 h-4 text-slate-900" />
            ) : major === 'OTOMOTIF' ? (
              <Wrench className="w-4 h-4 text-slate-900" />
            ) : (
              <Cpu className="w-4 h-4 text-slate-900" />
            )}
            <span className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              {major} VOCATIONAL CHALLENGE
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

        {/* Step Tabs with rounded design */}
        <div className="flex border-b border-slate-200 bg-amber-100 p-1.5 gap-1.5 text-xs font-pixel">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-colors ${
              step === 1 ? 'bg-amber-300 border border-slate-900 font-bold shadow-xs' : 'hover:bg-amber-200 text-slate-700'
            }`}
          >
            1. SKILLS MATCH
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-colors ${
              step === 2 ? 'bg-amber-300 border border-slate-900 font-bold shadow-xs' : 'hover:bg-amber-200 text-slate-700'
            }`}
          >
            2. {major === 'OTOMOTIF' ? 'ENGINE FIX' : major === 'TJKT' ? 'CABLE CONNECT' : 'OPENING TEXT'}
          </button>
          <button
            onClick={() => setStep(3)}
            className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-colors ${
              step === 3 ? 'bg-amber-300 border border-slate-900 font-bold shadow-xs' : 'hover:bg-amber-200 text-slate-700'
            }`}
          >
            3. KEY SKILLS
          </button>
          <button
            onClick={() => setStep(4)}
            className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-colors ${
              step === 4 ? 'bg-amber-300 border border-slate-900 font-bold shadow-xs' : 'hover:bg-amber-200 text-slate-700'
            }`}
          >
            4. FINAL LETTER
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
          {/* STEP 1: Matching pairs */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div className="bg-amber-100/90 border border-amber-800/30 p-3 rounded-2xl">
                <p className="font-semibold text-xs sm:text-sm text-amber-950">
                  Match your vocational skills with the company job requirements:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Left column */}
                <div className="space-y-2">
                  <span className="font-pixel text-[10px] text-slate-800 font-bold block">
                    YOUR PRACTICAL SKILLS:
                  </span>
                  {pairs.map((p) => {
                    const isMatched = !!matchedPairs[p.skill];
                    const isSelected = selectedSkill === p.skill;
                    return (
                      <button
                        key={p.id}
                        disabled={isMatched}
                        onClick={() => handleSelectSkill(p.skill)}
                        className={`w-full text-left p-3 rounded-xl border-2 text-xs transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-900 line-through opacity-75'
                            : isSelected
                            ? 'bg-amber-300 border-slate-900 font-bold ring-2 ring-amber-500 shadow-sm'
                            : 'bg-white hover:bg-amber-50 border-slate-900 shadow-xs'
                        }`}
                      >
                        <p className="font-semibold">{p.skill}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Right column */}
                <div className="space-y-2">
                  <span className="font-pixel text-[10px] text-slate-800 font-bold block">
                    JOB REQUIREMENTS:
                  </span>
                  {pairs.map((p) => {
                    const isMatched = Object.values(matchedPairs).includes(p.requirement);
                    return (
                      <button
                        key={`req_${p.id}`}
                        disabled={isMatched || !selectedSkill}
                        onClick={() => handleMatchWithRequirement(p.requirement)}
                        className={`w-full text-left p-3 rounded-xl border-2 text-xs transition-all ${
                          isMatched
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                            : selectedSkill
                            ? 'bg-sky-50 hover:bg-sky-100 border-slate-900 cursor-pointer shadow-xs'
                            : 'bg-slate-50 border-slate-300 opacity-60'
                        }`}
                      >
                        <p className="font-semibold">{p.requirement}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {c1Complete && (
                <div className="bg-emerald-100 border border-emerald-600 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-semibold">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>All skills matched successfully! Ready for Step 2.</span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="pixel-btn bg-emerald-400 px-3.5 py-1.5 text-xs font-pixel cursor-pointer rounded-xl"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-3.5">
              {major === 'AKL' && (
                <div className="space-y-3">
                  <div className="bg-amber-100/90 border border-amber-800/30 p-3 rounded-2xl">
                    <p className="font-semibold text-xs sm:text-sm text-amber-950">
                      AKL Challenge: Select the most professional opening paragraph for the bank position:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        id: 'opt1',
                        en: 'I am writing to apply for the Junior Accounting Assistant position at Muhiba Bank Partner, as advertised on the school bulletin board.',
                        correct: true
                      },
                      {
                        id: 'opt2',
                        en: 'Hey bank guys! I need quick cash so please give me the accounting job today.',
                        correct: false
                      },
                      {
                        id: 'opt3',
                        en: 'I love playing video games with numbers so maybe your bank is fun.',
                        correct: false
                      }
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => {
                          sound.playClick();
                          setC2SelectedOption(opt.id);
                          if (opt.correct) {
                            sound.playCorrect();
                            setC2Complete(true);
                          } else {
                            sound.playWrong();
                          }
                        }}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          c2SelectedOption === opt.id
                            ? opt.correct
                              ? 'bg-emerald-100 border-emerald-700 ring-2 ring-emerald-500 shadow-sm'
                              : 'bg-red-100 border-red-700 ring-2 ring-red-500 shadow-sm'
                            : 'bg-white hover:bg-amber-50 border-slate-900 shadow-xs'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">{opt.en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {major === 'OTOMOTIF' && (
                <div className="space-y-3">
                  <div className="bg-amber-100/90 border border-amber-800/30 p-3 rounded-2xl">
                    <p className="font-semibold text-xs sm:text-sm text-amber-950">
                      Otomotif Challenge: Align the Application Letter Engine cylinders in order (Opening → Body → Closing):
                    </p>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-2xl border-2 border-amber-500 text-center space-y-4">
                    <p className="font-pixel text-xs text-amber-300">
                      ENGINE DIAGNOSTIC STATUS: {c2Complete ? 'ONLINE & RUNNING 🏁' : 'STALLED / UNSEQUENCED'}
                    </p>

                    <div className="flex justify-center gap-3">
                      {engineParts.map((part, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border-2 font-pixel text-xs w-28 text-center transition-all ${
                            c2Complete
                              ? 'bg-emerald-400 text-slate-900 border-white'
                              : 'bg-slate-800 text-amber-300 border-amber-400'
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 block mb-1">CYLINDER #{idx + 1}</span>
                          <span className="font-bold">{part}</span>
                          {!c2Complete && (
                            <div className="flex justify-center gap-1.5 mt-2">
                              {idx > 0 && (
                                <button
                                  onClick={() => swapEngineParts(idx, idx - 1)}
                                  className="px-2 py-0.5 bg-amber-400 text-slate-900 text-[10px] rounded cursor-pointer"
                                >
                                  ←
                                </button>
                              )}
                              {idx < engineParts.length - 1 && (
                                <button
                                  onClick={() => swapEngineParts(idx, idx + 1)}
                                  className="px-2 py-0.5 bg-amber-400 text-slate-900 text-[10px] rounded cursor-pointer"
                                >
                                  →
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {major === 'TJKT' && (
                <div className="space-y-3">
                  <div className="bg-amber-100/90 border border-amber-800/30 p-3 rounded-2xl">
                    <p className="font-semibold text-xs sm:text-sm text-amber-950">
                      TJKT Challenge: Patch the Network Server Cables in order (Salutation → Opening → Body → Closing → Complimentary Close):
                    </p>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-2xl border-2 border-emerald-500 space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-pixel text-emerald-400">
                      <span>RACK SERVER PORT LINK</span>
                      <span>{c2Complete ? 'ALL PORTS ACTIVE 🟢' : 'ALIGNING PORTS...'}</span>
                    </div>

                    <div className="space-y-2">
                      {cables.map((cable, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-pixel ${
                            c2Complete
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                              : 'bg-slate-800 border-slate-600 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-amber-400">PORT {idx + 1}:</span>
                            <span>{cable}</span>
                          </div>
                          {!c2Complete && (
                            <div className="flex gap-1.5">
                              {idx > 0 && (
                                <button
                                  onClick={() => swapCables(idx, idx - 1)}
                                  className="px-2 py-0.5 bg-sky-400 text-slate-900 text-[10px] rounded cursor-pointer"
                                >
                                  ▲
                                </button>
                              )}
                              {idx < cables.length - 1 && (
                                <button
                                  onClick={() => swapCables(idx, idx + 1)}
                                  className="px-2 py-0.5 bg-sky-400 text-slate-900 text-[10px] rounded cursor-pointer"
                                >
                                  ▼
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {c2Complete && (
                <div className="bg-emerald-100 border border-emerald-600 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-semibold">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Challenge 2 Complete! Proceed to Step 3.</span>
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="pixel-btn bg-emerald-400 px-3.5 py-1.5 text-xs font-pixel cursor-pointer rounded-xl"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div className="bg-amber-100/90 border border-amber-800/30 p-3 rounded-2xl">
                <p className="font-semibold text-xs sm:text-sm text-amber-950">
                  Select all relevant professional skills for your application letter (exclude irrelevant items):
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {skillOptions.map((opt, idx) => {
                  const isChecked = selectedSkills.includes(opt.text);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleSkill(opt.text)}
                      className={`p-3 rounded-xl border-2 text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-amber-300 border-slate-900 font-bold shadow-[2px_2px_0px_0px_#000]'
                          : 'bg-white hover:bg-amber-50 border-slate-900 shadow-xs'
                      }`}
                    >
                      <span className="text-slate-900">{opt.text}</span>
                      <div
                        className={`w-4 h-4 rounded border border-slate-900 flex items-center justify-center ${
                          isChecked ? 'bg-slate-900 text-white' : 'bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={verifySkills}
                  className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-5 py-2.5 text-xs font-pixel cursor-pointer flex items-center gap-1.5 rounded-xl"
                >
                  <Check className="w-4 h-4" />
                  <span>CHECK SELECTED SKILLS</span>
                </button>
              </div>

              {c3Complete && (
                <div className="bg-emerald-100 border border-emerald-600 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-semibold">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>All relevant skills verified! Preview your finished Application Letter.</span>
                  </div>
                  <button
                    onClick={() => setStep(4)}
                    className="pixel-btn bg-emerald-400 px-3.5 py-1.5 text-xs font-pixel cursor-pointer rounded-xl"
                  >
                    PREVIEW LETTER
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#0F172A] font-mono text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed">
                <div>
                  <p className="font-bold">{playerName || 'Student Candidate'}</p>
                  <p className="text-slate-600">SMK Muhammadiyah Bawang, Batang, Central Java</p>
                  <p className="text-slate-600">student.muhiba@gmail.com | +62 812-3456-7890</p>
                </div>

                <p>October 15, 2026</p>

                <div>
                  <p className="font-bold">Hiring Manager</p>
                  <p>
                    {major === 'AKL'
                      ? 'MUHIBA BANK PARTNER'
                      : major === 'OTOMOTIF'
                      ? 'MUHIBA AUTO GARAGE'
                      : 'MUHIBA TELECOM'}
                  </p>
                  <p>Jawa Tengah, Indonesia</p>
                </div>

                <p className="font-bold">Dear Hiring Manager,</p>

                <p>
                  I am writing to express my strong interest in applying for the{' '}
                  <span className="font-bold text-amber-900">
                    {major === 'AKL'
                      ? 'Junior Accounting Assistant'
                      : major === 'OTOMOTIF'
                      ? 'Junior Automotive Technician'
                      : 'Junior Network Technician'}
                  </span>{' '}
                  position at your esteemed company, as advertised on our vocational school announcement board.
                </p>

                <p>
                  As a final-year vocational high school student majoring in{' '}
                  <span className="font-bold">{major}</span> at SMK Muhammadiyah Bawang, I have
                  consistently developed hands-on technical skills and professional discipline. Throughout
                  my studies and internship projects, I demonstrated proficiency in teamwork,
                  diligent problem-solving, and strict adherence to workplace standards. I am eager to
                  apply my vocational competence to support your team.
                </p>

                <p>
                  Thank you for considering my application. I look forward to the opportunity to discuss my
                  qualifications and motivation in a personal interview.
                </p>

                <div>
                  <p>Sincerely,</p>
                  <div className="py-2 text-slate-400 italic font-sans text-xs">
                    [Digitally Signed by Candidate]
                  </div>
                  <p className="font-bold">{playerName || 'Student of SMK Muhammadiyah Bawang'}</p>
                </div>
              </div>

              <div className="bg-amber-100 border border-amber-800/30 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                  <span className="font-pixel text-xs text-amber-950 font-bold">
                    VOCATIONAL LETTER READY! (+10 PTS)
                  </span>
                </div>
                <button
                  onClick={handleFinish}
                  className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-5 py-2.5 text-xs font-pixel flex items-center gap-1.5 cursor-pointer rounded-xl"
                >
                  <Check className="w-4 h-4" />
                  <span>COMPLETE CHALLENGE</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between">
          <span className="font-pixel text-[10px] text-slate-600">
            STEP {step} OF 4 · MAJOR: {major}
          </span>
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
