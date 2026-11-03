import { Router } from "express";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { TipoEquipoController } from "./tipoEquipoController";

export const tipoEquipoRoutes = (tipoEquipoController : TipoEquipoController) => {
    const router = Router ();

    router.post("/api/tipo-equipo",auditMiddleware, authMiddleware, tipoEquipoController.create.bind(tipoEquipoController));
    router.get("/api/tipo-equipo/list",auditMiddleware, authMiddleware, tipoEquipoController.findAll.bind(tipoEquipoController));
    router.get("/api/tipo-equipo/:id_tipo_equipo", auditMiddleware, authMiddleware, tipoEquipoController.findById.bind(tipoEquipoController));
    router.put("/api/tipo-equipo/:id_tipo_equipo", auditMiddleware, authMiddleware, tipoEquipoController.update.bind(tipoEquipoController));
    return router;
}