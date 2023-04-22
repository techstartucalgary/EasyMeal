import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  setDoc,
  doc,
  getDoc,
} from '@firebase/firestore';
import { db } from 'utils/firebase-config';
import { useWeekRange } from './useWeekRange';
import { WeeklyGoal } from './types';

export const useUpdateWeeklyGoals = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal | undefined>(
    undefined,
  );
  const { firstDay, lastDay } = useWeekRange();

  const updateWeeklyGoal = useCallback(async () => {
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

      let currentWeeklyGoal: WeeklyGoal | undefined;

      currentWeeklyGoalSnapshot.forEach((doc) => {
        currentWeeklyGoal = doc.data() as WeeklyGoal;
      });

      if (currentWeeklyGoal) {
        const { id } = weeklyGoalsCollectionRef;

        const currentDoc = doc(
          db,
          'weekly_goals',
          currentUser?.uid,
          'goals',
          'DDBuqAxPabbilR7nex5E',
        );
        const docSnap = await getDoc(currentDoc);

        // await setDoc(
        //   currentDoc,
        //   {
        //     goal: 5,
        //     count: 5,
        //   },
        //   { merge: true },
        // );
      }
    }
  }, [currentUser, firstDay, lastDay]);

  useEffect(() => {
    updateWeeklyGoal();
  }, [updateWeeklyGoal]);

  return { updateWeeklyGoal, weeklyGoal, isLoading };
};
