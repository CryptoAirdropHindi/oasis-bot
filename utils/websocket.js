import WebSocket from "ws";
import { HttpsProxyAgent } from "https-proxy-agent";
import { generateRandomId, generateRandomSystemData } from "./system.js";
import { delay } from "./file.js";
import { logger } from "./logger.js";

export async function createConnection(token, proxy = null) {
    const wsOptions = {};
    if (proxy) {
        logger(`Connect Using proxy: ${proxy}`);
        wsOptions.agent = new HttpsProxyAgent(proxy);
    }

    const socket = new WebSocket(`wss://ws.oasis.ai/?token=${token}`, wsOptions);

    socket.on("open", async () => {
        logger(`WebSocket connection established for providers: ${token}`, "", "success");
        const randomId = generateRandomId();
        const systemData = generateRandomSystemData();

        socket.send(JSON.stringify(systemData));
        await delay(2000);

        socket.send(
            JSON.stringify({
                id: randomId,
                type: "heartbeat",
                data: {
                    version: "0.1.7",
                    mostRecentModel: "unknown",
                    status: "active",
                },
            })
        );

        setInterval(() => {
            const randomId = generateRandomId();
            socket.send(
                JSON.stringify({
                    id: randomId,
                    type: "heartbeat",
                    data: {
                        version: "0.1.7",
                        mostRecentModel: "unknown",
                        status: "active",
                    },
                })
            );
        }, 60000);
    });

    socket.on("message", (data) => {
        const message = data.toString();
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === "serverMetrics") {
                const { totalEarnings, totalUptime, creditsEarned } = parsedMessage.data;
                logger(`Heartbeat sent for provider: ${token}`);
                logger(`Total uptime: ${totalUptime} seconds | Credits earned:`, creditsEarned);
            } else if (parsedMessage.type === "acknowledged") {
                logger("System Updated:", message, "warn");
            } else if (parsedMessage.type === "error" && parsedMessage.data.code === "Invalid body") {
                const systemData = generateRandomSystemData();
                socket.send(JSON.stringify(systemData));
            }
        } catch (error) {
            logger("Error parsing message:", "error");
        }
    });

    socket.on("close", () => {
        logger("WebSocket connection closed for token:", token, "warn");
        setTimeout(() => {
            logger("Attempting to reconnect for token:", token, "warn");
            createConnection(token, proxy); 
        }, 5000);
    });

    socket.on("error", (error) => {
        logger("WebSocket error for token:", token, "error");
    });
}
