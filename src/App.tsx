import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import TreksPage from "./pages/TreksPage";
import TrekDetailPage from "./pages/TrekDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AtlasPage from "./pages/AtlasPage";
import ProgramPage from "./pages/ProgramPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import InsurancePage from "./pages/InsurancePage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/treks" element={<TreksPage />} />
          <Route path="/treks/:id" element={<TrekDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/atlas" element={<AtlasPage />} />
          <Route path="/programs" element={<Navigate to="/programs/junior-explorers" replace />} />
          <Route path="/programs/lady-explorers" element={<Navigate to="/programs/women-on-trails" replace />} />
          <Route path="/programs/:programId" element={<ProgramPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
