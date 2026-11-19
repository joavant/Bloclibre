/* bloclibre Studio 2 — modèle multipage, composants et modèles. Licence MIT. */
Object.assign(PATHS, {
  pages: '<path d="M14 2H5v20h14V7l-5-5Z"/><path d="M14 2v6h5M8 12h8m-8 4h6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  palette:
    '<path d="M12 3a9 9 0 1 0 0 18h2a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h5a3 3 0 0 0 3-3c0-3-5-5-9-5Z"/><path d="M7 9h.01M10 6h.01M6 13h.01M17 7h.01" stroke-width="3"/>',
  command:
    '<path d="M8 8H5a3 3 0 1 1 3-3v14a3 3 0 1 1-3-3h14a3 3 0 1 1-3 3V5a3 3 0 1 1 3 3H8Z"/>',
  rocket:
    '<path d="M9 15 3 21m11-7-4 4-4-4 4-4c2-5 6-7 11-7 0 5-2 9-7 11Z"/><circle cx="16" cy="8" r="1.5"/><path d="M10 10H5l-3 5h5m7-1v5l-5 3v-5"/>',
  save: '<path d="M3 3h15l3 3v15H3V3Z"/><path d="M7 3v6h10V3M7 21v-8h10v8"/>',
  paint:
    '<path d="m13 3 8 8-4 4-8-8 4-4ZM9 7 5 11l8 8 4-4M5 16l-3 5 5-3m3-6 3-3"/>',
  link: '<path d="m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 0)"/>',
  play: '<path d="m9 5 11 7-11 7V5Z"/><path d="M3 4v16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z"/>',
  parent: '<path d="M18 18h-6a6 6 0 0 1-6-6V4m-4 4 4-4 4 4"/>',
  moon: '<path d="M20 14A9 9 0 0 1 10 4a9 9 0 1 0 10 10Z"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  faq: '<path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z"/><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3h.01"/>',
  chart: '<path d="M3 3v18h18M7 17v-4m5 4V8m5 9V4"/>',
  badge:
    '<rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="7" cy="12" r="1"/><path d="M11 12h6"/>',
  timeline:
    '<path d="M6 2v20m5-16h10M11 12h7m-7 6h10"/><circle cx="6" cy="6" r="1.5"/><circle cx="6" cy="12" r="1.5"/><circle cx="6" cy="18" r="1.5"/>',
  social:
    '<circle cx="6" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-4M9 14l6 4"/>',
  pricing:
    '<path d="m3 3 9 1 9 9-8 8-9-9-1-9Z"/><circle cx="8" cy="8" r="1.5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
});
Object.assign(FONTS, {
  round: '"Trebuchet MS", Arial, sans-serif',
  display: '"Palatino Linotype", "Book Antiqua", Georgia, serif',
});
Object.assign(COMMON, {
  paddingX: 0,
  minHeight: 0,
  boxRadius: 0,
  borderWidth: 0,
  borderColor: "#dce2d6",
  shadow: "none",
  opacity: 100,
  animation: "none",
  customClass: "",
  gradient: false,
  gradientStart: "#e7f1db",
  gradientEnd: "#f9f5ec",
  gradientAngle: 135,
  backgroundImage: "",
  overlay: 0,
  hideMobile: false,
  hideTablet: false,
  hideDesktop: false,
  mobileCustom: false,
  mobileFontSize: 32,
  mobilePaddingTop: 32,
  mobilePaddingBottom: 32,
  mobilePaddingX: 20,
  tabletCustom: false,
  tabletFontSize: 48,
  tabletPaddingTop: 40,
  tabletPaddingBottom: 40,
  tabletPaddingX: 28,
});
const STUDIO_TYPES = {
  badge: {
    label: "Badge",
    icon: "badge",
    group: "essentials",
    desc: "Un petit détail qui attire l’œil.",
    props: {
      text: "Disponible pour de nouveaux projets",
      fontSize: 11,
      variant: "soft",
    },
  },
  buttons: {
    label: "Groupe de boutons",
    icon: "button",
    group: "layout",
    desc: "Plusieurs actions, une même direction.",
    props: { gap: 12, align: "left" },
  },
  project: {
    label: "Projet",
    icon: "folder",
    group: "portfolio",
    desc: "Votre travail mérite une belle vitrine.",
    props: {
      title: "Agora — créer du lien",
      text: "Une plateforme qui rassemble les bonnes idées et les bonnes personnes.",
      category: "DESIGN & DÉVELOPPEMENT",
      src: "",
      alt: "Aperçu du projet Agora",
      href: "#",
      tags: "UI / UX, JavaScript, Open source",
      radius: 16,
      year: "2026",
    },
  },
  skills: {
    label: "Compétences",
    icon: "chart",
    group: "portfolio",
    desc: "Votre boîte à outils, en un coup d’œil.",
    props: {
      text: "HTML & CSS|95\nJavaScript|85\nDesign d’interface|80\nPrototypage|90",
      variant: "tags",
    },
  },
  timeline: {
    label: "Parcours",
    icon: "timeline",
    group: "portfolio",
    desc: "Les étapes qui racontent votre histoire.",
    props: {
      text: "2026|Hackathon & nouveaux défis|Une idée, une équipe, un prototype.\n2025|Premiers projets indépendants|Des expériences numériques du début à la fin.\n2024|Le début de l’aventure|Apprendre, construire et partager.",
    },
  },
  social: {
    label: "Réseaux & liens",
    icon: "social",
    group: "portfolio",
    desc: "Les bons endroits pour vous retrouver.",
    props: {
      text: "GitHub|https://github.com/\nLinkedIn|https://linkedin.com/\nEmail|mailto:bonjour@example.com",
      variant: "outline",
      newTab: true,
    },
  },
  gallery: {
    label: "Galerie",
    icon: "grid",
    group: "media",
    desc: "Un mur d’images, avec agrandissement au clic.",
    props: {
      images: "",
      columns: 3,
      gap: 16,
      height: 240,
      radius: 12,
      lightbox: true,
    },
  },
  file: {
    label: "Fichier / CV",
    icon: "download",
    group: "media",
    desc: "Un CV ou un document à emporter.",
    props: {
      src: "",
      filename: "mon-cv.pdf",
      text: "Télécharger mon CV",
      meta: "PDF · Document à télécharger",
    },
  },
  video: {
    label: "Vidéo",
    icon: "play",
    group: "media",
    desc: "Une démo qui se regarde, pas qui se raconte.",
    props: {
      src: "",
      poster: "",
      caption: "",
      autoplay: false,
      loop: false,
      radius: 12,
    },
  },
  embed: {
    label: "Vidéo intégrée",
    icon: "play",
    group: "media",
    desc: "YouTube ou Vimeo, chargé uniquement au clic.",
    props: { href: "", title: "La démo du projet", radius: 12 },
  },
  code: {
    label: "Code",
    icon: "code",
    group: "more",
    desc: "Partagez un extrait propre, avec copie en un clic.",
    props: {
      text: 'function createSomethingGreat() {\n  return "Hello, world!";\n}',
      language: "JavaScript",
      filename: "hello.js",
      copy: true,
    },
  },
  faq: {
    label: "Questions / réponses",
    icon: "faq",
    group: "more",
    desc: "Des réponses bien rangées, sans complexité.",
    props: {
      text: "À qui s’adresse ce projet ?|À celles et ceux qui veulent passer d’une idée à un premier résultat concret.\nComment l’utiliser ?|Découvrez la démo, explorez le code et adaptez-le à vos besoins.\nEst-ce open source ?|Oui. Le code est librement accessible sous licence MIT.",
      firstOpen: true,
    },
  },
  tabs: {
    label: "Onglets",
    icon: "layers",
    group: "more",
    desc: "Plusieurs facettes, un seul espace.",
    props: {
      text: "Le problème|Trop d’idées restent au stade de la note dans un carnet.\nLa solution|Un outil simple pour créer, tester et apprendre vite.\nLa suite|Écouter les retours et faire grandir le projet.",
    },
  },
  stat: {
    label: "Chiffre clé",
    icon: "chart",
    group: "more",
    desc: "Un chiffre, une idée forte.",
    props: {
      value: "48",
      suffix: "h",
      text: "pour passer de l’idée au prototype",
      fontSize: 58,
    },
  },
  countdown: {
    label: "Compte à rebours",
    icon: "clock",
    group: "more",
    desc: "Le prochain grand moment se rapproche.",
    props: {
      target: new Date(Date.now() + 3 * 86400000).toISOString(),
      text: "Le grand lancement approche.",
      doneText: "C’est parti !",
    },
  },
  pricing: {
    label: "Offre / tarif",
    icon: "pricing",
    group: "more",
    desc: "Une offre claire, sans astérisque.",
    props: {
      title: "Le bon départ",
      price: "Gratuit",
      period: "pour commencer",
      text: "Tous les essentiels\nAucune carte bancaire\nLiberté de personnalisation",
      buttonText: "Commencer",
      href: "#contact",
      featured: false,
      radius: 16,
    },
  },
  contact: {
    label: "Formulaire email",
    icon: "mail",
    group: "more",
    desc: "Prépare un email dans la messagerie du visiteur.",
    props: {
      title: "Parlons de votre idée.",
      email: "bonjour@example.com",
      subject: "Un nouveau projet à imaginer",
      buttonText: "Préparer mon message",
      notice:
        "Ce formulaire ouvre votre messagerie. Aucun message n’est envoyé par un serveur.",
    },
  },
  footer: {
    label: "Pied de page",
    icon: "navigation",
    group: "layout",
    desc: "La dernière impression compte aussi.",
    props: {
      brand: "alex.",
      text: "Des idées, du code et beaucoup de curiosité.",
      links:
        "GitHub|https://github.com/\nLinkedIn|https://linkedin.com/\nContact|mailto:bonjour@example.com",
      copyright: "© {year} — Tous droits réservés.",
      syncSite: true,
      paddingTop: 42,
      paddingBottom: 28,
      marginBottom: 0,
    },
  },
};
Object.assign(TYPES, STUDIO_TYPES);
TYPES.navigation.props = {
  ...TYPES.navigation.props,
  autoPages: false,
  syncSite: false,
  sticky: false,
};
TYPES.image.props.decorative = false;
TYPES.columns.props.tabletColumns = 2;
TYPES.columns.props.mobileColumns = 1;
TYPES.columns.props.reverseMobile = false;
GROUPS.splice(
  2,
  0,
  { id: "portfolio", label: "VOTRE UNIVERS" },
  { id: "media", label: "MÉDIAS & DÉMOS" },
);
const STUDIO_DEFAULTS = {
  headingFont: "sans",
  radius: 12,
  baseUrl: "",
  favicon: "",
  socialImage: "",
  customCSS: "",
  lang: "fr",
  backToTop: false,
};
const STUDIO_LICENSE =
  'MIT License\n\nCopyright (c) 2026 bloclibre contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n';
