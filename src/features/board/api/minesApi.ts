import { supabase } from '../../../app/supabaseClient';

export const minesStart = async (bet_amount: number, mines_count: number, client_seed?: string) => {
  const { data, error } = await supabase.rpc('mines_start', {
    bet_amount,
    mines_count,
    client_seed,
  });
  if (error) throw error;
  return data;
};

export const minesReveal = async (game_id: string, tile_index: number) => {
  const { data, error } = await supabase.rpc('mines_reveal', { game_id, tile_index });
  if (error) throw error;
  return data;
};

export const minesCashout = async (game_id: string) => {
  const { data, error } = await supabase.rpc('mines_cashout', { game_id });
  if (error) throw error;
  return data;
};
