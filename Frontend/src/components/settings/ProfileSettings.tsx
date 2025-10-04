import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "Srivathsa",
    location: "Bengaluru, India",
    farmSize: "10 Hectares",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    console.log("Saving profile:", profile);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Profile</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={profile.location} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="farmSize">Farm Size</Label>
          <Input id="farmSize" name="farmSize" value={profile.farmSize} onChange={handleInputChange} />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
