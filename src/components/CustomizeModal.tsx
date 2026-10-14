import React, { useState } from 'react';
import { Gender } from '../types/game';
import { PlayerPixelSprite } from './PixelSprites';
import { User, Flame, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface CustomizeModalProps {
  initialName?: string;
  initialGender?: Gender;
  onConfirm: (name: string, gender: Gender) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  initialName = 'Raka',
  initialGender = 'boy',
  onConfirm
}) => {
  const [name, setName] = useState(initialName);
  const [gender, setGender] = useState<Gender>(initialGender);
  const [previewDirection, setPreviewDirection] = useState<'down' | 'right' | 'up'>('down');
  const [testMoving, setTestMoving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    sound.playClick();
    onConfirm(name.trim(), gender);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-md bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden font-sans">
        {/* Header */}
        <div className="px-5 py-3.5 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-slate-900" />
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
              CREATE YOUR CHARACTER
            </h3>
          </div>
          <span className="font-pixel text-[10px] bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-md">
            MUHIBA STUDENT
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Sprite Preview Box - Large 84px with Multi-Angle Previews */}
          <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-sky-50 to-sky-100 border-2 border-slate-900 rounded-2xl shadow-[2px_2px_0px_0px_#0F172A]">
            <div className="p-4 bg-white/90 border-2 border-slate-900 rounded-3xl shadow-sm mb-2 relative flex items-center justify-center">
              <PlayerPixelSprite
                gender={gender}
                direction={previewDirection}
                size={84}
                isMoving={testMoving}
                isExcited={!testMoving}
              />
            </div>

            {/* Angle & Walk Previews */}
            <div className="flex items-center gap-1.5 mb-2.5">
              {(['down', 'right', 'up'] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPreviewDirection(dir);
                  }}
                  className={`px-2 py-0.5 rounded text-[8px] font-pixel border border-slate-900 transition-all ${
                    previewDirection === dir
                      ? 'bg-amber-400 text-slate-900 font-bold shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {dir === 'down' ? 'Depan' : dir === 'right' ? 'Samping' : 'Belakang'}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTestMoving(!testMoving);
                }}
                className={`px-2 py-0.5 rounded text-[8px] font-pixel border border-slate-900 transition-all ${
                  testMoving
                    ? 'bg-emerald-400 text-slate-900 font-bold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {testMoving ? '🏃 Gerak' : '🚶 Diam'}
              </button>
            </div>

            <p className="font-pixel text-xs text-slate-900 font-bold">
              {name || 'Student Name'}
            </p>
            <p className="text-[10px] text-slate-600">SMK Muhammadiyah Bawang</p>
          </div>

          {/* Gender Selector */}
          <div>
            <label className="block font-pixel text-xs text-slate-900 mb-2 font-bold">
              CHOOSE APPEARANCE:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'boy' as Gender, label: 'Boy', icon: '👦' },
                { id: 'girl_hijab' as Gender, label: 'Girl (Hijab)', icon: '🧕' },
                { id: 'girl' as Gender, label: 'Girl', icon: '👧' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setGender(item.id);
                  }}
                  className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                    gender === item.id
                      ? 'bg-amber-300 border-slate-900 ring-2 ring-amber-500 font-bold shadow-sm'
                      : 'bg-white hover:bg-amber-50 border-slate-900 shadow-xs'
                  }`}
                >
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <span className="font-pixel text-[9px] text-slate-900 block truncate">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block font-pixel text-xs text-slate-900 mb-1.5 font-bold">
              ENTER YOUR NAME:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Raka Pratama / Sinta Dewi"
              maxLength={24}
              required
              className="w-full bg-white border-2 border-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 py-3 text-xs font-pixel flex items-center justify-center gap-2 cursor-pointer rounded-xl shadow-[3px_3px_0px_0px_#0F172A]"
            >
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>CONFIRM & CHOOSE MAJOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
