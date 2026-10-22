import { Router } from "express";
import { consumibleReportingController } from "./consumibleReporting.dependencies";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const consumibleReportingRoutes = Router();

consumibleReportingRoutes.get(
    "/",
    authMiddleware,
    consumibleReportingController.findAll.bind(consumibleReportingController)
);