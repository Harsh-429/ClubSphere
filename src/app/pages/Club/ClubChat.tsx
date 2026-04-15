import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { BackButton } from '../../components/BackButton';
import {
  MessageCircle,
  Send,
  Paperclip,
  Video,
  Phone,
  Search,
  MoreVertical,
  CheckCheck,
  Shield,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  isRead: boolean;
}

export function ClubChat() {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Council President',
      avatar: 'SJ',
      lastMessage: 'Your fund request has been approved',
      timestamp: '10:30 AM',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Faculty Advisor',
      role: 'Prof. Michael Brown',
      avatar: 'MB',
      lastMessage: 'Please submit the event proposal by Friday',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
    },
    {
      id: '3',
      name: 'Finance Committee',
      role: 'Council Member',
      avatar: 'FC',
      lastMessage: 'Budget review scheduled for next week',
      timestamp: '2 days ago',
      unread: 1,
      online: true,
    },
    {
      id: '4',
      name: 'Robotics Club',
      role: 'Club Head',
      avatar: 'RC',
      lastMessage: 'Want to collaborate on the tech fest?',
      timestamp: '3 days ago',
      unread: 0,
      online: false,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hi! I reviewed your fund request for the Annual Hackathon.',
      timestamp: '10:25 AM',
      isSent: false,
      isRead: true,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Thank you! Do you need any additional documentation?',
      timestamp: '10:27 AM',
      isSent: true,
      isRead: true,
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'No, everything looks good. Your fund request has been approved!',
      timestamp: '10:30 AM',
      isSent: false,
      isRead: true,
    },
    {
      id: '4',
      sender: 'Sarah Johnson',
      content: 'The funds will be transferred to your club account by tomorrow.',
      timestamp: '10:30 AM',
      isSent: false,
      isRead: false,
    },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // In production, send message to backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <BackButton to="/club" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 mt-2">Chat with council members and other clubs</p>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Contacts List */}
        <Card className="bg-[#111827] border-gray-800 lg:col-span-1">
          <CardHeader className="border-b border-gray-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <MessageCircle size={20} />
                Conversations
              </CardTitle>
            </div>
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-600"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-y-auto max-h-[calc(100vh-420px)]">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-800/50 transition-colors border-b border-gray-800 ${
                    selectedContact?.id === contact.id ? 'bg-gray-800/50' : ''
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                        contact.role.includes('Council') || contact.role.includes('Prof')
                          ? 'bg-purple-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111827]" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-semibold text-white text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.role}</p>
                      </div>
                      <span className="text-xs text-gray-500">{contact.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate max-w-[200px]">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="bg-[#111827] border-gray-800 lg:col-span-2 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                          selectedContact.role.includes('Council') ||
                          selectedContact.role.includes('Prof')
                            ? 'bg-purple-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {selectedContact.avatar}
                      </div>
                      {selectedContact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111827]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedContact.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedContact.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => navigate('/club/video-meet')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Video size={18} className="mr-2" />
                      Video Call
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isSent ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.isSent
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-800 text-white rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-2">
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.isSent && (
                          <CheckCheck
                            size={14}
                            className={message.isRead ? 'text-blue-500' : 'text-gray-500'}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <Paperclip size={20} />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-600"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
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
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-gray-600" size={40} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                <p className="text-gray-400">
                  Choose a contact from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
