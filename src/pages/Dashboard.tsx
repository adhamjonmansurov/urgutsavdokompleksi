import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Store, Users, Tags, Star, TrendingUp, Eye } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Shops"
            value="1,284"
            change="+12% from last month"
            changeType="positive"
            icon={Store}
          />
          <StatCard
            title="Active Users"
            value="8,429"
            change="+23% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Categories"
            value="24"
            change="2 new this month"
            changeType="neutral"
            icon={Tags}
          />
          <StatCard
            title="Featured Shops"
            value="56"
            change="89% slots filled"
            changeType="neutral"
            icon={Star}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Monthly Revenue"
            value="$24,580"
            change="+18% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Views"
            value="152K"
            change="+8% from last month"
            changeType="positive"
            icon={Eye}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          
          {/* Quick Actions */}
          <div className="rounded-xl p-6" style={{ background: "var(--gradient-card)" }}>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-primary py-4 flex-col gap-2">
                <Store className="w-6 h-6" />
                <span>Add Shop</span>
              </button>
              <button className="btn-secondary py-4 flex-col gap-2">
                <Tags className="w-6 h-6" />
                <span>New Category</span>
              </button>
              <button className="btn-secondary py-4 flex-col gap-2">
                <Star className="w-6 h-6" />
                <span>Feature Shop</span>
              </button>
              <button className="btn-secondary py-4 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span>Invite User</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
