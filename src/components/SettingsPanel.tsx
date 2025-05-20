import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, RefreshCw } from "lucide-react";
import { useActivity } from "@/context/ActivityContext";
import { useToast } from "@/components/ui/use-toast";

interface SettingsPanelProps {
  onClose?: () => void;
}

const SettingsPanel = ({ onClose = () => {} }: SettingsPanelProps) => {
  const { activityData, updateGoals } = useActivity();
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    replyGoal: activityData.replyGoal,
    postGoal: activityData.postGoal,
    theme: "minimal" as "matrix" | "casio" | "minimal",
    notifications: true,
    floatingWindow: false,
  });

  // Update settings when activityData changes
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      replyGoal: activityData.replyGoal,
      postGoal: activityData.postGoal,
    }));
  }, [activityData.replyGoal, activityData.postGoal]);

  const handleSave = () => {
    // Update goals in the context
    updateGoals(settings.replyGoal, settings.postGoal);

    // Save theme preference to localStorage
    localStorage.setItem("twitterActivityTheme", settings.theme);

    // Save notification settings
    localStorage.setItem(
      "twitterActivityNotifications",
      JSON.stringify({
        enabled: settings.notifications,
        floatingWindow: settings.floatingWindow,
      }),
    );

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });

    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    setSettings({
      replyGoal: 10,
      postGoal: 3,
      theme: "minimal",
      notifications: true,
      floatingWindow: false,
    });
  };

  const isPlatformMac = navigator.platform.toLowerCase().includes("mac");
  const isPlatformiOS = /iPad|iPhone|iPod/.test(navigator.platform);

  return (
    <Card className="w-full max-w-3xl bg-background shadow-lg border-opacity-50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Customize your daily goals and app appearance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="goals">
          <TabsList className="mb-4">
            <TabsTrigger value="goals">Daily Goals</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            {isPlatformMac && (
              <TabsTrigger value="platform">Platform Settings</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reply-goal">Daily Reply Goal</Label>
                <Input
                  id="reply-goal"
                  type="number"
                  min="1"
                  max="100"
                  value={settings.replyGoal}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      replyGoal: parseInt(e.target.value) || 1,
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Number of replies you aim to post each day
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-goal">Daily Post Goal</Label>
                <Input
                  id="post-goal"
                  type="number"
                  min="1"
                  max="50"
                  value={settings.postGoal}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      postGoal: parseInt(e.target.value) || 1,
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Number of original posts you aim to create each day
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <Label>Visual Theme</Label>
              <RadioGroup
                value={settings.theme}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    theme: value as "matrix" | "casio" | "minimal",
                  })
                }
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="matrix" id="matrix" />
                  <Label htmlFor="matrix" className="cursor-pointer flex-1">
                    <div className="font-medium">Matrix</div>
                    <div className="text-sm text-muted-foreground">
                      Dark theme with green accents
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="casio" id="casio" />
                  <Label htmlFor="casio" className="cursor-pointer flex-1">
                    <div className="font-medium">Casio</div>
                    <div className="text-sm text-muted-foreground">
                      Retro calculator style
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <Label htmlFor="minimal" className="cursor-pointer flex-1">
                    <div className="font-medium">Minimal</div>
                    <div className="text-sm text-muted-foreground">
                      Clean, simple interface
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">
                    Enable Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders to complete your daily goals
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, notifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <div className="space-y-2 pl-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="morning-reminder"
                      disabled={!settings.notifications}
                    />
                    <Label htmlFor="morning-reminder">
                      Morning reminder (9:00 AM)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="evening-reminder"
                      disabled={!settings.notifications}
                    />
                    <Label htmlFor="evening-reminder">
                      Evening reminder (8:00 PM)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {isPlatformMac && (
            <TabsContent value="platform" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="floating-window" className="text-base">
                      Floating Window Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Keep app visible on top of other windows
                    </p>
                  </div>
                  <Switch
                    id="floating-window"
                    checked={settings.floatingWindow}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, floatingWindow: checked })
                    }
                  />
                </div>

                {isPlatformiOS && (
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Configure Widgets
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsPanel;
