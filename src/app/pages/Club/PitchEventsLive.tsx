import React, { useState } from 'react';
import { Calendar, CheckCircle, MapPin, Plus, Presentation, Users, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { getStatusLabel, getStatusTone, useLiveData } from '../../state/LiveDataContext';

export function PitchEventsLive() {
  const { currentClub, eventPitches, submitEventPitch } = useLiveData();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [presentationFile, setPresentationFile] = useState<File | null>(null);
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

  const pitches = eventPitches.filter((item) => item.clubId === currentClub.id);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!presentationFile) {
      toast.error('Please upload the presentation deck.');
      return;
    }

    setSubmitting(true);
    submitEventPitch({
      eventName: formData.eventName,
      date: formData.date,
      location: formData.location,
      expectedAttendees: Number(formData.expectedAttendees),
      budget: Number(formData.budget),
      description: formData.description,
      objectives: formData.objectives,
      targetAudience: formData.targetAudience,
      presentationFileName: presentationFile.name,
    });

    setSubmitting(false);
    setShowForm(false);
    setPresentationFile(null);
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
    toast.success('Event submitted. Approved events will show on student pages automatically.');
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />

      <div>
        <h1 className="text-3xl font-bold text-white">Pitch Events</h1>
        <p className="mt-2 text-gray-400">Once approved, this event becomes visible to students instantly.</p>
      </div>

      <Button onClick={() => setShowForm((current) => !current)} className="bg-blue-600 text-white hover:bg-blue-700">
        <Plus size={18} className="mr-2" />
        New Event Pitch
      </Button>

      {showForm && (
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Event Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Event Name" value={formData.eventName} onChange={(value) => setFormData({ ...formData, eventName: value })} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="Date" type="date" value={formData.date} onChange={(value) => setFormData({ ...formData, date: value })} />
                <Field label="Expected Attendees" type="number" value={formData.expectedAttendees} onChange={(value) => setFormData({ ...formData, expectedAttendees: value })} />
                <Field label="Budget" type="number" value={formData.budget} onChange={(value) => setFormData({ ...formData, budget: value })} />
              </div>
              <Field label="Location" value={formData.location} onChange={(value) => setFormData({ ...formData, location: value })} />
              <Area label="Description" value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} />
              <Area label="Objectives" value={formData.objectives} onChange={(value) => setFormData({ ...formData, objectives: value })} />
              <Field label="Target Audience" value={formData.targetAudience} onChange={(value) => setFormData({ ...formData, targetAudience: value })} />

              <div>
                <Label className="text-white">Presentation</Label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
                    Choose File
                    <Input type="file" accept=".ppt,.pptx,.pdf" className="hidden" onChange={(e) => setPresentationFile(e.target.files?.[0] || null)} />
                  </label>
                  {presentationFile && <span className="flex items-center gap-2 text-sm text-gray-400"><Presentation size={16} />{presentationFile.name}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">Cancel</Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 text-white hover:bg-blue-700">{submitting ? 'Submitting...' : 'Submit Pitch'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-800 bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-white">Your Event Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pitches.map((pitch) => (
              <div key={pitch.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{pitch.eventName}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(pitch.status)}`}>{getStatusLabel(pitch.status)}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{pitch.description}</p>
                    {pitch.reviewNote && <p className="mt-3 rounded-lg bg-gray-900/70 p-3 text-sm text-orange-300">Admin note: {pitch.reviewNote}</p>}
                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-3">
                      <span className="flex items-center gap-2"><Calendar size={14} />{new Date(pitch.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-2"><MapPin size={14} />{pitch.location}</span>
                      <span className="flex items-center gap-2"><Users size={14} />{pitch.expectedAttendees} attendees</span>
                    </div>
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-blue-400">INR {pitch.budget.toLocaleString()}</p>
                    <p className="mt-2 text-sm text-gray-500">{pitch.presentationFileName || 'No deck attached'}</p>
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

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <div>
      <Label className="text-white">{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-800 text-white" required />
    </div>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <Label className="text-white">{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-800 text-white" rows={3} required />
    </div>
  );
}
