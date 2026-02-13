import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { config } from "../src/config/config";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: config.betterAuthUrl,

    advanced: {
        crossSubDomainCookies: {
            enabled: true,
        },
        cookies: {
            session_token: {
               
                name: config.isProduction 
                    ? "__Secure-better-auth.session_token" 
                    : "better-auth.session_token",
                attributes: {
                    secure: config.isProduction, 
                    httpOnly: true,
                    sameSite: config.isProduction ? "none" : "lax",
                    path: "/",
                    domain: config.isProduction 
                        ? ".onrender.com" 
                        : "localhost",
                }
            }
        }
    },
    
    trustedOrigins: [
        config.appUrl,
        'http://localhost:3000',
        'https://skillbridge-chi-seven.vercel.app',
        'https://skillbridge-full-stack-web-application.onrender.com'
    ],
    
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "STUDENT"
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
});