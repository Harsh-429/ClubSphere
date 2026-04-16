import React, { useState } from 'react';
import { Calendar, FileText, Paperclip, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { getStatusLabel, getStatusTone, useLiveData } from '../../state/LiveDataContext';

const categories = ['Food and Beverages', 'Materials', 'Equipment', 'Decoration', 'Transportation', 'Venue', 'Marketing', 'Other'];

export function SubmitBillsLive() {
  const { currentClub, billSubmissions, submitBill } = useLiveData();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', description: '', date: '' });

  const bills = billSubmissions.filter((bill) => bill.clubId === currentClub.id);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!receiptFile) {
      toast.error('Please attach the bill or receipt.');
      return;
    }

    setSubmitting(true);
    submitBill({
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      receiptFileName: receiptFile.name,
    });
    setSubmitting(false);
    setShowForm(false);
    setReceiptFile(null);
    setFormData({ title: '', amount: '', category: '', description: '', date: '' });
    toast.success('Bill sent to admin review.');
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />

      <div>
        <h1 className="text-3xl font-bold text-white">Submit Bills</h1>
        <p className="mt-2 text-gray-400">Expense submissions now appear in the admin review tab immediately.</p>
      </div>

      <Button onClick={() => setShowForm((current) => !current)} className="bg-blue-600 text-white hover:bg-blue-700">
        <Plus size={18} className="mr-2" />
        New Bill
      </Button>

      {showForm && (
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Bill Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputBlock label="Title" value={formData.title} onChange={(value) => setFormData({ ...formData, title: value })} />
                <InputBlock label="Amount" type="number" value={formData.amount} onChange={(value) => setFormData({ ...formData, amount: value })} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-white">Category</Label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white" required>
                    <option value="">Select category...</option>
                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>
                <InputBlock label="Expense Date" type="date" value={formData.date} onChange={(value) => setFormData({ ...formData, date: value })} />
              </div>

              <div>
                <Label className="text-white">Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-gray-800 text-white" rows={3} required />
              </div>

              <div>
                <Label className="text-white">Receipt</Label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
                    Choose File
                    <Input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} />
                  </label>
                  {receiptFile && <span className="flex items-center gap-2 text-sm text-gray-400"><Paperclip size={16} />{receiptFile.name}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">Cancel</Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 text-white hover:bg-blue-700">{submitting ? 'Submitting...' : 'Submit Bill'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-800 bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-white">Bill History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{bill.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(bill.status)}`}>{getStatusLabel(bill.status)}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{bill.description}</p>
                    {bill.reviewNote && <p className="mt-3 rounded-lg bg-gray-900/70 p-3 text-sm text-orange-300">Admin note: {bill.reviewNote}</p>}
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-blue-400">INR {bill.amount.toLocaleString()}</p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 lg:justify-end"><Calendar size={14} />{new Date(bill.date).toLocaleDateString()}</p>
                    {bill.receiptFileName && <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 lg:justify-end"><FileText size={14} />{bill.receiptFileName}</p>}
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

function InputBlock({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <div>
      <Label className="text-white">{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-800 text-white" required />
    </div>
  );
}
