
import React, { useState } from 'react';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export function ProposalForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/club-head/proposals');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Proposal</h1>
          <p className="text-gray-400 mt-1">Submit a detailed proposal for council review.</p>
        </div>
        <button 
          onClick={() => navigate('/club-head/proposals')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-[#111827] p-8 rounded-xl border border-gray-800 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Proposal Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-[#0b1120] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-600"
              placeholder="e.g. Annual Hackathon 2024"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Category</label>
            <select className="w-full bg-[#0b1120] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
              <option value="Event">Event</option>
              <option value="Equipment">Equipment</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Budget Request ($)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input 
              type="number" 
              required
              min="0"
              className="w-full bg-[#0b1120] border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-600"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Description & Goals</label>
          <textarea 
            required
            rows={5}
            className="w-full bg-[#0b1120] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-600"
            placeholder="Describe the purpose, target audience, and expected impact..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Supporting Documents (PDF/PPT)</label>
          <div 
            className="border-2 border-dashed border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.ppt,.pptx,.doc,.docx"
            />
            {file ? (
              <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg">
                <FileText size={20} />
                <span className="font-medium">{file.name}</span>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="ml-2 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="p-4 bg-[#0b1120] rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-gray-400 group-hover:text-blue-500" size={24} />
                </div>
                <h3 className="text-white font-medium">Click to upload or drag and drop</h3>
                <p className="text-sm text-gray-500 mt-1">PDF, PPTX up to 10MB</p>
              </>
            )}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-800">
          <button 
            type="button" 
            onClick={() => navigate('/club-head/proposals')}
            className="px-6 py-2.5 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Proposal
                <Check size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
