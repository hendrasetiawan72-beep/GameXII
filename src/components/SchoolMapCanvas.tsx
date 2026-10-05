import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Major, Gender, DayNumber, MapLocation, NPC, ClueItem } from '../types/game';
import { MAP_LOCATIONS, GAME_NPCS, GAME_CLUES } from '../data/gameData';
import { PlayerPixelSprite, NPCPixelSprite } from './PixelSprites';
import { sound } from '../utils/audio';
import { Flame, MessageCircle, FileText, ChevronRight } from 'lucide-react';

interface SchoolMapProps {
  playerGender: Gender;
  playerName: string;
  playerMajor: Major;
  currentDay: DayNumber;
  cluesFound: string[];
  onPlayerMovingChange: (isMoving: boolean) => void;
  onInteractNPC: (npc: NPC) => void;
  onInteractClue: (clue: ClueItem) => void;
  onOpenBrochure: () => void;
  onOpenLetterPuzzle: () => void;
  onOpenMajorChallenge: () => void;
  activeNpcId?: string | null;
}

export const SchoolMapCanvas: React.FC<SchoolMapProps> = ({
  playerGender,
  playerMajor,
  currentDay,
  cluesFound,
  onPlayerMovingChange,
  onInteractNPC,
  onInteractClue,
  onOpenBrochure,
  onOpenLetterPuzzle,
  onOpenMajorChallenge,
  activeNpcId
}) => {
  const [posX, setPosX] = useState(48);
  const [posY, setPosY] = useState(62);
  const [direction, setDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
  const [isMoving, setIsMoving] = useState(false);
  const [nearbyNpc, setNearbyNpc] = useState<NPC | null>(null);
  const [nearbyClue, setNearbyClue] = useState<ClueItem | null>(null);
  const [nearbyObject, setNearbyObject] = useState<{
    id: string;
    label: string;
    action: () => void;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const moveTimerRef = useRef<number | null>(null);
  const stoppedTimerRef = useRef<number | null>(null);
  const targetPosRef = useRef<{ x: number; y: number } | null>(null);

  const currentNpcs = GAME_NPCS.filter(
    (n) => !n.majorSpecific || n.majorSpecific === playerMajor
  );

  const todayClues = GAME_CLUES.filter((c) => c.day === currentDay);

  const checkProximity = useCallback(
    (x: number, y: number) => {
      let foundNpc: NPC | null = null;
      for (const npc of currentNpcs) {
        const dist = Math.hypot(npc.x - x, npc.y - y);
        if (dist < 9) {
          foundNpc = npc;
          break;
        }
      }
      setNearbyNpc(foundNpc);

      let foundClue: ClueItem | null = null;
      for (const clue of todayClues) {
        if (cluesFound.includes(clue.id)) continue;
        const loc = MAP_LOCATIONS.find((l) => l.id === clue.locationId);
        if (loc) {
          const locCenterX = loc.x + loc.width / 2;
          const locCenterY = loc.y + loc.height / 2;
          const dist = Math.hypot(locCenterX - x, locCenterY - y);
          if (dist < 12) {
            foundClue = clue;
            break;
          }
        }
      }
      setNearbyClue(foundClue);

      // Check special objects
      const board = MAP_LOCATIONS.find((l) => l.id === 'announcement_board');
      if (board) {
        const dist = Math.hypot(board.x + board.width / 2 - x, board.y + board.height / 2 - y);
        if (dist < 12 && currentDay >= 2) {
          setNearbyObject({
            id: 'job_board',
            label: 'Read Vacancy Brochure',
            action: onOpenBrochure
          });
          return;
        }
      }

      const library = MAP_LOCATIONS.find((l) => l.id === 'library');
      if (library) {
        const dist = Math.hypot(library.x + library.width / 2 - x, library.y + library.height / 2 - y);
        if (dist < 12 && currentDay >= 3) {
          setNearbyObject({
            id: 'letter_puzzle',
            label: 'Solve Application Letter Puzzle',
            action: onOpenLetterPuzzle
          });
          return;
        }
      }

      const majorLabId =
        playerMajor === 'AKL'
          ? 'akl_lab'
          : playerMajor === 'OTOMOTIF'
          ? 'auto_workshop'
          : 'tjkt_lab';
      const lab = MAP_LOCATIONS.find((l) => l.id === majorLabId);
      if (lab) {
        const dist = Math.hypot(lab.x + lab.width / 2 - x, lab.y + lab.height / 2 - y);
        if (dist < 12 && currentDay >= 4) {
          setNearbyObject({
            id: 'major_challenge',
            label: `${playerMajor} Practical Challenge`,
            action: onOpenMajorChallenge
          });
          return;
        }
      }

      setNearbyObject(null);
    },
    [currentNpcs, todayClues, cluesFound, currentDay, playerMajor, onOpenBrochure, onOpenLetterPuzzle, onOpenMajorChallenge]
  );

  const moveBy = useCallback(
    (dx: number, dy: number, newDir: 'down' | 'up' | 'left' | 'right') => {
      setDirection(newDir);
      setIsMoving(true);
      onPlayerMovingChange(true);
      sound.playStep();

      if (stoppedTimerRef.current) {
        clearTimeout(stoppedTimerRef.current);
      }

      setPosX((prevX) => {
        const nextX = Math.max(8, Math.min(92, prevX + dx));
        setPosY((prevY) => {
          const nextY = Math.max(14, Math.min(88, prevY + dy));
          checkProximity(nextX, nextY);
          return nextY;
        });
        return nextX;
      });

      stoppedTimerRef.current = window.setTimeout(() => {
        setIsMoving(false);
        onPlayerMovingChange(false);
      }, 240);
    },
    [checkProximity, onPlayerMovingChange]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const step = 2.5;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          moveBy(0, -step, 'up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          moveBy(0, step, 'down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          moveBy(-step, 0, 'left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          moveBy(step, 0, 'right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveBy]);

  // Touch Swipe Gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartRef.current.x;
    const deltaY = currentY - touchStartRef.current.y;

    const threshold = 18;
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      const step = 3;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveBy(step, 0, 'right');
        } else {
          moveBy(-step, 0, 'left');
        }
      } else {
        if (deltaY > 0) {
          moveBy(0, step, 'down');
        } else {
          moveBy(0, -step, 'up');
        }
      }
      touchStartRef.current = { x: currentX, y: currentY };
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  // Tap-to-move
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    targetPosRef.current = { x: clickX, y: clickY };

    const dx = clickX - posX;
    const dy = clickY - posY;
    const dist = Math.hypot(dx, dy);

    if (dist > 2) {
      const newDir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
          ? 'down'
          : 'up';

      const stepMagnitude = Math.min(dist, 4.5);
      const stepX = (dx / dist) * stepMagnitude;
      const stepY = (dy / dist) * stepMagnitude;
      moveBy(stepX, stepY, newDir);
    }
  };

  useEffect(() => {
    checkProximity(posX, posY);
  }, [checkProximity, posX, posY]);

  useEffect(() => {
    return () => {
      if (moveTimerRef.current) clearInterval(moveTimerRef.current);
      if (stoppedTimerRef.current) clearTimeout(stoppedTimerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-[88vh] sm:h-[90vh] bg-amber-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
      {/* 2D Pixel Map Outer Container with neat rounded corners */}
      <div
        ref={containerRef}
        onClick={handleMapClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-4xl h-full bg-[#E2F0D9] border-2 sm:border-3 border-slate-900 rounded-3xl shadow-[5px_5px_0px_0px_#0F172A] overflow-hidden cursor-crosshair"
        style={{
          backgroundImage: `
            radial-gradient(#C3E6CB 15%, transparent 16%),
            radial-gradient(#B2DFDB 15%, transparent 16%)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      >
        {/* Cobblestone paths connecting areas */}
        <div className="absolute top-[28%] bottom-[28%] left-[46%] w-[8%] bg-[#E5D7B7] border-x-2 border-[#B89F70] pointer-events-none rounded-sm" />
        <div className="absolute top-[48%] left-[20%] right-[20%] h-[8%] bg-[#E5D7B7] border-y-2 border-[#B89F70] pointer-events-none rounded-sm" />
        <div className="absolute top-[72%] bottom-[12%] left-[46%] w-[8%] bg-[#E5D7B7] border-x-2 border-[#B89F70] pointer-events-none rounded-sm" />

        {/* School Locations / Building Footprints with rounded-xl */}
        {MAP_LOCATIONS.map((loc) => {
          const isRelevantToMajor = !loc.allowedMajors || loc.allowedMajors.includes(playerMajor);
          const hasClueHere = todayClues.some(
            (c) => c.locationId === loc.id && !cluesFound.includes(c.id)
          );

          return (
            <div
              key={loc.id}
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                width: `${loc.width}%`,
                height: `${loc.height}%`,
                backgroundColor: loc.color
              }}
              className={`absolute border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_0px_#0F172A] p-1 flex flex-col justify-between transition-all pointer-events-auto ${
                !isRelevantToMajor ? 'opacity-40 filter grayscale' : ''
              } ${hasClueHere ? 'ring-2 ring-amber-400 ring-offset-1 animate-pulse' : ''}`}
            >
              <div className="w-full h-1.5 bg-slate-900/20 mb-0.5 rounded-t-sm border-b border-slate-900/40" />

              <div className="flex-1 flex flex-col justify-center items-center text-center px-0.5">
                <span className="font-pixel text-[8px] sm:text-[10px] font-bold text-slate-900 leading-tight block">
                  {loc.shortName}
                </span>
              </div>

              {hasClueHere && (
                <div className="absolute -top-2.5 -right-2.5 bg-amber-400 border border-slate-900 rounded-full p-1 shadow-[1px_1px_0px_0px_#000] animate-bounce">
                  <Flame className="w-3 h-3 text-orange-600 fill-orange-500" />
                </div>
              )}
            </div>
          );
        })}

        {/* Courtyard Center Flagpole */}
        <div className="absolute left-[48%] top-[45%] pointer-events-none flex flex-col items-center">
          <div className="w-1.5 h-7 bg-slate-700 rounded-t-sm" />
          <div className="w-4 h-2.5 bg-red-600 border border-slate-900 -mt-7 ml-3 flex flex-col">
            <div className="w-full h-1/2 bg-red-600" />
            <div className="w-full h-1/2 bg-white" />
          </div>
          <div className="w-5 h-2 bg-slate-800 rounded-sm mt-4 shadow-sm" />
        </div>

        {/* NPCs Standing on the Map */}
        {currentNpcs.map((npc) => {
          const isNearby = nearbyNpc?.id === npc.id;
          const isActive = activeNpcId === npc.id;

          return (
            <div
              key={npc.id}
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onInteractNPC(npc);
              }}
              style={{
                left: `${npc.x}%`,
                top: `${npc.y}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform active:scale-95"
            >
              <div
                className={`absolute -top-7 left-1/2 -translate-x-1/2 bg-white border border-slate-900 rounded-lg px-2 py-0.5 shadow-[1px_1px_0px_0px_#000] flex items-center gap-1 whitespace-nowrap z-20 ${
                  isNearby || isActive ? 'scale-110 bg-amber-200 animate-bounce' : 'opacity-85'
                }`}
              >
                <MessageCircle className="w-2.5 h-2.5 text-slate-800" />
                <span className="font-pixel text-[8px] text-slate-900">{npc.name}</span>
              </div>

              <NPCPixelSprite avatarType={npc.avatarType} size={38} />
            </div>
          );
        })}

        {/* Player Character */}
        <div
          style={{
            left: `${posX}%`,
            top: `${posY}%`
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-100 ease-linear pointer-events-none"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-pixel text-[8px] px-2 py-0.5 rounded-md whitespace-nowrap border border-amber-300 shadow-[1px_1px_0px_0px_#000]">
            {playerMajor}
          </div>
          <PlayerPixelSprite
            gender={playerGender}
            direction={direction}
            isMoving={isMoving}
            size={42}
          />
        </div>

        {/* Floating Natural Interaction Hint (Bottom Floating Overlay) */}
        {(nearbyNpc || nearbyClue || nearbyObject) && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-md z-30 animate-fade-in pointer-events-auto">
            <div className="p-3 border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_0px_#0F172A] bg-amber-100/95 backdrop-blur-xs">
              {/* NPC Interaction Prompt */}
              {nearbyNpc && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-amber-800 shrink-0" />
                    <div>
                      <p className="font-pixel text-[10px] text-slate-900 font-bold">
                        Talk with {nearbyNpc.name} ({nearbyNpc.role})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onInteractNPC(nearbyNpc);
                    }}
                    className="pixel-btn bg-amber-400 px-3 py-1.5 text-[10px] font-pixel shrink-0 flex items-center gap-1 cursor-pointer rounded-xl"
                  >
                    <span>TALK</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Clue Prompt */}
              {!nearbyNpc && nearbyClue && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-pulse shrink-0" />
                    <div>
                      <p className="font-pixel text-[10px] text-slate-900 font-bold">
                        {nearbyClue.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClueFound();
                      onInteractClue(nearbyClue);
                    }}
                    className="pixel-btn bg-emerald-400 text-slate-900 px-3 py-1.5 text-[10px] font-pixel shrink-0 flex items-center gap-1 cursor-pointer rounded-xl"
                  >
                    <span>INSPECT</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Special Object Prompt */}
              {!nearbyNpc && !nearbyClue && nearbyObject && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-sky-700 shrink-0" />
                    <div>
                      <p className="font-pixel text-[10px] text-slate-900 font-bold">
                        {nearbyObject.label}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      nearbyObject.action();
                    }}
                    className="pixel-btn bg-sky-400 text-slate-900 px-3 py-1.5 text-[10px] font-pixel shrink-0 flex items-center gap-1 cursor-pointer rounded-xl"
                  >
                    <span>OPEN</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile / Desktop Guide */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none hidden sm:block">
          <div className="bg-slate-900/80 text-white font-pixel text-[8px] px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-sm">
            DESKTOP: WASD / ARROWS · MOBILE: SWIPE / TAP TO WALK
          </div>
        </div>
      </div>
    </div>
  );
};
