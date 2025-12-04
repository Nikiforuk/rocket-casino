export const getCaseTypeByName = (name: string): 'animal' | 'space' | 'food' | 'sports' => {
  if (name.startsWith('Animal')) return 'animal';
  if (name.startsWith('Space')) return 'space';
  if (name.startsWith('Food')) return 'food';
  return 'sports';
};
