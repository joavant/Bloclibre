# bloclibre Studio 2

**Votre site, votre code, vos règles.** Un constructeur visuel de sites statiques, en français, pensé pour un portfolio personnel, un hackathon ou le lancement d’un projet.

**Gratuit · Open source MIT · Sans compte · Sans abonnement · Sans backend · Aucune dépendance d’exécution**

Composez des pages avec des blocs, personnalisez le rendu et emportez un vrai site HTML/CSS/JavaScript. L’éditeur est indépendant et non affilié à WordPress.

## Commencer maintenant

Le fichier **`index.html` à la racine contient toute l’application**. Il est déjà assemblé : aucun `npm install`, serveur ou outil de compilation n’est nécessaire pour l’utiliser.

- Ouvrez `index.html` dans un navigateur récent, **ou** hébergez-le sur GitHub Pages.
- Cliquez sur le logo / l’icône dossier pour retrouver **Mes projets**.
- Choisissez un modèle dans **Nouveau site**, puis remplacez ses contenus d’exemple.
- **Ctrl / Cmd + S** télécharge le projet JSON, pour garder une vraie sauvegarde.
- **Exporter le site → Site complet .zip** prépare les fichiers à publier.

Pour un parcours concret, consultez **[DEMARRAGE.md](DEMARRAGE.md)** : portfolio et hackathon, de la première page à la publication.

> **Deux `index.html`, deux usages différents.** Celui fourni ici est le **constructeur**. Celui du ZIP créé par l’export est **votre site final**. Publiez-les dans deux dépôts ou dossiers différents si vous souhaitez conserver les deux en ligne.

## Ce que Studio sait faire

### Composer visuellement

- **31 types de blocs**, édition directe des textes, inspecteur de contenu et de styles.
- Glisser-déposer depuis la bibliothèque, la structure, les sections et la médiathèque.
- Sections imbriquées, colonnes de 1 à 4, groupes de boutons, déplacement à la poignée.
- Copier / couper / coller des blocs, copier / coller des styles, duplication et regroupement.
- **17 sections prêtes à modifier**, plus vos propres composants enregistrés. Les composants insérés sont des **copies indépendantes**, pas des symboles liés.
- Fil d’Ariane et structure pour retrouver les éléments imbriqués.
- Annulation / rétablissement : jusqu’à 80 étapes, avec réduction de l’historique des projets lourds pour limiter la mémoire.

### Construire un vrai site multipage

- Jusqu’à **25 pages par projet** : ajouter, dupliquer, supprimer et réordonner.
- Une page d’accueil `index.html`, les autres pages en `nom-de-page.html`.
- Navigation automatique depuis les pages, sélection d’une page comme cible d’un bouton.
- Réécriture des liens de blocs pris en charge lors d’un changement de slug / d’accueil. Vérifiez quand même les liens saisis dans du HTML libre et les URL absolues.
- Navigation et pied de page synchronisables entre les blocs racine **déjà marqués comme synchronisés**. Une nouvelle page reprend les éléments partagés de la page active. On peut garder une page sans navigation ou sans pied de page.
- Masquage d’une page dans la navigation et exclusion d’une page de l’export public.
- Aperçu interactif : navigation entre pages, formats ordinateur / tablette / mobile.

### Personnaliser

- Thème global : couleurs, polices système, police des titres, largeur, favicon et langue déclarée du site.
- Par bloc : typographie, alignement, espacements, dégradé, fond image, voile, bordure, ombre, opacité et animation d’apparition.
- Surcharges tablette / mobile : taille des textes, espacements, nombre de colonnes, ordre et visibilité.
- Ancres, classes CSS et CSS personnalisé global ou par page. Les styles explicites d’un bloc restent prioritaires sur le thème global.
- Mode focus et ambiance sombre de l’éditeur, indépendants des couleurs du site.
- La langue déclarée change l’attribut `lang` ; elle ne traduit pas les textes ni les libellés des composants, qui sont en français par défaut.

### Médias, interactions et publication

