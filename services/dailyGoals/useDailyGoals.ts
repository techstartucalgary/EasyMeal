import { doc, onSnapshot, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { MarkedDates } from 'react-native-calendars/src/types';
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

const date = format(new Date(), 'YYYY-MM-DD');

export const useDailyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalType | undefined>(
    undefined,
  );

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const dailyGoalProfile = doc(db, 'daily_goals', currentUser?.uid);

      const unsub = onSnapshot(dailyGoalProfile, async (docSnap) => {
        if (docSnap.exists()) {
          if (!docSnap.get(date)) {
            const prevElement = getClosestPreviousElement(docSnap.data());

            const payload: DailyGoalType = {
              ...docSnap.data(),
              [date]: {
                ...prevElement.value,
                calories: {
                  count: docSnap.data()[date]?.calories?.count || 0,
                  goal: prevElement.value.calories.goal,
                },
                carbs: {
                  count: docSnap.data()[date]?.carbs?.count || 0,
                  goal: prevElement.value.carbs.goal,
                },
                fat: {
                  count: docSnap.data()[date]?.fat?.count || 0,
                  goal: prevElement.value.fat.goal,
                },
                protein: {
                  count: docSnap.data()[date]?.protein?.count || 0,
                  goal: prevElement.value.protein.goal,
                },
                completed: !!docSnap.data()[date]?.completed,
                cookedTimes: docSnap.data()[date]?.cookedTimes || 0,
              },
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
      });

      setIsLoading(false);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, [currentUser]);

  const markedDates = dailyGoal
    ? Object.keys(dailyGoal).reduce(
        (acc, key) =>
          dailyGoal[key].cookedTimes > 0
            ? {
                ...acc,
                [key]: {
                  selected: true,
                  selectedColor: '#6536F9',
                  disableTouchEvent: true,
                },
              }
            : acc,
        {} as MarkedDates,
      )
    : undefined;

  const calProgress = dailyGoal
    ? (Math.round(dailyGoal[date]?.calories?.count || 0) /
        Math.round(dailyGoal[date].calories.goal)) *
      100
    : 0;

  const caloriesProgress = calProgress >= 100 ? 100 : calProgress;

  const protProgress = dailyGoal
    ? (Math.round(dailyGoal[date]?.protein?.count || 0) /
        Math.round(dailyGoal[date].protein.goal)) *
      100
    : 0;

  const proteinProgress = protProgress >= 100 ? 100 : protProgress;

  const carbProgress = dailyGoal
    ? (Math.round(dailyGoal[date]?.carbs?.count || 0) /
        Math.round(dailyGoal[date].carbs.goal)) *
      100
    : 0;

  const carbsProgress = carbProgress >= 100 ? 100 : carbProgress;

  const fatsProgress = dailyGoal
    ? (Math.round(dailyGoal[date]?.fat?.count || 0) /
        Math.round(dailyGoal[date].fat.goal)) *
      100
    : 0;

  const fatProgress = fatsProgress >= 100 ? 100 : fatsProgress;

  return {
    dailyGoal,
    markedDates,
    isLoading,
    date,
    caloriesProgress,
    proteinProgress,
    carbsProgress,
    fatProgress,
  };
};
