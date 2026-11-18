export const domaines = [
  { slug: "marches", titre: "Marchés et politiques agricoles", enjeux: "Accès des producteurs aux marchés, régulation des filières, politiques commerciales régionales (CEDEAO, UEMOA).", approche: "Analyses de filières, observatoires des prix, appui aux concertations multi-acteurs." },
  { slug: "rural", titre: "Agriculture et développement rural", enjeux: "Productivité des exploitations familiales, sécurité alimentaire et revenus ruraux.", approche: "Recherche action participative avec les organisations paysannes et les communes." },
  { slug: "education", titre: "Éducation et formation professionnelle", enjeux: "Insertion des jeunes, adéquation formation-emploi dans les métiers agricoles.", approche: "Ingénierie de formation, curricula, accompagnement des centres de formation." },
  { slug: "spatial", titre: "Dynamique spatiale du développement", enjeux: "Urbanisation, décentralisation et aménagement des territoires.", approche: "Diagnostics territoriaux, cartographie, appui aux plans de développement communaux." },
  { slug: "genre", titre: "Genre et inclusion", enjeux: "Autonomisation économique des femmes et des filles, accès aux ressources.", approche: "Études genre, renforcement de capacités, leadership féminin." },
  { slug: "climat", titre: "Changement climatique et agroécologie", enjeux: "Résilience des systèmes de production face à la variabilité climatique.", approche: "Expérimentations agroécologiques, plans d'adaptation, gestion durable des terres." },
  { slug: "elevage", titre: "Systèmes d'élevage en Afrique de l'Ouest", enjeux: "Mobilité pastorale, conflits d'usage, filières bétail-viande et lait.", approche: "Études transfrontalières, dialogue politique, appui aux organisations d'éleveurs." },
] as const;

export type DomaineSlug = (typeof domaines)[number]["slug"];

export const projets = [
  { id: 1, titre: "Observatoire régional des marchés vivriers", domaine: "marches", region: "Afrique de l'Ouest", statut: "En cours", periode: "2023 – 2026", objectif: "Produire une information fiable sur les prix et flux de produits vivriers.", beneficiaires: "Organisations paysannes, commerçants, décideurs", partenaires: "CEDEAO, ROPPA", resultats: "12 marchés suivis, bulletins mensuels diffusés." },
  { id: 2, titre: "Femmes transformatrices du Sud-Bénin", domaine: "genre", region: "Bénin – Sud", statut: "En cours", periode: "2024 – 2026", objectif: "Renforcer les capacités techniques et entrepreneuriales de 600 femmes.", beneficiaires: "Groupements de femmes", partenaires: "Coopération suisse", resultats: "420 femmes formées, 35 unités équipées." },
  { id: 3, titre: "Pastoralisme et paix transfrontalière", domaine: "elevage", region: "Bénin – Niger – Burkina", statut: "Terminé", periode: "2019 – 2022", objectif: "Réduire les conflits liés à la transhumance.", beneficiaires: "Éleveurs, agriculteurs, communes frontalières", partenaires: "UE, RBM", resultats: "18 comités de dialogue installés." },
  { id: 4, titre: "Agroécologie et résilience climatique", domaine: "climat", region: "Bénin – Nord", statut: "En cours", periode: "2022 – 2025", objectif: "Diffuser des pratiques agroécologiques éprouvées.", beneficiaires: "2 000 exploitations familiales", partenaires: "AFD, INRAB", resultats: "1 300 ha sous pratiques durables." },
  { id: 5, titre: "Plans de développement communaux", domaine: "spatial", region: "Bénin", statut: "Terminé", periode: "2017 – 2020", objectif: "Accompagner 15 communes dans leur planification.", beneficiaires: "Communes, populations", partenaires: "Ministère de la Décentralisation", resultats: "15 PDC adoptés." },
  { id: 6, titre: "Jeunes et métiers agricoles", domaine: "education", region: "Bénin – Togo", statut: "En cours", periode: "2024 – 2027", objectif: "Former et insérer 1 000 jeunes dans l'agro-entrepreneuriat.", beneficiaires: "Jeunes de 18 à 35 ans", partenaires: "GIZ", resultats: "Première cohorte de 250 jeunes." },
];

