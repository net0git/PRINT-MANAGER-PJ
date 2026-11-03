import { Router } from "express";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { AreaController } from "./areaController";

export const areaRoutes = (areaController: AreaController) => {
    const router = Router();

    router.post("/api/area",authMiddleware,auditMiddleware, areaController.create.bind(areaController));
    router.get("/api/area/list",authMiddleware,areaController.findAll.bind(areaController));
    router.get("/api/area/:id_area", authMiddleware,  areaController.findById.bind(areaController));
    router.put("/api/area/:id_area", authMiddleware, auditMiddleware, areaController.update.bind(areaController));
    return router;
};