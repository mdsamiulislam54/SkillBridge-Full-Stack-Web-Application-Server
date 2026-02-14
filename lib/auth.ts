import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { config } from "../src/config/config";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: config.betterAuthUrl,
    basePath: '/api/auth',

    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: config.isProduction,
        disableCSRFCheck: true,
        crossSubDomainCookies: {
            enabled: false,
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


    trustedOrigins: async (request) => {
        const origin = request?.headers.get("origin");
        const allowedOrigins = [
            process.env.APP_URL,
            process.env.BETTER_AUTH_URL,
            "http://localhost:3000",
            "http://localhost:4000",
            "http://localhost:5000",
            "https://skillbridge-chi-seven.vercel.app",
            // "https://prisma-blog-server-navy.vercel.app",
        ].filter(Boolean);

        // Check if origin matches allowed origins or Vercel pattern
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            /^https:\/\/.*\.vercel\.app$/.test(origin)
        ) {
            return [origin];
        }

        return [];
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

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60
        }
    }
});

