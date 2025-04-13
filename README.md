# 🧩 React CMS Web Application

A powerful and flexible CMS built with **React (Vite)** on the frontend, **Express** on the backend, and **Meilisearch** as the database. Authentication is handled via **Google OAuth**, and **Zod** is used for safe and robust validation.

## 🚀 Features

### 👥 Customer Management

- Add, edit, and delete customers.
- Dynamic and lightning-fast search and filtering using Meilisearch.

### 🔐 Admin & Authentication System

- Login via Google OAuth.
- Add and remove admin users to control access to the system.

### 🔑 VPN Key Management

- Upload `.txt` files containing VPN keys.
- Automatically convert to JSON format.
- Keys are indexed in Meilisearch.
- Search and filter by used/unused keys.

## 🛠 Tech Stack

### 🖼 Frontend (React / Vite)

- **React 19**
- **Vite** for fast builds and development
- **React Router v7** for routing
- **Styled Components** for styling
- **Axios** for HTTP requests
- **Google OAuth** via `@react-oauth/google`
- **Zod** for validation
- **Phosphor Icons** for UI icons
- **UUID** for unique IDs

### 🌐 Backend (Express)

- **Express.js** server
- **Meilisearch** as search index/database
- **Google Auth Library** for OAuth verification
- **Dotenv** for environment variables
- **Cookie-parser** & **CORS** for session handling

## 📂 Project Structure

```bash
root/
├── client/             # React client
├── server/             # Express backend
├── shared/             # Shared code (if any)
├── README.md           # You're here
├── package.json        # Root config
```

## 🔐 Authentication

The project uses **Google OAuth**:

- Client ID is set in `.env` file.
- Backend verifies token using Google and Firebase Admin SDK.
- Admin access is managed on the backend.

## 📦 Installation

```bash
# 1. Clone the repository
git clone your-repo-url

# 2. Install root dependencies (zod/uuid/ts)
npm install

# 3. Navigate to client and install
cd client
npm install

# 4. Navigate to server and install
cd ../server
npm install
```

## 🐳 Installera Meilisearch med Docker

För att köra Meilisearch lokalt använder projektet **Docker**. Se till att Docker är installerat på din dator.  
👉 [Ladda ner Docker här](https://www.docker.com/products/docker-desktop) om du inte redan har det.

### 1️⃣ Skapa en `docker-compose.yml` i projektroten:

```yaml
version: "3.8"
services:
  meilisearch:
    image: getmeili/meilisearch:latest
    container_name: meilisearch
    ports:
      - "7700:7700"
    environment:
      - MEILI_MASTER_KEY=your-api-key
    volumes:
      - meilisearch-data:/data.ms

volumes:
  meilisearch-data:
```

> 🔑 Byt ut `your-api-key` mot samma nyckel som du använder i `server/.env`.

### 2️⃣ Starta Meilisearch-tjänsten:

```bash
docker-compose up -d
```

### 3️⃣ Kontrollera att Meilisearch är igång:

Öppna [http://localhost:7700](http://localhost:7700) i din webbläsare.  
Du bör se ett svar från Meilisearch som bekräftar att det körs korrekt.

### 🛠️ Vanliga fel & lösningar

#### ❌ Fel: `docker-compose: command not found`

Det betyder att Docker Compose inte är installerat eller inte tillgängligt i terminalen.

✅ **Lösning:**
Installera Docker Compose genom att följa instruktionerna för ditt operativsystem här:  
👉 https://docs.docker.com/compose/install/

#### ❌ Fel: `bind: address already in use`

Det betyder att port `7700` redan används av en annan tjänst.

✅ **Lösning:**

- Stoppa den andra tjänsten, eller
- Ändra porten i `docker-compose.yml`, t.ex.:
  ```yaml
  ports:
    - "7701:7700"
  ```
  Uppdatera även `MEILISEARCH_HOST` i `.env` till:
  ```
  MEILISEARCH_HOST=http://localhost:7701
  ```

#### ❌ Meilisearch startar men frontend visar ingen data

✅ **Lösning:**

- Kontrollera att `MEILI_MASTER_KEY` i `server/.env` är **exakt samma** som i `docker-compose.yml`.
- Kontrollera att backend-servern initierar och indexerar datan till Meilisearch.

## ▶️ Start Development Environment

```bash
# Start frontend (client/)
npm run start

# Start backend (server/)
npm run dev
```

## 🧪 Build for Production

```bash
# Build frontend (client/)
npm run build

# Build backend (server/)
npm run build
```

## ⚙️ Environment Variables

Create `.env` files in both `client/` and `server/` with the required keys:

### 📁 client/.env

```
VITE_GOOGLE_CLIENT_ID=your-client-id
```

### 📁 server/.env

```
PORT=5000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
MEILISEARCH_HOST=http://localhost:7700
MEILI_MASTER_KEY=your-api-key
```

## ✅ TODO / Upcoming Features

- [ ] Role-based permissions
- [ ] Automation
- [ ] UI optimization for large datasets

## ✅ / Grades

Godkänt (G):För att du ska få Godkänt (G) på ditt examensarbete, behöver du uppfylla samtliga kursmål och krav som nämnts i uppgiften. Här är en översikt av vad du skauppnå för G:

- [x] Planering och Research:oUtföra en noggrann målgruppsanalys.

- [x] Använda ett projekthanteringsverktyg för backlog till exempel TrelloellerKanbanföratt strukturera arbetet.

- [x] Design och Prototyping:oSkapa wireframes och prototyp i Figma som följer UX/UI-principer.

- [x] Se till att designen är responsiv för minst två olika skärmstorlekaroch följer WCAG 2.1-standarder.

- [x] Applikationsutveckling:oUtveckla med ett modernt JavaScript-ramverk.

- [x] Använd en databas för lagring och hämtning av data.

- [x] Implementera state-hantering och skapa dynamiska komponenter med reaktivitet och interaktivitet.

- [x] Följa WCAG 2.1-standarder och använda semantisk HTML.

- [x] För webbapp:Produkten ska vara responsiv och fungera korrekt på minst två skärmstorlekar, till exempel mobil och dator. Gränssnittet ska anpassa sig för att ge en användarvänlig upplevelse på båda dessa enheter.

- [x] För native mobilapp:Produkten ska anpassas till olika skärmstorlekar och enhetsorienteringar (porträtt och landskap). Gränssnittet ska fungera sömlöst på flera mobila enheter, som smartphones och surfplattor, med korrekt layout, skalning och användarvänlighet oavsett skärmstorlek.

- [x] Versionshantering:

- [x] Arbeta med Git och ha ett repo på GitHub.

- [x] Slutrapport, skriv en 2-3 sidor lång rapport med:

- [x] Abstract på engelska.

- [x] Tech stack och motivering av valen.

- [x] Dokumentation av arbetsprocess, planering och research.

- [x] Deploy:

- [x] Ditt projekt ska vara hostat och tillgängligt för att kunna visas i en webbläsareeller simulator.

---

## 🤝 License

This project is open source and free to use. Feel free to add your name to the `author` field in `package.json` ✌️

---

## Deployed

https://claudia-cms-system.netlify.app

## 💬 Feedback or Questions?

Create an [issue](https://github.com/your-repo-url/issues) or contact me directly!
