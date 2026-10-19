import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStoreProvider } from "@/store/AppStore";
import AppShell from "@/components/AppShell";
import RoleSelect from "./pages/RoleSelect";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

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
              <Route index element={<ComingSoon />} />
              <Route path="trainings" element={<ComingSoon />} />
              <Route path="trainings/:id" element={<ComingSoon />} />
              <Route path="trainings/:id/apply" element={<ComingSoon />} />
              <Route path="my-trainings" element={<ComingSoon />} />
              <Route path="my-trainings/:appId" element={<ComingSoon />} />
              <Route path="my-trainings/:appId/confirmation" element={<ComingSoon />} />
              <Route path="my-trainings/:appId/certificate" element={<ComingSoon />} />
              <Route path="calendar" element={<ComingSoon />} />
              <Route path="notifications" element={<ComingSoon />} />
              <Route path="profile" element={<ComingSoon />} />
            </Route>
            <Route path="/admin" element={<AppShell role="admin" />}>
              <Route index element={<ComingSoon />} />
              <Route path="trainings" element={<ComingSoon />} />
              <Route path="trainings/new" element={<ComingSoon />} />
              <Route path="trainings/:id" element={<ComingSoon />} />
              <Route path="trainings/:id/edit" element={<ComingSoon />} />
              <Route path="trainings/:id/attendance" element={<ComingSoon />} />
              <Route path="applications" element={<ComingSoon />} />
              <Route path="applications/:appId" element={<ComingSoon />} />
              <Route path="participants" element={<ComingSoon />} />
              <Route path="venues" element={<ComingSoon />} />
              <Route path="reports" element={<ComingSoon />} />
              <Route path="notifications" element={<ComingSoon />} />
              <Route path="settings" element={<ComingSoon />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppStoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
