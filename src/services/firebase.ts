import { type FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firelordjs';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_GCP_PROJECT,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_DEFAULT_BUCKET_NAME,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, { localCache: memoryLocalCache() });

export const db = getFirestore(app);
export const auth = getAuth();
export const functions = getFunctions(app, 'europe-west1');
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectStorageEmulator(storage, 'localhost', 9199);
}
