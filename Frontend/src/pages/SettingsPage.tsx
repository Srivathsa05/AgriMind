import { Button } from "@/components/ui/button";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import ProfileSettings from "../components/settings/ProfileSettings";
import { LogOut } from "lucide-react";

const SettingsPage = () => {
  const handleLogout = () => {
    // Add your authentication logout logic here
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-background pt-24"> {/* pt-24 = pt-16 (for navbar) + more space */}
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-foreground">Settings</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage your account and application preferences.
          </p>
        </header>

        <div className="space-y-12">
          {/* Profile Settings Card */}
          <ProfileSettings />
          
          {/* Appearance Settings Card */}
          <AppearanceSettings />

          {/* Logout Section */}
          <div className="bg-card border border-destructive/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-destructive mb-2">Logout</h3>
            <p className="text-muted-foreground mb-4">
              This will log you out of your account on this device.
            </p>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
