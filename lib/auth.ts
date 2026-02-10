import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",

    }),
    trustedOrigins: ["https://skillbridge-chi-seven.vercel.app", 'http://localhost:3000'],

    cookie: {
        name: "__Secure-better-auth.session_token",
        secure: true,
        httpOnly: true,
        sameSite: "none", 
        path: "/",
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