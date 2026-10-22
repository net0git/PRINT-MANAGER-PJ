import { Router } from "express";
import { UserResetController } from "./userResetController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";

export const userRoutes = (userResetController: UserResetController) => {
    const router = Router();

    router.put(
        "/api/reset-cuenta",
        auditMiddleware,
        userResetController.update.bind(userResetController)
    );

    router.get(
        "/api/cuenta-exist/:username",
        auditMiddleware,
        userResetController.findByUsername.bind(userResetController)
    );

    return router;
};