import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import heroImg from "@/assets/hero-terrain.jpg";

export function PageHero({ title, subtitle, teal, image = heroImg }: { title: string; subtitle?: ReactNode; teal?: boolean; image?: string }) {
  return (
    <>
      <section className="relative overflow-hidden" style={{ ["--section-color" as string]: teal ? "var(--teal)" : "var(--header)" }}>
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" width={1600} height={900} />
        <div className="absolute inset-0 hero-veil" />
        <div className="dots absolute right-8 top-8 h-16 w-24 opacity-80" />
        <div className="container-site relative py-20 md:py-28 text-on-color">
          <h1 className="max-w-xl text-4xl md:text-5xl font-bold text-on-color">{title}</h1>
          {subtitle && <p className="mt-4 max-w-lg text-lg opacity-95">{subtitle}</p>}
        </div>
      </section>
      <div className="bg-surface">
        <div className="container-site py-3 text-sm">
          <Link to="/" className="hover:underline">Accueil</Link> <span className="mx-1">›</span> <strong className="text-ink">{title}</strong>
        </div>
      </div>
    </>
  );
}

export function SectionTitle({ children, teal }: { children: ReactNode; teal?: boolean }) {
  return <h2 className={`text-[26px] font-semibold mb-8 ${teal ? "text-teal" : "text-primary"}`}>{children}</h2>;
}
