import React, { useState } from 'react';
import { DollarSign, Upload, FileText, Image, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import { mockReimbursements } from '../../data/mockData';

export function FundsAndBills() {
  const [reimbursements, setReimbursements] = useState(mockReimbursements);
  const [showForm, setShowForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ receipt?: File; supporting?: File[] }>({});
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'receipt' | 'supporting') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'receipt') {
      setUploadedFiles({ ...uploadedFiles, receipt: files[0] });
    } else {
      setUploadedFiles({ ...uploadedFiles, supporting: Array.from(files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReimbursement = {
      id: `r${Date.now()}`,
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      category: formData.category,
      description: formData.description,
      receiptUrl: uploadedFiles.receipt ? URL.createObjectURL(uploadedFiles.receipt) : undefined,
    };

    setReimbursements([newReimbursement, ...reimbursements]);
    setShowForm(false);
    setFormData({ title: '', amount: '', category: '', description: '' });
    setUploadedFiles({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const totalApproved = reimbursements
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPending = reimbursements
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Funds & Reimbursements</h1>
          <p className="text-gray-400">Manage fund requests and bill reimbursements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/25"
        >
          <DollarSign size={20} />
          New Reimbursement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Approved</span>
            <CheckCircle size={20} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{totalApproved.toLocaleString()}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Pending Approval</span>
            <Clock size={20} className="text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Requests</span>
            <FileText size={20} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{reimbursements.length}</p>
        </div>
      </div>

      {/* Reimbursement Form */}
      {showForm && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Submit Reimbursement Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., Workshop Materials"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Materials">Materials</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Provide details about the expense..."
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Receipt/Bill * (JPG, PNG, PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="receipt-upload"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, 'receipt')}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="flex items-center justify-center gap-3 w-full bg-[#0b1120] border-2 border-dashed border-gray-700 rounded-xl px-4 py-8 cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Upload size={24} className="text-blue-400" />
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {uploadedFiles.receipt ? uploadedFiles.receipt.name : 'Click to upload receipt'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Maximum file size: 5MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Documents (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="supporting-upload"
                    accept="image/*,.pdf,.ppt,.pptx"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'supporting')}
                    className="hidden"
                  />
                  <label
                    htmlFor="supporting-upload"
                    className="flex items-center justify-center gap-3 w-full bg-[#0b1120] border-2 border-dashed border-gray-700 rounded-xl px-4 py-6 cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <FileText size={24} className="text-blue-400" />
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {uploadedFiles.supporting?.length
                          ? `${uploadedFiles.supporting.length} file(s) selected`
                          : 'Upload PPT, invoices, or other documents'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        You can select multiple files
                      </p>
                    </div>
                  </label>
                </div>
                {uploadedFiles.supporting && uploadedFiles.supporting.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.supporting.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg"
                      >
                        <FileText size={16} className="text-blue-400" />
                        <span className="flex-1 truncate">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setUploadedFiles({});
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reimbursements List */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Reimbursement Requests</h2>
        <div className="space-y-3">
          {reimbursements.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={16} className="text-green-400" />
                      ₹{item.amount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText size={16} className="text-blue-400" />
                      {item.category}
                    </span>
                    <span>Submitted: {new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  {item.receiptUrl && (
                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={item.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Image size={16} />
                        View Receipt
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
