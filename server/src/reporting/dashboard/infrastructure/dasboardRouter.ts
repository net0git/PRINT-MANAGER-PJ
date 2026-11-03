import { Router } from "express";
import { areaCantConsumibleReportingController } from "./dashboardReporting.dependencies";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const areaCantConsumibleReportingRoutes = Router();

areaCantConsumibleReportingRoutes.post(
    "/area-consumible",
    authMiddleware,
    areaCantConsumibleReportingController.findAll.bind(areaCantConsumibleReportingController)
);

areaCantConsumibleReportingRoutes.post(
    "/nro-parte-consumible",
    authMiddleware,
    areaCantConsumibleReportingController.findAllNroParteCant.bind(areaCantConsumibleReportingController)
);

areaCantConsumibleReportingRoutes.get(
    "/anios-list",
    authMiddleware,
    areaCantConsumibleReportingController.findAllAniosConsult.bind(areaCantConsumibleReportingController)
);