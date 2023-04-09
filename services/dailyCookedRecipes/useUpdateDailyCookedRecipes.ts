import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { useUpdateDailyGoals } from 'services/dailyGoals/useUpdateDailyGoals';
import { useDailyGoals } from 'services/dailyGoals/useDailyGoals';
import { DailyCookedRecipe } from './types';

export const useUpdateDailyCookedRecipes = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { dailyGoal, isLoading: isLoadingDailyGoal } = useDailyGoals();
  const { updateDailyGoal } = useUpdateDailyGoals();

  const updateDailyGoalIfExist = useCallback(
    async ({
      date,
      calories,
      carbs,
      fat,
      protein,
      cookedTimes,
    }: {
      date: string;
      calories: number;
      carbs: number;
      fat: number;
      protein: number;
      cookedTimes: number;
    }) => {
      if (dailyGoal) {
        const completed =
          dailyGoal[date].calories.count + calories >
            dailyGoal[date].calories.goal &&
          dailyGoal[date].carbs.count + carbs > dailyGoal[date].carbs.goal &&
          dailyGoal[date].fat.count + fat > dailyGoal[date].fat.goal &&
          dailyGoal[date].protein.count + protein >
            dailyGoal[date].protein.goal;

        await updateDailyGoal({
          ...dailyGoal,
          [date]: {
            ...dailyGoal[date],
            calories: {
              ...dailyGoal[date].calories,
              count: dailyGoal[date].calories.count + calories,
            },
            carbs: {
              ...dailyGoal[date].carbs,
              count: dailyGoal[date].carbs.count + carbs,
            },
            fat: {
              ...dailyGoal[date].fat,
              count: dailyGoal[date].fat.count + fat,
            },
            protein: {
              ...dailyGoal[date].protein,
              count: dailyGoal[date].protein.count + protein,
            },
            cookedTimes: dailyGoal[date].cookedTimes + cookedTimes,
            completed,
          },
        });
      }
    },
    [dailyGoal, updateDailyGoal],
  );

  const tooggleRecipe = useCallback(
    async ({
      id,
      price,
      calories,
      carbs,
      fat,
      protein,
    }: {
      id: number;
      price: number;
      calories: number;
      carbs: number;
      fat: number;
      protein: number;
    }) => {
      if (isLoadingDailyGoal) return;
      const stringifyId = id.toString();

      if (currentUser) {
        setIsLoading(true);
        const date = format(new Date(), 'YYYY-MM-DD');
        const dailyCookedRecipesProfile = doc(
          db,
          'daily_cooked_recipes',
          currentUser?.uid,
        );
        const docSnap = await getDoc(dailyCookedRecipesProfile);

        if (docSnap.exists() && docSnap.get(date)) {
          const currentDate = docSnap.get(date) as DailyCookedRecipe;

          let { recipes } = currentDate[date];

          if (!currentDate[date].recipes[stringifyId]) {
            await updateDailyGoalIfExist({
              date,
              calories,
              carbs,
              fat,
              protein,
              cookedTimes: 1,
            });

            recipes = {
              ...currentDate[date].recipes,
              [stringifyId]: {
                price,
              },
            };
          } else {
            await updateDailyGoalIfExist({
              date,
              calories: -calories,
              carbs: -carbs,
              fat: -fat,
              protein: -protein,
              cookedTimes: -1,
            });
            delete recipes[stringifyId];
          }

          const payload: DailyCookedRecipe = {
            ...currentDate,
            [date]: {
              ...currentDate[date],
              recipes,
            },
          };

          await setDoc(
            doc(db, 'daily_cooked_recipes', currentUser.uid),
            payload,
          );
        }
        setIsLoading(false);
      }
    },
    [isLoadingDailyGoal, currentUser, updateDailyGoalIfExist],
  );

  return { isLoading, tooggleRecipe };
};