- Médiathèque locale : jusqu’à 150 images ; photos optimisées dans le navigateur.
- Bloc **Fichier / CV** : import local PDF ou TXT, ou URL de téléchargement.
- Galerie avec agrandissement, FAQ native, onglets accessibles au clavier et copie de code.
- Vidéo native par URL MP4 / WebM. YouTube / Vimeo intégrés **uniquement après un clic**, pas de lecteur tiers chargé à l’ouverture.
- Compte à rebours dynamique avec date cible conservée en heure absolue.
- Contact : formulaire qui **prépare un email dans la messagerie du visiteur**. Aucun envoi serveur n’est simulé. Une application de messagerie configurée est nécessaire ; un lien email direct est aussi affiché.
- SEO par page : titre, description, `noindex`, URL canonique, métadonnées Open Graph, image de partage publique.
- Vérification locale avant publication : titres, alternatives d’images, ancres, liens, descriptions, contenus de démonstration et contrastes indicatifs.

### Blocs inclus

**Texte & essentiels** — Titre H1–H6, texte, image, bouton, badge.

**Structure** — Section, colonnes, séparateur, espacement, groupe de boutons, pied de page.

**Portfolio** — Projet, compétences, parcours, réseaux & liens.

**Médias** — Galerie, fichier / CV, vidéo native, vidéo intégrée.

**Autres** — Liste, citation, carte, navigation, HTML libre filtré, code, FAQ, onglets, chiffre clé, compte à rebours, offre / tarif, formulaire email.

## Modèles fournis

| Modèle                    | Pages | Usage                                      |
| ------------------------- | ----: | ------------------------------------------ |
| Portfolio créatif         |     4 | Accueil, projets, à propos, contact        |
| Le projet qui se démarque |     3 | Pitch de hackathon, équipe, démo           |
| Un produit, une promesse  |     3 | Landing, fonctionnalités / offres, contact |
| Atelier créatif           |     1 | Studio, artisan ou indépendant             |
| Portfolio éditorial       |     1 | Présentation visuelle de réalisations      |
| Lancement tout en douceur |     1 | Une nouveauté à faire découvrir            |
| Page blanche              |     1 | Création entièrement libre                 |

**Créer depuis un modèle ajoute un nouveau projet** : le projet précédent n’est pas remplacé. Les noms, chiffres, illustrations et adresses de contact sont des exemples à personnaliser.

## Les formats d’export

| Format                       | À quoi il sert                                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Projet `.bloclibre.json`** | Rééditer le site complet : pages, réglages, médias et composants. Imports v1 et v2 acceptés.                                  |
| **Page `.html`**             | Une page autonome, styles et interactions inclus. Ses liens vers les autres pages nécessitent évidemment ces autres fichiers. |
| **Fragment + CSS**           | Intégrer le contenu d’une page dans une autre page. Le script des interactions est inclus.                                    |
| **CSS / JavaScript**         | Consulter et copier les styles de la page ou le moteur d’interactions partagé.                                                |
| **Site complet `.zip`**      | Publier le site multipage organisé en fichiers.                                                                               |

Le ZIP contient les **pages publiées**, `assets/` (styles par page, script commun, images / PDF / TXT locaux utilisés), `.nojekyll`, `robots.txt`, `404.html`, la licence des composants et un guide de publication. Les médias identiques sont réutilisés. Un `sitemap.xml` est ajouté si l’URL publique a été renseignée dans **Thème → Publication & partage**.

**Le projet JSON privé et les pages en brouillon ne sont pas inclus dans le ZIP public.** Le ZIP et le HTML exporté ne permettent pas de reconstruire automatiquement le projet éditable : gardez le JSON à part. Ne placez jamais des informations secrètes dans une page ou un fichier que vous publiez.

Les images et documents locaux sont intégrés au HTML autonome puis extraits, lorsque possible, dans le ZIP. Les **URL distantes** ne sont pas téléchargées automatiquement : elles restent distantes et dépendent de leur hébergement et de leurs droits d’utilisation. Les vidéos ne sont pas importées dans le projet.

## Mettre le constructeur sur GitHub Pages

Vous gardez la main sur le dépôt et le déploiement. Aucun accès à un compte n’est requis par l’éditeur.

1. Décompressez l’archive du constructeur.
2. Déposez le **contenu du dossier `bloclibre/`** à la racine de votre dépôt : notamment `index.html`, `.nojekyll` et `LICENSE`. Déposer uniquement le ZIP ne suffit pas.
3. Dans **Settings → Pages**, choisissez **Deploy from a branch**.
4. Choisissez votre branche, par exemple **main**, et **`/ (root)`**.
5. Ouvrez l’adresse de publication indiquée par GitHub, par exemple `https://pseudo.github.io/constructeur/`.