export const publications = [
  { id: 1, titre: "Dynamiques des marchés céréaliers au Bénin", type: "Rapport", auteur: "Équipe LARES", annee: 2025, domaine: "marches", acces: "Gratuit" },
  { id: 2, titre: "Guide méthodologique de la recherche action participative", type: "Guide", auteur: "J. Adégbola", annee: 2024, domaine: "rural", acces: "Gratuit" },
  { id: 3, titre: "Transhumance et gouvernance foncière en Afrique de l'Ouest", type: "Étude", auteur: "A. Soulé", annee: 2023, domaine: "elevage", acces: "Payant" },
  { id: 4, titre: "Genre et accès au crédit agricole", type: "Article", auteur: "M. Houngbo", annee: 2024, domaine: "genre", acces: "Gratuit" },
  { id: 5, titre: "Adaptation climatique des exploitations familiales", type: "Rapport", auteur: "Équipe LARES", annee: 2022, domaine: "climat", acces: "Payant" },
  { id: 6, titre: "Urbanisation et sécurité alimentaire à Cotonou", type: "Article", auteur: "F. Dossou", annee: 2021, domaine: "spatial", acces: "Gratuit" },
];

export const actualites = [
  { id: 1, date: "12 nov. 2026", categorie: "Activité", titre: "Atelier régional sur les politiques agricoles à Cotonou", resume: "Plus de 80 participants de 8 pays ont échangé sur l'avenir des politiques commerciales agricoles." },
  { id: 2, date: "28 oct. 2026", categorie: "Communiqué", titre: "Le LARES signe un partenariat avec l'Université d'Abomey-Calavi", resume: "Un accord pour renforcer la recherche action et l'accueil de doctorants." },
  { id: 3, date: "05 oct. 2026", categorie: "Success story", titre: "À Bohicon, des femmes transformatrices doublent leurs revenus", resume: "Témoignages de bénéficiaires du projet Femmes transformatrices." },
];

export const evenements = [
  { date: "04", mois: "Déc", titre: "Séminaire : élevage et changement climatique", lieu: "Parakou" },
  { date: "15", mois: "Jan", titre: "Conférence annuelle du LARES", lieu: "Cotonou" },
  { date: "22", mois: "Fév", titre: "Campagne de sensibilisation agroécologie", lieu: "Natitingou" },
];

export const equipe = [
  { nom: "Pr. Jean Adégbola", role: "Président du Conseil d'administration", bio: "Économiste agricole, plus de 30 ans d'expérience en politiques de développement." },
  { nom: "Dr. Mariam Houngbo", role: "Directrice exécutive", bio: "Spécialiste genre et développement rural, ancienne consultante internationale." },
  { nom: "Dr. Aboubakar Soulé", role: "Responsable recherche", bio: "Géographe, expert des systèmes pastoraux ouest-africains." },
  { nom: "Mme Florence Dossou", role: "Responsable administrative et financière", bio: "Gestion de projets multi-bailleurs et conformité financière." },
];

export const historique = [
  { annee: "1989", texte: "Création du LARES à Cotonou par un groupe de chercheurs." },
  { annee: "1997", texte: "Enregistrement officiel comme association au Bénin." },
  { annee: "2005", texte: "Lancement des premiers programmes régionaux sur les marchés." },
  { annee: "2015", texte: "Ouverture des travaux sur le changement climatique et l'agroécologie." },
  { annee: "2025", texte: "Repositionnement stratégique et nouvelle présence numérique." },
];

export const partenaires = ["CEDEAO", "UEMOA", "AFD", "GIZ", "Union européenne", "ROPPA", "UAC", "FAO"];

export const formations = [
  { titre: "Analyse des filières agricoles", duree: "6 semaines", modules: 5, niveau: "Intermédiaire" },
  { titre: "Recherche action participative", duree: "4 semaines", modules: 4, niveau: "Débutant" },
  { titre: "Genre et projets de développement", duree: "3 semaines", modules: 3, niveau: "Tous niveaux" },
  { titre: "Suivi-évaluation axé sur les résultats", duree: "5 semaines", modules: 5, niveau: "Avancé" },
];

export const domaineTitre = (slug: string) => domaines.find((d) => d.slug === slug)?.titre ?? slug;
