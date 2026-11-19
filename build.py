#!/usr/bin/env python3
"""Assemble l’application dans un seul fichier, avec Python standard uniquement."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent
html = (root / "src/index.template.html").read_text(encoding="utf-8")
css = (root / "src/app.css").read_text(encoding="utf-8")
js = (root / "src/app.js").read_text(encoding="utf-8")
# Empêche une éventuelle chaîne JS de fermer la balise script de l’application.
js = re.sub(r"</script", r"<\\/script", js, flags=re.I)
html = html.replace("/* APP_CSS */", css).replace("/* APP_JS */", js)
(root / "index.html").write_text(html, encoding="utf-8")
print(f"index.html créé · {len(html.encode('utf-8')):,} octets · aucune dépendance")
