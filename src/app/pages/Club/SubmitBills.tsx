import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { BackButton } from '../../components/BackButton';
import {
  Upload,
  FileText,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Paperclip,
} from 'lucide-react';
import { toast } from 'sonner';

interface Bill {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  category: string;
  description: string;
  receiptFileName?: string;
}

export function SubmitBills() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const [bills] = useState<Bill[]>([
    {
      id: '1',
      title: 'Pizza for Hackathon',
      amount: 4500,
      date: '2024-02-20',
      status: 'approved',
      category: 'Food & Beverages',
      description: 'Food expenses for 50 participants during 24h hackathon',
      receiptFileName: 'pizza_receipt.pdf',
    },
    {
      id: '2',
      title: 'Workshop Materials',
      amount: 2800,
      date: '2024-03-01',
      status: 'pending',
      category: 'Materials',
      description: 'Printing and stationery for AI workshop',
      receiptFileName: 'materials_invoice.pdf',
    },
    {
      id: '3',
      title: 'Camera Lens Purchase',
      amount: 12000,
      date: '2024-02-15',
      status: 'approved',
      category: 'Equipment',
      description: 'Professional lens for club camera',
      receiptFileName: 'camera_receipt.pdf',
    },
    {
      id: '4',
      title: 'Event Decoration',
      amount: 1500,
      date: '2024-03-05',
      status: 'rejected',
      category: 'Decoration',
      description: 'Banner and decoration for annual event - Missing proper receipt',
    },
  ]);

  const categories = [
    'Food & Beverages',
    'Materials',
    'Equipment',
    'Decoration',
    'Transportation',
    'Venue',
    'Marketing',
    'Other',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiptFile) {
      toast.error('Please upload a receipt/bill');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success('Bill submitted for review!');
      setSubmitting(false);
      setShowForm(false);
      setFormData({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: '',
      });
      setReceiptFile(null);
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
        <h1 className="text-3xl font-bold text-white">Submit Bills</h1>
        <p className="text-gray-400 mt-2">Submit reimbursement requests with receipts</p>
      </div>

      {/* New Bill Button */}
      <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus size={18} className="mr-2" />
        New Bill
      </Button>

      {/* Submission Form */}
      {showForm && (
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">New Bill Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-white">
                    Bill Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., Workshop Snacks"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount" className="text-white">
                    Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="date" className="text-white">
                    Date of Expense
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
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
                  placeholder="Provide details about the expense..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="receipt" className="text-white mb-2 block">
                  Upload Receipt/Bill (Required)
                </Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="receipt"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <Upload size={18} />
                    Choose File
                  </label>
                  <Input
                    id="receipt"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {receiptFile && (
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Paperclip size={16} />
                      {receiptFile.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Accepted formats: PDF, JPG, PNG (Max 5MB)
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setReceiptFile(null);
                  }}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? 'Submitting...' : 'Submit Bill'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Bills List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Submitted Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white text-lg">{bill.title}</h3>
                      {getStatusBadge(bill.status)}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{bill.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400 flex items-center gap-1">
                      <DollarSign size={20} />
                      ₹{bill.amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-3">{bill.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(bill.date).toLocaleDateString()}
                    </span>
                    {bill.receiptFileName && (
                      <span className="flex items-center gap-1">
                        <Paperclip size={14} />
                        {bill.receiptFileName}
                      </span>
                    )}
                  </div>
                  {bill.receiptFileName && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <FileText size={14} className="mr-1" />
                      View Receipt
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}