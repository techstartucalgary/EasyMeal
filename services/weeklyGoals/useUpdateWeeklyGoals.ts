import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  doc,
} from '@firebase/firestore';
import { db } from 'utils/firebase-config';
import { useWeekRange } from './useWeekRange';
import { WeeklyGoal } from './types';
import { useWeeklyGoals } from './useWeeklyGoals';

export const useUpdateWeeklyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { firstDay, lastDay } = useWeekRange();

  useWeeklyGoals();

  const updateWeeklyGoal = useCallback(
    async (count: number) => {
      if (currentUser) {
        setIsLoading(true);
        const weeklyGoalsCollectionRef = collection(
          db,
          'weekly_goals',
          currentUser?.uid,
          'goals',
        );
        const currentWeeklyGoalQ = query(
          weeklyGoalsCollectionRef,
          where('firstDay', '==', firstDay),
          where('lastDay', '==', lastDay),
          limit(1),
        );

        const currentWeeklyGoalSnapshot = await getDocs(currentWeeklyGoalQ);

        currentWeeklyGoalSnapshot.forEach(async (document) => {
          await updateDoc(
            doc(db, 'weekly_goals', currentUser?.uid, 'goals', document.id),
            {
              ...(document.data() as WeeklyGoal),
              count,
            },
          );
        });
      }
      setIsLoading(false);
    },
    [currentUser, firstDay, lastDay],
  );

  const completedTodaysGoal = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const weeklyGoalsCollectionRef = collection(
        db,
        'weekly_goals',
        currentUser?.uid,
        'goals',
      );
      const currentWeeklyGoalQ = query(
        weeklyGoalsCollectionRef,
        where('firstDay', '==', firstDay),
        where('lastDay', '==', lastDay),
        limit(1),
      );

      const currentWeeklyGoalSnapshot = await getDocs(currentWeeklyGoalQ);

      currentWeeklyGoalSnapshot.forEach(async (document) => {
        const weeklyGoal = document.data() as WeeklyGoal;

        const payload = {
          ...weeklyGoal,
          goal: weeklyGoal.goal + 1,
        };

        await updateDoc(
          doc(db, 'weekly_goals', currentUser?.uid, 'goals', document.id),
          payload,
        );
      });
    }
    setIsLoading(false);
  }, [currentUser, firstDay, lastDay]);

  return { updateWeeklyGoal, completedTodaysGoal, isLoading };
};
