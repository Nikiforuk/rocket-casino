export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'gold';

export default interface CasesItem {
  id: number;
  emoji: string;
  rarity: Rarity;
  caseType: 'animal' | 'space' | 'food' | 'sports';
}
