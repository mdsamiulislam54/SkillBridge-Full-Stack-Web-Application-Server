import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { config } from "../src/config/config";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",

    }),

    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: config.betterAuthUrl
        },
        cookies: {
            session_token: {
                name: "__Secure-better-auth.session_token",
                attributes: {
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    path: "/",
                }
            }
        }
    },
    trustedOrigins: ["https://skillbridge-chi-seven.vercel.app", 'http://localhost:3000', config.betterAuthUrl],
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