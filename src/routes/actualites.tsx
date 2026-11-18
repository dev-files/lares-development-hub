import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { actualites, evenements } from "@/data/content";
import femmes from "@/assets/atelier-femmes.jpg";

export const Route = createFileRoute("/actualites")({
  head: () => ({ meta: [{ title: "Actualités et événements | LARES" }, { name: "description", content: "Actualités, communiqués de presse et calendrier des événements du LARES." }, { property: "og:title", content: "Actualités et événements | LARES" }, { property: "og:description", content: "Actualités, communiqués de presse et calendrier des événements du LARES." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero teal title="Actualités & événements" subtitle="Nos activités, annonces et communiqués de presse." image={femmes} />
      <section><div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_340px]">
        <div>
          <SectionTitle teal>Fil d'actualités</SectionTitle>
          <div className="space-y-6">
            {actualites.map((a) => (
              <article key={a.id} className="bg-surface p-6">
                <p className="eyebrow text-teal">{a.categorie} · {a.date}</p>
                <h3 className="mt-2 text-xl font-medium">{a.titre}</h3>
                <p className="mt-2">{a.resume}</p>
                <div className="mt-4 flex items-center gap-3 text-sm"><span>Partager :</span>{[Facebook, Twitter, Linkedin].map((I, i) => <a key={i} href="#" aria-label="partager" className="text-teal"><I className="h-4 w-4" /></a>)}</div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex gap-2">{[1, 2, 3].map((n) => <button key={n} className={`h-12 w-12 font-semibold ${n === 1 ? "bg-teal text-on-color" : "bg-surface"}`}>{n}</button>)}</div>
        </div>
        <aside>
          <SectionTitle teal>Calendrier</SectionTitle>
          <ul className="space-y-3">
            {evenements.map((e) => (
              <li key={e.titre} className="flex bg-surface">
                <div className="bg-teal text-on-color w-20 shrink-0 grid place-items-center py-3"><span className="text-2xl font-bold leading-none">{e.date}</span><span className="eyebrow">{e.mois}</span></div>
                <div className="p-3"><p className="font-semibold text-ink leading-snug">{e.titre}</p><p className="text-sm">{e.lieu}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl bg-orange p-6 text-ink">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <form className="mt-3 space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Votre e-mail" className="w-full bg-surface px-3 py-2 text-sm outline-none" />
              <button className="btn !w-full justify-center bg-ink text-on-color">S'abonner</button>
            </form>
          </div>
        </aside>
      </div></section>
    </>
  );
}
