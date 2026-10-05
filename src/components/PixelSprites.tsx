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
}> = ({ avatarType, size = 48, className = '' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center pixelated select-none ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="12" cy="22" rx="7" ry="2" fill="#000000" fillOpacity="0.25" />

        {avatarType === 'counselor' && (
          // Pak Budi: Batik / Formal teacher
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#78350F" /> {/* Batik brown */}
            <circle cx="12" cy="14" r="1" fill="#FBBF24" />
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            {/* Hair with grey streaks */}
            <rect x="8" y="2.5" width="8" height="3" fill="#334155" />
            {/* Glasses */}
            <rect x="9.5" y="6" width="2" height="1.5" stroke="#0F172A" strokeWidth="0.5" fill="none" />
            <rect x="12.5" y="6" width="2" height="1.5" stroke="#0F172A" strokeWidth="0.5" fill="none" />
            <circle cx="10.5" cy="6.8" r="0.6" fill="#0F172A" />
            <circle cx="13.5" cy="6.8" r="0.6" fill="#0F172A" />
            <path d="M11.5 8.5C12 9 12.5 9 13 8.5" stroke="#9A3412" strokeWidth="0.5" />
          </>
        )}

        {avatarType === 'teacher_akl' && (
          // Bu Rina: Green/Teal Hijab and Blazer
          <>
            <rect x="9" y="17" width="6" height="4" fill="#1E293B" />
            <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#047857" /> {/* Green blazer */}
            <circle cx="12" cy="7" r="5.5" fill="#6EE7B7" /> {/* Teal Hijab */}
            <rect x="9" y="5.5" width="6" height="4.5" rx="1" fill="#FDE68A" />
            <circle cx="10.2" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.8" cy="7" r="0.8" fill="#0F172A" />
            <path d="M11 8.5C11.5 9 12.5 9 13 8.5" stroke="#9A3412" strokeWidth="0.5" />
          </>
        )}

        {avatarType === 'teacher_auto' && (
          // Pak Darto: Orange/Navy Workshop Wear with Cap
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#1E293B" />
            <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#EA580C" /> {/* Workshop Orange */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            {/* Cap */}
            <rect x="7" y="2" width="10" height="3" fill="#1E3A8A" />
            <rect x="6" y="4" width="6" height="1.2" fill="#1E3A8A" />
            <circle cx="10.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.5" cy="7" r="0.8" fill="#0F172A" />
            <path d="M11 8.5H13" stroke="#9A3412" strokeWidth="0.6" />
          </>
        )}

        {avatarType === 'teacher_tjkt' && (
          // Pak Andi: Blue Polo & Glasses
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#0284C7" /> {/* Sky Blue Polo */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            <rect x="8" y="2.5" width="8" height="3" fill="#1E293B" />
            {/* Glasses */}
            <circle cx="10.5" cy="6.8" r="1.2" stroke="#0284C7" strokeWidth="0.6" fill="none" />
            <circle cx="13.5" cy="6.8" r="1.2" stroke="#0284C7" strokeWidth="0.6" fill="none" />
            <circle cx="10.5" cy="6.8" r="0.6" fill="#0F172A" />
            <circle cx="13.5" cy="6.8" r="0.6" fill="#0F172A" />
            <path d="M11.5 8.5C12 9 12.5 9 13 8.5" stroke="#9A3412" strokeWidth="0.5" />
          </>
        )}

        {avatarType === 'coordinator' && (
          // Mr. Hendra: Elegant Career Suit
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#0F172A" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#0F172A" />
            <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#1E293B" /> {/* Black Suit */}
            <polygon points="12,11 11,14 13,14" fill="#DC2626" /> {/* Red Tie */}
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            <rect x="8" y="2" width="8" height="3.5" rx="1" fill="#0F172A" /> {/* Neat Hair */}
            <circle cx="10.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.5" cy="7" r="0.8" fill="#0F172A" />
            <path d="M11 8.5C11.5 9 12.5 9 13 8.5" stroke="#9A3412" strokeWidth="0.6" />
          </>
        )}

        {(avatarType === 'student_girl' || avatarType === 'student_boy') && (
          // Student friend
          <>
            <rect x="9" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="12.5" y="17" width="2.5" height="4" fill="#334155" />
            <rect x="8" y="11" width="8" height="6.5" rx="1" fill="#F8FAFC" />
            <rect x="11.2" y="11" width="1.6" height="4" fill="#1E3A8A" />
            <rect x="8.5" y="4.5" width="7" height="6" rx="1" fill="#FDE68A" />
            <rect x="8" y="2.5" width="8" height="3" fill="#78350F" />
            <circle cx="10.5" cy="7" r="0.8" fill="#0F172A" />
            <circle cx="13.5" cy="7" r="0.8" fill="#0F172A" />
            <path d="M11 8.5C11.5 9 12.5 9 13 8.5" stroke="#9A3412" strokeWidth="0.6" />
          </>
        )}
      </svg>
    </div>
  );
};
