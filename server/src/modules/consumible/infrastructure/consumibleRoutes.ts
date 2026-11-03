import { Router } from "express";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { ConsumibleController } from "./consumibleController";

export const consumibleRoutes = (consumibleController: ConsumibleController) => {
    const router = Router();

    router.post("/api/consumible",authMiddleware,auditMiddleware, consumibleController.create.bind(consumibleController));
    router.get("/api/consumible/list",authMiddleware,consumibleController.findAll.bind(consumibleController));
    router.get("/api/consumible/:id_consumible", authMiddleware,  consumibleController.findById.bind(consumibleController));
    router.put("/api/consumible/:id_consumible", authMiddleware, auditMiddleware, consumibleController.update.bind(consumibleController));
    return router;
};