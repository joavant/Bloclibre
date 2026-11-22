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

1. Cliquer sur le [lien]().
2. Choisissez un modèle ou une page blanche.
3. Ajoutez vos blocs, textes, images et liens.
4. Vérifiez les différents formats dans **Aperçu**.
5. Utilisez **Exporter le site → Site complet .zip** pour préparer la publication.

> [!IMPORTANT]
> Les projets sont enregistrés sur votre navigateur, pas dans un cloud. **Ctrl / Cmd + S** télécharge une sauvegarde JSON : gardez-en une copie hors du navigateur.

### Publier un site créé avec bloclibre

1. Dans le studio, exportez **Site complet .zip**.
2. Décompressez cette archive.
3. Déposez son contenu dans le dépôt destiné à votre site, en conservant le dossier `assets/` et les noms de fichiers.
4. Activez GitHub Pages ou autre hebergeur et vérifiez le résultat en ligne.

> [!NOTE]
> Le `index.html` de ce dépôt est le **constructeur**. Celui du ZIP exporté est **votre site final**.

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

Le soutien financier est facultatif. Il n’existe aucun paiement intégré au studio : un éventuel don est traité par la plateforme externe choisie.

Les destinations publiques se règlent dans **Configurer mon installation** ou dans `bloclibre.config.js`, sans recompilation. Le portfolio du créateur, l’adresse du constructeur, le dépôt des idées et le lien de don sont des champs distincts.

**Ne placez aucun mot de passe, token ou clé API dans ce fichier public.**.

## Développement

Le projet utilise du **HTML, du CSS et du JavaScript natifs**. Les fichiers publics sont déjà générés ; les outils suivants ne sont nécessaires que pour modifier les sources ou lancer les tests.


## Limites à connaître

- **Site statique** : pas de base de données distante, d’espace membre, de boutique avec paiement ou de publication automatique depuis le studio.
- **Contact par email** : le formulaire prépare un message dans la messagerie du visiteur ; il n’envoie pas d’email depuis un serveur.
- **Sauvegarde locale** : vider les données du navigateur, changer d’appareil ou utiliser la navigation privée peut faire perdre l’accès aux projets locaux. Conservez vos JSON.
- **Ressources distantes** : les images et vidéos ajoutées par URL restent dépendantes de leur hébergement et de leurs droits d’utilisation.
- **Contenu personnalisé** : le HTML libre est filtré. L’audit intégré est une aide, pas une certification de sécurité, de référencement ou d’accessibilité.
- **Navigateurs** : les vérifications automatisées ont été réalisées sous Chromium.


## Licence

bloclibre est distribué sous **[licence MIT](LICENSE)**.

Vous pouvez utiliser, modifier et redistribuer le code, y compris commercialement, dans le respect de cette licence et en conservant les notices de licence et de copyright. Aucune obligation d’affichage visible n’est ajoutée aux sites exportés.

Vos textes, photos, logos et documents restent soumis à leurs droits et licences propres.

---

**Créé par [Joavant](https://joavant.github.io/portfolio/) — un outil libre, pensé pour laisser la place à vos idées.**
