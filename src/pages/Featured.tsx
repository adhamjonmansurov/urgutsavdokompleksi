import { AdminLayout } from "@/components/layout/AdminLayout";
import { FeaturedGrid } from "@/components/featured/FeaturedGrid";
import { Plus, Search, Filter, Calendar } from "lucide-react";

const Featured = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Featured Shops</h1>
            <p className="text-muted-foreground mt-1">
              Manage featured listings with images and videos
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            Add Featured
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search featured shops..."
              className="input-admin pl-10"
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-4 h-4" />
            Status
          </button>
          <button className="btn-secondary">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">56</span>
            <span className="text-muted-foreground">Total Featured</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="font-medium">32</span>
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="font-medium">18</span>
            <span className="text-muted-foreground">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            <span className="font-medium">6</span>
            <span className="text-muted-foreground">Expired</span>
          </div>
        </div>

        {/* Featured Grid */}
        <FeaturedGrid />
      </div>
    </AdminLayout>
  );
};

export default Featured;
