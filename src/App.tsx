
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Menu from "./pages/Menu";
import Growth from "./pages/Growth";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-truckmate-background pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/growth" element={<Growth />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
