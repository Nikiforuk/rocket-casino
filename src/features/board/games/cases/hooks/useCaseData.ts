import { useMemo, useState } from 'react';

import { cases, emojis } from '../../../shared/constants/cases';
import type CasesItem from '../../../shared/types/cases';
import { getCaseTypeByName } from '../utils/caseHelpers';

export const useCaseData = () => {
  const [iCase, setICase] = useState(0);
  const activeCase = cases[iCase];
  const type = useMemo(() => getCaseTypeByName(activeCase.name), [activeCase.name]);

  const items = useMemo<CasesItem[]>(() => emojis.filter((e) => e.caseType === type), [type]);
  const reelItems = useMemo<CasesItem[]>(
    () => Array.from({ length: 20 }).flatMap(() => items),
    [items],
  );

  const setCaseIndex = (idx: number) => setICase(idx);

  return { iCase, activeCase, items, reelItems, setCaseIndex };
};
