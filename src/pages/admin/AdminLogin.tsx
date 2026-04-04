import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === 'admin@bridge.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#191f2f] via-[#262e49] to-[#191f2f] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-[#3f4d7f]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-[#bb0505]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-sm sm:max-w-md">
        <div className="bg-[#262e49]/80 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#3f4d7f] to-[#3f4d7f]/80 rounded-xl flex items-center justify-center shadow-lg">
              <Box className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-1 sm:mb-2">Admin Portal</h1>
          <p className="text-slate-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">Bridge Business Consulting</p>
          
          {error && (
            <div className="bg-[#bb0505]/10 border border-[#bb0505]/50 rounded-lg p-3 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ee6969] flex-shrink-0" />
              <span className="text-[#ee6969] text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="admin@bridge.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 hover:from-[#3f4d7f]/90 hover:to-[#3f4d7f]/70 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <p className="text-center text-slate-500 text-xs sm:text-sm mt-4 sm:mt-6">
            Demo: admin@bridge.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}