import React from 'react';
import { ArrowLeft, Calendar, Mail, MapPin, UserPlus, Users } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useLiveData } from '../../state/LiveDataContext';

export function ClubDetailsLive() {
  const { id } = useParams<{ id: string }>();
  const { clubs, studentEvents } = useLiveData();
  const club = clubs.find((item) => item.id === id) || clubs[0];
  const clubEvents = studentEvents.filter((event) => event.clubId === club.id).slice(0, 3);

  return (
    <div className="space-y-6">
      <Link to="/student" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
        <ArrowLeft size={18} />
        Back to Clubs
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <div className="h-48 bg-gradient-to-br from-blue-900/30 to-cyan-900/20" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-6 md:flex-row md:items-end">
            <img src={club.logo} alt={club.name} className="h-24 w-24 rounded-2xl border-4 border-[#111827] object-cover" />
            <div className="flex-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{club.name}</h1>
                  <p className="mt-2 text-gray-400">{club.description}</p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-500"><Mail size={14} />{club.name.toLowerCase().replace(/\\s+/g, '')}@clubflow.edu</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
                  <UserPlus size={18} />
                  Join Club
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Members" value={club.members.toString()} />
        <Stat label="Health Score" value={`${club.healthScore}%`} />
        <Stat label="President" value={club.president} />
        <Stat label="Live Events" value={clubEvents.length.toString()} />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">Upcoming Events</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {clubEvents.map((event) => (
            <div key={event.id} className="rounded-xl border border-gray-800 bg-[#111827] p-4">
              <h3 className="font-semibold text-white">{event.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{event.description}</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Calendar size={14} />{new Date(event.date).toLocaleDateString()}</div>
                <div className="flex items-center gap-2"><MapPin size={14} />{event.location}</div>
                <div className="flex items-center gap-2"><Users size={14} />{event.attendees} expected attendees</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
