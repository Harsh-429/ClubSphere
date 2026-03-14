export type ProposalStatus = 'pending' | 'approved' | 'rejected';

export interface Proposal {
  id: string;
  title: string;
  clubName: string;
  date: string;
  status: ProposalStatus;
  budget: number;
  description: string;
  category: 'Event' | 'Equipment' | 'Travel' | 'Other';
}

export interface Club {
  id: string;
  name: string;
  category: string;
  members: number;
  healthScore: number;
  president: string;
  logo: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  clubName: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  status: 'upcoming' | 'past';
}

export interface Reimbursement {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  receiptUrl?: string;
  description: string;
}

export interface RoomBooking {
  id: string;
  roomName: string;
  building: string;
  date: string;
  timeSlot: string;
  purpose: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  capacity: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  avatar: string;
  isUser: boolean;
}

export interface VideoMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  host: string;
  status: 'scheduled' | 'ongoing' | 'completed';
}

export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Robotics Club',
    category: 'Technology',
    members: 150,
    healthScore: 92,
    president: 'Alex Chen',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    description: 'Exploring robotics, AI, and automation through hands-on projects and competitions.',
  },
  {
    id: '2',
    name: 'Coding Club',
    category: 'Technology',
    members: 180,
    healthScore: 95,
    president: 'Jamie Lee',
    logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
    description: 'Building software projects and participating in competitive programming.',
  },
  {
    id: '3',
    name: 'Drama Society',
    category: 'Arts',
    members: 90,
    healthScore: 88,
    president: 'Sarah Miller',
    logo: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=100&h=100&fit=crop',
    description: 'Performing arts, theater productions, and creative expression.',
  },
  {
    id: '4',
    name: 'Photography Club',
    category: 'Arts',
    members: 75,
    healthScore: 86,
    president: 'Emma Wilson',
    logo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop',
    description: 'Capturing moments and sharing perspectives through photography.',
  },
  {
    id: '5',
    name: 'Entrepreneurship Cell',
    category: 'Business',
    members: 120,
    healthScore: 90,
    president: 'Michael Brown',
    logo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=100&fit=crop',
    description: 'Fostering entrepreneurial mindset through workshops and startup challenges.',
  },
  {
    id: '6',
    name: 'Debate Society',
    category: 'Academic',
    members: 65,
    healthScore: 85,
    president: 'Jordan Lee',
    logo: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=100&h=100&fit=crop',
    description: 'Developing critical thinking and public speaking skills.',
  },
  {
    id: '7',
    name: 'Green Earth',
    category: 'Environment',
    members: 110,
    healthScore: 83,
    president: 'Olivia Green',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?w=100&h=100&fit=crop',
    description: 'Promoting sustainability and environmental awareness on campus.',
  },
  {
    id: '8',
    name: 'Sports Club',
    category: 'Sports',
    members: 200,
    healthScore: 91,
    president: 'Chris Martinez',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop',
    description: 'Various sports activities and intramural competitions.',
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'p1',
    title: 'Annual Hackathon 2024',
    clubName: 'Coding Club',
    date: '2024-03-15',
    status: 'pending',
    budget: 5000,
    description: 'Requesting funds for prizes, food, and venue setup for 24h hackathon.',
    category: 'Event',
  },
  {
    id: 'p2',
    title: 'Robot Parts & Components',
    clubName: 'Robotics Club',
    date: '2024-02-28',
    status: 'approved',
    budget: 3500,
    description: 'Purchase of Arduino boards, sensors, motors, and chassis for competition robots.',
    category: 'Equipment',
  },
  {
    id: 'p3',
    title: 'National Debate Championship Travel',
    clubName: 'Debate Society',
    date: '2024-04-10',
    status: 'rejected',
    budget: 3000,
    description: 'Travel expenses for 5 members to attend nationals.',
    category: 'Travel',
  },
  {
    id: 'p4',
    title: 'Campus Clean-up Drive',
    clubName: 'Green Earth',
    date: '2024-03-22',
    status: 'pending',
    budget: 500,
    description: 'Supplies for campus-wide clean-up initiative.',
    category: 'Event',
  },
  {
    id: 'p5',
    title: 'Camera Equipment Upgrade',
    clubName: 'Photography Club',
    date: '2024-03-01',
    status: 'approved',
    budget: 2500,
    description: 'Purchase of new DSLR cameras and lighting equipment.',
    category: 'Equipment',
  },
  {
    id: 'p6',
    title: 'Startup Summit 2024',
    clubName: 'Entrepreneurship Cell',
    date: '2024-04-05',
    status: 'pending',
    budget: 4000,
    description: 'Organizing startup summit with industry speakers and pitch competition.',
    category: 'Event',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'AI & Machine Learning Workshop',
    clubName: 'Robotics Club',
    date: '2024-03-20',
    location: 'Science & Technology Block, Lab 101',
    attendees: 50,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 'e2',
    title: 'Annual Photo Exhibition',
    clubName: 'Photography Club',
    date: '2024-03-25',
    location: 'Student Center Hall',
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 'e3',
    title: 'Inter-College Debate Finals',
    clubName: 'Debate Society',
    date: '2024-02-15',
    location: 'Main Auditorium',
    attendees: 200,
    image: 'https://images.unsplash.com/photo-1475721027767-p28136009bf9?w=800&q=80',
    status: 'past',
  },
  {
    id: 'e4',
    title: 'Code Sprint 24h Hackathon',
    clubName: 'Coding Club',
    date: '2024-03-30',
    location: 'Computer Science Building',
    attendees: 80,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 'e5',
    title: 'Pitch Perfect: Startup Competition',
    clubName: 'Entrepreneurship Cell',
    date: '2024-04-12',
    location: 'Business School Auditorium',
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 'e6',
    title: 'Environmental Awareness Week',
    clubName: 'Green Earth',
    date: '2024-03-18',
    location: 'Campus Ground',
    attendees: 300,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 'e7',
    title: 'Annual Drama Production: Hamlet',
    clubName: 'Drama Society',
    date: '2024-04-20',
    location: 'Campus Theater',
    attendees: 250,
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 'e8',
    title: 'Sports Day 2024',
    clubName: 'Sports Club',
    date: '2024-03-28',
    location: 'Sports Complex',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    status: 'upcoming',
  },
];

