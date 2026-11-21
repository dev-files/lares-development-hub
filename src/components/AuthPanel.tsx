import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { LovableMark } from '@lovable.dev/cloud-auth-js/react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { useAccount } from './AccountSession';

export function AuthPanel() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const { user } = useAccount();
  const navigate = useNavigate();
  useEffect(() => { if (user) void navigate({ to: '/admin', replace: true }); }, [user, navigate]);
  function changeMode(next: typeof mode) { setMode(next); setError(''); setNotice(''); }
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      if (mode === 'login') {
        const { error: failure } = await supabase.auth.signInWithPassword({ email, password });
        if (failure) throw new Error('E-mail ou mot de passe incorrect, ou adresse non confirmée.');
        await navigate({ to: '/admin' });
      } else if (mode === 'signup') {
        const { error: failure } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + '/auth', data: { display_name: name } } });
        if (failure) throw new Error(failure.message);
        setNotice('Consultez votre boîte e-mail pour confirmer votre compte. L’administration reste réservée aux comptes autorisés.');
      } else {
        const { error: failure } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/reset-password' });
        if (failure) throw new Error('L’e-mail n’a pas pu être envoyé. Réessayez plus tard.');
        setNotice('Si un compte correspond à cette adresse, vous recevrez un lien de réinitialisation.');
      }
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Connexion impossible.'); }
    finally { setBusy(false); }
  }
  async function social(provider: 'google' | 'lovable') {
    setBusy(true); setError('');
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + '/auth' });
      if (result.error) throw result.error;
      if (!result.redirected) await navigate({ to: '/admin' });
    } catch { setError('La connexion a échoué. Veuillez réessayer.'); }
    finally { setBusy(false); }
  }
  return <section className="container-site py-14 md:py-20"><div className="mx-auto max-w-md">
    <ShieldCheck className="mb-4 h-10 w-10 text-teal" />
    <p className="text-sm font-semibold text-teal">LARES · Accès sécurisé</p>
    <h1 className="mt-2 text-3xl font-bold">{mode === 'signup' ? 'Créer un compte' : mode === 'forgot' ? 'Mot de passe oublié' : 'Connexion à votre espace'}</h1>
    <form onSubmit={submit} className="mt-8 space-y-5">
      {mode === 'signup' && <label className="block text-sm font-semibold">Nom complet<input className="admin-input mt-2" required value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label>}
      <label className="block text-sm font-semibold">Adresse e-mail<input className="admin-input mt-2" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></label>
      {mode !== 'forgot' && <label className="block text-sm font-semibold">Mot de passe<input className="admin-input mt-2" type="password" required minLength={mode === 'signup' ? 8 : 1} value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} /></label>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {notice && <p role="status" className="border-l-2 border-teal bg-teal/10 p-4 text-sm">{notice}</p>}
      <Button className="h-11 w-full" disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <ArrowRight />}{mode === 'signup' ? 'Créer mon compte' : mode === 'forgot' ? 'Envoyer le lien' : 'Se connecter'}</Button>
    </form>
    {mode !== 'forgot' && <><div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OU<span className="h-px flex-1 bg-border" /></div>
      <div className="space-y-3"><Button variant="outline" className="google-signin h-11 w-full" disabled={busy} onClick={() => social('google')}><svg aria-hidden="true" viewBox="0 0 24 24" className="!size-[18px]"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>Continuer avec Google</Button>
      <Button variant="outline" className="h-11 w-full bg-surface" disabled={busy} onClick={() => social('lovable')}><LovableMark className="!size-[18px]" />Continuer avec Lovable</Button></div></>}
    <div className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1"><Button variant="link" onClick={() => changeMode(mode === 'signup' ? 'login' : 'signup')}>{mode === 'signup' ? 'Déjà un compte ? Se connecter' : 'Créer un compte'}</Button><Button variant="link" onClick={() => changeMode(mode === 'forgot' ? 'login' : 'forgot')}>{mode === 'forgot' ? 'Retour à la connexion' : 'Mot de passe oublié ?'}</Button></div>
    <Link to="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-primary">Retour au site</Link>
  </div></section>;
}