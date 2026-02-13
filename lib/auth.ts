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
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    path: "/",
                    domain: ".onrender.com",
                }
            }
        }
    },

    trustedOrigins: [
        'http://localhost:3000',
        'https://skillbridge-chi-seven.vercel.app',
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