# bloclibre.

**Vos idées, votre site.** Un éditeur visuel de pages HTML par blocs, en français, inspiré du fonctionnement des éditeurs de type Gutenberg. Application indépendante, non affiliée à WordPress.

**Gratuit · Open source (MIT) · Sans compte · Sans serveur · Zéro dépendance**

## Mettre l’éditeur sur GitHub Pages

Le fichier **`index.html` à la racine est l’application complète** : le CSS, le JavaScript et les illustrations de démonstration sont intégrés. Il fonctionne aussi sans compilation.

1. Créez un dépôt GitHub **public** si vous utilisez l’offre gratuite de GitHub Pages.
2. Déposez les fichiers de ce dossier **à la racine du dépôt**, en particulier `index.html`, `.nojekyll` et `LICENSE`. Ne déposez pas seulement le fichier ZIP.
3. Dans **Settings → Pages → Build and deployment**, choisissez **Deploy from a branch**.
4. Choisissez votre branche (souvent `main`) et le dossier **`/ (root)`**, puis **Save**.
5. Votre éditeur sera accessible à l’adresse indiquée par GitHub Pages : `https://VOTRE-PSEUDO.github.io/NOM-DU-DEPOT/`.

Le site fonctionne sous un sous-chemin de dépôt comme à la racine d’un domaine. Aucun chemin absolu d’asset, CDN, clé API ou backend n’est nécessaire. Vous n’avez **pas besoin d’activer GitHub Actions** pour cette méthode.

Un workflow optionnel se trouve dans `.github/workflows/pages.yml` : pour l’utiliser, choisissez **GitHub Actions** comme source dans Settings → Pages, puis lancez manuellement le workflow « Publier bloclibre » depuis l’onglet Actions. N’utilisez qu’une des deux méthodes.

> L’hébergement de l’éditeur et l’hébergement de la page que vous créez sont deux choses distinctes. Le bouton « Exporter le HTML » télécharge un nouvel `index.html` : c’est **votre page finale**, pas l’éditeur. Publiez cette page dans un autre dépôt/dossier si vous souhaitez conserver l’éditeur en ligne.

## Utilisation

- **Ajouter** : cliquez sur un bloc dans la bibliothèque, ou glissez-le dans le canevas. Un clic insère le bloc après la sélection ; si une section est sélectionnée, il est ajouté à l’intérieur.
- **Écrire** : cliquez directement dans les textes du canevas ou modifiez le contenu dans l’inspecteur à droite.
- **Organiser** : l’onglet **Structure** montre l’arborescence. Glissez les lignes pour réordonner les blocs, ou utilisez la poignée et les flèches au-dessus de la page. Vous pouvez également déplacer un bloc depuis Structure vers le canevas.
- **Imbriquer** : glissez un bloc au centre d’une section pour l’insérer dedans. En haut ou en bas d’un bloc, il sera placé avant/après ce bloc.
- **Personnaliser** : l’onglet **Bloc** règle contenu, typo, couleurs, liens, arrondis, espacement et ancre. L’onglet **Page** règle titre, description, palette, police et largeur globale.
- **Images** : importez vos fichiers ou indiquez une URL. Les fichiers importés sont intégrés en données dans le projet et le HTML. Les photos sont redimensionnées à 1 800 px maximum et converties en WebP pour rester légères. Les SVG/GIF sont conservés tels quels. Taille maximale : 10 Mo avant traitement.
- **Responsive** : testez les formats ordinateur, tablette et mobile, dans l’éditeur ou l’aperçu sans outils. Les colonnes s’empilent sur petit écran.
- **Modèles** : trois pages personnalisables sont incluses : Atelier créatif, Portfolio indépendant et Lancement tout en douceur. Vous pouvez aussi commencer avec une page blanche.
- **Exporter** : ouvrez **Exporter le HTML** pour lire ou copier le document complet, récupérer un fragment avec CSS, ou télécharger la page finale autonome.
- **Reprendre plus tard** : le projet est sauvegardé automatiquement sur ce navigateur. Téléchargez également le **projet JSON** depuis le menu à côté du nom du projet ou depuis l’onglet Page. Ce fichier peut être réimporté ailleurs.

### Blocs inclus

Titre H1–H6, texte, image avec légende et alternative, bouton/lien, section imbriquable, colonnes (1 à 4), séparateur, espacement, liste, citation, carte, navigation et HTML libre sécurisé.

### Raccourcis

