import { create } from 'zustand';

interface UsersState {}

const useAuthStore = create<UsersState>(() => ({}));
