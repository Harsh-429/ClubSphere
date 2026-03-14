
import React from 'react';
import { Search, Filter, Users, Calendar, ArrowRight } from 'lucide-react';
import { mockClubs } from '../../data/mockData';
import { Link } from 'react-router';

export function StudentDashboard() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('All');

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || club.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Technology', 'Academic', 'Environment', 'Arts', 'Sports'];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Discover Campus Life</h1>
        <p className="text-gray-400 text-lg">Join clubs, attend events, and find your community at ClubFlow.</p>
        
        <div className="mt-8 relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for clubs (e.g. 'Robotics', 'Debate')..." 
            className="w-full bg-[#111827] border border-gray-700 rounded-full px-6 py-4 pl-12 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-lg shadow-blue-900/10 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              categoryFilter === category 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-[#111827] text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClubs.map((club) => (
          <div key={club.id} className="group bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col h-full">
            <div className="h-32 bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative">
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                {club.category}
              </div>
            </div>
            <div className="px-6 pb-6 flex-1 flex flex-col relative">
              <div className="-mt-10 mb-4">
                <img 
                  src={club.logo} 
                  alt={club.name} 
                  className="w-20 h-20 rounded-xl object-cover border-4 border-[#111827] shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {club.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                {club.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={16} />
                  <span>{club.members} Members</span>
                </div>
                <Link 
                  to={`/student/clubs/${club.id}`} 
                  className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-400 group/btn"
                >
                  View Details
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClubs.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex p-4 rounded-full bg-gray-800/50 mb-4">
            <Search size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No clubs found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
