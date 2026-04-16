import React from 'react';
import { mockClubs, mockEvents } from '../data/mockData';

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'revision_requested';

export interface FundRequestRecord {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  justification: string;
  timeline: string;
  expectedOutcome: string;
  date: string;
  status: ReviewStatus;
  reviewNote?: string;
}

export interface EventPitchRecord {
  id: string;
  clubId: string;
  clubName: string;
  eventName: string;
  date: string;
  location: string;
  expectedAttendees: number;
  budget: number;
  description: string;
  objectives: string;
  targetAudience: string;
  presentationFileName?: string;
  status: ReviewStatus;
  reviewNote?: string;
}

export interface RoomBookingRecord {
  id: string;
  clubId: string;
  clubName: string;
  roomName: string;
  building: string;
  date: string;
  timeSlot: string;
  purpose: string;
  expectedAttendees: number;
  capacity: number;
  status: ReviewStatus;
  reviewNote?: string;
}

export interface BillSubmissionRecord {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  receiptFileName?: string;
  status: ReviewStatus;
  reviewNote?: string;
}

export interface ClubUpdateRecord {
  id: string;
  clubId: string;
  clubName: string;
  updateType: string;
  changes: Record<string, { old: string; new: string }>;
  submittedAt: string;
  status: ReviewStatus;
  reviewNote?: string;
}

