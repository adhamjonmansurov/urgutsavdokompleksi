import { Store, Star, Users, Tags } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: Store,
    title: "New shop registered",
    description: "Coffee Corner was added to the platform",
    time: "2 min ago",
    color: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    icon: Star,
    title: "Shop featured",
    description: "Urban Eats was marked as featured",
    time: "15 min ago",
    color: "bg-warning/20 text-warning",
  },
  {
    id: 3,
    icon: Users,
    title: "New user signup",
    description: "john.doe@email.com created an account",
    time: "1 hour ago",
    color: "bg-success/20 text-success",
  },
  {
    id: 4,
    icon: Tags,
    title: "Category updated",
    description: "Restaurant category tariffs modified",
    time: "3 hours ago",
    color: "bg-muted text-muted-foreground",
  },
];

export const RecentActivity = () => {
  return (
    <div className="rounded-xl p-6" style={{ background: "var(--gradient-card)" }}>
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
