// npx nodemon ./src/server.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

// Middleware de logs colorido
app.use(morgan((tokens, req, res) => {
    return [
        chalk.blueBright(`[${tokens.method(req, res)}]`),
        chalk.green(tokens.url(req, res)),
        chalk.yellow(tokens.status(req, res)),
        chalk.cyan(`${tokens['response-time'](req, res)}ms`)
    ].join(' ');
}));

// Use o arquivo separado de rotas
app.use('/users', userRoutes(prisma));

// Inicialização do servidor
app.listen(PORT, () => {
    const now = new Date().toLocaleString();
    console.clear();
    console.log(chalk.bgGreen.bold('\n=== Servidor Iniciado ===\n'));
    console.log(`${chalk.greenBright('📅 Data/Hora:')} ${chalk.white(now)}`);
    console.log(`${chalk.greenBright('🌍 Ambiente:')} ${chalk.white(process.env.NODE_ENV || 'SarsDev Backend')}`);
    console.log(`${chalk.redBright('🚀 Porta:')} ${chalk.red(PORT)}`);
    console.log(chalk.blueBright('\n➡ Acesse: ') + chalk.underline(`http://localhost:${PORT}/users\n`));
});
