# Zahrada - Platforma pro správu a údržbu zahrad

Webová aplikace pro správu zahrad a zprostředkování zahradnických služeb. Propojuje vlastníky zahrad s profesionálními pracovníky a umožňuje transparentní správu zakázek od poptávky po dokončení.

## Obsah

- [O projektu](#o-projektu)
- [Aktuální stav vývoje](#aktuální-stav-vývoje)
- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)
- [Instalace](#instalace)
- [Spuštění](#spuštění)
- [Funkce aplikace](#funkce-aplikace)
- [Uživatelské role](#uživatelské-role)
- [Testovací účty](#testovací-účty)

## O projektu

**Zahrada** je moderní platforma, která zjednodušuje proces správy zahrad a zprostředkování zahradnických služeb. Aplikace propojuje vlastníky zahrad s kvalifikovanými pracovníky a zajišťuje transparentní a bezpečný průběh celého procesu.

### Jak to funguje:

1. **Vlastník zahrady** vytvoří profil své zahrady, přidá fotografie a popíše požadované úpravy
2. **Administrátor** (Fáze 1) nebo **AI systém** (Fáze 2) zpracuje poptávku a rozdělí ji na konkrétní služby
3. **Pracovníci** vidí dostupné zakázky v okolí a přihlásí se k jejich realizaci
4. Po dokončení **pracovník nahraje fotografie** výsledku a popis provedených prací
5. **Platba** probíhá bezpečně přes aplikaci - klient platí předem, prostředky jsou uvolněny po dokončení
6. Aplikace eviduje **kompletní historii** úprav každé zahrady

## Aktuální stav vývoje

**Verze: Fáze 1 - Vývojová verze (MVP)**

Aktuálně implementované funkce:
- Registrace a přihlášení uživatelů (vlastníci/pracovníci)
- Správa uživatelského profilu
- Vytváření a editace zahrad
- Nahrávání fotografií zahrad
- Responzivní design
- Lokální úložiště dat (localStorage)

**Připravované funkce (Fáze 2 - Modernizace):**
- Backend API pro správu dat
- Systém zakázek a poptávek
- AI automatizace zpracování poptávek
- Platební brána
- Geolokace a filtrování zakázek
- Notifikační systém
- Historie úprav a reporting

## Technologie

### Frontend Stack
- **IDE:** WebStorm
- **Framework:** React 19.1.0
- **Routing:** React Router DOM 7.12.0
- **Build Tool:** Vite 7.0.4
- **Styling:** SCSS (Sass 1.97.2)
- **Metodologie CSS:** BEM (Blok, Element, Modifikátor)

### Architektura
- **Pattern:** Feature-Sliced Design (FSD)
- **State Management:** React Context API
- **Storage:** LocalStorage (dočasně, Fáze 1)

## Struktura projektu

Projekt využívá **Feature-Sliced Design (FSD)** - moderní architektonický přístup pro frontendové aplikace. FSD organizuje kód podle business logiky a funkcionalit místo technických vrstev, což usnadňuje škálování a údržbu projektu.


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

## Instalace

### Požadavky
- Node.js >= 18.0.0
- npm >= 9.0.0


## Spuštění


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

## Funkce aplikace

### Pro vlastníky zahrad (Role: Owner)

**Správa profilu:**
- Editace uživatelského jména a emailu
- Změna hesla
- Smazání účtu (s potvrzením)

**Správa zahrad:**
- Vytvoření nové zahrady s fotografií
- Editace informací o zahradě
- Smazání zahrady
- Přehled všech zahrad na dashboardu

**Informace o zahradě:**
- Název zahrady
- Fotografie
- Rozloha (m²)
- Adresa (město, ulice, číslo domu, PSČ)

### Pro pracovníky (Role: Worker)

**Aktuálně:**
- Přihlášení a správa profilu
- Přehled požadavků (připraveno pro Fázi 2)

**Připravované funkce (Fáze 2):**
- Zobrazení dostupných zakázek v okolí
- Přihlášení k zakázkám
- Nahrání výsledků práce (foto + popis)
- Evidence dokončených prací
- Hodnocení od klientů

## Uživatelské role

### Vlastník (Owner)
- Spravuje své zahrady
- Zadává poptávky na služby
- Sleduje historii úprav
- Platí za služby přes aplikaci

### Pracovník (Worker)
- Prohlíží dostupné zakázky
- Přihlašuje se k realizaci
- Dokumentuje provedené práce
- Získává platby za dokončené práce

### Administrátor (Admin) - Fáze 1
- Zpracovává poptávky manuálně
- Rozděluje požadavky na konkrétní služby
- Spravuje systém

## Testovací účty

Pro testování aplikace jsou k dispozici předvytvořené účty:

### Vlastník zahrady
```
Email: jan@example.com
Heslo: 1234
Role: Owner
```
**Testovací data:**
- 2 předvytvořené zahrady s fotografiemi
- Kompletní profil

### Pracovník
```
Email: marie@example.com
Heslo: 1234
Role: Worker
```


### Vytvoření vlastního účtu
1. Klikněte na "Registrovat se"
2. Vyplňte formulář (jméno, email, heslo)
3. Vyberte roli (Vlastník/Pracovník)
4. Potvrďte registraci

> **Poznámka:** Data jsou ukládána v localStorage prohlížeče. Pro reset dat smažte localStorage nebo použijte inkognito režim.