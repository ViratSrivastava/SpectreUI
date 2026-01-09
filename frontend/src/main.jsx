import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Activity, User, LogOut, Search, RefreshCw, AlertCircle, ChevronDown, BarChart3, Zap, Target, Shield } from 'lucide-react';

const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.89, change: -0.89 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 384.52, change: 5.67 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 156.78, change: 3.21 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.93, change: -4.56 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.32, change: 8.90 },
  { symbol: 'META', name: 'Meta Platforms', price: 352.18, change: 1.45 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 487.66, change: -2.13 }
];

const generateMockData = () => {
  const data = [];
  const basePrice = 150 + Math.random() * 100;
  for (let i = 0; i < 24; i++) {
    const variance = Math.sin(i * 0.5) * 15 + Math.random() * 10;
    data.push({
      time: `${i}:00`,
      actual: basePrice + variance,
      predicted: basePrice + variance + (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 1000000) + 500000
    });
  }
  return data;
};

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-6 shadow-2xl shadow-green-500/50">
            <Activity className="w-10 h-10 text-black" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
            STOCK<span className="text-green-400">MIND</span>
          </h1>
          <p className="text-gray-400 text-lg font-light">Advanced AI Trading Analytics</p>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <button
            onClick={onLogin}
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 mb-4"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-lg">Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={() => onLogin('demo')}
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
          >
            Enter Demo Mode
          </button>

          <p className="text-gray-600 text-xs text-center mt-6 leading-relaxed">
            Protected by enterprise-grade encryption<br/>
            Terms of Service • Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const [selectedStock, setSelectedStock] = useState(MOCK_STOCKS[0]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('24H');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    loadStockData();
  }, [selectedStock]);

  const loadStockData = () => {
    setLoading(true);
    setTimeout(() => {
      setChartData(generateMockData());
      setLoading(false);
    }, 800);
  };

  const metrics = [
    { label: 'Accuracy', value: '94.2%', icon: Target, color: 'text-green-400' },
    { label: 'Win Rate', value: '87.5%', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Signals', value: '156', icon: Zap, color: 'text-yellow-400' },
    { label: 'Risk Score', value: 'Low', icon: Shield, color: 'text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="border-b border-gray-900 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl shadow-lg shadow-green-500/50">
                <Activity className="w-6 h-6 text-black" strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  STOCK<span className="text-green-400">MIND</span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">AI TRADING PLATFORM</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Stats */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Portfolio Value</p>
                  <p className="text-lg font-bold text-green-400">$124,567.89</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Today's P&L</p>
                  <p className="text-lg font-bold text-emerald-400">+$3,456.78</p>
                </div>
              </div>

              {/* Profile */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 px-4 py-2.5 rounded-xl transition-colors border border-gray-800"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold hidden sm:block">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              <button
                onClick={onLogout}
                className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-900 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="fixed top-24 right-6 w-80 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl z-50 p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-black" strokeWidth={2.5} />
            </div>
            <h3 className="text-white font-bold text-xl mb-1">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <div className="inline-block mt-3 px-4 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
              {user.type} MEMBER
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-gray-800">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Trades</span>
              <span className="text-white font-bold">1,247</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Win Rate</span>
              <span className="text-green-400 font-bold">87.5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member Since</span>
              <span className="text-white font-bold">Jan 2024</span>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-xs text-gray-500 font-medium">{metric.label}</span>
              </div>
              <div className={`text-2xl font-black ${metric.color}`}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            {/* Stock Selector */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black mb-1">{selectedStock.symbol}</h2>
                  <p className="text-sm text-gray-500">{selectedStock.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black mb-1">${selectedStock.price}</div>
                  <div className={`flex items-center justify-end space-x-1 ${
                    selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedStock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-bold">
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {MOCK_STOCKS.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => setSelectedStock(stock)}
                    className={`p-3 rounded-xl transition-all ${
                      selectedStock.symbol === stock.symbol
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50 scale-105'
                        : 'bg-gray-800 hover:bg-gray-750 border border-gray-700'
                    }`}
                  >
                    <div className={`font-black text-sm mb-1 ${
                      selectedStock.symbol === stock.symbol ? 'text-black' : 'text-white'
                    }`}>
                      {stock.symbol}
                    </div>
                    <div className={`text-xs ${
                      selectedStock.symbol === stock.symbol 
                        ? 'text-black/70' 
                        : stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black">PREDICTION ANALYSIS</h3>
                <div className="flex items-center space-x-2">
                  {['24H', '7D', '1M', '1Y'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        timeframe === tf
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                  <button
                    onClick={loadStockData}
                    disabled={loading}
                    className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors ml-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
                      <BarChart3 className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-gray-500 font-medium">Loading market data...</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111827', 
                        border: '1px solid #1f2937',
                        borderRadius: '12px',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}
                      labelStyle={{ color: '#9ca3af' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorActual)" 
                      name="Actual"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      fillOpacity={1} 
                      fill="url(#colorPredicted)" 
                      name="AI Prediction"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-6">
            {/* Market Signal */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl shadow-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-black/70 text-sm font-bold">AI SIGNAL</span>
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              </div>
              <div className="text-black font-black text-4xl mb-2">STRONG BUY</div>
              <div className="text-black/70 text-sm font-semibold mb-4">Confidence: 94.2%</div>
              <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-black/70 text-xs font-bold">Target Price</span>
                  <span className="text-black font-black">$198.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/70 text-xs font-bold">Stop Loss</span>
                  <span className="text-black font-black">$172.30</span>
                </div>
              </div>
            </div>

            {/* Key Indicators */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-black mb-4 text-gray-400">KEY INDICATORS</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium">RSI (14)</span>
                    <span className="text-sm font-bold text-green-400">68.5</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: '68.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium">MACD</span>
                    <span className="text-sm font-bold text-green-400">Bullish</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium">Volume</span>
                    <span className="text-sm font-bold text-yellow-400">Above Avg</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-black mb-4 text-gray-400">AI INSIGHTS</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <TrendingUp className="w-4 h-4 text-green-400 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Strong Momentum</p>
                    <p className="text-xs text-gray-400">Upward trend detected with high volume support</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <Zap className="w-4 h-4 text-green-400 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Breakout Pattern</p>
                    <p className="text-xs text-gray-400">Price breaking resistance at $175.20</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Watch RSI Levels</p>
                    <p className="text-xs text-gray-400">Approaching overbought territory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (type = 'google') => {
    setUser({
      name: type === 'demo' ? 'Demo Trader' : 'Alex Morgan',
      email: type === 'demo' ? 'demo@stockmind.ai' : 'alex.morgan@gmail.com',
      type: type === 'demo' ? 'Demo' : 'Premium'
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;