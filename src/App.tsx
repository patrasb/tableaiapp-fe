import { RouterProvider } from 'react-router';
import router from '@/router';
import { createContext, useEffect, useState } from 'react';
import { type User as CurrentUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { user, type User } from './models/user';
import { getDoc } from 'firelordjs';
import { type DocumentSnapshot } from 'firelordjs';
import { freeCredits } from './shared/Billing';

interface IUserContext {
  currentUser: CurrentUser | null | undefined;
  userDoc: DocumentSnapshot<User> | null | undefined;
  localAvailableCredits: number | null;
  setLocalAvailableCredits: (value: number) => void;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  userDoc: null,
  localAvailableCredits: null,
  setLocalAvailableCredits: () => {},
});

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>();
  const [userDoc, setUserDoc] = useState<DocumentSnapshot<User> | null>();
  const [localAvailableCredits, setLocalAvailableCredits] = useState<number | null>(null);

  // On user sign-out we set creditsVoided to true to prevent abuse
  const creditsVoided = window.localStorage.getItem('creditsVoided') === 'true';
  const availableCredits = userDoc?.data()?.availableCredits;

  useEffect(() => onAuthStateChanged(auth, setCurrentUser));

  useEffect(() => {
    if (currentUser) getDoc(user.doc(currentUser.uid)).then(setUserDoc);
    if (currentUser === null) setLocalAvailableCredits(creditsVoided ? 0 : freeCredits);
  }, [currentUser]);

  useEffect(() => {
    if (typeof availableCredits === 'number') setLocalAvailableCredits(availableCredits);
  }, [availableCredits]);

  return (
    <UserContext.Provider value={{ currentUser, userDoc, localAvailableCredits, setLocalAvailableCredits }}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
}
