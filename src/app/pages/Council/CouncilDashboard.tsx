
import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  FileText, 
  Users, 
  AlertCircle 
} from 'lucide-react';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';
import { mockProposals } from '../../data/mockData';
import { Link } from 'react-router';

export function CouncilDashboard() {
  const pendingProposals = mockProposals.filter(p => p.status === 'pending');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Council Dashboard</h1>
        <p className="text-gray-400">Overview of club activities, funding, and pending approvals.</p>
      </div>

      {/* Pending Approvals Section */}
      <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="text-yellow-500" size={20} />
            Pending Approvals
            <span className="bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full text-xs font-medium ml-2">{pendingProposals.length} New</span>
          </h2>
          <Link to="/council/approvals" className="text-sm text-blue-500 hover:text-blue-400 font-medium">
            View All Requests &rarr;
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {pendingProposals.slice(0, 3).map((proposal) => (
            <div key={proposal.id} className="p-6 hover:bg-[#1f2937]/50 transition-colors flex items-center justify-between group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 mt-1">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{proposal.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <span className="text-blue-400 font-medium">{proposal.clubName}</span>
                    <span>•</span>
                    <span>{proposal.category}</span>
                    <span>•</span>
                    <span>${proposal.budget} Requested</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-1">{proposal.description}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-green-500/10 hover:bg-green-500/20 text-green-500 p-2 rounded-lg transition-colors border border-green-500/20" title="Approve">
                  <CheckCircle size={20} />
                </button>
                <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors border border-red-500/20" title="Reject">
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">System Analytics</h2>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
