import { useEffect } from 'react';

import { useBoardStore } from '../boardStore';

export const useRefreshBalance = () => {
  useEffect(() => {
    useBoardStore.getState().refreshBalance();
  }, []);
};
