
import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  FileText, 
  Users, 
  DollarSign, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare 
} from 'lucide-react';
import { mockProposals, Proposal } from '../../data/mockData';

export function CouncilApprovals() {
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null);
  const [filter, setFilter] = useState('pending');

  const filteredProposals = mockProposals.filter(p => filter === 'all' || p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Review Proposals</h1>
          <p className="text-gray-400 mt-1">Approve, reject, or negotiate funding requests.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111827] p-1 rounded-lg border border-gray-800">
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'approved' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'rejected' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Rejected
          </button>
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProposals.map((proposal) => (
          <ProposalCard 
            key={proposal.id} 
            proposal={proposal} 
            expanded={expandedProposal === proposal.id}
            onToggle={() => setExpandedProposal(expandedProposal === proposal.id ? null : proposal.id)}
          />
        ))}
        {filteredProposals.length === 0 && (
          <div className="text-center py-12 bg-[#111827] rounded-xl border border-gray-800 text-gray-500">
            No proposals found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

function ProposalCard({ proposal, expanded, onToggle }: { proposal: Proposal, expanded: boolean, onToggle: () => void }) {
  return (
    <div className={`bg-[#111827] border border-gray-800 rounded-xl overflow-hidden transition-all duration-200 ${expanded ? 'ring-2 ring-blue-500/50' : 'hover:border-gray-700'}`}>
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${
            proposal.status === 'approved' ? 'bg-green-500/10 text-green-500' :
            proposal.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
            'bg-yellow-500/10 text-yellow-500'
          }`}>
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{proposal.title}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
              <span className="flex items-center gap-1 text-blue-400">
                <Users size={14} />
                {proposal.clubName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <DollarSign size={14} />
                ${proposal.budget.toLocaleString()}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {proposal.date}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            proposal.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
            proposal.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
          }`}>
            {proposal.status.toUpperCase()}
          </span>
          {expanded ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6 pt-0 border-t border-gray-800 bg-[#0b1120]/50">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Description</h4>
                <p className="text-gray-400 leading-relaxed bg-[#111827] p-4 rounded-lg border border-gray-800">
                  {proposal.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Attached Documents</h4>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-[#111827] px-3 py-2 rounded-lg border border-gray-800 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm">Proposal_Details.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#111827] px-3 py-2 rounded-lg border border-gray-800 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                    <DollarSign size={16} />
                    <span className="text-sm">Budget_Breakdown.xlsx</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#111827] p-4 rounded-lg border border-gray-800">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                    <CheckCircle size={18} />
                    Approve Request
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-2 rounded-lg font-medium transition-colors border border-red-600/20">
                    <XCircle size={18} />
                    Reject Request
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 py-2 rounded-lg font-medium transition-colors border border-blue-600/20">
                    <MessageSquare size={18} />
                    Discuss / Negotiate
                  </button>
                </div>
              </div>

              <div className="bg-[#111827] p-4 rounded-lg border border-gray-800">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Counter Offer</h4>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      className="w-full bg-[#0b1120] border border-gray-700 rounded-lg pl-6 pr-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
