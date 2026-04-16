import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, FileText, MessageSquare, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import { getStatusLabel, getStatusTone, useLiveData } from '../../state/LiveDataContext';

export function ReviewSubmissionsLive() {
  const navigate = useNavigate();
  const {
    fundRequests,
    eventPitches,
    roomBookings,
    billSubmissions,
    reviewFundRequest,
    reviewEventPitch,
    reviewRoomBooking,
    reviewBill,
  } = useLiveData();
  const [activeId, setActiveId] = useState('');
  const [reviewNote, setReviewNote] = useState('');

  const applyReview = (handler: (id: string, status: 'approved' | 'rejected' | 'revision_requested', note?: string) => void, id: string, status: 'approved' | 'rejected' | 'revision_requested') => {
    if (status !== 'approved' && !reviewNote.trim()) {
      toast.error('Please add a note for rejections or revisions.');
      return;
    }
    handler(id, status, reviewNote.trim() || undefined);
    setActiveId('');
    setReviewNote('');
    toast.success(`Submission ${status.replace('_', ' ')}.`);
  };

  return (
    <div className="space-y-6">
      <BackButton to="/admin" />

      <div>
        <h1 className="text-3xl font-bold text-white">Review Submissions</h1>
        <p className="mt-2 text-gray-400">Approvals here immediately change club and student-facing screens.</p>
      </div>

      <Tabs defaultValue="funds" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap gap-2 bg-gray-800 p-2">
          <TabsTrigger value="funds" className="data-[state=active]:bg-blue-600">Funds ({fundRequests.length})</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-blue-600">Events ({eventPitches.length})</TabsTrigger>
          <TabsTrigger value="rooms" className="data-[state=active]:bg-blue-600">Permissions ({roomBookings.length})</TabsTrigger>
          <TabsTrigger value="bills" className="data-[state=active]:bg-blue-600">Bills ({billSubmissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="funds" className="space-y-4">
          {fundRequests.map((request) => (
            <ReviewCard
              key={request.id}
              id={request.id}
              activeId={activeId}
              setActiveId={setActiveId}
              reviewNote={reviewNote}
              setReviewNote={setReviewNote}
              title={request.title}
              clubName={request.clubName}
              status={request.status}
              meta={`INR ${request.amount.toLocaleString()} • ${request.category}`}
              description={request.description}
              extra={request.justification}
              onApprove={() => applyReview(reviewFundRequest, request.id, 'approved')}
              onReject={() => applyReview(reviewFundRequest, request.id, 'rejected')}
              onRevision={() => applyReview(reviewFundRequest, request.id, 'revision_requested')}
              onChat={() => navigate('/admin/chat-clubs')}
            />
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {eventPitches.map((event) => (
            <ReviewCard
              key={event.id}
              id={event.id}
              activeId={activeId}
              setActiveId={setActiveId}
              reviewNote={reviewNote}
              setReviewNote={setReviewNote}
              title={event.eventName}
              clubName={event.clubName}
              status={event.status}
              meta={`${event.location} • ${new Date(event.date).toLocaleDateString()}`}
              description={event.description}
              extra={`Audience: ${event.targetAudience}`}
              onApprove={() => applyReview(reviewEventPitch, event.id, 'approved')}
              onReject={() => applyReview(reviewEventPitch, event.id, 'rejected')}
              onRevision={() => applyReview(reviewEventPitch, event.id, 'revision_requested')}
              onChat={() => navigate('/admin/chat-clubs')}
            />
          ))}
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          {roomBookings.map((booking) => (
            <ReviewCard
              key={booking.id}
              id={booking.id}
              activeId={activeId}
              setActiveId={setActiveId}
              reviewNote={reviewNote}
              setReviewNote={setReviewNote}
              title={booking.roomName}
              clubName={booking.clubName}
              status={booking.status}
              meta={`${booking.building} • ${booking.timeSlot}`}
              description={booking.purpose}
              extra={`${booking.expectedAttendees} expected attendees`}
              onApprove={() => applyReview(reviewRoomBooking, booking.id, 'approved')}
              onReject={() => applyReview(reviewRoomBooking, booking.id, 'rejected')}
              onRevision={() => applyReview(reviewRoomBooking, booking.id, 'revision_requested')}
              onChat={() => navigate('/admin/chat-clubs')}
            />
          ))}
        </TabsContent>

        <TabsContent value="bills" className="space-y-4">
          {billSubmissions.map((bill) => (
            <ReviewCard
              key={bill.id}
              id={bill.id}
              activeId={activeId}
              setActiveId={setActiveId}
              reviewNote={reviewNote}
              setReviewNote={setReviewNote}
              title={bill.title}
              clubName={bill.clubName}
              status={bill.status}
              meta={`INR ${bill.amount.toLocaleString()} • ${bill.category}`}
              description={bill.description}
              extra={bill.receiptFileName || 'Receipt attached'}
              onApprove={() => applyReview(reviewBill, bill.id, 'approved')}
              onReject={() => applyReview(reviewBill, bill.id, 'rejected')}
              onRevision={() => applyReview(reviewBill, bill.id, 'revision_requested')}
              onChat={() => navigate('/admin/chat-clubs')}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReviewCard(props: {
  id: string;
  activeId: string;
  setActiveId: (id: string) => void;
  reviewNote: string;
  setReviewNote: (note: string) => void;
  title: string;
  clubName: string;
  status: string;
  meta: string;
  description: string;
  extra: string;
  onApprove: () => void;
  onReject: () => void;
  onRevision: () => void;
  onChat: () => void;
}) {
  const isActive = props.activeId === props.id;

  return (
    <Card className="border-gray-800 bg-[#111827]">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-white">{props.title}</h3>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">{props.clubName}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(props.status as any)}`}>{getStatusLabel(props.status as any)}</span>
            </div>
            <p className="mt-3 text-sm text-gray-400">{props.meta}</p>
            <p className="mt-3 text-sm text-gray-300">{props.description}</p>
            <p className="mt-2 text-sm text-gray-500">{props.extra}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button onClick={props.onApprove} className="bg-green-600 text-white hover:bg-green-700"><CheckCircle size={16} className="mr-2" />Approve</Button>
            <Button onClick={() => (isActive ? props.onReject() : props.setActiveId(props.id))} className="bg-red-600 text-white hover:bg-red-700"><XCircle size={16} className="mr-2" />Reject</Button>
            <Button onClick={() => (isActive ? props.onRevision() : props.setActiveId(props.id))} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800"><Clock size={16} className="mr-2" />Revision</Button>
          </div>
        </div>

        {isActive && (
          <div className="mt-4 rounded-lg bg-gray-800/60 p-4">
            <Textarea value={props.reviewNote} onChange={(e) => props.setReviewNote(e.target.value)} className="bg-gray-900 text-white" rows={3} placeholder="Add feedback or revision requirements..." />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 border-t border-gray-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500"><Calendar size={14} />Live status updates are enabled</div>
          <Button onClick={props.onChat} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800"><MessageSquare size={16} className="mr-2" />Open Chat</Button>
        </div>
      </CardContent>
    </Card>
  );
}
