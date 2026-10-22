import { Router } from "express";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { ModeloController } from "./modeloController";

export const modeloRoutes = (modeloController: ModeloController) => {
    const router = Router();

    router.post("/api/modelo",authMiddleware,auditMiddleware, modeloController.create.bind(modeloController));
    router.get("/api/modelo/list",authMiddleware,modeloController.findAll.bind(modeloController));
    router.get("/api/modelo/:id_modelo", authMiddleware,  modeloController.findById.bind(modeloController));
    router.put("/api/modelo/:id_modelo", authMiddleware, auditMiddleware, modeloController.update.bind(modeloController));
    return router;
};