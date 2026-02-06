import { Edit, Trash2, MoreHorizontal, Mail, Calendar } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "admin",
    status: "active",
    joinDate: "Jan 15, 2024",
    lastActive: "2 min ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    role: "moderator",
    status: "active",
    joinDate: "Feb 20, 2024",
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.w@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    role: "user",
    status: "inactive",
    joinDate: "Mar 10, 2024",
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    role: "user",
    status: "pending",
    joinDate: "Apr 5, 2024",
    lastActive: "Never",
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "user",
    status: "active",
    joinDate: "Apr 12, 2024",
    lastActive: "5 min ago",
  },
];

const roleColors = {
  admin: "bg-primary/20 text-primary",
  moderator: "bg-warning/20 text-warning",
  user: "bg-muted text-muted-foreground",
};

const statusColors = {
  active: "badge-active",
  inactive: "badge-inactive",
  pending: "bg-warning/20 text-warning",
};

export const UsersTable = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ background: "var(--gradient-card)" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Last Active</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <span className={`badge-status ${roleColors[user.role]}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <span className={`badge-status ${statusColors[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {user.joinDate}
                </div>
              </td>
              <td>
                <span className="text-sm text-muted-foreground">{user.lastActive}</span>
              </td>
              <td>
                <div className="flex items-center justify-end gap-1">
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
