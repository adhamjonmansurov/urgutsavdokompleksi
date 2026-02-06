import React from "react";
import { useNavigate } from "react-router-dom";
import { Store, Plus, Zap, Crown, TrendingUp } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useShops } from "@/contexts/ShopContext";

const MobileHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMyShops } = useShops();
  
  const myShops = user ? getMyShops(user.id) : [];
  const activeShops = myShops.filter(s => s.isActive).length;
  const boostedShops = myShops.filter(s => s.isBoosted).length;

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="pt-2">
          <p className="text-muted-foreground">Welcome back,</p>
          <h1 className="text-2xl font-bold">{user?.name || "Shop Owner"}</h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <Store className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{myShops.length}</p>
            <p className="text-xs text-muted-foreground">Total Shops</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{activeShops}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{boostedShops}</p>
            <p className="text-xs text-muted-foreground">Boosted</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="font-semibold">Quick Actions</h2>
          
          <Button
            onClick={() => navigate("/app/shops/new")}
            className="w-full h-14 justify-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium">Add New Shop</p>
              <p className="text-xs opacity-80">Create a new listing</p>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/app/boost")}
            variant="outline"
            className="w-full h-14 justify-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-left">
              <p className="font-medium">Boost a Shop</p>
              <p className="text-xs text-muted-foreground">Get more visibility</p>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/app/subscriptions")}
            variant="outline"
            className="w-full h-14 justify-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-left">
              <p className="font-medium">Manage Subscriptions</p>
              <p className="text-xs text-muted-foreground">Upgrade your plan</p>
            </div>
          </Button>
        </div>

        {/* Recent Shops */}
        {myShops.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Your Shops</h2>
              <button
                onClick={() => navigate("/app/shops")}
                className="text-sm text-primary"
              >
                View all
              </button>
            </div>
            
            <div className="space-y-3">
              {myShops.slice(0, 3).map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => navigate(`/app/shops/${shop.id}`)}
                  className="bg-card rounded-xl p-4 border border-border flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {shop.images[0] ? (
                      <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover" />
                    ) : (
                      <Store className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{shop.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {shop.isBoosted && (
                        <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Boosted
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        shop.isActive 
                          ? "bg-green-500/10 text-green-500"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {shop.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {myShops.length === 0 && (
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No shops yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first shop listing to get started
            </p>
            <Button onClick={() => navigate("/app/shops/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Shop
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default MobileHome;
