import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { TicketStatusController } from "./ticket-estadoController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";

export const ticketEstadoRoutes = (ticketStatusController :TicketStatusController)=>{
    const router = Router();

    router.post("/api/ticket-estado", authMiddleware, auditMiddleware, ticketStatusController.create.bind(ticketStatusController));
    router.get("/api/ticket-estado/list", authMiddleware, auditMiddleware, ticketStatusController.findAll.bind(ticketStatusController));
    router.get("/api/ticket-estado/:id_estado_ticket", authMiddleware, auditMiddleware, ticketStatusController.findById.bind(ticketStatusController));
    router.put("/api/ticket-estado/:id_estado_ticket", authMiddleware, auditMiddleware, ticketStatusController.update.bind(ticketStatusController));

    return router;
}