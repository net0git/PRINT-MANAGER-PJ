import { Router } from "express";
import { UserController } from "./userController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";


export const userRoutes = (userController: UserController) => {
    const router = Router();

    router.post("/api/user",authMiddleware,auditMiddleware, userController.create.bind(userController));
    router.get("/api/user/list",authMiddleware,userController.findAll.bind(userController));
    router.get("/api/user/:id_usuario", authMiddleware,  userController.findById.bind(userController));
    router.put("/api/user/:id_usuario", authMiddleware, auditMiddleware, userController.update.bind(userController));
    router.delete("/api/user/:id_usuario", authMiddleware, auditMiddleware, userController.delete.bind(userController));
    router.post("/api/auto-registro", auditMiddleware, userController.create.bind(userController));

    return router;
};