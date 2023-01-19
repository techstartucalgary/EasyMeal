import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig: firebase.FirebaseOptions = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app: firebase.FirebaseApp =
  firebase.getApps().length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);
