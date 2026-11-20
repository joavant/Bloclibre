# Votre premier site avec [bloclibre Studio](https://joavant.github.io/Bloclibre/)

## Les trois fichiers à ne pas confondre

- **L’`index.html` de cette archive** : le constructeur. Ouvrez-le ou mettez-le sur votre dépôt dédié à l’éditeur.
- **Le `.bloclibre.json` téléchargé avec Ctrl / Cmd + S** : votre projet complet et rééditable. Gardez-le en privé, hors du dépôt public.
- **Le ZIP issu d’Exporter le site** : votre site final. Décompressez-le avant d’en publier les fichiers.

Tout est gratuit. Aucun compte bloclibre, abonnement ou service de génération n’est nécessaire.

---

## Parcours 1 — Votre site personnel

### 1. Une base qui vous ressemble

Ouvrez l’icône dossier à gauche, puis **Nouveau site → Portfolio créatif**.

Vous partez avec quatre pages : **Accueil**, **Projets**, **À propos** et **Contact**. Un nom comme « Alex », une ville, les chiffres et les projets de démonstration sont des exemples, pas des informations vérifiées sur vous.

Cliquez sur le nom du projet en haut pour le renommer. Dans **Thème**, choisissez couleurs et typographies.

### 2. Une page d’accueil claire

Cliquez dans le grand titre et répondez simplement à ces questions :

- Qui êtes-vous ?
- Qu’est-ce que vous faites ?
- À qui cela peut-il être utile ?
- Quelle action voulez-vous proposer : voir les projets, vous contacter, télécharger le CV ?

Remplacez le portrait illustré par votre image. Dans l’inspecteur du bloc, **Importer une image** l’intègre au projet ; **Choisir dans la médiathèque** utilise une image déjà importée. Écrivez un texte alternatif utile.

### 3. Des projets concrets

Dans **Pages → Projets**, personnalisez chaque bloc Projet : nom, contexte, description, visuel, année, technologies et lien.

Mieux vaut deux réalisations bien expliquées que dix cartes vides. Pour développer une réalisation, ajoutez une page : besoin initial, votre rôle, captures, résultat, lien vers la démo et code si public. Le sélecteur sous un champ de lien permet de cibler une page du site.

### 4. Votre parcours et votre CV

La page **À propos** accueille votre parcours, vos compétences et vos liens.

Pour ajouter le CV :

1. Ouvrez **Blocs**, cherchez **Fichier / CV** et ajoutez-le.
2. Sélectionnez le bloc, puis **Importer un PDF ou un texte**.
3. Choisissez votre PDF de moins de 8 Mo.
4. Personnalisez le libellé et le nom de téléchargement.

Le document sera inclus dans le projet et dans l’export. Vérifiez qu’il ne contient pas d’informations que vous ne souhaitez pas publier.

### 5. Un contact qui fonctionne vraiment

Dans **Contact**, sélectionnez le formulaire et renseignez **votre adresse de réception**. Remplacez également les liens GitHub / LinkedIn / email de démonstration dans les blocs Réseaux et Pied de page.

Le formulaire **prépare un email** dans la messagerie du visiteur ; il ne délivre pas un message depuis un serveur. Ne remplacez pas l’avertissement par une promesse d’envoi automatique.

---

## Parcours 2 — Votre site de hackathon

### 1. Créez un projet distinct

**Dossier → Nouveau site → Le projet qui se démarque**.

Le portfolio précédent reste dans Mes projets. Le nouveau modèle contient **Le projet**, **L’équipe** et **Démo**.

### 2. Faites comprendre l’idée rapidement

Sur la première page, remplacez les textes du modèle par :

- **Une phrase de pitch** : pour qui, quel problème, quel bénéfice.
- **Le problème réel** : une observation concrète, pas seulement un slogan.
- **Votre réponse** : ce qui fonctionne dans votre prototype.
- **L’action à faire** : tester la démo, voir le code ou parcourir l’équipe.

Les sections **Du problème à la solution**, **Trois bonnes raisons**, **L’essentiel en chiffres** et **La démo en action** se trouvent dans **Sections → Hackathon**. Une section est entièrement composée de blocs modifiables.

### 3. Présentez l’équipe et les preuves

Sur **L’équipe**, remplacez les profils et le parcours du prototype. Évitez les chiffres de démonstration non justifiés.

Sur **Démo** :

- Ajoutez le lien public de votre application et du dépôt si vous souhaitez les publier.
- Pour YouTube / Vimeo, utilisez **Vidéo intégrée** : le lecteur ne sera chargé qu’au clic.
- Pour une URL MP4 / WebM, utilisez **Vidéo**. Le fichier vidéo reste sur l’hébergement de cette URL.
- Si la vidéo n’est pas prête, retirez le bloc vide plutôt que de laisser une promesse qui ne mène nulle part.

Le site bloclibre est une **vitrine statique**. Il ne remplace pas le serveur ou l’hébergement de votre prototype si celui-ci en a besoin.

### 4. Réglez le compte à rebours

Sélectionnez le bloc **Compte à rebours** et choisissez la date / l’heure du pitch ou de la démonstration. Vérifiez le fuseau de votre appareil. La date est ensuite conservée en heure absolue.

