import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  images: string[];
  phone: string;
  telegram?: string;
  instagram?: string;
  facebook?: string;
  latitude: number;
  longitude: number;
  address: string;
  categoryId: string;
  subscriptionTier: "basic" | "standard" | "premium";
  subscriptionExpiry?: string;
  isBoosted: boolean;
  boostExpiry?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

interface ShopContextType {
  shops: Shop[];
  categories: Category[];
  getMyShops: (ownerId: string) => Shop[];
  addShop: (shop: Omit<Shop, "id" | "createdAt">) => Shop;
  updateShop: (id: string, updates: Partial<Shop>) => void;
  deleteShop: (id: string) => void;
  boostShop: (id: string, days: number) => void;
  updateSubscription: (id: string, tier: Shop["subscriptionTier"], months: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShops = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShops must be used within a ShopProvider");
  }
  return context;
};

const defaultCategories: Category[] = [
  { id: "1", name: "Restaurants", image: "/placeholder.svg" },
  { id: "2", name: "Clothing", image: "/placeholder.svg" },
  { id: "3", name: "Electronics", image: "/placeholder.svg" },
  { id: "4", name: "Beauty", image: "/placeholder.svg" },
  { id: "5", name: "Groceries", image: "/placeholder.svg" },
  { id: "6", name: "Services", image: "/placeholder.svg" },
];

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    const savedShops = localStorage.getItem("shopowner_shops");
    if (savedShops) {
      setShops(JSON.parse(savedShops));
    }
  }, []);

  const saveShops = (newShops: Shop[]) => {
    setShops(newShops);
    localStorage.setItem("shopowner_shops", JSON.stringify(newShops));
  };

  const getMyShops = (ownerId: string) => {
    return shops.filter(shop => shop.ownerId === ownerId);
  };

  const addShop = (shopData: Omit<Shop, "id" | "createdAt">) => {
    const newShop: Shop = {
      ...shopData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveShops([...shops, newShop]);
    return newShop;
  };

  const updateShop = (id: string, updates: Partial<Shop>) => {
    saveShops(shops.map(shop => 
      shop.id === id ? { ...shop, ...updates } : shop
    ));
  };

  const deleteShop = (id: string) => {
    saveShops(shops.filter(shop => shop.id !== id));
  };

  const boostShop = (id: string, days: number) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    updateShop(id, {
      isBoosted: true,
      boostExpiry: expiry.toISOString(),
    });
  };

  const updateSubscription = (id: string, tier: Shop["subscriptionTier"], months: number) => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);
    updateShop(id, {
      subscriptionTier: tier,
      subscriptionExpiry: expiry.toISOString(),
    });
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        categories,
        getMyShops,
        addShop,
        updateShop,
        deleteShop,
        boostShop,
        updateSubscription,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
