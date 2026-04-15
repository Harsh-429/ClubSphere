import React, { useState } from 'react';
import { Building, Calendar, Clock, Users, MapPin, Plus, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { mockRoomBookings } from '../../data/mockData';

const availableRooms = [
  { id: 'r1', name: 'Auditorium', building: 'Main Building', capacity: 300, facilities: ['Projector', 'Sound System', 'Stage'] },
  { id: 'r2', name: 'Seminar Hall 1', building: 'Academic Block A', capacity: 100, facilities: ['Projector', 'Whiteboard'] },
  { id: 'r3', name: 'Seminar Hall 2', building: 'Academic Block A', capacity: 80, facilities: ['Projector', 'Whiteboard', 'AC'] },
  { id: 'r4', name: 'Computer Lab 101', building: 'Science & Technology Block', capacity: 50, facilities: ['Computers', 'Projector', 'AC'] },
  { id: 'r5', name: 'Computer Lab 102', building: 'Science & Technology Block', capacity: 50, facilities: ['Computers', 'Projector'] },
  { id: 'r6', name: 'Meeting Room 1', building: 'Admin Block', capacity: 20, facilities: ['Whiteboard', 'AC', 'Video Conference'] },
  { id: 'r7', name: 'Multipurpose Hall', building: 'Student Center', capacity: 200, facilities: ['Stage', 'Sound System', 'Lighting'] },
];

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
];

export function RoomBooking() {
  const [bookings, setBookings] = useState(mockRoomBookings);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomId: '',
    date: '',
    timeSlot: '',
    purpose: '',
    attendees: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRoom = availableRooms.find(r => r.id === formData.roomId);
    if (!selectedRoom) return;

    const newBooking = {
      id: `rb${Date.now()}`,
      roomName: selectedRoom.name,
      building: selectedRoom.building,
      date: formData.date,
      timeSlot: formData.timeSlot,
      purpose: formData.purpose,
      status: 'pending' as const,
      capacity: selectedRoom.capacity,
    };

    setBookings([newBooking, ...bookings]);
    setShowForm(false);
    setFormData({ roomId: '', date: '', timeSlot: '', purpose: '', attendees: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Room Booking</h1>
          <p className="text-gray-400">Reserve rooms for your club activities</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/25"
        >
          <Plus size={20} />
          New Booking
        </button>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Book a Room</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Room *
                </label>
                <select
                  required
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Choose a room</option>
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.building} (Capacity: {room.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time Slot *
                </label>
                <select
                  required
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Choose time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Attendees *
                </label>
                <input
                  type="number"
                  required
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Number of attendees"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Purpose *
              </label>
              <textarea
                required
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                rows={3}
                className="w-full bg-[#0b1120] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe the purpose of booking..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Submit Booking
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Available Rooms */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#111827] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Building size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{room.name}</h3>
                    <p className="text-sm text-gray-400">{room.building}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users size={16} className="text-blue-400" />
                  <span>Capacity: {room.capacity}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Bookings */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">My Bookings ({bookings.length})</h2>
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#111827] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-white">{booking.roomName}</h3>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={16} className="text-blue-400" />
                      <span>{booking.building}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} className="text-blue-400" />
                      <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={16} className="text-blue-400" />
                      <span>{booking.timeSlot}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-300">Purpose:</span> {booking.purpose}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
