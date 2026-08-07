import { createContext, useContext, useEffect, useState } from 'react';
import api from './api';
import type { User } from './types';
import * as store from './demoStore';

type Ctx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (input: store.SignupInput) => Promise<User>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const Auth = createContext<Ctx>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const token = localStorage.getItem('fb_token');
      if (token) {
        const { data } = await api.get('/auth/me');
        if (data?.user) {
          setUser(data.user);
          setLoading(false);
          return;
        }
      }
    } catch {
      localStorage.removeItem('fb_token');
    }

    const demoUser = store.getSessionUser();
    setUser(demoUser);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // 1. Try backend API if available
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data?.token && data?.user) {
        localStorage.setItem('fb_token', data.token);
        setUser(data.user);
        return data.user;
      }
    } catch (err: any) {
      console.warn('Backend API login unavailable or returned error, attempting demo account login:', err?.message);
    }

    // 2. Fall back to demoStore login
    const u = await store.login(email, password);
    setUser(u);
    return u;
  };

  const signup = async (input: store.SignupInput): Promise<User> => {
    try {
      const { data } = await api.post('/auth/signup', input);
      if (data?.token && data?.user) {
        localStorage.setItem('fb_token', data.token);
        setUser(data.user);
        return data.user;
      }
    } catch (err: any) {
      console.warn('Backend API signup unavailable or returned error, using local storage:', err?.message);
    }

    const u = await store.signup(input);
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('fb_token');
    store.logout();
    setUser(null);
  };

  return (
    <Auth.Provider value={{ user, loading, login, signup, logout, refresh }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => useContext(Auth);
