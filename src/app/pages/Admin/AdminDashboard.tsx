import React from 'react';
import { useNavigate } from 'react-router';
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  MessageSquare,
  BarChart3,
  MessageCircle,
  Video,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Clubs', value: '8', icon: Users, color: 'bg-blue-500', change: '+2' },
    { label: 'Pending Approvals', value: '12', icon: Clock, color: 'bg-yellow-500', change: '+5' },
    { label: 'Total Budget', value: '₹8.5L', icon: DollarSign, color: 'bg-green-500', change: '+15%' },
    { label: 'Active Events', value: '15', icon: Calendar, color: 'bg-purple-500', change: '+3' },
  ];

  const pendingApprovals = [
    { type: 'Fund Request', count: 5, path: '/admin/review-funds' },
    { type: 'Event Pitches', count: 3, path: '/admin/review-events' },
    { type: 'Room Bookings', count: 2, path: '/admin/review-rooms' },
    { type: 'Bill Submissions', count: 2, path: '/admin/review-bills' },
  ];

  const clubBudgetData = [
    { name: 'Coding Club', budget: 50000 },
    { name: 'Robotics', budget: 45000 },
    { name: 'Drama', budget: 35000 },
    { name: 'Photo', budget: 30000 },
    { name: 'E-Cell', budget: 40000 },
    { name: 'Debate', budget: 25000 },
  ];

  const activityData = [
    { name: 'Mon', submissions: 12 },
    { name: 'Tue', submissions: 19 },
    { name: 'Wed', submissions: 15 },
    { name: 'Thu', submissions: 22 },
    { name: 'Fri', submissions: 28 },
    { name: 'Sat', submissions: 18 },
    { name: 'Sun', submissions: 10 },
  ];

  const categoryData = [
    { name: 'Events', value: 35 },
    { name: 'Equipment', value: 25 },
    { name: 'Travel', value: 15 },
    { name: 'Other', value: 25 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const recentActivity = [
    {
      id: 1,
      club: 'Coding Club',
      action: 'Submitted fund request',
      detail: '₹50,000 for Annual Hackathon',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      club: 'Robotics Club',
      action: 'Room booking approved',
      detail: 'Main Auditorium - March 25',
      time: '4 hours ago',
      status: 'approved',
    },
    {
      id: 3,
      club: 'Drama Society',
      action: 'Updated club details',
      detail: 'Leadership changes submitted',
      time: '6 hours ago',
      status: 'pending',
    },
  ];

  const topPerformingClubs = [
    { name: 'Coding Club', score: 95, members: 180, events: 8 },
    { name: 'Robotics Club', score: 92, members: 150, events: 6 },
    { name: 'E-Cell', score: 90, members: 120, events: 7 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Overview of all club activities and pending approvals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-[#111827] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-green-400 mt-1">{stat.change} this week</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Approvals */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="text-yellow-400" size={20} />
            Pending Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pendingApprovals.map((item) => (
              <div
                key={item.type}
                onClick={() => navigate(item.path)}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{item.type}</span>
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">
                    {item.count}
                  </span>
                </div>
                <p className="text-xl font-bold text-white">{item.count} Pending</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Club Budget Distribution */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Club Budget Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clubBudgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="budget" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Weekly Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="submissions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Clubs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-white">{activity.club}</h4>
                      <p className="text-sm text-gray-400">{activity.action}</p>
                    </div>
                    {activity.status === 'pending' ? (
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs">
                        Pending
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                        Approved
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{activity.detail}</p>
                  <p className="text-xs text-gray-600 mt-2">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Clubs */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Clubs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingClubs.map((club, index) => (
                <div key={club.name} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-blue-400">#{index + 1}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{club.name}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span>{club.members} members</span>
                        <span>•</span>
                        <span>{club.events} events</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{club.score}%</div>
                      <div className="text-xs text-gray-500">Health Score</div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => navigate('/admin/analytics')}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <BarChart3 size={18} className="mr-2" />
                View Full Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <Button
              onClick={() => navigate('/admin/review')}
              className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white"
            >
              <FileText size={24} className="text-blue-400" />
              <span className="text-sm">Review</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/analytics')}
              className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white"
            >
              <BarChart3 size={24} className="text-green-400" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/chat-clubs')}
              className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white"
            >
              <MessageCircle size={24} className="text-cyan-400" />
              <span className="text-sm">Chat</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/video-meet')}
              className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white"
            >
              <Video size={24} className="text-purple-400" />
              <span className="text-sm">Video Meet</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/review')}
              className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white"
            >
              <DollarSign size={24} className="text-yellow-400" />
              <span className="text-sm">Review Funds</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/review')}
              className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white"
            >
              <Calendar size={24} className="text-orange-400" />
              <span className="text-sm">Review Events</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}