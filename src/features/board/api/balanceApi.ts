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
