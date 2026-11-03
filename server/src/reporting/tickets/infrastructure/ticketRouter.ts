import { Router } from "express";
import { ticketReportingController } from "./ticketReporting.dependencies";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const ticketReportingRoutes = Router();

ticketReportingRoutes.post(
    "/list",
    authMiddleware,
    ticketReportingController.findAll.bind(ticketReportingController)
);

ticketReportingRoutes.post(
    "/list/pendientes",
    authMiddleware,
    ticketReportingController.findAllPendientes.bind(ticketReportingController)
);

ticketReportingRoutes.post(
    "/list/almacen",
    authMiddleware,
    ticketReportingController.findAllAlmacen.bind(ticketReportingController)
);

ticketReportingRoutes.post(
    "/count-status",
    authMiddleware,
    ticketReportingController.findCountStatus.bind(ticketReportingController)
);

ticketReportingRoutes.post(
    "/count-mes",
    authMiddleware,
    ticketReportingController.findCountMes.bind(ticketReportingController)
);