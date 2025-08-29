import React, { useState, useEffect } from 'react';
import { TrendingUp, User, BookOpen, DollarSign, Award, ChevronRight } from 'lucide-react';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Test from './components/Test';
import Courses from './components/Courses';
import Trading from './components/Trading';
import { User as UserType } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'test' | 'courses' | 'trading'>('landing');

  useEffect(() => {
    const savedUser = localStorage.getItem('tradepro_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    localStorage.setItem('tradepro_user', JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tradepro_user');
    setCurrentView('landing');
  };

  const updateUser = (updatedUser: UserType) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('tradepro_user', JSON.stringify(updatedUser));
  };

  if (currentView === 'landing') {
    return <Landing onNavigate={setCurrentView} />;
  }

  if (currentView === 'auth') {
    return <Auth onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'test') {
    return <Test user={currentUser!} onComplete={updateUser} onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'courses') {
    return <Courses user={currentUser!} onComplete={updateUser} onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'trading') {
    return <Trading user={currentUser!} onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <Dashboard 
      user={currentUser!} 
      onNavigate={setCurrentView} 
      onLogout={handleLogout}
      onUpdateUser={updateUser}
    />
  );
}

export default App;