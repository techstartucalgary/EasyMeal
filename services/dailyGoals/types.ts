export type DailyGoalType = {
  [x: string]: {
    calories: {
      goal: number;
      count: number;
    };
    carbs: {
      goal: number;
      count: number;
    };
    fat: {
      goal: number;
      count: number;
    };
    protein: {
      goal: number;
      count: number;
    };
    completed: boolean;
    cookedTimes: number;
    timestamp: number;
  };
};
