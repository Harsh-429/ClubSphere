import React from 'react';
import { useParams } from 'react-router';
import { Users, Calendar, Award, MapPin, Mail, UserPlus, ArrowLeft } from 'lucide-react';
import { mockClubs, mockEvents } from '../../data/mockData';
import { Link } from 'react-router';

export function ClubDetails() {
  const { id } = useParams<{ id: string }>();
  const club = mockClubs.find((c) => c.id === id) || mockClubs[0];
  const clubEvents = mockEvents.filter((e) => e.clubName === club.name).slice(0, 3);

  return (
    <div className="space-y-6">
      <Link
        to="/student"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Clubs
      </Link>

      {/* Club Header */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent" />
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
            <img
              src={club.logo}
              alt={club.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-[#111827] shadow-2xl"
            />
            <div className="flex-1 pt-16 md:pt-20">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">{club.name}</h1>
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                      {club.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg mb-4">{club.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail size={16} className="text-blue-400" />
                    <span>{club.name.toLowerCase().replace(/\s+/g, '')}@clubflow.edu</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/25">
                  <UserPlus size={20} />
                  Join Club
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-blue-400" />
            <span className="text-gray-400 text-sm">Members</span>
          </div>
          <p className="text-2xl font-bold text-white">{club.members}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} className="text-green-400" />
            <span className="text-gray-400 text-sm">Events/Year</span>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Award size={20} className="text-yellow-400" />
            <span className="text-gray-400 text-sm">Health Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{club.healthScore}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-purple-400" />
            <span className="text-gray-400 text-sm">President</span>
          </div>
          <p className="text-lg font-semibold text-white">{club.president}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
        {clubEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clubEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all group"
              >
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white line-clamp-2">{event.title}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={14} className="text-blue-400" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={14} className="text-blue-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">No upcoming events scheduled</p>
          </div>
        )}
      </div>

      {/* About */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">About {club.name}</h2>
        <p className="text-gray-400 leading-relaxed mb-6">{club.description}</p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">What We Do</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Regular workshops and hands-on sessions</li>
              <li>Participation in inter-college competitions</li>
              <li>Networking events with industry professionals</li>
              <li>Collaborative projects and team building activities</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">How to Join</h3>
            <p className="text-gray-400">
              Click the "Join Club" button above to submit your membership request. Our team will review and
              approve within 24 hours. All students are welcome!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
