import chalk from 'chalk';

const art = `
  ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗  █████╗ ██╗██████╗ ██████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗██╗███╗   ██╗██████╗ ██╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║  ██║██║████╗  ██║██╔══██╗██║
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║███████║██║██████╔╝██║  ██║██████╔╝██║   ██║██████╔╝███████║██║██╔██╗ ██║██║  ██║██║
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║██╔══██║██║██╔══██╗██║  ██║██╔══██╗██║   ██║██╔═══╝ ██╔══██║██║██║╚██╗██║██║  ██║██║
╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝██║  ██║██║██║  ██║██████╔╝██║  ██║╚██████╔╝██║     ██║  ██║██║██║ ╚████║██████╔╝██║
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝
                                                                                                                                       
                    Running Oasis Ai BETA CLI Version                
                https://t.me/Crypto_airdropHM *** https://github.com/CryptoAirdropHindi                   
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
