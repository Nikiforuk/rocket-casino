import { supabase } from '../../../app/supabaseClient';

export const getLeaderboard = async () => {
  const { data, error } = await supabase.rpc('get_leaderboard');

  if (error) {
    console.error('Leaderboard query error:', error);
    throw error;
  }

  return (data || []) as Array<{
    id: string;
    username: string | null;
    games_played: number;
    total_won: number;
    total_wagered: number;
  }>;
};
