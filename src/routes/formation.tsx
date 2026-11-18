import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { formations } from "@/data/content";
import femmes from "@/assets/atelier-femmes.jpg";

export const Route = createFileRoute("/formation")({
  head: () => ({ meta: [{ title: "Espace formation | LARES" }, { name: "description", content: "Cursus de formation du LARES : modules en ligne, évaluation et certification." }, { property: "og:title", content: "Espace formation | LARES" }, { property: "og:description", content: "Cursus de formation du LARES : modules en ligne, évaluation et certification." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Espace formation" subtitle="Des cursus pratiques, des modules en ligne jusqu'à la certification." image={femmes} />
      <section><div className="container-site py-14">
        <SectionTitle>Nos cursus</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {formations.map((f) => (
            <article key={f.titre} className="bg-surface p-7">
              <p className="eyebrow text-orange-text">{f.niveau}</p>
              <h3 className="mt-2 text-xl font-semibold">{f.titre}</h3>
              <div className="mt-3 flex gap-5 text-sm"><span className="flex items-center gap-1"><Clock className="h-4 w-4" />{f.duree}</span><span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{f.modules} modules</span></div>
              <Link to="/espace-membres" className="btn btn-primary mt-5 !py-2">S'inscrire</Link>
            </article>
          ))}
        </div>
      </div></section>
      <section className="bg-surface"><div className="container-site py-14">
        <SectionTitle>Comment ça marche</SectionTitle>
        <div className="grid gap-6 md:grid-cols-4">
          {[[CheckCircle2, "Inscription", "Créez votre compte apprenant."], [BookOpen, "Modules", "Suivez les leçons à votre rythme."], [CheckCircle2, "Évaluation", "Quiz et travaux pratiques."], [Award, "Certification", "Obtenez votre attestation LARES."]].map(([I, t, d], i) => { const Icon = I as typeof Award; return (
            <div key={t as string}><span className="text-5xl font-bold text-orange">{i + 1}</span><Icon className="h-6 w-6 text-primary mt-2" /><h3 className="mt-2 font-semibold text-lg">{t as string}</h3><p className="text-sm">{d as string}</p></div>); })}
        </div>
      </div></section>
    </>
  );
}
