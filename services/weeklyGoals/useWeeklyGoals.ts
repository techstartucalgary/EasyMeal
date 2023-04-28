import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  addDoc,
  onSnapshot,
} from '@firebase/firestore';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { useWeekRange } from './useWeekRange';
import { WeeklyGoal } from './types';

const date = format(new Date(), 'YYYY-MM-DD');

export const useWeeklyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal | undefined>(
    undefined,
  );
  const { firstDay, lastDay } = useWeekRange();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const weeklyGoalsCollectionRef = collection(
        db,
        'weekly_goals',
        currentUser?.uid,
        'goals',
      );

      const unsub = onSnapshot(weeklyGoalsCollectionRef, async (docSnap) => {
        const currentWeeklyGoalQ = query(
          weeklyGoalsCollectionRef,
          where('firstDay', '==', firstDay),
          where('lastDay', '==', lastDay),
          limit(1),
        );

        const currentWeeklyGoalSnapshot = await getDocs(currentWeeklyGoalQ);

        let currentWeeklyGoal: WeeklyGoal | undefined;

        currentWeeklyGoalSnapshot.forEach((doc) => {
          currentWeeklyGoal = doc.data() as WeeklyGoal;
        });

        if (currentWeeklyGoal) {
          setWeeklyGoal(currentWeeklyGoal);
        } else {
          const lastWeeklyGoalQ = query(
            weeklyGoalsCollectionRef,
            orderBy('timestamp', 'desc'),
            limit(1),
          );
          const lastWeeklyGoalSnapshot = await getDocs(lastWeeklyGoalQ);

          let lastWeeklyGoal: WeeklyGoal | undefined;

          lastWeeklyGoalSnapshot.forEach((doc) => {
            lastWeeklyGoal = doc.data() as WeeklyGoal;
          });

          const payload: WeeklyGoal = lastWeeklyGoal || {
            count: 0,
            goal: 0,
            firstDay,
            lastDay,
            timestamp: new Date().getTime(),
            updatedAt: date,
          };

          await addDoc(weeklyGoalsCollectionRef, {
            ...payload,
            timestamp: new Date().getTime(),
          });

          setWeeklyGoal(payload);
          setIsLoading(false);
        }
      });

      return () => {
        unsub();
      };
    }
    return () => {};
  }, [currentUser, firstDay, lastDay]);

  const progress = Math.round(
    weeklyGoal?.count && weeklyGoal?.goal
      ? (weeklyGoal.count / weeklyGoal.goal) * 100
      : 0,
  );

  return { weeklyGoal, isLoading, progress };
};
