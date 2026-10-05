import React from 'react';
import { Major } from '../types/game';
import { Calculator, Wrench, Cpu, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface ChooseMajorModalProps {
  onSelectMajor: (major: Major) => void;
}

export const ChooseMajorModal: React.FC<ChooseMajorModalProps> = ({
  onSelectMajor
}) => {
  const majors: {
    id: Major;
    name: string;
    fullName: string;
    careerTarget: string;
    company: string;
    mentor: string;
    classmate: string;
    themeColor: string;
    bgClass: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      id: 'AKL',
      name: 'AKL',
      fullName: 'Accounting & Institutional Finance',
      careerTarget: 'Junior Accounting Assistant',
      company: 'MUHIBA BANK PARTNER',
      mentor: 'Bu Rina (Accounting Teacher)',
      classmate: 'Sinta',
      themeColor: '#0284C7',
      bgClass: 'bg-sky-50/80 hover:bg-sky-100',
      icon: <Calculator className="w-6 h-6 text-sky-700" />,
      description: 'Prepare financial ledgers, master spreadsheet equations, and write formal banking application letters.'
    },
    {
      id: 'OTOMOTIF',
      name: 'OTOMOTIF',
      fullName: 'Automotive & Motorcycle Engineering',
      careerTarget: 'Junior Automotive Technician',
      company: 'MUHIBA AUTO GARAGE',
      mentor: 'Pak Darto (Workshop Head)',
      classmate: 'Raka',
      themeColor: '#EA580C',
      bgClass: 'bg-amber-50/80 hover:bg-amber-100',
      icon: <Wrench className="w-6 h-6 text-amber-700" />,
      description: 'Engine overhaul, EFI tune-up, workshop safety procedures (K3), and modern auto service cover letters.'
    },
    {
      id: 'TJKT',
      name: 'TJKT',
      fullName: 'Computer Network & Telecommunication',
      careerTarget: 'Junior Network Technician',
      company: 'MUHIBA TELECOM',
      mentor: 'Pak Andi (Network Teacher)',
      classmate: 'Dimas',
      themeColor: '#059669',
      bgClass: 'bg-emerald-50/80 hover:bg-emerald-100',
      icon: <Cpu className="w-6 h-6 text-emerald-700" />,
      description: 'Configure routers, patch fiber optic cables, troubleshoot connectivity, and draft telecom letters.'
    }
  ];

  const handleChoose = (m: Major) => {
    sound.playClick();
    sound.playCorrect();
    onSelectMajor(m);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-xs select-none font-sans overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col my-auto bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 sm:px-5 sm:py-4 bg-amber-400 border-b-2 border-slate-900 text-center shrink-0">
          <h2 className="font-display text-base sm:text-xl font-extrabold text-slate-900">
            WHICH MAJOR DO YOU CHOOSE?
          </h2>
          <p className="font-pixel text-[9px] sm:text-[10px] text-slate-800 mt-1">
            SMK Muhammadiyah Bawang · Each major features a unique story, mentor, and career quest!
          </p>
        </div>

        {/* 3 Major Cards Grid - Smooth Mobile Scrolling */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 touch-pan-y">
          {majors.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] flex flex-col justify-between transition-all hover:scale-[1.01] ${item.bgClass}`}
            >
              <div>
                {/* Major Badge & Icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-pixel text-xs bg-slate-900 text-white px-2.5 py-1 rounded-md border border-slate-700 font-bold">
                    {item.name}
                  </span>
                  <div className="p-2 bg-white rounded-xl border border-slate-900 shadow-xs">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-display text-sm font-bold text-slate-900 mb-1 leading-snug">
                  {item.fullName}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Details Breakdown */}
                <div className="space-y-1.5 text-[11px] bg-white/90 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900">Target Role: </span>
                    <span className="text-slate-700">{item.careerTarget}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Company: </span>
                    <span className="text-slate-700">{item.company}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Teacher: </span>
                    <span className="text-slate-700">{item.mentor}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Classmate: </span>
                    <span className="text-slate-700">{item.classmate}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <button
                  onClick={() => handleChoose(item.id)}
                  className="w-full pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 py-2.5 text-xs font-pixel flex items-center justify-center gap-1.5 cursor-pointer rounded-xl shadow-[2px_2px_0px_0px_#000]"
                >
                  <span>SELECT {item.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-amber-100 border-t-2 border-slate-900 text-center text-xs text-slate-700 shrink-0">
          <p className="italic">
            "All majors learn and practice standard international English Application Letters."
          </p>
        </div>
      </div>
    </div>
  );
};
