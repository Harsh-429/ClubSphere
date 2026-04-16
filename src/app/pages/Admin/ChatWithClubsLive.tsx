import React, { useEffect, useState } from 'react';
import { Search, Send, Video } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { getConversationPreview, getFormattedMessageTime, useLiveData } from '../../state/LiveDataContext';

export function ChatWithClubsLive() {
  const { conversations, sendMessage, markConversationRead } = useLiveData();
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [selectedClubId, setSelectedClubId] = useState(conversations[0]?.clubId || '');

  const filteredConversations = conversations.filter((conversation) =>
    conversation.clubName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const selectedConversation =
    filteredConversations.find((conversation) => conversation.clubId === selectedClubId) ||
    filteredConversations[0];

  useEffect(() => {
    if (selectedConversation) {
      markConversationRead(selectedConversation.clubId, 'admin');
      setSelectedClubId(selectedConversation.clubId);
    }
  }, [selectedConversation, markConversationRead]);

  const handleSend = () => {
    if (!selectedConversation || !messageText.trim()) {
      return;
    }
    sendMessage(selectedConversation.clubId, 'admin', messageText.trim());
    setMessageText('');
  };

  return (
    <div className="space-y-6">
      <BackButton to="/admin" />

      <div>
        <h1 className="text-3xl font-bold text-white">Chat With Clubs</h1>
        <p className="mt-2 text-gray-400">Messages appear in the matching club account instantly.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_1fr]">
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-white">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search clubs..." className="bg-gray-800 pl-10 text-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredConversations.map((conversation) => {
              const preview = getConversationPreview(conversation);
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedClubId(conversation.clubId)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${selectedClubId === conversation.clubId ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{conversation.clubName}</p>
                      <p className="mt-1 truncate text-sm text-gray-400">{preview.lastMessage}</p>
                    </div>
                    {preview.unread > 0 && <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">{preview.unread}</span>}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{preview.lastMessageTime}</p>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="flex min-h-[70vh] flex-col border-gray-800 bg-[#111827]">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b border-gray-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedConversation.clubName}</h2>
                    <p className="text-sm text-gray-400">President: {selectedConversation.clubPresident}</p>
                  </div>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Video size={16} className="mr-2" />
                    Video Call
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                {selectedConversation.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-full rounded-2xl px-4 py-3 sm:max-w-[75%] ${message.senderRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`mt-2 text-xs ${message.senderRole === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>{getFormattedMessageTime(message.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="border-t border-gray-800 p-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your message..." className="bg-gray-800 text-white" />
                  <Button onClick={handleSend} disabled={!messageText.trim()} className="bg-blue-600 text-white hover:bg-blue-700">
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex flex-1 items-center justify-center text-center text-gray-500">No club conversations found.</CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
