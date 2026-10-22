import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../auth/infrastructure/services/JwtService";

const jwtService = new JwtService();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        // console.log("HEADER:", authHeader);
        // console.log("TOKEN:", token);
        const payload = jwtService.verify(token);
       

        //  guardas info del usuario
        (req as any).username = payload.username;

        // console.log(" TOKEN VALIDO:", payload);
        next();

    } catch (error) {
        console.log("❌ ERROR REAL:", error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}