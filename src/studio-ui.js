/* Interface du studio : bibliothèque, pages, médiathèque et inspecteur. */
const STUDIO_NAV = [
  ["blocks", "plus", "Blocs", "Les briques de votre site"],
  ["sections", "grid", "Sections", "Des compositions prêtes à créer"],
  ["pages", "pages", "Pages", "Toutes les pages de votre site"],
  ["structure", "layers", "Structure", "La vue d’ensemble"],
  ["assets", "image", "Médias", "Vos images, à portée de main"],
];
const coreRenderLibrary = renderLibrary;
renderLibrary = function () {
  const target = $("#library-content");
  if (!target) return;
  $$(".studio-rail [data-studio-panel]").forEach((button) => {
    const active = button.dataset.studioPanel === sidebarTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const title = $("#studio-panel-title");
  if (title)
    title.textContent =
      STUDIO_NAV.find((n) => n[0] === sidebarTab)?.[2] || "Créer";
  const badge = $("#studio-panel-count");
  if (badge)
    badge.textContent =
      sidebarTab === "blocks"
        ? Object.keys(TYPES).length
        : sidebarTab === "sections"
          ? SECTION_RECIPES.length
          : sidebarTab === "pages"
            ? doc.pages.length
            : sidebarTab === "assets"
              ? doc.assets.length
              : flatten().length;
  if (sidebarTab === "structure") {
    coreRenderLibrary();
    return;
  }
  if (sidebarTab === "pages") {
    renderPagesLibrary(target);
    return;
  }
  if (sidebarTab === "assets") {
    renderAssetLibrary(target);
    return;
  }
  if (sidebarTab === "sections") {
    renderSectionsLibrary(target);
    return;
  }
  const normalized = (s) =>
    String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const matches = Object.entries(TYPES).filter(
    ([type, t]) =>
      (filter === "all" ||
        filter === t.group ||
        (filter === "text" &&
          ["heading", "paragraph", "list", "quote", "code"].includes(type))) &&
      normalized(`${t.label} ${t.desc}`).includes(normalized(search)),
  );
  target.innerHTML = `<div class="library-eyebrow">LA SEULE LIMITE, VOTRE IMAGINATION</div><h2 class="block-library-title">Chaque idée a son bloc.</h2><p class="library-subtitle">Glissez, composez, faites-vous plaisir.</p><div class="search-field">${icon("search")}<input id="block-search" value="${esc(search)}" placeholder="Trouver un bloc…" aria-label="Rechercher un bloc"><span class="search-key">/</span></div><div class="filter-row">${[
    ["all", "Tous"],
    ["text", "Texte"],
    ["layout", "Structure"],
    ["portfolio", "Portfolio"],
    ["media", "Médias"],
    ["more", "Plus"],
  ]
    .map(
      ([v, label]) =>
        `<button class="filter-chip${filter === v ? " active" : ""}" data-filter="${v}" aria-pressed="${filter === v}">${label}</button>`,
    )
    .join("")}</div>${
    GROUPS.map((g) => {
      const list = matches.filter(([, t]) => t.group === g.id);
      return list.length
        ? `<section class="block-group"><h3>${g.label}<span></span></h3><div class="block-grid">${list.map(([type, t]) => `<button class="block-card" data-add-type="${type}" draggable="true" title="${esc(t.desc)}" aria-label="Ajouter : ${esc(t.label)}">${icon(t.icon)}<span>${t.label}</span><span class="card-add">+</span></button>`).join("")}</div></section>`
        : "";
    }).join("") ||
    '<div class="no-results">Aucun bloc ne correspond.<br>Essayez un autre mot.</div>'
  }`;
};
function renderPagesLibrary(target) {
  target.innerHTML = `<div class="library-eyebrow">UNE PAGE NE SUFFIT PAS TOUJOURS</div><h2 class="block-library-title">Votre site prend forme.</h2><p class="library-subtitle">${doc.pages.length} page${doc.pages.length > 1 ? "s" : ""} · navigation automatique disponible</p><button class="button button-primary button-full studio-add-page" data-studio-create-page>${icon("plus")}Ajouter une page</button><div class="studio-pages-list">${doc.pages.map((p, i) => `<article class="studio-page-row${p.id === doc.activePageId ? " active" : ""}" data-page-row="${p.id}" draggable="true"><button class="studio-page-main" data-switch-page="${p.id}"><span class="studio-page-icon">${icon(p.id === doc.homePageId ? "globe" : "pages")}</span><span><strong>${esc(p.title)}</strong><small>${esc(pageFilename(p))}${!p.published ? " · brouillon" : ""}</small></span>${p.id === doc.homePageId ? '<span class="home-label">Accueil</span>' : ""}</button><div class="studio-page-actions"><button class="icon-button" data-page-order="${p.id}" data-delta="-1" title="Monter" aria-label="Monter la page" ${i === 0 ? "disabled" : ""}>${icon("arrowUp")}</button><button class="icon-button" data-page-order="${p.id}" data-delta="1" title="Descendre" aria-label="Descendre la page" ${i === doc.pages.length - 1 ? "disabled" : ""}>${icon("arrowDown")}</button><button class="icon-button" data-page-duplicate="${p.id}" title="Dupliquer" aria-label="Dupliquer la page">${icon("copy")}</button><button class="icon-button" data-page-delete="${p.id}" title="Supprimer" aria-label="Supprimer la page">${icon("trash")}</button></div></article>`).join("")}</div><div class="studio-tip">${icon("link")}Les blocs Navigation en mode automatique suivent vos pages. Renommez, réordonnez : les liens restent à jour.</div><button class="button button-light button-full button-small" data-open-audit>${icon("checkCircle")}Vérifier avant de publier</button>`;
}
function sectionMini(kind) {
  return `<div class="section-mini section-mini-${kind}" aria-hidden="true"><i class="mini-head"></i><i class="mini-sub"></i><div class="mini-composition"><b></b><b></b><b></b></div><i class="mini-cta"></i></div>`;
}
function renderSectionsLibrary(target) {
  const list = SECTION_RECIPES.filter(
    (r) => sectionCategory === "all" || r.category === sectionCategory,
  );
  target.innerHTML = `<div class="library-eyebrow">LE RACCOURCI VERS UN BEAU RÉSULTAT</div><h2 class="block-library-title">Un peu d’avance, beaucoup de vous.</h2><p class="library-subtitle">Des sections complètes, 100 % modifiables.<br>Un clic, et vous avez une longueur d’avance.</p><div class="filter-row">${[
    ["all", "Tout"],
    ["hero", "Hero"],
    ["portfolio", "Portfolio"],
    ["hackathon", "Hackathon"],
    ["content", "Essentiels"],
    ["saved", "Mes blocs"],
  ]
    .map(
      ([v, l]) =>
        `<button class="filter-chip${sectionCategory === v ? " active" : ""}" data-section-category="${v}">${l}${v === "saved" ? ` · ${doc.components.length}` : ""}</button>`,
    )
    .join(
      "",
    )}</div>${sectionCategory === "saved" ? `<div class="saved-component-list">${doc.components.length ? doc.components.map((c) => `<div class="saved-component"><span>${icon(TYPES[c.block.type].icon)}</span><button data-insert-component="${c.id}" draggable="true" data-component-drag="${c.id}"><strong>${esc(c.name)}</strong><small>${allBlocks([c.block]).length} blocs · copie indépendante</small></button><button class="icon-button" data-delete-component="${c.id}" aria-label="Supprimer le composant">${icon("trash")}</button></div>`).join("") : `<div class="studio-empty">${icon("save")}Vos compositions préférées,<br>toujours à portée de main.<p>Sélectionnez un bloc puis utilisez « Enregistrer comme composant » dans sa barre d’outils.</p></div>`}</div>` : `<div class="section-recipe-grid">${list.map((r) => `<button class="section-recipe" data-insert-recipe="${r.id}" draggable="true" data-recipe-drag="${r.id}" title="${esc(r.desc)}">${sectionMini(r.kind)}<span><strong>${r.label}</strong><small>${r.desc}</small></span><i>${icon("plus")}</i></button>`).join("")}</div>`}`;
}
function renderAssetLibrary(target) {
  target.innerHTML = `<div class="library-eyebrow">DES IMAGES, PAS DES DÉPENDANCES</div><h2 class="block-library-title">Votre univers visuel.</h2><p class="library-subtitle">Importez vos fichiers. Ils restent ici<br>et sont inclus dans votre site exporté.</p><label class="studio-asset-upload">${icon("upload")}<strong>Glissez vos images ici</strong><span>ou cliquez pour les choisir · 10 Mo / image</span><input type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif" data-upload-assets aria-label="Importer des images"></label><div class="studio-assets-grid">${doc.assets.map((a) => `<article class="studio-asset-card"><button data-use-asset="${a.id}" draggable="true" data-asset-drag="${a.id}" title="Ajouter ${esc(a.name)}"><img src="${esc(a.src)}" alt="${esc(a.alt)}" loading="lazy"><span>${esc(a.name)}</span></button><button class="asset-remove" data-delete-asset="${a.id}" aria-label="Retirer ${esc(a.name)} de la médiathèque">×</button></article>`).join("") || `<div class="studio-empty studio-empty-wide">${icon("image")}Vos images vont se plaire ici.<p>PNG, JPEG, WebP, GIF, SVG et AVIF.<br>Les photos sont optimisées dans votre navigateur.</p></div>`}</div><div class="studio-tip">${icon("shield")}Les images locales ne quittent pas votre appareil avant que vous ne décidiez de publier le site.</div>`;
}
const coreUpdateMeta = updateMeta;
updateMeta = function () {
  coreUpdateMeta();
  const p = activePage();
  if (!p) return;
  $("#canvas-title").textContent = p.title;
  const pageButton = $("#studio-current-page");
  if (pageButton) {
    pageButton.innerHTML = `${icon(p.id === doc.homePageId ? "globe" : "pages")}<span>${esc(p.title)}</span>${icon("chevronDown")}`;
  }
  const count = $("#studio-page-total");
  if (count)
    count.textContent = `${doc.pages.length} page${doc.pages.length > 1 ? "s" : ""}`;
  const file = $("#studio-file-label");
  if (file) file.textContent = pageFilename(p);
  updateBreadcrumbs();
};
function updateBreadcrumbs() {
  const root = $("#studio-breadcrumbs");
  if (!root) return;
  const trail = [];
  let f = findBlock(selectedId);
  while (f) {
    trail.unshift(f.block);
    f = f.parentId ? findBlock(f.parentId) : null;
  }
  root.innerHTML = `<button data-breadcrumb-page>${esc(activePage()?.title || "Page")}</button>${trail
    .slice(-4)
    .map(
      (b) =>
        `<span>›</span><button data-breadcrumb-id="${b.id}">${esc(b.props.name || TYPES[b.type].label)}</button>`,
    )
    .join("")}`;
}
const coreRenderToolbar = renderSelectionToolbar;
renderSelectionToolbar = function () {
  coreRenderToolbar();
  const el = $("#selection-toolbar"),
    f = findBlock(selectedId);
  if (!f) {
    updateBreadcrumbs();
    return;
  }
  el.insertAdjacentHTML(
    "beforeend",
    `<span class="toolbar-rule studio-toolbar-extra"></span><button class="icon-button studio-toolbar-extra" data-studio-action="parent" title="Sélectionner le parent" aria-label="Sélectionner le bloc parent" ${!f.parentId ? "disabled" : ""}>${icon("parent")}</button><button class="icon-button studio-toolbar-extra" data-studio-action="component" title="Enregistrer comme composant" aria-label="Enregistrer comme composant">${icon("save")}</button><button class="icon-button" data-studio-action="more" title="Plus d’actions" aria-label="Plus d’actions">${icon("sliders")}</button>`,
  );
  updateBreadcrumbs();
};
const coreRenderInspector = renderInspector;
renderInspector = function () {
  syncInspectorTabs();
  if (inspectorTab === "theme") {
    renderThemeInspector($("#inspector-content"));
    return;
  }
  coreRenderInspector();
  if (inspectorTab === "page") return;
  const f = findBlock(selectedId);
  if (!f) return;
  const b = f.block,
    p = b.props,
    el = $("#inspector-content");
  if (STUDIO_TYPES[b.type]) {
    const heading = $(".selected-block-heading", el);
    heading.insertAdjacentHTML(
      "afterend",
      section(
        "Contenu & options",
        studioTypeFields(b) +
          (b.type !== "buttons" ? field("Alignement", alignControl(p)) : ""),
      ),
    );
  }
  if (b.type === "navigation") {
    const first = $(".inspector-section", el);
    first?.insertAdjacentHTML(
      "beforeend",
      checkProp(
        "autoPages",
        p.autoPages,
        "Créer les liens depuis les pages du site",
      ) +
        checkProp("syncSite", p.syncSite, "Synchroniser sur toutes les pages") +
        checkProp("sticky", p.sticky, "Garder la navigation en haut"),
    );
  }
  if (b.type === "image") {
    const first = $(".inspector-section", el);
    first?.insertAdjacentHTML(
      "beforeend",
      `<button class="button button-ghost button-small button-full" data-pick-media="src">${icon("image")}Choisir dans la médiathèque</button>${checkProp("decorative", p.decorative, "Image décorative (alternative vide à l’export)")}`,
    );
  }
  if (b.type === "button" || b.type === "project" || b.type === "pricing") {
    const input = $('[data-prop="href"]', el);
    input?.insertAdjacentHTML(
      "afterend",
      `<select class="control studio-internal-link" data-choose-page-link aria-label="Choisir un lien interne"><option value="">Lier à une page du site…</option>${doc.pages.map((p) => `<option value="${esc(pageFilename(p))}">${esc(p.title)} · ${esc(pageFilename(p))}</option>`).join("")}</select>`,
    );
  }
  const advanced = $("details.inspector-section", el);
  advanced?.insertAdjacentHTML(
    "beforeend",
    field(
      "Classe(s) CSS",
      propInput(
        "customClass",
        p.customClass,
        "text",
        'placeholder="ex. ma-section"',
      ),
      "Pour cibler ce bloc depuis le CSS global ou celui de la page.",
    ) + field("Marge au-dessus", numeric("marginTop", p.marginTop, 0, 600)),
  );
  if (["project", "gallery", "video", "embed", "pricing"].includes(b.type))
    $(".inspector-section", el)?.insertAdjacentHTML(
      "beforeend",
      field("Coins arrondis", range("radius", p.radius, 0, 60)),
    );
  const extra = document.createElement("div");
  extra.innerHTML = studioDesignFields(b);
  if (advanced) advanced.before(...extra.childNodes);
  else el.append(...extra.childNodes);
};
function checkProp(key, checked, label) {
  return `<label class="checkbox-field"><input type="checkbox" data-prop="${key}"${checked ? " checked" : ""}>${label}</label>`;
}
function studioTypeFields(b) {
  const p = b.props,
    area = (k, label, help = "", rows = 4) =>
      field(label, propArea(k, p[k], `rows="${rows}"`), help),
    input = (k, label, placeholder = "") =>
      field(
        label,
        propInput(k, p[k], "text", `placeholder="${esc(placeholder)}"`),
      );
  switch (b.type) {
    case "badge":
      return (
        input("text", "Votre message") +
        field(
          "Style",
          propSelect("variant", p.variant, [
            ["soft", "Doux"],
            ["outline", "Contour"],
          ]),
        ) +
        field("Taille", numeric("fontSize", p.fontSize, 8, 24))
      );
    case "buttons":
      return (
        field("Alignement", alignControl(p)) +
        field("Espace entre les boutons", range("gap", p.gap, 0, 60)) +
        `<button class="button button-ghost button-full button-small" data-add-inside-button>${icon("plus")}Ajouter un bouton</button>`
      );
    case "project":
      return (
        input("title", "Nom du projet") +
        input("category", "Catégorie") +
        area("text", "Description") +
        input("href", "Lien du projet", "# ou https://…") +
        input("tags", "Technologies / tags", "Séparés par des virgules") +
        input("year", "Année") +
        input("src", "URL de l’image", "https://…") +
        `<button class="button button-ghost button-full button-small" data-pick-media="src">${icon("image")}Choisir un visuel</button>` +
        input("alt", "Alternative du visuel")
      );
    case "skills":
      return (
        area(
          "text",
          "Vos compétences",
          "Une ligne : Compétence|Pourcentage",
          6,
        ) +
        field(
          "Présentation",
          propSelect("variant", p.variant, [
            ["tags", "Étiquettes"],
            ["bars", "Barres de progression"],
          ]),
        )
      );
    case "timeline":
      return area(
        "text",
        "Les étapes de votre parcours",
        "Une ligne : Date|Titre|Description",
        8,
      );
    case "social":
      return (
        area("text", "Vos liens", "Une ligne : Nom|https://…", 6) +
        field(
          "Présentation",
          propSelect("variant", p.variant, [
            ["outline", "Boutons contour"],
            ["minimal", "Liens simples"],
          ]),
        ) +
        checkProp(
          "newTab",
          p.newTab,
          "Ouvrir les liens externes dans un nouvel onglet",
        )
      );
    case "gallery":
      return (
        `<button class="button button-ghost button-full" data-pick-media="gallery">${icon("image")}Ajouter une image</button>` +
        area(
          "images",
          "Images (URL ou données)",
          "Une ligne : URL|Texte alternatif|Légende. Utilisez la médiathèque pour les fichiers importés.",
          5,
        ) +
        field(
          "Colonnes",
          propInput("columns", p.columns, "number", 'min="1" max="4"'),
        ) +
        field("Hauteur des images", numeric("height", p.height, 80, 700)) +
        field("Espace", range("gap", p.gap, 0, 60)) +
        checkProp("lightbox", p.lightbox, "Agrandir les images au clic")
      );
    case "file":
      return (
        input("text", "Libellé du lien") +
        field(
          "URL du document",
          propInput(
            "src",
            p.src.startsWith("data:") ? "" : p.src,
            "text",
            'placeholder="https://…/mon-cv.pdf"',
          ),
        ) +
        `<label class="studio-document-upload">${icon("upload")}Importer un PDF ou un texte<input type="file" data-block-file-upload accept="application/pdf,text/plain,.pdf,.txt" hidden></label>${p.src.startsWith("data:") ? '<p class="inspector-help">Fichier intégré au projet. Il sera inclus dans le ZIP.</p>' : ""}` +
        input("filename", "Nom au téléchargement") +
        input("meta", "Précision (facultative)") +
        '<p class="inspector-help">PDF et TXT locaux de moins de 8 Mo. Aucun hébergement tiers nécessaire.</p>'
      );
    case "video":
      return (
        input("src", "URL de la vidéo", "https://…/demo.mp4") +
        input("poster", "Image de couverture", "https://…") +
        `<button class="button button-ghost button-full button-small" data-pick-media="poster">${icon("image")}Choisir la couverture</button>` +
        input("caption", "Légende") +
        checkProp("autoplay", p.autoplay, "Lecture automatique, sans son") +
        checkProp("loop", p.loop, "Lire en boucle") +
        '<p class="inspector-help">Vidéo native MP4 / WebM. Le fichier n’est pas hébergé par bloclibre. La lecture automatique dépend du navigateur.</p>'
      );
    case "embed":
      return (
        input(
          "href",
          "Lien YouTube ou Vimeo",
          "https://youtube.com/watch?v=…",
        ) +
        input("title", "Titre accessible de la vidéo") +
        '<p class="inspector-help">Aucun lecteur tiers n’est chargé avant le clic du visiteur. L’URL est limitée à YouTube et Vimeo.</p>'
      );
    case "code":
      return (
        input("filename", "Nom du fichier") +
        input("language", "Langage") +
        field(
          "Votre code",
          `<textarea class="control code-control" data-prop="text" spellcheck="false" aria-label="Extrait de code">${esc(p.text)}</textarea>`,
        ) +
        checkProp("copy", p.copy, "Afficher le bouton de copie")
      );
    case "faq":
      return (
        area(
          "text",
          "Questions / réponses",
          "Une ligne : Question|Réponse",
          9,
        ) +
        checkProp(
          "firstOpen",
          p.firstOpen,
          "Ouvrir la première réponse par défaut",
        )
      );
    case "tabs":
      return area(
        "text",
        "Contenu des onglets",
        "Une ligne : Titre de l’onglet|Contenu",
        8,
      );
    case "stat":
      return (
        input("value", "Chiffre ou valeur") +
        input("suffix", "Suffixe", "%, h, +…") +
        input("text", "Légende") +
        field("Taille", numeric("fontSize", p.fontSize, 20, 150))
      );
    case "countdown": {
      const date = new Date(p.target),
        local = Number.isFinite(date.getTime())
          ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 16)
          : "";
      return (
        field(
          "Date & heure cibles",
          propInput("target", local, "datetime-local"),
        ) +
        input("text", "Texte d’introduction") +
        input("doneText", "Message à la fin") +
        '<p class="inspector-help">La date est enregistrée avec votre fuseau lors de l’export. Le compte à rebours s’actualise chaque seconde sur le site publié.</p>'
      );
    }
    case "pricing":
      return (
        input("title", "Nom de l’offre") +
        input("price", "Prix ou libellé") +
        input("period", "Périodicité / précision") +
        area("text", "Avantages", "Un avantage par ligne") +
        input("buttonText", "Libellé du bouton") +
        input("href", "Lien du bouton") +
        checkProp("featured", p.featured, "Mettre cette offre en avant")
      );
    case "contact":
      return (
        input("title", "Titre du formulaire") +
        input("email", "Votre adresse de réception", "vous@exemple.fr") +
        input("subject", "Objet de l’email") +
        input("buttonText", "Libellé du bouton") +
        area(
          "notice",
          "Information au visiteur",
          "Soyez clair : ce formulaire prépare un email dans la messagerie, sans envoi serveur.",
          3,
        )
      );
    case "footer":
      return (
        input("brand", "Nom / signature") +
        area("text", "Un petit mot", "", 2) +
        area("links", "Liens", "Une ligne : Libellé|URL", 5) +
        input(
          "copyright",
          "Ligne de copyright",
          "{year} est remplacé par l’année",
        ) +
        checkProp("syncSite", p.syncSite, "Synchroniser sur toutes les pages")
      );
    default:
      return "";
  }
}
function studioDesignFields(b) {
  const p = b.props;
  const responsive = (name, label) =>
    `<label class="checkbox-field"><input type="checkbox" data-prop="${name}Custom"${p[`${name}Custom`] ? " checked" : ""}>Réglages spécifiques ${label}</label><div class="two-fields studio-spaced">${["heading", "paragraph"].includes(b.type) ? field("Taille du texte", numeric(`${name}FontSize`, p[`${name}FontSize`], 8, 160)) : ""}${field("Marge intérieure X", numeric(`${name}PaddingX`, p[`${name}PaddingX`], 0, 300))}${field("Haut", numeric(`${name}PaddingTop`, p[`${name}PaddingTop`], 0, 600))}${field("Bas", numeric(`${name}PaddingBottom`, p[`${name}PaddingBottom`], 0, 600))}</div>`;
  return `<details class="inspector-section studio-design-details"><summary>Disposition & effets</summary><div class="two-fields">${field("Intérieur horizontal", numeric("paddingX", p.paddingX, 0, 300))}${field("Hauteur minimale", numeric("minHeight", p.minHeight, 0, 1200))}</div><div class="two-fields studio-spaced">${field("Coins du bloc", numeric("boxRadius", p.boxRadius, 0, 150))}${field("Bordure", numeric("borderWidth", p.borderWidth, 0, 20))}</div><div class="studio-spaced">${colorControl("borderColor", p.borderColor, "Couleur de bordure")}</div>${field(
    "Ombre",
    propSelect("shadow", p.shadow, [
      ["none", "Aucune"],
      ["soft", "Douce"],
      ["medium", "Moyenne"],
      ["large", "Prononcée"],
    ]),
  )}${field("Opacité", range("opacity", p.opacity, 0, 100))}${field(
    "Apparition",
    propSelect("animation", p.animation, [
      ["none", "Aucune"],
      ["fade", "Fondu"],
      ["rise", "Montée douce"],
      ["zoom", "Zoom discret"],
    ]),
    "Les animations respectent la préférence « Réduire les animations ».",
  )}${["heading", "paragraph"].includes(b.type) ? `<div class="two-fields">${field("Interligne", propInput("lineHeight", p.lineHeight, "number", 'min="0.8" max="3" step="0.05"'))}${field("Approche (px)", propInput("letterSpacing", p.letterSpacing, "number", 'min="-8" max="15" step="0.1"'))}</div>` : ""}</details><details class="inspector-section"><summary>Fond créatif</summary>${checkProp("gradient", p.gradient, "Utiliser un dégradé")}<div class="studio-spaced">${colorControl("gradientStart", p.gradientStart, "Début")}${colorControl("gradientEnd", p.gradientEnd, "Fin")}</div>${field("Angle du dégradé", range("gradientAngle", p.gradientAngle, 0, 360))}${field("Image de fond", propInput("backgroundImage", p.backgroundImage.startsWith("data:") ? "" : p.backgroundImage, "text", 'placeholder="URL d’image ou médiathèque"'))}<button class="button button-ghost button-small button-full" data-pick-media="backgroundImage">${icon("image")}Choisir une image de fond</button>${p.backgroundImage ? '<button class="button button-light button-small button-full studio-spaced" data-clear-prop="backgroundImage">Retirer l’image</button>' : ""}${field("Voile sombre", range("overlay", p.overlay, 0, 90))}</details><details class="inspector-section"><summary>Responsive & visibilité</summary><p class="inspector-help" style="margin-top:0">Les styles généraux restent la base. Activez une surcharge pour ajuster ce bloc à un format précis.</p>${responsive("tablet", "tablette")}${responsive("mobile", "mobile")}${b.type === "columns" ? `<div class="two-fields studio-spaced">${field("Colonnes tablette", propInput("tabletColumns", p.tabletColumns, "number", 'min="1" max="4"'))}${field("Colonnes mobile", propInput("mobileColumns", p.mobileColumns, "number", 'min="1" max="4"'))}</div>${checkProp("reverseMobile", p.reverseMobile, "Inverser les deux premières colonnes sur mobile")}` : ""}<div class="studio-spaced">${checkProp("hideDesktop", p.hideDesktop, "Masquer sur ordinateur")}${checkProp("hideTablet", p.hideTablet, "Masquer sur tablette")}${checkProp("hideMobile", p.hideMobile, "Masquer sur mobile")}</div></details>`;
}
renderPageInspector = function (el) {
  const p = activePage(),
    home = p.id === doc.homePageId;
  el.innerHTML = `<div class="selected-block-heading"><span class="selected-block-icon">${icon("pages")}</span><div><h2>La page, en détail.</h2><p>${esc(pageFilename(p))}</p></div></div>${section("Page", field("Nom dans la navigation", `<input class="control" data-page-prop="title" value="${esc(p.title)}" maxlength="80" aria-label="Nom de la page">`) + field("Adresse du fichier", `<div class="number-unit"><input class="control" data-page-prop="slug" value="${esc(home ? "index" : p.slug)}" maxlength="80"${home ? " disabled" : ""} aria-label="Adresse de la page"><span>.html</span></div>`, home ? "La page d’accueil est toujours index.html." : "Les liens des navigations automatiques sont mis à jour. Les liens saisis à la main restent à vérifier.") + `<label class="checkbox-field"><input type="checkbox" data-page-prop="inNavigation"${p.inNavigation ? " checked" : ""}>Afficher dans les navigations automatiques</label><label class="checkbox-field"><input type="checkbox" data-page-prop="published"${p.published ? " checked" : ""}${home ? " disabled" : ""}>Inclure dans le site exporté</label>${!home ? `<button class="button button-ghost button-full button-small studio-spaced" data-home-page="${p.id}">${icon("globe")}Définir comme page d’accueil</button>` : ""}`)}${section("Référencement", field("Titre pour les moteurs de recherche", `<input class="control" data-page-prop="seoTitle" value="${esc(p.seoTitle)}" maxlength="100" placeholder="${esc(`${p.title} — ${doc.title}`)}" aria-label="Titre SEO">`) + field("Description", `<textarea class="control" data-page-prop="description" rows="4" maxlength="320" aria-label="Description SEO">${esc(p.description)}</textarea>`) + `<div class="seo-preview"><strong>${esc(p.seoTitle || `${p.title} — ${doc.title}`)}</strong><small>${esc((doc.settings.baseUrl || "votre-site.fr/") + pageFilename(p))}</small><p>${esc(p.description || "Ajoutez une description courte pour présenter cette page dans les résultats de recherche.")}</p></div><label class="checkbox-field"><input type="checkbox" data-page-prop="noIndex"${p.noIndex ? " checked" : ""}>Demander aux moteurs de ne pas indexer cette page</label>`)}<details class="inspector-section"><summary>CSS de cette page</summary><textarea class="control code-control" data-page-prop="customCSS" spellcheck="false" aria-label="CSS de cette page">${esc(p.customCSS)}</textarea><p class="inspector-help">CSS ajouté après les styles du site. Aucun JavaScript n’est exécuté depuis un bloc HTML.</p></details>${section("Actions", `<button class="button button-light button-full button-small" data-page-duplicate="${p.id}">${icon("copy")}Dupliquer la page</button><button class="button button-danger button-full button-small studio-spaced" data-page-delete="${p.id}">${icon("trash")}Supprimer cette page</button>`)}`;
};
function renderThemeInspector(el) {
  const s = doc.settings;
  el.innerHTML = `<div class="selected-block-heading"><span class="selected-block-icon">${icon("palette")}</span><div><h2>Un style qui vous ressemble.</h2><p>Une identité, sur toutes les pages.</p></div></div>${section(
    "Identité",
    field(
      "Nom du projet",
      `<input class="control" data-root-prop="title" value="${esc(doc.title)}" maxlength="80" aria-label="Nom du projet">`,
    ) +
      field(
        "Langue du site",
        `<select class="control" data-setting="lang" aria-label="Langue du site">${[
          ["fr", "Français"],
          ["en", "English"],
          ["es", "Español"],
          ["de", "Deutsch"],
          ["it", "Italiano"],
        ]
          .map(
            ([v, l]) =>
              `<option value="${v}"${s.lang === v ? " selected" : ""}>${l}</option>`,
          )
          .join("")}</select>`,
      ),
  )}${section("Palette globale", `<div class="palette-grid">${PALETTES.map((p, i) => `<button class="palette-button${s.accent === p.accent ? " active" : ""}" data-palette="${i}" title="${p.name}" aria-label="Palette ${p.name}"><span style="background:linear-gradient(135deg,${p.accent} 50%,${p.background} 50%)"></span></button>`).join("")}</div>${colorControl("accent", s.accent, "Accent", true)}${colorControl("text", s.text, "Texte", true)}${colorControl("background", s.background, "Fond de page", true)}<p class="inspector-help">Les couleurs définies individuellement sur un bloc restent prioritaires.</p>`)}${section("Typographies", field("Texte courant", themeFontSelect("font", s.font)) + field("Titres", themeFontSelect("headingFont", s.headingFont)) + '<p class="inspector-help">Polices système uniquement : aucun chargement externe ni licence à acheter.</p>')}${section("Mise en page", field("Largeur maximale du contenu", `<div class="number-unit"><input class="control" type="number" data-setting="width" value="${s.width}" min="600" max="1440" aria-label="Largeur du contenu"><span>px</span></div>`) + `<label class="checkbox-field"><input type="checkbox" data-setting="backToTop"${s.backToTop ? " checked" : ""}>Bouton flottant « Retour en haut »</label>`)}${section("Publication & partage", field("URL publique du site", `<input class="control" data-setting="baseUrl" value="${esc(s.baseUrl)}" placeholder="https://pseudo.github.io/mon-site/" aria-label="URL publique du site">`, "Facultatif. Permet de générer les URL canoniques et le sitemap dans le ZIP.") + field("Image de partage (URL publique)", `<input class="control" data-setting="socialImage" value="${esc(s.socialImage)}" placeholder="https://…/partage.jpg" aria-label="Image de partage">`, "Les réseaux sociaux ont besoin d’une URL publique, pas d’une image locale en données.") + `<div class="studio-favicon-row">${s.favicon ? `<img src="${esc(safeImage(s.favicon))}" alt="Favicon">` : '<span class="studio-favicon-empty">a.</span>'}<label class="button button-light button-small">${icon("upload")}Importer un favicon<input type="file" data-favicon-upload accept="image/*" hidden></label>${s.favicon ? '<button class="icon-button" data-clear-favicon aria-label="Retirer le favicon">×</button>' : ""}</div>`)}<details class="inspector-section"><summary>CSS global</summary><textarea class="control code-control" data-setting="customCSS" spellcheck="false" aria-label="CSS global">${esc(s.customCSS)}</textarea><p class="inspector-help">Vos règles sont ajoutées après les styles de base. Les balises HTML et @import sont retirés pour conserver un export autonome.</p></details>${section("Projet & sauvegarde", `<button class="button button-light button-full button-small" data-inspector-action="save-project">${icon("download")}Garder une copie JSON</button><button class="button button-ghost button-full button-small studio-spaced" data-open-projects>${icon("folder")}Ouvrir mes projets</button><p class="inspector-help">Les sites sont sauvegardés dans le stockage de ce navigateur. Gardez des copies JSON : effacer les données du navigateur efface aussi les projets locaux.</p>`)}`;
}
function themeFontSelect(key, value) {
  return `<select class="control" data-setting="${key}" aria-label="${key === "font" ? "Police du texte" : "Police des titres"}">${[
    ["sans", "Sans serif · système"],
    ["round", "Humaniste · Trebuchet"],
    ["serif", "Éditoriale · Georgia"],
    ["display", "Classique · Palatino"],
    ["mono", "Technique · Monospace"],
  ]
    .map(
      ([v, l]) =>
        `<option value="${v}"${value === v ? " selected" : ""}>${l}</option>`,
    )
    .join("")}</select>`;
}
