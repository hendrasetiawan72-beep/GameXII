/**
 * Types for Application Letter Adventure: Muhiba Career Quest
 * SMK Muhammadiyah Bawang
 */

export type Major = 'AKL' | 'OTOMOTIF' | 'TJKT';

export type Gender = 'boy' | 'girl_hijab' | 'girl';

export type DayNumber = 1 | 2 | 3 | 4 | 5;

export type GameScene =
  | 'TITLE'
  | 'CUSTOMIZE'
  | 'OPENING_STORY'
  | 'CHOOSE_MAJOR'
  | 'EXPLORATION'
  | 'FINAL_SCORE';

export interface PlayerState {
  name: string;
  gender: Gender;
  major: Major;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  direction: 'down' | 'up' | 'left' | 'right';
  isMoving: boolean;
  currentDay: DayNumber;
  cluesFound: string[];
  puzzlesCompleted: string[];
  challengesCompleted: string[];
  daysCompleted: number[];
  finalDecision?: 'WORK' | 'COLLEGE';
  scores: {
    clues: number;
    puzzles: number;
    dialogue: number;
    quiz: number;
    englishScore: number;
    letterScore: number;
    problemSolvingScore: number;
    careerScore: number;
    totalScore: number;
  };
}

export interface ClueItem {
  id: string;
  day: DayNumber;
  title: string;
  description: string;
  locationId: string;
  icon: string;
  majorSpecific?: Major;
  pieceReward?: string;
  points: number;
}

export interface MapLocation {
  id: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  accentColor: string;
  icon: string;
  description: string;
  allowedMajors?: Major[];
}

export interface DialogueLine {
  speaker: string;
  speakerRole?: string;
  en: string;
  expressionTip?: string;
  avatar?: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  locationId: string;
  x: number;
  y: number;
  gender: 'male' | 'female';
  avatarType: string;
  dialogueByDay: Record<DayNumber, DialogueLine[]>;
  majorSpecific?: Major;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationEn: string;
}

export interface LetterSection {
  id: string;
  name: string;
  correctOrder: number;
  sampleContent: string;
  purpose: string;
  hint: string;
}

export interface MatchingPair {
  id: string;
  skill: string;
  requirement: string;
}
