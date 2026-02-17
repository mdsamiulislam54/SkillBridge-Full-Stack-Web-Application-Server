
import { prisma } from "../../lib/prisma";
import { userRole } from "../middleware/authVerify";

export async function SeedAdmin() {
    try {
        const data = {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            role: userRole.ADMIN,
            password: process.env.ADMIN_PASSWORD as string,
        }
        console.log("_____Body", data)
        const exitsUser = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (exitsUser) {
            throw new Error("User already exists in database")
        };

        const signUpAdmin = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 Origin: process.env.APP_URL as string,
            },

            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        });

        if (!signUpAdmin.ok) {
            throw new Error("SignUp Failed")
        };

        await prisma.user.update({
            where: { email: data.email },
            data: {
                role: userRole.ADMIN

            }
        })
        console.log(" Admin created successfully");
    } catch (error) {

        console.log(error);
    }
}

SeedAdmin()