Changez aussi le message de fin, ou supprimez ce bloc une fois l’événement terminé.

### 5. Gardez une sauvegarde avant le rush

- **Ctrl / Cmd + S** : téléchargez le JSON.
- Icône **horloge** dans le rail : créez un point de restauration manuel avant une grosse modification.
- Gardez le même projet dans **un seul onglet** : il n’y a pas de fusion en temps réel.
- Une autre personne peut travailler sur une **copie JSON séparée**, mais vous devrez choisir quelle copie réimporter ; ce n’est pas de la collaboration simultanée.

---

## Composer plus vite

- **Un clic sur un bloc** l’ajoute après la sélection, ou à l’intérieur d’une section sélectionnée.
- **Glisser au centre d’une section** insère à l’intérieur ; près du haut ou du bas d’un bloc, cela insère avant ou après.
- **La poignée** au-dessus du canevas déplace le bloc sélectionné.
- **Structure** montre les niveaux d’imbrication ; le fil d’Ariane en bas permet de sélectionner un parent.
- **Plus d’actions**, dans la barre du bloc, donne copier, coller, grouper et enregistrer un composant.
- Les composants enregistrés se retrouvent dans **Sections → Mes blocs**. Chaque insertion est une copie indépendante.
- **Ctrl / Cmd + K** retrouve une action, une page, un bloc ou une section.

### Un style différent sur mobile

Sélectionnez un bloc, puis ouvrez **Responsive & visibilité**.

Les styles généraux restent la base. Activez **Réglages spécifiques mobile** ou **tablette** pour surcharger taille et espacements. Pour des colonnes, choisissez aussi le nombre de colonnes par format.

Les largeurs logiques du canevas sont **1 120 / 768 / 390 px**. Le pourcentage affiché est son zoom d’ajustement, pas une largeur CSS du site. Le rendu final s’adapte à la largeur réelle du visiteur.

Ne masquez pas sur mobile une information indispensable sans proposer un équivalent. Utilisez **Aperçu**, pas seulement le canevas, pour tester menu mobile, liens, onglets et interactions.

---

## Avant de publier : votre checklist

### Contenus

- [ ] Votre vrai nom / nom du projet remplace tous les noms de démonstration.
- [ ] Les projets, chiffres, profils et témoignages sont réels et justifiés.
- [ ] Votre adresse email remplace chaque `bonjour@example.com`.
- [ ] Vos liens GitHub / LinkedIn / démo pointent vers les bonnes pages.
- [ ] Les liens « # » et les vidéos vides sont retirés ou configurés.
- [ ] Vous avez les droits sur les images, polices externes éventuellement ajoutées et documents.

### Pages et référencement

- [ ] Une page d’accueil est définie ; elle sera exportée en `index.html`.
- [ ] Les slugs des autres pages sont lisibles et uniques.
- [ ] Chaque page a un H1 et une description dans **Page**.
- [ ] Les pages non prêtes sont exclues via **Inclure dans le site exporté**.
- [ ] L’URL publique complète est renseignée dans **Thème → Publication & partage**, si vous voulez les canoniques et le sitemap.
- [ ] L’image de partage utilise une URL publique stable, pas une image locale en données.

### Expérience et sauvegarde

- [ ] **Vérifier** ne montre plus d’erreur importante ; les recommandations ont été relues.
- [ ] L’aperçu ordinateur / tablette / mobile est relu, liens compris.
- [ ] Les textes alternatifs et contrastes sont vérifiés humainement.
- [ ] Le CV s’ouvre / se télécharge et ne contient pas de données privées inutiles.
- [ ] Le formulaire explique honnêtement qu’il ouvre une messagerie.
- [ ] Une copie récente du **JSON** est conservée hors du navigateur.

---

## Exporter puis mettre sur GitHub Pages

1. Cliquez **Exporter le site → Site complet .zip**.
2. **Décompressez** le ZIP.
3. Déposez son **contenu** à la racine du dépôt destiné à votre site : `index.html`, autres pages, dossier `assets/`, `.nojekyll`, etc.
4. Dans **Settings → Pages**, publiez la branche et le dossier choisis.
5. Testez l’adresse publiée sur ordinateur et téléphone : menu, pages, images, CV, email et démo.

Ne publiez **pas** le JSON de travail. Le ZIP public l’exclut volontairement. Si vous utilisez déjà un dépôt pour le constructeur, préférez un second dépôt pour le site final.

Pour modifier ensuite : ouvrez le constructeur, retrouvez le projet local ou **importez votre JSON**, effectuez les modifications, puis exportez un nouveau ZIP. Il n’y a pas de publication automatique depuis le studio.

## Si quelque chose ne se sauvegarde pas

**Session non sauvegardée** signifie que le navigateur n’a pas fourni de stockage utilisable. Ne fermez pas l’onglet sans télécharger le JSON.

- Téléchargez le projet avec **Ctrl / Cmd + S**.
- Essayez un navigateur récent, hors navigation privée, ou le constructeur servi depuis son URL statique.
- Vérifiez la place disponible et les réglages de stockage du navigateur.
- Si vous changez d’appareil, importez le JSON : les projets ne sont pas dans un cloud.

Le JSON est votre copie portable. Les versions locales sont un confort supplémentaire, pas votre seule sauvegarde.
