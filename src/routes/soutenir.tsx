import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Gift, Handshake, Smartphone, Users } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/PageHero";

export const Route = createFileRoute("/soutenir")({
  head: () => ({ meta: [{ title: "Soutenir le LARES | LARES" }, { name: "description", content: "Faire un don, devenir volontaire ou partenaire du LARES." }, { property: "og:title", content: "Soutenir le LARES | LARES" }, { property: "og:description", content: "Faire un don, devenir volontaire ou partenaire du LARES." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const input = "w-full bg-surface border border-input px-3 py-2 outline-none focus:border-primary";

function Page() {
  const [montant, setMontant] = useState(25000);
  const [moyen, setMoyen] = useState("carte");
  return (
    <>
      <PageHero title="Nous soutenir" subtitle="Chaque contribution renforce la recherche au service des communautés." />
      <section className="bg-surface"><div className="container-site grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {[[Gift, "Dons financiers", "Ponctuels ou réguliers."], [Users, "Volontariat", "Mettez vos compétences à profit."], [Handshake, "Partenariats", "Co-construisons des programmes."], [Gift, "Dons en nature", "Matériel, équipements, ouvrages."]].map(([I, t, d]) => {
          const Icon = I as typeof Gift;
          return <div key={t as string} className="border-t-4 border-orange bg-fill p-6"><Icon className="h-7 w-7 text-primary" /><h3 className="mt-3 text-lg font-semibold">{t as string}</h3><p className="text-sm">{d as string}</p></div>;
        })}
      </div></section>

      <section className="bg-magenta text-on-color"><div className="container-site grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-on-color">Faire un don</h2>
          <p className="mt-3 opacity-90">Vos dons financent la recherche action, la formation des jeunes et des femmes, et l'accompagnement des communautés.</p>
          <ul className="mt-6 space-y-2">
            <li><strong className="text-orange">70 %</strong> – actions de terrain</li>
            <li><strong className="text-orange">20 %</strong> – recherche et publications</li>
            <li><strong className="text-orange">10 %</strong> – fonctionnement</li>
          </ul>
          <p className="mt-4 text-sm opacity-80">Rapports financiers audités disponibles sur demande.</p>
        </div>
        <form className="bg-surface p-7 text-foreground" onSubmit={(e) => { e.preventDefault(); alert("Le paiement en ligne sera activé prochainement."); }}>
          <p className="font-semibold text-ink mb-2">Montant (FCFA)</p>
          <div className="grid grid-cols-4 gap-2">{[10000, 25000, 50000, 100000].map((m) => <button type="button" key={m} onClick={() => setMontant(m)} className={`py-2 text-sm font-semibold ${montant === m ? "bg-primary text-on-color" : "bg-fill border border-input"}`}>{m.toLocaleString("fr-FR")}</button>)}</div>
          <input type="number" className={input + " mt-2"} value={montant} onChange={(e) => setMontant(+e.target.value)} />
          <p className="font-semibold text-ink mt-5 mb-2">Moyen de paiement</p>
          <div className="grid grid-cols-2 gap-2">
            {[["carte", "Carte bancaire", CreditCard], ["momo", "Mobile Money", Smartphone]].map(([k, l, I]) => { const Icon = I as typeof CreditCard; return (
              <button type="button" key={k as string} onClick={() => setMoyen(k as string)} className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold ${moyen === k ? "bg-primary text-on-color" : "bg-fill border border-input"}`}><Icon className="h-4 w-4" />{l as string}</button>); })}
          </div>
          <input required placeholder="Nom complet" className={input + " mt-5"} />
          <input required type="email" placeholder="E-mail" className={input + " mt-2"} />
          <button className="btn btn-primary mt-5 w-full justify-center">Donner {montant.toLocaleString("fr-FR")} FCFA</button>
        </form>
      </div></section>

      <section><div className="container-site grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <SectionTitle>Devenir volontaire</SectionTitle>
          <ol className="list-decimal pl-5 space-y-1 mb-6"><li>Remplissez le formulaire</li><li>Entretien avec notre équipe</li><li>Mission adaptée à votre profil</li></ol>
          <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); alert("Merci, votre candidature a bien été notée."); }}>
            <input required placeholder="Nom complet" className={input} />
            <input required type="email" placeholder="E-mail" className={input} />
            <input placeholder="Domaine de compétence" className={input} />
            <textarea placeholder="Vos motivations" rows={4} className={input} />
            <button className="btn btn-primary">Envoyer ma candidature</button>
          </form>
        </div>
        <div className="bg-surface p-8 self-start">
          <SectionTitle>Devenir partenaire</SectionTitle>
          <p>Bailleurs, institutions, entreprises ou centres de recherche : le LARES conçoit avec vous des programmes sur mesure, des études commanditées et des formations.</p>
          <a href="/contact" className="btn btn-orange mt-6">Nous contacter</a>
        </div>
      </div></section>
    </>
  );
}
