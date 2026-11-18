import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { domaineTitre, domaines, projets } from "@/data/content";
import elevage from "@/assets/elevage.jpg";

export const Route = createFileRoute("/projets")({
  head: () => ({ meta: [{ title: "Projets | LARES" }, { name: "description", content: "Projets en cours et terminés du LARES : objectifs, bénéficiaires, partenaires et résultats." }, { property: "og:title", content: "Projets | LARES" }, { property: "og:description", content: "Projets en cours et terminés du LARES : objectifs, bénéficiaires, partenaires et résultats." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const sel = "bg-surface px-3 py-2 text-sm border border-input";

function Page() {
  const [dom, setDom] = useState(""); const [reg, setReg] = useState(""); const [st, setSt] = useState("");
  const regions = [...new Set(projets.map((p) => p.region))];
  const liste = projets.filter((p) => (!dom || p.domaine === dom) && (!reg || p.region === reg) && (!st || p.statut === st));
  return (
    <>
      <PageHero title="Nos projets" subtitle="Des actions concrètes sur le terrain, en Afrique de l'Ouest." image={elevage} />
      <section><div className="container-site py-12">
        <div className="flex flex-wrap gap-3 mb-8">
          <select className={sel} value={dom} onChange={(e) => setDom(e.target.value)}><option value="">Tous les domaines</option>{domaines.map((d) => <option key={d.slug} value={d.slug}>{d.titre}</option>)}</select>
          <select className={sel} value={reg} onChange={(e) => setReg(e.target.value)}><option value="">Toutes les régions</option>{regions.map((r) => <option key={r}>{r}</option>)}</select>
          <select className={sel} value={st} onChange={(e) => setSt(e.target.value)}><option value="">Tous les statuts</option><option>En cours</option><option>Terminé</option></select>
        </div>
        {liste.length === 0 && <p>Aucun projet ne correspond à ces filtres.</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {liste.map((p) => (
            <article key={p.id} className="bg-surface p-7">
              <div className="flex justify-between gap-3"><p className="eyebrow text-teal">{domaineTitre(p.domaine)}</p><span className={`eyebrow px-2 py-1 ${p.statut === "En cours" ? "bg-orange text-ink" : "bg-muted"}`}>{p.statut}</span></div>
              <h2 className="mt-2 text-xl font-semibold">{p.titre}</h2>
              <p className="text-sm text-muted-foreground">{p.region} · {p.periode}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div><dt className="font-semibold text-ink inline">Objectif : </dt><dd className="inline">{p.objectif}</dd></div>
                <div><dt className="font-semibold text-ink inline">Bénéficiaires : </dt><dd className="inline">{p.beneficiaires}</dd></div>
                <div><dt className="font-semibold text-ink inline">Partenaires : </dt><dd className="inline">{p.partenaires}</dd></div>
                <div><dt className="font-semibold text-ink inline">Résultats : </dt><dd className="inline">{p.resultats}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </div></section>
    </>
  );
}
