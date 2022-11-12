import React, { PropsWithChildren, FC, useMemo } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from 'utils/firebase-config';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const value = useMemo(() => ({ register, login, logout }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
