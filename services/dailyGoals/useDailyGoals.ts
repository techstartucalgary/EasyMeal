import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { DailyGoalType } from './types';

export const useDailyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalType | undefined>(
    undefined,
  );

  const getDailyGoals = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const date = new Date().toISOString().split('T')[0];
      const dailyGoalProfile = doc(db, 'daily_goals', currentUser?.uid);
      const docSnap = await getDoc(dailyGoalProfile);

      if (docSnap.exists() && docSnap.get(date)) {
        setDailyGoal(docSnap.get(date));
      } else {
        const payload: DailyGoalType = {
          [date]: {
            calories: {
              goal: 0,
              count: 0,
            },
            carbs: {
              goal: 0,
              count: 0,
            },
            fat: {
              goal: 0,
              count: 0,
            },
            protein: {
              goal: 0,
              count: 0,
            },
            completed: 0,
            cookedTimes: 0,
          },
        };

        await setDoc(doc(db, 'daily_goals', currentUser.uid), payload);
      }
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    getDailyGoals();
  }, [getDailyGoals]);

  return { dailyGoal, isLoading, getDailyGoals };
};
