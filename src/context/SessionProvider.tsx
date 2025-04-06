'use client';

import { createContext, useState, useEffect } from 'react';

interface SessionContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  return (
    <SessionContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </SessionContext.Provider>
  );
}
