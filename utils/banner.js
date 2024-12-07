import chalk from 'chalk';

const art = `
      _____                  _                _         _                 _    _ _           _ _ 
  / ____|                | |         /\   (_)       | |               | |  | (_)         | (_)
 | |     _ __ _   _ _ __ | |_ ___   /  \   _ _ __ __| |_ __ ___  _ __ | |__| |_ _ __   __| |_ 
 | |    | '__| | | | '_ \| __/ _ \ / /\ \ | | '__/ _` | '__/ _ \| '_ \|  __  | | '_ \ / _` | |
 | |____| |  | |_| | |_) | || (_) / ____ \| | | | (_| | | | (_) | |_) | |  | | | | | | (_| | |
  \_____|_|   \__, | .__/ \__\___/_/    \_\_|_|  \__,_|_|  \___/| .__/|_|  |_|_|_| |_|\__,_|_|
               __/ | |                                          | |                           
              |___/|_|                                          |_|                           
                    Running Oasis Ai BETA CLI Version                
                https://t.me/Crypto_airdropHM                   
`;

export function centerText(text) {
    const lines = text.split('\n');
    const terminalWidth = process.stdout.columns || 80; 
    return lines
        .map(line => {
            const padding = Math.max((terminalWidth - line.length) / 2, 0);
            return ' '.repeat(padding) + line;
        })
        .join('\n');
}

export function showBanner() {
    console.log(chalk.green(centerText(art)));
}
