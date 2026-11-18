import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | LARES" }, { name: "description", content: "Contactez le LARES à Cotonou : formulaire, coordonnées des services et plan d'accès." }, { property: "og:title", content: "Contact | LARES" }, { property: "og:description", content: "Contactez le LARES à Cotonou : formulaire, coordonnées des services et plan d'accès." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const input = "w-full bg-surface px-3 py-3 outline-none";
const services = [["Direction", "direction@lares-benin.org"], ["Recherche & publications", "recherche@lares-benin.org"], ["Partenariats & dons", "partenariats@lares-benin.org"], ["Formation", "formation@lares-benin.org"]];

function Page() {
  return (
    <>
      <PageHero title="Contact" subtitle="Une question, un projet, une demande de partenariat ?" />
      <section className="bg-magenta text-on-color"><div className="container-site grid gap-10 py-16 lg:grid-cols-2">
        <form className="space-y-3 text-foreground" onSubmit={(e) => { e.preventDefault(); alert("Merci, votre message a bien été noté."); }}>
          <h2 className="text-2xl font-semibold text-on-color mb-2">Écrivez-nous</h2>
          <div className="grid gap-3 sm:grid-cols-2"><input required placeholder="Nom" className={input} /><input required type="email" placeholder="E-mail" className={input} /></div>
          <select className={input}><option>Demande générale</option><option>Partenariat</option><option>Presse</option><option>Formation</option></select>
          <textarea required rows={6} placeholder="Votre message" className={input} />
          <button className="btn btn-orange">Envoyer</button>
        </form>
        <div>
          <ul className="space-y-3">
            <li className="flex gap-3"><MapPin className="text-orange shrink-0" /> Quartier Fidjrossè, Cotonou, Bénin</li>
            <li className="flex gap-3"><Phone className="text-orange shrink-0" /> +229 21 00 00 00</li>
            <li className="flex gap-3"><Mail className="text-orange shrink-0" /> contact@lares-benin.org</li>
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">{services.map(([s, m]) => <div key={s} className="border border-on-color/30 p-4"><p className="font-semibold">{s}</p><p className="text-sm opacity-90 break-all">{m}</p></div>)}</div>
        </div>
      </div></section>
      <iframe title="Plan d'accès LARES" src="https://www.google.com/maps?q=Cotonou,Benin&output=embed" className="block h-96 w-full border-0" loading="lazy" />
    </>
  );
}
