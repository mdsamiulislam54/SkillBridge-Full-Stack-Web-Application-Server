
import { prisma } from "../lib/prisma.js";
import app from "./app";
import { config } from "./config/config";
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1)
});

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        app.listen(config.appPort, () => {
            console.log(`=================================`);
            console.log(`Server is running on port ${config.appPort}`);
         
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        await prisma.$disconnect();
        process.exit(1);

    }

}

main();