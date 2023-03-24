import { doc, setDoc, getDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { ProfileType } from './types';

export const useProfile = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

  const getProfile = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const ProfileRef = doc(db, 'profile', currentUser?.uid);
      const docSnap = await getDoc(ProfileRef);

      if (docSnap.exists()) {
        setProfile({
          level: docSnap.data().level,
          weeklyDaysCooked: docSnap.data().weeklyDaysCooked,
          weeklyGoal: docSnap.data().weeklyGoal,
        });
      } else {
        const payload = {
          level: 0,
          weeklyDaysCooked: 0,
          weeklyGoal: 0,
        };

        await setDoc(doc(db, 'profile', currentUser.uid), payload);
        setProfile(payload);
      }
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return { profile, isLoading, getProfile };
};
