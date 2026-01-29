
import { prisma } from "../lib/prisma";
import app from "./app";
import { config } from "./config/config";


async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        app.listen(config.appPort || 5000, () => {
            console.log(`Server is running on port ${config.appPort || 5000}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        await prisma.$disconnect();
        process.exit(1);

    }
}

main();