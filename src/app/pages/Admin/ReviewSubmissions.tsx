import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BackButton } from '../../components/BackButton';
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Building,
  FileText,
  Users,
  Presentation,
  MessageSquare,
  Video,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';
import { Textarea } from '../../components/ui/textarea';

export function ReviewSubmissions() {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [reviewNote, setReviewNote] = useState('');

  const fundRequests = [
    {
      id: 'f1',
      club: 'Coding Club',
      title: 'Annual Hackathon 2024',
      amount: 50000,
      category: 'Event',
      date: '2024-03-15',
      description: 'Funds for organizing 24-hour hackathon with prizes, food, and venue',
      justification: 'Major annual event attracting 100+ participants from multiple colleges',
    },
    {
      id: 'f2',
      club: 'Green Earth',
      title: 'Campus Clean-up Drive',
      amount: 5000,
      category: 'Event',
      date: '2024-03-22',
      description: 'Supplies for campus-wide environmental initiative',
      justification: 'Promotes sustainability and environmental awareness',
    },
  ];

  const eventPitches = [
    {
      id: 'e1',
      club: 'Robotics Club',
      eventName: 'Robot Wars Competition',
      date: '2024-04-10',
      location: 'Sports Complex',
      attendees: 200,
      budget: 75000,
      description: 'Inter-college robotics competition with multiple categories',
      hasPPT: true,
    },
    {
      id: 'e2',
      club: 'Drama Society',
      eventName: 'Annual Theatre Festival',
      date: '2024-04-20',
      location: 'Campus Theatre',
      attendees: 300,
      budget: 45000,
      description: 'Three-day theatre festival featuring student productions',
      hasPPT: true,
    },
  ];

  const roomBookings = [
    {
      id: 'r1',
      club: 'E-Cell',
      roomName: 'Seminar Hall 2',
      building: 'Academic Block A',
      date: '2024-03-30',
      timeSlot: '3:00 PM - 6:00 PM',
      purpose: 'Startup Pitch Competition',
      capacity: 80,
      expectedAttendees: 70,
    },
    {
      id: 'r2',
      club: 'Debate Society',
      roomName: 'Conference Room 1',
      building: 'Admin Block',
      date: '2024-03-28',
      timeSlot: '2:00 PM - 5:00 PM',
      purpose: 'Mock Debate Session',
      capacity: 30,
      expectedAttendees: 25,
    },
  ];

  const billSubmissions = [
    {
      id: 'b1',
      club: 'Photography Club',
      title: 'Workshop Equipment',
      amount: 8500,
      category: 'Equipment',
      date: '2024-03-10',
      description: 'Lighting equipment and backdrops for photography workshop',
      receiptFile: 'equipment_receipt.pdf',
    },
    {
      id: 'b2',
      club: 'Coding Club',
      title: 'Refreshments for Meetup',
      amount: 3200,
      category: 'Food & Beverages',
      date: '2024-03-12',
      description: 'Snacks and beverages for weekly coding meetup (50 attendees)',
      receiptFile: 'refreshments_bill.pdf',
    },
  ];

  const clubUpdates = [
    {
      id: 'cu1',
      club: 'Sports Club',
      updateType: 'Leadership Change',
      changes: {
        president: { old: 'Chris Martinez', new: 'Jordan Taylor' },
        vicePresident: { old: 'Alex Johnson', new: 'Sam Rivera' },
      },
      date: '2024-03-18',
    },
    {
      id: 'cu2',
      club: 'Photography Club',
      updateType: 'Contact Information',
      changes: {
        email: { old: 'photo@college.edu', new: 'photography.club@college.edu' },
        instagram: { old: '@photoclub', new: '@photoclub_official' },
      },
      date: '2024-03-16',
    },
  ];

  const handleApprove = (type: string, id: string) => {
    toast.success(`${type} approved successfully!`);
    setSelectedSubmission(null);
    setReviewNote('');
  };

  const handleReject = (type: string, id: string) => {
    if (!reviewNote.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    toast.error(`${type} rejected. Notification sent to club.`);
    setSelectedSubmission(null);
    setReviewNote('');
  };

  const handleRequestRevision = (type: string, id: string) => {
    if (!reviewNote.trim()) {
      toast.error('Please provide revision requirements');
      return;
    }
    toast('Revision requested. Club has been notified.', { icon: '📝' });
    setSelectedSubmission(null);
    setReviewNote('');
  };

  const handleChatWithClub = (clubName: string) => {
    toast.success(`Opening chat with ${clubName}...`);
  };

  const handleVideoCall = (clubName: string) => {
    toast.success(`Initiating video call with ${clubName}...`);
  };

  return (
    <div className="space-y-6">
      <BackButton to="/admin" />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Review Submissions</h1>
        <p className="text-gray-400 mt-2">Review and approve club submissions</p>
      </div>

      <Tabs defaultValue="funds" className="space-y-6">
        <TabsList className="bg-gray-800 border border-gray-700">
          <TabsTrigger value="funds" className="data-[state=active]:bg-blue-600">
            <DollarSign size={16} className="mr-2" />
            Fund Requests ({fundRequests.length})
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-blue-600">
            <Calendar size={16} className="mr-2" />
            Event Pitches ({eventPitches.length})
          </TabsTrigger>
          <TabsTrigger value="rooms" className="data-[state=active]:bg-blue-600">
            <Building size={16} className="mr-2" />
            Room Bookings ({roomBookings.length})
          </TabsTrigger>
          <TabsTrigger value="bills" className="data-[state=active]:bg-blue-600">
            <FileText size={16} className="mr-2" />
            Bills ({billSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-blue-600">
            <Users size={16} className="mr-2" />
            Club Updates ({clubUpdates.length})
          </TabsTrigger>
        </TabsList>

        {/* Fund Requests Tab */}
        <TabsContent value="funds" className="space-y-4">
          {fundRequests.map((request) => (
            <Card key={request.id} className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{request.title}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium">
                        {request.club}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{request.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">₹{request.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">{request.date}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-300">Description:</span>
                    <p className="text-sm text-gray-400 mt-1">{request.description}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-300">Justification:</span>
                    <p className="text-sm text-gray-400 mt-1">{request.justification}</p>
                  </div>
                </div>

                {selectedSubmission?.id === request.id && (
                  <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                    <label className="block text-sm font-medium text-white mb-2">
                      Review Notes (Required for rejection/revision)
                    </label>
                    <Textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Add your comments or reasons..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleApprove('Fund request', request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === request.id) {
                        handleReject('Fund request', request.id);
                      } else {
                        setSelectedSubmission(request);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === request.id) {
                        handleRequestRevision('Fund request', request.id);
                      } else {
                        setSelectedSubmission(request);
                      }
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Clock size={16} className="mr-2" />
                    Request Revision
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    onClick={() => handleChatWithClub(request.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Chat
                  </Button>
                  <Button
                    onClick={() => handleVideoCall(request.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Video size={16} className="mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Event Pitches Tab */}
        <TabsContent value="events" className="space-y-4">
          {eventPitches.map((pitch) => (
            <Card key={pitch.id} className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{pitch.eventName}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium">
                        {pitch.club}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">₹{pitch.budget.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Budget</div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{pitch.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={16} />
                    <span>{pitch.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Building size={16} />
                    <span>{pitch.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users size={16} />
                    <span>{pitch.attendees} attendees</span>
                  </div>
                </div>

                {pitch.hasPPT && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-4"
                  >
                    <Presentation size={14} className="mr-2" />
                    View Presentation
                  </Button>
                )}

                {selectedSubmission?.id === pitch.id && (
                  <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                    <label className="block text-sm font-medium text-white mb-2">
                      Review Notes (Required for rejection/revision)
                    </label>
                    <Textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Add your comments or reasons..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleApprove('Event pitch', pitch.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === pitch.id) {
                        handleReject('Event pitch', pitch.id);
                      } else {
                        setSelectedSubmission(pitch);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === pitch.id) {
                        handleRequestRevision('Event pitch', pitch.id);
                      } else {
                        setSelectedSubmission(pitch);
                      }
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Clock size={16} className="mr-2" />
                    Request Revision
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    onClick={() => handleChatWithClub(pitch.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Chat
                  </Button>
                  <Button
                    onClick={() => handleVideoCall(pitch.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Video size={16} className="mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Room Bookings Tab */}
        <TabsContent value="rooms" className="space-y-4">
          {roomBookings.map((booking) => (
            <Card key={booking.id} className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{booking.roomName}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium">
                        {booking.club}
                      </span>
                    </div>
                    <p className="text-gray-400">{booking.building}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Date & Time:</span>
                    <p className="text-white">{booking.date} • {booking.timeSlot}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Purpose:</span>
                    <p className="text-white">{booking.purpose}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Capacity:</span>
                    <p className="text-white">{booking.capacity} people</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Expected Attendees:</span>
                    <p className="text-white">{booking.expectedAttendees} people</p>
                  </div>
                </div>

                {selectedSubmission?.id === booking.id && (
                  <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                    <label className="block text-sm font-medium text-white mb-2">
                      Review Notes (Required for rejection)
                    </label>
                    <Textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Add your comments or reasons..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleApprove('Room booking', booking.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === booking.id) {
                        handleReject('Room booking', booking.id);
                      } else {
                        setSelectedSubmission(booking);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    onClick={() => handleChatWithClub(booking.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Bills Tab */}
        <TabsContent value="bills" className="space-y-4">
          {billSubmissions.map((bill) => (
            <Card key={bill.id} className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{bill.title}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium">
                        {bill.club}
                      </span>
                    </div>
                    <p className="text-gray-400">{bill.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">₹{bill.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">{bill.date}</div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{bill.description}</p>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-4"
                >
                  <FileText size={14} className="mr-2" />
                  View Receipt: {bill.receiptFile}
                </Button>

                {selectedSubmission?.id === bill.id && (
                  <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                    <label className="block text-sm font-medium text-white mb-2">
                      Review Notes (Required for rejection)
                    </label>
                    <Textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Add your comments or reasons..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleApprove('Bill submission', bill.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === bill.id) {
                        handleReject('Bill submission', bill.id);
                      } else {
                        setSelectedSubmission(bill);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    onClick={() => handleChatWithClub(bill.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Club Updates Tab */}
        <TabsContent value="updates" className="space-y-4">
          {clubUpdates.map((update) => (
            <Card key={update.id} className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{update.updateType}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium">
                        {update.club}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{update.date}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {Object.entries(update.changes).map(([key, value]: [string, any]) => (
                    <div key={key} className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-300 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <span className="text-xs text-gray-500">Old:</span>
                          <p className="text-white">{value.old}</p>
                        </div>
                        <span className="text-gray-600">→</span>
                        <div className="flex-1">
                          <span className="text-xs text-gray-500">New:</span>
                          <p className="text-green-400">{value.new}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSubmission?.id === update.id && (
                  <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                    <label className="block text-sm font-medium text-white mb-2">
                      Review Notes (Required for rejection)
                    </label>
                    <Textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Add your comments or reasons..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleApprove('Club update', update.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedSubmission?.id === update.id) {
                        handleReject('Club update', update.id);
                      } else {
                        setSelectedSubmission(update);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    onClick={() => handleChatWithClub(update.club)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}