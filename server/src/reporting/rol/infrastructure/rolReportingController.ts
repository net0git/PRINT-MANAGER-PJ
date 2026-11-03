import { Request, Response } from "express";
import { GetRolList } from "../application/getRolList";

export class RolReportingController {

    constructor(
        private getRolList: GetRolList
    ) {}

    async findAll(req: Request, res: Response) {

        try {

            const rols = await this.getRolList.execute();

            res.status(200).json(rols);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de rols"
            });

        }
    }
}