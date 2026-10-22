import { Router } from "express";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { SedeController } from "./sedeController";

export const sedeRoutes = (sedeController: SedeController) => {
    const router = Router();

    router.post("/api/sede",authMiddleware,auditMiddleware, sedeController.create.bind(sedeController));
    router.get("/api/sede/list",authMiddleware,sedeController.findAll.bind(sedeController));
    router.get("/api/sede/:id_sede", authMiddleware,  sedeController.findById.bind(sedeController));
    router.put("/api/sede/:id_sede", authMiddleware, auditMiddleware, sedeController.update.bind(sedeController));
    return router;
};