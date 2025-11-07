import { createContext, useState, type ReactNode } from "react";

export interface AuthState {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  accessToken?: string;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
  const [ auth, setAuth ] = useState<AuthState>({});
  return (
    <AuthContext.Provider value ={{ auth, setAuth }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;