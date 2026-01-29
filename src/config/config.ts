import env from 'dotenv';
env.config();
export const config = {
    databaseUrl: process.env.DATABASE_URL || "",
    appPort: process.env.PORT || 5000,
    betterAuthUrl: process.env.BETTER_AUTH_URL || "http://localhost:5000",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    appEmail: process.env.APP_EMAIL || "",
    appUser: process.env.APP_USER || "",
    appUrl: process.env.APP_URL || "http://localhost:3000"

}