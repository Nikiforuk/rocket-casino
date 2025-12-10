import { useEffect } from 'react';

import { useBoardStore } from '../boardStore';

export const useRefreshProfile = () => {
  useEffect(() => {
    useBoardStore.getState().refreshProfile();
  }, []);
};
