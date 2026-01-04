
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Shield, TrendingUp, Award, CheckCircle2, XCircle, ChevronRight, Lock, Landmark } from 'lucide-react';
import { UserProfile, QuizModule, Badge } from '../types';

// Mock Data for Gamification
const INITIAL_PROFILE: UserProfile = {
  level: 3,
  currentXP: 340,
  nextLevelXP: 500,
  rankTitle: "Market Investor",
  streakDays: 4,
  badges: [
    { id: '1', name: 'First Cedi', description: 'Completed your first savings module', icon: '💰', unlocked: true, unlockedAt: new Date() },
    { id: '2', name: 'Fraud Spotter', description: 'Passed the Security Quiz with 100%', icon: '🛡️', unlocked: true, unlockedAt: new Date() },
    { id: '5', name: 'Pillar of Peace', description: 'Mastered SSNIT & Retirement Planning', icon: '🏦', unlocked: false },
    { id: '3', name: 'T-Bill Titan', description: 'Invested virtual currency in T-Bills', icon: '📈', unlocked: false },
  ]
};

const QUIZ_MODULES: QuizModule[] = [
  {
    id: 'm-ssnit',
    title: 'Pension Power (SSNIT)',
    description: 'Protect your future self. Learn how SSNIT works for self-employed Ghanaians.',
    xpReward: 250,
    completed: false,
    questions: [
      {
        id: 'ss1',
        question: 'What is the SSNIT "SEED" initiative about?',
        options: [
          'A program to give farmers free seeds',
          'Self-Employed Enrolment Drive for informal workers',
          'A new bank account for students',
          'A government loan for new businesses'
        ],
        correctAnswer: 1,
        explanation: 'SEED is specifically designed to bring self-employed Ghanaians into the national pension scheme.'
      },
      {
        id: 'ss2',
        question: 'For how long does SSNIT pay you a pension after you retire?',
        options: [
          'For only 10 years',
          'Until you finish the money you contributed',
          'For as long as you live (Life-long)',
          'Until you reach age 70'
        ],
        correctAnswer: 2,
        explanation: 'SSNIT is a defined benefit scheme that pays you a monthly pension for the rest of your life once you qualify.'
      },
      {
        id: 'ss3',
        question: 'If a self-employed person gets a permanent disability, can SSNIT help?',
        options: [
          'No, only for old age',
          'Yes, they can receive an Invalidity Pension',
          'No, you must be 60 years old first',
          'Yes, but only if they work in a bank'
        ],
        correctAnswer: 1,
        explanation: 'SSNIT provides an Invalidity Pension to members who become permanently incapable of working, regardless of age.'
      }
    ]
  },
  {
    id: 'm1',
    title: 'Safe Savings 101',
    description: 'Learn the difference between Susu and Bank savings.',
    xpReward: 150,
    completed: false,
    questions: [
      {
        id: 'q1',
        question: 'What is the most important thing to check before joining a Susu group?',
        options: [
          'If the collector is handsome/beautiful',
          'If the collector is affiliated with GCSCA',
          'If they promise to double your money in 2 days',
          'If they meet under a mango tree'
        ],
        correctAnswer: 1,
        explanation: 'Always verify if your Susu collector is affiliated with the Ghana Co-operative Susu Collectors Association (GCSCA) to ensure your money is safe.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'MoMo Security',
    description: 'Spot the scams and protect your PIN.',
    xpReward: 200,
    completed: false,
    questions: [
      {
        id: 'q3',
        question: 'An agent calls saying they sent you money by mistake. What do you do?',
        options: [
          'Send the money back immediately',
          'Give them your PIN to reverse it',
          'Check your balance first and do not send anything',
          'Insult them'
        ],
        correctAnswer: 2,
        explanation: 'Never rush. Scammers use panic. Always check your actual balance. If no money came in, it is a fake SMS.'
      }
    ]
    ]
  },
{
  id: 'm-tax',
    title: 'Tax Truths (GRA)',
      description: 'Understand your civic duties. VAT, Income Tax, and why it matters.',
        xpReward: 300,
          completed: false,
            questions: [
              {
                id: 't1',
                question: 'Who is required to pay Income Tax in Ghana?',
                options: [
                  'Only people who work in air-conditioned offices',
                  'Anyone earning income, including market traders and drivers',
                  'Only people who voted for the current government',
                  'Only people with more than 5 children'
                ],
                correctAnswer: 1,
                explanation: 'Income tax laws apply to everyone earning an income, whether from formal employment or self-employment (business).'
              },
              {
                id: 't2',
                question: 'What is the TIN number used for?',
                options: [
                  'To get free food at restaurants',
                  'To identify you as a taxpayer (Taxpayer Identification Number)',
                  'It is a lottery number',
                  'To register for a SIM card only'
                ],
                correctAnswer: 1,
                explanation: 'Your Taxpayer Identification Number (TIN) is your unique ID for all tax-related transactions and official business.'
              }
            ]
}
];

const LearningHub: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [activeModule, setActiveModule] = useState<QuizModule | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleStartModule = (module: QuizModule) => {
    setActiveModule(module);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionIdx);
    setIsAnswerChecked(true);

    if (optionIdx === activeModule!.questions[currentQuestionIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < activeModule!.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowResult(true);
    const finalScore = score + (selectedOption === activeModule!.questions[currentQuestionIdx].correctAnswer ? 1 : 0);
    const passed = finalScore === activeModule!.questions.length;

    if (passed) {
      setProfile(prev => {
        const newXP = prev.currentXP + activeModule!.xpReward;
        const leveledUp = newXP >= prev.nextLevelXP;

        // Unlock badge for SSNIT module
        const updatedBadges = prev.badges.map(b =>
          (b.id === '5' && activeModule!.id === 'm-ssnit') ? { ...b, unlocked: true, unlockedAt: new Date() } : b
        );

        return {
          ...prev,
          currentXP: leveledUp ? newXP - prev.nextLevelXP : newXP,
          level: leveledUp ? prev.level + 1 : prev.level,
          rankTitle: leveledUp ? getNextRank(prev.level + 1) : prev.rankTitle,
          badges: updatedBadges
        };
      });
    }
  };

  const getNextRank = (level: number) => {
    if (level > 10) return "Osikani Legend";
    if (level > 7) return "Business Tycoon";
    if (level > 5) return "Smart Investor";
    if (level > 3) return "Market Saver";
    return "Street Hustler";
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          Osikani Learning Hub
        </h2>
        <p className="text-slate-600 mt-2">
          Gamified financial literacy. Learn, earn XP, and become an Osikani.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Profile & Badges */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
            <div className="relative mt-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-yellow-400 flex items-center justify-center text-3xl">
                👨🏿
              </div>
              <h3 className="mt-3 font-bold text-xl text-slate-900">{profile.rankTitle}</h3>
              <p className="text-emerald-600 font-medium text-sm">Level {profile.level}</p>

              <div className="w-full mt-4">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>{profile.currentXP} XP</span>
                  <span>{profile.nextLevelXP} XP</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${(profile.currentXP / profile.nextLevelXP) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between w-full mt-6 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-slate-800 font-bold">
                    <Zap size={16} className="text-orange-500 fill-orange-500" />
                    {profile.streakDays}
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Day Streak</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-slate-800 font-bold">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    {profile.badges.filter(b => b.unlocked).length}
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Badges</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="text-purple-500" /> Achievements
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {profile.badges.map(badge => (
                <div key={badge.id} className={`p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${badge.unlocked ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-60 grayscale'}`}>
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{badge.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">{badge.description}</p>
                  </div>
                  {!badge.unlocked && <Lock size={12} className="text-slate-400 mt-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {activeModule ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden h-full flex flex-col">
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{activeModule.title}</h3>
                  <p className="text-slate-400 text-sm">Question {currentQuestionIdx + 1} of {activeModule.questions.length}</p>
                </div>
                <button onClick={() => setActiveModule(null)} className="text-slate-400 hover:text-white text-sm">
                  Exit
                </button>
              </div>

              {!showResult ? (
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h4 className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
                    {activeModule.questions[currentQuestionIdx].question}
                  </h4>
                  <div className="space-y-3">
                    {activeModule.questions[currentQuestionIdx].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswerChecked}
                        className={`w-full p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center ${isAnswerChecked
                            ? idx === activeModule.questions[currentQuestionIdx].correctAnswer
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : idx === selectedOption
                                ? 'border-red-500 bg-red-50 text-red-800'
                                : 'border-slate-100 text-slate-400'
                            : selectedOption === idx
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                          }`}
                      >
                        <span className="font-medium">{option}</span>
                        {isAnswerChecked && idx === activeModule.questions[currentQuestionIdx].correctAnswer && (
                          <CheckCircle2 className="text-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900 text-sm mb-4">
                        <span className="font-bold">Explanation: </span>
                        {activeModule.questions[currentQuestionIdx].explanation}
                      </div>
                      <button
                        onClick={handleNextQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        {currentQuestionIdx === activeModule.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                    <Trophy size={48} className="text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Module Completed!</h3>
                  <p className="text-slate-500 mt-2">Score: {score}/{activeModule.questions.length}</p>
                  {score === activeModule.questions.length && (
                    <div className="mt-6 bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full font-bold flex items-center gap-2 animate-bounce">
                      +{activeModule.xpReward} XP Earned!
                    </div>
                  )}
                  <button
                    onClick={() => setActiveModule(null)}
                    className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
                  >
                    Back to Hub
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Target className="text-emerald-500" /> Active Missions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZ_MODULES.map(module => (
                  <div key={module.id} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col ${module.id === 'm-ssnit' ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {module.id === 'm-ssnit' && <Landmark size={14} className="text-blue-500" />}
                        <h4 className="font-bold text-lg text-slate-900">{module.title}</h4>
                      </div>
                      <p className="text-slate-500 text-sm mt-2">{module.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
                        <Zap size={12} /> {module.xpReward} XP
                      </span>
                      <button
                        onClick={() => handleStartModule(module)}
                        className="text-sm font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
                      >
                        Start Module
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center opacity-70">
                  <Lock size={32} className="text-slate-400 mb-3" />
                  <h4 className="font-bold text-slate-600">Investment Tycoon</h4>
                  <p className="text-xs text-slate-400 mt-1">Unlock Level 5 to access</p>
                </div>
              </div>

              <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Landmark className="text-indigo-300" /> SSNIT Public Notice
                    </h3>
                    <p className="text-indigo-200 text-sm mt-1">Self-employed? Join SEED today for a secure future.</p>
                  </div>
                  <div className="text-center bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="block text-2xl font-bold text-yellow-400">SEED</span>
                    <span className="text-[10px] uppercase tracking-wide opacity-70">Initiative</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
