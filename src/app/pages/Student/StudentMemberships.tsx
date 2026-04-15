import React from 'react';
import { Users, Calendar, TrendingUp, Award, MessageSquare, LogOut } from 'lucide-react';
import { mockClubs } from '../../data/mockData';

const myMemberships = mockClubs.slice(0, 4);

export function StudentMemberships() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Memberships</h1>
        <p className="text-gray-400">Clubs you're part of and your engagement stats</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active Memberships</span>
            <Users size={20} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{myMemberships.length}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Events Attended</span>
            <Calendar size={20} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">12</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Engagement Score</span>
            <TrendingUp size={20} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">87%</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Achievements</span>
            <Award size={20} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">5</p>
        </div>
      </div>

      {/* My Clubs */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Your Clubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myMemberships.map((club) => (
            <div
              key={club.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative">
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                  {club.category}
                </div>
              </div>
              <div className="p-6 relative">
                <div className="-mt-16 mb-4">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-24 h-24 rounded-xl object-cover border-4 border-[#111827] shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{club.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{club.description}</p>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{club.members}</p>
                    <p className="text-xs text-gray-500">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{club.healthScore}</p>
                    <p className="text-xs text-gray-500">Health Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-xs text-gray-500">Events/Mo</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                    <MessageSquare size={16} />
                    Message
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg font-medium transition-colors">
                    <LogOut size={16} />
                    Leave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl divide-y divide-gray-800">
          {[
            { type: 'event', club: 'Robotics Club', action: 'Attended AI Workshop', date: '2 days ago', icon: Calendar },
            { type: 'achievement', club: 'Coding Club', action: 'Earned "Code Master" badge', date: '5 days ago', icon: Award },
            { type: 'event', club: 'Photography Club', action: 'Registered for Photo Exhibition', date: '1 week ago', icon: Calendar },
            { type: 'member', club: 'Drama Society', action: 'Joined the club', date: '2 weeks ago', icon: Users },
          ].map((activity, idx) => (
            <div key={idx} className="p-5 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <activity.icon size={20} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">{activity.club}</span>
                    <span className="text-gray-700">•</span>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
