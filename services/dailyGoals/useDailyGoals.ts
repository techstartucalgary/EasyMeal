import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { DailyGoalType } from './types';

export const useDailyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalType | undefined>(
    undefined,
  );

  const date = format(new Date(), 'YYYY-MM-DD');

  const getDailyGoals = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const dailyGoalProfile = doc(db, 'daily_goals', currentUser?.uid);
      const docSnap = await getDoc(dailyGoalProfile);

      if (docSnap.exists()) {
        setDailyGoal(docSnap.data());
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
            completed: false,
            cookedTimes: 0,
          },
        };

        await setDoc(doc(db, 'daily_goals', currentUser.uid), payload);
        setDailyGoal(payload);
      }
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    getDailyGoals();
  }, [getDailyGoals]);

  return {
    dailyGoal,
    isLoading,
    getDailyGoals,
    date,
  };
};
