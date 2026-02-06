import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ShopProvider } from "@/contexts/ShopContext";

// Admin pages
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Featured from "./pages/Featured";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Mobile pages
import PhoneEntry from "./pages/mobile/PhoneEntry";
import VerifyOtp from "./pages/mobile/VerifyOtp";
import CreatePassword from "./pages/mobile/CreatePassword";
import Login from "./pages/mobile/Login";
import MobileHome from "./pages/mobile/MobileHome";
import MyShops from "./pages/mobile/MyShops";
import ShopForm from "./pages/mobile/ShopForm";
import Subscriptions from "./pages/mobile/Subscriptions";
import BoostShop from "./pages/mobile/BoostShop";
import Profile from "./pages/mobile/Profile";

const queryClient = new QueryClient();

// Protected route wrapper for mobile app
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/app/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ShopProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin Panel Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/shops" element={<Shops />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/featured" element={<Featured />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Mobile App Auth Routes */}
              <Route path="/app/auth" element={<PhoneEntry />} />
              <Route path="/app/auth/verify-otp" element={<VerifyOtp />} />
              <Route path="/app/auth/create-password" element={<CreatePassword />} />
              <Route path="/app/auth/login" element={<Login />} />
              
              {/* Mobile App Protected Routes */}
              <Route path="/app" element={<ProtectedRoute><MobileHome /></ProtectedRoute>} />
              <Route path="/app/shops" element={<ProtectedRoute><MyShops /></ProtectedRoute>} />
              <Route path="/app/shops/new" element={<ProtectedRoute><ShopForm /></ProtectedRoute>} />
              <Route path="/app/shops/:id" element={<ProtectedRoute><ShopForm /></ProtectedRoute>} />
              <Route path="/app/shops/:id/edit" element={<ProtectedRoute><ShopForm /></ProtectedRoute>} />
              <Route path="/app/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
              <Route path="/app/boost" element={<ProtectedRoute><BoostShop /></ProtectedRoute>} />
              <Route path="/app/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ShopProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
