#!/usr/bin/env python3
"""Vérifie l’assemblage sans dépendance Python. Node est facultatif."""
from html.parser import HTMLParser
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
subprocess.run([sys.executable, str(ROOT / "build.py")], check=True)
html = (ROOT / "index.html").read_text(encoding="utf-8")
for marker in ("/* APP_JS */", "/* APP_CSS */", "/* STUDIO_EXTENSIONS */", "__BLOCLIBRE_STUDIO_"):
    assert marker not in html, f"Marqueur non résolu : {marker}"


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.scripts = []
        self.external = []

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            attributes = dict(attrs)
            self.active = True
            self.scripts.append("")
            if attributes.get("src"):
                self.external.append(attributes["src"])

    def handle_endtag(self, tag):
        if tag == "script":
            self.active = False

    def handle_data(self, data):
        if self.active:
            self.scripts[-1] += data


parser = Scripts()
parser.feed(html)
assert len(parser.scripts) == 1, "Le HTML assemblé doit contenir un seul script applicatif"
assert not parser.external, "Aucun script externe n’est nécessaire"
assert "Permission is hereby granted" in html, "Notice MIT manquante"
node = shutil.which("node")
if node:
    with tempfile.TemporaryDirectory(prefix="bloclibre-check-") as directory:
        script = Path(directory) / "app.js"
        script.write_text(parser.scripts[0], encoding="utf-8")
        subprocess.run([node, "--check", str(script)], check=True)
    for source in (ROOT / "src").glob("*.js"):
        subprocess.run([node, "--check", str(source)], check=True)
    print("✓ Assemblage autonome et syntaxe de tous les scripts vérifiés")
else:
    print("✓ Assemblage autonome vérifié. Node absent : vérification JS ignorée.")
