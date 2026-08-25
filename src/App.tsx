import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing.tsx";
import Course from "./pages/Course.tsx";
import Auth from "./pages/Auth.tsx";
import Objetivo from "./pages/Objetivo.tsx";
import Trajetoria from "./pages/Trajetoria.tsx";
import Validacao from "./pages/Validacao.tsx";
import Admin from "./pages/Admin.tsx";
import Feedback from "./pages/Feedback.tsx";
import Sistema51 from "./pages/Sistema51.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/curso" element={<Course />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/objetivo" element={<Objetivo />} />
            <Route path="/trajetoria" element={<Trajetoria />} />
            <Route path="/validacao" element={<Validacao />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/sistema-5x1" element={<Sistema51 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
