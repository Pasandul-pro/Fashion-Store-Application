import React, { createContext, useContext, useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (insforge.auth.getCurrentUser) {
          const result = await insforge.auth.getCurrentUser();
          
          // If the SDK throws an auth error (stale token, 403, 401, user deleted)
          if (result?.error) {
            console.warn("Auth error detected on mount, purging SDK session.", result.error);
            await insforge.auth.signOut().catch(() => {});
            localStorage.clear();
            setUser(null);
          } else {
            const fetchedUser = result?.data?.user || result?.data || result?.user || result;
            if (fetchedUser && !fetchedUser.error) {
              setUser(fetchedUser);
            } else {
              setUser(null);
            }
          }
        }
      } catch (err) {
        console.error("Auth context exception:", err);
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const signUp = async (email, password) => {
    const res = await insforge.auth.signUp({ email, password });
    if (res?.data?.user || res?.user) {
      setUser(res?.data?.user || res?.user);
    }
    return res;
  };

  const signIn = async (email, password) => {
    const res = await insforge.auth.signInWithPassword({ email, password });
    if (res?.data?.user || res?.user) {
      setUser(res?.data?.user || res?.user);
    }
    return res;
  };

  const signOut = async () => {
    const res = await insforge.auth.signOut();
    setUser(null);
    return res;
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
