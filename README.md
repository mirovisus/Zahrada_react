# Zahrada — Platforma pro správu a údržbu zahrad

Webová aplikace pro správu zahrad a zprostředkování zahradnických služeb. Propojuje vlastníky zahrad s profesionálními pracovníky a umožňuje transparentní správu zakázek od poptávky po dokončení.

## Demo

🔗 [Live demo](https://zahrada-react.vercel.app)

### Testovací účty

| Role | Email | Heslo |
|------|-------|-------|
| Vlastník zahrady | jan@example.com | 1234 |
| Pracovník | marie@example.com | 1234 |

> **Poznámka:** Data jsou ukládána v localStorage prohlížeče. Pro reset dat smažte localStorage nebo použijte inkognito režim.

## O projektu

**Zahrada** je moderní platforma, která zjednodušuje proces správy zahrad a zprostředkování zahradnických služeb. Aplikace propojuje vlastníky zahrad s kvalifikovanými pracovníky a zajišťuje transparentní a bezpečný průběh celého procesu.

### Jak to funguje

1. **Vlastník zahrady** vytvoří profil své zahrady, přidá fotografie a popíše požadované úpravy
2. **Administrátor** (Fáze 1) nebo **AI systém** (Fáze 2) zpracuje poptávku a rozdělí ji na konkrétní služby
3. **Pracovníci** vidí dostupné zakázky v okolí a přihlásí se k jejich realizaci
4. Po dokončení **pracovník nahraje fotografie** výsledku a popis provedených prací
5. **Platba** probíhá bezpečně přes aplikaci — klient platí předem, prostředky jsou uvolněny po dokončení
6. Aplikace eviduje **kompletní historii** úprav každé zahrady

## Aktuální stav vývoje

**Verze: Fáze 1 — MVP**

### ✅ Implementované funkce

- Registrace a přihlášení uživatelů (vlastníci / pracovníci)
- Správa uživatelského profilu (editace, změna hesla, smazání účtu)
- Vytváření, editace a smazání zahrad
- Nahrávání fotografií zahrad
- Dashboard s přehledem všech zahrad
- Responzivní design
- Lokální úložiště dat (localStorage)

### 🚧 Připravované funkce (Fáze 2 — Modernizace)

- Backend API pro správu dat
- Systém zakázek a poptávek
- AI automatizace zpracování poptávek
- Platební brána
- Geolokace a filtrování zakázek
- Notifikační systém
- Historie úprav a reporting

## Klíčová technická rozhodnutí

- **Feature-Sliced Design (FSD)** — architektura organizovaná podle business logiky, ne podle technických vrstev. Usnadňuje škálování a údržbu.
- **BEM + SCSS** — vlastní stylizace bez CSS frameworků, plná kontrola nad designem
- **React Context API** — state management bez externích knihoven
- **localStorage** — dočasné úložiště pro MVP, backend plánován ve Fázi 2

## Technologie

### Frontend Stack

- **Framework:** React 19.1.0
- **Routing:** React Router DOM 7.12.0
- **Build Tool:** Vite 7.0.4
- **Styling:** SCSS (Sass 1.97.2)
- **Metodologie CSS:** BEM (Blok, Element, Modifikátor)
- **IDE:** WebStorm

## Struktura projektu

Projekt využívá **Feature-Sliced Design (FSD)** — moderní architektonický přístup pro frontendové aplikace.

```
zahrada-react/
├── src/
│   ├── app/                    # Inicializace aplikace
│   │   ├── layouts/           # Layout komponenty (Public/Private)
│   │   └── providers/         # Context providery (Auth, Gardens, Router)
│   │
│   ├── pages/                 # Stránky aplikace
│   │   ├── home/             # Úvodní stránka
│   │   ├── login/            # Přihlášení
│   │   ├── signup/           # Registrace
│   │   ├── profile/          # Profil uživatele
│   │   ├── garden-create/    # Vytvoření zahrady
│   │   └── garden-edit/      # Editace zahrady
│   │
│   ├── widgets/              # Složité komponenty (composites)
│   │   ├── header/          # Navigace (Public/Private)
│   │   ├── footer/          # Patička
│   │   ├── main/            # Hero sekce, O nás
│   │   ├── service-section/ # Přehled služeb
│   │   ├── profile-dashboard/ # Dashboard profilu
│   │   ├── garden-form/     # Formulář zahrady
│   │   └── garden-card/     # Karty zahrad
│   │
│   ├── features/            # Funkční moduly
│   │   └── auth/           # Autentizace (Login/Register formuláře)
│   │
│   ├── entities/           # Biznis entity
│   │   └── garden/        # Garden komponenty
│   │
│   └── shared/            # Sdílené zdroje
│       ├── ui/           # UI komponenty (Button, Field, Checkbox, atd.)
│       ├── styles/       # SCSS styly (BEM metodologie)
│       ├── api/          # API komunikace (připraveno)
│       └── lib/          # Utility funkce
│
├── public/
│   ├── images/           # Obrázky a ikony
│   └── fonts/            # Fonty
│
└── vite.config.js        # Vite konfigurace
```

## Instalace a spuštění

### Požadavky

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalace

```bash
git clone https://github.com/mirovisus/Zahrada_react.git
cd Zahrada_react
npm install
```

### Development režim

```bash
npm run dev
```

Aplikace bude dostupná na: `http://localhost:5173`

### Production build

```bash
npm run build
npm run preview
```

## Uživatelské role

### Vlastník (Owner)

- Spravuje své zahrady (vytváření, editace, smazání)
- Zadává poptávky na služby
- Sleduje historii úprav
- Platí za služby přes aplikaci

### Pracovník (Worker)

- Prohlíží dostupné zakázky
- Přihlašuje se k realizaci
- Dokumentuje provedené práce
- Získává platby za dokončené práce

### Administrátor (Admin) — Fáze 1

- Zpracovává poptávky manuálně
- Rozděluje požadavky na konkrétní služby
- Spravuje systém