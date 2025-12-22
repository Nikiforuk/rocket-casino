import { useMemo } from 'react';

import { cases, emojis } from '../constants/cases';
import { useCasesStore } from '../store/casesStore';
import type CasesItem from '../types/cases';
import { getCaseTypeByName } from '../utils/caseHelpers';

export const useCaseData = () => {
  const iCase = useCasesStore((state) => state.caseIndex);
  const setCaseIndex = useCasesStore((state) => state.setCaseIndex);
  const activeCase = cases[iCase];
  const type = useMemo(() => getCaseTypeByName(activeCase.name), [activeCase.name]);

  const items = useMemo<CasesItem[]>(
    () => emojis.filter((emoji) => emoji.caseType === type),
    [type],
  );
  const reelItems = useMemo<CasesItem[]>(
    () => Array.from({ length: 20 }).flatMap(() => items),
    [items],
  );

  return { iCase, activeCase, items, reelItems, setCaseIndex };
};
