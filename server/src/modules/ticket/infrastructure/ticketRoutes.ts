import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";
import { AuditContext } from "../../../shared/audit/audit-context";
import { TicketController } from "./ticketController";
import { auditMiddleware } from "../../../shared/middleware/auditMiddleware";

export const ticketRoutes = (ticketController :TicketController)=>{
    const router = Router();

    router.post("/api/ticket", authMiddleware, auditMiddleware, ticketController.create.bind(ticketController));
    router.get("/api/ticket/list", authMiddleware,  ticketController.findAll.bind(ticketController));
    router.get("/api/ticket/:id_ticket", authMiddleware,  ticketController.findById.bind(ticketController));
    router.put("/api/ticket/:id_ticket", authMiddleware, auditMiddleware, ticketController.update.bind(ticketController));

    return router;
}