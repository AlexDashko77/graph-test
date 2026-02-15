# CPG Viewer - Full-Stack Application

Interactive Code Property Graph Explorer built with Next.js and Express.

## 🚀 Quick Start (Production with Docker)

### Prerequisites

- Docker
- Docker Compose

### One Command Launch

```bash
docker-compose up --build
```

Wait for containers to start, then open:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000

### Stop

```bash
docker-compose down
```

---

## 🛠️ Development Mode

### Prerequisites

- Node.js 20+
- npm

### Backend

```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:3000
```

---

## 📦 Docker Commands

```bash
# Build images
docker-compose build

# Start containers (detached)
docker-compose up -d

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up --build

```

---

## 🏗️ Project Structure

```
cpg-fullstack/
├── backend/              # Express API server
│   ├── src/
│   │   ├── lib/         # Database connection
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API endpoints
│   │   ├── types/       # TypeScript types
│   │   └── server.ts    # Entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/            # Next.js web app
│   ├── src/
│   │   ├── app/         # Pages and components
│   │   ├── lib/         # Utilities
│   │   └── types/       # TypeScript types
│   │   └── components/
│   │   └── hooks/
│   │   └── contexts/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml   # Docker orchestration
├── data/            # SQLite database
└── README.md
```

---

## 🔧 Tech Stack

### Backend

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite (better-sqlite3)
- **Runtime:** Node.js 20

### Frontend

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Graph Viz:** Cytoscape.js
- **Code Highlight:** Prism.js

---

## 📊 Database

SQLite database (~1000 MB) containing:

- 515,000+ nodes
- 1,500,000+ edges
- Prometheus codebase CPG

---

## 🌐 API Endpoints

- `GET /api/functions` - Search functions
- `POST /api/graph` - Get call graph
- `GET /api/source` - Get source code
- `GET /api/stats` - Get statistics

---

## 🔍 Features

- ✅ Interactive call graph visualization
- ✅ Function search with autocomplete
- ✅ Source code viewer with syntax highlighting
- ✅ Navigation history (back/forward)
- ✅ Auto-zoom for large graphs
- ✅ Responsive design
- ✅ Docker deployment
