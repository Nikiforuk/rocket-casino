import { supabase } from '../../../app/supabaseClient';

export const addWager = async (amount: number) => {
  const { error } = await supabase.rpc('add_wager', { amount });
  if (error) throw error;
};

export const addWin = async (winAmount: number) => {
  const { error } = await supabase.rpc('add_win', { win_amount: winAmount });
  if (error) throw error;
};
