
import { Router } from "express";
import { userReportingController } 
from "./userReporting.dependencies";
import { authMiddleware } from "../../../shared/middleware/authMiddleware";

export const userReportingRoutes = Router();

userReportingRoutes.get(
    "/",
    authMiddleware,
    userReportingController.findAll.bind(userReportingController)
);