export interface ConversationMessage {
  id: string;
  senderRole: 'admin' | 'club';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ConversationRecord {
  id: string;
  clubId: string;
  clubName: string;
  clubAvatar: string;
  clubPresident: string;
  online: boolean;
  messages: ConversationMessage[];
}

export interface LiveDataState {
  clubs: typeof mockClubs;
  fundRequests: FundRequestRecord[];
  eventPitches: EventPitchRecord[];
  roomBookings: RoomBookingRecord[];
  billSubmissions: BillSubmissionRecord[];
  clubUpdates: ClubUpdateRecord[];
  conversations: ConversationRecord[];
}

interface LiveDataContextValue extends LiveDataState {
  currentClub: (typeof mockClubs)[number];
  studentEvents: Array<{
    id: string;
    title: string;
    clubId: string;
    clubName: string;
    date: string;
    location: string;
    attendees: number;
    image: string;
    status: 'upcoming' | 'past';
    description: string;
    objectives?: string;
    targetAudience?: string;
    budget?: number;
  }>;
  submitFundRequest: (input: Omit<FundRequestRecord, 'id' | 'clubId' | 'clubName' | 'date' | 'status'>) => void;
  reviewFundRequest: (id: string, status: ReviewStatus, reviewNote?: string) => void;
  submitEventPitch: (input: Omit<EventPitchRecord, 'id' | 'clubId' | 'clubName' | 'status'>) => void;
  reviewEventPitch: (id: string, status: ReviewStatus, reviewNote?: string) => void;
  submitRoomBooking: (input: Omit<RoomBookingRecord, 'id' | 'clubId' | 'clubName' | 'capacity' | 'status'>) => void;
  reviewRoomBooking: (id: string, status: ReviewStatus, reviewNote?: string) => void;
  submitBill: (input: Omit<BillSubmissionRecord, 'id' | 'clubId' | 'clubName' | 'status'>) => void;
  reviewBill: (id: string, status: ReviewStatus, reviewNote?: string) => void;
  submitClubUpdate: (input: Omit<ClubUpdateRecord, 'id' | 'clubId' | 'clubName' | 'submittedAt' | 'status'>) => void;
  reviewClubUpdate: (id: string, status: ReviewStatus, reviewNote?: string) => void;
  sendMessage: (clubId: string, senderRole: 'admin' | 'club', message: string) => void;
  markConversationRead: (clubId: string, viewer: 'admin' | 'club') => void;
}

const STORAGE_KEY = 'clubflow-live-data-v1';
const STORAGE_EVENT = 'clubflow-live-data-sync';
const CURRENT_CLUB_ID = '2';

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

const clubImages: Record<string, string> = Object.fromEntries(
  mockClubs.map((club) => [club.name, club.logo]),
);

const initialState: LiveDataState = {
  clubs: mockClubs,
  fundRequests: [
    {
      id: 'fund-1',
      clubId: '2',
      clubName: 'Coding Club',
      title: 'Annual Hackathon 2024',
      amount: 50000,
      category: 'Event',
      description: 'Funds for organizing 24-hour hackathon with prizes.',
      justification: 'Major annual event attracting 100+ participants.',
      timeline: 'Within 2 weeks',
      expectedOutcome: 'A campus-wide flagship innovation event.',
      date: '2026-04-12',
      status: 'pending',
    },
    {
      id: 'fund-2',
      clubId: '1',
      clubName: 'Robotics Club',
      title: 'Robot Parts and Components',
      amount: 35000,
      category: 'Equipment',
      description: 'Purchase of sensors, boards, and motors for builds.',
      justification: 'Required for the upcoming robotics competition.',
      timeline: 'Before April 30',
      expectedOutcome: 'Competition-ready robot prototypes.',
      date: '2026-04-10',
      status: 'approved',
    },
  ],
  eventPitches: [
    {
      id: 'event-1',
      clubId: '2',
      clubName: 'Coding Club',
      eventName: 'Code Sprint 2026',
      date: '2026-05-10',
      location: 'Main Auditorium',
      expectedAttendees: 120,
      budget: 45000,
      description: 'An all-day coding sprint with mentors and prizes.',
      objectives: 'Help students build projects in teams.',
      targetAudience: 'All students interested in software and product building.',
      presentationFileName: 'code-sprint-deck.pdf',
      status: 'approved',
    },
    {
      id: 'event-2',
      clubId: '1',
      clubName: 'Robotics Club',
      eventName: 'AI and ML Workshop',
      date: '2026-04-28',
      location: 'Science and Technology Block, Lab 101',
      expectedAttendees: 60,
      budget: 15000,
      description: 'Hands-on beginner workshop on machine learning fundamentals.',
      objectives: 'Introduce students to practical AI workflows.',
      targetAudience: 'Students curious about AI and robotics.',
      presentationFileName: 'ai-workshop.pdf',
      status: 'approved',
    },
    {
      id: 'event-3',
      clubId: '3',
      clubName: 'Drama Society',
      eventName: 'Annual Theatre Festival',
      date: '2026-05-22',
      location: 'Campus Theatre',
      expectedAttendees: 300,
      budget: 50000,
      description: 'A multi-day theatre showcase by student performers.',
      objectives: 'Celebrate campus performing arts.',
      targetAudience: 'All students and faculty.',
      presentationFileName: 'theatre-festival.pptx',
      status: 'pending',
    },
  ],
  roomBookings: [
    {
      id: 'room-1',
      clubId: '2',
      clubName: 'Coding Club',
      roomName: 'Seminar Hall 2',
      building: 'Academic Block A',
      date: '2026-04-25',
      timeSlot: '3:00 PM - 6:00 PM',
      purpose: 'Pre-hackathon briefing and mentor orientation.',
      expectedAttendees: 70,
      capacity: 80,
      status: 'pending',
    },
    {
      id: 'room-2',
      clubId: '5',
      clubName: 'Entrepreneurship Cell',
      roomName: 'Conference Room 1',
      building: 'Admin Block',
      date: '2026-04-24',
      timeSlot: '2:00 PM - 4:00 PM',
      purpose: 'Guest speaker prep session.',
      expectedAttendees: 18,
      capacity: 20,
      status: 'approved',
    },
  ],
  billSubmissions: [
    {
      id: 'bill-1',
      clubId: '4',
      clubName: 'Photography Club',
      title: 'Workshop Equipment',
      amount: 8500,
      category: 'Equipment',
      description: 'Lighting equipment and backdrops for photography workshop.',
      date: '2026-04-08',
      receiptFileName: 'equipment_receipt.pdf',
      status: 'pending',
    },
    {
      id: 'bill-2',
      clubId: '2',
      clubName: 'Coding Club',
      title: 'Refreshments for Meetup',
      amount: 3200,
      category: 'Food and Beverages',
      description: 'Snacks and beverages for weekly coding meetup.',
      date: '2026-04-06',
      receiptFileName: 'refreshments_bill.pdf',
      status: 'approved',
    },
  ],
  clubUpdates: [
    {
      id: 'update-1',
      clubId: '8',
      clubName: 'Sports Club',
      updateType: 'Leadership Change',
      changes: {
        president: { old: 'Chris Martinez', new: 'Jordan Taylor' },
        vicePresident: { old: 'Alex Johnson', new: 'Sam Rivera' },
      },
      submittedAt: '2026-04-09',
      status: 'pending',
    },
  ],
  conversations: [
    {
      id: 'conv-coding',
      clubId: '2',
      clubName: 'Coding Club',
      clubAvatar: clubImages['Coding Club'],
      clubPresident: 'Alex Chen',
      online: true,
      messages: [
        {
          id: 'msg-1',
          senderRole: 'club',
          senderName: 'Alex Chen',
          message: 'Hi admin, we just submitted the Code Sprint event pitch.',
          timestamp: '2026-04-16T17:20:00.000Z',
          read: true,
        },
        {
          id: 'msg-2',
          senderRole: 'admin',
          senderName: 'Admin Desk',
          message: 'Received. We are reviewing the deck and budget now.',
          timestamp: '2026-04-16T17:32:00.000Z',
          read: true,
        },
      ],
    },
    {
      id: 'conv-robotics',
      clubId: '1',
      clubName: 'Robotics Club',
      clubAvatar: clubImages['Robotics Club'],
      clubPresident: 'Alex Chen',
      online: true,
      messages: [
        {
          id: 'msg-3',
          senderRole: 'club',
          senderName: 'Alex Chen',
          message: 'Can we confirm the AI workshop venue capacity?',
          timestamp: '2026-04-15T14:00:00.000Z',
          read: false,
        },
      ],
    },
  ],
};

const LiveDataContext = React.createContext<LiveDataContextValue | null>(null);

function safeCloneInitialState(): LiveDataState {
  return JSON.parse(JSON.stringify(initialState)) as LiveDataState;
}

function readStoredState(): LiveDataState {
  if (typeof window === 'undefined') {
    return safeCloneInitialState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return safeCloneInitialState();
  }

  try {
    return JSON.parse(raw) as LiveDataState;
  } catch {
    return safeCloneInitialState();
  }
}

function persistState(nextState: LiveDataState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

function getRelativeLabel(date: string) {
  const diff = new Date().getTime() - new Date(date).getTime();
  const hours = Math.max(1, Math.round(diff / (1000 * 60 * 60)));

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function buildStudentEvents(state: LiveDataState) {
  const baseEvents = mockEvents.map((event) => ({
    id: event.id,
    title: event.title,
    clubId: state.clubs.find((club) => club.name === event.clubName)?.id || '',
    clubName: event.clubName,
    date: event.date,
    location: event.location,
    attendees: event.attendees,
    image: event.image,
    status: event.status,
    description: `${event.clubName} is hosting ${event.title}.`,
  }));

  const liveEvents = state.eventPitches
    .filter((event) => event.status === 'approved')
    .map((event) => ({
      id: event.id,
      title: event.eventName,
      clubId: event.clubId,
      clubName: event.clubName,
      date: event.date,
      location: event.location,
      attendees: event.expectedAttendees,
      image: clubImages[event.clubName] || mockEvents[0].image,
      status: new Date(event.date) >= new Date() ? 'upcoming' : 'past',
      description: event.description,
      objectives: event.objectives,
      targetAudience: event.targetAudience,
      budget: event.budget,
    }));

  const deduped = [...baseEvents];

  liveEvents.forEach((event) => {
    const existingIndex = deduped.findIndex((item) => item.title === event.title && item.clubName === event.clubName);
    if (existingIndex >= 0) {
      deduped[existingIndex] = event;
      return;
    }
    deduped.push(event);
  });

  return deduped.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function LiveDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<LiveDataState>(() => readStoredState());

  React.useEffect(() => {
    const syncState = () => {
      setState(readStoredState());
    };

    window.addEventListener('storage', syncState);
    window.addEventListener(STORAGE_EVENT, syncState);

    return () => {
      window.removeEventListener('storage', syncState);
      window.removeEventListener(STORAGE_EVENT, syncState);
    };
  }, []);

  const updateState = (updater: (current: LiveDataState) => LiveDataState) => {
    setState((current) => {
      const next = updater(current);
      persistState(next);
      return next;
    });
  };

  const currentClub = state.clubs.find((club) => club.id === CURRENT_CLUB_ID) || state.clubs[0];
  const studentEvents = buildStudentEvents(state);

  const value: LiveDataContextValue = {
    ...state,
    currentClub,
    studentEvents,
    submitFundRequest: (input) => {
      updateState((current) => ({
        ...current,
        fundRequests: [
          {
            id: `fund-${Date.now()}`,
            clubId: currentClub.id,
            clubName: currentClub.name,
            date: new Date().toISOString(),
            status: 'pending',
            ...input,
          },
          ...current.fundRequests,
        ],
      }));
    },
    reviewFundRequest: (id, status, reviewNote) => {
      updateState((current) => ({
        ...current,
        fundRequests: current.fundRequests.map((request) =>
          request.id === id ? { ...request, status, reviewNote } : request,
        ),
      }));
    },
    submitEventPitch: (input) => {
      updateState((current) => ({
        ...current,
        eventPitches: [
          {
            id: `event-${Date.now()}`,
            clubId: currentClub.id,
            clubName: currentClub.name,
            status: 'pending',
            ...input,
          },
          ...current.eventPitches,
        ],
      }));
    },
    reviewEventPitch: (id, status, reviewNote) => {
      updateState((current) => ({
        ...current,
        eventPitches: current.eventPitches.map((event) =>
          event.id === id ? { ...event, status, reviewNote } : event,
        ),
      }));
    },
    submitRoomBooking: (input) => {
      const selectedRoom = availableRooms.find((room) => room.name === input.roomName);
      updateState((current) => ({
        ...current,
        roomBookings: [
          {
            id: `room-${Date.now()}`,
            clubId: currentClub.id,
            clubName: currentClub.name,
            capacity: selectedRoom?.capacity || Number(input.expectedAttendees) || 0,
            status: 'pending',
            ...input,
          },
          ...current.roomBookings,
        ],
      }));
    },
    reviewRoomBooking: (id, status, reviewNote) => {
      updateState((current) => ({
        ...current,
        roomBookings: current.roomBookings.map((booking) =>
          booking.id === id ? { ...booking, status, reviewNote } : booking,
        ),
      }));
    },
    submitBill: (input) => {
      updateState((current) => ({
        ...current,
        billSubmissions: [
          {
            id: `bill-${Date.now()}`,
            clubId: currentClub.id,
            clubName: currentClub.name,
            status: 'pending',
            ...input,
          },
          ...current.billSubmissions,
        ],
      }));
    },
    reviewBill: (id, status, reviewNote) => {
      updateState((current) => ({
        ...current,
        billSubmissions: current.billSubmissions.map((bill) =>
          bill.id === id ? { ...bill, status, reviewNote } : bill,
        ),
      }));
    },
    submitClubUpdate: (input) => {
      updateState((current) => ({
        ...current,
        clubUpdates: [
          {
            id: `update-${Date.now()}`,
            clubId: currentClub.id,
            clubName: currentClub.name,
            submittedAt: new Date().toISOString(),
            status: 'pending',
            ...input,
          },
          ...current.clubUpdates,
        ],
      }));
    },
    reviewClubUpdate: (id, status, reviewNote) => {
      updateState((current) => ({
        ...current,
        clubUpdates: current.clubUpdates.map((update) =>
          update.id === id ? { ...update, status, reviewNote } : update,
        ),
      }));
    },
    sendMessage: (clubId, senderRole, message) => {
      updateState((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.clubId === clubId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  {
                    id: `msg-${Date.now()}`,
                    senderRole,
                    senderName: senderRole === 'admin' ? 'Admin Desk' : conversation.clubPresident,
                    message,
                    timestamp: new Date().toISOString(),
                    read: false,
                  },
                ],
              }
            : conversation,
        ),
      }));
    },
    markConversationRead: (clubId, viewer) => {
      updateState((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.clubId === clubId
            ? {
                ...conversation,
                messages: conversation.messages.map((message) =>
                  message.senderRole === viewer ? message : { ...message, read: true },
                ),
              }
            : conversation,
        ),
      }));
    },
  };

  return <LiveDataContext.Provider value={value}>{children}</LiveDataContext.Provider>;
}

export function useLiveData() {
  const context = React.useContext(LiveDataContext);

  if (!context) {
    throw new Error('useLiveData must be used inside LiveDataProvider');
  }

  return context;
}

export function getStatusTone(status: ReviewStatus) {
  if (status === 'approved') {
    return 'bg-green-500/10 text-green-400';
  }

  if (status === 'rejected') {
    return 'bg-red-500/10 text-red-400';
  }

  if (status === 'revision_requested') {
    return 'bg-orange-500/10 text-orange-400';
  }

  return 'bg-yellow-500/10 text-yellow-400';
}

export function getStatusLabel(status: ReviewStatus) {
  if (status === 'revision_requested') {
    return 'Revision Requested';
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function getConversationPreview(conversation: ConversationRecord) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return {
    lastMessage: lastMessage?.message || 'No messages yet',
    lastMessageTime: lastMessage ? getRelativeLabel(lastMessage.timestamp) : '',
    unread: conversation.messages.filter((message) => !message.read && message.senderRole === 'club').length,
  };
}

export function getFormattedMessageTime(timestamp: string) {
  return formatTimestamp(timestamp);
}
