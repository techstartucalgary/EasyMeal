import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { DailyGoalType } from './types';
import { useDailyGoals } from './useDailyGoals';

export const useUpdateDailyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { getDailyGoals } = useDailyGoals();

  const updateDailyGoal = useCallback(
    async (payload: DailyGoalType) => {
      if (currentUser) {
        setIsLoading(true);
        const date = format(new Date(), 'YYYY-MM-DD');
        const dailyGoalProfile = doc(db, 'daily_goals', currentUser?.uid);
        const docSnap = await getDoc(dailyGoalProfile);

        if (docSnap.exists() && docSnap.get(date)) {
          await setDoc(doc(db, 'daily_goals', currentUser.uid), payload);
        }
        // If the daily goal is completed, update the weekly goal
        // If the weekly goal is completed, earn badge
        await getDailyGoals();
        setIsLoading(false);
      }
    },
    [currentUser, getDailyGoals],
  );

  return { updateDailyGoal, isLoading };
};
