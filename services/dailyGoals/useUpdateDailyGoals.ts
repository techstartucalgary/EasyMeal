import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
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
        const date = new Date().toISOString().split('T')[0];
        const dailyGoalProfile = doc(db, 'daily_goals', currentUser?.uid);
        const docSnap = await getDoc(dailyGoalProfile);

        if (docSnap.exists() && docSnap.get(date)) {
          await setDoc(doc(db, 'daily_goals', currentUser.uid), payload);
        }
        await getDailyGoals();
        setIsLoading(false);
      }
    },
    [currentUser, getDailyGoals],
  );

  return { updateDailyGoal, isLoading };
};
