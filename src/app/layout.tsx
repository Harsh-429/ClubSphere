import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  MessageSquare,
  Users,
  PieChart,
  LogOut,
  Bell,
  Settings,
  PlusCircle,
  Video,
  DollarSign,
  Building,
  CheckSquare,
  Search,
  Menu,
  X,
  ChevronDown,
  Edit,
  BarChart3,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HelpChatbot } from './components/HelpChatbot';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  to: string;
}

const clubHeadItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Overview', to: '/club-head' },
  { icon: FileText, label: 'Proposals', to: '/club-head/proposals' },
  { icon: DollarSign, label: 'Fund Requests', to: '/club-head/funds' },
  { icon: Calendar, label: 'Events', to: '/club-head/events' },
  { icon: Building, label: 'Room Booking', to: '/club-head/rooms' },
  { icon: MessageSquare, label: 'Negotiations', to: '/club-head/chat' },
  { icon: Video, label: 'Meetings', to: '/club-head/meetings' },
];

const clubItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/club' },
  { icon: Edit, label: 'Update Details', to: '/club/update-details' },
  { icon: Building, label: 'Book Rooms', to: '/club/book-rooms' },
  { icon: FileText, label: 'Submit Bills', to: '/club/submit-bills' },
  { icon: Calendar, label: 'Pitch Events', to: '/club/pitch-events' },
  { icon: DollarSign, label: 'Request Funds', to: '/club/request-funds' },
];

const adminItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
  { icon: CheckSquare, label: 'Review Submissions', to: '/admin/review' },
  { icon: BarChart3, label: 'Analytics', to: '/admin/analytics' },
  { icon: MessageSquare, label: 'Chat with Clubs', to: '/admin/chat-clubs' },
];

const councilItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/council' },
  { icon: CheckSquare, label: 'Approvals', to: '/council/approvals' },
  { icon: DollarSign, label: 'Budget Overview', to: '/council/budget' },
  { icon: PieChart, label: 'Analytics', to: '/council/analytics' },
  { icon: Video, label: 'Pitch Schedules', to: '/council/pitches' },
  { icon: Users, label: 'Clubs List', to: '/council/clubs' },
];

const studentItems: SidebarItem[] = [
  { icon: Search, label: 'Explore Clubs', to: '/student' },
  { icon: Calendar, label: 'Events', to: '/student/events' },
  { icon: Users, label: 'My Memberships', to: '/student/memberships' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  let items = studentItems;
  let portalName = 'Student Portal';
  let userRole = 'Student';

  if (location.pathname.startsWith('/club-head')) {
    items = clubHeadItems;
    portalName = 'Club Head Portal';
    userRole = 'Club President';
  } else if (location.pathname.startsWith('/club')) {
    items = clubItems;
    portalName = 'Club Portal';
    userRole = 'Club President';
  } else if (location.pathname.startsWith('/admin')) {
    items = adminItems;
    portalName = 'Admin Portal';
    userRole = 'Admin';
  } else if (location.pathname.startsWith('/council')) {
    items = councilItems;
    portalName = 'Council Portal';
    userRole = 'Council Admin';
  }

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#0b1120] text-gray-100 font-sans overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-gray-800 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">C</span>
            </div>
            <span>ClubSphere</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {portalName}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/club-head' || item.to === '/council' || item.to === '/student' || item.to === '/club' || item.to === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                isActive 
                  ? "bg-blue-600/10 text-blue-500" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Portal Switcher for Demo */}
        <div className="px-4 py-4 border-t border-gray-800">
            <p className="text-xs text-gray-600 font-medium mb-2 px-2 uppercase">Demo Navigation</p>
            <div className="space-y-1">
                <button 
                    onClick={() => navigate('/student')}
                    className={cn("w-full text-left px-4 py-2 text-xs rounded-lg hover:bg-gray-800 transition-colors", location.pathname.startsWith('/student') ? "text-blue-400 bg-blue-500/5" : "text-gray-500")}
                >
                    Switch to Student
                </button>
                <button 
                    onClick={() => navigate('/club')}
                    className={cn("w-full text-left px-4 py-2 text-xs rounded-lg hover:bg-gray-800 transition-colors", location.pathname.startsWith('/club') && !location.pathname.startsWith('/club-head') ? "text-blue-400 bg-blue-500/5" : "text-gray-500")}
                >
                    Switch to Club
                </button>
                <button 
                    onClick={() => navigate('/admin')}
                    className={cn("w-full text-left px-4 py-2 text-xs rounded-lg hover:bg-gray-800 transition-colors", location.pathname.startsWith('/admin') ? "text-blue-400 bg-blue-500/5" : "text-gray-500")}
                >
                    Switch to Admin
                </button>
                <button 
                    onClick={() => navigate('/club-head')}
                    className={cn("w-full text-left px-4 py-2 text-xs rounded-lg hover:bg-gray-800 transition-colors", location.pathname.startsWith('/club-head') ? "text-blue-400 bg-blue-500/5" : "text-gray-500")}
                >
                    Switch to Club Head (Legacy)
                </button>
                <button 
                    onClick={() => navigate('/council')}
                    className={cn("w-full text-left px-4 py-2 text-xs rounded-lg hover:bg-gray-800 transition-colors", location.pathname.startsWith('/council') ? "text-blue-400 bg-blue-500/5" : "text-gray-500")}
                >
                    Switch to Council
                </button>
            </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl w-full transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#0b1120]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white hidden sm:block">
              {portalName}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-800 mx-2"></div>
            
            <div className="relative">
                <button 
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 hover:bg-gray-800/50 p-1.5 rounded-lg transition-colors"
                >
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-white">Alex Chen</div>
                        <div className="text-xs text-gray-500">{userRole}</div>
                    </div>
                    <img 
                        src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop" 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full border border-gray-700"
                    />
                    <ChevronDown size={16} className="text-gray-500" />
                </button>

                {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-gray-800 rounded-xl shadow-xl py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-800 mb-1">
                            <p className="text-sm font-medium text-white">Alex Chen</p>
                            <p className="text-xs text-gray-500 truncate">alex@clubsphere.edu</p>
                        </div>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2">
                            <Settings size={16} />
                            Settings
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent bg-[#0b1120]">
          <div className="max-w-7xl mx-auto space-y-6 pb-10">
            {children}
          </div>
        </main>
      </div>

      {/* Help Chatbot */}
      <HelpChatbot />
    </div>
  );
}