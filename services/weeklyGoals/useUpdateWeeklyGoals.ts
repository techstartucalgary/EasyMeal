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
import { useUpdateProfile } from 'services/Profile/useUpdateProfile';
import { format } from 'utils/date';
import { useWeekRange } from './useWeekRange';
import { WeeklyGoal } from './types';
import { useWeeklyGoals } from './useWeeklyGoals';

const date = format(new Date(), 'YYYY-MM-DD');

export const useUpdateWeeklyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { firstDay, lastDay } = useWeekRange();
  const { getWeeklyGoals } = useWeeklyGoals();
  const { levelUp } = useUpdateProfile();

  const updateWeeklyGoal = useCallback(
    async ({ count, goal }: { count?: number; goal?: number }) => {
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
          const payload = {
            ...(document.data() as WeeklyGoal),
            ...(count ? { count } : undefined),
            ...(goal ? { goal } : undefined),
          };

          if (payload.count === payload.goal) {
            levelUp();
          }

          await updateDoc(
            doc(db, 'weekly_goals', currentUser?.uid, 'goals', document.id),
            payload,
          );
        });
      }
      await getWeeklyGoals();
      setIsLoading(false);
    },
    [currentUser, firstDay, getWeeklyGoals, lastDay, levelUp],
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
          count: weeklyGoal.count + 1,
          updatedAt: date,
        };

        if (weeklyGoal.count + 1 === weeklyGoal.goal) {
          levelUp();
        }

        await updateDoc(
          doc(db, 'weekly_goals', currentUser?.uid, 'goals', document.id),
          payload,
        );
      });
    }
    setIsLoading(false);
  }, [currentUser, firstDay, lastDay, levelUp]);

  return { updateWeeklyGoal, completedTodaysGoal, isLoading };
};