Le constructeur et ses exports utilisent des liens relatifs : ils fonctionnent à la racine ou sous un chemin de dépôt. Il n’y a ni CDN, ni clé API, ni serveur applicatif à configurer.

Un workflow **facultatif et manuel** est fourni dans `.github/workflows/pages.yml`. Pour cette autre méthode, choisissez **GitHub Actions** comme source Pages et lancez « Publier bloclibre Studio » dans Actions. Le workflow assemble puis publie uniquement les fichiers publics de l’éditeur, pas les projets du navigateur. Ne combinez pas les deux méthodes pour le même déploiement.

Pour publier **votre site créé**, décompressez plutôt **le ZIP issu du bouton Exporter le site** et déposez son contenu dans le dépôt destiné à votre site.

## Sauvegarde : comprendre ce qui est local

- Les projets sont stockés dans **IndexedDB**, sur ce navigateur et cette origine web. Aucun projet n’est transmis à GitHub ou à un service bloclibre.
- Les dépôts à des chemins différents utilisent des clés distinctes, afin d’éviter les mélanges accidentels.
- Un secours `localStorage` est utilisé pour les petits projets si IndexedDB ne fonctionne pas. Les gros projets ne prétendent **jamais** être sauvegardés si aucun stockage adapté n’a réussi.
- Si le stockage est refusé ou plein, le statut signale **Session non sauvegardée**. Les projets restent manipulables en mémoire pour la session, et l’export JSON reste possible.
- L’icône horloge ouvre les **8 dernières versions locales** : points automatiques au plus toutes les trois minutes après une modification, et points manuels. Ces versions nécessitent IndexedDB et de l’espace disponible. Restaurer est annulable dans l’historique.
- Effacer les données du navigateur, changer de navigateur, d’appareil, d’origine ou de chemin de dépôt ne transfère pas les projets. La navigation privée peut effacer les données à sa fermeture.
- Il ne s’agit **ni d’un cloud, ni d’un coffre chiffré**. Gardez plusieurs copies JSON hors du navigateur. Évitez de modifier le même projet dans plusieurs onglets : il n’y a pas de fusion collaborative.

Les polices système, icônes et illustrations de départ sont incluses sans téléchargement externe. Ajouter une image distante, lire une vidéo tierce ou suivre un lien peut naturellement contacter le service choisi. L’éditeur n’ajoute pas de suivi analytique.

## Raccourcis

| Action                                        | Windows / Linux     | macOS                  |
| --------------------------------------------- | ------------------- | ---------------------- |
| Palette de commandes                          | Ctrl K              | ⌘ K                    |
| Télécharger le projet JSON                    | Ctrl S              | ⌘ S                    |
| Annuler / rétablir                            | Ctrl Z / Ctrl Maj Z | ⌘ Z / ⌘ Maj Z          |
| Exporter                                      | Ctrl Maj E          | ⌘ Maj E                |
| Dupliquer le bloc                             | Ctrl D              | ⌘ D                    |
| Copier / couper / coller le bloc              | Ctrl C / X / V      | ⌘ C / X / V            |
| Copier / coller le style                      | Ctrl Maj C / V      | ⌘ Maj C / V            |
| Blocs / Sections / Pages / Structure / Médias | Alt 1 à 5           | Alt 1 à 5              |
| Rechercher un bloc                            | /                   | /                      |
| Supprimer le bloc                             | Suppr               | Suppr / retour arrière |
| Fermer une fenêtre / quitter le focus         | Échap               | Échap                  |

Les raccourcis de blocs s’appliquent **hors des champs de texte**. Dans un texte, copier / coller reste celui du texte. Le presse-papiers des blocs est interne au studio.

## Limites assumées

