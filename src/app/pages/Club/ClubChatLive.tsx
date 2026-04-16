import React, { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Send, Video } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { getFormattedMessageTime, useLiveData } from '../../state/LiveDataContext';

export function ClubChatLive() {
  const navigate = useNavigate();
  const { currentClub, conversations, sendMessage, markConversationRead } = useLiveData();
  const [messageText, setMessageText] = useState('');
  const conversation = useMemo(
    () => conversations.find((item) => item.clubId === currentClub.id) || conversations[0],
    [conversations, currentClub.id],
  );

  useEffect(() => {
    if (conversation) {
      markConversationRead(conversation.clubId, 'club');
    }
  }, [conversation, markConversationRead]);

  if (!conversation) {
    return null;
  }

  const handleSend = () => {
    if (!messageText.trim()) {
      return;
    }
    sendMessage(conversation.clubId, 'club', messageText.trim());
    setMessageText('');
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />

      <div>
        <h1 className="text-3xl font-bold text-white">Club Chat</h1>
        <p className="mt-2 text-gray-400">Messages sync with the admin account in real time.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MessageCircle size={18} />
              Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <button className="w-full rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-left">
              <p className="font-semibold text-white">Admin Desk</p>
              <p className="mt-1 text-sm text-gray-400">Shared with {currentClub.name}</p>
            </button>
          </CardContent>
        </Card>

        <Card className="flex min-h-[70vh] flex-col border-gray-800 bg-[#111827]">
          <CardHeader className="border-b border-gray-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Admin Desk</h2>
                <p className="text-sm text-gray-400">Live conversation for {currentClub.name}</p>
              </div>
              <Button onClick={() => navigate('/club/video-meet')} className="bg-blue-600 text-white hover:bg-blue-700">
                <Video size={16} className="mr-2" />
                Video Meet
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {conversation.messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderRole === 'club' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-full rounded-2xl px-4 py-3 sm:max-w-[75%] ${message.senderRole === 'club' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`mt-2 text-xs ${message.senderRole === 'club' ? 'text-blue-100' : 'text-gray-500'}`}>{getFormattedMessageTime(message.timestamp)}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="border-t border-gray-800 p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="bg-gray-800 text-white" />
              <Button onClick={handleSend} disabled={!messageText.trim()} className="bg-blue-600 text-white hover:bg-blue-700">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
