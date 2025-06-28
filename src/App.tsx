
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./locales/index";
import Welcome from "./pages/Welcome";
import LocationDetails from "./pages/LocationDetails";
import DateTime from "./pages/DateTime";
import PoolMap from "./pages/PoolMap";
import BookingSummary from "./pages/BookingSummary";
import PaymentSelection from "./pages/PaymentSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Reservations from "./pages/admin/Reservations";
import PoolLayout from "./pages/admin/PoolLayout";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/booking/location-details" element={<LocationDetails />} />
            <Route path="/booking/datetime" element={<DateTime />} />
            <Route path="/booking/poolmap" element={<PoolMap />} />
            <Route path="/booking/summary" element={<BookingSummary />} />
            <Route path="/booking/payment" element={<PaymentSelection />} />
            <Route path="/booking/confirmation" element={<BookingConfirmation />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/reservations" element={<Reservations />} />
            <Route path="/admin/pool-layout" element={<PoolLayout />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
