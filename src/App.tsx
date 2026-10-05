import React, { useState, useEffect } from 'react';
import {
  GameScene,
  Major,
  DayNumber,
  PlayerState,
  NPC,
  ClueItem
} from './types/game';
import { GAME_CLUES } from './data/gameData';
import { TitleScreen } from './components/TitleScreen';
import { CustomizeModal } from './components/CustomizeModal';
import { OpeningStoryModal } from './components/OpeningStoryModal';
import { ChooseMajorModal } from './components/ChooseMajorModal';
import { SchoolMapCanvas } from './components/SchoolMapCanvas';
import { HeaderHUD } from './components/HeaderHUD';
import { DialogueModal } from './components/DialogueModal';
import { BrochureModal } from './components/BrochureModal';
import { LetterPuzzleModal } from './components/LetterPuzzleModal';
import { MajorChallengeModal } from './components/MajorChallengeModal';
import { DailyQuizModal } from './components/DailyQuizModal';
import { PlotTwistModal } from './components/PlotTwistModal';
import { Web3FormSection } from './components/Web3FormSection';
import { CluesModal } from './components/CluesModal';
import { HelpModal } from './components/HelpModal';
import { sound } from './utils/audio';

const createInitialPlayerState = (): PlayerState => ({
  name: 'Raka Pratama',
  gender: 'boy',
  major: 'AKL',
  x: 48,
  y: 62,
  targetX: 48,
  targetY: 62,
  direction: 'down',
  isMoving: false,
  currentDay: 1,
  cluesFound: [],
  puzzlesCompleted: [],
  challengesCompleted: [],
  daysCompleted: [],
  scores: {
    clues: 0,
    puzzles: 0,
    dialogue: 0,
    quiz: 0,
    englishScore: 0,
    letterScore: 0,
    problemSolvingScore: 0,
    careerScore: 0,
    totalScore: 0
  }
});

