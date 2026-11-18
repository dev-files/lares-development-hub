import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Mail } from "lucide-react";
import hero from "@/assets/hero-terrain.jpg";
import femmes from "@/assets/atelier-femmes.jpg";
import elevage from "@/assets/elevage.jpg";
import { actualites, domaines, partenaires, projets } from "@/data/content";
import { SectionTitle } from "@/components/PageHero";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Accueil | LARES" }, { name: "description", content: "LARES : recherche action et expertise au service du développement durable du Bénin et de l'Afrique depuis 1989." }, { property: "og:title", content: "Accueil | LARES" }, { property: "og:description", content: "LARES : recherche action et expertise au service du développement durable du Bénin et de l'Afrique depuis 1989." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Chercheurs et producteurs sur le terrain" className="absolute inset-0 h-full w-full object-cover" width={1600} height={912} />
        <div className="absolute inset-0 hero-veil" />
        <div className="dots absolute right-10 bottom-10 h-20 w-32" />
        <div className="container-site relative py-24 md:py-36 text-on-color">
          <p className="eyebrow text-orange">Depuis 1989 au Bénin</p>
          <h1 className="mt-3 max-w-2xl text-4xl md:text-6xl font-bold text-on-color">Comprendre les territoires pour un <span className="text-orange">avenir</span> durable</h1>
          <p className="mt-5 max-w-lg text-lg">Expertise de haut niveau et recherche action au service des groupes vulnérables en Afrique.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/soutenir" className="btn btn-orange">Faire un don <Heart className="h-4 w-4" /></Link>
            <Link to="/a-propos" className="btn btn-outline-light">Découvrir le LARES</Link>
          </div>
        </div>
      </section>

      <section className="bg-magenta text-on-color">
        <div className="container-site grid gap-8 py-14 md:grid-cols-[1fr_320px] items-center">
          <div>
            <p className="eyebrow text-orange">À la une</p>
            <h2 className="mt-2 text-3xl font-semibold text-on-color">{actualites[0].titre}</h2>
            <p className="mt-3 opacity-90">{actualites[0].resume}</p>
            <Link to="/actualites" className="mt-4 inline-flex items-center gap-2 font-semibold text-orange">Lire la suite <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-xl bg-orange p-6 text-ink">
            <Mail className="h-7 w-7" />
            <h3 className="mt-2 text-xl font-semibold">Restez informé·e</h3>
            <p className="text-sm">Recevez nos publications et événements.</p>
            <form className="mt-3 flex" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Votre e-mail" className="min-w-0 flex-1 bg-surface px-3 py-2 text-sm outline-none" />
              <button className="bg-ink px-4 text-sm font-semibold text-on-color">S'abonner</button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-site grid gap-10 py-20 md:grid-cols-[260px_1fr] items-center">
          <div className="aspect-square bg-primary grid place-items-center text-on-color text-6xl font-bold">MH</div>
          <div>
            <p className="eyebrow text-orange-text">Mot de la directrice exécutive</p>
            <blockquote className="mt-3 text-xl text-ink">« Depuis près de quatre décennies, le LARES produit une connaissance utile pour l'action. Notre ambition : rester aux côtés des communautés, des chercheurs et des décideurs pour bâtir des politiques plus justes et durables. »</blockquote>
            <p className="mt-4 font-semibold">Dr. Mariam Houngbo</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-site py-20">
          <SectionTitle>Nos domaines d'intervention</SectionTitle>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {domaines.map((d) => (
              <Link key={d.slug} to="/domaines" hash={d.slug} className="group bg-surface p-6 hover:bg-primary hover:text-on-color transition-colors">
                <span className="block h-1 w-10 bg-orange mb-4" />
                <h3 className="text-lg font-semibold group-hover:text-on-color">{d.titre}</h3>
              </Link>
            ))}
            <Link to="/domaines" className="bg-orange p-6 font-semibold text-ink flex items-center gap-2">Tous les domaines <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-site py-20">
          <SectionTitle>Projets phares</SectionTitle>
          <div className="grid gap-6 md:grid-cols-3">
            {projets.slice(0, 3).map((p, i) => (
              <article key={p.id} className="bg-fill">
                <img src={[femmes, elevage, hero][i]} alt="" loading="lazy" width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <p className="eyebrow text-teal">{p.statut} · {p.region}</p>
                  <h3 className="mt-2 text-xl font-medium">{p.titre}</h3>
                  <p className="mt-2 text-sm">{p.objectif}</p>
                </div>
              </article>
            ))}
          </div>
          <Link to="/projets" className="btn btn-primary mt-8">Voir tous les projets</Link>
        </div>
      </section>

      <section>
        <div className="container-site py-20">
          <SectionTitle>En images</SectionTitle>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
            {[hero, femmes, elevage].map((src, i) => <img key={i} src={src} alt="Activité du LARES" loading="lazy" width={1200} height={800} className={`h-full w-full object-cover ${i === 0 ? "col-span-2 md:row-span-2" : "aspect-[3/2]"}`} />)}
          </div>
        </div>
      </section>

      <section className="bg-primary text-on-color">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <h2 className="text-3xl font-semibold text-on-color max-w-xl">Soutenez la recherche au service des communautés</h2>
          <div className="flex gap-3">
            <Link to="/soutenir" className="btn btn-orange">Faire un don</Link>
            <Link to="/soutenir" className="btn btn-outline-light">Devenir volontaire</Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-site py-16">
          <p className="eyebrow text-center mb-8">Ils nous font confiance</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
            {partenaires.map((p) => <div key={p} className="bg-surface py-8 text-center text-lg font-bold text-muted-foreground">{p}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}
