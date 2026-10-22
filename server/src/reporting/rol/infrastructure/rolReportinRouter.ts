import { Router } from "express";
import { rolReportingController } from "./rolReporting.dependencies";
export const rolReportingRoutes = Router();

rolReportingRoutes.get(
    "/",
    rolReportingController.findAll.bind(rolReportingController)
);
