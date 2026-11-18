import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { equipe, historique } from "@/data/content";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [{ title: "À propos | LARES" }, { name: "description", content: "Mission, vision, valeurs, historique, équipe et gouvernance du LARES." }, { property: "og:title", content: "À propos | LARES" }, { property: "og:description", content: "Mission, vision, valeurs, historique, équipe et gouvernance du LARES." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const valeurs = ["Rigueur scientifique", "Engagement envers les vulnérables", "Indépendance", "Transparence", "Partenariat"];

function Page() {
  return (
    <>
      <PageHero title="À propos du LARES" subtitle="Une expertise africaine au service du développement durable depuis 1989." />
      <section className="bg-surface"><div className="container-site grid gap-8 py-16 md:grid-cols-3">
        {[["Vision", "Une Afrique où les politiques de développement reposent sur une connaissance fine des territoires et profitent aux plus vulnérables."], ["Mission", "Contribuer à une meilleure connaissance des dynamiques territoriales, économiques et sociales pour asseoir des politiques et stratégies de développement durable."], ["Objectifs", "Produire de la recherche action, accompagner les acteurs, former et influencer les politiques publiques."]].map(([t, d]) => (
          <div key={t} className="border-t-4 border-orange pt-4"><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2">{d}</p></div>
        ))}
      </div></section>
      <section><div className="container-site py-16">
        <SectionTitle>Nos valeurs</SectionTitle>
        <div className="flex flex-wrap gap-3">{valeurs.map((v) => <span key={v} className="rounded-[22px] bg-primary px-5 py-2 font-semibold text-on-color">{v}</span>)}</div>
      </div></section>
      <section className="bg-surface"><div className="container-site py-16">
        <SectionTitle>Notre histoire</SectionTitle>
        <ol className="relative border-l-2 border-orange ml-3">
          {historique.map((h) => (
            <li key={h.annee} className="mb-8 pl-8 relative">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 bg-primary" />
              <p className="text-2xl font-bold text-primary">{h.annee}</p><p>{h.texte}</p>
            </li>
          ))}
        </ol>
      </div></section>
      <section><div className="container-site py-16">
        <SectionTitle>L'équipe</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipe.map((m) => (
            <div key={m.nom} className="bg-surface">
              <div className="aspect-square bg-teal grid place-items-center text-5xl font-bold text-on-color">{m.nom.split(" ").slice(-2).map((x) => x[0]).join("")}</div>
              <div className="p-5"><h3 className="text-lg font-semibold">{m.nom}</h3><p className="eyebrow text-orange-text mt-1">{m.role}</p><p className="mt-2 text-sm">{m.bio}</p></div>
            </div>
          ))}
        </div>
      </div></section>
      <section className="bg-surface"><div className="container-site py-16 max-w-3xl">
        <SectionTitle>Gouvernance et transparence</SectionTitle>
        <p>Le LARES est administré par une Assemblée générale et un Conseil d'administration élus. Ses comptes sont audités chaque année par un cabinet indépendant et les rapports d'activité sont publics.</p>
      </div></section>
    </>
  );
}
