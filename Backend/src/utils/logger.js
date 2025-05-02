// src/utils/logger.js

import chalk from 'chalk';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import productsRoutes from '../routes/productsRoutes.js';
import salesRoutes from '../routes/salesRoutes.js';

// Função que configura o morgan com chalk para logs coloridos
const logger = morgan((tokens, req, res) => {
    return [
        chalk.blueBright(`[${tokens.method(req, res)}]`),
        chalk.green(tokens.url(req, res)),
        chalk.yellow(tokens.status(req, res)),
        chalk.cyan(`${tokens['response-time'](req, res)}ms`)
    ].join(' ');
});

// Função para inicializar o servidor
const startServer = (app, PORT) => {
    const prisma = new PrismaClient();

    // Configuração do Swagger
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Controle de Estoque',
                version: '1.0.0',
                description: 'Controle de estoque documentado com todos os métodos CRUD.',
            },
        },
        apis: ['./src/routes/*.js'],
    };

    const swaggerSpec = swaggerJsdoc(swaggerOptions);

    // Usando o middleware do logger
    app.use(logger);

    // Rota do Swagger
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Usando as rotas
    app.use('/products', productsRoutes);
    app.use('/sales', salesRoutes);

    // Inicializando o servidor
    app.listen(PORT, () => {
        const now = new Date().toLocaleString();
        console.clear();
        console.log(chalk.bgGreen.bold('\n=== Servidor Iniciado ===\n'));
        console.log(`${chalk.greenBright('📅 Data/Hora:')} ${chalk.white(now)}`);
        console.log(`${chalk.greenBright('🌍 Ambiente:')} ${chalk.white(process.env.NODE_ENV || 'SarsDev Backend')}`);
        console.log(`${chalk.redBright('🚀 Porta:')} ${chalk.red(PORT)}`);
        console.log(chalk.blueBright('\n➡ Acesse: ') + chalk.underline(`http://localhost:${PORT}/users\n`));
        console.log(chalk.blueBright('\n➡ Acesse a documentação Swagger: ') + chalk.underline(`http://localhost:${PORT}/docs\n`));
    });
};

export { logger, startServer };
