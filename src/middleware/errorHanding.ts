
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

import { Prisma } from "../../generated/prisma/client";
export function errorHander(err: Error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
    const message = err.message || 'Internal Server Error';

    if (err instanceof Error.ValidationError) {
        statusCode = 400;
        errorMessage = 'Validation Error';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        errorMessage = 'Invalid ID Format';
    } else if (err instanceof SyntaxError) {
        statusCode = 400;
        errorMessage = 'Bad Request';
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                statusCode = 409;
                errorMessage =
                    "This data already exists. Please use a different value.";
                break;

            case "P2025":
                statusCode = 400;
                errorMessage = "The requested record was not found.";
                break;

            case "P2003":
                statusCode = 400;
                errorMessage =
                    "Operation failed due to a related record constraint.";
                break;

            default:
                statusCode = 400;
                errorMessage = "The request could not be completed.";
        }
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 503;
        errorMessage = "Service Unavailable";

    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 503;
        errorMessage = "server restart needed";
    }
    res.status(statusCode).json({
        success: false,
        message: message
    });

    if (res.headersSent) {
        return next(err);
    }

    return res.status(statusCode).json({
        statusCode,
        message: errorMessage,
        errorDetails: err
    });
}