- C’est un **constructeur de sites statiques**, pas un WordPress complet : pas d’utilisateurs connectés, base de données distante, commentaires, commerce avec paiement, espace privé, envoi d’email serveur ou publication automatique.
- Le statut « Brouillon », `noindex` et le masquage dans la navigation **ne sont pas des contrôles d’accès**. Un fichier publié est public. Le ZIP exclut effectivement les brouillons, mais une page HTML téléchargée individuellement reste exportable.
- Le HTML libre est filtré : pas de scripts, iframes arbitraires, gestionnaires d’événements ou formulaires personnalisés. Utilisez les blocs dédiés. Le CSS personnalisé ne constitue pas un environnement de code totalement isolé ; n’importez que des projets de confiance.
- L’audit est une aide, pas une certification SEO / accessibilité. Les contrastes hérités de fonds complexes nécessitent une vérification humaine.
- Garde-fous : 400 blocs / 10 niveaux par page, 25 pages, 150 images, 60 composants, imports JSON de 50 Mo maximum. Images de 10 Mo maximum avant traitement, PDF / TXT locaux de 8 Mo maximum. La capacité réelle dépend aussi du navigateur et de la mémoire.
- Les photos PNG/JPEG/WebP/AVIF sont réduites à 1 800 px maximum puis converties en WebP. Les GIF restent animés ; les SVG sont conservés en vectoriel avec retrait du contenu actif et des références externes lors de l’import / de l’extraction. Vérifiez vos visuels après import.
- Un navigateur récent est requis. Les validations ont été réalisées sous **Chromium** ; Safari et Firefox n’ont pas été exécutés dans cette livraison. L’ouverture directe en `file://` fonctionne dans l’environnement testé, mais les politiques de stockage et de presse-papiers varient : l’hébergement statique est préférable pour un usage régulier.
- Sans JavaScript, le contenu public et les liens restent consultables ; les onglets montrent leurs contenus, les FAQ restent natives. Compte à rebours, lecteur tiers, copie et agrandissement nécessitent le script fourni.

## Sources et assemblage

```text
bloclibre/
├── index.html                  Application autonome, déjà assemblée
├── .nojekyll                   Marqueur pour l’hébergement statique
├── README.md                   Fonctionnalités et fonctionnement
├── DEMARRAGE.md                Parcours portfolio / hackathon
├── VALIDATION.md               Périmètre des vérifications de cette livraison
├── LICENSE                     Licence MIT du code et des illustrations originales
├── build.py                    Assembleur Python standard
├── package.json                Outils de test facultatifs, pas de dépendance runtime
├── tests/smoke.cjs              Vérification navigateur reproductible
├── src/
│   ├── index.template.html     Coquille française de l’éditeur
│   ├── app.css / app.js        Base de l’éditeur et opérations de blocs
│   ├── studio-model.js         Schéma v2, types, modèles et sections
│   ├── studio-render.js        HTML, thèmes, responsive et métadonnées
│   ├── studio-data.js          Projets, sauvegardes, versions et ZIP natif
│   ├── studio-ui.js            Panneaux et inspecteurs
│   ├── studio-tools.js         Modèles, exports, commandes et audit
│   ├── studio-actions.js       Actions, événements et initialisation
│   ├── studio.css             Interface Studio
│   └── site-runtime.js / site-studio.css   Interactions et styles publics
└── .github/workflows/pages.yml Déploiement manuel facultatif
```

Après modification des sources :

```sh
python3 build.py
```

L’assembleur injecte les modules Studio dans le noyau dans l’ordre indiqué ci-dessus, intègre les styles / scripts du site comme chaînes sûres, et reconstruit `index.html`. Il échoue si un marqueur attendu manque. Ne modifiez pas seulement `index.html` : ces changements seraient écrasés à la reconstruction.

Serveur local **facultatif** :

```sh
python3 -m http.server 8000 --bind 0.0.0.0
# Ouvrir http://localhost:8000
```

Tests navigateur **facultatifs**, Node 20+ et Python étant installés :

```sh
npm install
npx playwright install chromium
# Sous Linux, si nécessaire : npx playwright install-deps chromium
# Laisser le serveur local ci-dessus ouvert dans un autre terminal.
npm test
```

Le test utilise par défaut `http://127.0.0.1:8000`. L’adresse est configurable avec `BASE_URL`. Les dépendances de `package.json` sont uniquement des outils de développement et ne sont jamais chargées par le constructeur ou les sites exportés.

## Licence

Code de bloclibre, icônes et illustrations vectorielles originales : **MIT**, voir `LICENSE`. Vous pouvez utiliser, modifier et héberger l’outil, y compris commercialement, en conservant la notice de licence du logiciel lors de sa redistribution. Les exports conservent une notice technique, sans filigrane ni lien visible obligatoire.

Vos textes, photos, logos et documents vous appartiennent ou restent soumis à leurs licences propres. La licence du constructeur ne vous donne pas de droits sur des médias tiers que vous ajoutez.
