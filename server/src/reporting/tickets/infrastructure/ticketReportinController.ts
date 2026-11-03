import { Request, Response } from "express";
import { GetTicketDetail } from "../application/getTicketDetail";
import { GetTicketPendientes } from "../application/getTicketPendientes";
import { GetTicketAlmacen } from "../application/getTicketAlmacen";
import { GetTicketCountStatus } from "../application/getTicketCountStatus";
import { GetTicketCountMes } from "../application/getTicketCountMes";

export class TicketReportingController {

    constructor(
        private getTicketDetail: GetTicketDetail, 
        private getTicketPendientes: GetTicketPendientes,
        private getTicketAlmacen: GetTicketAlmacen,
        private getTicketCountStatus: GetTicketCountStatus,
        private getTicketCountMes: GetTicketCountMes
    ) {}

    async findAll(req: Request, res: Response) {

        try {

           const {anio, id_usuario, id_rol} = req.body;

            const tickets = await this.getTicketDetail.execute(
                anio,
                id_usuario,
                id_rol
                
            );

            res.status(200).json(tickets);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Error obteniendo reporte de tickets"
            });

        }
    }

    async findAllPendientes(req: Request, res: Response) {

        try {

            const { anio } = req.body;

            const tickets = await this.getTicketPendientes.execute(
                anio
            );

            res.status(200).json(tickets);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Error obteniendo reporte de tickets"
            });

        }
    }

    async findAllAlmacen(req: Request, res: Response){
        try {

            const { anio } = req.body;

            const tickets = await this.getTicketAlmacen.execute(
                anio
            );

            res.status(200).json(tickets);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Error obteniendo reporte de tickets"
            });

        }
    }

    async findCountStatus(req: Request, res: Response) {

        try {

            const { anio } = req.body;
            

            const tickets = await this.getTicketCountStatus.execute(
                anio
            );

           
            console.log("tickets:", tickets);

            res.status(200).json(tickets);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Error obteniendo reporte de tickets"
            });

        }
    }

    async findCountMes(req: Request, res: Response) {

        try {

            const { anio } = req.body;

            const tickets = await this.getTicketCountMes.execute(
                anio
            );

            res.status(200).json(tickets);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Error obteniendo reporte de tickets"
            });

        }
    }   

}