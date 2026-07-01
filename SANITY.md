# Sanity CMS — jak s ním pracovat

Web čte obsah ze Sanity a **automaticky se vrací ke statickému obsahu**, pokud
pole není vyplněné nebo Sanity není dostupné. Nic se tedy nerozbije, i když je
dataset prázdný.

- **Projekt:** AutoskolaSemirad (`hd19qymi`)
- **Dataset:** `production` (veřejně čitelný)
- **Studio (editace obsahu):** `/studio` na běžícím webu (např. http://localhost:3000/studio)
- **Konfigurace:** `.env.local` (není v gitu)

## První nastavení (jednorázově)

1. **Přihlášení do Sanity**
   ```bash
   npm run sanity:login
   ```
2. **Povolit Studio v prohlížeči (CORS)** — jinak se `/studio` nepřihlásí:
   ```bash
   npm run sanity:cors          # přidá http://localhost:3000
   ```
   Pro produkci přidej i ostrou doménu:
   ```bash
   npx sanity cors add https://sumi-lbc.cz --credentials
   ```
   (Totéž jde klikací cestou: sanity.io/manage → API → CORS origins.)
3. **Spustit web a otevřít Studio**
   ```bash
   npm run dev
   ```
   → http://localhost:3000/studio → přihlásit se stejným účtem, který vlastní projekt.

## Co lze editovat ve Studiu

| Sekce ve Studiu        | Kde se projeví na webu |
| ---------------------- | ---------------------- |
| **Aktuality**          | `/aktuality` (přehled + detail) |
| **Stránka Ceník**      | `/cenik` (balíčky, škola smyku, doplňky, FAQ) |
| **Úvodní stránka**     | domů — sekce „Něco o mně“ (bio: čísla, oprávnění, zkušenosti, vzdělání) |
| **Nastavení webu**     | kontakt, adresa, otevírací doba (schéma připraveno) |
| Stránka Služby / Kontakt | schéma připraveno (napojení stránek je další krok) |

Prázdné pole = použije se původní text z kódu. Vyplněné pole = přepíše ho.
Změny se na webu projeví do ~60 s (ISR), není potřeba nasazovat znovu.

## Užitečné příkazy

```bash
npm run sanity:manage     # otevře správu projektu v prohlížeči
npm run sanity:deploy     # nasadí Studio i na *.sanity.studio (volitelné)
npm run sanity:export     # záloha obsahu do sanity-backup.tar.gz
npm run sanity:import     # obnova obsahu ze zálohy
npx sanity users invite   # pozvat dalšího editora
npx sanity --help         # všechny příkazy CLI
```

## Struktura kódu

- `sanity.config.ts` / `sanity.cli.ts` — konfigurace Studia a CLI
- `src/sanity/schemaTypes/` — schémata (co jde editovat)
- `src/sanity/queries.ts` — GROQ dotazy
- `src/sanity/fetch.ts` — bezpečný fetch (fallback na statická data)
- `src/lib/content.ts` — spojení Sanity + statických dat pro stránky
