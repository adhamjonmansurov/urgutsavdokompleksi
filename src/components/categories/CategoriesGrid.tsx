import { Edit, Trash2, DollarSign } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  shopCount: number;
  tariff: {
    basic: number;
    featured: number;
    premium: number;
  };
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Restaurants",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
    shopCount: 156,
    tariff: { basic: 29, featured: 79, premium: 149 },
  },
  {
    id: "2",
    name: "Cafes",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop",
    shopCount: 89,
    tariff: { basic: 19, featured: 49, premium: 99 },
  },
  {
    id: "3",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    shopCount: 45,
    tariff: { basic: 39, featured: 99, premium: 199 },
  },
  {
    id: "4",
    name: "Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
    shopCount: 78,
    tariff: { basic: 24, featured: 59, premium: 119 },
  },
  {
    id: "5",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop",
    shopCount: 234,
    tariff: { basic: 34, featured: 89, premium: 179 },
  },
  {
    id: "6",
    name: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop",
    shopCount: 67,
    tariff: { basic: 29, featured: 69, premium: 139 },
  },
];

export const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCategories.map((category) => (
        <div
          key={category.id}
          className="rounded-xl overflow-hidden border border-border group hover:border-primary/50 transition-all duration-300"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="relative h-40 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.shopCount} shops</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Tariffs</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground">Basic</p>
                <p className="font-semibold">${category.tariff.basic}</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground">Featured</p>
                <p className="font-semibold">${category.tariff.featured}</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground">Premium</p>
                <p className="font-semibold">${category.tariff.premium}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <button className="btn-secondary flex-1 py-2 text-sm">
                <Edit className="w-4 h-4" />
                Edit
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
