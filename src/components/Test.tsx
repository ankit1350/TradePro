import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, TrendingUp } from 'lucide-react';
import { User, Question } from '../types';

interface TestProps {
  user: User;
  onComplete: (user: User) => void;
  onBack: () => void;
}

const questions: Question[] = [
  {
    id: '1',
    question: 'What is the primary purpose of a stop-loss order?',
    options: [
      'To guarantee profits',
      'To limit potential losses',
      'To increase trading volume',
      'To predict market trends'
    ],
    correct: 1
  },
  {
    id: '2',
    question: 'Which of the following best describes market volatility?',
    options: [
      'The total volume of trades',
      'The speed of price movements',
      'The degree of price fluctuation',
      'The number of market participants'
    ],
    correct: 2
  },
  {
    id: '3',
    question: 'What does P/E ratio measure?',
    options: [
      'Price to Earnings ratio',
      'Profit to Expense ratio',
      'Portfolio to Equity ratio',
      'Purchase to Exit ratio'
    ],
    correct: 0
  },
  {
    id: '4',
    question: 'In technical analysis, what does a "bull market" indicate?',
    options: [
      'High trading volume',
      'Declining prices over time',
      'Rising prices over time',
      'Sideways price movement'
    ],
    correct: 2
  },
  {
    id: '5',
    question: 'What is diversification in investing?',
    options: [
      'Investing all money in one stock',
      'Spreading investments across different assets',
      'Only buying technology stocks',
      'Trading only during market hours'
    ],
    correct: 1
  }
];

export default function Test({ user, onComplete, onBack }: TestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [showResults, setShowResults] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    if (hasPaid && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hasPaid, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setHasPaid(true);
    }, 1000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
    const passed = correctAnswers >= 4; // Need 80% to pass
    
    const updatedUser = {
      ...user,
      testAttempts: user.testAttempts + 1,
      hasPassed: passed,
      credits: passed ? 10000 : user.credits
    };

    setShowResults(true);
    setTimeout(() => {
      onComplete(updatedUser);
    }, 3000);
  };

  if (!hasPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Trading Assessment</h1>
              <p className="text-slate-300">Professional trading knowledge evaluation</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-300">
                <span>Assessment Fee</span>
                <span className="font-semibold text-white">$49.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Duration</span>
                <span>30 minutes</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Questions</span>
                <span>20 questions</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Pass Requirement</span>
                <span>80% or higher</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Reward</span>
                <span className="text-emerald-400 font-semibold">$10,000 virtual credits</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 mb-4"
            >
              Pay $49 & Start Test
            </button>

            <button
              onClick={onBack}
              className="w-full py-2 text-slate-400 hover:text-slate-300 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
    const passed = correctAnswers >= 4;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-emerald-500' : 'bg-red-500'
            }`}>
              {passed ? (
                <CheckCircle className="w-10 h-10 text-white" />
              ) : (
                <XCircle className="w-10 h-10 text-white" />
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              {passed ? 'Congratulations!' : 'Assessment Failed'}
            </h2>
            
            <p className="text-xl text-slate-300 mb-6">
              You scored {percentage}% ({correctAnswers}/{questions.length})
            </p>

            {passed ? (
              <div className="space-y-4">
                <p className="text-emerald-400 font-semibold">
                  ✓ Trading platform unlocked
                </p>
                <p className="text-emerald-400 font-semibold">
                  ✓ $10,000 virtual credits added
                </p>
                <p className="text-slate-300">
                  Redirecting to dashboard...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-red-400">
                  You need 80% or higher to pass
                </p>
                <p className="text-slate-300">
                  Consider taking our courses to improve your knowledge before retesting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Trading Assessment</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-orange-400">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-slate-300 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                  answers[currentQuestion] === index
                    ? 'bg-blue-600/30 border-blue-500 text-white'
                    : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-600/30 hover:border-slate-500'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300"
            >
              {currentQuestion === questions.length - 1 ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}