# Inventory Management System 🧾📦

A full-stack web app using:

- ⚛️ React + TypeScript (frontend)
- 🐍 .NET 8 Web API + Entity Framework (backend)
- 🗃️ SQL Server

## Features
- Add products
- View inventory
- Real-time sync
- CORS enabled

## Setup
Run the helper script to install .NET, Node.js and Vite:

```bash
./scripts/setup.sh
```

## Getting Started

```bash
cd backend/InventoryApi
dotnet run

cd frontend/inventory-ui
npm install
# copy .env.example to .env and update the value if your backend runs elsewhere
npm run dev
```

The `.env` file in `frontend/inventory-ui` defines `VITE_API_URL`.
Edit this value to point the React app at a different backend server.
