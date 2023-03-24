import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { db } from 'utils/firebase-config';
import { useProfile } from './useProfile';
import { ProfileType } from './types';

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { profile, getProfile } = useProfile();

  async function updateProfileData(updatedProfile: ProfileType) {
    await getProfile();
    if (currentUser) {
      await setDoc(doc(db, 'profile', currentUser.uid), {
        ...profile,
        level: updatedProfile.level,
        weeklyDaysCooked: updatedProfile.weeklyDaysCooked,
        weeklyGoal: updatedProfile.weeklyGoal,
      });
      await getProfile();
    }
  }
  async function updateProfileCook() {
    setIsLoading(true);
    await getProfile();
    if (currentUser) {
      if (profile) {
        await updateProfileData({
          ...profile,
          weeklyGoal: profile.weeklyGoal,
          weeklyDaysCooked: profile.weeklyDaysCooked + 1,
          level:
            profile.weeklyDaysCooked >= profile.weeklyGoal
              ? profile.level + 1
              : profile.level,
        });
      }
      await getProfile();
      setIsLoading(false);
    }
  }

  async function updateProfileGoal(newGoal: number) {
    setIsLoading(true);
    await getProfile();
    if (currentUser) {
      if (profile) {
        await updateProfileData({
          ...profile,
          weeklyGoal: newGoal,
          weeklyDaysCooked: profile.weeklyDaysCooked,
          level: profile.level,
        });
      }
      await getProfile();
      setIsLoading(false);
    }
  }
  return { updateProfileCook, updateProfileGoal, isLoading };
}
