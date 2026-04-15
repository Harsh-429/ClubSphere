import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Layout } from "./layout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";
import { ClubHeadOverview } from "./pages/ClubHead/ClubHeadOverview";
import { ClubDashboard } from "./pages/Club/ClubDashboard";
import { UpdateDetails } from "./pages/Club/UpdateDetails";
import { BookRooms } from "./pages/Club/BookRooms";
import { SubmitBills } from "./pages/Club/SubmitBills";
import { PitchEvents } from "./pages/Club/PitchEvents";
import { RequestFunds } from "./pages/Club/RequestFunds";
import { ClubChat } from "./pages/Club/ClubChat";
import { ClubVideoMeet } from "./pages/Club/ClubVideoMeet";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { ReviewSubmissions } from "./pages/Admin/ReviewSubmissions";
import { ClubAnalytics } from "./pages/Admin/ClubAnalytics";
import { ChatWithClubs } from "./pages/Admin/ChatWithClubs";
import { AdminVideoMeet } from "./pages/Admin/AdminVideoMeet";
import { StudentDashboard } from "./pages/Student/StudentDashboard";

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
      { path: "club/book-rooms", element: <BookRooms /> },
      { path: "club/submit-bills", element: <SubmitBills /> },
      { path: "club/pitch-events", element: <PitchEvents /> },
      { path: "club/request-funds", element: <RequestFunds /> },
      { path: "club/chat", element: <ClubChat /> },
      { path: "club/video-meet", element: <ClubVideoMeet /> },

      // Admin Routes
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/review", element: <ReviewSubmissions /> },
      { path: "admin/analytics", element: <ClubAnalytics /> },
      { path: "admin/chat-clubs", element: <ChatWithClubs /> },
      { path: "admin/video-meet", element: <AdminVideoMeet /> },
      { path: "admin/review-funds", element: <ReviewSubmissions /> },
      { path: "admin/review-events", element: <ReviewSubmissions /> },
      { path: "admin/review-rooms", element: <ReviewSubmissions /> },
      { path: "admin/review-bills", element: <ReviewSubmissions /> },

      // Student Routes
      { path: "student", element: <StudentDashboard /> },
      
      // Catch all
      { path: "*", element: <div className="p-12 text-center text-gray-500">Page not found</div> },
    ],
  },
]);