import { user } from '@/models/user';
import { StripeRole } from '@/shared/Billing';
import { type UserCredential } from 'firebase/auth';
import { serverTimestamp, setDoc } from 'firelordjs';

/**
 * Function needs to be called after user sign in.
 * It checks if the user signed in for the first time, creates the userDoc in the database,
 * and sets the availableCredits value. If the user is not signing in for the first time,
 * the userDoc is queried and availableCredits set.
 */
export async function postUserSignIn(userCredential: UserCredential, localAvailableCredits: null | number) {
  const { metadata, uid, displayName, email, emailVerified, isAnonymous, photoURL } = userCredential.user;
  // check if the user signs in for the first time
  if (metadata.creationTime === metadata.lastSignInTime)
    await setDoc(user.doc(uid), {
      displayName,
      email, // validated by firestore security rule
      emailVerified, // validated by firestore security rule
      photoURL,
      isAnonymous, // validated by firestore security rule
      createdAt: serverTimestamp(),
      availableCredits: localAvailableCredits ?? 0, // validated by firestore security rule
      stripeRole: StripeRole.Free,
    });

  return userCredential.user;
}
