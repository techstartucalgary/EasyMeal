import { UserCredential } from 'firebase/auth';

export type LogInPayload = {
  loginEmail: string;
  loginPassword: string;
};

export type RegisterPayload = {
  registerEmail: string;
  registerPassword: string;
};

export type AuthContextType = {
  register: ({
    registerEmail,
    registerPassword,
  }: RegisterPayload) => Promise<UserCredential>;
  login: ({
    loginEmail,
    loginPassword,
  }: LogInPayload) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithFacebook: () => Promise<UserCredential>;
};
