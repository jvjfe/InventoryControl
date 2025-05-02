// src/utils/logger.js
import chalk from 'chalk';
import morgan from 'morgan';

export const morganMiddleware = morgan((tokens, req, res) => {
    return [
        chalk.blueBright(`[${tokens.method(req, res)}]`),
        chalk.green(tokens.url(req, res)),
        chalk.yellow(tokens.status(req, res)),
        chalk.cyan(`${tokens['response-time'](req, res)}ms`)
    ].join(' ');
});

export function startServer(app, PORT) {
    app.listen(PORT, () => {
        const now = new Date().toLocaleString();
        console.clear();
        console.log(chalk.bgGreen.bold('\n=== Servidor Iniciado ===\n'));
        console.log(`${chalk.greenBright('📅 Data/Hora:')} ${chalk.white(now)}`);
        console.log(`${chalk.greenBright('🌍 Ambiente:')} ${chalk.white(process.env.NODE_ENV || 'SarsDev Backend')}`);
        console.log(`${chalk.redBright('🚀 Porta:')} ${chalk.red(PORT)}`);
        console.log(chalk.blueBright('\n➡ Acesse: ') + chalk.underline(`http://localhost:${PORT}/docs\n`));
    });
}
