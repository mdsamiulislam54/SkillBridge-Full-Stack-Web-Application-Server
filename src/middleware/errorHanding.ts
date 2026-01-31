import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid or missing request fields.";
    }

    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                statusCode = 409;
                message = "This data/user already exists.";
                break;

            case "P2025":
                statusCode = 404;
                message = "Record not found.";
                break;

            case "P2003":
                statusCode = 400;
                message = "Invalid relation. Related record not found.";
                break;

            default:
                statusCode = 400;
                message = "Database error.";
        }
    }

    else if (err instanceof SyntaxError) {
        statusCode = 400;
        message = "Invalid JSON format.";
    }

    else if (err instanceof Error) {
        statusCode = 400;
        message = err.message;
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};
