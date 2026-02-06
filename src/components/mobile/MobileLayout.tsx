import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Store, Zap, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/shops", icon: Store, label: "My Shops" },
  { path: "/app/boost", icon: Zap, label: "Boost" },
  { path: "/app/profile", icon: User, label: "Profile" },
];

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, hideNav }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <main className={cn("flex-1 overflow-y-auto", !hideNav && "pb-20")}>
        {children}
      </main>
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom max-w-md mx-auto">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};
