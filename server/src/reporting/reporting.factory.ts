import { Router } from "express";

import { userReportingRoutes } from "./user/infrastructure/userReportingRouter";
import { rolReportingRoutes } from "./rol/infrastructure/rolReportinRouter";
import { consumibleReportingRoutes } from "./consumibles/infrastructure/consumibleRouter";
import { impresoraReportingRoutes } from "./impresoras/infrastructure/impresoraRouter";
import { sedeReportingRoutes } from "./sedes/infrastructure/sedesRouter";
import { ticketReportingRoutes } from "./tickets/infrastructure/ticketRouter";
import { areaCantConsumibleReportingRoutes } from "./dashboard/infrastructure/dasboardRouter";

export const reportingFactory = () => {

    const router = Router();

    router.use(
        "/user/list/details",
        userReportingRoutes
    );

    router.use(
        "/rol/list",
        rolReportingRoutes
    );

    router.use(
        "/consumible/list/details",
        consumibleReportingRoutes
    );

    router.use(
        "/impresora/list/details",
        impresoraReportingRoutes
    );

    router.use(
        "/impresora/detail",
        impresoraReportingRoutes
    );

    router.use(
        "/sede/list/details",
        sedeReportingRoutes
    );

    router.use(
        "/ticket",
        ticketReportingRoutes
    );

    router.use(
        "/dashboard",
        areaCantConsumibleReportingRoutes
    );

    return router;
};