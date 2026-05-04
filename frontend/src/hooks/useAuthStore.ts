import { create } from 'zustand';
import api from '../lib/api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (access: string, refresh: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('adminToken'),
  isLoading: false,

  login: async (access, refresh) => {
    localStorage.setItem('adminToken', access);
    localStorage.setItem('refreshToken', refresh);
    set({ isAuthenticated: true });
    const store = useAuthStore.getState();
    await store.fetchUser();
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/me/');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('refreshToken');
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
