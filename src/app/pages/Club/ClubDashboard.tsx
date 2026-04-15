import React from 'react';
import { useNavigate } from 'react-router';
import {
  Calendar,
  DollarSign,
  FileText,
  Building,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  Video,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BackButton } from '../../components/BackButton';

export function ClubDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Members', value: '150', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Events', value: '3', icon: Calendar, color: 'bg-green-500' },
    { label: 'Pending Approvals', value: '5', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Budget Used', value: '₹45,000', icon: DollarSign, color: 'bg-purple-500' },
  ];

  const quickActions = [
    { label: 'Update Club Details', icon: FileText, path: '/club/update-details', color: 'blue' },
    { label: 'Book Room', icon: Building, path: '/club/book-rooms', color: 'green' },
    { label: 'Submit Bills', icon: FileText, path: '/club/submit-bills', color: 'purple' },
    { label: 'Pitch Event', icon: Calendar, path: '/club/pitch-events', color: 'orange' },
    { label: 'Request Funds', icon: DollarSign, path: '/club/request-funds', color: 'pink' },
    { label: 'Chat', icon: MessageCircle, path: '/club/chat', color: 'cyan' },
    { label: 'Video Meet', icon: Video, path: '/club/video-meet', color: 'indigo' },
  ];

  const recentActivity = [
    {
      id: 1,
      title: 'Room Booking Approved',
      description: 'Main Auditorium - March 25, 2024',
      time: '2 hours ago',
      status: 'approved',
    },
    {
      id: 2,
      title: 'Fund Request Pending',
      description: '₹15,000 for Annual Hackathon',
      time: '5 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Bill Submission Rejected',
      description: 'Workshop Materials - Missing receipt',
      time: '1 day ago',
      status: 'rejected',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Club Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage your club activities and submissions</p>
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
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-3 h-auto py-6 bg-gray-800 hover:bg-gray-700 text-white border-0"
              >
                <div className={`p-3 rounded-xl bg-${action.color}-500/20`}>
                  <action.icon size={24} className={`text-${action.color}-400`} />
                </div>
                <span className="text-sm font-medium text-center">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="mt-1">
                    {activity.status === 'approved' && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                    {activity.status === 'pending' && (
                      <Clock className="text-yellow-500" size={20} />
                    )}
                    {activity.status === 'rejected' && (
                      <AlertCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Club Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop"
                  alt="Club Logo"
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-white text-lg">Coding Club</h3>
                  <p className="text-sm text-gray-400">Technology</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">President</span>
                  <span className="text-white font-medium">Alex Chen</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Total Members</span>
                  <span className="text-white font-medium">150</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Budget Allocated</span>
                  <span className="text-white font-medium">₹50,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Health Score</span>
                  <span className="text-green-400 font-medium">95%</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/club/update-details')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
                Update Club Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}