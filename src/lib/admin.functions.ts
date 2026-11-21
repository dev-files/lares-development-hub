import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { validateContent } from './content-model';
import { z } from 'zod';

export const getAdminData = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: allowed, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (error) throw new Error('Impossible de vérifier vos droits.');
  if (!allowed) return { allowed: false as const, entries: [], profiles: [], roles: [] };
  const [entries, profiles, roles] = await Promise.all([
    context.supabase.from('site_content').select('*').order('updated_at', { ascending: false }),
    context.supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    context.supabase.from('user_roles').select('user_id,role'),
  ]);
  if (entries.error || profiles.error || roles.error) throw new Error('Impossible de charger l’administration.');
  return { allowed: true as const, entries: entries.data ?? [], profiles: profiles.data ?? [], roles: roles.data ?? [] };
});

export const saveContent = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(validateContent).handler(async ({ data, context }) => {
  const { data: allowed, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (error || !allowed) throw new Error('Accès réservé aux administrateurs.');
  const row = { kind: data.kind, title: data.title, payload: data.payload, published: data.published };
  const result = data.id ? await context.supabase.from('site_content').update(row).eq('id', data.id).select('id').single() : await context.supabase.from('site_content').insert(row).select('id').single();
  if (result.error) throw new Error('Le contenu n’a pas pu être enregistré.');
  return result.data;
});

export const deleteContent = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input)).handler(async ({ data, context }) => {
  const { data: allowed, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (error || !allowed) throw new Error('Accès réservé aux administrateurs.');
  const result = await context.supabase.from('site_content').delete().eq('id', data.id);
  if (result.error) throw new Error('Suppression impossible.');
  return { success: true };
});