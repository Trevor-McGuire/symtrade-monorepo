import React, { ReactNode, useState, useContext, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    console.log('Initial active session:', activeSessionData);
    return activeSessionData ? JSON.parse(activeSessionData) : null;
  });

  useEffect(() => {
    console.log('Active session changed:', activeSession);
    if (activeSession) {
      localStorage.setItem('activeSession', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('activeSession');
    }
  }, [activeSession]);

  console.log('Rendering AuthProvider');

  return (
    <AuthContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  console.log('Using auth context:', context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function withAuthCheck(Component: React.FC, isAuthenticatedRoute: boolean) {
  return (props: any) => {
    const { activeSession } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticatedRoute && !activeSession) {
        console.log('User is not authenticated, redirecting to /sign-in');
        navigate('/login');
      } else if (!isAuthenticatedRoute && activeSession) {
        console.log('User is authenticated, redirecting to /dashboard');
        navigate('/dashboard');
      }
    }, [activeSession, navigate, isAuthenticatedRoute]);

    return <Component {...props} />;
  };
}