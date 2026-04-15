import React from 'react';
import { 
  Plus, 
  Upload, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  Building 
} from 'lucide-react';
import { Link } from 'react-router';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';
import { mockClubs } from '../../data/mockData';

function QuickAction({ icon: Icon, label, to, color }: any) {
  return (
    <Link to={to} className="bg-[#111827] p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-3 group text-center h-32">
      <div className={`p-3 rounded-full ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <span className="font-medium text-gray-300 group-hover:text-white">{label}</span>
    </Link>
  );
}

export function ClubHeadOverview() {
  const club = mockClubs.find(c => c.name === 'Robotics Club') || mockClubs[0];

  return (
    <div className="space-y-8">
      {/* Club Header */}
      <div className="bg-[#111827] rounded-xl p-6 border border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
          <img 
            src={club.logo} 
            alt={club.name} 
            className="w-24 h-24 rounded-2xl object-cover border-4 border-[#0b1120] shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{club.name}</h1>
            <p className="text-gray-400 max-w-2xl">{club.description}</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Health Score: <span className="text-white font-semibold">{club.healthScore}/100</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Members: <span className="text-white font-semibold">{club.members}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <Link to="/club-head/proposals/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
               <Plus size={18} />
               New Proposal
             </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction 
          icon={FileText} 
          label="Draft Proposal" 
          to="/club-head/proposals/new" 
          color="bg-purple-500/10 text-purple-500"
        />
        <QuickAction 
          icon={DollarSign} 
          label="Request Funds" 
          to="/club-head/funds" 
          color="bg-green-500/10 text-green-500"
        />
        <QuickAction 
          icon={Building} 
          label="Book Room" 
          to="/club-head/rooms" 
          color="bg-orange-500/10 text-orange-500"
        />
        <QuickAction 
          icon={MessageSquare} 
          label="Chat Council" 
          to="/club-head/chat" 
          color="bg-blue-500/10 text-blue-500"
        />
      </div>

      {/* Analytics Section */}
      <div>
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Club Analytics</h2>
          <AnalyticsDashboard />
        </div>
      </div>
    </div>
  );
}