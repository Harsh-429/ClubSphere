import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BackButton } from '../../components/BackButton';
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Award,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export function ClubAnalytics() {
  const clubs = [
    { id: 'all', name: 'All Clubs' },
    { id: '1', name: 'Coding Club' },
    { id: '2', name: 'Robotics Club' },
    { id: '3', name: 'Drama Society' },
    { id: '4', name: 'Photography Club' },
    { id: '5', name: 'E-Cell' },
    { id: '6', name: 'Debate Society' },
    { id: '7', name: 'Green Earth' },
    { id: '8', name: 'Sports Club' },
  ];

  const overallMetrics = [
    { label: 'Total Clubs', value: '8', change: '+2', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Members', value: '1,090', change: '+125', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Total Budget', value: '₹8.5L', change: '+15%', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Total Events', value: '48', change: '+12', icon: Calendar, color: 'bg-orange-500' },
  ];

  const clubPerformanceData = [
    { name: 'Coding Club', healthScore: 95, members: 180, events: 8, budget: 50000 },
    { name: 'Robotics', healthScore: 92, members: 150, events: 6, budget: 45000 },
    { name: 'E-Cell', healthScore: 90, members: 120, events: 7, budget: 40000 },
    { name: 'Sports', healthScore: 91, members: 200, events: 10, budget: 35000 },
    { name: 'Drama', healthScore: 88, members: 90, events: 5, budget: 35000 },
    { name: 'Photo', healthScore: 86, members: 75, events: 4, budget: 30000 },
    { name: 'Debate', healthScore: 85, members: 65, events: 6, budget: 25000 },
    { name: 'Green Earth', healthScore: 83, members: 110, events: 5, budget: 20000 },
  ];

  const monthlyActivityData = [
    { month: 'Sep', events: 5, funds: 45000, members: 850 },
    { month: 'Oct', events: 6, funds: 55000, members: 920 },
    { month: 'Nov', events: 8, funds: 68000, members: 980 },
    { month: 'Dec', events: 4, funds: 35000, members: 1010 },
    { month: 'Jan', events: 7, funds: 72000, members: 1050 },
    { month: 'Feb', events: 9, funds: 85000, members: 1090 },
  ];

  const budgetDistribution = [
    { category: 'Events', value: 45, amount: 382500 },
    { category: 'Equipment', value: 30, amount: 255000 },
    { category: 'Travel', value: 15, amount: 127500 },
    { category: 'Other', value: 10, amount: 85000 },
  ];

  const clubComparisonData = [
    { subject: 'Events', CodingClub: 90, RoboticsClub: 85, DramaSociety: 70 },
    { subject: 'Members', CodingClub: 95, RoboticsClub: 88, DramaSociety: 65 },
    { subject: 'Budget', CodingClub: 85, RoboticsClub: 80, DramaSociety: 60 },
    { subject: 'Engagement', CodingClub: 92, RoboticsClub: 87, DramaSociety: 75 },
    { subject: 'Impact', CodingClub: 88, RoboticsClub: 90, DramaSociety: 72 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <BackButton to="/admin" />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Club Analytics</h1>
        <p className="text-gray-400 mt-2">Comprehensive analytics and insights for all clubs</p>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallMetrics.map((metric) => (
          <Card key={metric.label} className="bg-[#111827] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-green-400 mt-1">{metric.change} this semester</p>
                </div>
                <div className={`${metric.color} p-3 rounded-xl`}>
                  <metric.icon className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Club Performance & Health Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Club Health Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={clubPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="healthScore" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={clubPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="members" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Monthly Activity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
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
                dataKey="events"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Events"
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Members"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget & Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Budget Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={budgetDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any, name: any, props: any) => [
                    `₹${props.payload.amount.toLocaleString()}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {budgetDistribution.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{item.category}</p>
                    <p className="text-sm text-white font-medium">₹{item.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Clubs Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={clubComparisonData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <PolarRadiusAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Radar
                  name="Coding Club"
                  dataKey="CodingClub"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Robotics Club"
                  dataKey="RoboticsClub"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Drama Society"
                  dataKey="DramaSociety"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Club Table */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Detailed Club Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Club Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Health Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Members</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Events</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Budget</th>
                </tr>
              </thead>
              <tbody>
                {clubPerformanceData.map((club, index) => (
                  <tr key={club.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-400">#{index + 1}</span>
                        {index < 3 && <Award className="text-yellow-400" size={16} />}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{club.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${club.healthScore}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium">{club.healthScore}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">{club.members}</td>
                    <td className="py-3 px-4 text-white">{club.events}</td>
                    <td className="py-3 px-4 text-white">₹{club.budget.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}