const STUDIO_SITE_CSS = "__BLOCLIBRE_STUDIO_SITE_CSS__";
const STUDIO_RUNTIME = "__BLOCLIBRE_STUDIO_RUNTIME__";
const PROJECT_SCOPE =
  location.pathname.replace(/index\.html$/i, "").replace(/\/$/, "") || "/";
const ACTIVE_KEY = `bloclibre.active.v2:${PROJECT_SCOPE}`;
const DB_NAME = "bloclibre-studio-v2";
const PAGE_LIMIT = 25;
let studioReady = false,
  studioStorage = null,
  studioSaving = 0,
  studioHasUnsaved = false,
  renderContext = null,
  previewPageId = null;
let blockClipboard = null,
  styleClipboard = null,
  sectionCategory = "all",
  assetPickerTarget = null,
  commandQuery = "",
  exportBusy = false;
const deepClone = (value) => JSON.parse(JSON.stringify(value));
function cleanText(value, max = 12000) {
  return String(value ?? "").slice(0, max);
}
function safeCss(value) {
  return cleanText(value, 100000)
    .replace(/<\/style/gi, "")
    .replace(/[<>]/g, "")
    .replace(/@import\s+[^;]+;?/gi, "");
}
function allBlocks(nodes) {
  return (nodes || []).flatMap((b) => [b, ...allBlocks(b.children)]);
}
function activePage(d = doc) {
  return d.pages?.find((p) => p.id === d.activePageId) || d.pages?.[0];
}
function pageFilename(p, d = doc) {
  return p.id === d.homePageId
    ? "index.html"
    : `${slug(p.slug || p.title)}.html`;
}
function pageDraft(title = "Nouvelle page", blocks = []) {
  return {
    id: uid(),
    title,
    slug: slug(title),
    description: "",
    seoTitle: "",
    inNavigation: true,
    published: true,
    noIndex: false,
    customCSS: "",
    blocks,
  };
}
function rekeyTree(b) {
  b.id = uid();
  b.children?.forEach(rekeyTree);
  return b;
}
function syncActivePage(d = doc) {
  if (!d.pages?.length) return;
  const p = activePage(d);
  p.blocks = d.blocks;
  p.description = d.description || "";
  d.shared ||= {};
  for (const type of ["navigation", "footer"]) {
    const item = d.blocks.find((b) => b.type === type && b.props.syncSite);
    if (item) d.shared[type] = deepClone(item);
    else delete d.shared[type];
    if (item)
      for (const page of d.pages) {
        if (page.id === p.id) continue;
        page.blocks = page.blocks.map((b) =>
          b.type === type && b.props.syncSite ? deepClone(item) : b,
        );
      }
  }
}
function snapshotProject() {
  syncActivePage();
  return doc;
}
function studioDocument(base) {
  const d = base;
  d.version = 2;
  d.id ||= uid();
  d.template ||= "blank";
  d.settings = { ...STUDIO_DEFAULTS, ...d.settings };
  d.assets ||= [];
  d.components ||= [];
  if (!d.pages?.length) {
    const p = pageDraft("Accueil", d.blocks || []);
    p.slug = "accueil";
    p.description = d.description || "";
    d.pages = [p];
    d.homePageId = p.id;
    d.activePageId = p.id;
  }
  if (!d.pages.some((p) => p.id === d.homePageId)) d.homePageId = d.pages[0].id;
  if (!d.pages.some((p) => p.id === d.activePageId))
    d.activePageId = d.homePageId;
  const p = activePage(d);
  d.blocks = p.blocks;
  d.description = p.description;
  return d;
}
function normalizeProject(raw) {
  if (!raw || typeof raw !== "object") throw new Error("Projet non reconnu.");
  if (raw.version === 1 && !raw.pages)
    return studioDocument(normalizeLegacyProject(raw));
  if (
    raw.version !== 2 ||
    !Array.isArray(raw.pages) ||
    !raw.pages.length ||
    raw.pages.length > PAGE_LIMIT
  )
    throw new Error(
      `Un projet Studio doit contenir entre 1 et ${PAGE_LIMIT} pages (version 2).`,
    );
  const settings = raw.settings || {};
  const normalized = normalizeLegacyProject({ ...raw, version: 1, blocks: [] });
  normalized.updatedAt = Number.isFinite(raw.updatedAt) ? raw.updatedAt : 0;
  normalized.version = 2;
  normalized.id = /^b-[a-z0-9-]{2,80}$/i.test(raw.id || "") ? raw.id : uid();
  normalized.template = cleanText(raw.template || "blank", 40);
  normalized.settings = {
    ...STUDIO_DEFAULTS,
    ...normalized.settings,
    headingFont: Object.hasOwn(FONTS, settings.headingFont)
      ? settings.headingFont
      : "sans",
    radius: clamp(settings.radius, 0, 48, 12),
    baseUrl: /^https?:\/\//i.test(settings.baseUrl || "")
      ? cleanText(settings.baseUrl, 1000)
      : "",
    favicon: settings.favicon ? safeImage(settings.favicon) : "",
    socialImage: settings.socialImage ? safeImage(settings.socialImage) : "",
    customCSS: safeCss(settings.customCSS),
    lang: ["fr", "en", "es", "de", "it"].includes(settings.lang)
      ? settings.lang
      : "fr",
    backToTop: !!settings.backToTop,
  };
  const ids = new Set(),
    slugs = new Set(["index", "404", "assets", "robots", "sitemap"]);
  normalized.pages = raw.pages.map((p, index) => {
    const page = pageDraft(cleanText(p.title || `Page ${index + 1}`, 80));
    if (/^b-[a-z0-9-]{2,80}$/i.test(p.id || "") && !ids.has(p.id))
      page.id = p.id;
    ids.add(page.id);
    let pageSlug = slug(
      cleanText(p.slug || p.title || `page-${index + 1}`, 80),
    );
    while (slugs.has(pageSlug)) pageSlug += "-2";
    slugs.add(pageSlug);
    page.slug = pageSlug;
    page.description = cleanText(p.description, 320);
    page.seoTitle = cleanText(p.seoTitle, 100);
    page.inNavigation = p.inNavigation !== false;
    page.published = p.published !== false;
    page.noIndex = !!p.noIndex;
    page.customCSS = safeCss(p.customCSS);
    page.blocks = normalizeLegacyProject({
      version: 1,
      blocks: p.blocks || [],
      settings: normalized.settings,
    }).blocks;
    return page;
  });
  normalized.homePageId = ids.has(raw.homePageId)
    ? raw.homePageId
    : normalized.pages[0].id;
  normalized.activePageId = ids.has(raw.activePageId)
    ? raw.activePageId
    : normalized.homePageId;
  normalized.pages.find((p) => p.id === normalized.homePageId).published = true;
  const resourceIds = new Set();
  const resourceId = (id) => {
    const key =
      /^b-[a-z0-9-]{2,80}$/i.test(id || "") && !resourceIds.has(id)
        ? id
        : uid();
    resourceIds.add(key);
    return key;
  };
  normalized.assets = (Array.isArray(raw.assets) ? raw.assets : [])
    .slice(0, 150)
    .map((a) => ({
      id: resourceId(a.id),
      name: cleanText(a.name || "Image", 100),
      src: safeImage(cleanText(a.src, 14000000)),
      alt: cleanText(a.alt, 500),
    }));
  normalized.components = (Array.isArray(raw.components) ? raw.components : [])
    .slice(0, 60)
    .map((c) => ({
      id: resourceId(c.id),
      name: cleanText(c.name || "Composant", 80),
      block: normalizeLegacyProject({ version: 1, blocks: [c.block] })
        .blocks[0],
    }));
  return studioDocument(normalized);
}
const legacyStarter = starter;
starter = createStudioModel;
function artSvg(kind = "orbit", a = "#d9edb6", b = "#b7bded") {
  const picture =
    kind === "portrait"
      ? `<circle cx="400" cy="260" r="167" fill="${a}"/><circle cx="400" cy="220" r="77" fill="#f3ccb1"/><path d="M319 215q0-124 98-93 67 15 64 107-43-66-122-31-21 11-40 17Z" fill="#263c33"/><path d="M252 470q8-175 148-175t148 175Z" fill="${b}"/><path d="m371 294 29 45 28-45" fill="#f3ccb1"/>`
      : `<rect x="76" y="72" width="648" height="376" rx="22" fill="#ffffff" fill-opacity=".7"/><path d="M76 119h648" stroke="#25332d" stroke-opacity=".08"/><g fill="#25332d" opacity=".18"><circle cx="101" cy="96" r="5"/><circle cx="120" cy="96" r="5"/><circle cx="139" cy="96" r="5"/></g><rect x="108" y="151" width="175" height="265" rx="13" fill="#25332d"/><g fill="${a}"><rect x="130" y="177" width="107" height="8" rx="4"/><rect x="130" y="211" width="76" height="6" rx="3" opacity=".45"/><rect x="130" y="235" width="91" height="6" rx="3" opacity=".3"/></g><rect x="309" y="151" width="181" height="119" rx="12" fill="${a}"/><rect x="509" y="151" width="182" height="119" rx="12" fill="${b}"/><path d="m330 242 25-31 28 15 29-46 28 25 29-20" fill="none" stroke="#25332d" stroke-width="5" stroke-linecap="round"/><circle cx="601" cy="211" r="37" fill="none" stroke="#ffffff" stroke-width="14"/><path d="M601 174a37 37 0 0 1 37 37" fill="none" stroke="#25332d" stroke-width="14"/><rect x="309" y="289" width="382" height="127" rx="12" fill="#f0f1e9"/><path d="M332 389q54-102 100-48t100-5 136-11" fill="none" stroke="${b}" stroke-width="5"/><path d="M332 388q54-48 100-17t100-19 136 20" fill="none" stroke="#63795b" stroke-width="4"/>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520"><defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#263c33" opacity=".07"/></pattern></defs><rect width="800" height="520" rx="25" fill="${kind === "portrait" ? "#ebe9dc" : a}"/><rect width="800" height="520" fill="url(#dots)"/>${picture}<path d="m690 404 8 18 20 3-16 13 3 21-18-10-18 10 3-21-16-13 20-3Z" fill="#d97851"/></svg>`)}`;
}
const STUDIO_ART = {
  mint: artSvg("orbit", "#d7eab5", "#b6bdeb"),
  lavender: artSvg("orbit", "#e4ddf5", "#eaa37f"),
  peach: artSvg("orbit", "#f5d9c4", "#b5cbb6"),
  portrait: artSvg("portrait", "#cbdba5", "#b7bdec"),
};
function sec(name, children, props = {}) {
  return block(
    "section",
    { name, paddingTop: 76, paddingBottom: 76, ...props },
    children,
  );
}
function cols(children, count = children.length, props = {}) {
  return block(
    "columns",
    { count, gap: 26, ...props },
    children.map((c) =>
      block(
        "section",
        { paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
        Array.isArray(c) ? c : [c],
      ),
    ),
  );
}
function btns(
  primary = "Voir mes projets  ↗",
  href = "projets.html",
  secondary = "Faisons connaissance",
  secondaryHref = "contact.html",
) {
  return block("buttons", { gap: 12, marginBottom: 0 }, [
    block("button", { text: primary, href, marginBottom: 0, radius: 8 }),
    block("button", {
      text: secondary,
      href: secondaryHref,
      variant: "outline",
      marginBottom: 0,
      radius: 8,
    }),
  ]);
}
function headline(kicker, title, text, align = "left") {
  return [
    block("badge", { text: kicker, align, marginBottom: 23 }),
    block("heading", {
      text: title,
      level: 1,
      fontSize: 68,
      letterSpacing: -3.1,
      lineHeight: 1.04,
      align,
      marginBottom: 24,
      mobileCustom: true,
      mobileFontSize: 42,
      mobilePaddingTop: 0,
      mobilePaddingBottom: 0,
      mobilePaddingX: 0,
    }),
    block("paragraph", {
      text,
      fontSize: 17,
      maxWidth: 640,
      align,
      color: "",
      opacity: 68,
      marginBottom: 30,
    }),
  ];
}
function createStudioModel(name = "personal") {
  if (["atelier", "portfolio", "launch"].includes(name)) {
    const d = studioDocument(legacyStarter(name));
    d.template = name;
    return d;
  }
  const d = baseDocument();
  d.title =
    name === "hackathon"
      ? "Pulse · Hackathon"
      : name === "saas"
        ? "Orbit · Produit"
        : name === "blank"
          ? "Nouveau site"
          : "Alex · Portfolio";
  d.settings = {
    ...d.settings,
    ...STUDIO_DEFAULTS,
    background: "#fafaf5",
    text: "#27372d",
    accent: "#38684c",
    width: 1080,
  };
  d.template = name;
  if (name === "blank") return studioDocument(d);
  const nav = () =>
    block("navigation", {
      brand:
        name === "hackathon" ? "pulse_" : name === "saas" ? "orbit." : "alex.",
      autoPages: true,
      syncSite: true,
      sticky: false,
      paddingTop: 24,
      paddingBottom: 24,
    });
  const footer = () =>
    block("footer", {
      brand:
        name === "hackathon" ? "pulse_" : name === "saas" ? "orbit." : "alex.",
      background: name === "hackathon" ? "#0e1720" : "#eef1e8",
      text:
        name === "hackathon"
          ? "Construit en équipe. Partagé avec le monde."
          : "Toujours partant pour une belle idée.",
      links:
        "GitHub|https://github.com/\nLinkedIn|https://linkedin.com/\nÉcrivez-moi|mailto:bonjour@example.com",
    });
  const project = (title, src, category = "DESIGN & DÉVELOPPEMENT") =>
    block("project", {
      title,
      src,
      category,
      href: "projets.html",
      text: "Un projet imaginé, prototypé et construit avec attention. À personnaliser avec votre histoire.",
      tags: "Design, Développement, Open source",
    });
  let pages = [];
  if (name === "hackathon") {
    d.settings = {
      ...d.settings,
      background: "#111c25",
      text: "#edf5e6",
      accent: "#c4ed8b",
    };
    pages = [
      pageDraft("Le projet", [
        nav(),
        sec(
          "Le pitch",
          [
            ...headline(
              "HACKATHON · BUILD SOMETHING THAT MATTERS",
              "Une petite équipe.\nUne grande idée.",
              "Pulse transforme les bonnes intentions en actions collectives. Un prototype open source, construit pour faire la différence.",
              "center",
            ),
            block("buttons", { align: "center", marginBottom: 0 }, [
              block("button", {
                text: "Tester la démo  ↗",
                href: "demo.html",
                radius: 30,
              }),
              block("button", {
                text: "Explorer le code",
                href: "https://github.com/",
                variant: "outline",
                radius: 30,
              }),
            ]),
          ],
          { paddingTop: 70, paddingBottom: 58, anchor: "projet" },
        ),
        sec(
          "La solution",
          [
            block("image", {
              src: STUDIO_ART.mint,
              alt: "Illustration du tableau de bord du projet Pulse",
              height: 410,
              radius: 20,
              marginBottom: 40,
            }),
            cols(
              [
                block("stat", {
                  value: "48",
                  suffix: "h",
                  text: "pour faire émerger la solution",
                }),
                block("stat", {
                  value: "4",
                  suffix: "",
                  text: "talents complémentaires",
                }),
                block("stat", {
                  value: "100",
                  suffix: "%",
                  text: "du code ouvert et partageable",
                }),
              ],
              3,
            ),
          ],
          { paddingTop: 0, paddingBottom: 75 },
        ),
        sec(
          "Le pourquoi",
          [
            block("badge", { text: "LE PROBLÈME, EN CLAIR" }),
            block("heading", {
              text: "Moins de friction.\nPlus d’action.",
              fontSize: 50,
            }),
            cols(
              [
                [
                  block("paragraph", {
                    text: "Nous avons observé un problème très concret : les projets locaux manquent de moyens simples pour rassembler les bonnes personnes.",
                    fontSize: 18,
                    opacity: 75,
                  }),
                  block("paragraph", {
                    text: "Notre réponse : un outil accessible qui relie des besoins, des compétences et une envie commune d’agir.",
                    opacity: 65,
                  }),
                ],
                [block("tabs", {})],
              ],
              2,
            ),
          ],
          { background: "#192833" },
        ),
        sec("Les essentiels", [
          block("heading", {
            text: "Petit prototype,\ngrandes possibilités.",
            align: "center",
            fontSize: 46,
            marginBottom: 40,
          }),
          cols(
            [
              block("card", {
                symbol: "↗",
                title: "Simple à prendre en main",
                text: "Une action utile dès les premières secondes.",
                background: "#20312d",
              }),
              block("card", {
                symbol: "◎",
                title: "Conçu pour le terrain",
                text: "Un besoin réel, des retours concrets et une approche accessible.",
                background: "#253042",
              }),
              block("card", {
                symbol: "✳",
                title: "Pensé pour grandir",
                text: "Un socle open source que chacun peut améliorer.",
                background: "#332d29",
              }),
            ],
            3,
          ),
        ]),
        sec(
          "Le prochain rendez-vous",
          [
            block("heading", {
              text: "Le prochain grand moment.",
              align: "center",
              fontSize: 42,
            }),
            block("countdown", { align: "center" }),
          ],
          { background: "#1c2b28" },
        ),
        footer(),
      ]),
      pageDraft("L’équipe", [
        nav(),
        sec("Le collectif", [
          ...headline(
            "LES GENS DERRIÈRE LES IDÉES",
            "Quatre regards.\nUne même énergie.",
            "Remplacez ces profils par votre équipe, vos rôles et les liens vers vos portfolios.",
          ),
          cols(
            [
              block("card", {
                symbol: "◈",
                title: "Alex · Développement",
                text: "Architecture, interface et la petite touche de code en plus.",
                background: "#223329",
              }),
              block("card", {
                symbol: "✳",
                title: "Sam · Design",
                text: "Du premier croquis au dernier pixel.",
                background: "#293043",
              }),
              block("card", {
                symbol: "◎",
                title: "Charlie · Produit",
                text: "Le bon problème, les bons utilisateurs, la bonne direction.",
                background: "#342e2b",
              }),
            ],
            3,
          ),
        ]),
        sec("Notre parcours", [
          block("heading", { text: "De l’idée à la démo.", fontSize: 46 }),
          block("timeline", {
            text: "Jour 1 · Matin|Comprendre|Définir le problème et écouter les besoins.\nJour 1 · Après-midi|Prototyper|Mettre rapidement une première solution entre les mains des utilisateurs.\nJour 2|Construire & présenter|Finaliser le MVP, documenter et raconter ce que l’on a appris.",
          }),
        ]),
        footer(),
      ]),
      pageDraft("Démo", [
        nav(),
        sec("Démonstration", [
          ...headline(
            "MONTREZ, NE RACONTEZ PAS",
            "Le projet,\nen action.",
            "Ajoutez une vidéo de démonstration ou un lien vers votre application. Aucun service payant n’est nécessaire.",
          ),
          block("embed", { title: "Votre vidéo de démonstration", href: "" }),
          block("button", {
            text: "Ouvrir le dépôt du projet  ↗",
            href: "https://github.com/",
            marginTop: 24,
          }),
        ]),
        sec("Questions fréquentes", [
          block("heading", {
            text: "Pour aller un peu plus loin.",
            fontSize: 42,
          }),
          block("faq", {}),
        ]),
        footer(),
      ]),
    ];
    pages[0].slug = "projet";
    pages[1].slug = "equipe";
    pages[2].slug = "demo";
  } else if (name === "saas") {
    d.settings = {
      ...d.settings,
      accent: "#6359bd",
      background: "#fcfbff",
      text: "#2d2942",
    };
    pages = [
      pageDraft("Accueil", [
        nav(),
        sec("Hero produit", [
          ...headline(
            "UN OUTIL SIMPLE POUR VOS GRANDES IDÉES",
            "Moins de dispersion.\nPlus de progression.",
            "Orbit rassemble vos projets, vos prochaines étapes et votre équipe dans un espace pensé pour avancer.",
            "center",
          ),
          block("buttons", { align: "center" }, [
            block("button", {
              text: "Découvrir le produit  ↗",
              href: "fonctionnalites.html",
            }),
            block("button", {
              text: "Nous écrire",
              href: "contact.html",
              variant: "outline",
            }),
          ]),
          block("image", {
            src: STUDIO_ART.lavender,
            alt: "Illustration de l’interface du produit Orbit",
            height: 400,
            marginTop: 45,
            radius: 20,
          }),
        ]),
        sec("Bénéfices", [
          cols([
            block("card", {
              symbol: "✳",
              title: "Gardez le cap",
              text: "Une vue d’ensemble claire, sans surcharge.",
              background: "#f0edf9",
            }),
            block("card", {
              symbol: "↗",
              title: "Avancez ensemble",
              text: "Le bon contexte pour la bonne personne.",
              background: "#edf1ea",
            }),
            block("card", {
              symbol: "◎",
              title: "Restez libre",
              text: "Des données portables et une approche ouverte.",
              background: "#fbefe6",
            }),
          ]),
        ]),
        footer(),
      ]),
      pageDraft("Fonctionnalités", [
        nav(),
        sec("Les détails", [
          ...headline(
            "LE BON ÉQUILIBRE",
            "Tout ce qu’il faut.\nRien de trop.",
            "Présentez votre proposition de valeur avec des exemples concrets.",
          ),
          block("tabs", {}),
          block("spacer", { height: 35 }),
          cols(
            [
              block("pricing", {
                title: "Découverte",
                price: "Gratuit",
                period: "sans limite de temps",
              }),
              block("pricing", {
                title: "Sur mesure",
                price: "Parlons-en",
                period: "une offre adaptée à votre projet",
                featured: true,
              }),
            ],
            2,
          ),
        ]),
        footer(),
      ]),
      pageDraft("Contact", [
        nav(),
        sec("Contact", [
          ...headline(
            "UN PROJET EN TÊTE ?",
            "On en parle ?",
            "Personnalisez votre adresse email dans le bloc de contact.",
          ),
          block("contact", {}),
        ]),
        footer(),
      ]),
    ];
  } else {
    pages = [
      pageDraft("Accueil", [
        nav(),
        sec(
          "Première impression",
          [
            cols(
              [
                [
                  ...headline(
                    "DÉVELOPPEUR CRÉATIF · MARSEILLE",
                    "Curieux par nature.\nCréatif par choix.",
                    "Je transforme des idées en expériences web utiles, accessibles et un peu singulières. Bienvenue dans mon petit coin d’internet.",
                  ),
                  btns(),
                ],
                [
                  block("image", {
                    src: STUDIO_ART.portrait,
                    alt: "Portrait illustré à remplacer par votre photo",
                    height: 455,
                    radius: 22,
                    marginBottom: 0,
                  }),
                ],
              ],
              2,
              { gap: 50, verticalAlign: "center" },
            ),
          ],
          { paddingTop: 62, paddingBottom: 72, anchor: "bonjour" },
        ),
        sec(
          "En quelques mots",
          [
            cols(
              [
                block("stat", {
                  value: "12",
                  suffix: "+",
                  text: "idées devenues des projets",
                }),
                block("stat", {
                  value: "3",
                  suffix: "",
                  text: "hackathons, beaucoup d’apprentissages",
                }),
                block("stat", {
                  value: "∞",
                  suffix: "",
                  text: "curiosité et envie de créer",
                }),
              ],
              3,
            ),
          ],
          { paddingTop: 30, paddingBottom: 58 },
        ),
        sec(
          "Projets à la une",
          [
            block("badge", { text: "QUELQUES EXPLORATIONS" }),
            block("heading", {
              text: "Du premier croquis\nau dernier commit.",
              fontSize: 48,
              letterSpacing: -2,
              marginBottom: 32,
            }),
            cols(
              [
                project("Agora — reconnecter les idées", STUDIO_ART.mint),
                project("Focus — faire de la place", STUDIO_ART.lavender),
              ],
              2,
            ),
            block("button", {
              text: "Tous les projets  ↗",
              href: "projets.html",
              variant: "outline",
              marginTop: 25,
            }),
          ],
          { background: "#f0f2e9" },
        ),
        sec("La prochaine belle idée", [
          block("badge", {
            text: "DISPONIBLE POUR COLLABORER",
            align: "center",
          }),
          block("heading", {
            text: "Et si l’on construisait\nquelque chose ensemble ?",
            fontSize: 48,
            align: "center",
            letterSpacing: -2,
          }),
          block("button", {
            text: "Faisons connaissance  ↗",
            href: "contact.html",
            align: "center",
            marginTop: 15,
          }),
        ]),
        footer(),
      ]),
      pageDraft("Projets", [
        nav(),
        sec("Mes projets", [
          ...headline(
            "LE GOÛT DE FAIRE",
            "Quelques idées\ndevenues réalité.",
            "Des projets personnels, des expériences collectives et des choses apprises en chemin. Remplacez ces exemples par vos réalisations.",
          ),
          cols(
            [
              project("Agora — reconnecter les idées", STUDIO_ART.mint),
              project("Focus — faire de la place", STUDIO_ART.lavender),
            ],
            2,
          ),
          block("spacer", { height: 24 }),
          cols(
            [
              project(
                "Terra — penser demain",
                STUDIO_ART.peach,
                "HACKATHON · OPEN SOURCE",
              ),
              project("Atelier — un espace à soi", ART, "IDENTITÉ & SITE WEB"),
            ],
            2,
          ),
        ]),
        footer(),
      ]),
      pageDraft("À propos", [
        nav(),
        sec("À propos", [
          cols(
            [
              [
                block("image", {
                  src: STUDIO_ART.portrait,
                  alt: "Votre portrait à personnaliser",
                  height: 470,
                  radius: 20,
                }),
              ],
              [
                ...headline(
                  "DERRIÈRE L’ÉCRAN",
                  "Bonjour,\nmoi c’est Alex.",
                  "J’aime comprendre comment les choses fonctionnent, puis imaginer comment les rendre plus simples, plus belles et plus utiles.",
                ),
                block("paragraph", {
                  text: "Ce site est mon terrain d’expérimentation. J’y partage ce que je construis, ce que j’apprends et les projets auxquels j’ai envie de donner vie.",
                  opacity: 70,
                }),
                block("social", {}),
              ],
            ],
            2,
            { gap: 52, verticalAlign: "center" },
          ),
        ]),
        sec(
          "Compétences",
          [
            block("heading", {
              text: "Une boîte à outils\ntoujours en mouvement.",
              fontSize: 45,
            }),
            block("skills", { variant: "bars" }),
          ],
          { background: "#f0f2e9" },
        ),
        sec("Parcours", [
          block("heading", { text: "Le chemin compte aussi.", fontSize: 43 }),
          block("timeline", {}),
        ]),
        footer(),
      ]),
      pageDraft("Contact", [
        nav(),
        sec("Premier contact", [
          ...headline(
            "UN BONJOUR, ÇA PEUT TOUT CHANGER",
            "Les belles idées\ncommencent ici.",
            "Un projet, une question ou simplement l’envie d’échanger ? Écrivez-moi, je vous répondrai avec plaisir.",
          ),
          cols(
            [
              [block("contact", {})],
              [
                block("card", {
                  symbol: "↗",
                  title: "Plutôt en direct ?",
                  text: "Remplacez les liens ci-dessous par vos profils et votre adresse email.",
                  background: "#edf1e6",
                }),
                block("social", {}),
              ],
            ],
            2,
            { gap: 50 },
          ),
        ]),
        footer(),
      ]),
    ];
    pages[2].slug = "a-propos";
  }
  for (const p of pages)
    p.description = `${p.title} — ${d.title}. Découvrez mes projets, mon parcours et ma façon de créer pour le web.`;
  d.pages = pages;
  d.homePageId = pages[0].id;
  d.activePageId = pages[0].id;
  return studioDocument(d);
}
const SECTION_RECIPES = [
  {
    id: "hero-split",
    category: "hero",
    label: "Une première impression",
    desc: "Titre, texte, deux actions et visuel",
    kind: "split",
    make: () =>
      sec("Hero créatif", [
        cols(
          [
            [
              ...headline(
                "UNE NOUVELLE HISTOIRE À ÉCRIRE",
                "Une belle idée\nmérite sa place.",
                "Présentez ce que vous faites, pour qui et pourquoi cela compte.",
              ),
              btns("Découvrir  ↗", "#projets", "Parlons-en", "#contact"),
            ],
            [
              block("image", {
                src: STUDIO_ART.mint,
                alt: "Illustration de votre projet",
                height: 420,
                radius: 20,
              }),
            ],
          ],
          2,
          { gap: 45, verticalAlign: "center" },
        ),
      ]),
  },
  {
    id: "hero-center",
    category: "hero",
    label: "Le grand titre",
    desc: "Une promesse claire et directe",
    kind: "center",
    make: () =>
      sec("Hero centré", [
        ...headline(
          "FAIT POUR LES IDÉES AMBITIEUSES",
          "Petit départ.\nGrandes possibilités.",
          "Une phrase simple pour expliquer la valeur de votre projet.",
          "center",
        ),
        block("button", {
          text: "Découvrir le projet  ↗",
          href: "#projets",
          align: "center",
        }),
      ]),
  },
  {
    id: "projects",
    category: "portfolio",
    label: "Projets à la une",
    desc: "Deux réalisations, côte à côte",
    kind: "cards",
    make: () =>
      sec(
        "Mes projets",
        [
          block("badge", { text: "SÉLECTION DE PROJETS" }),
          block("heading", {
            text: "Des idées mises en pratique.",
            fontSize: 46,
            marginBottom: 30,
          }),
          cols(
            [
              block("project", {
                src: STUDIO_ART.mint,
                title: "Votre premier projet",
                href: "#",
                alt: "Aperçu du premier projet",
              }),
              block("project", {
                src: STUDIO_ART.lavender,
                title: "Votre prochaine belle idée",
                href: "#",
                alt: "Aperçu du second projet",
              }),
            ],
            2,
          ),
        ],
        { anchor: "projets" },
      ),
  },
  {
    id: "about",
    category: "portfolio",
    label: "Un peu de vous",
    desc: "Votre histoire et votre portrait",
    kind: "split",
    make: () =>
      sec(
        "À propos",
        [
          cols(
            [
              block("image", {
                src: STUDIO_ART.portrait,
                alt: "Votre portrait",
                height: 370,
                radius: 22,
              }),
              [
                block("badge", { text: "DERRIÈRE LE PROJET" }),
                block("heading", {
                  text: "L’envie de faire\nles choses autrement.",
                  fontSize: 44,
                }),
                block("paragraph", {
                  text: "Racontez votre histoire, ce qui vous anime et ce que vous apportez de singulier.",
                  opacity: 70,
                }),
                block("social", {}),
              ],
            ],
            2,
            { gap: 48, verticalAlign: "center" },
          ),
        ],
        { anchor: "apropos" },
      ),
  },
  {
    id: "skills",
    category: "portfolio",
    label: "La boîte à outils",
    desc: "Compétences, technologies et talents",
    kind: "tags",
    make: () =>
      sec("Compétences", [
        block("badge", { text: "DES IDÉES AUX OUTILS" }),
        block("heading", {
          text: "Apprendre. Tester. Construire.",
          fontSize: 44,
        }),
        block("skills", {}),
      ]),
  },
  {
    id: "timeline",
    category: "portfolio",
    label: "Votre parcours",
    desc: "Les moments qui vous ont fait grandir",
    kind: "lines",
    make: () =>
      sec("Mon parcours", [
        block("heading", { text: "Une aventure en mouvement.", fontSize: 44 }),
        block("timeline", {}),
      ]),
  },
  {
    id: "features",
    category: "hackathon",
    label: "Trois bonnes raisons",
    desc: "Les bénéfices clés du projet",
    kind: "three",
    make: () =>
      sec("Les bénéfices", [
        block("badge", { text: "SIMPLE, MAIS PAS SIMPLISTE", align: "center" }),
        block("heading", {
          text: "Pensé pour faire la différence.",
          fontSize: 44,
          align: "center",
          marginBottom: 35,
        }),
        cols(
          [
            block("card", {
              symbol: "✳",
              title: "Facile à utiliser",
              text: "Un premier résultat utile en quelques instants.",
              background: "#f0f3e8",
            }),
            block("card", {
              symbol: "↗",
              title: "Fait pour avancer",
              text: "Moins d’obstacles entre l’idée et l’action.",
              background: "#f5ece5",
            }),
            block("card", {
              symbol: "◎",
              title: "Ouvert par nature",
              text: "Un socle libre que l’on peut s’approprier.",
              background: "#eaedf1",
            }),
          ],
          3,
        ),
      ]),
  },
  {
    id: "stats",
    category: "hackathon",
    label: "L’essentiel en chiffres",
    desc: "Trois chiffres qui marquent les esprits",
    kind: "stats",
    make: () =>
      sec(
        "En chiffres",
        [
          cols(
            [
              block("stat", {
                value: "48",
                suffix: "h",
                text: "pour construire le premier prototype",
              }),
              block("stat", {
                value: "4",
                suffix: "",
                text: "regards complémentaires",
              }),
              block("stat", { value: "100", suffix: "%", text: "open source" }),
            ],
            3,
          ),
        ],
        { background: "" },
      ),
  },
  {
    id: "pitch",
    category: "hackathon",
    label: "Du problème à la solution",
    desc: "Un pitch facile à comprendre",
    kind: "split",
    make: () =>
      sec("Le pitch", [
        cols(
          [
            [
              block("badge", { text: "LE PROBLÈME" }),
              block("heading", {
                text: "Une friction bien réelle.",
                fontSize: 37,
              }),
              block("paragraph", {
                text: "Décrivez un problème concret et les personnes concernées. Une phrase claire vaut mieux que beaucoup de jargon.",
              }),
            ],
            [
              block("badge", { text: "NOTRE RÉPONSE" }),
              block("heading", {
                text: "Une solution qui fait sens.",
                fontSize: 37,
              }),
              block("paragraph", {
                text: "Expliquez votre approche, ce qui la rend différente et le bénéfice qu’on peut en attendre.",
              }),
            ],
          ],
          2,
          { gap: 45 },
        ),
      ]),
  },
  {
    id: "team",
    category: "hackathon",
    label: "L’équipe derrière l’idée",
    desc: "Des talents qui se complètent",
    kind: "three",
    make: () =>
      sec(
        "L’équipe",
        [
          block("heading", {
            text: "Des personnes,\npas seulement des profils.",
            fontSize: 45,
            align: "center",
            marginBottom: 35,
          }),
          cols(
            [
              block("card", {
                symbol: "◈",
                title: "Votre prénom · Dev",
                text: "Un rôle, une spécialité et une petite touche personnelle.",
              }),
              block("card", {
                symbol: "✳",
                title: "Votre prénom · Design",
                text: "Un rôle, une spécialité et une petite touche personnelle.",
              }),
              block("card", {
                symbol: "◎",
                title: "Votre prénom · Produit",
                text: "Un rôle, une spécialité et une petite touche personnelle.",
              }),
            ],
            3,
          ),
        ],
        { anchor: "equipe" },
      ),
  },
  {
    id: "demo",
    category: "hackathon",
    label: "La démo en action",
    desc: "Vidéo chargée au clic uniquement",
    kind: "video",
    make: () =>
      sec(
        "Démonstration",
        [
          block("badge", { text: "SHOW, DON’T TELL", align: "center" }),
          block("heading", {
            text: "Le projet, en action.",
            fontSize: 46,
            align: "center",
            marginBottom: 30,
          }),
          block("embed", { title: "Votre démo vidéo" }),
        ],
        { anchor: "demo" },
      ),
  },
  {
    id: "countdown",
    category: "hackathon",
    label: "Le prochain rendez-vous",
    desc: "Un vrai compte à rebours dynamique",
    kind: "stats",
    make: () =>
      sec("Le grand rendez-vous", [
        block("heading", {
          text: "Ça se rapproche.",
          fontSize: 46,
          align: "center",
        }),
        block("countdown", { align: "center" }),
      ]),
  },
  {
    id: "faq",
    category: "content",
    label: "Les bonnes réponses",
    desc: "Un accordéon accessible et natif",
    kind: "lines",
    make: () =>
      sec("Questions fréquentes", [
        block("badge", { text: "POUR ALLER UN PEU PLUS LOIN" }),
        block("heading", {
          text: "On répond à vos questions.",
          fontSize: 44,
          marginBottom: 30,
        }),
        block("faq", {}),
      ]),
  },
  {
    id: "testimonial",
    category: "content",
    label: "Une voix qui compte",
    desc: "Un témoignage à mettre en lumière",
    kind: "quote",
    make: () =>
      sec("Témoignage", [
        block("quote", {
          text: "Une belle énergie, des idées claires et le souci de bien faire. Exactement ce qu’il fallait à notre projet.",
          author: "Votre client · Votre projet",
          fontSize: 34,
          maxWidth: 760,
          align: "center",
        }),
      ]),
  },
  {
    id: "pricing",
    category: "content",
    label: "Deux offres, tout simplement",
    desc: "Des tarifs lisibles et personnalisables",
    kind: "cards",
    make: () =>
      sec(
        "Les offres",
        [
          block("heading", {
            text: "Le bon format pour votre projet.",
            fontSize: 43,
            align: "center",
            marginBottom: 30,
          }),
          cols(
            [
              block("pricing", {}),
              block("pricing", {
                title: "Sur mesure",
                price: "Parlons-en",
                period: "une approche adaptée à vos besoins",
                featured: true,
              }),
            ],
            2,
          ),
        ],
        { anchor: "offres" },
      ),
  },
  {
    id: "contact",
    category: "content",
    label: "Le début d’une conversation",
    desc: "Un contact email sans service tiers",
    kind: "split",
    make: () =>
      sec(
        "Contact",
        [
          cols(
            [
              [
                block("badge", { text: "LA SUITE S’ÉCRIT ENSEMBLE" }),
                block("heading", {
                  text: "Et si on en parlait ?",
                  fontSize: 47,
                }),
                block("paragraph", {
                  text: "Ajoutez votre adresse email au formulaire et vos liens de contact ci-dessous.",
                }),
                block("social", {}),
              ],
              [block("contact", {})],
            ],
            2,
            { gap: 48 },
          ),
        ],
        { anchor: "contact" },
      ),
  },
  {
    id: "cta",
    category: "content",
    label: "Une invitation à agir",
    desc: "Un dernier mot et un bouton",
    kind: "center",
    make: () =>
      sec(
        "Passer à l’action",
        [
          block("heading", {
            text: "Votre prochaine belle idée\ncommence maintenant.",
            align: "center",
            fontSize: 47,
          }),
          block("button", {
            text: "Donnons-lui vie  ↗",
            href: "#contact",
            align: "center",
            marginTop: 15,
          }),
        ],
        { background: "#eaf0df" },
      ),
  },
];
