// src/lib/firebase/auth.ts
import { signInWithPopup, GoogleAuthProvider, User, UserCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './config';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  if (!auth) {
    console.warn("Firebase auth is not initialized. Skipping listener.");
    return () => {}; // dummy unsubscribe
  }
  return auth.onAuthStateChanged(callback);
}

export async function signInWithGoogle(): Promise<{ isAdmin: boolean }> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ display: "popup" });

  try {
    if (!auth) throw new Error("Firebase auth is not initialized.");
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;

    if (!user?.email) throw new Error("Google sign-in failed");

    // Allow GEC SKP or specific admin email
    const allowedEmailPattern = /^[a-zA-Z0-9._%+-]+@gecskp\.ac\.in$/;
    const adminOverrideEmail = "codecompass2024@gmail.com";

    if (user.email !== adminOverrideEmail && !allowedEmailPattern.test(user.email)) {
      throw new Error("Only GEC SKP emails are allowed");
    }

    if (!firestore) throw new Error("Firebase firestore is not initialized.");

    const userDocRef = doc(firestore, 'adminemail', user.email);
    const userDoc = await getDoc(userDocRef);

    const isAdmin =
      userDoc.exists() &&
      ['admin', 'superadmin'].includes(userDoc.data()?.role);

    return { isAdmin };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

export async function signOutWithGoogle(): Promise<void> {
  try {
    if (!auth) throw new Error("Firebase auth is not initialized.");
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}
