import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/espace-membres")({
  head: () => ({ meta: [{ title: "Espace membres | LARES" }, { name: "description", content: "Accès sécurisé aux ressources réservées aux membres et apprenants du LARES." }, { property: "og:title", content: "Espace membres | LARES" }, { property: "og:description", content: "Accès sécurisé aux ressources réservées aux membres et apprenants du LARES." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const input = "w-full bg-surface border border-input px-3 py-3 outline-none focus:border-primary";

function Page() {
  return (
    <>
      <PageHero title="Espace membres" subtitle="Ressources internes, formations et documents réservés." />
      <section><div className="container-site py-16 max-w-md">
        <form className="bg-surface p-8 space-y-3" onSubmit={(e) => { e.preventDefault(); alert("La connexion sera activée prochainement."); }}>
          <h2 className="text-2xl font-semibold text-primary mb-2">Connexion</h2>
          <input required type="email" placeholder="E-mail" className={input} />
          <input required type="password" placeholder="Mot de passe" className={input} />
          <button className="btn btn-primary w-full justify-center">Se connecter</button>
          <p className="text-sm text-center">Mot de passe oublié ? · Créer un compte</p>
        </form>
      </div></section>
    </>
  );
}
