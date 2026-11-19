#!/usr/bin/env python3
"""Assemble bloclibre Studio en un HTML autonome. Python standard uniquement."""

import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
MODULES = (
    "studio-model.js",
    "studio-render.js",
    "studio-data.js",
    "studio-ui.js",
    "studio-tools.js",
    "studio-actions.js",
)


def read(name):
    return (SRC / name).read_text(encoding="utf-8")


def replace_once(text, marker, replacement):
    if text.count(marker) != 1:
        raise SystemExit(f"Assemblage interrompu : marqueur absent ou ambigu : {marker}")
    return text.replace(marker, replacement, 1)


def main():
    css = read("app.css") + "\n" + read("studio.css")
    extensions = "\n\n".join(read(name) for name in MODULES)
    for marker, filename in (
        ('"__BLOCLIBRE_STUDIO_SITE_CSS__"', "site-studio.css"),
        ('"__BLOCLIBRE_STUDIO_RUNTIME__"', "site-runtime.js"),
    ):
        extensions = replace_once(
            extensions, marker, json.dumps(read(filename), ensure_ascii=False)
        )
    js = replace_once(read("app.js"), "/* STUDIO_EXTENSIONS */", extensions)
    # Empêche le moteur HTML de fermer le script au milieu d’une chaîne JS.
    js = re.sub(r"</script", r"<\\/script", js, flags=re.IGNORECASE)
    html = replace_once(read("index.template.html"), "/* APP_CSS */", css)
    html = replace_once(html, "/* APP_JS */", js)
    (ROOT / "index.html").write_text(html, encoding="utf-8")
    print(
        f"bloclibre Studio · index.html : {len(html.encode('utf-8')):,} octets"
        " · zéro dépendance"
    )


if __name__ == "__main__":
    main()
