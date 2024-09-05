"use client";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import axios from "axios";
import { getBaseURL } from "../utils";
import { getFromLocalStorage, setToLocalStorage } from "../utils/local-storage";
import { authKey } from "../constants/storageKey";
import { removeUserInfo } from "../helpers/auth.helper";

export const AuthContext = createContext<any>(null);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProviders = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGitHub = () => {
    return signInWithPopup(auth, gitHubProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
      const userInfo = { email: currentUser?.email };

      if (userInfo.email) {
        const storedToken = getFromLocalStorage(authKey);

        try {
          const response = await axios.post(`${getBaseURL()}/jwt`, {
            email: userInfo.email,
            token: storedToken,
          });

          // Access the response data properly
          if (response.data?.data?.token) {
            setToLocalStorage(authKey, response.data?.data?.token);
          } else {
            removeUserInfo(authKey);
          }
        } catch (error) {
          console.log("user error", error);
          localStorage.removeItem(authKey);
        }
      } else {
        removeUserInfo(authKey);
      }

      setLoading(false);
    };

    // Call fetchData function
    const unsubscribe = onAuthStateChanged(auth, fetchData);

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    signInWithGitHub,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
