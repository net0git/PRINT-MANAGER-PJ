import { Request, Response } from "express";
import { GetNroParteCant } from "../application/getNroParteCant";
import { GetAreaCantiConsumible } from "../application/getAreaCantiConsumible";
import { GetAnios } from "../application/getAnios";

export class AreaCantConsumibleReportingController {

    constructor(
        private getAreaCantiConsumible: GetAreaCantiConsumible,
        private getNroParteCant: GetNroParteCant,
        private getAnios: GetAnios
    ) { }

    async findAll(req: Request, res: Response) {

        try {

            const anio = req.body.anio;

            const areaCantConsumibles = await this.getAreaCantiConsumible.execute(anio);
            res.status(200).json(areaCantConsumibles);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de consumibles"
            });

        }
    }

    async findAllNroParteCant(req: Request, res: Response) {

        try {

            const anio = req.body.anio;

            const nroParteCant = await this.getNroParteCant.execute(anio);
            res.status(200).json(nroParteCant);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de consumibles"
            });

        }
    }

    async findAllAniosConsult(req: Request, res: Response) {

        try {

            const anios = await this.getAnios.execute();
            res.status(200).json(anios);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de anios"
            });

        }
    }
}