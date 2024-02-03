import React, { ReactNode, useState, useContext, SetStateAction, useEffect } from "react";

interface ActiveSession {
  token: string;
  userId: string;
}

interface AuthContextType {
  activeSession: ActiveSession | null;
  setActiveSession: React.Dispatch<SetStateAction<ActiveSession | null>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

// AuthProviderProps
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(() => {
    const activeSessionData = localStorage.getItem('activeSession');
    return activeSessionData ? JSON.parse(activeSessionData) : null;
  });

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('activeSession', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('activeSession');
    }
  }, [activeSession]);

  return (
    <AuthContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};