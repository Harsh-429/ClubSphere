import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockClubs, mockProposals } from '../../data/mockData';

const budgetByCategory = [
  { name: 'Events', value: 45000, color: '#3b82f6' },
  { name: 'Equipment', value: 28000, color: '#8b5cf6' },
  { name: 'Travel', value: 15000, color: '#10b981' },
  { name: 'Other', value: 12000, color: '#f59e0b' },
];

const monthlySpending = [
  { month: 'Jan', spent: 12000, budget: 15000 },
  { month: 'Feb', spent: 18000, budget: 20000 },
  { month: 'Mar', spent: 14500, budget: 18000 },
  { month: 'Apr', spent: 16800, budget: 19000 },
  { month: 'May', spent: 22000, budget: 25000 },
  { month: 'Jun', spent: 19500, budget: 22000 },
];

const clubBudgets = mockClubs.map(club => ({
  name: club.name,
  allocated: Math.floor(Math.random() * 20000) + 10000,
  spent: Math.floor(Math.random() * 15000) + 5000,
})).sort((a, b) => b.allocated - a.allocated);

export function BudgetOverview() {
  const totalBudget = 500000;
  const totalAllocated = clubBudgets.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent = clubBudgets.reduce((sum, c) => sum + c.spent, 0);
  const remaining = totalBudget - totalSpent;

  const approvedProposals = mockProposals.filter(p => p.status === 'approved');
  const pendingAmount = mockProposals
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Budget Overview</h1>
        <p className="text-gray-400">Track and manage club funding allocation</p>
      </div>

      {/* Budget Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Budget</span>
            <DollarSign size={20} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{totalBudget.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Annual allocation</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Spent</span>
            <TrendingUp size={20} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{totalSpent.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">{((totalSpent / totalBudget) * 100).toFixed(1)}% utilized</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Remaining</span>
            <PieChartIcon size={20} className="text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{remaining.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{((remaining / totalBudget) * 100).toFixed(1)}% available</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Pending Requests</span>
            <Calendar size={20} className="text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{pendingAmount.toLocaleString()}</p>
          <p className="text-xs text-yellow-400 mt-1">Awaiting approval</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget by Category - Pie Chart */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Budget by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={budgetByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {budgetByCategory.map((category) => (
              <div key={category.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-400">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Spending - Bar Chart */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Spending Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="spent" fill="#3b82f6" name="Spent" radius={[8, 8, 0, 0]} />
              <Bar dataKey="budget" fill="#6366f1" name="Budget" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Club-wise Budget Allocation */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Club-wise Budget Allocation</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-800">
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-300">Club Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-300">Allocated</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-300">Spent</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-300">Remaining</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-300">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {clubBudgets.map((club) => {
                const utilization = (club.spent / club.allocated) * 100;
                return (
                  <tr key={club.name} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{club.name}</td>
                    <td className="px-6 py-4 text-gray-300">₹{club.allocated.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-300">₹{club.spent.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-300">
                      ₹{(club.allocated - club.spent).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              utilization > 90
                                ? 'bg-red-500'
                                : utilization > 70
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(utilization, 100)}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            utilization > 90
                              ? 'text-red-400'
                              : utilization > 70
                              ? 'text-yellow-400'
                              : 'text-green-400'
                          }`}
                        >
                          {utilization.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
