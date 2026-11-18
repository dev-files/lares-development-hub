import { Link } from "@tanstack/react-router";
import { ArrowUp, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-footer">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Nous suivre</h3>
          <div className="flex gap-3 text-primary">
            {[Facebook, Twitter, Linkedin, Youtube].map((I, i) => <a key={i} href="#" aria-label="réseau social" className="hover:opacity-70"><I className="h-6 w-6" /></a>)}
          </div>
          <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
            <p className="font-semibold text-ink mb-2">Newsletter</p>
            <div className="flex">
              <input type="email" required placeholder="Votre e-mail" className="min-w-0 flex-1 bg-surface px-3 py-2 text-sm outline-none" />
              <button className="bg-primary px-4 text-sm font-semibold text-on-color">OK</button>
            </div>
          </form>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">L'essentiel</h3>
          <ul className="space-y-2">
            <li><Link to="/a-propos" className="hover:text-primary">Qui sommes-nous</Link></li>
            <li><Link to="/domaines" className="hover:text-primary">Domaines d'intervention</Link></li>
            <li><Link to="/projets" className="hover:text-primary">Projets</Link></li>
            <li><Link to="/publications" className="hover:text-primary">Publications</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Accès par profil</h3>
          <ul className="space-y-2">
            <li><Link to="/soutenir" className="hover:text-primary">Partenaires & bailleurs</Link></li>
            <li><Link to="/publications" className="hover:text-primary">Chercheurs</Link></li>
            <li><Link to="/soutenir" className="hover:text-primary">Volontaires</Link></li>
            <li><Link to="/formation" className="hover:text-primary">Apprenants</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/espace-membres" className="hover:text-primary">Espace membres</Link></li>
            <li><Link to="/actualites" className="hover:text-primary">Espace presse</Link></li>
          </ul>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut" className="mt-6 grid h-12 w-12 place-items-center bg-primary text-on-color"><ArrowUp /></button>
        </div>
      </div>
      <p className="pb-6 text-center text-[11px] text-footer-text">© {new Date().getFullYear()} LARES – Cotonou, Bénin · Mentions légales · Politique de confidentialité</p>
    </footer>
  );
}
