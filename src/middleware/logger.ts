import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(7);

    // Request details
    console.log(`[${requestId}] ➡️ ${req.method} ${req.originalUrl}`);
    console.log(`[${requestId}] 📍 IP: ${req.ip}`);
    console.log(`[${requestId}] 🌐 Origin: ${req.get("origin") || "unknown"}`);

    // Response tracking
    res.on("finish", () => {
        const duration = Date.now() - start;
        const statusEmoji = res.statusCode < 400 ? "✅" : "❌";

        console.log(
            `[${requestId}] ${statusEmoji} ${req.method} ${req.originalUrl} | ` +
            `Status: ${res.statusCode} | ${duration}ms`
        );

        // Slow requests alert (> 1 second)
        if (duration > 1000) {
            console.log(`[${requestId}] ⚠️ Slow request detected!`);
        }

        console.log(chalk.blue(`[REQUEST] ${req.method} ${req.originalUrl}`));
        console.log(chalk.green(`[RESPONSE] ${res.statusCode} | ${duration}ms`));
    });


    next();
};

export default logger;