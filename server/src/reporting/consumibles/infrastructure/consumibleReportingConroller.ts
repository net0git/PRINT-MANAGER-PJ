import { Request, Response } from "express";
import { GetConsumiblesDetail } from "../application/getConsumiblesDetail";

export class ConsumibleReportingController {

    constructor(
        private getConsumiblesDetail: GetConsumiblesDetail
    ) {}

    async findAll(req: Request, res: Response) {

        try {

            const consumibles = await this.getConsumiblesDetail.execute();

            res.status(200).json(consumibles);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de consumibles"
            });

        }
    }
}