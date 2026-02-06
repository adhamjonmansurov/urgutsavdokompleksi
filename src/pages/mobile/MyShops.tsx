import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Store, Zap, MoreVertical, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useShops, Shop } from "@/contexts/ShopContext";
import { toast } from "sonner";

const MyShops = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMyShops, updateShop, deleteShop } = useShops();
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  
  const myShops = user ? getMyShops(user.id) : [];
  const filteredShops = myShops.filter(shop => {
    if (filter === "active") return shop.isActive;
    if (filter === "inactive") return !shop.isActive;
    return true;
  });

  const handleToggleActive = (shop: Shop) => {
    updateShop(shop.id, { isActive: !shop.isActive });
    toast.success(shop.isActive ? "Shop deactivated" : "Shop activated");
  };

  const handleDelete = (shop: Shop) => {
    if (confirm(`Are you sure you want to delete "${shop.name}"?`)) {
      deleteShop(shop.id);
      toast.success("Shop deleted");
    }
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <h1 className="text-2xl font-bold">My Shops</h1>
          <Button size="sm" onClick={() => navigate("/app/shops/new")}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Shop List */}
        <div className="space-y-3">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div
                onClick={() => navigate(`/app/shops/${shop.id}`)}
                className="p-4 flex items-start gap-3 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                  {shop.images[0] ? (
                    <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover" />
                  ) : (
                    <Store className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold truncate">{shop.name}</p>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {shop.description || "No description"}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/app/shops/${shop.id}/edit`)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(shop)}>
                          {shop.isActive ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(shop)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      shop.subscriptionTier === "premium"
                        ? "bg-purple-500/10 text-purple-500"
                        : shop.subscriptionTier === "standard"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {shop.subscriptionTier.charAt(0).toUpperCase() + shop.subscriptionTier.slice(1)}
                    </span>
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
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No shops found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {filter === "all" 
                ? "Create your first shop listing" 
                : `No ${filter} shops`}
            </p>
            {filter === "all" && (
              <Button onClick={() => navigate("/app/shops/new")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Shop
              </Button>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default MyShops;
