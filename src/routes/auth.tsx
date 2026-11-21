import { createFileRoute } from '@tanstack/react-router';
import { AuthPanel } from '@/components/AuthPanel';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [{ title: 'Connexion sécurisée | LARES' }, { name: 'description', content: 'Connexion et création de compte LARES.' }, { property: 'og:title', content: 'Connexion sécurisée | LARES' }, { property: 'og:description', content: 'Accédez à votre compte LARES.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: AuthPanel,
});