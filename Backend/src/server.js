import express from "express";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import productsRoutes from "./routes/productsRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import { morganMiddleware, startServer } from "./utils/logger.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 3333;

BigInt.prototype.toJSON = function () {
    return Number(this);
};

app.use(express.json());
app.use(morganMiddleware);

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Controle de Estoque",
            version: "1.0.0",
            description: "Controle de estoque documentado com todos os métodos CRUD.",
        },
    },
    apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/products", productsRoutes);
app.use("/sales", salesRoutes);
app.use("/purchases", purchaseRoutes);

// Iniciar servidor
startServer(app, PORT);
