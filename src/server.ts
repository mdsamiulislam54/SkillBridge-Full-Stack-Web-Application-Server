
import { prisma } from "../lib/prisma.js";
import app from "./app";
import { config } from "./config/config";
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        app.listen(config.appPort, () => {
            console.log(`=================================`);
            console.log(`🚀 Server is running on port ${config.appPort}`);
            console.log(`📝 Environment: ${config.isProduction ? 'production' : 'development'}`);
            console.log(`🔗 BetterAuth URL: ${config.betterAuthUrl}`);
            console.log(`🌐 App URL: ${config.appUrl}`);
            console.log(`=================================`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        await prisma.$disconnect();
        process.exit(1);

    }
}

main();