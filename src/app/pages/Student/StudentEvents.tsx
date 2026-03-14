import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, ArrowRight } from 'lucide-react';
import { mockEvents } from '../../data/mockData';

export function StudentEvents() {
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesType = filterType === 'all' || event.status === filterType;
    const matchesCategory = selectedCategory === 'All' || event.clubName.includes(selectedCategory);
    return matchesType && matchesCategory;
  });

  const categories = ['All', 'Technology', 'Arts', 'Business', 'Academic', 'Environment', 'Sports'];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto py-4">
        <h1 className="text-4xl font-bold text-white mb-3">Campus Events</h1>
        <p className="text-gray-400 text-lg">
          Discover and join exciting events happening across campus
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-between bg-[#111827] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filter by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('upcoming')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilterType('past')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="group bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                  {event.clubName}
                </span>
                <h3 className="text-xl font-bold text-white line-clamp-2">{event.title}</h3>
              </div>
              {event.status === 'past' && (
                <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  Completed
                </div>
              )}
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={16} className="text-blue-400" />
                <span>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} className="text-blue-400" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users size={16} className="text-blue-400" />
                <span>{event.attendees} {event.status === 'past' ? 'Attended' : 'Expected'}</span>
              </div>

              {event.status === 'upcoming' && (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-4">
                  Register Now
                  <ArrowRight size={16} />
                </button>
              )}

              {event.status === 'past' && (
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-4">
                  View Details
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex p-4 rounded-full bg-gray-800/50 mb-4">
            <Calendar size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your filters to find events.</p>
        </div>
      )}
    </div>
  );
}
