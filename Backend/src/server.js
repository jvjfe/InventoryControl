import express from "express";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk"; // Apenas para colorir o Console
import morgan from "morgan"; // Para logar cada requisição HTTP no meu terminal

import createUser from "./user/createUser.js";
import { getUsers, getUserById } from "./user/getUser.js";
import updateUser from "./user/updateUser.js";
import deleteUser from "./user/deleteUser.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

app.use(morgan((tokens, req, res) => {
    return [
        chalk.blueBright(`[${tokens.method(req, res)}]`),
        chalk.green(tokens.url(req, res)),
        chalk.yellow(tokens.status(req, res)),
        chalk.cyan(`${tokens['response-time'](req, res)}ms`)
    ].join(' ');
}));

// Rotas de usuários
app.post('/users', (req, res) => createUser(req, res, prisma));
app.get('/users', (req, res) => getUsers(req, res, prisma));
app.get('/users/:id', (req, res) => getUserById(req, res, prisma));
app.put('/users/:id', (req, res) => updateUser(req, res, prisma));
app.delete('/users/:id', (req, res) => deleteUser(req, res, prisma));

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