export const mockReimbursements: Reimbursement[] = [
  {
    id: 'r1',
    title: 'Pizza for Hackathon',
    amount: 450,
    date: '2024-02-20',
    status: 'approved',
    category: 'Food & Beverages',
    description: 'Food expenses for 50 participants',
    receiptUrl: 'https://example.com/receipt1.pdf',
  },
  {
    id: 'r2',
    title: 'Workshop Materials',
    amount: 280,
    date: '2024-03-01',
    status: 'pending',
    category: 'Materials',
    description: 'Printing and stationery for workshop',
  },
  {
    id: 'r3',
    title: 'Camera Lens Purchase',
    amount: 1200,
    date: '2024-02-15',
    status: 'approved',
    category: 'Equipment',
    description: 'Professional lens for club camera',
    receiptUrl: 'https://example.com/receipt3.pdf',
  },
  {
    id: 'r4',
    title: 'Event Decoration',
    amount: 150,
    date: '2024-03-05',
    status: 'rejected',
    category: 'Decoration',
    description: 'Banner and decoration for annual event',
  },
];

export const mockRoomBookings: RoomBooking[] = [
  {
    id: 'rb1',
    roomName: 'Auditorium',
    building: 'Main Building',
    date: '2024-03-25',
    timeSlot: '2:00 PM - 5:00 PM',
    purpose: 'Annual Tech Talk',
    status: 'confirmed',
    capacity: 300,
  },
  {
    id: 'rb2',
    roomName: 'Computer Lab 101',
    building: 'Science & Technology Block',
    date: '2024-03-20',
    timeSlot: '10:00 AM - 4:00 PM',
    purpose: 'AI Workshop',
    status: 'confirmed',
    capacity: 50,
  },
  {
    id: 'rb3',
    roomName: 'Seminar Hall 2',
    building: 'Academic Block A',
    date: '2024-03-30',
    timeSlot: '3:00 PM - 6:00 PM',
    purpose: 'Club Meeting',
    status: 'pending',
    capacity: 80,
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'cm1',
    sender: 'Faculty Advisor',
    message: 'Hi, I reviewed your proposal for the hackathon. It looks good overall!',
    timestamp: '10:30 AM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isUser: false,
  },
  {
    id: 'cm2',
    sender: 'You',
    message: 'Thank you! Do you have any suggestions for improvement?',
    timestamp: '10:32 AM',
    avatar: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop',
    isUser: true,
  },
  {
    id: 'cm3',
    sender: 'Faculty Advisor',
    message: 'Could you add more details about the judging criteria? Also, the venue setup budget seems a bit high.',
    timestamp: '10:35 AM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isUser: false,
  },
  {
    id: 'cm4',
    sender: 'You',
    message: 'Sure, I\'ll update that. The venue budget includes chairs, tables, and AV equipment rental.',
    timestamp: '10:38 AM',
    avatar: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop',
    isUser: true,
  },
];

export const mockVideoMeetings: VideoMeeting[] = [
  {
    id: 'vm1',
    title: 'Budget Review Meeting',
    date: '2024-03-18',
    time: '2:00 PM',
    participants: 5,
    host: 'Council Member',
    status: 'scheduled',
  },
  {
    id: 'vm2',
    title: 'Project Pitch Presentation',
    date: '2024-03-22',
    time: '4:00 PM',
    participants: 8,
    host: 'Faculty Advisor',
    status: 'scheduled',
  },
  {
    id: 'vm3',
    title: 'Weekly Club Sync',
    date: '2024-03-15',
    time: '3:00 PM',
    participants: 12,
    host: 'Club President',
    status: 'completed',
  },
];