| Action | Raccourci |
| --- | --- |
| Annuler | Ctrl/Cmd + Z |
| Rétablir | Ctrl/Cmd + Maj + Z (ou Ctrl/Cmd + Y) |
| Télécharger le projet JSON | Ctrl/Cmd + S |
| Ouvrir l’export HTML | Ctrl/Cmd + Maj + E |
| Dupliquer le bloc sélectionné | Ctrl/Cmd + D, hors saisie |
| Supprimer le bloc sélectionné | Suppr / Retour arrière, hors saisie |
| Rechercher un bloc | `/`, hors saisie |
| Fermer une fenêtre | Échap |

L’historique contient jusqu’à 80 états et reste en mémoire pendant la session. Un rechargement conserve le projet, **pas l’historique**.

## Confidentialité, sécurité et limites

- Le code de l’application ne fait **aucun appel réseau**, ne contient aucun traceur et ne charge aucune police ni bibliothèque externe. GitHub Pages peut naturellement conserver ses propres journaux d’hébergement.
- Si vous renseignez une **URL d’image distante**, le navigateur doit contacter ce serveur pour afficher cette image. Importez un fichier pour garder une page sans ressource distante.
- Les projets ne sont **pas envoyés à GitHub**. La sauvegarde utilise `localStorage`, propre à l’origine du site et au navigateur, avec une clé distincte par chemin de déploiement (pour ne pas mélanger plusieurs dépôts GitHub Pages). Elle n’est ni chiffrée, ni partagée, ni une sauvegarde cloud. Une seule page est conservée par instance de l’éditeur ; utilisez des exports JSON pour vos différents projets.
- Le stockage local a un quota variable. Si une image remplit le quota, un avertissement invite à télécharger le JSON. Le mode privé ou certains réglages du navigateur peuvent empêcher la sauvegarde.
- Le HTML importé dans un bloc est **nettoyé** : pas de script, formulaire, iframe, contenu SVG inline, gestionnaire d’événement ou CSS distant. Les canevas sont des iframes sans autorisation d’exécuter des scripts. Le code personnalisé n’est pas un environnement de développement JavaScript.
- Les liens dangereux sont écartés. Les liens HTML personnalisés ouverts dans un nouvel onglet reçoivent `rel="noopener noreferrer"`.
- Les imports de projets sont validés : version 1, types connus, 400 blocs et 10 niveaux d’imbrication maximum. La taille du fichier JSON est limitée à 20 Mo.
- Il s’agit d’un **éditeur monopage**, pas d’un CMS complet : pas de base de données, connexion utilisateur, collaboration, traitement de formulaire, boutique ni publication automatique. Les liens de contact peuvent utiliser `mailto:`. Rien n’empêche de publier plusieurs pages HTML séparément.
- L’export HTML est destiné à la publication. Pour rééditer la structure des blocs, conservez le **JSON** ; importer un fichier HTML complet n’est pas pris en charge.
- Les navigateurs récents sont ciblés : Chrome, Firefox, Edge et Safari. Le glisser-déposer natif s’utilise à la souris ; sur mobile, utilisez l’ajout par clic et les commandes de déplacement.

## Sources et développement

```text
index.html                  Application autonome, prête à publier
src/index.template.html     Structure accessible de l’interface
src/app.css                 Styles de l’éditeur
src/app.js                  Modèle, rendu, interactions et export
build.py                    Assemblage du fichier autonome
.nojekyll                   Désactive le traitement Jekyll
.github/workflows/pages.yml Déploiement GitHub Actions optionnel, manuel
LICENSE                     Licence MIT
```

Lancer l’application sans installer de dépendance :

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Puis ouvrir `http://localhost:8000` dans votre navigateur. Vous pouvez également ouvrir directement `index.html` ; le comportement de la sauvegarde sous `file://` dépend du navigateur.

Après modification des sources :

```sh
python3 build.py
```

Le fichier généré est lisible et non minifié. Aucun gestionnaire de paquets n’est requis. Le HTML exporté réutilise le même moteur de rendu et les mêmes règles CSS que le canevas, sans les attributs d’édition.

## Licence

MIT : vous pouvez utiliser, modifier, redistribuer et héberger l’éditeur, y compris commercialement, en conservant la notice de licence dans les copies du logiciel. Les icônes et illustrations vectorielles intégrées ont été créées pour ce projet et sont incluses sous la même licence.

Aucune attribution ni lien vers bloclibre n’est ajouté de force aux pages que vous exportez. Remplacez librement tous les textes, liens et visuels de démonstration. L’utilisation d’images ou de contenus que vous importez reste sous votre responsabilité.
