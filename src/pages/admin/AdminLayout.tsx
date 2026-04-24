import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  MessageCircle, 
  BookOpen, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft,
  Home,
  Info,
  Settings,
  Layers,
} from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/dashboard/hero', label: 'Hero Section', icon: Home },
  { path: '/admin/dashboard/about', label: 'About Us', icon: Info },
  { path: '/admin/dashboard/services', label: 'Services', icon: Settings },
  { path: '/admin/dashboard/how-it-works', label: 'How It Works', icon: Layers },
  // { path: '/admin/dashboard/testimonials', label: 'Stories/Testimonials', icon: MessageCircle },
  { path: '/admin/dashboard/feedback', label: 'Feedback', icon: MessageSquare },
  { path: '/admin/dashboard/comments', label: 'Comments', icon: MessageCircle },
  { path: '/admin/dashboard/stories', label: 'Stories', icon: BookOpen },

];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#191f2f] flex">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#262e49] border-r border-[#3f4d7f]/30 transition-all duration-300 ${
          isMobile 
            ? sidebarOpen 
              ? 'translate-x-0' 
              : '-translate-x-full'
            : 'relative'
        } ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#3f4d7f]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3f4d7f] to-[#3f4d7f]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              {(sidebarOpen || isMobile) && (
                <div className="overflow-hidden">
                  <h2 className="text-white font-bold text-lg whitespace-nowrap">Admin Panel</h2>
                  <p className="text-slate-400 text-xs whitespace-nowrap">Bridge Consulting</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin/dashboard'}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white shadow-lg shadow-[#3f4d7f]/25'
                      : 'text-slate-400 hover:bg-[#3f4d7f]/20 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {(sidebarOpen || isMobile) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-[#3f4d7f]/30">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-[#ee6969] hover:bg-[#bb0505]/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {(sidebarOpen || isMobile) && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 transition-all duration-300">
        <header className="bg-[#262e49]/50 backdrop-blur-xl border-b border-[#3f4d7f]/30 sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isMobile && !sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/20 rounded-lg transition-all"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              {isMobile && sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/20 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {!isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/20 rounded-lg transition-all"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3f4d7f] to-[#3f4d7f]/80 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-white text-sm font-medium hidden sm:inline">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}