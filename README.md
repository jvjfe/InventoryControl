# InventoryControl

InventoryControl is a project developed to manage inventory using **Express**, **Node.js**, **PostgreSQL**, and **Prisma** on the backend. The frontend is developed using **React**.

## Backend Setup

### Requirements

* Node.js (v22.14.0)
* PostgreSQL (v14)
* Prisma (v6.6.0)

### Other NPM Packages

* Swagger (v5.4.1)
* Express (v5.1.0)
* Chalk (v5.4.1)
* Morgan (v1.10.0)
* Nodemon (v3.1.10)
* Uuid (v11.1.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jvjfe/InventoryControl.git
cd InventoryControl
```

2. Navigate to the backend directory:

```bash
cd src
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the backend folder and define your database URL:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_database"
```

> Replace `your_user`, `your_password`, `localhost`, `5432`, and `your_database` with your PostgreSQL configuration.

5. Generate the Prisma client:

```bash
npx prisma generate
```

6. Run the migrations (if applicable):

```bash
npm start
```

> You can also use `npx nodemon ./src/server.js`, `npm start` is set in package.json

7. Start the development server:

```bash
npm run dev
```

---

## Frontend Setup

The frontend is built using **React** with **React Router**, **Axios**, and **React Toastify** for routing, API requests, and notifications.

### Requirements

* Node.js (v22.14.0)
* A modern browser

### Core NPM Packages

* React (v19.1.0)
* React DOM (v19.1.0)
* React Router DOM (v7.5.3)
* Axios (v1.9.0)
* React Toastify (v11.0.5)
* React Icons (v5.5.0)
* Framer Motion (v12.9.7)

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

> The application will be available at `http://localhost:3000`

### Available Scripts

* `npm start` – Runs the app in development mode.
* `npm run build` – Builds the app for production.
* `npm test` – Launches the test runner.
* `npm run eject` – Ejects the configuration (not reversible).
