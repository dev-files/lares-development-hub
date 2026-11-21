import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountSession';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/mon-compte')({
  head: () => ({ meta: [{ title: 'Mon profil | LARES' }, { name: 'description', content: 'Votre profil et vos informations personnelles LARES.' }, { property: 'og:title', content: 'Mon profil | LARES' }, { property: 'og:description', content: 'Votre compte personnel LARES.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Connexion requise.');
    const { data, error } = await supabase.from('profiles').select('display_name,avatar_url').eq('id', user.id).single();
    if (error) throw new Error('Profil indisponible.');
    return data;
  }, component: Profile,
});
function Profile() {
  const profile = Route.useLoaderData();
  const { user } = useAccount();
  const [name, setName] = useState(profile.display_name);
  const [avatar, setAvatar] = useState(profile.avatar_url);
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); if (!user) return; setBusy(true);
    const { error } = await supabase.from('profiles').update({ display_name: name.trim(), avatar_url: avatar.trim() }).eq('id', user.id);
    setBusy(false); if (error) toast.error('Enregistrement impossible.'); else toast.success('Profil enregistré.');
  }
  return <section className="container-site py-16"><div className="max-w-lg"><p className="text-sm font-semibold text-teal">Mon compte</p><h1 className="mt-2 text-3xl font-bold">Mon profil</h1><p className="mt-3 break-all text-muted-foreground">{user?.email}</p><form className="mt-8 space-y-5" onSubmit={submit}><label className="block text-sm font-semibold">Nom complet<input required maxLength={150} className="admin-input mt-2" value={name} onChange={e => setName(e.target.value)} /></label><label className="block text-sm font-semibold">Lien de votre photo<input type="url" className="admin-input mt-2" value={avatar} onChange={e => setAvatar(e.target.value)} /></label><Button disabled={busy}>Enregistrer mon profil</Button></form><Link to="/admin" className="mt-6 block text-primary">Administration</Link></div></section>;
}