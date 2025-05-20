import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ActivityData = {
  replies: number;
  posts: number;
  replyGoal: number;
  postGoal: number;
  lastUpdated: string;
  weeklyData: {
    days: {
      date: string;
      replies: number;
      posts: number;
      goalsCompleted: boolean;
    }[];
    currentStreak: number;
    longestStreak: number;
    totalReplies: number;
    totalPosts: number;
    comparisonToPreviousWeek: {
      replies: number;
      posts: number;
    };
  };
};

type ActivityContextType = {
  activityData: ActivityData;
  updateReplies: (count: number) => void;
  updatePosts: (count: number) => void;
  updateGoals: (replyGoal: number, postGoal: number) => void;
  resetToday: () => void;
};

const defaultWeeklyData = {
  days: [
    { date: "Mon", replies: 8, posts: 2, goalsCompleted: false },
    { date: "Tue", replies: 12, posts: 3, goalsCompleted: true },
    { date: "Wed", replies: 5, posts: 1, goalsCompleted: false },
    { date: "Thu", replies: 10, posts: 3, goalsCompleted: true },
    { date: "Fri", replies: 15, posts: 4, goalsCompleted: true },
    { date: "Sat", replies: 7, posts: 2, goalsCompleted: false },
    { date: "Sun", replies: 0, posts: 0, goalsCompleted: false },
  ],
  currentStreak: 2,
  longestStreak: 5,
  totalReplies: 57,
  totalPosts: 15,
  comparisonToPreviousWeek: {
    replies: 12,
    posts: -3,
  },
};

const defaultActivityData: ActivityData = {
  replies: 0,
  posts: 0,
  replyGoal: 10,
  postGoal: 3,
  lastUpdated: new Date().toISOString(),
  weeklyData: defaultWeeklyData,
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [activityData, setActivityData] = useState<ActivityData>(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem("twitterActivityData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Check if it's a new day
        const lastUpdated = new Date(parsedData.lastUpdated);
        const today = new Date();
        if (lastUpdated.toDateString() !== today.toDateString()) {
          // It's a new day, reset daily counts
          return {
            ...parsedData,
            replies: 0,
            posts: 0,
            lastUpdated: today.toISOString(),
          };
        }
        return parsedData;
      } catch (e) {
        console.error("Error parsing saved activity data", e);
        return defaultActivityData;
      }
    }
    return defaultActivityData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("twitterActivityData", JSON.stringify(activityData));
  }, [activityData]);

  const updateReplies = (count: number) => {
    setActivityData((prev) => {
      // Update today in weekly data
      const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
      const dayIndex = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday

      const updatedDays = [...prev.weeklyData.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        replies: count,
        goalsCompleted:
          count >= prev.replyGoal &&
          updatedDays[dayIndex].posts >= prev.postGoal,
      };

      // Calculate new totals
      const totalReplies = updatedDays.reduce(
        (sum, day) => sum + day.replies,
        0,
      );

      return {
        ...prev,
        replies: count,
        lastUpdated: new Date().toISOString(),
        weeklyData: {
          ...prev.weeklyData,
          days: updatedDays,
          totalReplies,
        },
      };
    });
  };

  const updatePosts = (count: number) => {
    setActivityData((prev) => {
      // Update today in weekly data
      const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
      const dayIndex = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday

      const updatedDays = [...prev.weeklyData.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        posts: count,
        goalsCompleted:
          updatedDays[dayIndex].replies >= prev.replyGoal &&
          count >= prev.postGoal,
      };

      // Calculate new totals
      const totalPosts = updatedDays.reduce((sum, day) => sum + day.posts, 0);

      return {
        ...prev,
        posts: count,
        lastUpdated: new Date().toISOString(),
        weeklyData: {
          ...prev.weeklyData,
          days: updatedDays,
          totalPosts,
        },
      };
    });
  };

  const updateGoals = (replyGoal: number, postGoal: number) => {
    setActivityData((prev) => ({
      ...prev,
      replyGoal,
      postGoal,
    }));
  };

  const resetToday = () => {
    setActivityData((prev) => ({
      ...prev,
      replies: 0,
      posts: 0,
      retweets: 0,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateRetweets = (count: number) => {
    setActivityData((prev) => {
      // Update today in weekly data
      const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
      const dayIndex = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday

      const updatedDays = [...prev.weeklyData.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        retweets: count,
        goalsCompleted:
          updatedDays[dayIndex].replies >= prev.replyGoal &&
          updatedDays[dayIndex].posts >= prev.postGoal &&
          count >= prev.retweetGoal,
      };

      // Calculate new totals
      const totalRetweets = updatedDays.reduce(
        (sum, day) => sum + day.retweets,
        0,
      );

      return {
        ...prev,
        retweets: count,
        lastUpdated: new Date().toISOString(),
        weeklyData: {
          ...prev.weeklyData,
          days: updatedDays,
          totalRetweets,
        },
      };
    });
  };

  return (
    <ActivityContext.Provider
      value={{
        activityData,
        updateReplies,
        updatePosts,
        updateRetweets,
        updateGoals,
        resetToday,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
