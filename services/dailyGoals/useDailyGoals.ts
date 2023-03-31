import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';

export const useDailyGoals = () => {
  const { currentUser } = useAuthContext();
  const [dailyGoal, setDailyGoal] = useState(undefined);

  const getDailyGoal = useCallback(async () => {
    if (currentUser) {
      const date = new Date().toISOString().split('T')[0];
      const dailyGoalProfile = doc(db, 'daily_goals', currentUser?.uid);
      const docSnap = await getDoc(dailyGoalProfile);

      if (docSnap.exists() && docSnap.get(date)) {
        setDailyGoal(docSnap.get(date));
      } else {
        const payload = {
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
    }
  }, [currentUser]);

  useEffect(() => {
    getDailyGoal();
  }, [getDailyGoal]);

  return {};
};
