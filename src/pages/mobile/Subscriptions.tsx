import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, Star, Sparkles } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useShops, Shop } from "@/contexts/ShopContext";
import { toast } from "sonner";

interface PlanTier {
  id: "basic" | "standard" | "premium";
  name: string;
  price: number;
  icon: React.ElementType;
  color: string;
  features: string[];
}

const plans: PlanTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: 50000,
    icon: Star,
    color: "text-muted-foreground",
    features: [
      "1 shop listing",
      "Basic visibility",
      "Phone support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 150000,
    icon: Sparkles,
    color: "text-blue-500",
    features: [
      "Up to 3 shop listings",
      "Enhanced visibility",
      "Priority support",
      "Analytics dashboard",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 300000,
    icon: Crown,
    color: "text-purple-500",
    features: [
      "Unlimited shops",
      "Top visibility",
      "24/7 VIP support",
      "Advanced analytics",
      "Featured placement",
      "Custom branding",
    ],
  },
];

const Subscriptions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMyShops, updateSubscription } = useShops();
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const myShops = user ? getMyShops(user.id) : [];

  const handleSelectPlan = (plan: PlanTier) => {
    if (myShops.length === 0) {
      toast.error("Create a shop first to subscribe");
      return;
    }
    setSelectedPlan(plan);
  };

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
    setShowPayment(true);
  };

  const handlePayment = (provider: "click" | "payme") => {
    if (!selectedShop || !selectedPlan) return;
    
    // Mock payment - in production this would redirect to payment provider
    toast.success(`Redirecting to ${provider.toUpperCase()}... (Demo)`);
    
    // Simulate successful payment
    setTimeout(() => {
      updateSubscription(selectedShop.id, selectedPlan.id, 1);
      toast.success(`${selectedPlan.name} subscription activated!`);
      setShowPayment(false);
      setSelectedPlan(null);
      setSelectedShop(null);
    }, 1500);
  };

  if (showPayment && selectedPlan && selectedShop) {
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
          {/* Order Summary */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shop</span>
                <span>{selectedShop.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>1 month</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>{selectedPlan.price.toLocaleString()} UZS</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
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

  if (selectedPlan) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto">
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSelectedPlan(null)}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold">Select Shop</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-muted-foreground">
            Which shop do you want to upgrade to {selectedPlan.name}?
          </p>
          
          {myShops.map((shop) => (
            <button
              key={shop.id}
              onClick={() => handleSelectShop(shop)}
              className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-3 active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {shop.images[0] ? (
                  <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Star className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{shop.name}</p>
                <p className="text-sm text-muted-foreground">
                  Current: {shop.subscriptionTier.charAt(0).toUpperCase() + shop.subscriptionTier.slice(1)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="pt-2">
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Choose a plan for your shop</p>
        </div>

        <div className="space-y-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`bg-card rounded-xl p-5 border transition-all ${
                  plan.id === "premium"
                    ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.id === "premium" ? "bg-purple-500/10" :
                      plan.id === "standard" ? "bg-blue-500/10" : "bg-muted"
                    }`}>
                      <Icon className={`w-6 h-6 ${plan.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-lg font-bold">
                        {plan.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">UZS/mo</span>
                      </p>
                    </div>
                  </div>
                  {plan.id === "premium" && (
                    <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${plan.color}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  variant={plan.id === "premium" ? "default" : "outline"}
                  className="w-full"
                >
                  Select {plan.name}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Subscriptions;
