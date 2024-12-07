import chalk from 'chalk';

export function logger(message, value = '', level = 'info') {
    const now = new Date().toISOString();
    const levels = {
        info: chalk.greenBright,
        warn: chalk.yellowBright,
        error: chalk.redBright,
        success: chalk.blueBright,
        debug: chalk.magentaBright,
    };
    
    const log = levels[level] || chalk.whiteBright;
    console.log(log(`[${now}] [${level.toUpperCase()}]: ${message}`, chalk.yellowBright(value)));
}
