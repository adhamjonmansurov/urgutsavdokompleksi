import { AdminLayout } from "@/components/layout/AdminLayout";
import { ShopsTable } from "@/components/shops/ShopsTable";
import { Plus, Search, Filter, Download } from "lucide-react";

const Shops = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Shops</h1>
            <p className="text-muted-foreground mt-1">
              Manage all registered shops on your platform
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            Add Shop
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search shops..."
              className="input-admin pl-10"
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">1,284</span>
            <span className="text-muted-foreground">Total</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="font-medium">1,156</span>
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            <span className="font-medium">128</span>
            <span className="text-muted-foreground">Inactive</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="font-medium">56</span>
            <span className="text-muted-foreground">Featured</span>
          </div>
        </div>

        {/* Table */}
        <ShopsTable />
      </div>
    </AdminLayout>
  );
};

export default Shops;
