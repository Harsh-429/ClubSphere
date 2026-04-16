import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, MapPin, Plus, Users, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { getStatusLabel, getStatusTone, useLiveData } from '../../state/LiveDataContext';

const rooms = [
  { name: 'Main Auditorium', building: 'Main Building' },
  { name: 'Seminar Hall 1', building: 'Academic Block A' },
  { name: 'Seminar Hall 2', building: 'Academic Block A' },
  { name: 'Computer Lab 101', building: 'Science and Technology Block' },
  { name: 'Conference Room 1', building: 'Admin Block' },
];

export function BookRoomsLive() {
  const { currentClub, roomBookings, submitRoomBooking } = useLiveData();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    roomName: '',
    building: '',
    date: '',
    timeSlot: '',
    purpose: '',
    expectedAttendees: '',
  });

  const bookings = roomBookings.filter((booking) => booking.clubId === currentClub.id);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    submitRoomBooking({
      roomName: formData.roomName,
      building: formData.building,
      date: formData.date,
      timeSlot: formData.timeSlot,
      purpose: formData.purpose,
      expectedAttendees: Number(formData.expectedAttendees),
    });
    setSubmitting(false);
    setShowForm(false);
    setFormData({ roomName: '', building: '', date: '', timeSlot: '', purpose: '', expectedAttendees: '' });
    toast.success('Room permission request sent to admin.');
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />

      <div>
        <h1 className="text-3xl font-bold text-white">Book Rooms</h1>
        <p className="mt-2 text-gray-400">Room requests are treated as live permissions on the admin side.</p>
      </div>

      <Button onClick={() => setShowForm((current) => !current)} className="bg-blue-600 text-white hover:bg-blue-700">
        <Plus size={18} className="mr-2" />
        New Room Request
      </Button>

      {showForm && (
        <Card className="border-gray-800 bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Request Room Permission</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white">Room</Label>
                <select
                  value={formData.roomName}
                  onChange={(e) => {
                    const selected = rooms.find((room) => room.name === e.target.value);
                    setFormData({ ...formData, roomName: e.target.value, building: selected?.building || '' });
                  }}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  required
                >
                  <option value="">Choose a room...</option>
                  {rooms.map((room) => <option key={room.name} value={room.name}>{room.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label className="text-white">Building</Label>
                  <Input value={formData.building} readOnly className="bg-gray-800 text-white" />
                </div>
                <div>
                  <Label className="text-white">Date</Label>
                  <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="bg-gray-800 text-white" required />
                </div>
                <div>
                  <Label className="text-white">Expected Attendees</Label>
                  <Input type="number" value={formData.expectedAttendees} onChange={(e) => setFormData({ ...formData, expectedAttendees: e.target.value })} className="bg-gray-800 text-white" required />
                </div>
              </div>

              <div>
                <Label className="text-white">Time Slot</Label>
                <Input value={formData.timeSlot} onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })} className="bg-gray-800 text-white" placeholder="2:00 PM - 5:00 PM" required />
              </div>

              <div>
                <Label className="text-white">Purpose</Label>
                <Textarea value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} className="bg-gray-800 text-white" rows={3} required />
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
          <CardTitle className="text-white">Permission History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{booking.roomName}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(booking.status)}`}>{getStatusLabel(booking.status)}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{booking.purpose}</p>
                    {booking.reviewNote && <p className="mt-3 rounded-lg bg-gray-900/70 p-3 text-sm text-orange-300">Admin note: {booking.reviewNote}</p>}
                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-3">
                      <span className="flex items-center gap-2"><Calendar size={14} />{new Date(booking.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-2"><Clock size={14} />{booking.timeSlot}</span>
                      <span className="flex items-center gap-2"><Users size={14} />{booking.expectedAttendees} expected</span>
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-sm text-gray-500"><MapPin size={14} />{booking.building}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
