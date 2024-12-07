import { generateRandomId } from "./system.js";
import { readToken, saveToken } from "./file.js";
import { logger } from "./logger.js";
import axios from 'axios';

async function connectWithToken(token) {
    const url = 'https://api.oasis.ai/internal/authConnect?batch=1';
    const randomId = generateRandomId();
    const payload = {
        "0": {
            "json": {
                "name": randomId,
                "platform": "headless"
            }
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,  
    };

    try {
        const response = await axios.post(url, payload, { headers });
        const logToken = response.data[0].result.data.json;
        logger('Creating Providers successful:', logToken);
        return logToken;
    } catch (error) {
        logger('Creating Providers error:', error.response ? error.response.status : error.response.statusText, 'error');
        return null;
    }
}

export async function createProviders(numID) {
    try {
        const tokens = await readToken('tokens.txt');
        for (const token of tokens) { 
            logger(`Creating Providers using token: ${token}`);
            for (let i = 0; i < numID; i++) {
                logger(`Creating Providers #${i + 1}....`);
                const logToken = await connectWithToken(token);
                if (logToken) {
                    saveToken("providers.txt", logToken)
                } else {
                    logger('Failed to create provider', 'error', 'error');
                    continue;
                }
            };
            
        };
        return true;
    } catch (error) {
        logger("Error reading token or connecting:", error, 'error');
    };
};
