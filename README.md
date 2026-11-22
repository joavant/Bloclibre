# bloclibre Studio

**Votre site. Votre code. Vos règles.**

Un constructeur visuel de sites web statiques, en français, pour créer un portfolio, présenter un projet de hackathon ou lancer une vitrine personnelle — puis récupérer les fichiers prêts à publier.

**Gratuit · Open source MIT · Sans abonnement · Sans backend · Sans bibliothèque externe**

Créé par **[Joavant](https://joavant.github.io/portfolio/)**.

---

## Le principe

Composez vos pages avec des blocs, modifiez leur contenu directement dans l’éditeur et personnalisez leur apparence. Quand le résultat vous convient, exportez votre site en HTML/CSS/JavaScript.

L’édition se fait dans votre navigateur. Aucun compte bloclibre, service cloud ou abonnement n’est nécessaire pour créer et exporter un site.

Inspiré des éditeurs par blocs comme WordPress, bloclibre reste un projet indépendant : il ne s’agit ni d’un thème, ni d’une extension, ni d’un service affilié à WordPress.

## Fonctionnalités

| Fonctionnalité          | Détails                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| **Éditeur visuel**      | 31 types de blocs, édition directe des textes, glisser-déposer, duplication et historique.              |
| **Sites multipages**    | Jusqu’à 25 pages par projet, page d’accueil au choix et navigation automatique.                         |
| **Modèles et sections** | 6 modèles personnalisables, une page blanche et 17 sections prêtes à modifier.                          |
| **Responsive**          | Aperçu ordinateur, tablette et mobile ; réglages de taille, d’espacement, de colonnes et de visibilité. |
| **Personnalisation**    | Couleurs, polices système, fonds, dégradés, bordures, ombres, favicon et CSS personnalisé.              |
| **Médias**              | Images locales, galerie, fichiers PDF/TXT et téléchargement de CV.                                      |
| **Interactions**        | FAQ, onglets, agrandissement d’images, copie de code et compte à rebours.                               |
| **Vidéos**              | Vidéos natives par URL ; lecteurs YouTube/Vimeo chargés uniquement après un clic.                       |
| **Référencement**       | Titres et descriptions par page, métadonnées de partage, canoniques et sitemap lorsque configurés.      |
| **Sauvegarde locale**   | Plusieurs projets, points de restauration et fichier JSON portable.                                     |
| **Export libre**        | Page HTML autonome, fragment avec styles ou ZIP du site complet.                                        |

### Des bases pour différents projets

- **Portfolio créatif** : accueil, projets, parcours et contact.
- **Hackathon** : présentation du projet, équipe et démonstration.
- **Produit / SaaS** : bénéfices, fonctionnalités, offres et contact.
- **Atelier créatif** : une vitrine pour un studio ou un indépendant.
- **Portfolio éditorial** : une présentation visuelle de réalisations.
- **Lancement** : une page pour faire découvrir une nouveauté.
- **Page blanche** : pour partir de zéro.

Chaque modèle crée un nouveau projet. Les textes, noms et chiffres de démonstration sont à remplacer par vos propres contenus.

## Démarrer

1. Téléchargez le dépôt avec **Code → Download ZIP**, puis décompressez-le.
2. Ouvrez **`index.html`** dans un navigateur récent.
3. Choisissez un modèle ou une page blanche.
4. Ajoutez vos blocs, textes, images et liens.
5. Vérifiez les différents formats dans **Aperçu**.
6. Utilisez **Exporter le site → Site complet .zip** pour préparer la publication.

L’application est déjà assemblée : **aucune installation ni compilation n’est nécessaire pour l’utiliser**. Conservez `communaute.html` et `bloclibre.config.js` à côté d’`index.html` pour disposer aussi de la page publique Idées & soutien et de sa configuration.

Vous préférez un serveur local ? Depuis le dossier du projet :

```sh
python3 -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`.

> [!IMPORTANT]
> Les projets sont enregistrés sur votre navigateur, pas dans un cloud. **Ctrl / Cmd + S** télécharge une sauvegarde JSON : gardez-en une copie hors du navigateur.

## Publier sur GitHub Pages

### Héberger le constructeur

1. Placez les fichiers du projet à la racine de votre dépôt, notamment `index.html`, `communaute.html`, `bloclibre.config.js`, `.nojekyll` et `LICENSE`.
2. Ouvrez **Settings → Pages**.
3. Choisissez **Deploy from a branch**, votre branche — par exemple `main` — et **`/ (root)`**.
4. Attendez la publication, puis ouvrez l’adresse indiquée par GitHub.

Un [workflow manuel facultatif](.github/workflows/pages.yml) est également fourni pour publier avec GitHub Actions. Pour cette méthode, choisissez **GitHub Actions** comme source Pages, puis lancez **Publier bloclibre Studio** dans l’onglet Actions. Utilisez une seule méthode de déploiement à la fois.

### Publier un site créé avec bloclibre

1. Dans le studio, exportez **Site complet .zip**.
2. Décompressez cette archive.
3. Déposez son contenu dans le dépôt destiné à votre site, en conservant le dossier `assets/` et les noms de fichiers.
4. Activez GitHub Pages sur ce dépôt et vérifiez le résultat en ligne.

> [!NOTE]
> Le `index.html` de ce dépôt est le **constructeur**. Celui du ZIP exporté est **votre site final**. Utilisez deux dépôts ou deux dossiers distincts pour garder les deux en ligne.

## Sauvegardes et exports

| Format                  | Utilisation                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **`.bloclibre.json`**   | Conserver et réimporter le projet éditable : pages, réglages, médias et composants.                                             |
| **Page `.html`**        | Publier une page autonome, avec ses styles et ses interactions. Ses liens vers les autres pages nécessitent aussi ces fichiers. |
| **Fragment + CSS**      | Intégrer le contenu d’une page dans une page existante.                                                                         |
| **CSS / JavaScript**    | Consulter et copier les styles ou les interactions.                                                                             |
| **Site complet `.zip`** | Publier les pages et leurs ressources organisées en fichiers.                                                                   |

Le ZIP public exclut le JSON de travail et les pages marquées comme brouillons. Il contient notamment les pages publiées, les ressources utilisées, `robots.txt`, `.nojekyll`, une page 404 et la licence des composants. Un sitemap est ajouté si l’URL publique du site est renseignée.

**Le HTML ou le ZIP public ne remplacent pas le JSON pour reprendre l’édition.** Gardez votre projet JSON à part, surtout s’il contient des données personnelles ou des contenus non publiés.

## Nom du site et crédits

Chaque site affiche par défaut **son vrai nom** et la mention **« Créé avec bloclibre »**. Ces deux éléments sont indépendamment désactivables dans **Thème → Nom & signature**.

Le nom du projet se modifie dans l’en-tête ou dans les réglages du thème. Il est repris sur les pages et dans les exports, sans être confondu avec le titre SEO d’une page.

Le studio et la page Idées & soutien créditent **[Joavant](https://joavant.github.io/portfolio/)**. Aucun crédit visible n’est imposé sur les sites créés.

## Idées, retours et contributions

**Les idées de fonctionnalités sont la priorité.** Si quelque chose vous manque, ouvrez une issue dans l’onglet **Issues** de ce dépôt.

Pour une proposition, expliquez :

- ce que vous cherchez à faire ;
- la difficulté rencontrée ;
- ce qui vous aiderait, avec un exemple si possible.

Pour un bug, ajoutez les étapes de reproduction, le résultat attendu et le navigateur utilisé. Évitez de joindre un projet contenant des secrets ou des données personnelles.

Les contributions au code, à la documentation et à l’accessibilité sont également les bienvenues via une pull request.

### La page Idées & soutien

La page `communaute.html` permet de préparer une demande GitHub. Le visiteur doit ensuite **se connecter, relire et publier lui-même son issue** : aucun envoi n’est simulé. Un compte GitHub est nécessaire pour publier une issue, mais pas pour créer un site avec bloclibre.

Le dépôt peut être détecté sur `github.io` ou renseigné manuellement. L’existence du dépôt et l’activation d’Issues restent à vérifier par son propriétaire.

Le soutien financier est facultatif et **désactivé tant qu’aucun véritable lien de don n’est configuré**. Il n’existe aucun paiement intégré au studio : un éventuel don est traité par la plateforme externe choisie.

Les destinations publiques se règlent dans **Configurer mon installation** ou dans `bloclibre.config.js`, sans recompilation. Le portfolio du créateur, l’adresse du constructeur, le dépôt des idées et le lien de don sont des champs distincts.

**Ne placez aucun mot de passe, token ou clé API dans ce fichier public.** Pour tous les détails, consultez le [guide communauté](COMMUNAUTE.md).

## Développement

Le projet utilise du **HTML, du CSS et du JavaScript natifs**. Les fichiers publics sont déjà générés ; les outils suivants ne sont nécessaires que pour modifier les sources ou lancer les tests.

### Reconstruire l’application

Avec Python 3, après modification de `src/` :

```sh
python3 build.py
```

Cette commande reconstruit `index.html` et `communaute.html`. La configuration publique `bloclibre.config.js` est conservée. Modifiez les sources plutôt que les seuls fichiers générés.

### Lancer les tests

Prérequis : **Python 3, Node.js 20+ et npm**.

```sh
npm install
npx playwright install chromium
```

Démarrez le serveur dans un premier terminal :

```sh
npm start
```

Puis lancez les tests dans un second :

```sh
npm test
```

Sous Linux, les dépendances système de Chromium peuvent aussi nécessiter `npx playwright install-deps chromium`.

La suite vérifie l’assemblage et les principaux parcours avec Playwright. Les navigations de test vers les destinations externes sont interceptées : aucune issue ni aucun paiement n’est créé. Les dépendances npm sont uniquement des outils de développement, jamais des bibliothèques chargées par l’application.

## Limites à connaître

- **Site statique** : pas de base de données distante, d’espace membre, de boutique avec paiement ou de publication automatique depuis le studio.
- **Contact par email** : le formulaire prépare un message dans la messagerie du visiteur ; il n’envoie pas d’email depuis un serveur.
- **Sauvegarde locale** : vider les données du navigateur, changer d’appareil ou utiliser la navigation privée peut faire perdre l’accès aux projets locaux. Conservez vos JSON.
- **Ressources distantes** : les images et vidéos ajoutées par URL restent dépendantes de leur hébergement et de leurs droits d’utilisation.
- **Contenu personnalisé** : le HTML libre est filtré. L’audit intégré est une aide, pas une certification de sécurité, de référencement ou d’accessibilité.
- **Navigateurs** : les vérifications automatisées ont été réalisées sous Chromium. Le périmètre détaillé figure dans [VALIDATION.md](VALIDATION.md).

## Documentation

- [Premiers pas : portfolio et hackathon](DEMARRAGE.md)
- [Nom du site, configuration du créateur, idées et soutien](COMMUNAUTE.md)
- [Périmètre de validation et limites des tests](VALIDATION.md)

## Licence

bloclibre est distribué sous **[licence MIT](LICENSE)**.

Vous pouvez utiliser, modifier et redistribuer le code, y compris commercialement, dans le respect de cette licence et en conservant les notices de licence et de copyright. Aucune obligation d’affichage visible n’est ajoutée aux sites exportés.

Vos textes, photos, logos et documents restent soumis à leurs droits et licences propres.

---

**Créé par [Joavant](https://joavant.github.io/portfolio/) — un outil libre, pensé pour laisser la place à vos idées.**
