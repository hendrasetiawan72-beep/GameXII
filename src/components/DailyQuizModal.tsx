import React, { useState } from 'react';
import { DayNumber, QuizQuestion } from '../types/game';
import { DAILY_QUIZZES } from '../data/gameData';
import { CheckCircle2, XCircle, ChevronRight, Award, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DailyQuizModalProps {
  day: DayNumber;
  onQuizComplete: (scoreGained: number, correctCount: number, totalQuestions: number) => void;
  onClose?: () => void;
}

export const DailyQuizModal: React.FC<DailyQuizModalProps> = ({
  day,
  onQuizComplete
}) => {
  const questions: QuizQuestion[] = DAILY_QUIZZES[day] || DAILY_QUIZZES[1];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(key);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
      sound.playFanfare();
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleFinishQuiz = () => {
    const scoreGained = correctAnswersCount * 10;
    onQuizComplete(scoreGained, correctAnswersCount, questions.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-xl bg-[#FFFDF5] border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden">
        {/* Banner */}
        <div className="px-4 py-3 bg-amber-400 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-900" />
            <div>
              <h3 className="font-pixel text-xs sm:text-sm font-bold text-slate-900">
                DAILY CHALLENGE COMPLETE!
              </h3>
              <p className="text-[10px] text-slate-800 font-medium">
                Day {day} Verification Quiz · SMK Muhammadiyah Bawang
              </p>
            </div>
          </div>
          <span className="font-pixel text-xs bg-slate-900 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800">
            {currentIdx + 1}/{questions.length}
          </span>
        </div>

        {/* Modal Body */}
        {!isQuizFinished ? (
          <div className="p-4 sm:p-5 space-y-4 font-sans text-slate-900">
            {/* Prompt Lead-in */}
            <div className="flex items-center gap-2 text-xs bg-amber-100 border border-amber-800/30 p-2.5 rounded-xl">
              <HelpCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span className="font-semibold text-amber-950">
                Before you continue, prove what you have learned today:
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[2px_2px_0px_0px_#0F172A]">
              <p className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                {currentQ.questionEn}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isCorrect = opt.key === currentQ.correctAnswer;

                let optionStyle = 'bg-white hover:bg-amber-50 border-slate-900';
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-100 border-emerald-700 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-red-100 border-red-700 text-red-950 line-through';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-amber-300 border-slate-900 ring-2 ring-amber-500 font-bold';
                }

                return (
                  <button
                    key={opt.key}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <span className="font-pixel text-xs w-6 h-6 flex items-center justify-center bg-slate-900 text-white rounded-md shrink-0 border border-slate-800">
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-medium pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation once submitted */}
            {isAnswerSubmitted && (
              <div
                className={`p-3.5 rounded-2xl border-2 ${
                  selectedAnswer === currentQ.correctAnswer
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                    : 'bg-red-50 border-red-600 text-red-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>CORRECT ANSWER! (+10 PTS)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-700" />
                      <span>INCORRECT — KEEP PRACTICING!</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed">{currentQ.explanationEn}</p>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="p-6 text-center space-y-4 font-sans">
            <div className="w-16 h-16 mx-auto bg-amber-300 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_0px_#0F172A]">
              <Award className="w-10 h-10 text-slate-900" />
            </div>

            <div>
              <h4 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                DAY {day} QUIZ COMPLETED!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                You proved your English career knowledge today!
              </p>
            </div>

            <div className="bg-amber-100 border-2 border-slate-900 rounded-2xl p-4 max-w-sm mx-auto shadow-[2px_2px_0px_0px_#0F172A]">
              <div className="flex justify-between text-xs py-1 border-b border-amber-800/20">
                <span>Correct Answers:</span>
                <span className="font-bold font-pixel">
                  {correctAnswersCount} / {questions.length}
                </span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-amber-800/20">
                <span>Score Earned:</span>
                <span className="font-bold font-pixel text-emerald-700">
                  +{correctAnswersCount * 10} PTS
                </span>
              </div>
              <div className="flex justify-between text-xs py-1 text-slate-800 font-bold">
                <span>Day Status:</span>
                <span className="text-emerald-800 font-pixel">CLEARED ✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-3.5 bg-amber-100 border-t-2 border-slate-900 flex items-center justify-between">
          {!isQuizFinished ? (
            <>
              <span className="font-pixel text-[10px] text-slate-600">
                QUESTION {currentIdx + 1} OF {questions.length}
              </span>
              {!isAnswerSubmitted ? (
                <button
                  disabled={!selectedAnswer}
                  onClick={handleSubmitAnswer}
                  className="pixel-btn bg-emerald-400 hover:bg-emerald-500 disabled:opacity-40 text-slate-900 px-5 py-2 text-xs font-pixel cursor-pointer disabled:cursor-not-allowed rounded-xl"
                >
                  SUBMIT ANSWER
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="pixel-btn bg-amber-400 hover:bg-amber-500 text-slate-900 px-5 py-2 text-xs font-pixel flex items-center gap-1 cursor-pointer rounded-xl"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={handleFinishQuiz}
                className="pixel-btn bg-emerald-400 hover:bg-emerald-500 text-slate-900 px-6 py-2.5 text-xs font-pixel flex items-center gap-2 cursor-pointer rounded-xl"
              >
                <span>{day < 5 ? 'CONTINUE TO NEXT DAY' : 'PROCEED TO FINAL REVELATION'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
