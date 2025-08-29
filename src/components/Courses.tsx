import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Award, Play, Star, CheckCircle } from 'lucide-react';
import { User, Course } from '../types';

interface CoursesProps {
  user: User;
  onComplete: (user: User) => void;
  onBack: () => void;
}

const courses: Course[] = [
  {
    id: 'basics',
    title: 'Trading Fundamentals',
    description: 'Master the essential concepts of trading, market analysis, and risk management. Perfect for beginners.',
    price: 99,
    duration: '8 hours',
    level: 'Beginner',
    modules: [
      'Introduction to Financial Markets',
      'Order Types and Execution',
      'Basic Technical Analysis',
      'Risk Management Principles',
      'Market Psychology'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Analysis Mastery',
    description: 'Deep dive into chart patterns, indicators, and advanced technical analysis techniques.',
    price: 199,
    duration: '12 hours',
    level: 'Intermediate',
    modules: [
      'Chart Patterns Recognition',
      'Technical Indicators',
      'Support and Resistance',
      'Trend Analysis',
      'Volume Analysis'
    ]
  },
  {
    id: 'options',
    title: 'Options Trading Strategies',
    description: 'Learn advanced options strategies for income generation and portfolio protection.',
    price: 299,
    duration: '16 hours',
    level: 'Advanced',
    modules: [
      'Options Fundamentals',
      'Greeks and Pricing',
      'Covered Calls',
      'Protective Puts',
      'Complex Strategies'
    ]
  },
  {
    id: 'psychology',
    title: 'Trading Psychology',
    description: 'Develop the mental discipline and emotional control necessary for successful trading.',
    price: 149,
    duration: '6 hours',
    level: 'Intermediate',
    modules: [
      'Emotional Control',
      'Discipline and Patience',
      'Fear and Greed Management',
      'Building Confidence',
      'Stress Management'
    ]
  }
];

export default function Courses({ user, onComplete, onBack }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchasingCourse, setPurchasingCourse] = useState<string | null>(null);

  const handlePurchase = (courseId: string) => {
    setPurchasingCourse(courseId);
    
    // Simulate purchase and completion
    setTimeout(() => {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        const updatedUser = {
          ...user,
          coursesCompleted: [...user.coursesCompleted, course.title]
        };
        onComplete(updatedUser);
        setPurchasingCourse(null);
      }
    }, 2000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Advanced': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>
            <h1 className="text-xl font-bold text-white">Course Details</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm border ${getLevelColor(selectedCourse.level)}`}>
                  {selectedCourse.level}
                </span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-slate-300 ml-2">4.9 (234 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">{selectedCourse.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-6">{selectedCourse.description}</p>
              
              <div className="flex items-center space-x-6 text-slate-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>1,247 students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>{selectedCourse.modules.length} modules</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Course Modules</h3>
              <div className="space-y-3">
                {selectedCourse.modules.map((module, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-slate-300">{module}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-3xl font-bold text-white">${selectedCourse.price}</p>
                  <p className="text-slate-400">One-time payment</p>
                </div>
                {user.coursesCompleted.includes(selectedCourse.title) ? (
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(selectedCourse.id)}
                    disabled={purchasingCourse === selectedCourse.id}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {purchasingCourse === selectedCourse.id ? 'Processing...' : `Purchase Course - $${selectedCourse.price}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-xl font-bold text-white">Course Library</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Professional Trading Education</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Learn from industry experts and improve your trading skills with our comprehensive course library.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm border ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                {user.coursesCompleted.includes(course.title) && (
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">Completed</span>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">{course.description}</p>

              <div className="flex items-center space-x-4 text-slate-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{course.modules.length} modules</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">${course.price}</div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    View Details
                  </button>
                  {!user.coursesCompleted.includes(course.title) && (
                    <button
                      onClick={() => handlePurchase(course.id)}
                      disabled={purchasingCourse === course.id}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-300"
                    >
                      {purchasingCourse === course.id ? 'Processing...' : 'Purchase'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {user.coursesCompleted.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Ready for Another Attempt?</h3>
              <p className="text-slate-300 mb-4">
                You've completed {user.coursesCompleted.length} course(s). Consider retaking the assessment!
              </p>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}