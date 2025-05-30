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
# optionally set DB_CONNECTION_STRING to override the default SQL Server connection
dotnet run

cd frontend/inventory-ui
npm install
# copy .env.example to .env and update the value if your backend runs elsewhere
npm run dev
```

The `.env` file in `frontend/inventory-ui` defines `VITE_API_URL`.
Edit this value to point the React app at a different backend server.

The backend can read its SQL Server connection from the `DB_CONNECTION_STRING`
environment variable. If not set, it falls back to the connection string in
`appsettings.json`.

## Reports

The backend exposes `GET /api/reports/inventory` which returns the current
inventory as a CSV file. A small helper script is provided to fetch this data
and save it locally.

```bash
pip install -r reports/requirements.txt
python reports/generate_report.py
```

Set `API_BASE_URL` if your backend runs on a different URL (defaults to
`http://localhost:5204`).
