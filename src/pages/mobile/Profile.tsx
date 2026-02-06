import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, LogOut, ChevronRight, Crown, Store, Settings, HelpCircle } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useShops } from "@/contexts/ShopContext";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getMyShops } = useShops();

  const myShops = user ? getMyShops(user.id) : [];

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
      toast.success("Logged out successfully");
      navigate("/app/auth");
    }
  };

  const menuItems = [
    {
      icon: Store,
      label: "My Shops",
      sublabel: `${myShops.length} shop(s)`,
      onClick: () => navigate("/app/shops"),
    },
    {
      icon: Crown,
      label: "Subscriptions",
      sublabel: "Manage your plans",
      onClick: () => navigate("/app/subscriptions"),
    },
    {
      icon: Settings,
      label: "Settings",
      sublabel: "App preferences",
      onClick: () => toast.info("Settings coming soon"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      sublabel: "Get assistance",
      onClick: () => toast.info("Help coming soon"),
    },
  ];

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-card rounded-xl p-6 border border-border text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold">{user?.name || "Shop Owner"}</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
            <Phone className="w-4 h-4" />
            <span>+998 {user?.phone}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold">{myShops.length}</p>
            <p className="text-xs text-muted-foreground">Shops</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold">{myShops.filter(s => s.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold">{myShops.filter(s => s.isBoosted).length}</p>
            <p className="text-xs text-muted-foreground">Boosted</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full p-4 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sublabel}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 text-destructive border-destructive/20 hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          ShopOwner v1.0.0
        </p>
      </div>
    </MobileLayout>
  );
};

export default Profile;
