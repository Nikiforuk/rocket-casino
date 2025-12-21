import { supabase } from '../../../app/supabaseClient';

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

export const updateUsername = async (newUsername: string, userId: string) => {
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ username: newUsername })
    .eq('id', userId);

  if (profileError) {
    return { success: false, error: { message: profileError.message } };
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: { username: newUsername },
  });

  if (metadataError) {
    return { success: false, error: { message: metadataError.message } };
  }

  return { success: true };
};

export const resetProfile = async () => {
  const { error } = await supabase.rpc('reset_profile');
  if (error) throw error;
};
