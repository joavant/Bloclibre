/* Raccourcis, actions contextuelles et initialisation de l’interface Studio. */
const STYLE_KEYS = [
  ...Object.keys(COMMON).filter((k) => !["name", "anchor"].includes(k)),
  "fontSize",
  "font",
  "bold",
  "italic",
  "lineHeight",
  "letterSpacing",
  "maxWidth",
  "radius",
];
function copySelectedBlock(cut = false) {
  const f = findBlock(selectedId);
  if (!f) return;
  blockClipboard = deepClone(f.block);
  if (cut) deleteBlock();
  toast(
    cut
      ? "Bloc coupé. Ctrl / Cmd + V pour le placer."
      : "Bloc copié. Ctrl / Cmd + V pour le réutiliser.",
  );
}
function copySelectedStyle() {
  const f = findBlock(selectedId);
  if (!f) return;
  styleClipboard = Object.fromEntries(
    STYLE_KEYS.filter((k) => k in f.block.props).map((k) => [
      k,
      f.block.props[k],
    ]),
  );
  toast("Style copié. Ctrl / Cmd + Maj + V pour l’appliquer.");
}
function pasteSelectedStyle() {
  const f = findBlock(selectedId);
  if (!f || !styleClipboard) {
    toast("Copiez d’abord le style d’un bloc.", true);
    return;
  }
  commit(() => {
    for (const [k, v] of Object.entries(styleClipboard))
      if (k in f.block.props) f.block.props[k] = v;
  });
  toast("Style appliqué.", false, true);
}
function wrapSelectedBlock() {
  const f = findBlock(selectedId);
  if (!f) return;
  if (
    flatten().length >= 400 ||
    insertionDepth(f.parentId) + subtreeDepth(f.block) + 1 > 10
  ) {
    toast(
      "Cette opération dépasserait la limite de blocs ou d’imbrication.",
      true,
    );
    return;
  }
  const container = block(
    "section",
    { name: "Groupe", paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
    [f.block],
  );
  commit(
    () => {
      f.siblings.splice(f.index, 1, container);
      selectedId = container.id;
    },
    { delay: 0 },
  );
}
function toggleStudioFocus() {
  const on = $("#app").classList.toggle("studio-focus");
  $("[data-studio-focus]")?.setAttribute("aria-pressed", String(on));
  requestAnimationFrame(layoutCanvas);
}
function showContextMenu(x, y) {
  hideContextMenu();
  const f = findBlock(selectedId);
  if (!f) return;
  const menu = document.createElement("div");
  menu.id = "studio-context-menu";
  menu.className = "studio-context-menu";
  menu.setAttribute("role", "menu");
  menu.innerHTML = `<div class="context-title">${esc(f.block.props.name || TYPES[f.block.type].label)}</div>${[
    ["copy", "copy", "Copier le bloc", "⌘/Ctrl C"],
    ["paste", "plus", "Coller un bloc", "⌘/Ctrl V"],
    ["duplicate", "copy", "Dupliquer", "⌘/Ctrl D"],
    ["wrap", "section", "Grouper dans une section", ""],
    ["parent", "parent", "Sélectionner le parent", ""],
    ["divider", "", "", ""],
    ["copy-style", "paint", "Copier le style", ""],
    ["paste-style", "paint", "Coller le style", ""],
    ["component", "save", "Enregistrer comme composant", ""],
    ["divider", "", "", ""],
    ["delete", "trash", "Supprimer", "Suppr"],
  ]
    .map(([action, ico, label, key]) =>
      action === "divider"
        ? "<hr>"
        : `<button role="menuitem" data-context-action="${action}"${(action === "paste" && !blockClipboard) || (action === "paste-style" && !styleClipboard) || (action === "parent" && !f.parentId) ? " disabled" : ""}>${icon(ico)}<span>${label}</span><kbd>${key}</kbd></button>`,
    )
    .join("")}`;
  document.body.append(menu);
  const rect = menu.getBoundingClientRect();
  menu.style.left = `${Math.max(8, Math.min(innerWidth - rect.width - 10, x))}px`;
  menu.style.top = `${Math.max(8, Math.min(innerHeight - rect.height - 10, y))}px`;
}
function hideContextMenu() {
  $("#studio-context-menu")?.remove();
}
function contextAction(action) {
  hideContextMenu();
  const f = findBlock(selectedId);
  if (action === "copy") copySelectedBlock();
  if (action === "paste" && blockClipboard)
    addStudioBlocks([blockClipboard], destinationForSelection(), "Bloc collé.");
  if (action === "duplicate") duplicateBlock();
  if (action === "delete") deleteBlock();
  if (action === "wrap") wrapSelectedBlock();
  if (action === "parent" && f?.parentId) selectBlock(f.parentId, true);
  if (action === "copy-style") copySelectedStyle();
  if (action === "paste-style") pasteSelectedStyle();
  if (action === "component") openModal("component");
}
function studioFrameReady(fd) {
  fd.addEventListener("contextmenu", (event) => {
    const blockEl = event.target.closest("[data-block-id]");
    if (!blockEl) return;
    event.preventDefault();
    selectBlock(blockEl.dataset.blockId);
    const rect = frame.getBoundingClientRect();
    showContextMenu(
      rect.left + event.clientX * frameScale,
      rect.top + event.clientY * frameScale,
    );
  });
  fd.addEventListener("click", () => hideContextMenu());
  fd.addEventListener("submit", (e) => {
    e.preventDefault();
    toast(
      "Le formulaire est désactivé dans l’éditeur. Testez le site exporté pour préparer un email.",
    );
  });
}
const coreDragOver = onFrameDragOver;
onFrameDragOver = function (event) {
  if ([...event.dataTransfer.types].includes("Files")) {
    const before = dragData;
    dragData = { source: "library", type: "image" };
    coreDragOver(event);
    dragData = before;
    return;
  }
  coreDragOver(event);
};
const coreFrameDrop = onFrameDrop;
onFrameDrop = async function (event) {
  const data = readDrag(event),
    destination = dropTarget || { parentId: null, index: doc.blocks.length };
  if (event.dataTransfer.files?.length) {
    event.preventDefault();
    clearDrop();
    const pageId = doc.activePageId,
      projectId = doc.id;
    for (const file of [...event.dataTransfer.files].slice(0, 10)) {
      try {
        const src = await readImageFile(file);
        if (doc.id !== projectId || doc.activePageId !== pageId) return;
        addStudioBlocks(
          [block("image", { src, alt: file.name.replace(/\.[^.]+$/, "") })],
          destination,
          "Image déposée sur votre page.",
        );
        destination.index++;
      } catch (error) {
        toast(error.message, true);
      }
    }
    return;
  }
  if (data?.assetId || data?.recipeId || data?.componentId) {
    event.preventDefault();
    clearDrop();
    dragData = null;
    if (data.assetId) useAsset(data.assetId, destination);
    if (data.recipeId) {
      const r = SECTION_RECIPES.find((r) => r.id === data.recipeId);
      if (r) addStudioBlocks([r.make()], destination, "Section ajoutée.");
    }
    if (data.componentId) {
      const c = doc.components.find((c) => c.id === data.componentId);
      if (c) addStudioBlocks([c.block], destination, "Composant ajouté.");
    }
    return;
  }
  coreFrameDrop(event);
};
const coreKeys = handleKeys;
handleKeys = function (event) {
  const mod = event.metaKey || event.ctrlKey,
    key = event.key.toLowerCase(),
    editing = event.target.closest?.(
      'input,textarea,select,[contenteditable="true"]',
    );
  if (mod && key === "k") {
    event.preventDefault();
    openModal("commands");
    return;
  }
  if (key === "escape") {
    hideContextMenu();
    if (!modalState) $("#app").classList.remove("studio-focus");
  }
  if (!modalState && !editing) {
    if (mod && key === "c") {
      event.preventDefault();
      event.shiftKey ? copySelectedStyle() : copySelectedBlock();
      return;
    }
    if (mod && key === "v") {
      event.preventDefault();
      if (event.shiftKey) pasteSelectedStyle();
      else if (blockClipboard)
        addStudioBlocks(
          [blockClipboard],
          destinationForSelection(),
          "Bloc collé.",
        );
      else toast("Copiez un bloc dans l’éditeur avant de le coller.");
      return;
    }
    if (mod && key === "x") {
      event.preventDefault();
      copySelectedBlock(true);
      return;
    }
    if (event.altKey && ["1", "2", "3", "4", "5"].includes(key)) {
      event.preventDefault();
      changeSidebarTab(STUDIO_NAV[Number(key) - 1][0]);
      if (matchMedia("(max-width:740px)").matches) openPanel("left");
      return;
    }
  }
  coreKeys(event);
};
const coreChangeSidebar = changeSidebarTab;
changeSidebarTab = function (tab) {
  $("#app").classList.remove("studio-focus");
  coreChangeSidebar(tab);
};
toggleMenu = function () {
  const menu = $("#project-menu");
  if (!menu.hidden) {
    closeMenu();
    return;
  }
  menu.innerHTML = `<button data-open-projects>${icon("folder")}Mes projets</button><button data-menu-action="new">${icon("plus")}Nouveau site</button><button data-menu-action="templates">${icon("sparkles")}Explorer les modèles</button><hr><button data-menu-action="save">${icon("download")}Sauvegarder le projet JSON<span class="menu-kbd">Ctrl S</span></button><button data-menu-action="import">${icon("upload")}Importer un projet</button><hr><button data-menu-action="shortcuts">${icon("keyboard")}Raccourcis clavier</button><button data-open-guide>${icon("info")}Guide de démarrage</button><button data-menu-action="about">${icon("heart")}À propos · MIT</button>`;
  menu.hidden = false;
  $("#project-menu-toggle").setAttribute("aria-expanded", "true");
};
function rewritePageLinks(mapping) {
  const rewrite = (href) => {
    const index = String(href).indexOf("#"),
      file = index < 0 ? href : href.slice(0, index);
    return mapping[file]
      ? mapping[file] + (index < 0 ? "" : href.slice(index))
      : href;
  };
  for (const p of doc.pages)
    for (const b of allBlocks(p.blocks)) {
      if (b.props.href) b.props.href = rewrite(b.props.href);
      if (
        (b.type === "navigation" && !b.props.autoPages) ||
        b.type === "social"
      )
        b.props.text = renderLines(b.props.text)
          .map(([label, href]) => `${label}|${rewrite(href || "#")}`)
          .join("\n");
      if (b.type === "footer")
        b.props.links = renderLines(b.props.links)
          .map(([label, href]) => `${label}|${rewrite(href || "#")}`)
          .join("\n");
    }
}
function setHomePage(id) {
  const p = doc.pages.find((p) => p.id === id);
  if (!p || p.id === doc.homePageId) return;
  commit(
    () => {
      syncActivePage();
      const old = doc.pages.find((p) => p.id === doc.homePageId),
        oldFile = pageFilename(old),
        newFile = pageFilename(p);
      doc.homePageId = id;
      p.published = true;
      rewritePageLinks({
        [oldFile]: pageFilename(old),
        [newFile]: "index.html",
      });
    },
    { delay: 0 },
  );
  renderInspector();
  renderLibrary();
  toast("Nouvelle page d’accueil définie.", false, true);
}
const coreRenamePage = renameCurrentPage;
renameCurrentPage = function (key, value) {
  if (key === "slug") {
    const p = activePage(),
      old = pageFilename(p);
    commit(
      () => {
        p.slug = uniquePageSlug(value, p.id);
        rewritePageLinks({ [old]: pageFilename(p) });
      },
      { key: `slug-${p.id}`, inspector: false },
    );
  } else coreRenamePage(key, value);
};
function applyPickedAsset(id) {
  const a = doc.assets.find((a) => a.id === id),
    target = assetPickerTarget;
  if (!a || !target || target.projectId !== doc.id) return;
  if (target.prop === "favicon") commit(() => (doc.settings.favicon = a.src));
  else {
    const f = findBlock(target.blockId);
    if (!f) return;
    commit(
      () => {
        if (target.prop === "gallery")
          f.block.props.images +=
            (f.block.props.images ? "\n" : "") +
            `${a.src}|${a.alt.replace(/\|/g, "/")}|`;
        else f.block.props[target.prop] = a.src;
      },
      { delay: 0 },
    );
  }
  closeModal();
  assetPickerTarget = null;
  toast("Image appliquée.");
}
function initStudio() {
  $("#app").classList.add("studio-loading");
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div id="studio-loader"><span class="brand-symbol"><i></i><i></i><i></i><i></i></span><strong>Votre espace de création se prépare.</strong><small>Local, libre et prêt à faire de belles choses.</small></div>',
  );
  $(".brand-word").insertAdjacentHTML(
    "afterend",
    '<span class="studio-brand-badge">STUDIO</span>',
  );
  $("#brand-home").setAttribute("aria-label", "Ouvrir mes projets");
  const rail = document.createElement("nav");
  rail.className = "studio-rail";
  rail.setAttribute("aria-label", "Outils du studio");
  rail.innerHTML = `<button class="rail-project-button" data-open-projects title="Mes projets" aria-label="Mes projets">${icon("folder")}</button><span class="rail-rule"></span>${STUDIO_NAV.map(([id, ico, label]) => `<button data-studio-panel="${id}" class="${sidebarTab === id ? "active" : ""}" aria-label="${label}" aria-pressed="${sidebarTab === id}" title="${label}">${icon(ico)}<span>${label}</span></button>`).join("")}<div class="rail-spacer"></div><button data-open-history title="Versions locales" aria-label="Versions locales et points de restauration">${icon("clock")}<span>Versions locales</span></button><button data-rail-theme title="Thème du site" aria-label="Personnaliser le thème du site">${icon("palette")}<span>Thème</span></button><button data-studio-dark title="Mode sombre de l’éditeur" aria-label="Activer le mode sombre de l’éditeur" aria-pressed="false">${icon("moon")}<span>Ambiance</span></button><button data-open-guide title="Un coup de main" aria-label="Ouvrir le guide">${icon("info")}<span>Le guide</span></button>`;
  $(".editor-layout").prepend(rail);
  $(".sidebar-tabs").innerHTML =
    `<h2 id="studio-panel-title">Blocs</h2><span id="studio-panel-count">31</span><button class="icon-button close-panel" id="close-left-panel" aria-label="Fermer les outils">${icon("close")}</button>`;
  $("#close-left-panel").onclick = closePanels;
  $(".template-promo").innerHTML =
    `<span class="promo-icon">${icon("sparkles")}</span><span><strong>Pas besoin de partir de zéro.</strong><small>6 modèles pour lancer votre site</small></span><span>${icon("arrowRight")}</span>`;
  $(".open-source-note").innerHTML =
    `${icon("unlock")}Studio 2.0 · Open source · À vous.`;
  $(".workspace-location").innerHTML =
    `<button class="icon-button mobile-add" id="open-left-panel" aria-label="Ouvrir les outils">${icon("panelLeft")}</button><span class="page-tag">PAGE</span><button id="studio-current-page" class="studio-current-page" title="Gérer les pages"></button>`;
  $("#open-left-panel").onclick = () => openPanel("left");
  $("#studio-current-page").onclick = () => {
    changeSidebarTab("pages");
    if (matchMedia("(max-width:740px)").matches) openPanel("left");
  };
  $(".workspace-tools").insertAdjacentHTML(
    "afterbegin",
    `<button class="icon-button studio-focus-button" data-studio-focus aria-pressed="false" title="Mode focus" aria-label="Activer le mode focus">${icon("fit")}</button>`,
  );
  $(".header-actions").insertAdjacentHTML(
    "afterbegin",
    `<button class="studio-command-trigger" data-open-commands title="Palette de commandes · Ctrl / Cmd + K">${icon("search")}<span>Rechercher…</span><kbd>⌘ K</kbd></button>`,
  );
  $("#export-button").innerHTML =
    `${icon("download")}<span>Exporter<span class="export-html"> le site</span></span>`;
  const tabs = $(".inspector-tabs");
  tabs
    .querySelector(".close-panel")
    .insertAdjacentHTML(
      "beforebegin",
      '<button role="tab" aria-selected="false" data-inspector-tab="theme">Thème</button>',
    );
  $('[data-inspector-tab="theme"]').onclick = () => {
    inspectorTab = "theme";
    renderInspector();
  };
  $(".workspace-footer").innerHTML =
    `<div class="studio-breadcrumbs" id="studio-breadcrumbs"></div><div class="studio-footer-right"><button data-open-audit class="studio-audit-trigger">${icon("checkCircle")}Vérifier</button><span id="studio-page-total"></span><i>·</i><span id="block-count"></span><button id="shortcuts-button" title="Raccourcis" aria-label="Raccourcis clavier">${icon("keyboard")}</button></div>`;
  $("#shortcuts-button").onclick = () => openModal("shortcuts");
  try {
    if (localStorage.getItem("bloclibre.editor.dark") === "true") {
      document.body.dataset.ui = "dark";
      $("[data-studio-dark]").setAttribute("aria-pressed", "true");
    }
  } catch (error) {}
  bindStudioEvents();
  restoreStudioSession();
}
function bindStudioEvents() {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    const panel = target.closest("[data-studio-panel]");
    if (panel) {
      changeSidebarTab(panel.dataset.studioPanel);
      if (matchMedia("(max-width:740px)").matches) openPanel("left");
    }
    if (target.closest("[data-open-projects]")) openModal("projects");
    if (target.closest("[data-new-studio-project]")) openModal("templates");
    if (target.closest("[data-open-commands]")) openModal("commands");
    if (target.closest("[data-open-guide]")) openModal("guide");
    if (target.closest("[data-open-history]")) openModal("revisions");
    if (target.closest("[data-open-audit]")) openModal("audit");
    if (target.closest("[data-open-export]")) openModal("export");
    if (target.closest("[data-export-zip]")) downloadSiteZip();
    if (target.closest("[data-create-revision]")) {
      await createRevision(true);
      renderRevisionsModal();
    }
    if (target.closest("[data-save-studio-project]")) saveProject();
    if (target.closest("[data-import-studio-project]"))
      $("#project-file-input").click();
    if (target.closest("[data-rail-theme]")) {
      $("#app").classList.remove("studio-focus");
      inspectorTab = "theme";
      renderInspector();
      if (matchMedia("(max-width:1050px)").matches) openPanel("right");
    }
    if (target.closest("[data-studio-focus]")) toggleStudioFocus();
    if (target.closest("[data-studio-dark]")) {
      const on = document.body.dataset.ui !== "dark";
      document.body.dataset.ui = on ? "dark" : "light";
      $("[data-studio-dark]").setAttribute("aria-pressed", String(on));
      try {
        localStorage.setItem("bloclibre.editor.dark", String(on));
      } catch (error) {}
    }
    const action = target.closest("[data-studio-action]");
    if (action) {
      if (action.dataset.studioAction === "more") {
        const r = action.getBoundingClientRect();
        showContextMenu(r.left, r.bottom + 8);
      } else contextAction(action.dataset.studioAction);
    }
    const context = target.closest("[data-context-action]");
    if (context) contextAction(context.dataset.contextAction);
    else if (!target.closest("#studio-context-menu,[data-studio-action]"))
      hideContextMenu();
    const recipe = target.closest("[data-insert-recipe]");
    if (recipe) insertRecipe(recipe.dataset.insertRecipe);
    const category = target.closest("[data-section-category]");
    if (category) {
      sectionCategory = category.dataset.sectionCategory;
      renderLibrary();
    }
    const component = target.closest("[data-insert-component]");
    if (component) insertSavedComponent(component.dataset.insertComponent);
    const deleteComponent = target.closest("[data-delete-component]");
    if (deleteComponent) {
      commit(
        () =>
          (doc.components = doc.components.filter(
            (c) => c.id !== deleteComponent.dataset.deleteComponent,
          )),
        { canvas: false },
      );
      renderLibrary();
    }
    if (target.closest("[data-confirm-component]"))
      saveComponent(
        $("#studio-component-name").value.trim() || "Mon composant",
      );
    const use = target.closest("[data-use-asset]");
    if (use) useAsset(use.dataset.useAsset);
    const removeAsset = target.closest("[data-delete-asset]");
    if (removeAsset) {
      commit(
        () =>
          (doc.assets = doc.assets.filter(
            (a) => a.id !== removeAsset.dataset.deleteAsset,
          )),
        { canvas: false },
      );
      renderLibrary();
    }
    const pick = target.closest("[data-pick-media]");
    if (pick) {
      assetPickerTarget = {
        blockId: selectedId,
        prop: pick.dataset.pickMedia,
        projectId: doc.id,
      };
      openModal("media");
    }
    const picked = target.closest("[data-pick-asset-id]");
    if (picked) applyPickedAsset(picked.dataset.pickAssetId);
    if (target.closest("[data-add-inside-button]")) {
      const f = findBlock(selectedId);
      if (f)
        addStudioBlocks(
          [block("button")],
          { parentId: f.block.id, index: f.block.children.length },
          "Bouton ajouté au groupe.",
        );
    }
    const page = target.closest("[data-switch-page]");
    if (page) switchPage(page.dataset.switchPage);
    if (target.closest("[data-studio-create-page]")) createPage();
    const duplicatePage = target.closest("[data-page-duplicate]");
    if (duplicatePage) createPage("", duplicatePage.dataset.pageDuplicate);
    const deletePageButton = target.closest("[data-page-delete]");
    if (deletePageButton) deletePage(deletePageButton.dataset.pageDelete);
    const home = target.closest("[data-home-page]");
    if (home) setHomePage(home.dataset.homePage);
    const order = target.closest("[data-page-order]");
    if (order) {
      const index = doc.pages.findIndex(
          (p) => p.id === order.dataset.pageOrder,
        ),
        next = index + Number(order.dataset.delta);
      if (next >= 0 && next < doc.pages.length) {
        commit(() => {
          [doc.pages[index], doc.pages[next]] = [
            doc.pages[next],
            doc.pages[index],
          ];
        });
        renderLibrary();
      }
    }
    const project = target.closest("[data-open-project-id]");
    if (project) {
      const id = project.dataset.openProjectId;
      if (id === doc.id) {
        closeModal();
        return;
      }
      const record = (await listLocalProjects()).find((r) => r.id === id);
      if (record) activateProject(record.data);
      else toast("Ce projet n’a pas pu être ouvert.", true);
    }
    const deleteProjectButton = target.closest("[data-delete-project-id]");
    if (deleteProjectButton)
      deleteLocalProject(deleteProjectButton.dataset.deleteProjectId);
    const revision = target.closest("[data-restore-revision]");
    if (revision) restoreRevision(revision.dataset.restoreRevision);
    const exportPage = target.closest("[data-export-page]");
    if (exportPage) {
      studioExportPageId = exportPage.dataset.exportPage;
      renderExportModal();
    }
    const cmd = target.closest("[data-run-command]");
    if (cmd) runCommand(Number(cmd.dataset.runCommand));
    const audit = target.closest("[data-audit-page]");
    if (audit) {
      const id = audit.dataset.auditPage,
        blockId = audit.dataset.auditBlock;
      closeModal();
      if (id !== doc.activePageId) switchPage(id);
      if (blockId) {
        selectBlock(blockId);
        pendingScrollId = blockId;
        scheduleCanvas(0);
      } else {
        inspectorTab = "page";
        renderInspector();
        if (matchMedia("(max-width:1050px)").matches) openPanel("right");
      }
    }
    const breadcrumb = target.closest("[data-breadcrumb-id]");
    if (breadcrumb) selectBlock(breadcrumb.dataset.breadcrumbId, true);
    if (target.closest("[data-breadcrumb-page]")) {
      inspectorTab = "page";
      renderInspector();
    }
    if (target.closest("[data-clear-favicon]"))
      commit(() => (doc.settings.favicon = ""));
  });
  document.addEventListener("input", (event) => {
    const input = event.target;
    if (input.id === "studio-command-input") {
      commandQuery = input.value;
      commandIndex = 0;
      renderCommandResults();
    }
    if (input.dataset.pageProp && input.dataset.pageProp !== "slug")
      renameCurrentPage(
        input.dataset.pageProp,
        input.type === "checkbox" ? input.checked : input.value,
      );
  });
  document.addEventListener("change", async (event) => {
    const input = event.target;
    if (input.matches("[data-upload-assets],[data-modal-upload-assets]"))
      await addAssetFiles(input.files);
    if (input.matches("[data-block-file-upload]")) {
      const file = input.files[0],
        blockId = selectedId,
        projectId = doc.id;
      if (file) {
        if (
          !["application/pdf", "text/plain"].includes(file.type) ||
          file.size > 8 * 1024 * 1024
        ) {
          toast("Choisissez un PDF ou un fichier TXT de moins de 8 Mo.", true);
          return;
        }
        try {
          const src = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          if (doc.id !== projectId) return;
          const found = findBlock(blockId);
          if (found)
            commit(
              () => {
                found.block.props.src = src;
                found.block.props.filename = file.name;
              },
              { delay: 0 },
            );
          toast("Document intégré au projet.");
        } catch (error) {
          toast("Impossible de lire ce document.", true);
        }
      }
    }
    if (input.matches("[data-favicon-upload]")) {
      const file = input.files[0],
        projectId = doc.id;
      if (file) {
        try {
          const src = await readImageFile(file);
          if (doc.id !== projectId) return;
          commit(() => (doc.settings.favicon = src));
          toast("Favicon ajouté.");
        } catch (error) {
          toast(error.message, true);
        }
      }
    }
    if (input.dataset.pageProp === "slug") {
      renameCurrentPage("slug", input.value);
      input.value = activePage().slug;
    }
    if (input.matches("[data-preview-page]")) previewNavigate(input.value);
    if (input.matches("[data-choose-page-link]") && input.value)
      updateProp("href", input.value, true);
  });
  document.addEventListener("keydown", (event) => {
    if (
      modalState === "commands" &&
      ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)
    ) {
      event.preventDefault();
      if (event.key === "Enter") {
        runCommand(commandIndex);
        return;
      }
      commandIndex =
        (commandIndex +
          (event.key === "ArrowDown" ? 1 : -1) +
          commandItems.length) %
        Math.max(1, commandItems.length);
      renderCommandResults();
      $(`[data-run-command="${commandIndex}"]`)?.scrollIntoView({
        block: "nearest",
      });
    }
  });
  const library = $("#library-content");
  library.addEventListener("dragstart", (event) => {
    const asset = event.target.closest("[data-asset-drag]"),
      recipe = event.target.closest("[data-recipe-drag]"),
      component = event.target.closest("[data-component-drag]"),
      page = event.target.closest("[data-page-row]");
    if (page) {
      dragData = null;
      clearDrop();
      event.dataTransfer.setData(
        "application/x-bloclibre-page",
        page.dataset.pageRow,
      );
      event.dataTransfer.effectAllowed = "move";
      return;
    }
    if (!asset && !recipe && !component) return;
    dragData = {
      source: "library",
      type: asset ? "image" : "section",
      ...(asset
        ? { assetId: asset.dataset.assetDrag }
        : recipe
          ? { recipeId: recipe.dataset.recipeDrag }
          : { componentId: component.dataset.componentDrag }),
    };
    event.dataTransfer.setData(MIME, JSON.stringify(dragData));
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    event.dataTransfer.effectAllowed = "copy";
  });
  library.addEventListener("dragover", (event) => {
    if (
      [...event.dataTransfer.types].includes("Files") &&
      sidebarTab === "assets"
    ) {
      event.preventDefault();
      library.classList.add("is-file-over");
    }
    if (
      [...event.dataTransfer.types].includes("application/x-bloclibre-page") &&
      event.target.closest("[data-page-row]")
    ) {
      event.preventDefault();
      $$(".studio-page-row").forEach((el) =>
        el.classList.remove("drop-before"),
      );
      event.target.closest("[data-page-row]").classList.add("drop-before");
    }
  });
  library.addEventListener("dragleave", (event) => {
    if (!library.contains(event.relatedTarget))
      library.classList.remove("is-file-over");
  });
  library.addEventListener("drop", (event) => {
    library.classList.remove("is-file-over");
    if (event.dataTransfer.files.length && sidebarTab === "assets") {
      event.preventDefault();
      addAssetFiles(event.dataTransfer.files);
      return;
    }
    const pageId = event.dataTransfer.getData("application/x-bloclibre-page"),
      row = event.target.closest("[data-page-row]");
    if (pageId && row) {
      event.preventDefault();
      const a = doc.pages.findIndex((p) => p.id === pageId),
        b = doc.pages.findIndex((p) => p.id === row.dataset.pageRow);
      if (a >= 0 && b >= 0 && a !== b) {
        commit(() => {
          const [p] = doc.pages.splice(a, 1);
          doc.pages.splice(b, 0, p);
        });
        renderLibrary();
      }
    }
  });
  window.addEventListener("message", (event) => {
    if (
      modalState !== "preview" ||
      event.source !== $("#preview-frame")?.contentWindow
    )
      return;
    if (event.data?.type === "bloclibre:navigate")
      previewNavigate(event.data.pageId, event.data.anchor || "");
    if (event.data?.type === "bloclibre:close-preview") closeModal();
  });
  library.addEventListener(
    "drop",
    (event) => {
      const data = readDrag(event),
        destination = dropTarget;
      if (
        !destination ||
        !data ||
        (!data.assetId && !data.recipeId && !data.componentId)
      )
        return;
      event.preventDefault();
      event.stopImmediatePropagation();
      clearDrop();
      dragData = null;
      if (data.assetId) useAsset(data.assetId, destination);
      if (data.recipeId) {
        const r = SECTION_RECIPES.find((r) => r.id === data.recipeId);
        if (r) addStudioBlocks([r.make()], destination, "Section ajoutée.");
      }
      if (data.componentId) {
        const c = doc.components.find((c) => c.id === data.componentId);
        if (c) addStudioBlocks([c.block], destination, "Composant ajouté.");
      }
    },
    true,
  );
  document.addEventListener("dragend", () =>
    $$(".studio-page-row.drop-before").forEach((el) =>
      el.classList.remove("drop-before"),
    ),
  );
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && studioReady) saveNow();
  });
}

importImage = async function (file) {
  if (!file) return;
  const blockId = selectedId,
    projectId = doc.id;
  try {
    const src = await readImageFile(file);
    if (doc.id !== projectId) return;
    const f = findBlock(blockId);
    if (!f) return;
    commit(
      () => {
        f.block.props.src = src;
        f.block.props.alt = file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]/g, " ");
      },
      { delay: 0 },
    );
    toast("Image intégrée. Elle sera incluse dans votre site.");
  } catch (error) {
    toast(error.message || "Impossible de lire cette image.", true);
  }
};
// Une duplication ne réutilise pas les ancres de la page d’origine.
duplicateBlock = function () {
  const f = findBlock(selectedId);
  if (f)
    addStudioBlocks(
      [f.block],
      { parentId: f.parentId, index: f.index + 1 },
      "Bloc dupliqué.",
    );
};
