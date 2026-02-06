import { AdminLayout } from "@/components/layout/AdminLayout";
import { UsersTable } from "@/components/users/UsersTable";
import { Plus, Search, Filter, Download } from "lucide-react";

const Users = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
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
            <span className="text-2xl font-bold">8,429</span>
            <span className="text-muted-foreground">Total Users</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-medium">12</span>
            <span className="text-muted-foreground">Admins</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="font-medium">45</span>
            <span className="text-muted-foreground">Moderators</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="font-medium">8,372</span>
            <span className="text-muted-foreground">Regular</span>
          </div>
        </div>

        {/* Table */}
        <UsersTable />
      </div>
    </AdminLayout>
  );
};

export default Users;
