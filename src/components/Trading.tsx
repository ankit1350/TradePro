import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, RefreshCw } from 'lucide-react';
import { User, Stock, Position } from '../types';

interface TradingProps {
  user: User;
  onBack: () => void;
}

const initialStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.15, changePercent: 1.24 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -15.42, changePercent: -0.54 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.67, changePercent: 1.52 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.92, change: -8.33, changePercent: -3.24 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3342.88, change: 12.45, changePercent: 0.37 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 18.92, changePercent: 2.21 }
];

export default function Trading({ user, onBack }: TradingProps) {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<number>(1);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 5,
          change: (Math.random() - 0.5) * 10,
          changePercent: (Math.random() - 0.5) * 2
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePlaceOrder = () => {
    if (selectedStock) {
      // Simulate order execution
      console.log(`${orderType.toUpperCase()} ${quantity} shares of ${selectedStock.symbol} at $${selectedStock.price}`);
      setShowOrderModal(false);
      setSelectedStock(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <h1 className="text-xl font-bold text-white">Trading Platform</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-slate-400">Portfolio Value</p>
              <p className="text-lg font-bold text-white">${user.portfolio.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Portfolio</h2>
              <PieChart className="w-6 h-6 text-blue-400" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Cash Balance</span>
                <span className="text-white font-semibold">${user.portfolio.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Value</span>
                <span className="text-white font-semibold">${user.portfolio.totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">P&L Today</span>
                <span className={`font-semibold ${user.portfolio.profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {user.portfolio.profitLoss >= 0 ? '+' : ''}${user.portfolio.profitLoss.toLocaleString()}
                </span>
              </div>
            </div>

            {user.portfolio.positions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Positions</h3>
                <div className="space-y-3">
                  {user.portfolio.positions.map((position, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-white">{position.symbol}</p>
                          <p className="text-sm text-slate-400">{position.quantity} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">${position.currentPrice.toFixed(2)}</p>
                          <p className={`text-sm ${position.profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {position.profitLoss >= 0 ? '+' : ''}${position.profitLoss.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Market Watch */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Market Watch</h2>
              <button className="p-2 text-slate-400 hover:text-white transition-colors duration-200">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {stocks.map((stock) => (
                <div 
                  key={stock.symbol}
                  className="bg-slate-700/30 hover:bg-slate-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300"
                  onClick={() => {
                    setSelectedStock(stock);
                    setShowOrderModal(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-bold text-white text-lg">{stock.symbol}</p>
                        <p className="text-sm text-slate-400">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">${stock.price.toFixed(2)}</p>
                      <div className={`flex items-center space-x-1 ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedStock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Place Order</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold text-white">{selectedStock.symbol}</p>
              <p className="text-slate-400">{selectedStock.name}</p>
              <p className="text-2xl font-bold text-white mt-2">${selectedStock.price.toFixed(2)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Order Type</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setOrderType('buy')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      orderType === 'buy'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderType('sell')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      orderType === 'sell'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Total Cost</span>
                  <span className="text-white font-semibold">
                    ${(selectedStock.price * quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Available Cash</span>
                  <span className="text-white">${user.portfolio.balance.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  orderType === 'buy'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}