````md
# InventoryControl

InventoryControl is a project developed to manage inventory using **Express**, **Node.js**, **PostgreSQL**, and **Prisma** on the backend. The frontend is developed using **React**.

---

## UML Planning

![UML](docs/UML.png)

The image above represents the initial planning and structure of the system, covering its main entities and their relationships.

---

## How It Works

### Homepage & Dashboards

![Homepage](docs/img1.png)

The homepage provides an overview of the system. It features two dashboards:
- One displays the **last sales from the past 10 hours**.
- The other shows the **top 3 products with the highest stock quantity**.

---

### Product Purchase Simulation

![Purchase Simulation](docs/img2.png)

This section simulates **adding products to stock**:
- Each product includes a **quantity**, **creation and update dates**, and a **detailed table** listing all products and the **total value** of the transaction.

---

### Product Sales Simulation

![Sales Simulation](docs/img3.png)

Similar to the previous section, but this area simulates **product sales**:
- It tracks product quantities, timestamps, and total sales per transaction.

---

### Product Management

![Product Control](docs/img4.png)

This area displays all your registered products:
- You can manage the **status**, **name**, and **price** of each item.
- It also includes **action buttons** similar to those in the sales and purchases pages.

---

## Backend Setup

### Requirements

- Node.js (v22.14.0)
- PostgreSQL (v14)
- Prisma (v6.6.0)

### Other NPM Packages

- Swagger (v5.4.1)
- Express (v5.1.0)
- Chalk (v5.4.1)
- Morgan (v1.10.0)
- Nodemon (v3.1.10)
- Uuid (v11.1.0)

### Installation

```bash
git clone https://github.com/jvjfe/InventoryControl.git
cd InventoryControl
cd src
npm install
````

Create a `.env` file:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_database"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run the app:

```bash
npm start
# or for development:
npm run dev
```

---

## Frontend Setup

Built with **React**, **Axios**, **React Router**, and **Toastify**.

### Requirements

* Node.js (v22.14.0)
* A modern browser

### Core Packages

* React (v19.1.0)
* React Router DOM (v7.5.3)
* Axios (v1.9.0)
* React Toastify (v11.0.5)
* React Icons (v5.5.0)
* Framer Motion (v12.9.7)
* Recharts (v10.9.2)
* DayJS (v10.9.2)

### Installation

```bash
cd frontend
npm install
npm start
```

> The app will be available at `http://localhost:3000`.

---

## Scripts

* `npm start` – Run the development server.
* `npm run build` – Create a production build.
* `npm test` – Run tests.
* `npm run eject` – Ejects the config (irreversible).

```
