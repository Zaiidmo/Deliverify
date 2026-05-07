# 🚚 Deliverify

**Deliverify** is a comprehensive delivery management ecosystem designed for high efficiency and reliability. This monorepo contains both the **React-based Frontend** and the **Express/MongoDB Backend**, unified under a single development workflow.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 🏗️ Architecture

This project is structured as an **NPM Workspace Monorepo**, ensuring a shared development environment and streamlined dependency management.

- **[frontend/](./frontend)**: React + Vite + TailwindCSS application.
- **[backend/](./backend)**: Node.js + Express.js API with over 130 Jest tests.

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** (v20+)
- **MongoDB** (running instance)

### 2. Setup
Clone the repository and install all dependencies for both apps at once:

```bash
git clone https://github.com/Zaiidmo/Deliverify.git
cd Deliverify
npm install
```

### 3. Environment Config
Configure both the frontend and backend environment variables:

- **Backend:** Copy `backend/.env.example` to `backend/.env` and fill in your MongoDB URI and secrets.
- **Frontend:** Create `frontend/.env` with your API base URL (default: `http://localhost:3000`).

### 4. Running the Project
Launch both the Frontend and Backend concurrently with a single command:

```bash
npm run dev
```
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

---

## 🛠️ Monorepo Commands

Run these from the **root directory**:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies for the entire project |
| `npm run dev` | Runs Frontend and Backend concurrently |
| `npm test` | Runs all test suites (including 130+ backend tests) |
| `npm run lint` | Lints the entire codebase |
| `npm run build` | Builds both frontend and backend for production |

---

## ✨ Features

- 🔐 **Secure Auth:** JWT-based authentication with role-based access control (RBAC).
- 📊 **Dashboards:** Advanced management for Admins, Sellers, and Couriers.
- 🛵 **Real-time:** Live delivery updates and order tracking.
- 🧪 **Reliable:** Comprehensive test coverage for critical business logic.

---

## 🤝 Community

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. This project adheres to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
