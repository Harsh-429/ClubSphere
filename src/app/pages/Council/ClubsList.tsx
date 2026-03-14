import React, { useState } from 'react';
import { Search, Users, TrendingUp, TrendingDown, Filter, Award } from 'lucide-react';
import { mockClubs } from '../../data/mockData';

export function ClubsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'members' | 'health'>('name');

  const filteredAndSortedClubs = mockClubs
    .filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'members') return b.members - a.members;
      if (sortBy === 'health') return b.healthScore - a.healthScore;
      return 0;
    });

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (score >= 75) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  const totalMembers = mockClubs.reduce((sum, club) => sum + club.members, 0);
  const avgHealthScore = Math.round(
    mockClubs.reduce((sum, club) => sum + club.healthScore, 0) / mockClubs.length
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Clubs Management</h1>
        <p className="text-gray-400">Monitor and manage all campus clubs</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Clubs</span>
            <Users size={20} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{mockClubs.length}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Members</span>
            <Users size={20} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{totalMembers.toLocaleString()}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg Health Score</span>
            <Award size={20} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{avgHealthScore}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active This Month</span>
            <TrendingUp size={20} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{mockClubs.filter(c => c.healthScore > 80).length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="members">Sort by Members</option>
            <option value="health">Sort by Health Score</option>
          </select>
        </div>
      </div>

      {/* Clubs Table */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Club</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">President</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Members</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Health Score</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredAndSortedClubs.map((club) => (
                <tr key={club.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">{club.name}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{club.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm">
                      {club.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{club.president}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-400" />
                      <span className="text-white font-medium">{club.members}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${getHealthColor(
                        club.healthScore
                      )}`}
                    >
                      <Award size={14} />
                      {club.healthScore}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {club.healthScore >= 85 ? (
                      <div className="flex items-center gap-1 text-green-400">
                        <TrendingUp size={16} />
                        <span className="text-sm">Growing</span>
                      </div>
                    ) : club.healthScore >= 75 ? (
                      <div className="flex items-center gap-1 text-blue-400">
                        <TrendingUp size={16} />
                        <span className="text-sm">Stable</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <TrendingDown size={16} />
                        <span className="text-sm">Attention</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
