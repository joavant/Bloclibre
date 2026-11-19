# Validation de bloclibre Studio 2

Vérifications réalisées sur la livraison du 19 novembre 2026, avec Chromium automatisé via Playwright, Node 20 et Python 3.13.

Ce document décrit des tests réellement exécutés. Il ne constitue pas une garantie de fonctionnement de tout navigateur ou de tout contenu importé.

## Assemblage et analyse statique

- Reconstruction du fichier `index.html` à partir des sources.
- Syntaxe du JavaScript assemblé et de chaque source vérifiée avec `node --check`.
- Recherche des références non définies, doublons de clés / paramètres et branches inaccessibles avec ESLint, sur le bundle assemblé : aucune erreur après déclaration des API navigateur.
- Pas de CDN, police distante, requête d’API ou compte nécessaire au démarrage.

## Parcours utilisateur — 19 scénarios

1. Démarrage Studio, 31 blocs disponibles et absence de dépendance réseau.
2. Édition depuis l’inspecteur et historique des modifications.
3. Navigation, renommage des pages et réécriture des liens internes.
4. Ajout, duplication, suppression et annulation d’une suppression de page.
5. Insertion d’une section complète modifiable.
6. Enregistrement et réinsertion d’un composant indépendant.
7. Thème global et styles avancés d’un bloc.
8. Import / optimisation et insertion d’une image depuis la médiathèque.
9. Copier / coller un bloc via le menu contextuel.
10. Palette de commandes et ajout d’un compte à rebours.
11. Mode focus et ambiance sombre indépendante du site.
12. Création d’un second projet depuis le modèle hackathon et bibliothèque locale.
13. Rechargement et restauration de session IndexedDB.
14. Aperçu interactif multipage et menu mobile.
15. Audit local avant publication.
16. Export HTML autonome et ZIP de site.
17. Réimport d’un projet Studio comme nouveau projet.
18. Migration d’un ancien JSON v1.
19. Interface mobile à 390 px : panneaux accessibles et absence de débordement horizontal.

## Vérifications approfondies — 18 groupes

- **7 points de départ, 14 pages, 42 rendus publics** : chaque page aux largeurs 1 120, 768 et 390 px, sans image de démonstration cassée ni débordement.
- Rejet de schémas invalides, types hérités du prototype, 401 blocs, 26 pages, scripts et URL actives.
- Ajout, rendu et ouverture de l’inspecteur de chacun des **31 types**.
- Persistance de longues données d’images : galerie, couverture, fond, et document local après normalisation / rechargement.
- Interactions publiques : onglets au clavier, FAQ, copie de code, agrandissement d’image, compte à rebours et indication honnête du contact email.
- Nettoyage des SVG : scripts, événements, contenu actif et références externes retirés ; gradients locaux préservés.
- Duplication avec ancres uniques et liens internes réécrits ; limite d’imbrication.
- Changement de page d’accueil, modification des éléments partagés et annulation entre pages.
- Vrais glisser-déposer : bloc imbriqué, section complète, média et déplacement.
- Versions : création de points manuels, restauration, annulation et rétention de huit points maximum.
- Export avec PDF, médias locaux, brouillon exclu, `noindex`, canoniques et sitemap.
- Isolation des projets par chemin de déploiement.
- IndexedDB indisponible : secours localStorage et bibliothèque après rechargement.
- **Régression stockage** : gros projet + IndexedDB indisponible ⇒ alerte visible, jamais de faux succès ; JSON téléchargeable.
- localStorage indisponible : sauvegarde / restauration via IndexedDB seul.
- Tous les stockages indisponibles : travail en mémoire et versions explicitement indisponibles.
- Application autonome ouverte en `file://` avec réseau coupé.
- Respect de la préférence de réduction des animations.

## ZIP réellement extrait et servi — 3 scénarios

- CRC du ZIP, chemins et présence des ressources, dédoublonnage de l’image de test, absence du JSON privé et du brouillon, sitemap / robots / `noindex` vérifiés.
- Site servi sous un sous-chemin : chargement des CSS, du script partagé et des images sans ressource absente ni requête tierce imposée.
- Téléchargement réel du PDF avec son nom personnalisé, navigation mobile entre les pages publiées et formulaire présent.

## Derniers cas limites — 4 scénarios

- Échap depuis le contenu de l’iframe d’aperçu ferme correctement la fenêtre.
- Un lien `page.html#ancre` change de page et défile jusqu’à la cible dans l’aperçu.
- Import local d’un SVG nettoyé, encodage base64 borné et persistance après rechargement.
- JavaScript désactivé sur le site final : les contenus d’onglets sont lisibles, la navigation reste visible et le formulaire ne fait pas de requête HTTP de soumission.

Les 44 scénarios / groupes principaux ci-dessus ont terminé sans erreur JavaScript. Le dossier `tests/` contient en complément un test de fumée portable pour relancer les fonctions essentielles sur votre hébergement ; il n’exige pas les fichiers de test internes utilisés pendant la réalisation.

## Ce qui n’est pas couvert

- Safari, Firefox, appareils physiques, extensions de navigateur et tous les contextes privés / d’entreprise.
- Audit complet WCAG, sécurité formelle ou certification SEO.
- Livraison d’un email : le composant utilise `mailto`, pas un serveur. Aucune promesse d’envoi n’est affichée.
- Disponibilité de médias / liens distants, installation d’un client email ou publication effective dans un compte GitHub.
- Collaboration simultanée, très gros projets arbitraires ou résistance à une fermeture forcée avant sauvegarde.

L’upload et la publication restent entièrement sous votre contrôle.
