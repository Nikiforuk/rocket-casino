import { useMinesStore } from '../store/minesStore';

export const end = () => {
  useMinesStore.getState().reset();
};
