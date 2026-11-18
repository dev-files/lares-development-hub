import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, Lock, Search } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { domaineTitre, domaines, publications } from "@/data/content";

export const Route = createFileRoute("/publications")({
  head: () => ({ meta: [{ title: "Recherche action et publications | LARES" }, { name: "description", content: "Rapports, études, articles et guides du LARES à consulter et télécharger." }, { property: "og:title", content: "Recherche action et publications | LARES" }, { property: "og:description", content: "Rapports, études, articles et guides du LARES à consulter et télécharger." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const types = ["Tous", "Rapport", "Étude", "Article", "Guide"];

function Page() {
  const [q, setQ] = useState(""); const [type, setType] = useState("Tous"); const [dom, setDom] = useState(""); const [tri, setTri] = useState("recent");
  const liste = publications
    .filter((p) => (type === "Tous" || p.type === type) && (!dom || p.domaine === dom) && (p.titre + p.auteur).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (tri === "recent" ? b.annee - a.annee : a.annee - b.annee));
  return (
    <>
      <PageHero teal title="Recherche action & publications" subtitle="Nos travaux, méthodologies et partenariats de recherche." />
      <section><div className="container-site py-12">
        <SectionTitle teal>Catalogue</SectionTitle>
        <div className="flex flex-wrap mb-4">
          {types.map((t) => <button key={t} onClick={() => setType(t)} className={`px-5 py-3 text-sm font-semibold ${type === t ? "bg-teal text-on-color" : "bg-surface text-ink"}`}>{t}</button>)}
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 bg-surface px-3 border border-input"><Search className="h-4 w-4" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Titre, auteur…" className="py-2 outline-none bg-transparent" /></div>
          <select value={dom} onChange={(e) => setDom(e.target.value)} className="bg-surface px-3 py-2 text-sm border border-input"><option value="">Tous les sujets</option>{domaines.map((d) => <option key={d.slug} value={d.slug}>{d.titre}</option>)}</select>
          <select value={tri} onChange={(e) => setTri(e.target.value)} className="bg-surface px-3 py-2 text-sm border border-input"><option value="recent">Plus récentes</option><option value="ancien">Plus anciennes</option></select>
        </div>
        <div className="space-y-px bg-border">
          {liste.map((p) => (
            <article key={p.id} className="bg-surface p-6 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-60">
                <p className="eyebrow text-teal">{p.type} · {p.annee} · {domaineTitre(p.domaine)}</p>
                <h3 className="mt-1 text-xl font-medium">{p.titre}</h3>
                <p className="text-sm">{p.auteur}</p>
              </div>
              <button className="btn !py-2 bg-fill text-ink border border-input"><Eye className="h-4 w-4" /> Consulter</button>
              {p.acces === "Gratuit"
                ? <button className="btn btn-primary !py-2"><Download className="h-4 w-4" /> PDF gratuit</button>
                : <button className="btn btn-orange !py-2"><Lock className="h-4 w-4" /> Acheter</button>}
            </article>
          ))}
          {liste.length === 0 && <p className="bg-surface p-6">Aucune publication trouvée.</p>}
        </div>
      </div></section>
      <section className="bg-teal text-on-color"><div className="container-site grid gap-8 py-14 md:grid-cols-2">
        <div><h2 className="text-2xl font-semibold text-on-color">Notre méthodologie de recherche action</h2><p className="mt-3">Diagnostic participatif, co-construction des hypothèses avec les acteurs, expérimentation sur le terrain, puis capitalisation et restitution aux décideurs.</p></div>
        <div><h2 className="text-2xl font-semibold text-on-color">Partenariats de recherche</h2><p className="mt-3">Université d'Abomey-Calavi, INRAB, CIRAD, IRD et réseaux régionaux de recherche agricole.</p></div>
      </div></section>
    </>
  );
}
