
import React from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router';
import { mockProposals, ProposalStatus } from '../../data/mockData';

const statusStyles: Record<ProposalStatus, string> = {
  approved: 'bg-green-500/10 text-green-500 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
};

const statusIcons: Record<ProposalStatus, React.ReactNode> = {
  approved: <CheckCircle size={14} />,
  rejected: <XCircle size={14} />,
  pending: <Clock size={14} />,
};

export function ProposalsList() {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const filteredProposals = mockProposals.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Proposals</h1>
          <p className="text-gray-400 mt-1">Manage and track your funding and event requests.</p>
        </div>
        <Link 
          to="/club-head/proposals/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={18} />
          Create New
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search proposals..." 
            className="w-full bg-[#111827] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="bg-[#111827] border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0b1120] border-b border-gray-800">
                <th className="px-6 py-4 font-semibold text-gray-400 text-sm">Proposal Title</th>
                <th className="px-6 py-4 font-semibold text-gray-400 text-sm">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-400 text-sm">Date Submitted</th>
                <th className="px-6 py-4 font-semibold text-gray-400 text-sm">Budget</th>
                <th className="px-6 py-4 font-semibold text-gray-400 text-sm">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-400 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredProposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-[#1f2937]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <FileText size={18} />
                      </div>
                      <span className="font-medium text-white">{proposal.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{proposal.category}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{proposal.date}</td>
                  <td className="px-6 py-4 text-gray-300 font-medium">${proposal.budget.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[proposal.status]}`}>
                      {statusIcons[proposal.status]}
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProposals.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No proposals found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
