import { Request, Response } from "express";
import { GetImpresorasDetail } from "../application/getImpresorasDetail";
import { GetImpresoraOne } from "../application/getOneImpresoraDetail";

export class ImpresoraReportingController {

    constructor(
        private getImpresorasDetail: GetImpresorasDetail,
         private getImpresoraOne: GetImpresoraOne
    ) {}

    async findAll(req: Request, res: Response) {

        try {

            const impresoras = await this.getImpresorasDetail.execute();

            res.status(200).json(impresoras);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de impresoras"
            });

        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id_marca, id_modelo, id_tipo_consumible } = req.body;

            console.log(id_marca, id_modelo, id_tipo_consumible);
            const impresora = await this.getImpresoraOne.execute(Number(id_marca), Number(id_modelo), Number(id_tipo_consumible));
            res.status(200).json(impresora);
        } catch (error) {
            res.status(500).json({
                message: "Error obteniendo impresora"
            });
        }
    }

}