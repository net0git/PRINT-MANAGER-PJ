import { Router } from "express";
import { impresoraReportingController } from "./impresoraReporting.dependencies";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const impresoraReportingRoutes = Router();

impresoraReportingRoutes.get(
    "/",
    authMiddleware,
    impresoraReportingController.findAll.bind(impresoraReportingController)
);

impresoraReportingRoutes.post(
    "/",
    authMiddleware,
    impresoraReportingController.findOne.bind(impresoraReportingController)
);