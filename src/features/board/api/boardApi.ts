import { supabase } from '../../../app/supabaseClient';

export const addBalance = async (amount: number) => {
  const { error } = await supabase.rpc('add_balance', { amount });
  if (error) throw error;
};

export const spendBalance = async (amount: number): Promise<boolean> => {
  const { data, error } = await supabase.rpc('spend_balance', { amount });
  if (error) throw error;
  return data as boolean;
};

export const addWager = async (amount: number) => {
  const { error } = await supabase.rpc('add_wager', { amount });
  if (error) throw error;
};

export const addWin = async (winAmount: number) => {
  const { error } = await supabase.rpc('add_win', { win_amount: winAmount });
  if (error) throw error;
};

export const getProfile = async () => {
  const { data, error } = await supabase.rpc('get_my_profile');
  if (error) throw error;
  return data as {
    balance: number;
    games_played: number;
    total_won: number;
    total_wagered: number;
    username: string;
  };
};
