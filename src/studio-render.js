/* Moteur de rendu Studio : un seul rendu pour l’édition, l’aperçu et la publication. */
const coreBlockStyle = blockStyle;
blockStyle = function (p) {
  const shadows = {
    none: "none",
    soft: "0 8px 28px #1633240b",
    medium: "0 16px 45px #16332416",
    large: "0 25px 75px #10271a22",
  };
  let css = coreBlockStyle(p);
  if (p.paddingX)
    css += `padding-left:${clamp(p.paddingX, 0, 300)}px;padding-right:${clamp(p.paddingX, 0, 300)}px;`;
  if (p.minHeight) css += `min-height:${clamp(p.minHeight, 0, 1200)}px;`;
  if (p.boxRadius) css += `border-radius:${clamp(p.boxRadius, 0, 150)}px;`;
  if (p.borderWidth)
    css += `border:${clamp(p.borderWidth, 0, 20)}px solid ${color(p.borderColor, "#dce2d6")};`;
  if (shadows[p.shadow] && p.shadow !== "none")
    css += `box-shadow:${shadows[p.shadow]};`;
  if (p.opacity !== undefined && p.opacity !== 100)
    css += `opacity:${clamp(p.opacity, 0, 100, 100) / 100};`;
  if (p.gradient)
    css += `background:linear-gradient(${clamp(p.gradientAngle, 0, 360, 135)}deg,${color(p.gradientStart, "#e7f1db")},${color(p.gradientEnd, "#f9f5ec")});`;
  if (p.backgroundImage) {
    const src = safeImage(p.backgroundImage).replace(
      /["\\\n\r]/g,
      (c) => "\\" + c,
    );
    css += `background-image:linear-gradient(#000000${Math.round(
      clamp(p.overlay, 0, 90) * 2.55,
    )
      .toString(16)
      .padStart(2, "0")},#000000${Math.round(clamp(p.overlay, 0, 90) * 2.55)
      .toString(16)
      .padStart(
        2,
        "0",
      )}),url("${src}");background-size:cover;background-position:center;`;
  }
  return css;
};
function renderLines(text) {
  return String(text || "")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("|").map((s) => s.trim()));
}
function parsedGallery(p) {
  return renderLines(p.images).map(([src, alt, caption]) => ({
    src: safeImage(src),
    alt: alt || "",
    caption: caption || "",
  }));
}
function validSiteBase(raw) {
  try {
    const url = new URL(String(raw));
    if (!["http:", "https:"].includes(url.protocol)) return "";
    url.hash = "";
    url.search = "";
    return url.href.replace(/\/?$/, "/");
  } catch (error) {
    return "";
  }
}
function embeddedUrl(raw) {
  try {
    const url = new URL(raw);
    if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtu.be",
        "www.youtube-nocookie.com",
      ].includes(url.hostname)
    ) {
      const id =
        url.hostname === "youtu.be"
          ? url.pathname.slice(1)
          : url.searchParams.get("v") || url.pathname.split("/").at(-1);
      if (/^[a-z0-9_-]{11}$/i.test(id || ""))
        return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (
      ["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)
    ) {
      const id = url.pathname.split("/").filter(Boolean).at(-1);
      if (/^\d{4,15}$/.test(id || ""))
        return `https://player.vimeo.com/video/${id}`;
    }
  } catch (error) {}
  return "";
}
const coreRenderBlock = renderBlock;
renderBlock = function (b, editor = false, root = false) {
  const p = b.props,
    site = renderContext?.site || doc,
    page = renderContext?.page || activePage(site);
  const editable = (key) =>
    editor
      ? ` contenteditable="true" spellcheck="false" data-edit="${key}"`
      : "";
  const value = (key) => `<span${editable(key)}>${esc(p[key])}</span>`;
  const wrap = (tag, inner, styles = "", attrs = "") =>
    `<${tag} class="bl-block bl-${b.type}${root ? " bl-root" : ""}"${p.anchor ? ` id="${esc(p.anchor.replace(/[^a-z0-9_-]/gi, ""))}"` : ""}${editor ? ` data-block-id="${b.id}" data-block-label="${esc(TYPES[b.type].label)}"` : ""} style="${esc(blockStyle(p) + styles)}"${attrs}>${inner}</${tag}>`;
  let html = "";
  switch (b.type) {
    case "badge":
      html = wrap(
        "div",
        `<span class="bl-badge-inner bl-badge-${p.variant === "outline" ? "outline" : "soft"}">${value("text")}</span>`,
        `font-size:${clamp(p.fontSize, 8, 24, 11)}px;`,
      );
      break;
    case "buttons":
      html = wrap(
        "div",
        (b.children || []).map((c) => renderBlock(c, editor)).join("\n") ||
          (editor
            ? '<div class="bl-empty-container">Ajoutez vos boutons ici.</div>'
            : ""),
        `gap:${clamp(p.gap, 0, 80, 12)}px;justify-content:${p.align === "center" ? "center" : p.align === "right" ? "flex-end" : "flex-start"};`,
      );
      break;
    case "navigation": {
      const links =
        p.autoPages && site.pages
          ? site.pages
              .filter((pg) => pg.inNavigation && (pg.published || editor))
              .map((pg) => ({
                label: pg.title,
                href: pageFilename(pg, site),
                id: pg.id,
              }))
          : renderLines(p.text).map(([label, href]) => ({
              label,
              href: safeUrl(href),
            }));
      const menuId = `menu-${b.id}`;
      html = wrap(
        "header",
        `<div class="bl-nav-inner"><a class="bl-nav-brand" href="index.html" style="font-size:${clamp(p.fontSize, 14, 50, 24)}px">${value("brand")}</a><button class="bl-nav-toggle" type="button" data-bl-menu aria-expanded="false" aria-controls="${menuId}" aria-label="Ouvrir le menu">${icon("menu")}</button><nav class="bl-nav-links" id="${menuId}" aria-label="Navigation principale">${links.map((l) => `<a href="${esc(l.href)}"${l.id === page?.id ? ' class="bl-nav-active" aria-current="page"' : ""}>${esc(l.label)}</a>`).join("")}</nav></div>`,
        p.sticky ? "position:sticky;top:0;" : "",
      );
      if (p.sticky)
        html = html.replace("bl-navigation", "bl-navigation bl-nav-sticky");
      break;
    }
    case "project":
      html = wrap(
        "article",
        `${p.src ? `<div class="bl-project-img"><img src="${esc(safeImage(p.src))}" alt="${esc(p.alt)}" loading="lazy" decoding="async"></div>` : ""}<div class="bl-project-body"><div class="bl-project-overline"><span>${esc(p.category)}</span><span>${esc(p.year)}</span></div><h3><a href="${esc(safeUrl(p.href))}">${value("title")}</a></h3><p${editable("text")}>${esc(p.text)}</p><div class="bl-tags">${String(
          p.tags,
        )
          .split(",")
          .filter(Boolean)
          .map((t) => `<span class="bl-tag">${esc(t.trim())}</span>`)
          .join(
            "",
          )}</div><a class="bl-project-link" href="${esc(safeUrl(p.href))}"><span>Explorer le projet</span><span aria-hidden="true">↗</span></a></div>`,
        `border-radius:${clamp(p.radius, 0, 80, 16)}px;`,
      );
      break;
    case "skills": {
      const list = renderLines(p.text);
      html = wrap(
        "div",
        p.variant === "bars"
          ? list
              .map(
                ([label, n]) =>
                  `<div class="bl-skill"><div class="bl-skill-label"><span>${esc(label)}</span><span>${clamp(n, 0, 100, 80)} %</span></div><div class="bl-skill-track" role="meter" aria-label="${esc(label)}" aria-valuenow="${clamp(n, 0, 100, 80)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${clamp(n, 0, 100, 80)}%"></span></div></div>`,
              )
              .join("")
          : `<div class="bl-skills-tags">${list.map(([label]) => `<span>${esc(label)}</span>`).join("")}</div>`,
      );
      break;
    }
    case "timeline":
      html = wrap(
        "div",
        renderLines(p.text)
          .map(
            ([date, title, ...desc]) =>
              `<article class="bl-timeline-item"><span class="bl-timeline-date">${esc(date)}</span><h3>${esc(title || "Votre étape")}</h3><p>${esc(desc.join(" | "))}</p></article>`,
          )
          .join(""),
      );
      break;
    case "social":
      html = wrap(
        "div",
        `<div class="bl-social-links${p.variant === "minimal" ? " bl-social-minimal" : ""}">${renderLines(
          p.text,
        )
          .map(
            ([label, href]) =>
              `<a href="${esc(safeUrl(href))}"${p.newTab && /^https?:/i.test(href || "") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}<span aria-hidden="true">↗</span></a>`,
          )
          .join("")}</div>`,
      );
      break;
    case "gallery": {
      const images = parsedGallery(p);
      html = wrap(
        "div",
        images.length
          ? `<div class="bl-gallery-grid" style="--gallery-cols:${clamp(p.columns, 1, 4, 3)};gap:${clamp(p.gap, 0, 80, 16)}px">${images.map((i) => `<figure>${p.lightbox ? '<button type="button" data-bl-lightbox aria-label="Agrandir l’image">' : ""}<img src="${esc(i.src)}" alt="${esc(i.alt)}" loading="lazy" decoding="async" style="height:${clamp(p.height, 80, 700, 240)}px;border-radius:${clamp(p.radius, 0, 80, 12)}px">${p.lightbox ? "</button>" : ""}${i.caption ? `<figcaption>${esc(i.caption)}</figcaption>` : ""}</figure>`).join("")}</div>`
          : `<div class="bl-empty-media">Ajoutez vos images depuis la médiathèque<br>ou renseignez leurs URL dans les réglages.</div>`,
      );
      break;
    }
    case "file": {
      const href = /^data:(application\/pdf|text\/plain)(;|,)/i.test(
        p.src || "",
      )
        ? p.src
        : safeUrl(p.src, "#");
      html = wrap(
        "div",
        `<a class="bl-file-link" href="${esc(href)}" download="${esc(String(p.filename).replace(/[\\/<>]/g, "-"))}"><span class="bl-file-symbol" aria-hidden="true">↓</span><span><strong>${value("text")}</strong><small>${esc(p.filename)}${p.meta ? " · " + esc(p.meta) : ""}</small></span><i aria-hidden="true">↗</i></a>`,
      );
      break;
    }
    case "video":
      html = wrap(
        "figure",
        p.src
          ? `<video controls preload="none"${p.poster ? ` poster="${esc(safeImage(p.poster))}"` : ""}${p.autoplay ? " autoplay muted playsinline" : ""}${p.loop ? " loop" : ""} style="border-radius:${clamp(p.radius, 0, 80, 12)}px"><source src="${esc(safeUrl(p.src, ""))}">Votre navigateur ne prend pas en charge la vidéo.</video>${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}`
          : `<div class="bl-empty-media">Votre démo prend vie ici.<br>Ajoutez l’URL d’une vidéo MP4 ou WebM.</div>`,
      );
      break;
    case "embed": {
      const url = embeddedUrl(p.href);
      html = wrap(
        "div",
        `<div class="bl-embed-shell" style="border-radius:${clamp(p.radius, 0, 80, 12)}px"><button class="bl-embed-play" type="button"${url ? ` data-bl-embed="${esc(url)}" data-bl-title="${esc(p.title)}"` : ""}><i aria-hidden="true">▶</i><strong>${esc(p.title)}</strong><small>${url ? "Lire la vidéo · Le service vidéo ne se charge qu’après votre clic." : "Ajoutez un lien YouTube ou Vimeo dans les réglages du bloc."}</small></button></div>`,
      );
      break;
    }
    case "code":
      html = wrap(
        "figure",
        `<figcaption class="bl-code-head"><span>${esc(p.filename || p.language)}</span>${p.copy ? '<button type="button" data-bl-copy>Copier le code</button>' : ""}</figcaption><pre><code class="language-${esc(
          String(p.language)
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase(),
        )}">${esc(p.text)}</code></pre>`,
      );
      break;
    case "faq":
      html = wrap(
        "div",
        renderLines(p.text)
          .map(
            ([q, ...answer], i) =>
              `<details${p.firstOpen && i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(answer.join(" | "))}</p></details>`,
          )
          .join(""),
      );
      break;
    case "tabs": {
      const items = renderLines(p.text),
        id = `tabs-${b.id}`;
      html = wrap(
        "div",
        `<div class="bl-tabs-list" role="tablist" aria-label="Informations sur le projet">${items.map(([title], i) => `<button type="button" role="tab" id="${id}-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(title)}</button>`).join("")}</div>${items.map(([, ...txt], i) => `<div class="bl-tabs-panel" role="tabpanel" id="${id}-panel-${i}" aria-labelledby="${id}-${i}"${editor && i ? " hidden" : ""}>${esc(txt.join(" | "))}</div>`).join("")}`,
        "",
        " data-bl-tabs",
      );
      break;
    }
    case "stat":
      html = wrap(
        "div",
        `<div class="bl-stat-value" style="font-size:${clamp(p.fontSize, 20, 150, 58)}px">${value("value")}<small>${value("suffix")}</small></div><p${editable("text")}>${esc(p.text)}</p>`,
      );
      break;
    case "countdown": {
      const date = new Date(p.target),
        valid = Number.isFinite(date.getTime()),
        seconds = valid
          ? Math.max(0, Math.floor((date.getTime() - Date.now()) / 1000))
          : 0;
      const values = [
        Math.floor(seconds / 86400),
        Math.floor(seconds / 3600) % 24,
        Math.floor(seconds / 60) % 60,
        seconds % 60,
      ];
      html = wrap(
        "div",
        `<p class="bl-countdown-text">${esc(p.text)}</p><div class="bl-countdown-grid" data-bl-countdown="${valid ? date.toISOString() : ""}" data-bl-done="${esc(p.doneText)}" style="justify-content:${p.align === "center" ? "center" : p.align === "right" ? "flex-end" : "flex-start"}" aria-label="Compte à rebours">${["Jours", "Heures", "Minutes", "Secondes"].map((label, i) => `<div class="bl-countdown-cell"><strong data-bl-time>${String(values[i]).padStart(2, "0")}</strong><small>${label}</small></div>`).join("")}</div>`,
      );
      break;
    }
    case "pricing":
      html = wrap(
        "article",
        `${p.featured ? '<div class="bl-pricing-label">LE CHOIX LE PLUS POPULAIRE</div>' : ""}<h3${editable("title")}>${esc(p.title)}</h3><div class="bl-pricing-price">${value("price")}</div><p class="bl-pricing-period">${value("period")}</p><ul>${String(
          p.text,
        )
          .split("\n")
          .filter(Boolean)
          .map((t) => `<li>${esc(t)}</li>`)
          .join(
            "",
          )}</ul><a class="bl-cta bl-cta-filled" style="border-radius:7px;width:100%;font-size:13px" href="${esc(safeUrl(p.href))}">${esc(p.buttonText)} ↗</a>`,
        `border-radius:${clamp(p.radius, 0, 80, 16)}px;`,
      );
      if (p.featured)
        html = html.replace("bl-pricing", "bl-pricing bl-pricing-featured");
      break;
    case "contact": {
      const email = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(p.email)
        ? p.email
        : "";
      html = wrap(
        "div",
        `<h3${editable("title")}>${esc(p.title)}</h3><form action="mailto:${esc(encodeURIComponent(email))}" method="post" enctype="text/plain" data-bl-contact="${esc(email)}" data-bl-subject="${esc(p.subject)}"><label>Votre nom<input name="name" autocomplete="name" required maxlength="120" placeholder="Alex Martin"></label><label>Votre email<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="vous@exemple.fr"></label><label>Votre message<textarea name="message" required maxlength="10000" rows="4" placeholder="Racontez-moi votre idée…"></textarea></label><button class="bl-cta bl-cta-filled" type="submit">${esc(p.buttonText)} ↗</button><p class="bl-contact-notice" role="status">${esc(p.notice)}</p></form><p class="bl-contact-direct">Ou directement : <a href="mailto:${esc(encodeURIComponent(email))}">${esc(email || "Adresse à renseigner")}</a></p>`,
      );
      break;
    }
    case "footer":
      html = wrap(
        "footer",
        `<div class="bl-footer-inner"><div class="bl-footer-top"><div><div class="bl-footer-brand">${value("brand")}</div><div class="bl-footer-tagline"${editable("text")}>${esc(p.text)}</div></div><nav class="bl-footer-links" aria-label="Liens de pied de page">${renderLines(
          p.links,
        )
          .map(
            ([label, href]) =>
              `<a href="${esc(safeUrl(href))}">${esc(label)} ↗</a>`,
          )
          .join(
            "",
          )}</nav></div><div class="bl-footer-bottom"><span>${esc(String(p.copyright).replace(/\{year\}/g, new Date().getFullYear()))}</span><a href="#top" style="text-decoration:none">Retour en haut ↑</a></div></div>`,
      );
      break;
    default:
      html = coreRenderBlock(b, editor, root);
  }
  if (!html) return html;
  const classes = [
    `bn-${b.id}`,
    p.hideMobile ? "bl-hide-mobile" : "",
    p.hideTablet ? "bl-hide-tablet" : "",
    p.hideDesktop ? "bl-hide-desktop" : "",
    p.animation !== "none" ? "bl-animate" : "",
    String(p.customClass || "").replace(/[^a-z0-9_\- ]/gi, ""),
  ]
    .filter(Boolean)
    .join(" ");
  html = html.replace(/class="([^"]*)"/, `class="$1 ${classes}"`);
  if (["fade", "rise", "zoom"].includes(p.animation))
    html = html.replace(
      " style=",
      ` data-bl-animation="${p.animation}" style=`,
    );
  if (b.type === "image" && p.decorative)
    html = html.replace(/alt="[^"]*"/, 'alt=""');
  if (b.type === "heading" && p.font === "inherit")
    html = html.replace(
      "font-family:inherit;",
      "font-family:var(--bl-heading-font);",
    );
  return html;
};
const coreThemeCss = themeCss;
themeCss = function (d) {
  let css =
    coreThemeCss(d) +
    `\n:root{--bl-heading-font:${FONTS[d.settings.headingFont] || FONTS.sans};--bl-radius:${clamp(d.settings.radius, 0, 48, 12)}px}\n${STUDIO_SITE_CSS}\n`;
  const nodes = allBlocks(d.blocks);
  for (const viewport of ["tablet", "mobile"]) {
    let rules = "";
    for (const b of nodes) {
      const p = b.props,
        cls = `.bn-${b.id}`;
      if (p[`${viewport}Custom`]) {
        rules += `${cls}{padding-top:${clamp(p[`${viewport}PaddingTop`], 0, 600)}px!important;padding-bottom:${clamp(p[`${viewport}PaddingBottom`], 0, 600)}px!important;padding-left:${clamp(p[`${viewport}PaddingX`], 0, 300)}px!important;padding-right:${clamp(p[`${viewport}PaddingX`], 0, 300)}px!important;${["heading", "paragraph"].includes(b.type) ? `font-size:${clamp(p[`${viewport}FontSize`], 8, 160, 32)}px!important;` : ""}}\n`;
      }
      if (b.type === "columns")
        rules += `${cls}.bl-columns{grid-template-columns:repeat(${clamp(p[`${viewport}Columns`], 1, 4, viewport === "mobile" ? 1 : 2)},minmax(0,1fr))!important}${viewport === "mobile" && p.reverseMobile ? `${cls}>.bl-section{order:1}${cls}>.bl-section:first-child{order:2}` : ""}\n`;
    }
    css += `@media ${viewport === "tablet" ? "(min-width:701px) and (max-width:1000px)" : "(max-width:700px)"}{${rules}}\n`;
  }
  css +=
    safeCss(d.settings.customCSS) +
    "\n" +
    safeCss(renderContext?.page?.customCSS);
  return css;
};
const coreHtmlDocument = htmlDocument;
htmlDocument = function (d, editor = false, fragment = false, options = {}) {
  if (d === doc) syncActivePage();
  const page =
    d.pages?.find((p) => p.id === (options.pageId || d.activePageId)) ||
    activePage(d);
  const previous = renderContext;
  renderContext = { site: d, page };
  const virtual = {
    ...d,
    title: page ? page.seoTitle || `${page.title} — ${d.title}` : d.title,
    description: page?.description || d.description,
    blocks: page?.blocks || d.blocks,
  };
  try {
    let output = coreHtmlDocument(virtual, editor, fragment);
    if (editor)
      return output.replace(
        ".bl-editor .bl-cta:hover",
        ".bl-editor .bl-animate{opacity:1!important;transform:none!important}.bl-editor .bl-cta:hover",
      );
    if (fragment)
      return (
        `<!--\n${STUDIO_LICENSE}-->\n` +
        output +
        `\n<script>\n${STUDIO_RUNTIME}\n</script>`
      );
    output = output.replace(
      "<!doctype html>",
      () => `<!doctype html>\n<!--\n${STUDIO_LICENSE}-->`,
    );
    const base = validSiteBase(d.settings.baseUrl);
    const canonical =
      base && page ? new URL(pageFilename(page, d), base).href : "";
    let meta = `\n  <meta name="theme-color" content="${esc(d.settings.accent)}">\n  <meta property="og:type" content="website">\n  <meta property="og:title" content="${esc(virtual.title)}">\n  <meta property="og:description" content="${esc(virtual.description)}">\n  <meta name="twitter:card" content="summary_large_image">`;
    if (canonical)
      meta += `\n  <link rel="canonical" href="${esc(canonical)}">\n  <meta property="og:url" content="${esc(canonical)}">`;
    if (/^https?:\/\//i.test(d.settings.socialImage || ""))
      meta += `\n  <meta property="og:image" content="${esc(d.settings.socialImage)}">`;
    if (d.settings.favicon)
      meta += `\n  <link rel="icon" href="${esc(safeImage(d.settings.favicon))}">`;
    if (page?.noIndex)
      meta += '\n  <meta name="robots" content="noindex, nofollow">';
    if (options.preview) {
      const map = Object.fromEntries(
        (d.pages || []).map((p) => [pageFilename(p, d), p.id]),
      );
      meta += `\n  <meta name="bl-preview-anchor" content="${esc(options.previewAnchor || "")}">\n  <meta name="bl-preview" content="true">\n  <script type="application/json" id="bl-page-map">${JSON.stringify(map).replace(/</g, "\\u003c")}</script>`;
    }
    output = output
      .replace(
        '<html lang="fr">',
        `<html lang="${esc(d.settings.lang || "fr")}">`,
      )
      .replace("</head>", () => `${meta}\n</head>`)
      .replace(
        "<body>",
        '<body id="top">\n<a class="bl-skip-link" href="#main-content">Aller au contenu</a>',
      )
      .replace(
        '<main class="bl-page"',
        '<main id="main-content" class="bl-page"',
      );
    const back = d.settings.backToTop
      ? '<a class="bl-back-top" href="#top" aria-label="Retour en haut">↑</a>'
      : "";
    return output.replace(
      "</body>",
      () => `${back}\n<script>\n${STUDIO_RUNTIME}\n</script>\n</body>`,
    );
  } finally {
    renderContext = previous;
  }
};
