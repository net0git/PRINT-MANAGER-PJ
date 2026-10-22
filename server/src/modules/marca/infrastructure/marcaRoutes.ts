import { Router } from "express";
import { MarcaController } from "./marcaController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";


export const marcaRoutes = (marcaController: MarcaController) => {
    const router = Router();

    router.post("/api/marca",authMiddleware,auditMiddleware, marcaController.create.bind(marcaController));
    router.get("/api/marca/list",authMiddleware,marcaController.findAll.bind(marcaController));
    router.get("/api/marca/:id_marca", authMiddleware,  marcaController.findById.bind(marcaController));
    router.put("/api/marca/:id_marca", authMiddleware, auditMiddleware, marcaController.update.bind(marcaController));
    return router;
};