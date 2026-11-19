/* Interactions des sites exportés avec bloclibre Studio · Licence MIT · Zéro dépendance. */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("bl-js");
  $$("[data-bl-menu]").forEach((button) =>
    button.addEventListener("click", () => {
      const menu = document.getElementById(
        button.getAttribute("aria-controls"),
      );
      if (!menu) return;
      const open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("bl-menu-open", open);
    }),
  );
  $$("nav a").forEach((a) =>
    a.addEventListener("click", () => {
      const nav = a.closest("nav");
      nav?.classList.remove("bl-menu-open");
      const button = nav?.parentElement.querySelector("[data-bl-menu]");
      button?.setAttribute("aria-expanded", "false");
    }),
  );
  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.cssText = "position:fixed;left:-9999px;top:0";
      document.body.append(el);
      el.select();
      let result = false;
      try {
        result = document.execCommand("copy");
      } catch (e) {}
      el.remove();
      return result;
    }
  }
  $$("[data-bl-copy]").forEach((button) =>
    button.addEventListener("click", async () => {
      const text =
        $("code", button.closest(".bl-code"))?.textContent ||
        button.dataset.blCopy;
      const old = button.textContent;
      button.textContent = (await copy(text))
        ? "Copié !"
        : "Copie indisponible";
      setTimeout(() => (button.textContent = old), 1800);
    }),
  );
  $$("[data-bl-tabs]").forEach((container) => {
    const tabs = $$('[role="tab"]', container),
      panels = $$('[role="tabpanel"]', container);
    function activate(index) {
      tabs.forEach((tab, i) => {
        tab.setAttribute("aria-selected", String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
    }
    activate(0);
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(index));
      tab.addEventListener("keydown", (e) => {
        let next = index;
        if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (e.key === "ArrowLeft")
          next = (index - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(next);
        tabs[next].focus();
      });
    });
  });
  const timers = $$("[data-bl-countdown]");
  function tick() {
    timers.forEach((container) => {
      const target = Date.parse(container.dataset.blCountdown);
      const total = Math.max(0, Math.floor((target - Date.now()) / 1000));
      if (!Number.isFinite(target)) {
        container.textContent = "Date à configurer";
        return;
      }
      if (total === 0) {
        container.textContent = container.dataset.blDone || "C’est parti !";
        return;
      }
      const values = [
        Math.floor(total / 86400),
        Math.floor(total / 3600) % 24,
        Math.floor(total / 60) % 60,
        total % 60,
      ];
      $$("[data-bl-time]", container).forEach(
        (el, i) => (el.textContent = String(values[i]).padStart(2, "0")),
      );
    });
  }
  if (timers.length) {
    tick();
    setInterval(tick, 1000);
  }
  $$("[data-bl-contact]").forEach((form) =>
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!form.dataset.blContact) {
        $('[role="status"]', form).textContent =
          "L’adresse de réception doit être configurée par le propriétaire du site.";
        return;
      }
      const fields = new FormData(form),
        subject = form.dataset.blSubject || "Un nouveau message";
      const body = `Bonjour,\n\n${fields.get("message")}\n\n${fields.get("name")}\n${fields.get("email")}`;
      const url = `mailto:${encodeURIComponent(form.dataset.blContact)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const notice = $('[role="status"]', form);
      notice.textContent =
        "Votre messagerie va s’ouvrir. Le message n’a pas encore été envoyé.";
      window.location.href = url;
    }),
  );
  $$("[data-bl-embed]").forEach((button) =>
    button.addEventListener("click", () => {
      const url = button.dataset.blEmbed;
      if (
        !/^https:\/\/(www\.youtube-nocookie\.com\/embed\/|player\.vimeo\.com\/video\/)/.test(
          url,
        )
      )
        return;
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.title = button.dataset.blTitle || "Vidéo";
      iframe.allow = "fullscreen; picture-in-picture; encrypted-media";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.loading = "lazy";
      button.replaceWith(iframe);
    }),
  );
  $$("[data-bl-lightbox]").forEach((button) =>
    button.addEventListener("click", () => {
      let dialog = $("#bl-lightbox");
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "bl-lightbox";
        dialog.className = "bl-lightbox";
        dialog.innerHTML =
          '<button aria-label="Fermer l’image" class="bl-lightbox-close">×</button><img alt=""><p></p>';
        document.body.append(dialog);
        $(".bl-lightbox-close", dialog).onclick = () => dialog.close();
        dialog.addEventListener("click", (e) => {
          if (e.target === dialog) dialog.close();
        });
      }
      const source = $("img", button),
        image = $("img", dialog);
      image.src = source.src;
      image.alt = source.alt;
      $("p", dialog).textContent = source.alt;
      if (dialog.showModal) dialog.showModal();
      else window.open(source.src, "_blank", "noopener");
    }),
  );
  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bl-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    $$(".bl-animate").forEach((el) => observer.observe(el));
  } else $$(".bl-animate").forEach((el) => el.classList.add("bl-visible"));
  if ($('meta[name="bl-preview"]')) {
    const anchor = $('meta[name="bl-preview-anchor"]')?.content;
    if (anchor)
      requestAnimationFrame(() => {
        try {
          document.getElementById(decodeURIComponent(anchor))?.scrollIntoView();
        } catch (error) {}
      });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]"))
        parent.postMessage({ type: "bloclibre:close-preview" }, "*");
    });
    let pages = {};
    try {
      pages = JSON.parse($("#bl-page-map")?.textContent || "{}");
    } catch (error) {}
    document.addEventListener("click", (event) => {
      const a = event.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      const [rawFile, anchor] = href.split("#"),
        file = rawFile.replace(/^\.\//, "");
      if (Object.hasOwn(pages, file)) {
        event.preventDefault();
        parent.postMessage(
          {
            type: "bloclibre:navigate",
            pageId: pages[file],
            anchor: anchor || "",
          },
          "*",
        );
      }
    });
  }
})();
