import React from 'react';
import { User, LogOut, BookOpen, FileText, TrendingUp, Award, DollarSign, Users } from 'lucide-react';
import { User as UserType } from '../types';

interface DashboardProps {
  user: UserType;
  onNavigate: (view: 'test' | 'courses' | 'trading') => void;
  onLogout: () => void;
  onUpdateUser: (user: UserType) => void;
}

export default function Dashboard({ user, onNavigate, onLogout, onUpdateUser }: DashboardProps) {
  const getStatusColor = () => {
    if (user.hasPassed && user.tradingActive) return 'text-emerald-400';
    if (user.hasPassed) return 'text-blue-400';
    return 'text-orange-400';
  };

  const getStatusText = () => {
    if (user.hasPassed && user.tradingActive) return 'Active Trader';
    if (user.hasPassed) return 'Certified - Ready to Trade';
    if (user.testAttempts > 0) return 'Assessment Required';
    return 'New Student';
  };

  const handleStartTrading = () => {
    if (user.hasPassed && !user.tradingActive) {
      const updatedUser = {
        ...user,
        tradingActive: true,
        credits: user.credits || 10000,
        portfolio: {
          ...user.portfolio,
          balance: 10000,
          totalValue: 10000
        }
      };
      onUpdateUser(updatedUser);
    }
    onNavigate('trading');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">TradePro Academy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-white font-medium">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-slate-300">Status:</span>
            <span className={`font-semibold ${getStatusColor()}`}>{getStatusText()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Virtual Credits</p>
                <p className="text-2xl font-bold text-white">${user.credits.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Test Attempts</p>
                <p className="text-2xl font-bold text-white">{user.testAttempts}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Courses Completed</p>
                <p className="text-2xl font-bold text-white">{user.coursesCompleted.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Portfolio P&L</p>
                <p className={`text-2xl font-bold ${user.portfolio.profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {user.portfolio.profitLoss >= 0 ? '+' : ''}${user.portfolio.profitLoss.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trading Assessment */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Trading Assessment</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Take our comprehensive 20-question assessment to prove your trading knowledge and unlock the platform.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Cost: $49</span>
              <span className="text-slate-400">30 minutes</span>
            </div>
            {!user.hasPassed ? (
              <button
                onClick={() => onNavigate('test')}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300"
              >
                {user.testAttempts > 0 ? 'Retake Assessment' : 'Start Assessment'}
              </button>
            ) : (
              <div className="w-full py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg font-semibold text-center">
                ✓ Assessment Passed
              </div>
            )}
          </div>

          {/* Course Library */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Course Library</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Access professional trading courses to improve your skills and increase your chances of passing the assessment.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">12 Courses Available</span>
              <span className="text-slate-400">$99-299 each</span>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Browse Courses
            </button>
          </div>

          {/* Trading Platform */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Trading Platform</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Access our advanced trading simulator with $10,000 virtual credits to practice and refine your strategies.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Real-time Data</span>
              <span className="text-slate-400">Virtual Trading</span>
            </div>
            {user.hasPassed ? (
              <button
                onClick={handleStartTrading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-300"
              >
                {user.tradingActive ? 'Continue Trading' : 'Start Trading'}
              </button>
            ) : (
              <div className="w-full py-3 bg-slate-600/50 border border-slate-600/50 text-slate-400 rounded-lg font-semibold text-center">
                Pass Assessment First
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {(user.testAttempts > 0 || user.coursesCompleted.length > 0) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="space-y-4">
                {user.hasPassed && (
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <Award className="w-5 h-5" />
                    <span>Trading assessment passed successfully</span>
                  </div>
                )}
                {user.testAttempts > 0 && !user.hasPassed && (
                  <div className="flex items-center space-x-3 text-orange-400">
                    <FileText className="w-5 h-5" />
                    <span>Assessment attempt #{user.testAttempts} - Continue learning</span>
                  </div>
                )}
                {user.coursesCompleted.map((course, index) => (
                  <div key={index} className="flex items-center space-x-3 text-purple-400">
                    <BookOpen className="w-5 h-5" />
                    <span>Completed: {course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}