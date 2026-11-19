/* Projets locaux, pages et export ZIP natif. Aucune bibliothèque externe. */
let studioDbPromise = null;
const sessionProjects = new Map();
const LOCAL_VAULT_PREFIX = `bloclibre.vault.v2:${PROJECT_SCOPE}::`;
function openStudioDb() {
  if (studioDbPromise) return studioDbPromise;
  studioDbPromise = new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("IndexedDB indisponible"));
      return;
    }
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Le stockage ne répond pas."));
      }
    }, 5000);
    const request = indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const name of ["projects", "revisions"])
        if (!db.objectStoreNames.contains(name))
          db.createObjectStore(name, { keyPath: "key" });
    };
    request.onsuccess = () => {
      if (settled) {
        request.result.close();
        return;
      }
      settled = true;
      clearTimeout(timer);
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        studioDbPromise = null;
      };
      resolve(db);
    };
    const fail = (error) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        reject(error);
      }
    };
    request.onerror = () => fail(request.error);
    request.onblocked = () =>
      fail(new Error("Stockage verrouillé par un autre onglet."));
  });
  return studioDbPromise;
}
async function studioTransaction(storeName, mode, operation) {
  const db = await openStudioDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode),
      store = tx.objectStore(storeName);
    let result;
    const req = operation(store);
    if (req) req.onsuccess = () => (result = req.result);
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("Sauvegarde interrompue"));
  });
}
function vaultTransaction(mode, operation) {
  return studioTransaction("projects", mode, operation);
}
function vaultKey(id) {
  return `${PROJECT_SCOPE}::${id}`;
}
function projectRecord(data, volatile = false) {
  return {
    key: vaultKey(data.id),
    scope: PROJECT_SCOPE,
    id: data.id,
    title: data.title,
    updatedAt: data.updatedAt || Date.now(),
    data,
    volatile,
  };
}
function localProjectRecords() {
  const records = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(LOCAL_VAULT_PREFIX)) {
        try {
          const r = JSON.parse(localStorage.getItem(key));
          if (r?.scope === PROJECT_SCOPE && r?.data?.version === 2)
            records.push(r);
        } catch (error) {}
      }
    }
  } catch (error) {}
  return records;
}
async function listLocalProjects() {
  const records = [...localProjectRecords(), ...sessionProjects.values()];
  try {
    records.push(
      ...(await vaultTransaction("readonly", (s) => s.getAll())).filter(
        (r) => r.scope === PROJECT_SCOPE,
      ),
    );
  } catch (error) {}
  records.push(
    projectRecord(deepClone(snapshotProject()), studioStorage === "memory"),
  );
  const merged = new Map();
  for (const r of records) {
    const existing = merged.get(r.id);
    if (!existing || r.updatedAt >= existing.updatedAt) merged.set(r.id, r);
  }
  return [...merged.values()].sort((a, b) => b.updatedAt - a.updatedAt);
}
function saveCheckpoint(data) {
  let saved = false;
  try {
    localStorage.setItem(ACTIVE_KEY, data.id);
  } catch (error) {}
  try {
    const serialized = JSON.stringify(data);
    if (serialized.length < 1500000) {
      localStorage.setItem(STORAGE_KEY, serialized);
      saved = true;
    } else localStorage.removeItem(STORAGE_KEY);
  } catch (error) {}
  return saved;
}
function saveLocalProject(record) {
  try {
    const serialized = JSON.stringify(record);
    if (serialized.length >= 1500000) return false;
    localStorage.setItem(LOCAL_VAULT_PREFIX + record.id, serialized);
    return true;
  } catch (error) {
    return false;
  }
}
saveNow = async function () {
  if (!studioReady) return false;
  clearTimeout(saveTimer);
  const token = ++studioSaving;
  const data = deepClone(snapshotProject());
  data.updatedAt = Date.now();
  const record = projectRecord(data, true);
  sessionProjects.set(data.id, record);
  let saved = saveCheckpoint(data),
    storage = saved ? "local" : "memory";
  try {
    await vaultTransaction("readwrite", (s) =>
      s.put({ ...record, volatile: false }),
    );
    saved = true;
    storage = "indexeddb";
    record.volatile = false;
    maybeSaveRevision(data).catch(() => {});
  } catch (error) {
    saved = saveLocalProject({ ...record, volatile: false }) || saved;
    if (saved) {
      storage = "local";
      record.volatile = false;
    }
  }
  if (token !== studioSaving || doc.id !== data.id) return saved;
  studioStorage = storage;
  studioHasUnsaved = !saved;
  const status = $("#save-status");
  status.className = `save-status${saved ? "" : " error"}`;
  $("#save-status span").textContent = saved
    ? storage === "local"
      ? "Sauvegardé · stockage limité"
      : "Sauvegardé · cet appareil"
    : "Session non sauvegardée";
  if (!saved && !storageWarned) {
    toast(
      "Le stockage du navigateur est indisponible ou plein. Téléchargez votre projet JSON pour le conserver.",
      true,
    );
    storageWarned = true;
  } else if (saved) storageWarned = false;
  return saved;
};
async function restoreStudioSession() {
  let id;
  try {
    id = localStorage.getItem(ACTIVE_KEY);
  } catch (error) {}
  const candidates = localProjectRecords();
  try {
    candidates.push(
      ...(await vaultTransaction("readonly", (s) => s.getAll())).filter(
        (r) => r.scope === PROJECT_SCOPE,
      ),
    );
    studioStorage = "indexeddb";
  } catch (error) {
    studioStorage = "local";
  }
  const localSaved = doc.updatedAt || 0;
  const record = (id ? candidates.filter((r) => r.id === id) : candidates).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  )[0];
  if (record?.data && (doc.id !== record.id || record.updatedAt > localSaved)) {
    try {
      doc = normalizeProject(record.data);
    } catch (error) {
      loadWarning =
        "Un projet local est illisible. Votre copie JSON permet de le réimporter.";
    }
  }
  history = [JSON.stringify(snapshotProject())];
  historyIndex = 0;
  lastHistoryKey = "";
  selectedId =
    flatten().find((b) => b.type === "heading")?.id ||
    doc.blocks[0]?.id ||
    null;
  studioReady = true;
  refreshStudio();
  $("#app").classList.remove("studio-loading");
  $("#studio-loader")?.remove();
  await saveNow();
}
function refreshStudio() {
  updateMeta();
  historyControls();
  renderLibrary();
  renderInspector();
  renderSelectionToolbar();
  scheduleCanvas(0);
}
let projectActivation = Promise.resolve();
function activateProject(next, message = "Projet ouvert.") {
  const task = () => activateProjectNow(next, message);
  projectActivation = projectActivation.then(task, task);
  return projectActivation;
}
async function activateProjectNow(next, message = "Projet ouvert.") {
  if (studioReady) await saveNow();
  doc = normalizeProject(next);
  history = [JSON.stringify(snapshotProject())];
  historyIndex = 0;
  lastHistoryKey = "";
  selectedId =
    flatten().find((b) => b.type === "heading")?.id ||
    doc.blocks[0]?.id ||
    null;
  inspectorTab = "block";
  previewPageId = null;
  closeModal();
  closePanels();
  refreshStudio();
  $("#canvas-scroll").scrollTop = 0;
  await saveNow();
  if (message) toast(message);
}
async function createFromTemplate(name) {
  await activateProject(
    createStudioModel(name),
    name === "blank"
      ? "Un nouveau terrain de jeu. Tout est possible."
      : "Votre nouveau site est prêt à personnaliser.",
  );
}
replaceProject = function (next, message) {
  next.id = uid();
  activateProject(next, message || "Projet importé dans votre bibliothèque.");
};
async function deleteLocalProject(id) {
  if (id === doc.id) {
    toast("Ouvrez un autre projet avant de supprimer celui-ci.", true);
    return;
  }
  openConfirm(
    "Supprimer ce projet local ?",
    "Cette suppression concerne la bibliothèque et les versions de ce navigateur. Gardez d’abord une copie JSON si vous souhaitez le retrouver.",
    async () => {
      let removed = false;
      try {
        await vaultTransaction("readwrite", (s) => s.delete(vaultKey(id)));
        await deleteProjectRevisions(id);
        removed = true;
      } catch (error) {}
      try {
        localStorage.removeItem(LOCAL_VAULT_PREFIX + id);
        removed = true;
      } catch (error) {}
      if (sessionProjects.delete(id)) removed = true;
      closeModal();
      openModal("projects");
      toast(
        removed
          ? "Projet supprimé de cet appareil."
          : "Suppression impossible. Le stockage est verrouillé.",
        !removed,
      );
    },
    "Supprimer le projet",
  );
}
function switchPage(id) {
  const next = doc.pages.find((p) => p.id === id);
  if (!next || id === doc.activePageId) return;
  commit(
    () => {
      syncActivePage();
      doc.activePageId = id;
      doc.blocks = next.blocks;
      doc.description = next.description;
      selectedId = null;
    },
    { delay: 0 },
  );
  inspectorTab = "page";
  renderInspector();
  if (sidebarTab === "pages") renderLibrary();
  $("#canvas-scroll").scrollTop = 0;
  closePanels();
}
function uniquePageSlug(proposed, excludeId = null) {
  const used = new Set(
    doc.pages.filter((p) => p.id !== excludeId).map((p) => p.slug),
  );
  used.add("index");
  used.add("404");
  used.add("assets");
  let v = slug(proposed);
  while (used.has(v)) v += "-2";
  return v;
}
function createPage(title = "Nouvelle page", copyId = null) {
  if (doc.pages.length >= PAGE_LIMIT) {
    toast(`${PAGE_LIMIT} pages maximum par projet.`, true);
    return;
  }
  syncActivePage();
  const original = doc.pages.find((p) => p.id === copyId);
  const p = original
    ? {
        ...deepClone(original),
        id: uid(),
        title: `${original.title} · copie`,
        blocks: original.blocks.map((b) => rekeyTree(deepClone(b))),
      }
    : pageDraft(title, [
        ...(doc.shared?.navigation
          ? [rekeyTree(deepClone(doc.shared.navigation))]
          : []),
        ...(doc.shared?.footer
          ? [rekeyTree(deepClone(doc.shared.footer))]
          : []),
      ]);
  p.slug = uniquePageSlug(p.title);
  commit(
    () => {
      doc.pages.push(p);
      doc.activePageId = p.id;
      doc.blocks = p.blocks;
      doc.description = p.description;
      selectedId = null;
    },
    { delay: 0 },
  );
  inspectorTab = "page";
  changeSidebarTab("pages");
  renderInspector();
  closeModal();
  toast(original ? "Page dupliquée." : "Nouvelle page ajoutée.", false, true);
}
function deletePage(id) {
  if (doc.pages.length === 1) {
    toast("Votre site doit garder au moins une page.", true);
    return;
  }
  const p = doc.pages.find((p) => p.id === id);
  if (!p) return;
  openConfirm(
    "Supprimer cette page ?",
    `La page « ${p.title} » sera retirée du site. Vous pourrez annuler avec Ctrl/Cmd + Z.`,
    () => {
      commit(
        () => {
          syncActivePage();
          doc.pages = doc.pages.filter((pg) => pg.id !== id);
          if (doc.homePageId === id) doc.homePageId = doc.pages[0].id;
          if (doc.activePageId === id) {
            doc.activePageId = doc.homePageId;
            const next = activePage();
            doc.blocks = next.blocks;
            doc.description = next.description;
            selectedId = null;
          }
        },
        { delay: 0 },
      );
      closeModal();
      renderLibrary();
      toast("Page supprimée.", false, true);
    },
    "Supprimer la page",
  );
}
function renameCurrentPage(key, value) {
  const p = activePage();
  if (!p) return;
  commit(
    () => {
      if (key === "description") {
        doc.description = value;
        p.description = value;
      } else if (key === "slug") p.slug = uniquePageSlug(value, p.id);
      else p[key] = value;
    },
    {
      key: `page-${p.id}-${key}`,
      inspector: false,
      canvas: !["description", "seoTitle", "customCSS", "noIndex"].includes(
        key,
      ),
    },
  );
  if (key === "customCSS") scheduleCanvas(160);
  if (sidebarTab === "pages") renderLibrary();
}
function rootDestination() {
  const f = findBlock(selectedId);
  if (!f) return { parentId: null, index: doc.blocks.length };
  let current = f;
  while (current.parentId) current = findBlock(current.parentId);
  return { parentId: null, index: current.index + 1 };
}
function addStudioBlocks(
  blocks,
  destination = destinationForSelection(),
  message = "Ajouté à votre page.",
) {
  const children = childrenOf(destination.parentId);
  if (!children) return;
  const fresh = blocks.map((b) => rekeyTree(deepClone(b)));
  if (flatten().length + allBlocks(fresh).length > 400) {
    toast("Limite de 400 blocs par page atteinte.", true);
    return;
  }
  if (
    fresh.some(
      (b) => insertionDepth(destination.parentId) + subtreeDepth(b) > 10,
    )
  ) {
    toast("Cette insertion dépasserait les 10 niveaux d’imbrication.", true);
    return;
  }
  if (fresh.some((b) => !acceptsColumnChild(destination.parentId, b))) return;
  if (
    findBlock(destination.parentId)?.block.type === "columns" &&
    children.length + fresh.length > 4
  ) {
    toast("Quatre colonnes maximum.", true);
    return;
  }
  const anchors = new Set([
      "top",
      "main-content",
      "bl-lightbox",
      ...flatten()
        .map((b) => b.props.anchor)
        .filter(Boolean),
    ]),
    anchorMap = new Map();
  for (const b of allBlocks(fresh)) {
    if (b.props.anchor) {
      const old = b.props.anchor;
      let a = old;
      while (anchors.has(a)) a += "-2";
      b.props.anchor = a;
      anchors.add(a);
      if (a !== old) anchorMap.set("#" + old, "#" + a);
    }
  }
  const rewrite = (value) => anchorMap.get(value) || value;
  for (const b of allBlocks(fresh)) {
    if (b.props.href) b.props.href = rewrite(b.props.href);
    for (const key of b.type === "navigation" || b.type === "social"
      ? ["text"]
      : b.type === "footer"
        ? ["links"]
        : [])
      b.props[key] = renderLines(b.props[key])
        .map(([label, href]) => `${label}|${rewrite(href || "#")}`)
        .join("\n");
  }

  commit(
    () => {
      children.splice(
        clamp(destination.index, 0, children.length),
        0,
        ...fresh,
      );
      syncColumnCount(destination.parentId);
      selectedId = fresh[0]?.id || null;
    },
    { delay: 0 },
  );
  inspectorTab = "block";
  renderInspector();
  pendingScrollId = selectedId;
  closePanels();
  if (message) toast(message, false, true);
}
function insertRecipe(id) {
  const r = SECTION_RECIPES.find((r) => r.id === id);
  if (r)
    addStudioBlocks(
      [r.make()],
      rootDestination(),
      `Section « ${r.label} » ajoutée.`,
    );
}
function saveComponent(name) {
  const f = findBlock(selectedId);
  if (!f) return;
  if (doc.components.length >= 60) {
    toast("60 composants enregistrés maximum.", true);
    return;
  }
  commit(
    () =>
      doc.components.push({
        id: uid(),
        name: name || TYPES[f.block.type].label,
        block: deepClone(f.block),
      }),
    { canvas: false },
  );
  closeModal();
  toast("Composant enregistré. Retrouvez-le dans Sections → Mes blocs.");
}
function insertSavedComponent(id) {
  const c = doc.components.find((c) => c.id === id);
  if (c)
    addStudioBlocks(
      [c.block],
      destinationForSelection(),
      `« ${c.name} » ajouté.`,
    );
}
function sanitizeSvg(source) {
  const parsed = new DOMParser().parseFromString(source, "image/svg+xml"),
    svg = parsed.documentElement;
  if (svg.localName !== "svg" || parsed.querySelector("parsererror"))
    throw new Error("Ce fichier SVG est invalide.");
  const allowed = new Set(
    "svg g defs symbol use path rect circle ellipse line polyline polygon text tspan title desc linearGradient radialGradient stop clipPath mask pattern filter feTurbulence feColorMatrix feComponentTransfer feFuncR feFuncG feFuncB feFuncA feBlend feGaussianBlur feOffset feFlood feComposite feMerge feMergeNode image"
      .toLowerCase()
      .split(" "),
  );
  for (const el of [svg, ...svg.querySelectorAll("*")]) {
    if (!allowed.has(el.localName.toLowerCase())) {
      el.remove();
      continue;
    }
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase(),
        value = attr.value;
      if (
        name.startsWith("on") ||
        name === "style" ||
        name === "xml:base" ||
        /(?:javascript:|expression\s*\(|@import)/i.test(value) ||
        (/(?:^|:)href$/.test(name) && !value.startsWith("#")) ||
        (/url\s*\(/i.test(value) &&
          !/^(?:[^;]*url\(\s*['"]?#[a-z0-9_-]+['"]?\s*\)[^;]*)$/i.test(value))
      )
        el.removeAttribute(attr.name);
    }
  }
  return new XMLSerializer().serializeToString(svg);
}
async function readImageFile(file) {
  if (
    !/^image\/(png|jpeg|webp|gif|svg\+xml|avif)$/.test(file.type) ||
    file.size > 10 * 1024 * 1024
  )
    throw new Error(
      "Choisissez une image PNG, JPEG, WebP, GIF, SVG ou AVIF de moins de 10 Mo.",
    );
  const src = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  if (file.type === "image/svg+xml") {
    const svg = sanitizeSvg(await file.text());
    const encoded = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(new Blob([svg], { type: "image/svg+xml" }));
    });
    if (encoded.length > 14000000)
      throw new Error(
        "SVG trop volumineux après traitement. Simplifiez ce visuel.",
      );
    return encoded;
  }
  if (file.type === "image/gif") return src;
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });
  const ratio = Math.min(
      1,
      1800 / Math.max(image.naturalWidth, image.naturalHeight),
    ),
    canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/webp", 0.88);
}
async function addAssetFiles(files) {
  const ownerId = doc.id;
  const list = [...files].slice(0, Math.max(0, 150 - doc.assets.length));
  let added = 0;
  if (!list.length) {
    toast("150 images maximum dans la médiathèque.", true);
    return;
  }
  $("#library-content").classList.add("is-busy");
  for (const file of list) {
    try {
      const src = await readImageFile(file);
      if (doc.id !== ownerId) {
        toast("Import interrompu : le projet actif a changé.");
        break;
      }
      doc.assets.push({
        id: uid(),
        name: file.name,
        src,
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      });
      added++;
    } catch (error) {
      toast(error.message, true);
    }
  }
  $("#library-content").classList.remove("is-busy");
  if (added) {
    commit(() => {}, { canvas: false, inspector: false });
    renderLibrary();
    if (modalState === "media") renderMediaModal();
    toast(
      `${added} image${added > 1 ? "s" : ""} ajoutée${added > 1 ? "s" : ""} à la médiathèque.`,
    );
  }
}
function useAsset(id, destination) {
  const a = doc.assets.find((a) => a.id === id);
  if (!a) return;
  addStudioBlocks(
    [block("image", { src: a.src, alt: a.alt })],
    destination || destinationForSelection(),
    "Image ajoutée.",
  );
}
readProjectFile = async function (file) {
  if (!file) return;
  if (file.size > 50 * 1024 * 1024) {
    toast("Projet trop volumineux (50 Mo maximum).", true);
    return;
  }
  try {
    const incoming = normalizeProject(JSON.parse(await file.text()));
    openConfirm(
      "Importer ce site ?",
      `« ${incoming.title} » sera ajouté comme un nouveau projet local. Le site actuel restera dans votre bibliothèque.`,
      () => replaceProject(incoming, "Site importé."),
      "Importer le site",
    );
  } catch (error) {
    toast(
      error instanceof SyntaxError
        ? "Ce fichier n’est pas un JSON valide."
        : error.message,
      true,
    );
  }
};
function bytesLabel(n) {
  return n > 1048576
    ? `${(n / 1048576).toFixed(1)} Mo`
    : `${Math.max(1, Math.round(n / 1024))} Ko`;
}
const revisionAttempts = new Map();
let revisionBusy = false;
async function projectRevisions(id = doc.id) {
  const records = await studioTransaction("revisions", "readonly", (s) =>
    s.getAll(),
  );
  return records
    .filter((r) => r.scope === PROJECT_SCOPE && r.projectId === id)
    .sort((a, b) => b.createdAt - a.createdAt);
}
async function deleteProjectRevisions(id) {
  const records = await projectRevisions(id);
  for (const r of records)
    await studioTransaction("revisions", "readwrite", (s) => s.delete(r.key));
}
let revisionWrites = Promise.resolve();
function writeRevision(data, manual = false) {
  const task = () => writeRevisionNow(data, manual);
  const result = revisionWrites.then(task, task);
  revisionWrites = result.catch(() => {});
  return result;
}
async function writeRevisionNow(data, manual = false) {
  const records = await projectRevisions(data.id);
  const previous = records[0];
  if (!manual && previous && Date.now() - previous.createdAt < 180000)
    return false;
  const content = JSON.stringify({
    ...data,
    updatedAt: 0,
    activePageId: data.homePageId,
  });
  const hash = crc32(new TextEncoder().encode(content));
  if (!manual && previous?.hash === hash) return false;
  const createdAt = Date.now(),
    id = uid(),
    record = {
      key: `${vaultKey(data.id)}::${id}`,
      id,
      projectId: data.id,
      scope: PROJECT_SCOPE,
      createdAt,
      manual,
      hash,
      data: deepClone(data),
    };
  await studioTransaction("revisions", "readwrite", (s) => s.put(record));
  for (const r of records.slice(7))
    await studioTransaction("revisions", "readwrite", (s) => s.delete(r.key));
  return true;
}
async function maybeSaveRevision(data) {
  const now = Date.now();
  if (now - (revisionAttempts.get(data.id) || 0) < 180000) return false;
  revisionAttempts.set(data.id, now);
  return writeRevision(data);
}
async function createRevision(manual = true) {
  if (revisionBusy) return false;
  revisionBusy = true;
  try {
    const data = deepClone(snapshotProject());
    data.updatedAt = Date.now();
    await writeRevision(data, manual);
    toast("Point de restauration créé sur cet appareil.");
    return true;
  } catch (error) {
    toast(
      "Les versions nécessitent du stockage IndexedDB disponible. Gardez une copie JSON.",
      true,
    );
    return false;
  } finally {
    revisionBusy = false;
  }
}
async function restoreRevision(id) {
  try {
    const records = await projectRevisions(),
      record = records.find((r) => r.id === id);
    if (!record) return;
    const projectId = doc.id;
    openConfirm(
      "Restaurer cette version ?",
      "Le contenu du projet sera remplacé par ce point de restauration. Vous pourrez annuler la restauration dans l’historique.",
      async () => {
        if (doc.id !== projectId) return;
        try {
          await writeRevision(deepClone(snapshotProject()), true);
        } catch (error) {}
        commit(
          () => {
            doc = normalizeProject(record.data);
            doc.id = projectId;
            selectedId =
              flatten().find((b) => b.type === "heading")?.id || null;
          },
          { delay: 0 },
        );
        closeModal();
        refreshStudio();
        await saveNow();
        toast(
          "Version restaurée. Vous pouvez annuler avec Ctrl / Cmd + Z.",
          false,
          true,
        );
      },
      "Restaurer la version",
    );
  } catch (error) {
    toast("Cette version n’a pas pu être lue.", true);
  }
}
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(bytes) {
  let c = 0xffffffff;
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function zipArchive(files) {
  const enc = new TextEncoder(),
    parts = [],
    central = [];
  let offset = 0,
    centralSize = 0;
  const now = new Date(),
    dosTime =
      (now.getHours() << 11) |
      (now.getMinutes() << 5) |
      (now.getSeconds() >> 1),
    dosDate =
      ((Math.max(1980, now.getFullYear()) - 1980) << 9) |
      ((now.getMonth() + 1) << 5) |
      now.getDate();
  for (const [name, value] of files) {
    const filename = enc.encode(name),
      data = value instanceof Uint8Array ? value : enc.encode(value),
      crc = crc32(data),
      local = new Uint8Array(30 + filename.length),
      lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true);
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.length, true);
    lv.setUint32(22, data.length, true);
    lv.setUint16(26, filename.length, true);
    local.set(filename, 30);
    parts.push(local, data);
    const header = new Uint8Array(46 + filename.length),
      cv = new DataView(header.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(12, dosTime, true);
    cv.setUint16(14, dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true);
    cv.setUint16(28, filename.length, true);
    cv.setUint32(42, offset, true);
    header.set(filename, 46);
    central.push(header);
    centralSize += header.length;
    offset += local.length + data.length;
  }
  const end = new Uint8Array(22),
    ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  const all = [...parts, ...central, end],
    result = new Uint8Array(all.reduce((n, p) => n + p.length, 0));
  let pos = 0;
  for (const p of all) {
    result.set(p, pos);
    pos += p.length;
  }
  return result;
}
function dataImageBytes(src) {
  const comma = src.indexOf(","),
    head = src.slice(0, comma),
    body = src.slice(comma + 1),
    mime = (head.match(/^data:([^;,]+)/i)?.[1] || "image/png").toLowerCase();
  let bytes;
  if (/;base64/i.test(head)) {
    const raw = atob(body);
    bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
  } else bytes = new TextEncoder().encode(decodeURIComponent(body));
  if (mime === "image/svg+xml")
    bytes = new TextEncoder().encode(
      sanitizeSvg(new TextDecoder().decode(bytes)),
    );
  const ext =
    {
      "image/jpeg": "jpg",
      "image/svg+xml": "svg",
      "application/pdf": "pdf",
      "text/plain": "txt",
    }[mime] || mime.replace(/^image\//, "");
  return { bytes, ext: /^[a-z0-9]+$/.test(ext) ? ext : "img" };
}
async function buildSiteArchive() {
  const project = deepClone(snapshotProject()),
    pages = project.pages.filter(
      (p) => p.published || p.id === project.homePageId,
    ),
    files = [],
    resources = new Map(),
    usedNames = new Set();
  const addImage = (src) => {
    if (
      !/^data:(image\/|application\/pdf[;,]|text\/plain[;,])/i.test(
        src || "",
      ) ||
      resources.has(src)
    )
      return;
    try {
      const { bytes, ext } = dataImageBytes(src);
      let h = 2166136261;
      for (const n of bytes) h = Math.imul(h ^ n, 16777619) >>> 0;
      let name = `assets/image-${h.toString(16)}.${ext}`;
      while (usedNames.has(name)) name = name.replace(/\.([^.]+)$/, "-2.$1");
      usedNames.add(name);
      resources.set(src, name);
      files.push([name, bytes]);
    } catch (error) {
      /* Une image invalide reste incluse pour ne pas casser les autres fichiers. */
    }
  };
  const outputs = pages.map((p) => ({
    page: p,
    html: htmlDocument(project, false, false, { pageId: p.id }),
  }));
  for (const { html, page } of outputs) {
    const parsed = new DOMParser().parseFromString(html, "text/html");
    $$('img[src],link[rel="icon"],a[download]', parsed).forEach((el) =>
      addImage(el.getAttribute("src") || el.getAttribute("href")),
    );
    allBlocks(page.blocks).forEach((b) => addImage(b.props.backgroundImage));
  }
  for (const { page, html: source } of outputs) {
    let html = source;
    for (const [src, path] of resources) {
      html = html.split(esc(src)).join(path).split(src).join(path);
    }
    const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";
    const styleName = `assets/${page.id === project.homePageId ? "index" : slug(page.slug)}.css`;
    files.push([styleName, css.replace(/url\((["']?)assets\//g, "url($1")]);
    html = html
      .replace(
        /<style>[\s\S]*?<\/style>/,
        `<link rel="stylesheet" href="${styleName}">`,
      )
      .replace(
        /<script>[\s\S]*?<\/script>/g,
        '<script src="assets/site.js" defer></script>',
      );
    files.push([pageFilename(page, project), html]);
  }
  files.push(
    ["assets/site.js", STUDIO_RUNTIME],
    [".nojekyll", ""],
    ["LICENSE.txt", STUDIO_LICENSE],
  );
  const base = validSiteBase(project.settings.baseUrl);
  files.push([
    "robots.txt",
    `User-agent: *\nAllow: /\n${base ? `Sitemap: ${new URL("sitemap.xml", base).href}\n` : ""}`,
  ]);
  if (base)
    files.push([
      "sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
        .filter((p) => !p.noIndex)
        .map(
          (p) =>
            `\n  <url><loc>${esc(new URL(pageFilename(p, project), base).href)}</loc></url>`,
        )
        .join("")}\n</urlset>`,
    ]);
  files.push([
    "404.html",
    `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page introuvable</title><style>body{font:18px/1.7 system-ui;text-align:center;padding:15vh 25px;background:${project.settings.background};color:${project.settings.text}}h1{font-size:80px;letter-spacing:-5px;margin:0}a{color:inherit}</style><h1>404.</h1><p>Cette page a pris un autre chemin.</p><a href="${esc(base || "./index.html")}">Revenir à l’accueil ↗</a></html>`,
  ]);
  files.push([
    "LIRE-AVANT-PUBLICATION.md",
    `# ${project.title}\n\nSite exporté avec bloclibre Studio.\n\n## Publier\n\nDéposez le contenu de cette archive (pas l’archive elle-même) à la racine de votre dépôt ou de votre hébergement statique. Gardez les dossiers et les noms de fichiers. Activez votre hébergement sur cette racine.\n\n${pages.length} pages publiées. Les pages marquées « Brouillon » sont exclues.\n\nLes images et les documents PDF/TXT utilisés ont été extraits dans assets/ lorsque leur format le permet. Les images et vidéos distantes nécessitent une connexion. Les vidéos YouTube/Vimeo ne se chargent qu’au clic.\n\nLe formulaire de contact prépare un email dans la messagerie du visiteur : il n’envoie aucun message à un serveur. Remplacez les adresses et tous les contenus de démonstration.\n\nPour continuer l’édition, conservez le projet JSON téléchargé séparément depuis l’éditeur. Il n’est volontairement pas inclus dans ce ZIP public.\n\n${base ? "Les URL canoniques et le sitemap utilisent " + base : "Aucune URL de site n’est définie. Renseignez-la dans Thème → Publication puis exportez à nouveau pour inclure un sitemap et des URL canoniques."}\n`,
  ]);
  return zipArchive(files);
}
async function downloadSiteZip() {
  if (exportBusy) return;
  exportBusy = true;
  const button = $("[data-export-zip]");
  if (button) {
    button.disabled = true;
    button.innerHTML = `${icon("clock")}Préparation…`;
  }
  try {
    await saveNow();
    const bytes = await buildSiteArchive();
    download(bytes, `${slug(doc.title)}-site.zip`, "application/zip");
    toast(`Site complet exporté · ${bytesLabel(bytes.length)}.`);
  } catch (error) {
    console.error(error);
    toast(
      "L’export ZIP a échoué. Téléchargez le projet JSON pour garder votre travail.",
      true,
    );
  } finally {
    exportBusy = false;
    if (modalState === "export") renderExportModal();
  }
}
