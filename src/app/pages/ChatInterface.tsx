import React, { useState } from 'react';
import { Send, User, MoreVertical, Phone, Video, Paperclip, Image, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  type: string;
  fileName?: string;
}

export function ChatInterface() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'council', text: 'Hello Alex, regarding your Hackathon proposal...', time: '10:00 AM', type: 'text' },
    { id: 2, sender: 'me', text: 'Yes, we are looking for $5000 budget.', time: '10:05 AM', type: 'text' },
    { id: 3, sender: 'council', text: 'That seems a bit high. Can you provide a breakdown for the venue costs?', time: '10:15 AM', type: 'text' },
    { id: 4, sender: 'me', text: 'Sure! Here\'s the detailed breakdown document.', time: '10:18 AM', type: 'text' },
  ]);
  const [input, setInput] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: input, time: 'Now', type: 'text' }]);
    setInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach((file) => {
      const fileMsg = {
        id: Date.now() + Math.random(),
        sender: 'me',
        text: `Sent file: ${file.name}`,
        time: 'Now',
        type: 'file',
        fileName: file.name,
      };
      setMessages(prev => [...prev, fileMsg]);
    });
    setShowAttachMenu(false);
  };

  const startVideoCall = () => {
    navigate('/club-head/meetings');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-80 border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-800">
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-[#0b1120] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            { id: 1, name: 'Council Admin', message: 'That seems a bit high...', time: '10:15 AM', active: true },
            { id: 2, name: 'Faculty Advisor', message: 'Your proposal looks good!', time: 'Yesterday', active: false },
            { id: 3, name: 'Finance Team', message: 'Reimbursement approved', time: '2 days ago', active: false },
          ].map((chat) => (
            <div key={chat.id} className={`p-4 border-b border-gray-800 hover:bg-[#1f2937] cursor-pointer transition-colors ${chat.active ? 'bg-blue-500/5 border-l-4 border-l-blue-500' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-white">{chat.name}</h4>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-1">{chat.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0b1120]/50">
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#111827]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              CA
            </div>
            <div>
              <h3 className="font-medium text-white">Council Admin</h3>
              <span className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Online
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-white transition-colors"><Phone size={20} /></button>
            <button 
              onClick={startVideoCall}
              className="hover:text-white transition-colors"
            >
              <Video size={20} />
            </button>
            <button className="hover:text-white transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.sender === 'me' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-[#1f2937] text-gray-200 rounded-bl-none border border-gray-700'
              }`}>
                {msg.type === 'file' && (
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} />
                    <span className="text-sm font-medium">{msg.fileName}</span>
                  </div>
                )}
                <p>{msg.text}</p>
                <span className={`text-xs mt-1 block ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#111827] border-t border-gray-800">
          <form onSubmit={handleSend} className="flex gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Paperclip size={20} />
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-[#1f2937] border border-gray-700 rounded-lg shadow-xl py-2 w-48">
                  <label className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer transition-colors">
                    <Image size={16} className="text-blue-400" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                  <label className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer transition-colors">
                    <FileText size={16} className="text-green-400" />
                    <span>Upload Document</span>
                    <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              )}
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-[#0b1120] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Send size={20} />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}