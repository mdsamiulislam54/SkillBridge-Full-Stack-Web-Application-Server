import { NextFunction, Request, Response } from "express";
import { auth } from "../../lib/auth";
export const enum userRole {
    STUDENT = "STUDENT",
    ADMIN = "ADMIN",
    TUTOR = "TUTOR"

}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: any,
                name: string,
                role: string,
                email: string,
                emailVerified: boolean
            }
        }
    }
}
function AuthVerify(...role: userRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession({ headers: req.headers as any });
            if (!session || !session.user) {
                return res.status(401).send({ success: false, message: "Your are not authorized Please Login " });
            }
            if (!role.includes(session.user.role as userRole)) {
                return res.status(401).send({ success: false, message: "You are not authorized to access this resource" });
            }
            req.user = {
                id: session.user.id,
                name: session.user.name,
                role: session.user.role as string,
                email: session.user.email,
                emailVerified: session.user.emailVerified
            }
            
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default AuthVerify