import {create} from 'zustand';
import {combine, createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {User} from '@mobile/types/auth';

export type AuthState = Omit<User, 'password'>;
const INITIAL_STATE: AuthState = {
  id: '',
  username: '',
  role: '',
  email: '',
};

export type Actions = {
  setUser: (user: AuthState) => void;
  clearUser: () => void;
};

const useAuthStore = create(
  persist(
    combine<AuthState, Actions>(INITIAL_STATE, set => ({
      setUser: user => set(user),
      clearUser: () => set(INITIAL_STATE),
    })),
    {
      name: 'auth',
      partialize: state => ({id: state.id}),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useAuth = () => useAuthStore(state => state);