export default function App() {
  const [scene, setScene] = useState<GameScene>('TITLE');
  const [player, setPlayer] = useState<PlayerState>(createInitialPlayerState());

  // Active Interactive Overlays
  const [activeNpc, setActiveNpc] = useState<NPC | null>(null);
  const [showBrochure, setShowBrochure] = useState(false);
  const [showLetterPuzzle, setShowLetterPuzzle] = useState(false);
  const [showMajorChallenge, setShowMajorChallenge] = useState(false);
  const [showDailyQuiz, setShowDailyQuiz] = useState(false);
  const [showPlotTwist, setShowPlotTwist] = useState(false);
  const [showCluesList, setShowCluesList] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [clueNotification, setClueNotification] = useState<string | null>(null);

  const addScore = (type: 'clues' | 'puzzles' | 'dialogue' | 'quiz', points: number) => {
    setPlayer((prev) => {
      const nextScores = { ...prev.scores, [type]: prev.scores[type] + points };

      const englishSkill = Math.min(100, Math.round(nextScores.dialogue * 1.5 + nextScores.quiz * 0.5));
      const letterSkill = Math.min(100, Math.round(nextScores.puzzles * 2.5 + nextScores.clues * 0.4));
      const problemSolving = Math.min(100, Math.round(nextScores.clues * 1.2 + nextScores.puzzles * 1.0));
      const careerReadiness = Math.min(100, Math.round((englishSkill + letterSkill + problemSolving) / 3));
      const total = nextScores.clues + nextScores.puzzles + nextScores.dialogue + nextScores.quiz;

      return {
        ...prev,
        scores: {
          ...nextScores,
          englishScore: englishSkill,
          letterScore: letterSkill,
          problemSolvingScore: problemSolving,
          careerScore: careerReadiness,
          totalScore: total
        }
      };
    });
  };

  const getObjective = (day: DayNumber): string => {
    switch (day) {
      case 1:
        return 'Find information about your future after graduation.';
      case 2:
        return 'Examine the job vacancy brochure at the Announcement Board.';
      case 3:
        return 'Visit the Library to understand the 9 parts of an Application Letter.';
      case 4:
        return `Go to your ${player.major} Lab to complete your vocational challenge.`;
      case 5:
        return 'Meet Mr. Hendra in the Teacher Room for the final career review.';
    }
  };

  // Automatic Daily Quiz trigger when day's objectives are met
  useEffect(() => {
    const todayClues = GAME_CLUES.filter((c) => c.day === player.currentDay);
    const allFoundToday = todayClues.every((c) => player.cluesFound.includes(c.id));

    const day3Ready = player.currentDay === 3 ? player.puzzlesCompleted.includes('letter_puzzle') : true;
    const day4Ready = player.currentDay === 4 ? player.challengesCompleted.includes('major_challenge') : true;

    if (
      allFoundToday &&
      day3Ready &&
      day4Ready &&
      !player.daysCompleted.includes(player.currentDay) &&
      !showDailyQuiz &&
      scene === 'EXPLORATION' &&
      !activeNpc &&
      !showBrochure &&
      !showLetterPuzzle &&
      !showMajorChallenge &&
      !showPlotTwist
    ) {
      const timer = setTimeout(() => {
        sound.playFanfare();
        setShowDailyQuiz(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    player.cluesFound,
    player.puzzlesCompleted,
    player.challengesCompleted,
    player.daysCompleted,
    player.currentDay,
    showDailyQuiz,
    scene,
    activeNpc,
    showBrochure,
    showLetterPuzzle,
    showMajorChallenge,
    showPlotTwist
  ]);

  const handleCollectClue = (clue: ClueItem) => {
    if (player.cluesFound.includes(clue.id)) return;

    sound.playClueFound();
    setPlayer((prev) => ({
      ...prev,
      cluesFound: [...prev.cluesFound, clue.id]
    }));
    addScore('clues', clue.points || 10);

    setClueNotification(`Application Letter Clue Found: ${clue.title}!`);
    setTimeout(() => {
      setClueNotification(null);
    }, 2800);
  };

  const handleQuizComplete = (scoreGained: number) => {
    addScore('quiz', scoreGained);
    setShowDailyQuiz(false);

    setPlayer((prev) => ({
      ...prev,
      daysCompleted: [...prev.daysCompleted, prev.currentDay]
    }));

    if (player.currentDay < 5) {
      const nextDay = (player.currentDay + 1) as DayNumber;
      setPlayer((prev) => ({
        ...prev,
        currentDay: nextDay
      }));
      setClueNotification(`Day ${player.currentDay} Cleared! Welcome to Day ${nextDay}.`);
      setTimeout(() => setClueNotification(null), 3000);
    } else {
      setShowPlotTwist(true);
    }
  };

  const handlePlotTwistDecision = (decision: 'WORK' | 'COLLEGE') => {
    setPlayer((prev) => ({
      ...prev,
      finalDecision: decision
    }));
    setShowPlotTwist(false);
    // Move to FINAL_SCORE scene where the official form submission is displayed
    setScene('FINAL_SCORE');
  };

  // Return to home screen and reset game state
  const handleReturnToHome = () => {
    sound.playClick();
    setPlayer(createInitialPlayerState());
    setActiveNpc(null);
    setShowBrochure(false);
    setShowLetterPuzzle(false);
    setShowMajorChallenge(false);
    setShowDailyQuiz(false);
    setShowPlotTwist(false);
    setShowCluesList(false);
    setShowHelp(false);
    setScene('TITLE');
  };

  return (
    <div className="relative min-h-screen w-full bg-amber-50 text-slate-900 select-none overflow-x-hidden font-sans">
      {/* Dynamic Sinking/Rising Header (HUD) during exploration */}
      {scene === 'EXPLORATION' && (
        <HeaderHUD
          isMoving={player.isMoving}
          gameTitle="Muhiba Career Quest"
          day={player.currentDay}
          playerName={player.name}
          major={player.major}
          objectiveEn={getObjective(player.currentDay)}
          cluesCount={player.cluesFound.length}
          totalClues={GAME_CLUES.length}
          score={player.scores.totalScore}
          onOpenHelp={() => setShowHelp(true)}
          onOpenClues={() => setShowCluesList(true)}
        />
      )}

      {/* Floating Animated Clue Notification */}
      {clueNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div className="bg-amber-300 border-2 border-slate-900 px-4 py-2 rounded-2xl shadow-[3px_3px_0px_0px_#000] text-slate-900 font-pixel text-xs font-bold text-center">
            🔥 {clueNotification} 🔥
          </div>
        </div>
      )}

      {/* SCENE 1: TITLE SCREEN */}
      {scene === 'TITLE' && (
        <TitleScreen
          onStart={() => {
            sound.playClick();
            setScene('CUSTOMIZE');
          }}
          onOpenHelp={() => setShowHelp(true)}
        />
      )}

      {/* SCENE 2: CUSTOMIZE CHARACTER */}
      {scene === 'CUSTOMIZE' && (
        <CustomizeModal
          initialName={player.name}
          initialGender={player.gender}
          onConfirm={(name, gender) => {
            setPlayer((prev) => ({ ...prev, name, gender }));
            setScene('OPENING_STORY');
          }}
        />
      )}

      {/* SCENE 3: OPENING STORY IN COURTYARD */}
      {scene === 'OPENING_STORY' && (
        <OpeningStoryModal
          onStoryFinished={() => {
            setScene('CHOOSE_MAJOR');
          }}
        />
      )}

      {/* SCENE 4: CHOOSE MAJOR */}
      {scene === 'CHOOSE_MAJOR' && (
        <ChooseMajorModal
          onSelectMajor={(selectedMajor) => {
            setPlayer((prev) => ({ ...prev, major: selectedMajor }));
            setScene('EXPLORATION');
            handleCollectClue(GAME_CLUES[0]);
          }}
        />
      )}

      {/* SCENE 5: 2D EXPLORATION & PLAY AREA (NO FORM HERE) */}
      {scene === 'EXPLORATION' && (
        <main className="w-full pt-1 sm:pt-2 flex flex-col items-center">
          <SchoolMapCanvas
            playerGender={player.gender}
            playerName={player.name}
            playerMajor={player.major}
            currentDay={player.currentDay}
            cluesFound={player.cluesFound}
            onPlayerMovingChange={(isMoving) => {
              setPlayer((prev) => ({ ...prev, isMoving }));
            }}
            onInteractNPC={(npc) => {
              setActiveNpc(npc);
            }}
            onInteractClue={(clue) => {
              handleCollectClue(clue);
            }}
            onOpenBrochure={() => {
              setShowBrochure(true);
            }}
            onOpenLetterPuzzle={() => {
              setShowLetterPuzzle(true);
            }}
            onOpenMajorChallenge={() => {
              setShowMajorChallenge(true);
            }}
            activeNpcId={activeNpc?.id}
          />
        </main>
      )}

      {/* SCENE 6: FINAL SCORE & OFFICIAL SUBMISSION FORM (ONLY APPEARS WHEN GAME ENDS) */}
      {scene === 'FINAL_SCORE' && (
        <Web3FormSection
          player={player}
          onReturnToHome={handleReturnToHome}
        />
      )}

      {/* MODAL: NPC DIALOGUE */}
      {activeNpc && (
        <DialogueModal
          npc={activeNpc}
          currentDay={player.currentDay}
          playerGender={player.gender}
          onClose={() => setActiveNpc(null)}
          onDialogueComplete={(pts) => {
            addScore('dialogue', pts);
            if (activeNpc.id === 'pak_budi' && player.currentDay === 1) {
              handleCollectClue(GAME_CLUES[1]);
            }
          }}
        />
      )}

      {/* MODAL: VACANCY BROCHURE */}
      {showBrochure && (
        <BrochureModal
          major={player.major}
          alreadyClaimed={player.cluesFound.includes('clue_d2_1')}
          onClose={() => setShowBrochure(false)}
          onClaimClue={() => {
            const brochureClue = GAME_CLUES.find((c) => c.id === 'clue_d2_1');
            if (brochureClue) handleCollectClue(brochureClue);
            const reqClue = GAME_CLUES.find((c) => c.id === 'clue_d2_2');
            if (reqClue) handleCollectClue(reqClue);
          }}
        />
      )}

      {/* MODAL: 9-PART LETTER PUZZLE */}
      {showLetterPuzzle && (
        <LetterPuzzleModal
          alreadySolved={player.puzzlesCompleted.includes('letter_puzzle')}
          onClose={() => setShowLetterPuzzle(false)}
          onSuccess={(scoreGained) => {
            if (!player.puzzlesCompleted.includes('letter_puzzle')) {
              addScore('puzzles', scoreGained);
              setPlayer((prev) => ({
                ...prev,
                puzzlesCompleted: [...prev.puzzlesCompleted, 'letter_puzzle']
              }));
              const d3_1 = GAME_CLUES.find((c) => c.id === 'clue_d3_1');
              if (d3_1) handleCollectClue(d3_1);
              const d3_2 = GAME_CLUES.find((c) => c.id === 'clue_d3_2');
              if (d3_2) handleCollectClue(d3_2);
              const d3_3 = GAME_CLUES.find((c) => c.id === 'clue_d3_3');
              if (d3_3) handleCollectClue(d3_3);
            }
          }}
        />
      )}

      {/* MODAL: MAJOR VOCATIONAL CHALLENGE */}
      {showMajorChallenge && (
        <MajorChallengeModal
          major={player.major}
          playerName={player.name}
          alreadyCompleted={player.challengesCompleted.includes('major_challenge')}
          onClose={() => setShowMajorChallenge(false)}
          onComplete={(scoreGained) => {
            if (!player.challengesCompleted.includes('major_challenge')) {
              addScore('puzzles', scoreGained);
              setPlayer((prev) => ({
                ...prev,
                challengesCompleted: [...prev.challengesCompleted, 'major_challenge']
              }));
              const d4_1 = GAME_CLUES.find((c) => c.id === 'clue_d4_1');
              if (d4_1) handleCollectClue(d4_1);
              const d4_2 = GAME_CLUES.find((c) => c.id === 'clue_d4_2');
              if (d4_2) handleCollectClue(d4_2);
            }
            setShowMajorChallenge(false);
          }}
        />
      )}

      {/* MODAL: DAILY AUTOMATIC QUIZ */}
      {showDailyQuiz && (
        <DailyQuizModal
          day={player.currentDay}
          onQuizComplete={handleQuizComplete}
          onClose={() => setShowDailyQuiz(false)}
        />
      )}

      {/* MODAL: PLOT TWIST REVELATION & CAREER CHOICE */}
      {showPlotTwist && (
        <PlotTwistModal
          major={player.major}
          playerName={player.name}
          onDecisionMade={handlePlotTwistDecision}
        />
      )}

      {/* MODAL: CLUES SUMMARY DRAWER */}
      {showCluesList && (
        <CluesModal
          currentDay={player.currentDay}
          cluesFound={player.cluesFound}
          onClose={() => setShowCluesList(false)}
        />
      )}

      {/* MODAL: HOW TO PLAY / HELP */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}
