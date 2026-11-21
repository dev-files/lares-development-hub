import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/reset-password')({
  head: () => ({ meta: [{ title: 'Réinitialiser votre mot de passe | LARES' }, { name: 'description', content: 'Choisissez un nouveau mot de passe pour votre compte LARES.' }, { property: 'og:title', content: 'Réinitialisation | LARES' }, { property: 'og:description', content: 'Réinitialisation sécurisée de votre mot de passe.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }), component: ResetPassword,
});
function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('Vérification du lien…');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const recovery = new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery';
    void supabase.auth.getUser().then(({ data, error }) => { setReady(recovery && !!data.user && !error); setMessage(recovery && data.user && !error ? '' : 'Ce lien est invalide ou expiré. Demandez un nouveau lien de réinitialisation.'); });
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmation) { setMessage('Les mots de passe ne correspondent pas.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setMessage('Le mot de passe n’a pas pu être modifié. Demandez un nouveau lien.');
    else { setDone(true); setMessage('Votre mot de passe a été mis à jour.'); }
  }
  return <section className="container-site py-16"><div className="mx-auto max-w-md"><h1 className="text-3xl font-bold">Nouveau mot de passe</h1><p role="status" className="mt-4">{message}</p>{ready && !done && <form className="mt-6 space-y-4" onSubmit={submit}><label className="block">Nouveau mot de passe<input className="admin-input mt-2" type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" /></label><label className="block">Confirmer le mot de passe<input className="admin-input mt-2" type="password" minLength={8} required value={confirmation} onChange={e => setConfirmation(e.target.value)} autoComplete="new-password" /></label><Button disabled={busy}>Enregistrer le mot de passe</Button></form>}<Link to="/auth" className="mt-6 block text-primary">Retour à la connexion</Link></div></section>;
}