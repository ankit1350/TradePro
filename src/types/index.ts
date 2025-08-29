export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  hasPassed: boolean;
  testAttempts: number;
  coursesCompleted: string[];
  tradingActive: boolean;
  portfolio: Portfolio;
  joinedAt: string;
}

export interface Portfolio {
  balance: number;
  positions: Position[];
  totalValue: number;
  profitLoss: number;
}

export interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  profitLoss: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: string[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}