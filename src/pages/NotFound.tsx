import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Compass } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-500/10 rounded-full blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block mb-8">
            <motion.h1 
              className="text-[150px] md:text-[220px] font-black text-white/5 leading-none select-none"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 10 
              }}
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full shadow-2xl shadow-accent-500/40"
              >
                <Compass className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Lost in <span className="text-accent-400">Digital Space?</span>
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
            The page you're looking for seems to have drifted away. Don't worry, 
            we've got the map to get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-accent-500 hover:text-white transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
            
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </div>

          <div className="mt-16 pt-16 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer" onClick={() => navigate('/case-studies')}>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/20 transition-all">
                <Search className="w-6 h-6 text-slate-400 group-hover:text-accent-400" />
              </div>
              <p className="text-white font-semibold mb-1">Our Work</p>
              <p className="text-slate-500 text-sm">Explore case studies</p>
            </div>
            
            <div className="text-center group cursor-pointer" onClick={() => window.location.href='/#services'}>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/20 transition-all">
                <Compass className="w-6 h-6 text-slate-400 group-hover:text-accent-400" />
              </div>
              <p className="text-white font-semibold mb-1">Expertise</p>
              <p className="text-slate-500 text-sm">See our services</p>
            </div>

            <div className="text-center group cursor-pointer" onClick={() => window.location.href='/#contact'}>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/20 transition-all">
                <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-accent-400" />
              </div>
              <p className="text-white font-semibold mb-1">Support</p>
              <p className="text-slate-500 text-sm">Contact our team</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles or decorative noise could be added here */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }}></div>
    </div>
  );
};

export default NotFound;
