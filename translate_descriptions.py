"""
Безкоштовний офлайн-переклад описів плакатів (Argos Translate): FR, IT, DE, ES.
Без API-ключів і токенів. Інтернет потрібен лише першого разу, щоб скачати моделі.

Запуск (у папці, де лежить posters.js):
    pip install argostranslate
    python translate_descriptions.py

Результат: i18n_descriptions.js  (підключається ПЕРЕД i18n.js, див. index.html)
Можна переривати й запускати знову: готове береться з кешу i18n_cache.json.
Порядок мов у файлі = порядок у i18n.js: [fr, it, de, es]
"""
import json, os, re, shutil, subprocess, sys

LANGS = ["fr", "it", "de", "es"]          # НЕ міняй порядок: він збігається з i18n.js
SRC, TMP, CACHE, OUT = "posters.js", "_posters_tmp.mjs", "i18n_cache.json", "i18n_descriptions.js"
# ці рядки i18n.js вже перекладає сам шаблонами (з числами) — пропускаємо
SKIP = re.compile(r"^Shipping (takes|to Europe takes)\b")

norm = lambda s: re.sub(r"\s+", " ", s).strip()

def load_descriptions():
    shutil.copy(SRC, TMP)
    js = "import P from './%s'; console.log(JSON.stringify(P.map(p=>p.description||'')))" % TMP
    out = subprocess.run(["node", "--input-type=module", "-e", js],
                         capture_output=True, text=True, check=True).stdout
    os.remove(TMP)
    return json.loads(out)

def install_models():
    import argostranslate.package as pkg
    pkg.update_package_index()
    avail = pkg.get_available_packages()
    for code in LANGS:
        p = next((x for x in avail if x.from_code == "en" and x.to_code == code), None)
        if not p:
            sys.exit(f"Немає моделі en->{code}")
        if not os.path.exists(f".installed_{code}"):
            print(f"Завантажую модель en->{code} ...")
            pkg.install_from_path(p.download())
            open(f".installed_{code}", "w").close()

def main():
    import argostranslate.translate as tr
    # унікальні рядки з усіх описів (рядок = абзац); ключ = англійський текст як на сайті
    lines = {}
    for d in load_descriptions():
        for l in d.replace("\r\n", "\n").split("\n"):
            k = norm(l)
            if k and not SKIP.match(k):
                lines[k] = None
    install_models()
    cache = json.load(open(CACHE, encoding="utf-8")) if os.path.exists(CACHE) else {}

    result, n = {}, len(lines)
    for i, k in enumerate(lines, 1):
        row = []
        for code in LANGS:
            ck = f"{code}|{k}"
            if ck not in cache:
                cache[ck] = tr.translate(k.replace("**", ""), "en", code)  # ** на сайті не потрібні
            row.append(cache[ck])
        result[k] = row
        if i % 20 == 0 or i == n:
            json.dump(cache, open(CACHE, "w", encoding="utf-8"), ensure_ascii=False)
            print(f"[{i}/{n}]")

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// Автогенеровано translate_descriptions.py ([fr, it, de, es])\n")
        f.write("window.SITE_I18N_EXTRA = ")
        json.dump(result, f, ensure_ascii=False, indent=0)
        f.write(";\n")
    print("Готово ->", OUT)

if __name__ == "__main__":
    main()
