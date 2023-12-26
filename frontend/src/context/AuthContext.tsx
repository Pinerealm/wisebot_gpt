import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {}, []);
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setuser({ name: data.name, email: data.email });
      setisLoggedIn(true);
    }
  };
  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {};
  const value = { isLoggedIn, user, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
