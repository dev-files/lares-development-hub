import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { payloadSchemas, type News, type Project, type Publication } from './content-model';

export const getPublicContent = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Les contenus sont temporairement indisponibles.');
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('site_content').select('id,kind,title,payload').eq('published', true).order('source_id', { ascending: true, nullsFirst: true }).order('updated_at', { ascending: false });
  if (error) throw new Error('Impossible de charger les contenus.');
  const result: { actualites: News[]; projets: Project[]; publications: Publication[] } = { actualites: [], projets: [], publications: [] };
  for (const row of data ?? []) {
    const common = { id: row.id, titre: row.title };
    if (row.kind === 'actualites') result.actualites.push({ ...common, ...payloadSchemas.actualites.parse(row.payload) });
    if (row.kind === 'projets') result.projets.push({ ...common, ...payloadSchemas.projets.parse(row.payload) });
    if (row.kind === 'publications') result.publications.push({ ...common, ...payloadSchemas.publications.parse(row.payload) });
  }
  return result;
});