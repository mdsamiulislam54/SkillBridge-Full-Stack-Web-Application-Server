import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { config } from "../src/config/config";
// import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: config.betterAuthUrl,
    basePath: '/api/auth',

    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: true,
        crossSubDomainCookies: {
            enabled: true,
          
        },
        cookies: {
            session_token: {
                attributes: {
                    secure: true,
                    httpOnly: true,
                    sameSite: "lax",  
                    path: "/",
                  
                }
            }
        },
        
        disableCSRFCheck: true,
    },

  
    trustedOrigins: [
        "https://skillbridge-chi-seven.vercel.app",
        "https://skillbridge-server-inky.vercel.app",
        "http://localhost:3000",
        "http://localhost:4000",
        "http://localhost:5000"
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


    // plugins:[nextCookies()]
});