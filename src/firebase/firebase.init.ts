//  Todo: configure this sdk

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value && value.length > 0
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Analytics (only on the client side)
// Lazy load to avoid gtag not being ready
let analytics: any = null;
let analyticsInitialized = false;

export const getAnalyticsInstance = () => {
  if (typeof window === 'undefined') return null;
  
  // Don't initialize if Firebase isn't configured
  if (!isFirebaseConfigured) {
    return null;
  }
  
  // Return cached instance if already initialized
  if (analyticsInitialized) {
    return analytics;
  }
  
  try {
    const { getAnalytics } = require('@firebase/analytics');
    // Only initialize if gtag is available (GA4 script loaded)
    if (typeof window.gtag === 'function') {
      analytics = getAnalytics(app);
      analyticsInitialized = true;
    }
  } catch (error: any) {
    // Silently fail - Firebase Analytics is optional when using GA4 directly
    // This avoids errors when Firebase config is incomplete
    if (error?.message?.includes('not been registered')) {
      // Firebase Analytics component not registered - likely missing measurementId
      return null;
    }
    console.warn('Firebase Analytics not available:', error);
  }
  
  return analytics;
};

// if (typeof window !== 'undefined' && analytics) {
//   analytics.setDebugMode(true);
// }

export { auth };
