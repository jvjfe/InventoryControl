---

# InventoryControl

InventoryControl is a project developed to manage inventory using **Express**, **Node.js**, **PostgreSQL**, and **Prisma** on the backend. The frontend is being developed using **React**.

## Backend Setup

### Requirements

- Node.js (v22.14.0)  
- PostgreSQL (v14)
- Prisma (v6.6.0)

### Other NPM Packages

- Swegger (v5.4.1)
- Express (v5.1.0)
- Chalk (v5.4.1)
- Morgan (v1.10.0)
- Nodemon (v3.1.10)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jvjfe/InventoryControl.git
cd InventoryControl
```

2. Navigate to the backend directory (if separated):

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
npx prisma migrate dev
```

7. Start the development server:

```bash
npm run dev
```

---

## Frontend Setup

Frontend is currently **under development** and will be updated in the next version of this documentation.

---
