
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const dataEvents = [
  { name: 'Tech', events: 12 },
  { name: 'Debate', events: 8 },
  { name: 'Green', events: 5 },
  { name: 'Photo', events: 7 },
  { name: 'Music', events: 10 },
  { name: 'Dance', events: 6 },
];

const dataFunds = [
  { name: 'Tech', value: 4000 },
  { name: 'Debate', value: 3000 },
  { name: 'Green', value: 2000 },
  { name: 'Photo', value: 2780 },
  { name: 'Other', value: 1890 },
];

const dataAttendance = [
  { name: 'Jan', attendance: 400 },
  { name: 'Feb', attendance: 300 },
  { name: 'Mar', attendance: 550 },
  { name: 'Apr', attendance: 480 },
  { name: 'May', attendance: 600 },
  { name: 'Jun', attendance: 350 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Events" 
          value="48" 
          change="+12%" 
          icon={Activity} 
          color="text-blue-500" 
        />
        <StatCard 
          title="Active Members" 
          value="1,240" 
          change="+5%" 
          icon={Users} 
          color="text-green-500" 
        />
        <StatCard 
          title="Funds Allocated" 
          value="$15,400" 
          change="-2%" 
          icon={DollarSign} 
          color="text-yellow-500" 
        />
        <StatCard 
          title="Avg. Attendance" 
          value="85" 
          change="+8%" 
          icon={TrendingUp} 
          color="text-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Events per Club</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataEvents}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="events" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Fund Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataFunds}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataFunds.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Attendance Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <h4 className="text-2xl font-bold text-white mt-2">{value}</h4>
        </div>
        <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          <Icon className={color} size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
          {change}
        </span>
        <span className="text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );
}
