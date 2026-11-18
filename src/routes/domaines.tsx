import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { domaines, projets, publications } from "@/data/content";

export const Route = createFileRoute("/domaines")({
  head: () => ({ meta: [{ title: "Domaines d'intervention | LARES" }, { name: "description", content: "Marchés agricoles, développement rural, formation, genre, climat, élevage : les domaines d'expertise du LARES." }, { property: "og:title", content: "Domaines d'intervention | LARES" }, { property: "og:description", content: "Marchés agricoles, développement rural, formation, genre, climat, élevage : les domaines d'expertise du LARES." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  const [actif, setActif] = useState<string>("tous");
  const liste = actif === "tous" ? domaines : domaines.filter((d) => d.slug === actif);
  return (
    <>
      <PageHero title="Domaines d'intervention" subtitle="Enjeux, approches, projets et travaux de recherche par thématique." />
      <section><div className="container-site py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {[{ slug: "tous", titre: "Tous" }, ...domaines].map((d) => (
            <button key={d.slug} onClick={() => setActif(d.slug)} className={`px-4 py-2 text-sm font-semibold ${actif === d.slug ? "bg-primary text-on-color" : "bg-surface text-ink"}`}>{d.titre}</button>
          ))}
        </div>
        <div className="space-y-6">
          {liste.map((d) => (
            <article key={d.slug} id={d.slug} className="bg-surface p-8 grid gap-6 md:grid-cols-3">
              <h2 className="text-2xl font-semibold text-primary">{d.titre}</h2>
              <div><p className="eyebrow text-orange-text">Enjeux</p><p className="mt-1">{d.enjeux}</p><p className="eyebrow text-orange-text mt-4">Approche</p><p className="mt-1">{d.approche}</p></div>
              <div>
                <p className="eyebrow text-teal">Projets & travaux</p>
                <ul className="mt-1 list-disc pl-5 text-sm space-y-1">
                  {projets.filter((p) => p.domaine === d.slug).map((p) => <li key={p.id}>{p.titre}</li>)}
                  {publications.filter((p) => p.domaine === d.slug).map((p) => <li key={"p" + p.id}>{p.type} : {p.titre}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div></section>
    </>
  );
}
