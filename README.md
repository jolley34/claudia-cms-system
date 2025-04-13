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

# 🚀 Meilisearch Setup with Docker

This guide explains how to install and run **Meilisearch** locally using **Docker**.

## 📦 Prerequisites

Make sure **Docker** is installed on your computer.  
👉 [Download Docker here](https://www.docker.com/products/docker-desktop) if you haven’t already.

---

## 🐳 Installing Meilisearch with Docker

### 1️⃣ Create a `docker-compose.yml` file in your project root:

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

> 🔑 Replace `your-api-key` with the same key you're using in `server/.env`.

---

### 2️⃣ Start the Meilisearch service

In your terminal, run:

```bash
docker-compose up -d
```

This will start Meilisearch in detached mode.

---

### 3️⃣ Confirm that Meilisearch is running

Open your browser and go to:  
[http://localhost:7700](http://localhost:7700)

You should see a welcome screen or a response from Meilisearch confirming that the service is running.

---

## 🛠️ Common Issues & Fixes

### ❌ Error: `docker-compose: command not found`

This means Docker Compose is either not installed or not accessible from your terminal.

✅ **Fix:**  
Install Docker Compose by following the official guide:  
👉 https://docs.docker.com/compose/install/

---

### ❌ Error: `bind: address already in use`

This means port `7700` is already in use by another application.

✅ **Fix:**

- Stop the conflicting service, or
- Change the port mapping in `docker-compose.yml`, for example:
  ```yaml
  ports:
    - "7701:7700"
  ```
  Also update the `MEILISEARCH_HOST` in your `.env` file:
  ```
  MEILISEARCH_HOST=http://localhost:7701
  ```

---

### ❌ Meilisearch starts, but the frontend shows no data

✅ **Fix:**

- Ensure the `MEILI_MASTER_KEY` in your `server/.env` file is **exactly the same** as in `docker-compose.yml`.
- Make sure your backend server is properly initializing and indexing the data into Meilisearch.

---

## ✅ Done!

You're now ready to use Meilisearch in your local development environment. 🎉

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

### 🔐 Add a Google Admin to Meilisearch (for Local Access)

To access protected routes or simulate authentication during development, you can manually add an admin to your local Meilisearch instance.

#### ✅ IMPORTANT TO GAIN ACCESS / Run this command in your terminal:

```bash
curl -X POST http://localhost:7700/indexes/admins/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-meilisearch-master-key-here" \
  -d '[
    {
      "id": "1231231414",
      "name": "Initial Admin",
      "email": "your@email.com",
      "isAdmin": true,
      "sub": "admin"
    }
  ]'
```

#### 🔁 Replace the following values:

- `your-meilisearch-master-key-here` → Your actual Meilisearch API key (`MEILI_MASTER_KEY`)
- `"your@email.com"` → Your own email address

> 📌 This step is important to seed the `admins` index so your local environment can recognize you as an admin.

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
