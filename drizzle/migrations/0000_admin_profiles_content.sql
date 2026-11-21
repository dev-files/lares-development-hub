CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TABLE public.user_roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, role public.app_role NOT NULL DEFAULT 'user', UNIQUE(user_id,role));
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
CREATE POLICY "Read own roles or admin" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TABLE public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name text NOT NULL DEFAULT '', avatar_url text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE(display_name,avatar_url) ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profile read" ON public.profiles FOR SELECT TO authenticated USING (id=auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Profile update own" ON public.profiles FOR UPDATE TO authenticated USING (id=auth.uid()) WITH CHECK (id=auth.uid());
CREATE FUNCTION public.handle_new_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN INSERT INTO public.profiles(id,display_name) VALUES(new.id,coalesce(new.raw_user_meta_data->>'display_name','')); INSERT INTO public.user_roles(user_id,role) VALUES(new.id,'user'); RETURN new; END $$;
REVOKE ALL ON FUNCTION public.handle_new_profile() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_auth_user_created_profile AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_profile();
INSERT INTO public.profiles(id,display_name) SELECT id,coalesce(raw_user_meta_data->>'display_name','') FROM auth.users ON CONFLICT DO NOTHING;
INSERT INTO public.user_roles(user_id,role) SELECT id,'user'::public.app_role FROM auth.users ON CONFLICT DO NOTHING;
CREATE TABLE public.site_content (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), kind text NOT NULL CHECK(kind IN ('actualites','projets','publications')), source_id integer, title text NOT NULL CHECK(length(trim(title))>0), payload jsonb NOT NULL DEFAULT '{}', published boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(kind,source_id));
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published content" ON public.site_content FOR SELECT TO anon,authenticated USING(published);
CREATE POLICY "Admin content management" ON public.site_content FOR ALL TO authenticated USING(public.has_role(auth.uid(),'admin')) WITH CHECK(public.has_role(auth.uid(),'admin'));
CREATE FUNCTION public.content_timestamp() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN new.updated_at=now(); RETURN new; END $$;
CREATE TRIGGER content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.content_timestamp();
INSERT INTO public.site_content(kind,source_id,title,payload,published) VALUES
('actualites',1,'Atelier régional sur les politiques agricoles à Cotonou','{"date":"12 nov. 2026","categorie":"Activité","resume":"Plus de 80 participants de 8 pays ont échangé sur l’avenir des politiques commerciales agricoles."}',true),
('actualites',2,'Le LARES signe un partenariat avec l’Université d’Abomey-Calavi','{"date":"28 oct. 2026","categorie":"Communiqué","resume":"Un accord pour renforcer la recherche action et l’accueil de doctorants."}',true),
('actualites',3,'À Bohicon, des femmes transformatrices doublent leurs revenus','{"date":"05 oct. 2026","categorie":"Success story","resume":"Témoignages de bénéficiaires du projet Femmes transformatrices."}',true),
('projets',1,'Observatoire régional des marchés vivriers','{"domaine":"marches","region":"Afrique de l’Ouest","statut":"En cours","periode":"2023 – 2026","objectif":"Produire une information fiable sur les prix et flux de produits vivriers.","beneficiaires":"Organisations paysannes, commerçants, décideurs","partenaires":"CEDEAO, ROPPA","resultats":"12 marchés suivis, bulletins mensuels diffusés."}',true),
('projets',2,'Femmes transformatrices du Sud-Bénin','{"domaine":"genre","region":"Bénin – Sud","statut":"En cours","periode":"2024 – 2026","objectif":"Renforcer les capacités techniques et entrepreneuriales de 600 femmes.","beneficiaires":"Groupements de femmes","partenaires":"Coopération suisse","resultats":"420 femmes formées, 35 unités équipées."}',true),
('projets',3,'Pastoralisme et paix transfrontalière','{"domaine":"elevage","region":"Bénin – Niger – Burkina","statut":"Terminé","periode":"2019 – 2022","objectif":"Réduire les conflits liés à la transhumance.","beneficiaires":"Éleveurs, agriculteurs, communes frontalières","partenaires":"UE, RBM","resultats":"18 comités de dialogue installés."}',true),
('projets',4,'Agroécologie et résilience climatique','{"domaine":"climat","region":"Bénin – Nord","statut":"En cours","periode":"2022 – 2025","objectif":"Diffuser des pratiques agroécologiques éprouvées.","beneficiaires":"2 000 exploitations familiales","partenaires":"AFD, INRAB","resultats":"1 300 ha sous pratiques durables."}',true),
('projets',5,'Plans de développement communaux','{"domaine":"spatial","region":"Bénin","statut":"Terminé","periode":"2017 – 2020","objectif":"Accompagner 15 communes dans leur planification.","beneficiaires":"Communes, populations","partenaires":"Ministère de la Décentralisation","resultats":"15 PDC adoptés."}',true),
('projets',6,'Jeunes et métiers agricoles','{"domaine":"education","region":"Bénin – Togo","statut":"En cours","periode":"2024 – 2027","objectif":"Former et insérer 1 000 jeunes dans l’agro-entrepreneuriat.","beneficiaires":"Jeunes de 18 à 35 ans","partenaires":"GIZ","resultats":"Première cohorte de 250 jeunes."}',true),
('publications',1,'Dynamiques des marchés céréaliers au Bénin','{"type":"Rapport","auteur":"Équipe LARES","annee":2025,"domaine":"marches","acces":"Gratuit"}',true),
('publications',2,'Guide méthodologique de la recherche action participative','{"type":"Guide","auteur":"J. Adégbola","annee":2024,"domaine":"rural","acces":"Gratuit"}',true),
('publications',3,'Transhumance et gouvernance foncière en Afrique de l’Ouest','{"type":"Étude","auteur":"A. Soulé","annee":2023,"domaine":"elevage","acces":"Payant"}',true),
('publications',4,'Genre et accès au crédit agricole','{"type":"Article","auteur":"M. Houngbo","annee":2024,"domaine":"genre","acces":"Gratuit"}',true),
('publications',5,'Adaptation climatique des exploitations familiales','{"type":"Rapport","auteur":"Équipe LARES","annee":2022,"domaine":"climat","acces":"Payant"}',true),
('publications',6,'Urbanisation et sécurité alimentaire à Cotonou','{"type":"Article","auteur":"F. Dossou","annee":2021,"domaine":"spatial","acces":"Gratuit"}',true);