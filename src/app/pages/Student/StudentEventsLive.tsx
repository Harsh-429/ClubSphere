import React, { useState } from 'react';
import { ArrowRight, Calendar, Filter, MapPin, Users } from 'lucide-react';
import { useLiveData } from '../../state/LiveDataContext';

export function StudentEventsLive() {
  const { studentEvents } = useLiveData();
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = studentEvents.filter((event) => filterType === 'all' || event.status === filterType);

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl py-4 text-center">
        <h1 className="text-4xl font-bold text-white">Campus Events</h1>
        <p className="mt-3 text-lg text-gray-400">Approved club events show up here automatically with their latest details.</p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-[#111827] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Filter size={18} className="text-gray-400" />
          Filter
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'upcoming', 'past'] as const).map((type) => (
            <button key={type} onClick={() => setFilterType(type)} className={`rounded-lg px-4 py-2 text-sm font-medium ${filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <div key={event.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] transition-all duration-300 hover:border-gray-700 hover:shadow-xl hover:shadow-blue-900/10">
            <div className="relative h-48 overflow-hidden">
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="mb-2 inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-medium text-white">{event.clubName}</span>
                <h3 className="text-xl font-bold text-white">{event.title}</h3>
              </div>
            </div>
            <div className="space-y-3 p-5">
              <p className="text-sm text-gray-400">{event.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400"><Calendar size={16} className="text-blue-400" />{new Date(event.date).toLocaleDateString()}</div>
              <div className="flex items-center gap-2 text-sm text-gray-400"><MapPin size={16} className="text-blue-400" />{event.location}</div>
              <div className="flex items-center gap-2 text-sm text-gray-400"><Users size={16} className="text-blue-400" />{event.attendees} expected attendees</div>
              {event.targetAudience && <p className="text-sm text-gray-500">Audience: {event.targetAudience}</p>}
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700">
                View Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
