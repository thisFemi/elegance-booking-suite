import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStoreProvider } from "@/store/AppStore";
import AppShell from "@/components/AppShell";
import RoleSelect from "./pages/RoleSelect";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/participant/Dashboard";
import Catalogue from "./pages/participant/Catalogue";
import TrainingDetail from "./pages/participant/TrainingDetail";
import Apply from "./pages/participant/Apply";
import MyTrainings from "./pages/participant/MyTrainings";
import ApplicationDetail from "./pages/participant/ApplicationDetail";
import CalendarPage from "./pages/participant/CalendarPage";
import Notifications from "./pages/shared/Notifications";
import Profile from "./pages/participant/Profile";
import { Confirmation, Certificate } from "./pages/participant/Documents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTrainings from "./pages/admin/AdminTrainings";
import TrainingForm from "./pages/admin/TrainingForm";
import AdminTrainingDetail from "./pages/admin/AdminTrainingDetail";
import Attendance from "./pages/admin/Attendance";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminApplicationDetail from "./pages/admin/AdminApplicationDetail";
import Participants from "./pages/admin/Participants";
import Venues from "./pages/admin/Venues";
import Reports from "./pages/admin/Reports";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppStoreProvider>
        <Sonner position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RoleSelect />} />
            <Route path="/app" element={<AppShell role="participant" />}>
              <Route index element={<Dashboard />} />
              <Route path="trainings" element={<Catalogue />} />
              <Route path="trainings/:id" element={<TrainingDetail />} />
              <Route path="trainings/:id/apply" element={<Apply />} />
              <Route path="my-trainings" element={<MyTrainings />} />
              <Route path="my-trainings/:appId" element={<ApplicationDetail />} />
              <Route path="my-trainings/:appId/confirmation" element={<Confirmation />} />
              <Route path="my-trainings/:appId/certificate" element={<Certificate />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="notifications" element={<Notifications audience="participant" />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/admin" element={<AppShell role="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="trainings" element={<AdminTrainings />} />
              <Route path="trainings/new" element={<TrainingForm />} />
              <Route path="trainings/:id" element={<AdminTrainingDetail />} />
              <Route path="trainings/:id/edit" element={<TrainingForm />} />
              <Route path="trainings/:id/attendance" element={<Attendance />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="applications/:appId" element={<AdminApplicationDetail />} />
              <Route path="participants" element={<Participants />} />
              <Route path="venues" element={<Venues />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications audience="admin" />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppStoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
