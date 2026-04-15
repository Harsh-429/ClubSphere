import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BackButton } from '../../components/BackButton';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MonitorUp,
  Users,
  MessageCircle,
  Settings,
  PhoneOff,
  Volume2,
  Grid3x3,
  Maximize,
} from 'lucide-react';
import { useNavigate } from 'react-router';

interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isMuted: boolean;
  isVideoOn: boolean;
}

export function ClubVideoMeet() {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inCall, setInCall] = useState(false);

  const participants: Participant[] = [
    {
      id: '1',
      name: 'You (Alex Chen)',
      role: 'Tech Club President',
      avatar: 'AC',
      isMuted: false,
      isVideoOn: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Council President',
      avatar: 'SJ',
      isMuted: false,
      isVideoOn: true,
    },
    {
      id: '3',
      name: 'Prof. Michael Brown',
      role: 'Faculty Advisor',
      avatar: 'MB',
      isMuted: true,
      isVideoOn: false,
    },
  ];

  const handleEndCall = () => {
    setInCall(false);
    navigate('/club/chat');
  };

  const handleStartCall = () => {
    setInCall(true);
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club/chat" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Video Meeting</h1>
        <p className="text-gray-400 mt-2">Collaborate with council members and faculty</p>
      </div>

      {!inCall ? (
        /* Pre-Call Setup */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                {/* Video Preview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                      <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">AC</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center">
                        <VideoOff className="text-gray-600" size={48} />
                      </div>
                      <p className="text-gray-400">Camera is off</p>
                    </div>
                  )}
                </div>

                {/* Preview Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <Button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`rounded-full w-12 h-12 ${
                      isVideoOn
                        ? 'bg-gray-800 hover:bg-gray-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                  </Button>
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`rounded-full w-12 h-12 ${
                      !isMuted
                        ? 'bg-gray-800 hover:bg-gray-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {!isMuted ? <Mic size={20} /> : <MicOff size={20} />}
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://clubsphere.edu/meet/tech-club-meeting"
                      readOnly
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Copy</Button>
                  </div>
                </div>

                <Button
                  onClick={handleStartCall}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
                >
                  <Video size={24} className="mr-2" />
                  Join Meeting
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meeting Info */}
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Budget Review Meeting</h3>
                <p className="text-sm text-gray-400">Scheduled for today at 3:00 PM</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Participants (3)</h4>
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{participant.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{participant.name}</p>
                        <p className="text-xs text-gray-500">{participant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Meeting Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Join with mic muted</span>
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-gray-800" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Join with camera off</span>
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-gray-800" />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* In-Call Interface */
        <div className="space-y-4">
          <Card className="bg-[#111827] border-gray-800">
            <CardContent className="p-4">
              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                    {participant.isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">{participant.avatar}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white text-xl font-bold">{participant.avatar}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{participant.name}</p>
                        </div>
                      </div>
                    )}

                    {/* Participant Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{participant.name}</span>
                        <div className="flex items-center gap-2">
                          {participant.isMuted && (
                            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                              <MicOff size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Screen Share Indicator */}
              {isScreenSharing && (
                <div className="mb-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MonitorUp className="text-blue-500" size={24} />
                    <div>
                      <p className="text-white font-medium">You are sharing your screen</p>
                      <p className="text-sm text-gray-400">Others can see your screen</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Meeting Controls */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`rounded-full w-14 h-14 ${
                    !isMuted
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {!isMuted ? <Mic size={24} /> : <MicOff size={24} />}
                </Button>

                <Button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`rounded-full w-14 h-14 ${
                    isVideoOn
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                  title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                </Button>

                <Button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`rounded-full w-14 h-14 ${
                    isScreenSharing
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                  title="Share screen"
                >
                  <MonitorUp size={24} />
                </Button>

                <Button
                  onClick={() => setShowParticipants(!showParticipants)}
                  className="rounded-full w-14 h-14 bg-gray-800 hover:bg-gray-700 text-white"
                  title="Participants"
                >
                  <Users size={24} />
                </Button>

                <Button
                  onClick={() => setShowChat(!showChat)}
                  className="rounded-full w-14 h-14 bg-gray-800 hover:bg-gray-700 text-white"
                  title="Chat"
                >
                  <MessageCircle size={24} />
                </Button>

                <Button
                  onClick={handleEndCall}
                  className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700 text-white"
                  title="End call"
                >
                  <PhoneOff size={24} />
                </Button>

                <Button
                  className="rounded-full w-14 h-14 bg-gray-800 hover:bg-gray-700 text-white"
                  title="Settings"
                >
                  <Settings size={24} />
                </Button>
              </div>

              {/* Meeting Info Bar */}
              <div className="mt-4 flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-white font-medium">Recording</span>
                  </div>
                  <span className="text-sm text-gray-400">Meeting Time: 00:15:32</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Volume2 size={16} />
                  <span>Stable connection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
