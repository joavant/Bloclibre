/* Fenêtres du studio, palette de commandes et vérifications avant publication. */
let studioExportPageId = null,
  commandItems = [],
  commandIndex = 0;
const TEMPLATE_CATALOG = [
  {
    id: "personal",
    name: "Portfolio créatif",
    category: "VOTRE COIN D’INTERNET",
    desc: "4 pages · Projets, parcours, compétences & contact",
    tone: "mint",
    headline: "Curieux par nature.<br>Créatif par choix.",
    brand: "alex.",
    tag: "POUR VOUS",
  },
  {
    id: "hackathon",
    name: "Le projet qui se démarque",
    category: "HACKATHON & DÉMO DAY",
    desc: "3 pages · Pitch, équipe, démo & compte à rebours",
    tone: "night",
    headline: "Une petite équipe.<br>Une grande idée.",
    brand: "pulse_",
    tag: "HACKATHON",
  },
  {
    id: "saas",
    name: "Un produit, une promesse",
    category: "LANDING PAGE & PRODUIT",
    desc: "3 pages · Bénéfices, fonctionnalités & offres",
    tone: "lavender",
    headline: "Moins de dispersion.<br>Plus de progression.",
    brand: "orbit.",
    tag: "",
  },
  {
    id: "atelier",
    name: "Atelier créatif",
    category: "STUDIO & INDÉPENDANT",
    desc: "1 page · Une vitrine douce et chaleureuse",
    tone: "sand",
    headline: "De belles idées.<br>De vrais projets.",
    brand: "atelier.",
    tag: "",
  },
  {
    id: "portfolio",
    name: "Portfolio éditorial",
    category: "DESIGN & DIRECTION ARTISTIQUE",
    desc: "1 page · De la place pour montrer votre travail",
    tone: "ink",
    headline: "Les idées prennent<br>une autre dimension.",
    brand: "alex. design",
    tag: "",
  },
  {
    id: "launch",
    name: "Lancement tout en douceur",
    category: "COLLECTION & NOUVEAUTÉ",
    desc: "1 page · Une belle idée à faire découvrir",
    tone: "peach",
    headline: "Moins de bruit.<br>Plus d’essentiel.",
    brand: "morrow.",
    tag: "",
  },
];
renderTemplatesModal = function () {
  $("#modal-root").innerHTML = modalShell(
    "Une bonne base. Votre touche en plus.",
    "Chaque modèle crée un nouveau projet. Votre site actuel est conservé.",
    "sparkles",
    `<div class="modal-body"><div class="studio-template-intro"><span class="studio-pill">${icon("unlock")}LIBRE, JUSQU’AU DERNIER PIXEL</span><p>Du portfolio personnel au pitch de hackathon : partez avec une structure, pas avec une page figée. Tout reste modifiable.</p></div><div class="studio-template-grid">${TEMPLATE_CATALOG.map((t) => `<button class="studio-template-card" data-template="${t.id}"><div class="studio-template-preview tone-${t.tone}"><div class="template-mini-nav"><b>${t.brand}</b><span>— &nbsp; — &nbsp; ↗</span></div>${t.tag ? `<span class="template-ribbon">${t.tag}</span>` : ""}<small>${t.category}</small><strong>${t.headline}</strong><i></i><span class="template-mini-button">Découvrir le projet ↗</span><div class="template-mini-bento"><span></span><span></span></div></div><div class="studio-template-info"><span><strong>${t.name}</strong><small>${t.desc}</small></span>${icon("arrowRight")}</div></button>`).join("")}</div><button class="blank-template" data-template="blank">${icon("plus")}Je préfère une page blanche</button></div>`,
    `<span class="modal-footer-note">${icon("checkCircle")}6 modèles · 17 sections prêtes à l’emploi · zéro abonnement</span>`,
    "studio-templates-modal",
  );
};
async function renderProjectsModal() {
  $("#modal-root").innerHTML = modalShell(
    "Votre terrain de jeu.",
    "Tous vos sites, sauvegardés sur ce navigateur.",
    "folder",
    `<div class="modal-body"><div class="studio-project-heading"><div><span class="library-eyebrow">DES IDÉES À GARDER, DES PROJETS À LANCER</span><h3>Qu’est-ce qu’on crée aujourd’hui ?</h3></div><button class="button button-primary" data-new-studio-project>${icon("plus")}Nouveau site</button></div><div id="studio-project-grid" class="studio-project-grid"><div class="studio-empty">Chargement de vos projets…</div></div></div>`,
    `<span class="modal-footer-note">${icon("shield")}Local ne veut pas dire sauvegarde cloud. Gardez aussi vos projets en JSON.</span><button class="button button-light button-small" data-import-studio-project>${icon("upload")}Importer un projet</button>`,
    "studio-projects-modal",
  );
  await saveNow();
  const records = await listLocalProjects();
  if (modalState !== "projects") return;
  $("#studio-project-grid").innerHTML = records
    .map((r) => {
      const d = r.data,
        theme = d.settings || {},
        hero =
          allBlocks(
            d.pages?.find((p) => p.id === d.homePageId)?.blocks ||
              d.blocks ||
              [],
          ).find((b) => b.type === "heading")?.props.text || r.title,
        template = TEMPLATE_CATALOG.find((t) => t.id === d.template);
      return `<article class="studio-project-card"><button data-open-project-id="${r.id}" class="project-card-cover" style="--cover-bg:${color(theme.background, "#f6f7f0")};--cover-ink:${color(theme.text, "#283a2d")};--cover-accent:${color(theme.accent, "#38654b")}"><span class="project-cover-nav"><b>${esc(r.title.split("·")[0].trim())}</b><i>— &nbsp; — &nbsp; ↗</i></span><strong>${esc(hero.slice(0, 90))}</strong><i class="project-cover-cta"></i><span class="project-cover-art"></span></button><div class="studio-project-info"><div><strong>${esc(r.title)}</strong><small>${r.volatile ? "Session seulement · " : ""}${d.pages?.length || 1} page${(d.pages?.length || 1) > 1 ? "s" : ""} · ${new Intl.DateTimeFormat("fr", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(r.updatedAt)}</small></div>${r.id === doc.id ? '<span class="current-project-badge">En cours</span>' : `<button class="icon-button" data-delete-project-id="${r.id}" aria-label="Supprimer le projet">${icon("trash")}</button>`}</div><div class="studio-project-card-footer"><span>${esc(template?.name || "Création libre")}</span><button data-open-project-id="${r.id}">Ouvrir ${icon("arrowRight")}</button></div></article>`;
    })
    .join("");
}
function exportText() {
  const id = studioExportPageId || doc.activePageId;
  if (modalExportMode === "css") {
    const out = htmlDocument(doc, false, false, { pageId: id });
    return out.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";
  }
  if (modalExportMode === "js") return STUDIO_RUNTIME;
  if (modalExportMode === "project")
    return JSON.stringify(snapshotProject(), null, 2);
  return htmlDocument(doc, false, modalExportMode === "fragment", {
    pageId: id,
  });
}
renderExportModal = function () {
  studioExportPageId ||= doc.activePageId;
  const page =
      doc.pages.find((p) => p.id === studioExportPageId) || activePage(),
    output = exportText(),
    published = doc.pages.filter((p) => p.published || p.id === doc.homePageId);
  $("#modal-root").innerHTML = modalShell(
    "Votre site. Votre code. Vos règles.",
    "Un HTML autonome, ou tout le site organisé en fichiers prêts à publier.",
    "code",
    `<div class="studio-export-layout"><aside class="studio-export-files"><span class="studio-files-label">VOTRE SITE · ${published.length} PAGES</span>${doc.pages.map((p) => `<button class="export-page-file${page.id === p.id ? " active" : ""}" data-export-page="${p.id}">${icon("pages")}<span>${esc(pageFilename(p))}</span>${!p.published ? "<small>Brouillon</small>" : ""}</button>`).join("")}<div class="studio-export-folder">${icon("folder")}assets/<small>CSS, JS & images utilisées</small></div><div class="studio-export-folder">${icon("globe")}robots.txt${doc.settings.baseUrl ? "<small>+ sitemap.xml</small>" : ""}</div><div class="studio-export-tip">${icon("shield")}Le ZIP public n’inclut ni les brouillons, ni le fichier de projet privé.</div><button class="button button-light button-small button-full" data-save-studio-project>${icon("save")}Garder le projet JSON</button></aside><section class="studio-export-code"><div class="export-tabs" role="tablist">${[
      ["full", "HTML"],
      ["css", "CSS"],
      ["js", "JavaScript"],
      ["fragment", "Fragment"],
      ["project", "Projet JSON"],
    ]
      .map(
        ([v, l]) =>
          `<button data-export-mode="${v}" class="${modalExportMode === v ? "active" : ""}" role="tab" aria-selected="${modalExportMode === v}">${l}</button>`,
      )
      .join(
        "",
      )}</div><div class="studio-code-file"><span>${icon("code")}${esc(modalExportMode === "css" ? "style.css" : modalExportMode === "js" ? "site.js" : modalExportMode === "project" ? "projet.bloclibre.json" : pageFilename(page))}</span><span>${bytesLabel(new Blob([output]).size)} · ${output.split("\n").length} lignes</span></div><div class="code-wrap"><pre id="export-code" tabindex="0" aria-label="Code à exporter"></pre></div><div class="code-status"><span>${icon("checkCircle")}Sans dépendance</span><span>Images locales intégrées</span><span>Interactions JavaScript natives</span></div></section></div>`,
    `<span class="modal-footer-note">${icon("unlock")}Aucun filigrane. Aucun lien imposé.</span><button class="button button-light" id="copy-code">${icon("copy")}Copier</button><button class="button button-light" data-download-html>${icon("pages")}Page HTML</button><button class="button button-primary" data-export-zip>${icon("download")}Site complet .zip</button>`,
    "studio-export-modal",
  );
  const code = $("#export-code");
  code.textContent =
    output.length > 600000
      ? output.slice(0, 600000) +
        "\n\n… Aperçu abrégé. La copie et le téléchargement contiennent le fichier complet."
      : output;
};
exportHtml = function (fragment = false) {
  const p =
    doc.pages.find((p) => p.id === (studioExportPageId || doc.activePageId)) ||
    activePage();
  download(
    htmlDocument(doc, false, fragment, { pageId: p.id }),
    fragment ? "fragment.html" : pageFilename(p),
    "text/html;charset=utf-8",
  );
  toast("Page HTML téléchargée avec ses styles et ses interactions.");
};
copyCode = async function () {
  const text = exportText();
  let done = false;
  try {
    await navigator.clipboard.writeText(text);
    done = true;
  } catch (error) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.append(ta);
    ta.select();
    try {
      done = document.execCommand("copy");
    } catch (e) {}
    ta.remove();
  }
  toast(
    done
      ? "Code copié. À vous de jouer."
      : "Copie indisponible. Téléchargez le fichier pour récupérer le code.",
    !done,
  );
};
renderPreviewModal = function () {
  previewPageId ||= doc.activePageId;
  $("#modal-root").innerHTML =
    `<div class="modal-backdrop"><section class="modal preview-modal studio-preview-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1"><header class="modal-header"><div class="modal-heading"><span class="modal-heading-icon">${icon("eye")}</span><div><h2 id="modal-title">Le résultat, sans distraction.</h2><p>La navigation entre vos pages fonctionne aussi ici.</p></div></div><div class="preview-header-tools"><select class="control studio-preview-page" data-preview-page aria-label="Page à prévisualiser">${doc.pages.map((p) => `<option value="${p.id}"${p.id === previewPageId ? " selected" : ""}>${esc(p.title)}${!p.published ? " · brouillon" : ""}</option>`).join("")}</select><div class="device-switch" role="group" aria-label="Format de l’aperçu">${[
      ["desktop", "desktop", "Ordinateur"],
      ["tablet", "tablet", "Tablette"],
      ["mobile", "smartphone", "Mobile"],
    ]
      .map(
        ([d, i, l]) =>
          `<button class="${previewDevice === d ? "active" : ""}" data-preview-device="${d}" aria-label="${l}" aria-pressed="${previewDevice === d}">${icon(i)}</button>`,
      )
      .join(
        "",
      )}</div><button class="icon-button" data-close-modal aria-label="Fermer l’aperçu">${icon("close")}</button></div></header><div class="modal-body"><div class="preview-shell" id="preview-shell"><iframe id="preview-frame" sandbox="allow-scripts allow-forms allow-popups" title="Aperçu du site exporté" referrerpolicy="no-referrer"></iframe></div></div><footer class="studio-preview-footer"><span>${icon("shield")}Les vidéos tierces restent désactivées tant que vous ne cliquez pas.</span><button class="button button-primary button-small" data-export-zip>${icon("download")}Exporter le site</button></footer></section></div>`;
  $("#preview-frame").srcdoc = htmlDocument(doc, false, false, {
    pageId: previewPageId,
    preview: true,
  });
  setPreviewDevice(previewDevice);
};
function previewNavigate(id, anchor = "") {
  if (!doc.pages.some((p) => p.id === id)) return;
  previewPageId = id;
  $("#preview-frame").srcdoc = htmlDocument(doc, false, false, {
    pageId: id,
    preview: true,
    previewAnchor: anchor,
  });
  $("[data-preview-page]").value = id;
}
function ratioColor(a, b) {
  const luminance = (hex) => {
    const c = color(hex, "#ffffff")
      .slice(1)
      .match(/../g)
      .map((n) => parseInt(n, 16) / 255)
      .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4));
    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  };
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function auditSite() {
  syncActivePage();
  const issues = [];
  let checked = 0;
  const published = doc.pages.filter(
      (p) => p.published || p.id === doc.homePageId,
    ),
    filenames = new Set(published.map((p) => pageFilename(p)));
  const add = (page, kind, title, detail, blockId = null) =>
    issues.push({ pageId: page.id, kind, title, detail, blockId });
  for (const p of published) {
    const blocks = allBlocks(p.blocks);
    checked += blocks.length;
    const h1 = blocks.filter(
      (b) => b.type === "heading" && b.props.level === 1,
    );
    if (h1.length !== 1)
      add(
        p,
        h1.length ? "warning" : "error",
        h1.length ? "Plusieurs titres H1" : "Ajoutez un titre principal H1",
        "Une page claire a généralement un seul titre principal.",
        h1[0]?.id,
      );
    if (!p.description || p.description.length < 45)
      add(
        p,
        "warning",
        "Une description à compléter",
        "Une phrase de 50 à 160 caractères aide à présenter cette page dans les moteurs de recherche.",
      );
    const anchors = new Set(["top", "main-content"]);
    let previousHeading = 0;
    let demo = false;
    for (const b of blocks) {
      const v = b.props;
      if (v.anchor) {
        if (anchors.has(v.anchor))
          add(
            p,
            "error",
            "Une ancre est utilisée plusieurs fois",
            `« ${v.anchor} » doit être unique sur la page.`,
            b.id,
          );
        anchors.add(v.anchor);
      }
      if (b.type === "heading") {
        if (!String(v.text).trim())
          add(
            p,
            "error",
            "Un titre est vide",
            "Ajoutez un titre ou retirez ce bloc.",
            b.id,
          );
        if (previousHeading && v.level > previousHeading + 1)
          add(
            p,
            "warning",
            "Un niveau de titre est sauté",
            `Le titre passe de H${previousHeading} à H${v.level}.`,
            b.id,
          );
        previousHeading = v.level;
      }
      if (
        ((b.type === "image" && !v.decorative) ||
          (b.type === "project" && v.src)) &&
        !v.alt.trim()
      )
        add(
          p,
          "warning",
          "Une image n’a pas de texte alternatif",
          "Décrivez son contenu, ou marquez-la comme décorative si elle l’est.",
          b.id,
        );
      if (b.type === "gallery")
        for (const image of parsedGallery(v))
          if (!image.alt)
            add(
              p,
              "warning",
              "Une image de la galerie manque d’alternative",
              "Ajoutez un texte après l’URL : URL|Texte alternatif.",
              b.id,
            );
      if (b.type === "embed" && !embeddedUrl(v.href))
        add(
          p,
          "warning",
          "Une vidéo attend son lien",
          "Renseignez un lien YouTube / Vimeo ou supprimez le bloc vide.",
          b.id,
        );
      if (b.type === "file" && !v.src)
        add(
          p,
          "warning",
          "Un document attend son fichier",
          "Importez votre CV / PDF ou renseignez son URL.",
          b.id,
        );
      if (b.type === "video" && !v.src)
        add(
          p,
          "warning",
          "Une vidéo attend son fichier",
          "Renseignez une URL MP4 / WebM.",
          b.id,
        );
      if (b.type === "contact" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
        add(
          p,
          "error",
          "Adresse de contact invalide",
          "Ajoutez votre vraie adresse email.",
          b.id,
        );
      if (
        ["heading", "paragraph", "button", "badge"].includes(b.type) &&
        v.color &&
        !v.gradient &&
        !v.backgroundImage
      ) {
        const ratio = ratioColor(
            v.color,
            v.background || doc.settings.background,
          ),
          threshold =
            v.fontSize >= 24 || (v.bold && v.fontSize >= 18) ? 3 : 4.5;
        if (ratio < threshold)
          add(
            p,
            "warning",
            "Contraste à vérifier",
            `Rapport indicatif ${ratio.toFixed(1)}:1. Visez au moins ${threshold}:1 pour ce texte.`,
            b.id,
          );
      }
      if (
        /example\.com|Votre prénom|à personnaliser avec votre histoire/i.test(
          JSON.stringify(v),
        )
      )
        demo = true;
      const links = [];
      if (v.href) links.push(v.href);
      if (b.type === "navigation" && !v.autoPages)
        links.push(...renderLines(v.text).map(([, h]) => h));
      if (b.type === "social")
        links.push(...renderLines(v.text).map(([, h]) => h));
      if (b.type === "footer")
        links.push(...renderLines(v.links).map(([, h]) => h));
      for (const href of links.filter(Boolean)) {
        if (href === "#") {
          add(
            p,
            "warning",
            "Un lien ne mène nulle part",
            "Remplacez le lien « # » par une page, une ancre ou une vraie URL.",
            b.id,
          );
          continue;
        }
        if (safeUrl(href, "") === "") {
          add(
            p,
            "error",
            "Lien non pris en charge",
            "Utilisez https://, mailto:, tel:, une ancre ou un fichier relatif.",
            b.id,
          );
          continue;
        }
        if (
          /^[^/#]+\.html(?:#.*)?$/.test(href) &&
          !filenames.has(href.split("#")[0])
        )
          add(
            p,
            "warning",
            "Une page liée n’est pas exportée",
            `Le lien « ${href} » ne correspond pas à une page publiée.`,
            b.id,
          );
      }
    }
    for (const b of blocks) {
      const v = b.props;
      const links = [];
      if (v.href?.startsWith("#")) links.push(v.href);
      if (b.type === "navigation" && !v.autoPages)
        links.push(
          ...renderLines(v.text)
            .map(([, h]) => h)
            .filter((h) => h?.startsWith("#")),
        );
      for (const href of links)
        if (href.length > 1 && !anchors.has(href.slice(1)))
          add(
            p,
            "warning",
            "Une ancre cible est introuvable",
            `Le bloc lié à « ${href} » n’existe pas sur cette page.`,
            b.id,
          );
    }
    if (demo)
      add(
        p,
        "warning",
        "Des contenus de démonstration restent présents",
        "Remplacez notamment les adresses example.com, les profils et les descriptions de démonstration.",
      );
  }
  let baseValid = false;
  try {
    baseValid = /^https?:$/.test(new URL(doc.settings.baseUrl).protocol);
  } catch (error) {}
  if (doc.settings.baseUrl && !baseValid)
    add(
      published[0],
      "warning",
      "L’URL publique semble invalide",
      "Renseignez l’adresse complète, par exemple https://pseudo.github.io/site/.",
    );
  const errors = issues.filter((i) => i.kind === "error").length,
    warnings = issues.length - errors;
  return {
    issues,
    errors,
    warnings,
    score: Math.max(0, 100 - errors * 12 - warnings * 3),
    pages: published.length,
    blocks: checked,
  };
}
function renderAuditModal() {
  const result = auditSite();
  $("#modal-root").innerHTML = modalShell(
    "Un dernier regard avant le grand saut.",
    "Des vérifications utiles, sans bloquer votre liberté de publier.",
    "checkCircle",
    `<div class="modal-body"><div class="studio-audit-overview"><div class="audit-score${result.errors ? " has-error" : ""}">${result.score}<small>/ 100</small></div><div><h3>${result.errors ? "Quelques points à corriger." : result.warnings ? "Encore quelques détails à soigner." : "Tout est prêt pour prendre l’air."}</h3><p>${result.pages} pages · ${result.blocks} blocs vérifiés<br>${result.errors} erreurs · ${result.warnings} recommandations</p></div></div><div class="studio-audit-list">${result.issues.map((i) => `<button class="studio-audit-issue ${i.kind}" data-audit-page="${i.pageId}"${i.blockId ? ` data-audit-block="${i.blockId}"` : ""}><span>${icon(i.kind === "error" ? "info" : "eye")}</span><div><small>${esc(doc.pages.find((p) => p.id === i.pageId)?.title)}</small><strong>${esc(i.title)}</strong><p>${esc(i.detail)}</p></div>${icon("arrowRight")}</button>`).join("") || `<div class="studio-audit-success">${icon("checkCircle")}Titres, alternatives, liens et descriptions : aucun problème courant détecté.</div>`}</div><p class="inspector-help">Cette vérification est indicative : elle ne remplace pas un audit d’accessibilité, une relecture humaine ou un test sur de vrais appareils.</p></div>`,
    `<span class="modal-footer-note">${icon("shield")}Aucune analyse distante. Tout est vérifié dans ce navigateur.</span><button class="button button-primary" data-open-export>${icon("download")}Passer à l’export</button>`,
    "studio-audit-modal",
  );
}
function buildCommands() {
  const q = commandQuery.trim().toLowerCase(),
    match = (s) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(q.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  const items = [
    ...[
      [
        "sections",
        "grid",
        "Explorer les sections",
        "Une base en un clic",
        () => {
          changeSidebarTab("sections");
          if (matchMedia("(max-width:740px)").matches) openPanel("left");
        },
      ],
      [
        "pages",
        "pages",
        "Gérer les pages",
        "Un vrai site, pas seulement une page",
        () => changeSidebarTab("pages"),
      ],
      [
        "new-page",
        "plus",
        "Ajouter une page",
        "Créer une nouvelle page",
        () => createPage(),
      ],
      [
        "preview",
        "eye",
        "Prévisualiser le site",
        "Ordinateur, tablette et mobile",
        () => openModal("preview"),
      ],
      [
        "export",
        "download",
        "Exporter le site",
        "HTML, CSS, JavaScript et ZIP",
        () => openModal("export"),
      ],
      [
        "audit",
        "checkCircle",
        "Vérifier avant de publier",
        "Accessibilité, liens et SEO",
        () => openModal("audit"),
      ],
      [
        "theme",
        "palette",
        "Personnaliser le thème",
        "Couleurs, typographies et identité",
        () => {
          inspectorTab = "theme";
          renderInspector();
          if (matchMedia("(max-width:1050px)").matches) openPanel("right");
        },
      ],
      [
        "projects",
        "folder",
        "Ouvrir mes projets",
        "Votre bibliothèque locale",
        () => openModal("projects"),
      ],
      [
        "versions",
        "clock",
        "Voir les versions locales",
        "Restaurer une étape précédente",
        () => openModal("revisions"),
      ],
      [
        "save",
        "save",
        "Télécharger le projet JSON",
        "Une vraie copie de sauvegarde",
        () => saveProject(),
      ],
      [
        "focus",
        "fit",
        "Activer / quitter le mode focus",
        "De la place pour créer",
        () => toggleStudioFocus(),
      ],
      [
        "help",
        "info",
        "Un petit coup de main",
        "Le guide de démarrage",
        () => openModal("guide"),
      ],
    ].map(([id, ico, label, desc, run]) => ({
      id,
      ico,
      label,
      desc,
      group: "Actions",
      run,
    })),
    ...doc.pages.map((p) => ({
      id: p.id,
      ico: "pages",
      label: `Ouvrir ${p.title}`,
      desc: pageFilename(p),
      group: "Pages",
      run: () => switchPage(p.id),
    })),
    ...Object.entries(TYPES).map(([type, t]) => ({
      id: type,
      ico: t.icon,
      label: `Ajouter : ${t.label}`,
      desc: t.desc,
      group: "Blocs",
      run: () => addBlock(type),
    })),
    ...SECTION_RECIPES.map((r) => ({
      id: r.id,
      ico: "grid",
      label: r.label,
      desc: r.desc,
      group: "Sections",
      run: () => insertRecipe(r.id),
    })),
  ];
  return (
    q
      ? items.filter((i) => match(`${i.label} ${i.desc} ${i.group}`))
      : items.slice(0, 12)
  ).slice(0, 25);
}
function renderCommandModal() {
  $("#modal-root").innerHTML =
    `<div class="modal-backdrop studio-command-backdrop"><section class="modal studio-command-modal" role="dialog" aria-modal="true" aria-labelledby="command-label" tabindex="-1"><div class="studio-command-search">${icon("search")}<label for="studio-command-input" class="sr-only" id="command-label">Rechercher une action, un bloc ou une page</label><input id="studio-command-input" placeholder="Une action, un bloc, une page…" value="${esc(commandQuery)}" autocomplete="off"><kbd>Échap</kbd></div><div id="studio-command-results" role="listbox" aria-label="Résultats"></div><footer class="studio-command-footer"><span>↑ ↓ pour explorer · Entrée pour choisir</span><span>bloclibre studio</span></footer></section></div>`;
  renderCommandResults();
}
function renderCommandResults() {
  commandItems = buildCommands();
  commandIndex = Math.min(commandIndex, Math.max(0, commandItems.length - 1));
  $("#studio-command-results").innerHTML =
    commandItems
      .map(
        (item, i) =>
          `<button class="studio-command-item${i === commandIndex ? " active" : ""}" data-run-command="${i}" role="option" aria-selected="${i === commandIndex}"><span class="command-icon">${icon(item.ico)}</span><span><strong>${esc(item.label)}</strong><small>${esc(item.desc)}</small></span><em>${item.group}</em>${icon("arrowRight")}</button>`,
      )
      .join("") ||
    '<div class="no-results">Rien trouvé. Essayez « titre », « page » ou « export ».</div>';
}
function runCommand(index) {
  const cmd = commandItems[index];
  if (!cmd) return;
  closeModal();
  cmd.run();
}
function renderGuideModal() {
  $("#modal-root").innerHTML = modalShell(
    "De l’idée au site, sans détour.",
    "Le mini-guide pour créer vite, et garder le contrôle.",
    "bolt",
    `<div class="modal-body"><div class="studio-guide-step"><b>01</b><div><h3>Choisissez votre terrain de jeu.</h3><p>Créez un projet depuis un modèle. Portfolio, hackathon ou produit : chaque base est modifiable. Vos projets restent séparés.</p></div></div><div class="studio-guide-step"><b>02</b><div><h3>Composez, plutôt que repartir de zéro.</h3><p>Les sections ajoutent une composition complète. Les blocs s’ajoutent au clic ou par glisser-déposer. Écrivez directement dans les textes.</p></div></div><div class="studio-guide-step"><b>03</b><div><h3>Faites-le vraiment vôtre.</h3><p>Pages à gauche, contenu et design à droite. Thème règle l’identité globale. Les réglages responsive ajustent chaque bloc sur tablette et mobile.</p></div></div><div class="studio-guide-step"><b>04</b><div><h3>Vérifiez. Exportez. Publiez.</h3><p>L’aperçu navigue entre vos pages. La vérification relève les oublis courants. Le ZIP contient le site final ; le JSON permet de le rééditer.</p></div></div><div class="studio-guide-callout">${icon("command")}Ctrl / Cmd + K retrouve presque tout. Ctrl / Cmd + S télécharge une sauvegarde JSON.</div><p class="inspector-help">Les projets sont locaux, pas dans un cloud. Le formulaire email ouvre la messagerie du visiteur. Ni base de données, ni boutique, ni envoi de formulaire côté serveur ne sont simulés.</p></div>`,
    `<span class="modal-footer-note">${icon("unlock")}Votre code sous licence MIT. Vos pages sans filigrane.</span><button class="button button-primary" data-close-modal>À moi de créer ${icon("arrowRight")}</button>`,
    "studio-guide-modal",
  );
}
const coreAboutModal = renderAboutModal;
renderAboutModal = function () {
  coreAboutModal();
  const p = $(".about-license");
  if (p)
    p.innerHTML =
      "bloclibre Studio 2.0 · Licence MIT · Icônes et illustrations originales.<br>Multipage, projets locaux et export ZIP natif.<br>Indépendant, non affilié à WordPress.";
};
const coreShortcuts = renderShortcutsModal;
renderShortcutsModal = function () {
  coreShortcuts();
  $(".modal-body")?.insertAdjacentHTML(
    "afterbegin",
    `<div class="shortcut-row"><span>Tout retrouver</span><span class="shortcut-keys"><kbd>Ctrl / ⌘</kbd> + <kbd>K</kbd></span></div><div class="shortcut-row"><span>Copier / coller un bloc</span><span class="shortcut-keys"><kbd>Ctrl / ⌘</kbd> + <kbd>C / V</kbd></span></div><div class="shortcut-row"><span>Copier / coller le style</span><span class="shortcut-keys"><kbd>Ctrl / ⌘</kbd> + <kbd>Maj</kbd> + <kbd>C / V</kbd></span></div>`,
  );
};
const coreOpenModal = openModal;
openModal = function (type) {
  if (type === "export") studioExportPageId = doc.activePageId;
  if (type === "preview") previewPageId = doc.activePageId;
  coreOpenModal(type);
  if (type === "projects") renderProjectsModal();
  if (type === "revisions") renderRevisionsModal();
  if (type === "audit") renderAuditModal();
  if (type === "guide") renderGuideModal();
  if (type === "commands") {
    commandQuery = "";
    commandIndex = 0;
    renderCommandModal();
    requestAnimationFrame(() => $("#studio-command-input")?.focus());
  }
  if (type === "media") renderMediaModal();
  if (type === "component") renderComponentModal();
};
function renderMediaModal() {
  $("#modal-root").innerHTML = modalShell(
    "Une image, le bon endroit.",
    "Choisissez dans votre médiathèque ou importez de nouveaux fichiers.",
    "image",
    `<div class="modal-body"><label class="studio-asset-upload compact">${icon("upload")}<strong>Importer des images</strong><span>Fichiers locaux, intégrés au projet et à l’export</span><input type="file" multiple accept="image/*" data-modal-upload-assets></label><div class="studio-media-picker">${doc.assets.map((a) => `<button data-pick-asset-id="${a.id}"><img src="${esc(a.src)}" alt="${esc(a.alt)}" loading="lazy"><span>${esc(a.name)}</span></button>`).join("") || '<p class="no-results">Vos premières images arrivent ici.</p>'}</div></div>`,
    "",
    "studio-media-modal",
  );
}
function renderComponentModal() {
  const f = findBlock(selectedId);
  if (!f) return;
  $("#modal-root").innerHTML = modalShell(
    "À réutiliser, sans modération.",
    "Une copie de ce bloc sera conservée dans les sections enregistrées.",
    "save",
    `<div class="modal-body">${field("Nom du composant", `<input class="control" id="studio-component-name" maxlength="80" value="${esc(f.block.props.name || TYPES[f.block.type].label)}" aria-label="Nom du composant">`)}<p class="inspector-help">Les insertions seront des copies indépendantes. Les navigations et pieds de page peuvent, eux, être synchronisés depuis leurs réglages.</p></div>`,
    `<span class="modal-footer-note">${allBlocks([f.block]).length} bloc${allBlocks([f.block]).length > 1 ? "s" : ""} dans cette composition</span><button class="button button-primary" data-confirm-component>${icon("save")}Enregistrer</button>`,
    "confirm-modal",
  );
  requestAnimationFrame(() => $("#studio-component-name")?.select());
}

async function renderRevisionsModal() {
  const projectId = doc.id;
  $("#modal-root").innerHTML = modalShell(
    "Un peu de recul. Le droit d’essayer.",
    "Les 8 derniers points de restauration de ce projet, sur cet appareil.",
    "clock",
    `<div class="modal-body"><div class="studio-revision-intro"><div><h3>Vos versions locales.</h3><p>Un point automatique au plus toutes les trois minutes après une modification, et vos repères manuels.</p></div><button class="button button-primary button-small" data-create-revision>${icon("plus")}Créer un point</button></div><div id="studio-revision-list" class="studio-revision-list"><p class="no-results">Lecture des versions…</p></div></div>`,
    `<span class="modal-footer-note">${icon("shield")}Ces versions ne remplacent pas une sauvegarde externe. Effacer les données du navigateur les supprime.</span><button class="button button-light button-small" data-save-studio-project>${icon("download")}Garder le JSON</button>`,
    "studio-history-modal",
  );
  try {
    const records = await projectRevisions(projectId);
    if (modalState !== "revisions" || doc.id !== projectId) return;
    $("#studio-revision-list").innerHTML =
      records
        .map(
          (r) =>
            `<article class="studio-revision-row"><span>${icon(r.manual ? "save" : "clock")}</span><div><strong>${esc(new Intl.DateTimeFormat("fr", { dateStyle: "medium", timeStyle: "medium" }).format(r.createdAt))}</strong><small>${r.manual ? "Point manuel" : "Sauvegarde automatique"} · ${r.data.pages?.length || 1} pages · ${bytesLabel(new Blob([JSON.stringify(r.data)]).size)}</small></div><button class="button button-light button-small" data-restore-revision="${r.id}">Restaurer ${icon("undo")}</button></article>`,
        )
        .join("") ||
      '<div class="studio-empty">Votre prochain essai a son filet de sécurité.<p>Créez un point maintenant, ou laissez la première sauvegarde automatique le faire.</p></div>';
  } catch (error) {
    if (modalState === "revisions")
      $("#studio-revision-list").innerHTML =
        '<div class="studio-empty">Le stockage des versions est indisponible.<p>Vos éditions restent utilisables. Téléchargez le projet JSON pour conserver votre travail.</p></div>';
  }
}
