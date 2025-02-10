'use client';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.init';
import axios from 'axios';
import { getBaseURL } from '../utils';
import { getFromLocalStorage, setToLocalStorage } from '../utils/local-storage';
import { authKey } from '../constants/storageKey';
import { removeUserInfo } from '../helpers/auth.helper';
import { useGetUsersQuery } from '../redux/api/user/UserApiSlice';
import { Role } from '../enums';

export const AuthContext = createContext<any>(null);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProviders = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  // loading admins from users
  const [admin, setAdmin] = useState([]);
  const { data } = useGetUsersQuery({});
  useEffect(() => {
    if (data) {
      const admins = data.data.filter((user: any) => user.role === Role.ADMIN);
      setAdmin(admins);
      // setLoading(false); // Set loading to false once data is processed
    }
  }, [data]); // Run this effect only when `data` changes

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

      // Check if the user is logged in
      if (currentUser) {
        setUser(currentUser); // Set the user in state for global use
        const userInfo = {
          uid: currentUser.uid,
          email: currentUser.email,
        };
        const storedToken = getFromLocalStorage(authKey);

        // Send user info to your backend
        try {
          // Post to your backend endpoint to save or update the user in the DB
          const userResponse = await axios.post(`${getBaseURL()}/jwt`, {
            uid: userInfo.uid,
            email: userInfo.email,
            token: storedToken,
          });

          // Handle the response - assume your backend returns a JWT
          if (userResponse?.data?.data?.token) {
            setToLocalStorage(authKey, userResponse?.data?.data?.token); // Save the JWT to local storage
          } else {
            removeUserInfo(authKey);
          }
        } catch (error) {
          console.log('Error saving user to the backend:', error);
          removeUserInfo(authKey);
        }
      } else {
        removeUserInfo(authKey);
        setUser(null);
      }

      setLoading(false);
    };

    // Call fetchData function
    const unsubscribe = onAuthStateChanged(auth, fetchData);

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    admin,
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
