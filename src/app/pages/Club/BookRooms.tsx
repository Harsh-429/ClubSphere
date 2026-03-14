import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { BackButton } from '../../components/BackButton';
import { Building, Calendar, Clock, Users, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';

interface Booking {
  id: string;
  roomName: string;
  building: string;
  date: string;
  timeSlot: string;
  purpose: string;
  status: 'confirmed' | 'pending' | 'rejected';
  capacity: number;
}

export function BookRooms() {
  const navigate = useNavigate();
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

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      roomName: 'Main Auditorium',
      building: 'Main Building',
      date: '2024-03-25',
      timeSlot: '2:00 PM - 5:00 PM',
      purpose: 'Annual Tech Talk',
      status: 'confirmed',
      capacity: 300,
    },
    {
      id: '2',
      roomName: 'Computer Lab 101',
      building: 'Science & Technology Block',
      date: '2024-03-20',
      timeSlot: '10:00 AM - 4:00 PM',
      purpose: 'AI Workshop',
      status: 'confirmed',
      capacity: 50,
    },
    {
      id: '3',
      roomName: 'Seminar Hall 2',
      building: 'Academic Block A',
      date: '2024-03-30',
      timeSlot: '3:00 PM - 6:00 PM',
      purpose: 'Club Meeting',
      status: 'pending',
      capacity: 80,
    },
    {
      id: '4',
      roomName: 'Conference Room 1',
      building: 'Admin Block',
      date: '2024-03-15',
      timeSlot: '1:00 PM - 3:00 PM',
      purpose: 'Team Discussion',
      status: 'rejected',
      capacity: 20,
    },
  ]);

  const availableRooms = [
    { name: 'Main Auditorium', building: 'Main Building', capacity: 300 },
    { name: 'Seminar Hall 1', building: 'Academic Block A', capacity: 100 },
    { name: 'Seminar Hall 2', building: 'Academic Block A', capacity: 80 },
    { name: 'Computer Lab 101', building: 'Science & Technology Block', capacity: 50 },
    { name: 'Computer Lab 102', building: 'Science & Technology Block', capacity: 50 },
    { name: 'Conference Room 1', building: 'Admin Block', capacity: 20 },
    { name: 'Conference Room 2', building: 'Admin Block', capacity: 25 },
    { name: 'Music Hall', building: 'Arts Building', capacity: 60 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast.success('Room booking request submitted!');
      setSubmitting(false);
      setShowForm(false);
      setFormData({
        roomName: '',
        building: '',
        date: '',
        timeSlot: '',
        purpose: '',
        expectedAttendees: '',
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
          <CheckCircle size={14} />
          Confirmed
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
        <h1 className="text-3xl font-bold text-white">Book Rooms</h1>
        <p className="text-gray-400 mt-2">Book rooms for your club events and meetings</p>
      </div>

      {/* Booking Form */}
      {showForm && (
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">New Room Booking Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomName" className="text-white">
                    Select Room
                  </Label>
                  <select
                    id="roomName"
                    value={formData.roomName}
                    onChange={(e) => {
                      const room = availableRooms.find((r) => r.name === e.target.value);
                      setFormData({
                        ...formData,
                        roomName: e.target.value,
                        building: room?.building || '',
                      });
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    required
                  >
                    <option value="">Choose a room...</option>
                    {availableRooms.map((room) => (
                      <option key={room.name} value={room.name}>
                        {room.name} - {room.building} (Capacity: {room.capacity})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="building" className="text-white">
                    Building
                  </Label>
                  <Input
                    id="building"
                    value={formData.building}
                    className="bg-gray-800 border-gray-700 text-white"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-white">
                    Date
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
                  <Label htmlFor="timeSlot" className="text-white">
                    Time Slot
                  </Label>
                  <Input
                    id="timeSlot"
                    type="text"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., 2:00 PM - 5:00 PM"
                    required
                  />
                </div>
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
                  required
                />
              </div>

              <div>
                <Label htmlFor="purpose" className="text-white">
                  Purpose
                </Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Describe the purpose of the booking..."
                  rows={3}
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

      {/* Bookings List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{booking.roomName}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {booking.building}
                    </p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    <span>{booking.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} />
                    <span>Capacity: {booking.capacity}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">Purpose:</span> {booking.purpose}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}