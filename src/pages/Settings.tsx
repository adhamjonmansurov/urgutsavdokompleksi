import { AdminLayout } from "@/components/layout/AdminLayout";
import { Bell, Globe, Lock, Palette, Database, Mail } from "lucide-react";

const settingsSections = [
  {
    icon: Globe,
    title: "General",
    description: "App name, timezone, and language preferences",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Email and push notification settings",
  },
  {
    icon: Lock,
    title: "Security",
    description: "Authentication and access control",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Theme, colors, and branding options",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Backup, export, and data retention",
  },
  {
    icon: Mail,
    title: "Email Templates",
    description: "Customize transactional emails",
  },
];

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your admin panel preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section) => (
            <button
              key={section.title}
              className="p-6 rounded-xl border border-border text-left hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 group"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </button>
          ))}
        </div>

        {/* API Section */}
        <div className="rounded-xl p-6 border border-border" style={{ background: "var(--gradient-card)" }}>
          <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">API Key</label>
              <div className="flex items-center gap-3">
                <input
                  type="password"
                  value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                  readOnly
                  className="input-admin flex-1"
                />
                <button className="btn-secondary">Copy</button>
                <button className="btn-secondary">Regenerate</button>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Webhook URL</label>
              <input
                type="text"
                placeholder="https://your-domain.com/webhook"
                className="input-admin"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
