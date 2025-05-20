import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, LogOut, User } from "lucide-react";
import ActivityTracker from "./ActivityTracker";
import WeeklyStats from "./WeeklyStats";
import SettingsPanel from "./SettingsPanel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ActivityProvider } from "@/context/ActivityContext";
import { Toaster } from "@/components/ui/toaster";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const Home = ({
  userName = "Twitter User",
  userAvatar = "",
  onLogout = () => {},
}: HomeProps) => {
  const [activeTab, setActiveTab] = useState("activity");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <ActivityProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary/10">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{userName}</h1>
                <p className="text-sm text-muted-foreground">
                  Twitter Activity Tracker
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="activity">Activity Tracking</TabsTrigger>
              <TabsTrigger value="stats">Weekly Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-6">
              <ActivityTracker />
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <WeeklyStats />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Twitter Activity Habit Tracker &copy; {new Date().getFullYear()}
          </p>
        </footer>

        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <SettingsPanel onClose={() => setSettingsOpen(false)} />
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </ActivityProvider>
  );
};

export default Home;
