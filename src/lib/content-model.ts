import { z } from 'zod';

export const kinds = ['actualites', 'projets', 'publications'] as const;
export type ContentKind = (typeof kinds)[number];
export const labels: Record<ContentKind, string> = { actualites: 'Actualités', projets: 'Projets', publications: 'Publications' };
const text = z.string().trim().max(10000);
const domain = z.enum(['marches', 'rural', 'education', 'spatial', 'genre', 'climat', 'elevage']);
export const payloadSchemas = {
  actualites: z.object({ date: text.min(1), categorie: text.min(1), resume: text.min(1) }),
  projets: z.object({ domaine: domain, region: text.min(1), statut: z.enum(['En cours', 'Terminé']), periode: text.min(1), objectif: text.min(1), beneficiaires: text, partenaires: text, resultats: text }),
  publications: z.object({ type: z.enum(['Rapport', 'Étude', 'Article', 'Guide']), auteur: text.min(1), annee: z.coerce.number().int().min(1900).max(2100), domaine: domain, acces: z.enum(['Gratuit', 'Payant']), url: z.string().url().refine(v => v.startsWith('https://'), 'Utilisez un lien HTTPS').or(z.literal('')).optional() }),
};
export function validateContent(input: unknown) {
  const base = z.object({ id: z.string().uuid().optional(), kind: z.enum(kinds), title: text.min(1).max(250), published: z.boolean(), payload: z.unknown() }).parse(input);
  return { ...base, payload: payloadSchemas[base.kind].parse(base.payload) };
}
export type News = z.infer<typeof payloadSchemas.actualites> & { id: string; titre: string };
export type Project = z.infer<typeof payloadSchemas.projets> & { id: string; titre: string };
export type Publication = z.infer<typeof payloadSchemas.publications> & { id: string; titre: string };
export const fields: Record<ContentKind, { key: string; label: string; options?: string[]; multiline?: boolean; numeric?: boolean }[]> = {
  actualites: [{ key: 'date', label: 'Date' }, { key: 'categorie', label: 'Catégorie', options: ['Activité', 'Communiqué', 'Success story'] }, { key: 'resume', label: 'Texte', multiline: true }],
  projets: [{ key: 'domaine', label: 'Domaine' }, { key: 'region', label: 'Région' }, { key: 'statut', label: 'Statut du projet', options: ['En cours', 'Terminé'] }, { key: 'periode', label: 'Période' }, { key: 'objectif', label: 'Objectif', multiline: true }, { key: 'beneficiaires', label: 'Bénéficiaires' }, { key: 'partenaires', label: 'Partenaires' }, { key: 'resultats', label: 'Résultats', multiline: true }],
  publications: [{ key: 'type', label: 'Type', options: ['Rapport', 'Étude', 'Article', 'Guide'] }, { key: 'auteur', label: 'Auteur' }, { key: 'annee', label: 'Année', numeric: true }, { key: 'domaine', label: 'Domaine' }, { key: 'acces', label: 'Accès', options: ['Gratuit', 'Payant'] }, { key: 'url', label: 'Lien du document (HTTPS)' }],
};