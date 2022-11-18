import React, { PropsWithChildren, FC, useMemo, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from 'utils/firebase-config';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  // const { navigate } = useNavigation();
  const register = ({
    registerEmail,
    registerPassword,
  }: {
    registerEmail: string;
    registerPassword: string;
  }) => createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

  const login = ({
    loginEmail,
    loginPassword,
  }: {
    loginEmail: string;
    loginPassword: string;
  }) => signInWithEmailAndPassword(auth, loginEmail, loginPassword);

  const logout = () => signOut(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();

    return signInWithPopup(auth, provider);
  };

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigate('Home', {});
  //     }
  //   });
  // }, [navigate]);

  const value = useMemo(
    () => ({ register, login, logout, signInWithFacebook, signInWithGoogle }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
