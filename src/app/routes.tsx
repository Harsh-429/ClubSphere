import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Layout } from "./layout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";
import { ClubHeadOverview } from "./pages/ClubHead/ClubHeadOverview";
import { ClubDashboard } from "./pages/Club/ClubDashboard";
import { UpdateDetails } from "./pages/Club/UpdateDetails";
import { ClubVideoMeet } from "./pages/Club/ClubVideoMeet";
import { ClubAnalytics } from "./pages/Admin/ClubAnalytics";
import { AdminVideoMeet } from "./pages/Admin/AdminVideoMeet";
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import { StudentMemberships } from "./pages/Student/StudentMemberships";
import { BookRoomsLive } from "./pages/Club/BookRoomsLive";
import { SubmitBillsLive } from "./pages/Club/SubmitBillsLive";
import { PitchEventsLive } from "./pages/Club/PitchEventsLive";
import { RequestFundsLive } from "./pages/Club/RequestFundsLive";
import { ClubChatLive } from "./pages/Club/ClubChatLive";
import { AdminDashboardLive } from "./pages/Admin/AdminDashboardLive";
import { ReviewSubmissionsLive } from "./pages/Admin/ReviewSubmissionsLive";
import { ChatWithClubsLive } from "./pages/Admin/ChatWithClubsLive";
import { StudentEventsLive } from "./pages/Student/StudentEventsLive";
import { ClubDetailsLive } from "./pages/Student/ClubDetailsLive";

function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/select-role",
    element: <Landing />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Club Portal Routes
      { path: "club", element: <ClubDashboard /> },
      { path: "club/update-details", element: <UpdateDetails /> },
      { path: "club/book-rooms", element: <BookRoomsLive /> },
      { path: "club/submit-bills", element: <SubmitBillsLive /> },
      { path: "club/pitch-events", element: <PitchEventsLive /> },
      { path: "club/request-funds", element: <RequestFundsLive /> },
      { path: "club/chat", element: <ClubChatLive /> },
      { path: "club/video-meet", element: <ClubVideoMeet /> },

      // Admin Routes
      { path: "admin", element: <AdminDashboardLive /> },
      { path: "admin/review", element: <ReviewSubmissionsLive /> },
      { path: "admin/analytics", element: <ClubAnalytics /> },
      { path: "admin/chat-clubs", element: <ChatWithClubsLive /> },
      { path: "admin/video-meet", element: <AdminVideoMeet /> },
      { path: "admin/review-funds", element: <ReviewSubmissionsLive /> },
      { path: "admin/review-events", element: <ReviewSubmissionsLive /> },
      { path: "admin/review-rooms", element: <ReviewSubmissionsLive /> },
      { path: "admin/review-bills", element: <ReviewSubmissionsLive /> },

      // Student Routes
      { path: "student", element: <StudentDashboard /> },
      { path: "student/events", element: <StudentEventsLive /> },
      { path: "student/memberships", element: <StudentMemberships /> },
      { path: "student/clubs/:id", element: <ClubDetailsLive /> },
      
      // Catch all
      { path: "*", element: <div className="p-12 text-center text-gray-500">Page not found</div> },
    ],
  },
]);
