import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { DailyGoalType } from './types';

const getClosestPreviousElement = (obj: DailyGoalType) => {
  const currentDate = new Date();

  const closestDate = Object.keys(obj).reduce((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    // Only consider dates that are before or equal to the current date
    if (dateA <= currentDate && dateB <= currentDate) {
      const diffA = Math.abs(currentDate.valueOf() - dateA.valueOf());
      const diffB = Math.abs(currentDate.valueOf() - dateB.valueOf());

      return diffA < diffB ? a : b;
    }

    return a;
  });

  return {
    date: closestDate,
    value: obj[closestDate],
  };
};

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
        if (!docSnap.get(date)) {
          const prevElement = getClosestPreviousElement(docSnap.data());

          const payload: DailyGoalType = {
            ...docSnap.data(),
            [date]: prevElement.value,
          };

          await setDoc(doc(db, 'daily_goals', currentUser.uid), payload);
          setDailyGoal(payload);
        } else {
          setDailyGoal(docSnap.data());
        }
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
            timestamp: new Date().getTime(),
          },
        };

        await setDoc(doc(db, 'daily_goals', currentUser.uid), payload);
        setDailyGoal(payload);
      }
      setIsLoading(false);
    }
  }, [currentUser, date]);

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
