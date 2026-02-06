import { AdminLayout } from "@/components/layout/AdminLayout";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { Plus, Search } from "lucide-react";

const Categories = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Organize shops by category and manage tariffs
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search categories..."
            className="input-admin pl-10"
          />
        </div>

        {/* Categories Grid */}
        <CategoriesGrid />
      </div>
    </AdminLayout>
  );
};

export default Categories;
