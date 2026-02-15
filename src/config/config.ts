import dotenv from 'dotenv';
dotenv.config();

export const config = {
    databaseUrl: process.env.DATABASE_URL || "",
    appPort: process.env.PORT || 5000,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    appEmail: process.env.APP_EMAIL || "",
    appUser: process.env.APP_USER || "",
    appUrl: process.env.APP_URL || "",
    
   
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development'
};