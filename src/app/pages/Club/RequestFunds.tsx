import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { BackButton } from '../../components/BackButton';
import {
  DollarSign,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface FundRequest {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  category: string;
  description: string;
  justification: string;
}

export function RequestFunds() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    justification: '',
    timeline: '',
    expectedOutcome: '',
  });

  const [requests] = useState<FundRequest[]>([
    {
      id: '1',
      title: 'Annual Hackathon 2024',
      amount: 50000,
      date: '2024-03-15',
      status: 'pending',
      category: 'Event',
      description: 'Funds for organizing 24-hour hackathon with prizes',
      justification: 'Major annual event attracting 100+ participants',
    },
    {
      id: '2',
      title: 'Robot Competition Equipment',
      amount: 35000,
      date: '2024-02-28',
      status: 'approved',
      category: 'Equipment',
      description: 'Purchase Arduino kits and sensors for competition',
      justification: 'Required for national-level robotics competition',
    },
    {
      id: '3',
      title: 'Marketing Campaign',
      amount: 8000,
      date: '2024-03-10',
      status: 'rejected',
      category: 'Marketing',
      description: 'Social media and poster campaign for recruitment',
      justification: 'Budget allocation not justified',
    },
    {
      id: '4',
      title: 'Guest Speaker Series',
      amount: 25000,
      date: '2024-03-05',
      status: 'approved',
      category: 'Event',
      description: 'Invite industry professionals for tech talks',
      justification: 'Educational value for entire student body',
    },
  ]);

  const categories = [
    'Event',
    'Equipment',
    'Marketing',
    'Travel',
    'Workshop',
    'Competition',
    'Infrastructure',
    'Other',
  ];

  const budgetStats = {
    allocated: 150000,
    spent: 78000,
    pending: 50000,
    available: 22000,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast.success('Fund request submitted for review!');
      setSubmitting(false);
      setShowForm(false);
      setFormData({
        title: '',
        amount: '',
        category: '',
        description: '',
        justification: '',
        timeline: '',
        expectedOutcome: '',
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
          <CheckCircle size={14} />
          Approved
        </span>
      );
    }
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
          <AlertCircle size={14} />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
        <XCircle size={14} />
        Rejected
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Request Funds</h1>
        <p className="text-gray-400 mt-2">Submit fund requests for club activities</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Allocated</p>
                <p className="text-2xl font-bold text-white">₹{budgetStats.allocated.toLocaleString()}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Spent</p>
                <p className="text-2xl font-bold text-white">₹{budgetStats.spent.toLocaleString()}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Pending</p>
                <p className="text-2xl font-bold text-white">₹{budgetStats.pending.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-xl">
                <AlertCircle className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Available</p>
                <p className="text-2xl font-bold text-white">₹{budgetStats.available.toLocaleString()}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <CheckCircle className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Request Button */}
      <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus size={18} className="mr-2" />
        New Fund Request
      </Button>

      {/* Request Form */}
      {showForm && (
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">New Fund Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">
                  Request Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g., Workshop Equipment"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount" className="text-white">
                    Amount Requested (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    required
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Describe how the funds will be used..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="justification" className="text-white">
                  Justification
                </Label>
                <Textarea
                  id="justification"
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Explain why these funds are necessary..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="timeline" className="text-white">
                  Timeline
                </Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g., Within 2 weeks"
                  required
                />
              </div>

              <div>
                <Label htmlFor="expectedOutcome" className="text-white">
                  Expected Outcome
                </Label>
                <Textarea
                  id="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="What impact will this have on the club?"
                  rows={2}
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Requests List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Fund Requests History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white text-lg">{request.title}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{request.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400 flex items-center gap-1">
                      ₹{request.amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    <span className="font-medium text-gray-300">Description:</span> {request.description}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-gray-300">Justification:</span>{' '}
                    {request.justification}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-700 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(request.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}