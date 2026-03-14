import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { BackButton } from '../../components/BackButton';
import {
  Calendar,
  MapPin,
  Users,
  Upload,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Presentation,
} from 'lucide-react';
import { toast } from 'sonner';

interface EventPitch {
  id: string;
  eventName: string;
  date: string;
  location: string;
  expectedAttendees: number;
  budget: number;
  status: 'approved' | 'pending' | 'rejected';
  description: string;
  hasPPT: boolean;
}

export function PitchEvents() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pptFile, setPptFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    location: '',
    expectedAttendees: '',
    budget: '',
    description: '',
    objectives: '',
    targetAudience: '',
  });

  const [pitches] = useState<EventPitch[]>([
    {
      id: '1',
      eventName: 'Annual Hackathon 2024',
      date: '2024-04-15',
      location: 'Computer Science Building',
      expectedAttendees: 100,
      budget: 50000,
      status: 'pending',
      description: '24-hour coding competition with prizes and mentorship',
      hasPPT: true,
    },
    {
      id: '2',
      eventName: 'AI & ML Workshop',
      date: '2024-03-20',
      location: 'Science & Technology Block',
      expectedAttendees: 50,
      budget: 15000,
      status: 'approved',
      description: 'Hands-on workshop on machine learning fundamentals',
      hasPPT: true,
    },
    {
      id: '3',
      eventName: 'Code Sprint Competition',
      date: '2024-05-10',
      location: 'Main Auditorium',
      expectedAttendees: 80,
      budget: 35000,
      status: 'rejected',
      description: 'Competitive programming contest - Budget too high',
      hasPPT: false,
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPptFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pptFile) {
      toast.error('Please upload a presentation (PPT/PDF)');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success('Event pitch submitted for review!');
      setSubmitting(false);
      setShowForm(false);
      setFormData({
        eventName: '',
        date: '',
        location: '',
        expectedAttendees: '',
        budget: '',
        description: '',
        objectives: '',
        targetAudience: '',
      });
      setPptFile(null);
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
          Pending Review
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
        <h1 className="text-3xl font-bold text-white">Pitch Events</h1>
        <p className="text-gray-400 mt-2">Submit new event proposals for admin approval</p>
      </div>

      {/* New Pitch Button */}
      <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus size={18} className="mr-2" />
        New Event Pitch
      </Button>

      {/* Pitch Form */}
      {showForm && (
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">New Event Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="eventName" className="text-white">
                  Event Name
                </Label>
                <Input
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g., Spring Tech Fest 2024"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="text-white">
                    Event Date
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
                <div>
                  <Label htmlFor="expectedAttendees" className="text-white">
                    Expected Attendees
                  </Label>
                  <Input
                    id="expectedAttendees"
                    type="number"
                    value={formData.expectedAttendees}
                    onChange={(e) => setFormData({ ...formData, expectedAttendees: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="text-white">
                    Budget Required (₹)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-white">
                  Proposed Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g., Main Auditorium"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Event Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Describe your event..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="objectives" className="text-white">
                  Event Objectives
                </Label>
                <Textarea
                  id="objectives"
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="What are the goals of this event?"
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="targetAudience" className="text-white">
                  Target Audience
                </Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g., All students, Computer Science majors"
                  required
                />
              </div>

              <div>
                <Label htmlFor="presentation" className="text-white mb-2 block">
                  Event Presentation (PPT/PDF) - Required
                </Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="presentation"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <Upload size={18} />
                    Choose File
                  </label>
                  <Input
                    id="presentation"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".ppt,.pptx,.pdf"
                  />
                  {pptFile && (
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Presentation size={16} />
                      {pptFile.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload a detailed presentation (PPT or PDF format, Max 10MB)
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setPptFile(null);
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
                  {submitting ? 'Submitting...' : 'Submit Pitch'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pitches List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Event Pitches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pitches.map((pitch) => (
              <div
                key={pitch.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white text-lg">{pitch.eventName}</h3>
                      {getStatusBadge(pitch.status)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-400">₹{pitch.budget.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Budget</div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-3">{pitch.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{new Date(pitch.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span>{pitch.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} />
                    <span>{pitch.expectedAttendees} attendees</span>
                  </div>
                </div>

                {pitch.hasPPT && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Presentation size={14} className="mr-1" />
                      View Presentation
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}