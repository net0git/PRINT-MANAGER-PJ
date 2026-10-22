import { Router } from "express";
import { ModeloConsumibleController } from "../infrastructure/modeloConsumibleController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const modeloConsumibleRoutes = (modeloConsumibleController: ModeloConsumibleController) => {
    const router = Router();
    router.post("/api/modelo-consumible", authMiddleware, auditMiddleware, modeloConsumibleController.create.bind(modeloConsumibleController));
    router.get("/api/modelo-consumible", authMiddleware, modeloConsumibleController.findAll.bind(modeloConsumibleController));
    router.get("/api/modelo-consumible/:id_modelo_consumible", authMiddleware, modeloConsumibleController.findById.bind(modeloConsumibleController));
    router.put("/api/modelo-consumible/:id_modelo_consumible", authMiddleware, modeloConsumibleController.update.bind(modeloConsumibleController));
    router.delete("/api/modelo-consumible/:id_modelo_consumible", authMiddleware, modeloConsumibleController.delete.bind(modeloConsumibleController));
    return router;
};