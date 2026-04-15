
import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare, Share, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';

export function VideoCall() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  return (
    <div className="h-[calc(100vh-8rem)] bg-[#111827] rounded-xl overflow-hidden flex flex-col relative border border-gray-800">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 relative">
        {/* Main Speaker */}
        <div className="lg:col-span-2 relative bg-[#0b1120] rounded-xl overflow-hidden border border-gray-700">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
            alt="Main Speaker" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
            Dr. Sarah Reynolds (Faculty Advisor)
          </div>
          <div className="absolute top-4 right-4 bg-red-500 w-3 h-3 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
        </div>

        {/* Participants Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 relative bg-[#0b1120] rounded-xl overflow-hidden border border-gray-700">
            <img 
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&q=80" 
              alt="You" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
              You (Alex Chen)
            </div>
          </div>
          <div className="flex-1 relative bg-[#0b1120] rounded-xl overflow-hidden border border-gray-700 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
              John Doe (Council)
            </div>
            <div className="absolute bottom-4 right-4 bg-gray-800 p-1.5 rounded-full">
              <MicOff size={14} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-[#1f2937] border-t border-gray-800 flex items-center justify-center gap-6 px-6">
        <button 
          onClick={() => setMicOn(!micOn)}
          className={`p-4 rounded-full transition-all ${micOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        <button 
          onClick={() => setVideoOn(!videoOn)}
          className={`p-4 rounded-full transition-all ${videoOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
        >
          {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        
        <button className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors mx-4 shadow-lg shadow-red-900/50" onClick={() => navigate(-1)}>
          <PhoneOff size={24} />
        </button>

        <button className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors hidden sm:block">
          <Share size={24} />
        </button>
        <button className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors hidden sm:block">
          <Users size={24} />
        </button>
        <button className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors hidden sm:block">
          <MessageSquare size={24} />
        </button>
      </div>

      <div className="absolute top-6 left-6 bg-[#1f2937]/90 backdrop-blur-md px-4 py-2 rounded-lg text-white font-medium border border-gray-700 shadow-xl">
        Budget Review Meeting
        <span className="ml-3 text-gray-400 text-sm font-normal">00:12:45</span>
      </div>
    </div>
  );
}
