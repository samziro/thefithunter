// app/lib/supabase.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createClientServer = () => {
  return createServerComponentClient({
    cookies,
  });
};
