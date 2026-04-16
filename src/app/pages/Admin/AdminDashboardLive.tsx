import React from 'react';
import { Calendar, Clock, DollarSign, MessageCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { getStatusLabel, getStatusTone, useLiveData } from '../../state/LiveDataContext';

export function AdminDashboardLive() {
  const navigate = useNavigate();
  const { clubs, fundRequests, eventPitches, roomBookings, billSubmissions, conversations } = useLiveData();

  const pending = {
    funds: fundRequests.filter((item) => item.status === 'pending' || item.status === 'revision_requested').length,
    events: eventPitches.filter((item) => item.status === 'pending' || item.status === 'revision_requested').length,
    rooms: roomBookings.filter((item) => item.status === 'pending' || item.status === 'revision_requested').length,
    bills: billSubmissions.filter((item) => item.status === 'pending' || item.status === 'revision_requested').length,
  };

  const stats = [
    { label: 'Clubs', value: clubs.length.toString(), icon: Users, tone: 'bg-blue-500' },
    { label: 'Pending Items', value: Object.values(pending).reduce((sum, value) => sum + value, 0).toString(), icon: Clock, tone: 'bg-yellow-500' },
    { label: 'Approved Funding', value: `INR ${fundRequests.filter((item) => item.status === 'approved').reduce((sum, item) => sum + item.amount, 0).toLocaleString()}`, icon: DollarSign, tone: 'bg-green-500' },
    { label: 'Active Chats', value: conversations.length.toString(), icon: MessageCircle, tone: 'bg-cyan-500' },
  ];

  const recentActivity = [
    ...fundRequests.map((request) => ({ id: request.id, title: request.title, clubName: request.clubName, status: request.status, detail: `Fund request • INR ${request.amount.toLocaleString()}` })),
    ...eventPitches.map((event) => ({ id: event.id, title: event.eventName, clubName: event.clubName, status: event.status, detail: `Event pitch • ${event.location}` })),
    ...roomBookings.map((booking) => ({ id: booking.id, title: booking.roomName, clubName: booking.clubName, status: booking.status, detail: `Permission • ${booking.timeSlot}` })),
  ].slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-gray-400">This dashboard is now wired to live submissions, permissions, student events, and role-based chat.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-gray-800 bg-[#111827]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="mt-1 break-words text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`${stat.tone} rounded-xl p-3`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Approval Queues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Fund Requests', count: pending.funds },
                { label: 'Event Pitches', count: pending.events },
                { label: 'Room Permissions', count: pending.rooms },
                { label: 'Bills', count: pending.bills },
              ].map((item) => (
                <button key={item.label} onClick={() => navigate('/admin/review')} className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-left hover:border-blue-500">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">{item.count}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Recent Live Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="rounded-lg bg-gray-800/50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{item.clubName}</h3>
                      <p className="text-sm text-gray-300">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(item.status as any)}`}>{getStatusLabel(item.status as any)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800 bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button onClick={() => navigate('/admin/review')} className="bg-blue-600 text-white hover:bg-blue-700">Review Submissions</Button>
            <Button onClick={() => navigate('/admin/chat-clubs')} className="bg-gray-800 text-white hover:bg-gray-700">Open Club Chats</Button>
            <Button onClick={() => navigate('/student/events')} className="bg-gray-800 text-white hover:bg-gray-700"><Calendar size={16} className="mr-2" />Preview Student Feed</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
