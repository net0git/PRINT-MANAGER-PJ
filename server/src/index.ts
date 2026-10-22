import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import { userFactory } from "./modules/user/user.factory";
import { authFactory } from "./auth/auth.factory";
import { reportingFactory } from "./reporting/reporting.factory";
import { marcaFactory } from "./modules/marca/marca.factory";
import { tipoEquipoFactory } from "./modules/tipo-equipo/tipoEquipo.factory";
import { consumibleFactory } from "./modules/consumible/consumible.factory";
import { modeloFactory } from "./modules/modelo/modelo.factory";
import { tipoConsumibleFactory } from "./modules/tipo-consumible/tipoConsumible.factory";
import { sedeFactory } from "./modules/sede/sede.factory";
import { areaFactory } from "./modules/area/area.factory";
import { ticketFactory } from "./modules/ticket/ticket.factory";
import { ticketEstadoFactory } from "./modules/ticket-estado/ticket-estado.factory";
import { modeloConsumibleFactory } from "./modules/modelo-consumible/modelo-consumible.factory";

import { userResetFactory } from "./intro/intro.factory";

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 5000);
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }
    routes() {

        this.app.use("/", userFactory());
        this.app.use("/", authFactory());
        this.app.use("/", marcaFactory());
        this.app.use("/", tipoConsumibleFactory());
        this.app.use("/", tipoEquipoFactory());
        this.app.use("/", consumibleFactory());
        this.app.use("/", modeloFactory());
        this.app.use("/", modeloConsumibleFactory());
        this.app.use("/", sedeFactory());
        this.app.use("/", areaFactory());
        this.app.use("/", ticketFactory());
        this.app.use("/", ticketEstadoFactory());
        this.app.use("/api", reportingFactory());

        this.app.use("/", userResetFactory());

    }
    start(): void {
        const server = this.app.listen(this.app.get('port'), '0.0.0.0', () => {
            console.log(`Server listening on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();
