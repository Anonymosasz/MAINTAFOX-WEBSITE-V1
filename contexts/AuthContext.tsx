'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/types/blog';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = (email: string): boolean => {
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map((e) => e.trim()) || [];
    return adminEmails.includes(email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        const isUserAdmin = checkAdminStatus(firebaseUser.email || '');
        setIsAdmin(isUserAdmin);

        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || userData?.displayName || 'Anonymous',
          photoURL: firebaseUser.photoURL || userData?.photoURL,
          role: isUserAdmin ? 'admin' : 'user',
          createdAt: userData?.createdAt?.toDate() || new Date(),
        };

        setUser(user);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    const isUserAdmin = checkAdminStatus(email);

    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      displayName,
      role: isUserAdmin ? 'admin' : 'user',
      createdAt: new Date(),
    });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      const isUserAdmin = checkAdminStatus(result.user.email || '');
      
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: isUserAdmin ? 'admin' : 'user',
        createdAt: new Date(),
      });
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
