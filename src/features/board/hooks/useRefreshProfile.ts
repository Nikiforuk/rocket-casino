import { useEffect } from 'react';

import { useBoardStore } from '../store/boardStore';

export const useRefreshProfile = () => {
  useEffect(() => {
    useBoardStore.getState().refreshProfile();
  }, []);
};
