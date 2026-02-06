import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Store, Clock, TrendingUp } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useShops, Shop } from "@/contexts/ShopContext";
import { toast } from "sonner";

interface BoostOption {
  days: number;
  price: number;
  discount?: number;
}

const boostOptions: BoostOption[] = [
  { days: 1, price: 15000 },
  { days: 3, price: 40000, discount: 10 },
  { days: 7, price: 80000, discount: 25 },
  { days: 30, price: 250000, discount: 45 },
];

const BoostShop = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMyShops, boostShop } = useShops();
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedOption, setSelectedOption] = useState<BoostOption | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const myShops = user ? getMyShops(user.id) : [];
  const eligibleShops = myShops.filter(s => s.isActive && !s.isBoosted);

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
  };

  const handleSelectOption = (option: BoostOption) => {
    setSelectedOption(option);
    setShowPayment(true);
  };

  const handlePayment = (provider: "click" | "payme") => {
    if (!selectedShop || !selectedOption) return;
    
    toast.success(`Redirecting to ${provider.toUpperCase()}... (Demo)`);
    
    setTimeout(() => {
      boostShop(selectedShop.id, selectedOption.days);
      toast.success(`Shop boosted for ${selectedOption.days} day(s)!`);
      setShowPayment(false);
      setSelectedOption(null);
      setSelectedShop(null);
    }, 1500);
  };

  if (showPayment && selectedOption && selectedShop) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto">
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setShowPayment(false)}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold">Payment</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold mb-3">Boost Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shop</span>
                <span>{selectedShop.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{selectedOption.days} day(s)</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>{selectedOption.price.toLocaleString()} UZS</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Select Payment Method</h3>
            
            <button
              onClick={() => handlePayment("click")}
              className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 active:scale-[0.98] transition-transform"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="text-left">
                <p className="font-semibold">Click</p>
                <p className="text-sm text-muted-foreground">Pay with Click</p>
              </div>
            </button>

            <button
              onClick={() => handlePayment("payme")}
              className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 active:scale-[0.98] transition-transform"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="text-left">
                <p className="font-semibold">Payme</p>
                <p className="text-sm text-muted-foreground">Pay with Payme</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedShop) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto">
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSelectedShop(null)}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold">Select Duration</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Selected Shop */}
          <div className="bg-card rounded-xl p-4 border border-border flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
              {selectedShop.images[0] ? (
                <img src={selectedShop.images[0]} alt={selectedShop.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Store className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-semibold">{selectedShop.name}</p>
              <p className="text-sm text-muted-foreground">Ready to boost</p>
            </div>
          </div>

          {/* Boost Benefits */}
          <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
            <h3 className="font-semibold text-yellow-500 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Boost Benefits
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <span>Appear at the top of search results</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Special "Boosted" badge on listing</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <span>3x more visibility to customers</span>
              </li>
            </ul>
          </div>

          {/* Duration Options */}
          <div className="space-y-3">
            <h3 className="font-semibold">Choose Duration</h3>
            
            {boostOptions.map((option) => (
              <button
                key={option.days}
                onClick={() => handleSelectOption(option)}
                className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{option.days} {option.days === 1 ? "Day" : "Days"}</p>
                    {option.discount && (
                      <p className="text-xs text-green-500">Save {option.discount}%</p>
                    )}
                  </div>
                </div>
                <p className="font-bold">{option.price.toLocaleString()} UZS</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="pt-2">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-7 h-7 text-yellow-500" />
            Boost Shop
          </h1>
          <p className="text-muted-foreground">Get more visibility for your shop</p>
        </div>

        {eligibleShops.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-semibold">Select a shop to boost</h3>
            
            {eligibleShops.map((shop) => (
              <button
                key={shop.id}
                onClick={() => handleSelectShop(shop)}
                className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-3 active:scale-[0.98] transition-transform text-left"
              >
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                  {shop.images[0] ? (
                    <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Store className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{shop.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {shop.subscriptionTier.charAt(0).toUpperCase() + shop.subscriptionTier.slice(1)} plan
                  </p>
                </div>
                <Zap className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        ) : myShops.length > 0 ? (
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="font-semibold mb-2">All shops are boosted!</h3>
            <p className="text-sm text-muted-foreground">
              All your active shops already have boost enabled
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No shops yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a shop first before boosting
            </p>
            <Button onClick={() => navigate("/app/shops/new")}>
              Create Shop
            </Button>
          </div>
        )}

        {/* Currently Boosted */}
        {myShops.filter(s => s.isBoosted).length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Currently Boosted</h3>
            {myShops.filter(s => s.isBoosted).map((shop) => (
              <div
                key={shop.id}
                className="bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/20 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {shop.images[0] ? (
                    <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Store className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{shop.name}</p>
                  <p className="text-xs text-yellow-500">
                    Expires: {shop.boostExpiry ? new Date(shop.boostExpiry).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default BoostShop;
