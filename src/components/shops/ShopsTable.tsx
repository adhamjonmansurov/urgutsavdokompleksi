import { MoreHorizontal, MapPin, Phone, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export interface Shop {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  phone: string;
  location: { lat: number; lng: number };
  address: string;
  status: "active" | "inactive";
  featured: boolean;
}

const mockShops: Shop[] = [
  {
    id: "1",
    name: "Coffee Corner",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop",
    description: "Artisan coffee and pastries in a cozy atmosphere",
    category: "Cafe",
    phone: "+1 234-567-8900",
    location: { lat: 40.7128, lng: -74.006 },
    address: "123 Main St, New York",
    status: "active",
    featured: true,
  },
  {
    id: "2",
    name: "Urban Eats",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop",
    description: "Modern fusion cuisine with local ingredients",
    category: "Restaurant",
    phone: "+1 234-567-8901",
    location: { lat: 40.7589, lng: -73.9851 },
    address: "456 Broadway, New York",
    status: "active",
    featured: false,
  },
  {
    id: "3",
    name: "Tech Hub Store",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
    description: "Latest gadgets and electronics",
    category: "Electronics",
    phone: "+1 234-567-8902",
    location: { lat: 40.7484, lng: -73.9857 },
    address: "789 5th Ave, New York",
    status: "inactive",
    featured: false,
  },
  {
    id: "4",
    name: "Green Grocers",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop",
    description: "Fresh organic produce daily",
    category: "Grocery",
    phone: "+1 234-567-8903",
    location: { lat: 40.7549, lng: -73.984 },
    address: "321 Park Ave, New York",
    status: "active",
    featured: true,
  },
];

export const ShopsTable = () => {
  const [shops] = useState<Shop[]>(mockShops);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ background: "var(--gradient-card)" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Shop</th>
            <th>Category</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{shop.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                      {shop.description}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <span className="px-2.5 py-1 rounded-lg bg-secondary text-sm">
                  {shop.category}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {shop.phone}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-[150px]">{shop.address}</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className={`badge-status ${shop.status === "active" ? "badge-active" : "badge-inactive"}`}>
                    {shop.status}
                  </span>
                  {shop.featured && (
                    <span className="badge-status badge-featured">featured</span>
                  )}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-end gap-1">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-destructive/20 transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
