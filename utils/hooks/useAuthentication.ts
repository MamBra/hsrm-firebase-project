import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import '../../config/firebase';

const auth = getAuth();

export default function useAuthentication() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(undefined);
      
      setLoading(false);
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    loading
  };
}