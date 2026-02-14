import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { config } from "../src/config/config";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.BETTER_AUTH_URL!,
    trustedOrigins: [process.env.APP_URL!],
    basePath: '/api/auth',

    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: true,
        trustedOrigins: true,
        crossSubDomainCookies: {
            enabled: true,

        },
        cookies: {
            session_token: {
                attributes: {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None',
                    path: "/",

                }
            }
        },

        disableCSRFCheck: true,
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


    plugins: [nextCookies()]
});