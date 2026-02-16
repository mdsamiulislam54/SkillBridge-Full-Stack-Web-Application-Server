import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: ["https://skillbridge-chi-seven.vercel.app", "http://localhost:3000", "https://skillbridge-app-api-inky.vercel.app"],
    advanced: {
        cookies: {
            _Session: {
                attributes: {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: process.env.NODE_ENV === 'production' ? true : false
                }
            }
        }
    },

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