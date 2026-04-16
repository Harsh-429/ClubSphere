import React, { useState } from 'react';
import { AlertCircle, Calendar, CheckCircle, DollarSign, Plus, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { getStatusLabel, getStatusTone, useLiveData } from '../../state/LiveDataContext';

const categories = ['Event', 'Equipment', 'Marketing', 'Travel', 'Workshop', 'Competition', 'Infrastructure', 'Other'];

export function RequestFundsLive() {
  const { currentClub, fundRequests, submitFundRequest } = useLiveData();
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

  const requests = fundRequests.filter((request) => request.clubId === currentClub.id);
  const budgetStats = {
    approved: requests.filter((item) => item.status === 'approved').reduce((sum, item) => sum + item.amount, 0),
    pending: requests.filter((item) => item.status === 'pending' || item.status === 'revision_requested').reduce((sum, item) => sum + item.amount, 0),
    rejected: requests.filter((item) => item.status === 'rejected').reduce((sum, item) => sum + item.amount, 0),
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    submitFundRequest({
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
      justification: formData.justification,
      timeline: formData.timeline,
      expectedOutcome: formData.expectedOutcome,
    });

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
    toast.success('Fund request submitted. Admin dashboard will update instantly.');
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />

      <div>
        <h1 className="text-3xl font-bold text-white">Request Funds</h1>
        <p className="mt-2 text-gray-400">New requests appear live in the admin review queue.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved" value={`INR ${budgetStats.approved.toLocaleString()}`} icon={CheckCircle} tone="bg-green-500" />
        <StatCard label="Pending" value={`INR ${budgetStats.pending.toLocaleString()}`} icon={AlertCircle} tone="bg-yellow-500" />
        <StatCard label="Rejected" value={`INR ${budgetStats.rejected.toLocaleString()}`} icon={XCircle} tone="bg-red-500" />
        <StatCard label="Requests" value={requests.length.toString()} icon={DollarSign} tone="bg-blue-500" />
      </div>

      <Button onClick={() => setShowForm((current) => !current)} className="bg-blue-600 text-white hover:bg-blue-700">
        <Plus size={18} className="mr-2" />
        New Fund Request
      </Button>

      {showForm && (
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Submit Funding Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Request Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-gray-800 text-white" required />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="amount" className="text-white">Amount</Label>
                  <Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="bg-gray-800 text-white" required />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <select id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white" required>
                    <option value="">Select category...</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <FormArea label="Description" value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} />
              <FormArea label="Justification" value={formData.justification} onChange={(value) => setFormData({ ...formData, justification: value })} />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="timeline" className="text-white">Timeline</Label>
                  <Input id="timeline" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className="bg-gray-800 text-white" required />
                </div>
                <div>
                  <Label htmlFor="expectedOutcome" className="text-white">Expected Outcome</Label>
                  <Input id="expectedOutcome" value={formData.expectedOutcome} onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })} className="bg-gray-800 text-white" required />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">Cancel</Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 text-white hover:bg-blue-700">{submitting ? 'Submitting...' : 'Submit Request'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-800 bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-white">Live Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{request.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(request.status)}`}>{getStatusLabel(request.status)}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{request.description}</p>
                    <p className="mt-2 text-sm text-gray-500">{request.justification}</p>
                    {request.reviewNote && <p className="mt-3 rounded-lg bg-gray-900/70 p-3 text-sm text-orange-300">Admin note: {request.reviewNote}</p>}
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-blue-400">INR {request.amount.toLocaleString()}</p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 lg:justify-end">
                      <Calendar size={14} />
                      {new Date(request.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: string; icon: React.ElementType; tone: string }) {
  return (
    <Card className="border-gray-800 bg-[#111827]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{value}</p>
          </div>
          <div className={`${tone} rounded-xl p-3`}>
            <Icon className="text-white" size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FormArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <Label className="text-white">{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-800 text-white" rows={3} required />
    </div>
  );
}
