import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { BackButton } from '../../components/BackButton';
import {
  Search,
  Send,
  Video,
  Phone,
  Paperclip,
  MoreVertical,
  X,
} from 'lucide-react';

interface Club {
  id: string;
  name: string;
  president: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: 'admin' | 'club';
  senderName: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export function ChatWithClubs() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const clubs: Club[] = [
    {
      id: '1',
      name: 'Coding Club',
      president: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
      lastMessage: 'Thank you for approving the hackathon fund request!',
      lastMessageTime: '5m ago',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Robotics Club',
      president: 'Jamie Lee',
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
      lastMessage: 'Can we discuss the equipment purchase timeline?',
      lastMessageTime: '1h ago',
      unread: 1,
      online: true,
    },
    {
      id: '3',
      name: 'Drama Society',
      president: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=100&h=100&fit=crop',
      lastMessage: 'We need approval for the auditorium booking',
      lastMessageTime: '3h ago',
      unread: 0,
      online: false,
    },
    {
      id: '4',
      name: 'Photography Club',
      president: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop',
      lastMessage: 'The photo exhibition was a success!',
      lastMessageTime: '1d ago',
      unread: 0,
      online: false,
    },
    {
      id: '5',
      name: 'E-Cell',
      president: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=100&fit=crop',
      lastMessage: 'Guest speaker confirmation needed',
      lastMessageTime: '2d ago',
      unread: 3,
      online: true,
    },
  ];

  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        sender: 'club',
        senderName: 'Alex Chen',
        message: 'Hi! We submitted a fund request for the Annual Hackathon. Could you review it?',
        timestamp: '10:30 AM',
        avatar: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop',
      },
      {
        id: '2',
        sender: 'admin',
        senderName: 'You',
        message: "I've reviewed your request. It looks comprehensive! I have a few questions about the prize distribution.",
        timestamp: '10:35 AM',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
      {
        id: '3',
        sender: 'club',
        senderName: 'Alex Chen',
        message: 'Sure! We plan to have 3 categories with prizes for top 3 teams in each category.',
        timestamp: '10:38 AM',
        avatar: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop',
      },
      {
        id: '4',
        sender: 'admin',
        senderName: 'You',
        message: 'Perfect! Your request has been approved. Good luck with the hackathon!',
        timestamp: '10:42 AM',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
      {
        id: '5',
        sender: 'club',
        senderName: 'Alex Chen',
        message: 'Thank you for approving the hackathon fund request!',
        timestamp: '10:45 AM',
        avatar: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop',
      },
    ],
    '2': [
      {
        id: '1',
        sender: 'club',
        senderName: 'Jamie Lee',
        message: 'Hello! Our equipment order was approved. When can we expect the funds?',
        timestamp: '2:15 PM',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      {
        id: '2',
        sender: 'admin',
        senderName: 'You',
        message: 'The funds will be transferred within 3-5 business days. You\'ll receive a confirmation email.',
        timestamp: '2:20 PM',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
      {
        id: '3',
        sender: 'club',
        senderName: 'Jamie Lee',
        message: 'Can we discuss the equipment purchase timeline?',
        timestamp: '2:25 PM',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
    ],
  };

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.president.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedClub) return;

    toast.success('Message sent!');
    setMessageText('');
  };

  const handleVideoCall = () => {
    if (!selectedClub) return;
    toast.success(`Starting video call with ${selectedClub.name}...`);
  };

  const handleVoiceCall = () => {
    if (!selectedClub) return;
    toast.success(`Starting voice call with ${selectedClub.name}...`);
  };

  const handleAttachment = () => {
    toast('File attachment feature', { icon: '📎' });
  };

  return (
    <div className="space-y-6">
      <BackButton to="/admin" />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Chat with Clubs</h1>
        <p className="text-gray-400 mt-2">Direct communication with club representatives</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
        {/* Clubs List */}
        <Card className="bg-[#111827] border-gray-800 lg:col-span-1">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search clubs..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Clubs */}
            <div className="flex-1 overflow-y-auto">
              {filteredClubs.map((club) => (
                <div
                  key={club.id}
                  onClick={() => setSelectedClub(club)}
                  className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                    selectedClub?.id === club.id ? 'bg-blue-600/10' : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={club.avatar}
                        alt={club.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {club.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white truncate">{club.name}</h3>
                        {club.unread > 0 && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                            {club.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 truncate">{club.lastMessage}</p>
                      <p className="text-xs text-gray-600 mt-1">{club.lastMessageTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="bg-[#111827] border-gray-800 lg:col-span-2">
          <CardContent className="p-0 h-full flex flex-col">
            {selectedClub ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={selectedClub.avatar}
                        alt={selectedClub.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedClub.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedClub.name}</h3>
                      <p className="text-sm text-gray-400">President: {selectedClub.president}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleVoiceCall}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Phone size={18} />
                    </Button>
                    <Button
                      onClick={handleVideoCall}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Video size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <MoreVertical size={18} />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages[selectedClub.id]?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'admin' ? 'flex-row-reverse' : ''}`}
                    >
                      <img
                        src={msg.avatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className={`flex-1 max-w-[70%] ${msg.sender === 'admin' ? 'items-end' : ''}`}>
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            msg.sender === 'admin'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800 text-white'
                          }`}
                        >
                          <p>{msg.message}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleAttachment}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Paperclip size={18} />
                    </Button>
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Club</h3>
                  <p className="text-gray-400">Choose a club from the list to start chatting</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}