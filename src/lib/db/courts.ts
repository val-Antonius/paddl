import { supabaseServer } from '../supabase/server';
import type { Court } from '@/types/database';

export async function getAllCourts(): Promise<Court[]> {
  const { data, error } = await supabaseServer
    .from('courts')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching courts:', error);
    throw new Error('Failed to fetch courts');
  }

  return data || [];
}

export async function getCourtById(id: string): Promise<Court | null> {
  const { data, error } = await supabaseServer
    .from('courts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching court:', error);
    return null;
  }

  return data;
}

export async function getCourtByName(name: string): Promise<Court | null> {
  const { data, error } = await supabaseServer
    .from('courts')
    .select('*')
    .eq('name', name)
    .eq('is_active', true)
    .single();

  if (error) {
    return null;
  }

  return data;
}