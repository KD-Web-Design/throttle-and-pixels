"use client";

import { auth } from "@/db/firebaseConfig";
import { useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      router.push("dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
      router.push("dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const redirectIfAuthenticated = () => {
    if (user) {
      router.push("dashboard");
    }
  };

  return {
    user,
    isLoading,
    loginWithGoogle,
    loginWithGithub,
    redirectIfAuthenticated,
  };
};

export default useAuth;
