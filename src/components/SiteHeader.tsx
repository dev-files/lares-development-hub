import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, User, X } from "lucide-react";
import { Logo } from "./Logo";

export const nav = [
  { to: "/a-propos", label: "À propos" },
  { to: "/domaines", label: "Domaines d'intervention" },
  { to: "/projets", label: "Projets" },
  { to: "/publications", label: "Recherche & publications" },
  { to: "/actualites", label: "Actualités & événements" },
  { to: "/formation", label: "Formation" },
  { to: "/soutenir", label: "Nous soutenir" },
  { to: "/contact", label: "Contact" },
] as const;

const tealRoutes = ["/actualites", "/publications"];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const bg = tealRoutes.some((r) => path.startsWith(r)) ? "bg-teal" : "bg-header";
  return (
    <header className={`${bg} text-on-color`}>
      <div className="border-b border-on-color/15">
        <div className="container-site flex h-10 items-center justify-end gap-5 eyebrow">
          <Link to="/soutenir" className="btn btn-light !px-4 !py-1 text-[11px]">Faire un don <Heart className="h-3 w-3" /></Link>
          <Link to="/actualites" className="hidden sm:inline hover:underline">Espace presse</Link>
          <Link to="/espace-membres" className="flex items-center gap-1 hover:underline">Connexion <User className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
      <div className="container-site flex items-center gap-6 py-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="leading-tight">
            <span className="block text-2xl font-extrabold tracking-wide">LARES</span>
            <span className="block text-sm opacity-90">Laboratoire d'analyse régionale<br className="hidden sm:block" /> et d'expertise sociale</span>
          </span>
        </Link>
        <div className="ml-auto hidden md:flex items-center gap-2 border-b border-on-color/70 pb-1 w-56">
          <input placeholder="Rechercher" className="bg-transparent outline-none placeholder:text-on-color/70 w-full text-sm" />
          <Search className="h-4 w-4" />
        </div>
        <button onClick={() => setOpen(!open)} className="ml-auto md:ml-0 flex items-center gap-2 eyebrow" aria-label="Menu">
          Menu {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-on-color/15">
          <ul className="container-site grid gap-x-8 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block py-2 text-lg font-semibold hover:text-orange">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <nav className="hidden lg:block border-t border-on-color/15">
        <ul className="container-site flex justify-between py-3 text-sm font-semibold">
          {nav.map((n) => (
            <li key={n.to}><Link to={n.to} className="hover:text-orange" activeProps={{ className: "text-orange" }}>{n.label}</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
