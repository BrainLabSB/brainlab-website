# Brain Lab — Sito web

Stack: **Next.js 16 + Sanity CMS + Tailwind CSS**, deploy su **Vercel**.

---

## Setup iniziale (una sola volta)

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Crea il progetto Sanity

Vai su [sanity.io/manage](https://sanity.io/manage), crea un account gratuito e un nuovo progetto.
Prendi nota di:
- **Project ID** (es. `abc12345`)
- **Dataset**: usa `production`

### 3. Configura le variabili d'ambiente

Copia il file di esempio e compila i valori:

```bash
cp .env.local.example .env.local
```

Apri `.env.local` e inserisci:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` → il Project ID di Sanity
- `NEXT_PUBLIC_SANITY_DATASET` → `production`
- `SANITY_API_READ_TOKEN` → crea un token "Viewer" in Sanity > API > Tokens
- `NEXT_PUBLIC_GTM_ID` → il tuo GTM-XXXXXXX (opzionale)

### 4. Configura HubSpot

Nel file `src/app/contatti/page.tsx`, sostituisci:
- `IL_TUO_PORTAL_ID` → il Portal ID di HubSpot (Impostazioni > Account > ID)
- `IL_TUO_FORM_ID` → l'ID del form (HubSpot > Marketing > Form > Condividi > Codice embed)

### 5. Avvia in locale

```bash
npm run dev
```

- Sito: [http://localhost:3000](http://localhost:3000)
- Sanity Studio CMS: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Deploy su Vercel

### Prima volta

1. Carica il codice su un repository GitHub (nuovo repo privato)
2. Vai su [vercel.com](https://vercel.com), crea un account e clicca **Add New Project**
3. Importa il repository GitHub
4. Nella sezione **Environment Variables**, aggiungi le stesse variabili di `.env.local`
5. Clicca **Deploy**

### Deploy successivi

Ogni `git push` su `main` aggiorna il sito automaticamente.

### Autorizzare Sanity a rispondere a Vercel

In Sanity > Manage > API > CORS Origins, aggiungi:
- `https://il-tuo-dominio.vercel.app`
- Il tuo dominio finale (es. `https://brainlab.digital`)

---

## Struttura del progetto

```
src/
  app/
    page.tsx              ← Homepage
    servizi/              ← Lista servizi + pagina singola
    case-study/           ← Lista case study + pagina singola
    blog/                 ← Lista articoli + articolo singolo
    chi-siamo/            ← Pagina chi siamo
    contatti/             ← Pagina contatti con form HubSpot
    studio/               ← Sanity Studio (CMS)
  components/
    Header.tsx            ← Navigazione
    Footer.tsx            ← Footer
    HubSpotForm.tsx       ← Componente form HubSpot
    PortableText.tsx      ← Renderer rich text da Sanity
    SanityImage.tsx       ← Immagini ottimizzate da Sanity
sanity/
  schemas/                ← Tipi di contenuto (post, servizi, case study, impostazioni)
  lib/
    client.ts             ← Client Sanity
    queries.ts            ← Query GROQ per i dati
    image.ts              ← Helper immagini
```

## Personalizzazione brand

Colori e font sono in `src/app/globals.css`. Il blu principale è `#2563eb` (blue-600 di Tailwind).
Aggiorna con i tuoi colori brand prima del lancio.

---

## Note importanti

- Lo Studio Sanity all'URL `/studio` è accessibile a chiunque conosca l'URL.
  Prima del lancio, proteggilo con **Vercel Authentication** (gratuita per progetti personali)
  oppure con un middleware Next.js che richiede login.
- I video si gestiscono tramite embed YouTube/Vimeo nel contenuto rich text del CMS.
