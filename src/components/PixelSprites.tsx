import React from 'react';
import { Gender } from '../types/game';

interface SpriteProps {
  gender?: Gender;
  direction?: 'down' | 'up' | 'left' | 'right';
  isMoving?: boolean;
  className?: string;
  size?: number;
}

// Chibi Player Pixel Art Sprite
export const PlayerPixelSprite: React.FC<SpriteProps> = ({
  gender = 'boy',
  direction = 'down',
  isMoving = false,
  className = '',
  size = 48
}) => {
  // Simple CSS walk bobbing
  const walkOffset = isMoving ? 'animate-bounce' : '';

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center pixelated select-none pointer-events-none ${walkOffset} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="12" cy="22" rx="7" ry="2" fill="#000000" fillOpacity="0.25" />

        {/* Legs / Indonesian School Uniform Trousers/Skirt (Dark Grey/Navy) */}
        {direction !== 'up' ? (
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
          </>
        ) : (
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
          </>
        )}

        {/* Torso / White School Shirt with Tie & Muhiba Pocket */}
        <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#F8FAFC" />
        <rect x="11.2" y="11" width="1.6" height="4.5" fill="#1E3A8A" /> {/* Navy tie */}
        <rect x="8.5" y="12.5" width="1.5" height="1.5" fill="#3B82F6" /> {/* Pocket badge */}

        {/* Arms */}
        {direction === 'left' ? (
          <rect x="7" y="12" width="2" height="4" rx="0.5" fill="#F8FAFC" />
        ) : direction === 'right' ? (
          <rect x="15" y="12" width="2" height="4" rx="0.5" fill="#F8FAFC" />
        ) : (
          <>
            <rect x="6.5" y="12" width="2" height="4" rx="0.5" fill="#F8FAFC" />
            <rect x="15.5" y="12" width="2" height="4" rx="0.5" fill="#F8FAFC" />
            <rect x="6.5" y="15.5" width="2" height="1.5" fill="#FCD34D" /> {/* Hand */}
            <rect x="15.5" y="15.5" width="2" height="1.5" fill="#FCD34D" />
          </>
        )}

        {/* Head / Hair / Hijab */}
        {gender === 'girl_hijab' ? (
          <>
            {/* White/Pastel Blue Hijab */}
            <circle cx="12" cy="7" r="5.5" fill="#E0F2FE" />
            <rect x="7" y="6" width="10" height="4" fill="#E0F2FE" />
            {/* Chibi Face */}
            <rect x="9" y="5.5" width="6" height="4.5" rx="1" fill="#FDE68A" />
            {/* Hijab drapery */}
            <path d="M8 10L12 12.5L16 10V12H8V10Z" fill="#BAE6FD" />
          </>
        ) : gender === 'girl' ? (
          <>
            {/* Girl Ponytail / Brown Hair */}
            <circle cx="12" cy="6.8" r="5" fill="#78350F" />
            <rect x="6.5" y="4" width="11" height="4" fill="#78350F" />
            {/* Ponytail side */}
            <circle cx="17" cy="8" r="2.5" fill="#78350F" />
            <rect x="9" y="5" width="6" height="5" rx="1" fill="#FDE68A" />
          </>
        ) : (
          <>
            {/* Boy Spiky Dark Hair */}
            <rect x="8" y="2.5" width="8" height="4.5" rx="1" fill="#1E293B" />
            <path d="M7 4L8 1.5L10 3.5L12 1L14 3.5L16 1.5L17 4H7Z" fill="#1E293B" />
            <rect x="8.5" y="4.5" width="7" height="5.5" rx="1" fill="#FDE68A" />
          </>
        )}

        {/* Chibi Eyes & Cheeks */}
        {direction !== 'up' && (
          <>
            {direction === 'left' ? (
              <>
                <circle cx="10" cy="7" r="0.9" fill="#0F172A" />
                <rect x="9.5" y="8.2" width="1" height="0.5" fill="#F87171" />
              </>
            ) : direction === 'right' ? (
              <>
                <circle cx="14" cy="7" r="0.9" fill="#0F172A" />
                <rect x="13.5" y="8.2" width="1" height="0.5" fill="#F87171" />
              </>
            ) : (
              <>
                {/* Front Eyes */}
                <circle cx="10.2" cy="7" r="0.9" fill="#0F172A" />
                <circle cx="13.8" cy="7" r="0.9" fill="#0F172A" />
                {/* Sparkling eye highlight */}
                <circle cx="10" cy="6.8" r="0.3" fill="#FFFFFF" />
                <circle cx="13.6" cy="6.8" r="0.3" fill="#FFFFFF" />
                {/* Cheeks */}
                <circle cx="9" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.8" />
                <circle cx="15" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.8" />
                {/* Cute smile */}
                <path d="M11 8.5C11.5 9 12.5 9 13 8.5" stroke="#9A3412" strokeWidth="0.6" strokeLinecap="round" />
              </>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

// Chibi NPC Pixel Art Avatar
export const NPCPixelSprite: React.FC<{
  avatarType: string;
  size?: number;
  className?: string;
  facing?: 'left' | 'right';
  isExcited?: boolean;
}> = ({ avatarType, size = 56, className = '', facing = 'right', isExcited = false }) => {
  const flipStyle = facing === 'left' ? 'scale-x-[-1]' : '';

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center pixelated select-none transition-transform duration-300 ${flipStyle} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Ground Shadow */}
        <ellipse cx="12" cy="22" rx="7.5" ry="2" fill="#0F172A" fillOpacity="0.28" />

        {avatarType === 'counselor' && (
          // Pak Budi: Batik / Formal Counselor Teacher with Clipboard
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />

            {/* Traditional Batik Shirt (Gold & Brown) */}
            <rect x="7.5" y="10.5" width="9" height="7" rx="1" fill="#78350F" />
            <circle cx="12" cy="12.5" r="0.8" fill="#FBBF24" />
            <circle cx="12" cy="15" r="0.8" fill="#FBBF24" />
            <rect x="9" y="12" width="1.2" height="1.2" fill="#D97706" />
            <rect x="13.8" y="12" width="1.2" height="1.2" fill="#D97706" />

            {/* Left Arm holding clipboard */}
            <rect x="5.5" y="11.5" width="2.5" height="4" rx="0.5" fill="#78350F" />
            <rect x="4.5" y="13" width="2.5" height="4" rx="0.5" fill="#D97706" /> {/* Clipboard */}
            <rect x="4.8" y="13.5" width="2" height="3" fill="#FFFBEB" />
            <rect x="5.2" y="12.7" width="1.2" height="0.6" fill="#475569" /> {/* Clip */}
            {/* Right Arm */}
            <rect x="16" y="11.5" width="2" height="4" rx="0.5" fill="#78350F" />
            <circle cx="17" cy="16" r="0.9" fill="#FDE68A" />

            {/* Head & Neck */}
            <rect x="11" y="9.5" width="2" height="1.5" fill="#FDE68A" />
            <rect x="8.5" y="4.5" width="7" height="5.5" rx="1.2" fill="#FDE68A" />
            {/* Hair with grey dignity streaks */}
            <rect x="8" y="2.5" width="8" height="3" rx="0.8" fill="#334155" />
            <rect x="9" y="2" width="3" height="1" fill="#64748B" />

            {/* Glasses */}
            <rect x="9.2" y="5.8" width="2.4" height="1.8" rx="0.4" stroke="#0F172A" strokeWidth="0.6" fill="#F8FAFC" fillOpacity="0.3" />
            <rect x="12.4" y="5.8" width="2.4" height="1.8" rx="0.4" stroke="#0F172A" strokeWidth="0.6" fill="#F8FAFC" fillOpacity="0.3" />
            <circle cx="10.4" cy="6.7" r="0.7" fill="#0F172A" />
            <circle cx="13.6" cy="6.7" r="0.7" fill="#0F172A" />
            <circle cx="10.2" cy="6.5" r="0.25" fill="#FFFFFF" />
            <circle cx="13.4" cy="6.5" r="0.25" fill="#FFFFFF" />

            {/* Warm smile & Cheeks */}
            <circle cx="9" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.6" />
            <circle cx="15" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.6" />
            <path d="M11 8.5C11.5 9.2 12.5 9.2 13 8.5" stroke="#9A3412" strokeWidth="0.6" strokeLinecap="round" />
          </>
        )}

        {avatarType === 'teacher_akl' && (
          // Bu Rina: Emerald Blazer, Mint Hijab & Accounting Ledger
          <>
            <rect x="9" y="17" width="6" height="4" fill="#1E293B" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />

            {/* Dark Green Blazer & Inner Blouse */}
            <rect x="7.5" y="10.5" width="9" height="7" rx="1" fill="#047857" />
            <polygon points="12,11 10.5,14 13.5,14" fill="#F8FAFC" /> {/* Inner collar */}
            <circle cx="12" cy="15" r="0.7" fill="#FCD34D" /> {/* Golden button */}

            {/* Holding Financial Ledger */}
            <rect x="4.8" y="12" width="3" height="4.5" rx="0.5" fill="#065F46" />
            <rect x="5.2" y="12.5" width="2.2" height="3.5" fill="#FEF3C7" />
            <line x1="5.6" y1="13.5" x2="7" y2="13.5" stroke="#047857" strokeWidth="0.5" />
            <line x1="5.6" y1="14.5" x2="7" y2="14.5" stroke="#047857" strokeWidth="0.5" />

            {/* Elegant Hijab */}
            <circle cx="12" cy="7" r="5.6" fill="#34D399" />
            <rect x="7" y="6" width="10" height="4.5" fill="#34D399" />
            <circle cx="8" cy="8" r="0.8" fill="#FBBF24" /> {/* Golden Brooch Pin */}

            {/* Chibi Face */}
            <rect x="9" y="5.5" width="6" height="4.5" rx="1" fill="#FDE68A" />
            {/* Friendly Eyes with lashes */}
            <circle cx="10.2" cy="7.2" r="0.8" fill="#0F172A" />
            <circle cx="13.8" cy="7.2" r="0.8" fill="#0F172A" />
            <circle cx="10" cy="7" r="0.3" fill="#FFFFFF" />
            <circle cx="13.6" cy="7" r="0.3" fill="#FFFFFF" />
            {/* Rosy blush & Smile */}
            <circle cx="9" cy="8.4" r="0.7" fill="#F43F5E" fillOpacity="0.6" />
            <circle cx="15" cy="8.4" r="0.7" fill="#F43F5E" fillOpacity="0.6" />
            <path d="M11 8.8C11.5 9.4 12.5 9.4 13 8.8" stroke="#9A3412" strokeWidth="0.6" strokeLinecap="round" />
          </>
        )}

        {avatarType === 'teacher_auto' && (
          // Pak Darto: Orange/Navy Workshop Wear with Cap & Wrench
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />

            {/* Workshop Orange Overalls */}
            <rect x="7.5" y="10.5" width="9" height="7" rx="1" fill="#EA580C" />
            <rect x="10.5" y="10.5" width="3" height="3" fill="#1E3A8A" /> {/* Navy neck insert */}
            <rect x="8.5" y="13" width="7" height="1.2" fill="#7C2D12" /> {/* Tool belt */}
            <rect x="11.2" y="13" width="1.6" height="1.2" fill="#FBBF24" /> {/* Belt buckle */}

            {/* Holding Mechanic Wrench */}
            <rect x="4.5" y="11" width="1.5" height="6" rx="0.4" fill="#94A3B8" transform="rotate(-20 4.5 11)" />
            <circle cx="4" cy="10.5" r="1.3" stroke="#94A3B8" strokeWidth="0.8" fill="none" />
            <circle cx="6.5" cy="16" r="0.9" fill="#FDE68A" /> {/* Hand */}

            {/* Right Arm */}
            <rect x="16" y="11" width="2" height="4.5" rx="0.5" fill="#EA580C" />
            <circle cx="17" cy="16" r="0.9" fill="#FDE68A" />

            {/* Head & Face */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            {/* Navy Workshop Cap with Visor */}
            <rect x="7" y="1.8" width="10" height="3.5" rx="0.8" fill="#1E3A8A" />
            <rect x="6" y="4.2" width="7" height="1.4" rx="0.4" fill="#1E40AF" /> {/* Visor brim */}
            <circle cx="12" cy="3" r="0.7" fill="#FBBF24" /> {/* Cap badge */}

            {/* Cheerful Determined Eyes */}
            <circle cx="10.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="10.3" cy="6.8" r="0.25" fill="#FFFFFF" />
            <circle cx="13.3" cy="6.8" r="0.25" fill="#FFFFFF" />
            {/* Tiny grease smudge on cheek (authentic mechanic touch!) */}
            <circle cx="9" cy="8.2" r="0.6" fill="#475569" fillOpacity="0.7" />
            <circle cx="15" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.5" />
            <path d="M11 8.6H13" stroke="#9A3412" strokeWidth="0.8" strokeLinecap="round" />
          </>
        )}

        {avatarType === 'teacher_tjkt' && (
          // Pak Andi: Modern Tech Sky-Blue Polo & Glowing Tablet
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />

            {/* Tech Sky-Blue Polo */}
            <rect x="7.5" y="10.5" width="9" height="7" rx="1" fill="#0284C7" />
            <polygon points="12,10.5 10.5,13 13.5,13" fill="#38BDF8" />
            <rect x="11.5" y="13.5" width="1" height="0.8" fill="#F8FAFC" /> {/* Button */}

            {/* Glowing High-Tech Tablet */}
            <rect x="4.8" y="11.5" width="3" height="4.5" rx="0.5" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.5" />
            <rect x="5.2" y="12" width="2.2" height="3.5" fill="#0284C7" />
            <line x1="5.6" y1="13" x2="7" y2="13" stroke="#38BDF8" strokeWidth="0.5" />
            <circle cx="6.3" cy="14.2" r="0.5" fill="#4ADE80" /> {/* Network LED */}
            <circle cx="7.2" cy="15" r="0.8" fill="#FDE68A" /> {/* Holding hand */}

            {/* Right Arm */}
            <rect x="16" y="11" width="2" height="4.5" rx="0.5" fill="#0284C7" />
            <circle cx="17" cy="16" r="0.9" fill="#FDE68A" />

            {/* Head & Stylish Side-part Hair */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            <rect x="8" y="2.2" width="8" height="3.2" rx="0.8" fill="#0F172A" />
            <path d="M7 4L9 2L13 2.5L16 3.5H7Z" fill="#1E293B" />

            {/* Modern Cyan Frame Glasses */}
            <rect x="9.2" y="5.8" width="2.4" height="1.8" rx="0.4" stroke="#0284C7" strokeWidth="0.7" fill="#E0F2FE" fillOpacity="0.4" />
            <rect x="12.4" y="5.8" width="2.4" height="1.8" rx="0.4" stroke="#0284C7" strokeWidth="0.7" fill="#E0F2FE" fillOpacity="0.4" />
            <circle cx="10.4" cy="6.7" r="0.7" fill="#0F172A" />
            <circle cx="13.6" cy="6.7" r="0.7" fill="#0F172A" />
            <circle cx="10.2" cy="6.5" r="0.25" fill="#FFFFFF" />
            <circle cx="13.4" cy="6.5" r="0.25" fill="#FFFFFF" />

            {/* Cheerful Smart Smile */}
            <circle cx="9" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.6" />
            <circle cx="15" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.6" />
            <path d="M11 8.6C11.5 9.2 12.5 9.2 13 8.6" stroke="#9A3412" strokeWidth="0.6" strokeLinecap="round" />
          </>
        )}

        {avatarType === 'coordinator' && (
          // Mr. Hendra: Elegant Career Suit & Leather Portfolio
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#0F172A" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#0F172A" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#020617" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#020617" />

            {/* Sharp Dark Suit & Crisp Red Tie */}
            <rect x="7.5" y="10.5" width="9" height="7" rx="1" fill="#1E293B" />
            <polygon points="12,10.5 10,13 14,13" fill="#F8FAFC" /> {/* White shirt collar */}
            <polygon points="12,11.5 11,14.5 13,14.5" fill="#DC2626" /> {/* Red Tie */}
            <circle cx="12" cy="13.5" r="0.4" fill="#FBBF24" /> {/* Gold tie pin */}

            {/* Executive Briefcase */}
            <rect x="4.5" y="13.5" width="3.2" height="3" rx="0.5" fill="#78350F" />
            <rect x="5.5" y="12.7" width="1.2" height="0.8" stroke="#78350F" strokeWidth="0.6" fill="none" />
            <rect x="5.8" y="14.5" width="0.6" height="0.6" fill="#FBBF24" /> {/* Clasp */}

            {/* Right Arm */}
            <rect x="16" y="11" width="2" height="4.5" rx="0.5" fill="#1E293B" />
            <circle cx="17" cy="16" r="0.9" fill="#FDE68A" />

            {/* Groomed Hair & Confident Features */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            <rect x="8" y="2" width="8" height="3.5" rx="1" fill="#0F172A" />
            <path d="M7.5 3.5L9 2L14 2L16.5 3.5H7.5Z" fill="#1E293B" />

            {/* Eyes */}
            <circle cx="10.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="10.3" cy="6.8" r="0.25" fill="#FFFFFF" />
            <circle cx="13.3" cy="6.8" r="0.25" fill="#FFFFFF" />
            {/* Smile */}
            <circle cx="9" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.5" />
            <circle cx="15" cy="8.2" r="0.6" fill="#F87171" fillOpacity="0.5" />
            <path d="M11 8.6C11.5 9.2 12.5 9.2 13 8.6" stroke="#9A3412" strokeWidth="0.7" strokeLinecap="round" />
          </>
        )}

        {(avatarType === 'student_girl' || avatarType === 'student_boy') && (
          // Student Friend in Vocational Uniform
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="8.5" y="20.5" width="3" height="1.5" fill="#0F172A" />
            <rect x="12.5" y="20.5" width="3" height="1.5" fill="#0F172A" />

            {/* White Vocational Uniform Shirt */}
            <rect x="7.5" y="10.5" width="9" height="7" rx="1" fill="#F8FAFC" />
            <rect x="11.2" y="11" width="1.6" height="4" fill="#1E3A8A" /> {/* Navy tie */}
            <rect x="8.5" y="12" width="1.5" height="1.5" fill="#3B82F6" /> {/* Pocket badge */}

            {/* Waving / Friendly Arm */}
            <rect x="5.5" y="11" width="2" height="4" rx="0.5" fill="#F8FAFC" />
            <circle cx="6.5" cy="15.5" r="0.8" fill="#FDE68A" />
            <rect x="16.5" y="9.5" width="2" height="4" rx="0.5" fill="#F8FAFC" transform="rotate(-30 16.5 9.5)" />
            <circle cx="19" cy="9" r="0.9" fill="#FDE68A" /> {/* Waving hand! */}

            {/* Head / Hair */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            <rect x="8" y="2.5" width="8" height="3" rx="0.8" fill="#78350F" />
            <circle cx="10.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="10.3" cy="6.8" r="0.25" fill="#FFFFFF" />
            <circle cx="13.3" cy="6.8" r="0.25" fill="#FFFFFF" />
            <circle cx="9" cy="8.2" r="0.7" fill="#F43F5E" fillOpacity="0.7" />
            <circle cx="15" cy="8.2" r="0.7" fill="#F43F5E" fillOpacity="0.7" />
            <path d="M11 8.6C11.5 9.2 12.5 9.2 13 8.6" stroke="#9A3412" strokeWidth="0.7" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
};

