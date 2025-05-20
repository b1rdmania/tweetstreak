import React from "react";
import { motion } from "framer-motion";
import { Minus, Check, Twitter, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useActivity } from "@/context/ActivityContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActivityTrackerProps {
  standalone?: boolean;
}

const ActivityTracker = ({ standalone = true }: ActivityTrackerProps) => {
  const {
    activityData,
    updateReplies,
    updatePosts,
    updateRetweets,
    resetToday,
  } = useActivity();
  const { replies, posts, retweets, replyGoal, postGoal, retweetGoal } =
    activityData;

  const handleReplyIncrement = () => {
    updateReplies(replies + 1);
  };

  const handleReplyDecrement = () => {
    updateReplies(Math.max(0, replies - 1));
  };

  const handlePostIncrement = () => {
    updatePosts(posts + 1);
  };

  const handlePostDecrement = () => {
    updatePosts(Math.max(0, posts - 1));
  };

  const handleRetweetIncrement = () => {
    updateRetweets(retweets + 1);
  };

  const handleRetweetDecrement = () => {
    updateRetweets(Math.max(0, retweets - 1));
  };

  const replyProgress = Math.min(100, (replies / replyGoal) * 100);
  const postProgress = Math.min(100, (posts / postGoal) * 100);
  const retweetProgress = Math.min(100, (retweets / retweetGoal) * 100);

  const replyGoalMet = replies >= replyGoal;
  const postGoalMet = posts >= postGoal;
  const retweetGoalMet = retweets >= retweetGoal;

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset today's counts?")) {
      resetToday();
    }
  };

  return (
    <div className="bg-background w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Today's Activity</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset today's counts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Replies Tracker */}
        <Card className={`${replyGoalMet ? "border-green-500" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <Twitter className="h-5 w-5" /> Replies
              </CardTitle>
              {replyGoalMet && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <Check className="h-3 w-3 mr-1" /> Goal Met
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pt-6">
                <motion.div
                  className="w-full h-40 flex items-center justify-center"
                  animate={{ scale: replyGoalMet ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: replyGoalMet ? 1 : 0 }}
                >
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={`${replyGoalMet ? "text-green-500" : "text-blue-500"} stroke-current`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${replyProgress * 2.51} 251`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{replies}</span>
                      <span className="text-sm text-muted-foreground">
                        of {replyGoal}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReplyDecrement}
                  disabled={replies <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  className={
                    replyGoalMet ? "bg-green-500 hover:bg-green-600" : ""
                  }
                  onClick={handleReplyIncrement}
                >
                  Add Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Tracker */}
        <Card className={`${postGoalMet ? "border-green-500" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <Twitter className="h-5 w-5" /> Posts
              </CardTitle>
              {postGoalMet && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <Check className="h-3 w-3 mr-1" /> Goal Met
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pt-6">
                <motion.div
                  className="w-full h-40 flex items-center justify-center"
                  animate={{ scale: postGoalMet ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: postGoalMet ? 1 : 0 }}
                >
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={`${postGoalMet ? "text-green-500" : "text-purple-500"} stroke-current`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${postProgress * 2.51} 251`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{posts}</span>
                      <span className="text-sm text-muted-foreground">
                        of {postGoal}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePostDecrement}
                  disabled={posts <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  className={
                    postGoalMet ? "bg-green-500 hover:bg-green-600" : ""
                  }
                  onClick={handlePostIncrement}
                >
                  Add Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retweets Tracker */}
        <Card className={`${retweetGoalMet ? "border-green-500" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <RefreshCw className="h-5 w-5" /> Retweets
              </CardTitle>
              {retweetGoalMet && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <Check className="h-3 w-3 mr-1" /> Goal Met
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pt-6">
                <motion.div
                  className="w-full h-40 flex items-center justify-center"
                  animate={{ scale: retweetGoalMet ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: retweetGoalMet ? 1 : 0 }}
                >
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={`${retweetGoalMet ? "text-green-500" : "text-orange-500"} stroke-current`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${retweetProgress * 2.51} 251`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{retweets}</span>
                      <span className="text-sm text-muted-foreground">
                        of {retweetGoal}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRetweetDecrement}
                  disabled={retweets <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  className={
                    retweetGoalMet ? "bg-green-500 hover:bg-green-600" : ""
                  }
                  onClick={handleRetweetIncrement}
                >
                  Add Retweet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Daily Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(
                  (replyProgress + postProgress + retweetProgress) / 3,
                )}
                % Complete
              </span>
            </div>
            <Progress
              value={(replyProgress + postProgress + retweetProgress) / 3}
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityTracker;
