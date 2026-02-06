import { Play, Star, Eye, Edit, Trash2, Calendar } from "lucide-react";

interface FeaturedItem {
  id: string;
  shopName: string;
  shopImage: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  views: number;
  status: "active" | "scheduled" | "expired";
}

const mockFeatured: FeaturedItem[] = [
  {
    id: "1",
    shopName: "Coffee Corner",
    shopImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop",
    mediaType: "video",
    mediaUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    startDate: "Jan 1, 2024",
    endDate: "Jan 31, 2024",
    views: 12543,
    status: "active",
  },
  {
    id: "2",
    shopName: "Urban Eats",
    shopImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop",
    mediaType: "image",
    mediaUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    startDate: "Feb 1, 2024",
    endDate: "Feb 28, 2024",
    views: 8921,
    status: "active",
  },
  {
    id: "3",
    shopName: "Tech Hub Store",
    shopImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
    mediaType: "video",
    mediaUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    startDate: "Mar 1, 2024",
    endDate: "Mar 31, 2024",
    views: 5678,
    status: "scheduled",
  },
  {
    id: "4",
    shopName: "Green Grocers",
    shopImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop",
    mediaType: "image",
    mediaUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
    startDate: "Dec 1, 2023",
    endDate: "Dec 31, 2023",
    views: 15234,
    status: "expired",
  },
];

const statusColors = {
  active: "badge-active",
  scheduled: "badge-featured",
  expired: "badge-inactive",
};

export const FeaturedGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockFeatured.map((item) => (
        <div
          key={item.id}
          className="rounded-xl overflow-hidden border border-border group hover:border-primary/50 transition-all duration-300"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.shopName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            {item.mediaType === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </div>
              </div>
            )}
            
            <div className="absolute top-3 right-3">
              <span className={`badge-status ${statusColors[item.status]}`}>
                {item.status}
              </span>
            </div>
            
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={item.shopImage}
                  alt={item.shopName}
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
                <span className="font-medium">{item.shopName}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                {item.views.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{item.startDate} - {item.endDate}</span>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">Featured</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="btn-secondary flex-1 py-2 text-sm">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="btn-secondary flex-1 py-2 text-sm">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="p-2 rounded-lg hover:bg-destructive/20 border border-border transition-colors">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
