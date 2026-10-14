import { Gender, Major } from '../types/game';

interface SpriteProps {
  gender?: Gender;
  direction?: 'down' | 'up' | 'left' | 'right';
  isMoving?: boolean;
  className?: string;
  size?: number;
  major?: Major;
  isExcited?: boolean;
}

// Ultra-Detailed & Expressive Chibi Player Pixel Art Sprite
export const PlayerPixelSprite: React.FC<SpriteProps> = ({
  gender = 'boy',
  direction = 'down',
  isMoving = false,
  className = '',
  size = 56,
  major = 'AKL',
  isExcited = false
}) => {
  // Flip sprite horizontally when facing left
  const isFacingLeft = direction === 'left';
  const flipClass = isFacingLeft ? 'scale-x-[-1]' : '';

  // Dynamic Walk Bobbing
  const movementClass = isMoving
    ? 'animate-player-walk'
    : isExcited
    ? 'animate-npc-jump'
    : 'animate-npc-breathe';

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center pixelated select-none pointer-events-none transition-transform duration-150 ${flipClass} ${movementClass} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Ground Shadow */}
        <ellipse cx="12" cy="22.2" rx="7.5" ry="2" fill="#0F172A" fillOpacity="0.32" />

        {/* --------------------------------------------- */}
        {/* DIRECTION: BACK VIEW (FACING UP)              */}
        {/* --------------------------------------------- */}
        {direction === 'up' && (
          <>
            {/* Legs / Indonesian Vocational Dark Grey Trousers/Skirt */}
            {isMoving ? (
              <>
                {/* Stepping walk cycle */}
                <rect x="8.5" y="16.5" width="2.8" height="4.5" fill="#1E293B" />
                <rect x="12.7" y="17.5" width="2.8" height="3.5" fill="#1E293B" />
                {/* Sneakers back heels & white rubber soles */}
                <rect x="8" y="20.2" width="3.5" height="1.8" rx="0.5" fill="#0F172A" />
                <rect x="8" y="21.4" width="3.5" height="0.6" fill="#F8FAFC" />
                <rect x="12.5" y="20.6" width="3.2" height="1.6" rx="0.5" fill="#0F172A" />
                <rect x="12.5" y="21.6" width="3.2" height="0.6" fill="#F8FAFC" />
              </>
            ) : (
              <>
                <rect x="9" y="17" width="2.6" height="4" fill="#1E293B" />
                <rect x="12.4" y="17" width="2.6" height="4" fill="#1E293B" />
                {/* Shoes */}
                <rect x="8.5" y="20.5" width="3.2" height="1.8" rx="0.5" fill="#0F172A" />
                <rect x="8.5" y="21.6" width="3.2" height="0.7" fill="#F8FAFC" />
                <rect x="12.3" y="20.5" width="3.2" height="1.8" rx="0.5" fill="#0F172A" />
                <rect x="12.3" y="21.6" width="3.2" height="0.7" fill="#F8FAFC" />
              </>
            )}

            {/* School Shirt Back & Collar */}
            <rect x="7.5" y="10.8" width="9" height="6.6" rx="1.2" fill="#FFFFFF" />
            <rect x="10.5" y="9.8" width="3" height="1.5" fill="#E2E8F0" /> {/* Collar back */}

            {/* Arms Back */}
            <rect x="6" y="11.5" width="2.2" height="4" rx="0.6" fill="#FFFFFF" />
            <rect x="15.8" y="11.5" width="2.2" height="4" rx="0.6" fill="#FFFFFF" />
            <circle cx="7.1" cy="15.8" r="0.9" fill="#FDE68A" />
            <circle cx="16.9" cy="15.8" r="0.9" fill="#FDE68A" />

            {/* High School Backpack on Back */}
            <rect x="8.5" y="11.5" width="7" height="6" rx="1.5" fill="#0284C7" />
            <rect x="9.5" y="12" width="5" height="1.8" rx="0.6" fill="#0369A1" />
            <rect x="9.5" y="14.5" width="5" height="2.2" rx="0.8" fill="#38BDF8" />
            {/* Zipper details */}
            <line x1="9.5" y1="14.2" x2="14.5" y2="14.2" stroke="#CBD5E1" strokeWidth="0.6" strokeDasharray="0.8,0.5" />
            <rect x="11.6" y="10.8" width="0.8" height="1" fill="#0369A1" /> {/* Backpack handle */}

            {/* Major-themed Bag Keychain */}
            {major === 'AKL' && (
              <circle cx="15.5" cy="15.5" r="1.1" fill="#F59E0B" stroke="#B45309" strokeWidth="0.4" />
            )}
            {major === 'OTOMOTIF' && (
              <rect x="15" y="14.8" width="1.6" height="1.6" rx="0.4" fill="#F97316" stroke="#C2410C" strokeWidth="0.4" />
            )}
            {major === 'TJKT' && (
              <rect x="15.2" y="14.5" width="1.2" height="2" rx="0.3" fill="#06B6D4" stroke="#0891B2" strokeWidth="0.4" />
            )}

            {/* Back of Head / Hair / Hijab */}
            {gender === 'girl_hijab' ? (
              <>
                {/* Elegant White Hijab from behind */}
                <circle cx="12" cy="7" r="5.6" fill="#F8FAFC" />
                <path d="M6.8 7C6.8 10.5 8.5 12.5 12 12.5C15.5 12.5 17.2 10.5 17.2 7H6.8Z" fill="#F8FAFC" />
                <path d="M8.5 8C9.5 11 11 12 12 12C13 12 14.5 11 15.5 8" stroke="#BAE6FD" strokeWidth="0.8" strokeLinecap="round" />
                <circle cx="16.2" cy="6.8" r="0.9" fill="#10B981" /> {/* Side brooch sparkle */}
                <circle cx="16.2" cy="6.8" r="0.4" fill="#FDE68A" />
              </>
            ) : gender === 'girl' ? (
              <>
                {/* Girl Hair from Behind with Ponytail & Bow */}
                <circle cx="12" cy="6.5" r="5.2" fill="#78350F" />
                <rect x="7" y="4.5" width="10" height="5" rx="2" fill="#78350F" />
                {/* High Ponytail */}
                <circle cx="12" cy="4" r="2.8" fill="#5A260C" />
                <rect x="10.8" y="4.8" width="2.4" height="4.5" rx="1.2" fill="#78350F" />
                {/* Red Ribbon Hair Bow */}
                <circle cx="12" cy="4.2" r="1.1" fill="#EF4444" />
                <polygon points="10,3.5 12,4.2 10,5" fill="#EF4444" />
                <polygon points="14,3.5 12,4.2 14,5" fill="#EF4444" />
                <circle cx="12" cy="4.2" r="0.4" fill="#FDE68A" />
              </>
            ) : (
              <>
                {/* Boy Spiky Hair from Behind */}
                <circle cx="12" cy="6.6" r="5.2" fill="#0F172A" />
                <path d="M7 6L8 2L10 4L12 1.5L14 4L16 2L17 6H7Z" fill="#0F172A" />
                {/* Textured Hair Highlights */}
                <path d="M9 3.5L10 4.8L12 2.8L14 4.8L15 3.5" stroke="#334155" strokeWidth="0.8" strokeLinecap="round" />
                <rect x="10.5" y="8.5" width="3" height="2" fill="#FDE68A" /> {/* Neck nape */}
              </>
            )}
          </>
        )}

        {/* --------------------------------------------- */}
        {/* DIRECTION: SIDE VIEW (LEFT OR RIGHT)          */}
        {/* --------------------------------------------- */}
        {(direction === 'left' || direction === 'right') && (
          <>
            {/* Dynamic Stepping Legs */}
            {isMoving ? (
              <>
                {/* Front Leg Stride */}
                <rect x="12" y="16.5" width="3" height="4.5" rx="0.5" fill="#1E293B" transform="rotate(-15 12 16.5)" />
                <rect x="13.2" y="20.2" width="3.4" height="1.8" rx="0.6" fill="#0F172A" />
                <rect x="13.2" y="21.3" width="3.4" height="0.7" fill="#F8FAFC" />
                {/* Back Leg Push-off */}
                <rect x="9.5" y="16.8" width="2.8" height="4" rx="0.5" fill="#334155" transform="rotate(20 9.5 16.8)" />
                <rect x="7.8" y="20.5" width="3.2" height="1.6" rx="0.6" fill="#0F172A" />
                <rect x="7.8" y="21.4" width="3.2" height="0.7" fill="#F8FAFC" />
              </>
            ) : (
              <>
                <rect x="10.5" y="17" width="3" height="4" rx="0.5" fill="#1E293B" />
                <rect x="10" y="20.5" width="3.6" height="1.8" rx="0.6" fill="#0F172A" />
                <rect x="10" y="21.5" width="3.6" height="0.7" fill="#F8FAFC" />
                {/* White shoelace accent */}
                <circle cx="11.8" cy="20.8" r="0.4" fill="#FFFFFF" />
              </>
            )}

            {/* Backpack on Back (Side Profile) */}
            <rect x="5.5" y="11.2" width="4" height="6.2" rx="1.4" fill="#0284C7" />
            <rect x="5" y="13" width="1.8" height="3" rx="0.6" fill="#38BDF8" />
            {/* Major charm hanging on backpack */}
            <circle cx="4.8" cy="15.5" r="0.9" fill={major === 'AKL' ? '#F59E0B' : major === 'OTOMOTIF' ? '#F97316' : '#06B6D4'} />

            {/* School Uniform Torso (Side) */}
            <rect x="8.5" y="10.8" width="6.5" height="6.6" rx="1.2" fill="#FFFFFF" />
            <rect x="12.8" y="11.5" width="1.4" height="4" fill="#1E3A8A" /> {/* Side Tie */}
            <rect x="10" y="16.5" width="5" height="1" fill="#0F172A" /> {/* Belt */}

            {/* Swinging Arm */}
            {isMoving ? (
              <rect x="9.5" y="11.8" width="2.5" height="4" rx="0.8" fill="#FFFFFF" transform="rotate(22 9.5 11.8)" />
            ) : (
              <rect x="10.5" y="11.8" width="2.4" height="4" rx="0.8" fill="#FFFFFF" />
            )}
            <circle cx={isMoving ? 13 : 11.7} cy={isMoving ? 16.2 : 16.2} r="1" fill="#FDE68A" />

            {/* Head Side Profile */}
            {gender === 'girl_hijab' ? (
              <>
                <circle cx="12" cy="7" r="5.4" fill="#F8FAFC" />
                {/* Hijab side fold & forehead reveal */}
                <rect x="10" y="5.2" width="5.5" height="4.5" rx="1" fill="#FDE68A" />
                <path d="M7 6C7 10 9 12 12.5 12C14.5 12 15.5 11 16 9" stroke="#BAE6FD" strokeWidth="0.8" strokeLinecap="round" />
                <circle cx="11" cy="5" r="0.9" fill="#10B981" /> {/* Brooch */}
              </>
            ) : gender === 'girl' ? (
              <>
                <circle cx="11.5" cy="6.8" r="5.2" fill="#78350F" />
                {/* Side Face */}
                <rect x="10.5" y="5.2" width="5" height="4.6" rx="1" fill="#FDE68A" />
                {/* Ponytail extending back */}
                <circle cx="6" cy="6.5" r="2.6" fill="#78350F" />
                <circle cx="7.5" cy="6.2" r="1.1" fill="#EF4444" /> {/* Red Ribbon */}
              </>
            ) : (
              <>
                <circle cx="11.5" cy="6.6" r="5.2" fill="#0F172A" />
                <path d="M8 3.5L10 1.5L12 3L14 1.5L16 4H8Z" fill="#0F172A" />
                {/* Side Face */}
                <rect x="10.5" y="5.2" width="5" height="4.6" rx="1" fill="#FDE68A" />
              </>
            )}

            {/* Expressive Side Eye & Blush */}
            <ellipse cx="14" cy="7" rx="1.1" ry="1.3" fill="#0F172A" />
            <circle cx="13.7" cy="6.6" r="0.45" fill="#FFFFFF" /> {/* Eye spark */}
            <circle cx="14.3" cy="7.4" r="0.2" fill="#38BDF8" /> {/* Iris twinkle */}
            <circle cx="13.2" cy="8.4" r="0.8" fill="#FB7185" fillOpacity="0.8" /> {/* Blush */}
            <path d="M14.5 8.7C14.8 9 15.3 9 15.5 8.8" stroke="#9A3412" strokeWidth="0.6" strokeLinecap="round" />
          </>
        )}

        {/* --------------------------------------------- */}
        {/* DIRECTION: FRONT VIEW (FACING DOWN) - DEFAULT */}
        {/* --------------------------------------------- */}
        {direction === 'down' && (
          <>
            {/* Legs & High-School Sneakers */}
            {isMoving ? (
              <>
                {/* Dynamic walking steps */}
                <rect x="8.5" y="16.5" width="2.8" height="4.5" rx="0.5" fill="#1E293B" />
                <rect x="12.7" y="17.2" width="2.8" height="3.8" rx="0.5" fill="#334155" />
                {/* Left Shoe Stepping */}
                <rect x="8" y="20.2" width="3.6" height="2" rx="0.6" fill="#0F172A" />
                <rect x="8" y="21.4" width="3.6" height="0.8" rx="0.3" fill="#F8FAFC" />
                <circle cx="9.8" cy="20.8" r="0.35" fill="#FFFFFF" />
                {/* Right Shoe */}
                <rect x="12.5" y="20.5" width="3.4" height="1.8" rx="0.6" fill="#0F172A" />
                <rect x="12.5" y="21.5" width="3.4" height="0.8" rx="0.3" fill="#F8FAFC" />
                <circle cx="14.2" cy="21" r="0.35" fill="#FFFFFF" />
              </>
            ) : (
              <>
                <rect x="9" y="17" width="2.6" height="4" rx="0.5" fill="#1E293B" />
                <rect x="12.4" y="17" width="2.6" height="4" rx="0.5" fill="#1E293B" />
                {/* Crisp School Sneakers */}
                <rect x="8.5" y="20.4" width="3.3" height="1.9" rx="0.6" fill="#0F172A" />
                <rect x="8.5" y="21.5" width="3.3" height="0.8" rx="0.3" fill="#F8FAFC" />
                <circle cx="10.1" cy="21" r="0.4" fill="#FFFFFF" />
                <rect x="12.2" y="20.4" width="3.3" height="1.9" rx="0.6" fill="#0F172A" />
                <rect x="12.2" y="21.5" width="3.3" height="0.8" rx="0.3" fill="#F8FAFC" />
                <circle cx="13.8" cy="21" r="0.4" fill="#FFFFFF" />
              </>
            )}

            {/* School Uniform Torso (Crisp White Shirt) */}
            <rect x="7.8" y="10.8" width="8.4" height="6.6" rx="1.2" fill="#FFFFFF" />
            {/* White Collar Tips */}
            <polygon points="10,11 12,13 11,11" fill="#E2E8F0" />
            <polygon points="14,11 12,13 13,11" fill="#E2E8F0" />

            {/* Official Muhammadiyah Emblem on Pocket (Left Chest) */}
            <rect x="8.3" y="12.2" width="1.6" height="1.8" rx="0.3" fill="#15803D" />
            <circle cx="9.1" cy="13" r="0.5" fill="#F59E0B" /> {/* Golden radiant sun badge */}
            <rect x="8.5" y="11.8" width="0.4" height="0.8" fill="#0284C7" /> {/* Blue pen clip */}

            {/* Official Navy Blue School Necktie with Golden Clip */}
            <rect x="11.3" y="11.4" width="1.4" height="4.5" fill="#1E3A8A" />
            <polygon points="11.3,15.9 12,16.8 12.7,15.9" fill="#1E3A8A" />
            <rect x="11.1" y="13.2" width="1.8" height="0.6" fill="#EAB308" /> {/* Golden tie clip */}

            {/* School Belt with Metallic Buckle */}
            <rect x="8.2" y="16.5" width="7.6" height="1" fill="#0F172A" />
            <rect x="11.3" y="16.3" width="1.4" height="1.4" rx="0.3" fill="#CBD5E1" stroke="#475569" strokeWidth="0.3" />

            {/* Backpack Straps over Shoulders */}
            <rect x="7.3" y="11.2" width="1.1" height="5.2" rx="0.4" fill="#0369A1" />
            <rect x="7.1" y="14" width="1.5" height="0.6" fill="#94A3B8" /> {/* Buckle */}
            <rect x="15.6" y="11.2" width="1.1" height="5.2" rx="0.4" fill="#0369A1" />
            <rect x="15.4" y="14" width="1.5" height="0.6" fill="#94A3B8" />

            {/* Arms & Hands with Natural Walk Sway */}
            {isMoving ? (
              <>
                <rect x="6.2" y="11.2" width="2" height="4" rx="0.6" fill="#FFFFFF" transform="rotate(10 6.2 11.2)" />
                <circle cx="7" cy="15.8" r="0.9" fill="#FDE68A" />
                <rect x="15.8" y="11.8" width="2" height="4" rx="0.6" fill="#FFFFFF" transform="rotate(-10 15.8 11.8)" />
                <circle cx="17" cy="16.2" r="0.9" fill="#FDE68A" />
              </>
            ) : (
              <>
                <rect x="6.2" y="11.5" width="2" height="4" rx="0.6" fill="#FFFFFF" />
                <circle cx="7.2" cy="16" r="0.9" fill="#FDE68A" />
                <rect x="15.8" y="11.5" width="2" height="4" rx="0.6" fill="#FFFFFF" />
                <circle cx="16.8" cy="16" r="0.9" fill="#FDE68A" />
              </>
            )}

            {/* Head / Hair / Hijab */}
            {gender === 'girl_hijab' ? (
              <>
                {/* Elegant White Hijab Base */}
                <circle cx="12" cy="7" r="5.6" fill="#F8FAFC" />
                <rect x="6.8" y="6" width="10.4" height="4.5" fill="#F8FAFC" />
                {/* Chibi Face inside Hijab */}
                <rect x="8.8" y="5.2" width="6.4" height="5" rx="1.4" fill="#FDE68A" />
                {/* Hijab Drapes & Folds */}
                <path d="M7 10L12 12.8L17 10V12H7V10Z" fill="#E2E8F0" />
                <path d="M9 10.5L12 12L15 10.5" stroke="#BAE6FD" strokeWidth="0.8" strokeLinecap="round" />
                {/* Radiant Green & Gold Flower Brooch */}
                <circle cx="16.4" cy="6.2" r="1.1" fill="#10B981" />
                <circle cx="16.4" cy="6.2" r="0.5" fill="#F59E0B" />
              </>
            ) : gender === 'girl' ? (
              <>
                {/* Twin-Tails or Sleek Hair with Red Ribbons */}
                <circle cx="12" cy="6.6" r="5.2" fill="#78350F" />
                <rect x="6.5" y="4" width="11" height="4.5" rx="1.5" fill="#78350F" />
                {/* Hair Highlights */}
                <path d="M8 3.5C10 2.5 14 2.5 16 3.5" stroke="#D97706" strokeWidth="0.8" strokeLinecap="round" />
                {/* Twin Side Tails with Bows */}
                <circle cx="6" cy="6.5" r="2.2" fill="#78350F" />
                <circle cx="6" cy="5.8" r="1.1" fill="#EF4444" /> {/* Left Ribbon */}
                <circle cx="18" cy="6.5" r="2.2" fill="#78350F" />
                <circle cx="18" cy="5.8" r="1.1" fill="#EF4444" /> {/* Right Ribbon */}
                {/* Chibi Face */}
                <rect x="8.5" y="4.8" width="7" height="5.4" rx="1.4" fill="#FDE68A" />
                {/* Forehead Bangs */}
                <path d="M8.5 4.8C9.5 6.2 11 5 12 6.2C13 5 14.5 6.2 15.5 4.8" fill="#78350F" />
              </>
            ) : (
              <>
                {/* Boy Spiky Hair with Shine */}
                <rect x="7.8" y="2.2" width="8.4" height="4.8" rx="1.2" fill="#0F172A" />
                <path d="M6.8 4L8 1.5L10 3.2L12 1L14 3.2L16 1.5L17.2 4H6.8Z" fill="#0F172A" />
                {/* Cool Metallic Hair Highlights */}
                <path d="M8.8 3L10 2L11.5 3" stroke="#64748B" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M12.5 2.5L14 1.8L15 2.8" stroke="#64748B" strokeWidth="0.8" strokeLinecap="round" />
                {/* Chibi Face */}
                <rect x="8.3" y="4.6" width="7.4" height="5.6" rx="1.4" fill="#FDE68A" />
                {/* Forehead Side Bangs */}
                <polygon points="8.5,4.6 10,6.5 10.5,4.6" fill="#0F172A" />
                <polygon points="15.5,4.6 14,6.2 13.5,4.6" fill="#0F172A" />
              </>
            )}

            {/* Expressive Chibi Eyes, Sparkling Highlights, Cheeks & Smile */}
            {/* Confident Eyebrows */}
            <line x1="9.2" y1="5.6" x2="11" y2="5.8" stroke={gender === 'girl' ? '#78350F' : '#0F172A'} strokeWidth="0.6" strokeLinecap="round" />
            <line x1="14.8" y1="5.6" x2="13" y2="5.8" stroke={gender === 'girl' ? '#78350F' : '#0F172A'} strokeWidth="0.6" strokeLinecap="round" />

            {/* Anime Eyes */}
            <ellipse cx="10" cy="7.2" rx="1.1" ry="1.3" fill="#0F172A" />
            <ellipse cx="14" cy="7.2" rx="1.1" ry="1.3" fill="#0F172A" />
            {/* Iris Inner Accent */}
            <circle cx="10" cy="7.4" r="0.6" fill="#1E3A8A" />
            <circle cx="14" cy="7.4" r="0.6" fill="#1E3A8A" />
            {/* Primary Sparkling Reflection */}
            <circle cx="9.7" cy="6.8" r="0.45" fill="#FFFFFF" />
            <circle cx="13.7" cy="6.8" r="0.45" fill="#FFFFFF" />
            {/* Secondary Tiny Twinkle */}
            <circle cx="10.3" cy="7.6" r="0.2" fill="#FFFFFF" />
            <circle cx="14.3" cy="7.6" r="0.2" fill="#FFFFFF" />

            {/* Rosy Glowing Blush Cheeks */}
            <circle cx="8.6" cy="8.4" r="0.8" fill="#FB7185" fillOpacity="0.85" />
            <circle cx="15.4" cy="8.4" r="0.8" fill="#FB7185" fillOpacity="0.85" />
            <circle cx="8.5" cy="8.2" r="0.25" fill="#FFFFFF" />
            <circle cx="15.3" cy="8.2" r="0.25" fill="#FFFFFF" />

            {/* Expressive Mouth */}
            {isMoving || isExcited ? (
              // Open cheerful happy cheer
              <path d="M11 8.6C11.5 9.8 12.5 9.8 13 8.6Z" fill="#BE123C" stroke="#9A3412" strokeWidth="0.4" />
            ) : (
              // Sweet confident smile
              <path d="M11 8.8C11.5 9.5 12.5 9.5 13 8.8" stroke="#9A3412" strokeWidth="0.7" strokeLinecap="round" />
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

