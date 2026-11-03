import { Router } from "express";
import { sedeReportingController } from "./sedeReporting.dependencies";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const sedeReportingRoutes = Router();

sedeReportingRoutes.get(
    "/",
    authMiddleware,
    sedeReportingController.findAll.bind(sedeReportingController)
);