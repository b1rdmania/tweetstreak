import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, ArrowUp, ArrowDown, Flame } from "lucide-react";
import { useActivity } from "@/context/ActivityContext";

interface WeeklyStatsProps {
  standalone?: boolean;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({ standalone = true }) => {
  const { activityData } = useActivity();
  const { weeklyData } = activityData;
  const [activeTab, setActiveTab] = useState("7days");

  // Calculate max values for chart scaling
  const maxReplies = Math.max(...weeklyData.days.map((day) => day.replies));
  const maxPosts = Math.max(...weeklyData.days.map((day) => day.posts));

  return (
    <Card className="w-full bg-background shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Weekly Stats</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="7days">7 Days</TabsTrigger>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="7days" className="mt-0 space-y-4">
            {/* Activity Chart */}
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium">Daily Activity</h3>
              <div className="flex h-40 items-end space-x-2">
                {weeklyData.days.map((day, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center"
                  >
                    {/* Replies bar */}
                    <div className="relative w-full flex justify-center mb-1">
                      <div
                        className="w-5 bg-blue-500 rounded-t"
                        style={{
                          height: `${maxReplies > 0 ? (day.replies / maxReplies) * 100 : 0}px`,
                        }}
                      />
                    </div>

                    {/* Posts bar */}
                    <div className="relative w-full flex justify-center mb-1">
                      <div
                        className="w-5 bg-green-500 rounded-t"
                        style={{
                          height: `${maxPosts > 0 ? (day.posts / maxPosts) * 50 : 0}px`,
                        }}
                      />
                    </div>

                    {/* Day label */}
                    <span className="text-xs mt-1">{day.date}</span>

                    {/* Goal completed indicator */}
                    {day.goalsCompleted && (
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className="h-1 w-1 rounded-full bg-green-500 p-0"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-1" />
                  <span className="text-xs">Replies</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1" />
                  <span className="text-xs">Posts</span>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">Activity Totals</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">Replies</div>
                    <div className="text-lg font-bold">
                      {weeklyData.totalReplies}
                    </div>
                    <div className="flex items-center text-xs">
                      {weeklyData.comparisonToPreviousWeek.replies > 0 ? (
                        <>
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">
                            {weeklyData.comparisonToPreviousWeek.replies}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                          <span className="text-red-500">
                            {Math.abs(
                              weeklyData.comparisonToPreviousWeek.replies,
                            )}
                          </span>
                        </>
                      )}
                      <span className="ml-1 text-muted-foreground">
                        vs last week
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">Posts</div>
                    <div className="text-lg font-bold">
                      {weeklyData.totalPosts}
                    </div>
                    <div className="flex items-center text-xs">
                      {weeklyData.comparisonToPreviousWeek.posts > 0 ? (
                        <>
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">
                            {weeklyData.comparisonToPreviousWeek.posts}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                          <span className="text-red-500">
                            {Math.abs(
                              weeklyData.comparisonToPreviousWeek.posts,
                            )}
                          </span>
                        </>
                      )}
                      <span className="ml-1 text-muted-foreground">
                        vs last week
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">
                      Retweets
                    </div>
                    <div className="text-lg font-bold">
                      {weeklyData.totalRetweets}
                    </div>
                    <div className="flex items-center text-xs">
                      {weeklyData.comparisonToPreviousWeek.retweets > 0 ? (
                        <>
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">
                            {weeklyData.comparisonToPreviousWeek.retweets}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                          <span className="text-red-500">
                            {Math.abs(
                              weeklyData.comparisonToPreviousWeek.retweets,
                            )}
                          </span>
                        </>
                      )}
                      <span className="ml-1 text-muted-foreground">
                        vs last week
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">Streaks</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">Current</div>
                    <div className="text-lg font-bold">
                      {weeklyData.currentStreak} days
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground">Longest</div>
                    <div className="text-lg font-bold">
                      {weeklyData.longestStreak} days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="30days">
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <Calendar className="mr-2 h-5 w-5" />
              <span>30-day view coming soon</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklyStats;
