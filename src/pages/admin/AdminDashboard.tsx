import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, MessageSquare, BookOpen, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

const stats: StatCard[] = [
  { title: 'Total Feedback', value: '156', change: '+12%', trend: 'up', icon: MessageSquare, color: 'from-[#3f4d7f] to-[#3f4d7f]/80' },
  { title: 'Total Comments', value: '89', change: '+8%', trend: 'up', icon: Users, color: 'from-[#3f4d7f]/80 to-[#3f4d7f]/60' },
  { title: 'Stories Posted', value: '24', change: '+3%', trend: 'up', icon: BookOpen, color: 'from-[#bb0505] to-[#ee6969]' },
  { title: 'New Messages', value: '12', change: '-2%', trend: 'down', icon: MessageSquare, color: 'from-[#ee6969] to-[#ff9494]' },
];

const recentFeedback = [
  { id: 1, name: 'John Doe', message: 'Excellent service! Very professional team.', date: '2 hours ago', type: 'positive' },
  { id: 2, name: 'Sarah Smith', message: 'Great consultation experience. Highly recommended!', date: '5 hours ago', type: 'positive' },
  { id: 3, name: 'Mike Johnson', message: 'Could use some improvement in response time.', date: '1 day ago', type: 'neutral' },
  { id: 4, name: 'Emily Brown', message: 'Outstanding strategic planning support.', date: '1 day ago', type: 'positive' },
];

const recentComments = [
  { id: 1, user: 'Alex Thompson', content: 'This is exactly what we needed for our business.', post: 'Growth Strategies Article', time: '1 hour ago' },
  { id: 2, user: 'Maria Garcia', content: 'Great insights on market trends!', post: '2024 Business Outlook', time: '3 hours ago' },
  { id: 3, user: 'David Lee', content: 'Very helpful tips for small businesses.', post: 'Startup Guide', time: '6 hours ago' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => '0'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats.map(s => s.value));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="text-sm text-slate-500">
          Last updated: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 hover:border-[#3f4d7f]/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{animatedStats[index]}</p>
                <div className={`flex items-center gap-1 mt-2 ${stat.trend === 'up' ? 'text-[#ee6969]' : 'text-[#ff9494]'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                  <span className="text-slate-500 text-sm hidden sm:inline">vs last month</span>
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Recent Feedback</h2>
            <button 
              onClick={() => navigate('/admin/dashboard/feedback')}
              className="text-[#3f4d7f] hover:text-[#3f4d7f]/80 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentFeedback.map((item) => (
              <div key={item.id} className="p-3 sm:p-4 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-[#3f4d7f] to-[#3f4d7f]/80 flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-medium">{item.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">{item.name}</p>
                      <p className="text-slate-400 text-xs sm:text-sm">{item.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === 'positive' ? 'bg-[#bb0505]/20 text-[#ee6969]' :
                    item.type === 'negative' ? 'bg-[#bb0505]/30 text-[#ff9494]' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-slate-300 mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-2">{item.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Recent Comments</h2>
            <button 
              onClick={() => navigate('/admin/dashboard/comments')}
              className="text-[#3f4d7f] hover:text-[#3f4d7f]/80 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentComments.map((comment) => (
              <div key={comment.id} className="p-3 sm:p-4 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all cursor-pointer">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#bb0505] to-[#ee6969] flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{comment.user.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{comment.user}</p>
                    <p className="text-slate-500 text-xs">{comment.time}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm line-clamp-2">{comment.content}</p>
                <p className="text-[#3f4d7f] text-xs mt-2">On: {comment.post}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/admin/dashboard/feedback')}
            className="p-3 sm:p-4 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all text-center group"
          >
            <div className="w-10 sm:w-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-[#3f4d7f]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 sm:w-6 h-5 sm:h-6 text-[#3f4d7f]" />
            </div>
            <p className="text-white font-medium text-sm">Add Feedback</p>
          </button>
          <button 
            onClick={() => navigate('/admin/dashboard/comments')}
            className="p-3 sm:p-4 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all text-center group"
          >
            <div className="w-10 sm:w-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-[#3f4d7f]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-[#3f4d7f]" />
            </div>
            <p className="text-white font-medium text-sm">Manage Comments</p>
          </button>
          <button 
            onClick={() => navigate('/admin/dashboard/stories')}
            className="p-3 sm:p-4 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all text-center group"
          >
            <div className="w-10 sm:w-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-[#bb0505]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-[#ee6969]" />
            </div>
            <p className="text-white font-medium text-sm">Post Story</p>
          </button>
          <button className="p-3 sm:p-4 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all text-center group">
            <div className="w-10 sm:w-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-[#ee6969]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-[#ee6969]" />
            </div>
            <p className="text-white font-medium text-sm">View Analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}