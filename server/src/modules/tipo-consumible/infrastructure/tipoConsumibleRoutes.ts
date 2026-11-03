import { Router } from "express";
import { TipoConsumibleController } from "../infrastructure/tipoConsumibleController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const tipoConsumibleRoutes = (tipoConsumibleController: TipoConsumibleController) => {
    const router = Router();

    router.post("/api/tipo-consumible",authMiddleware,auditMiddleware, tipoConsumibleController.create.bind(tipoConsumibleController));
    router.get("/api/tipo-consumible/list",authMiddleware,tipoConsumibleController.findAll.bind(tipoConsumibleController));
    router.get("/api/tipo-consumible/:id_tipo_consumible", authMiddleware,  tipoConsumibleController.findById.bind(tipoConsumibleController));
    router.put("/api/tipo-consumible/:id_tipo_consumible", authMiddleware, auditMiddleware, tipoConsumibleController.update.bind(tipoConsumibleController));
    return router;
};
