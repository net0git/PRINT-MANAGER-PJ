import { Request, Response } from "express";
import { GetSedesDetail } from "../application/getSedesDetail";

export class SedeReportingController {

    constructor(
        private readonly getSedesDetail: GetSedesDetail
    ) { }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const sedes = await this.getSedesDetail.execute();
            res.status(200).json(sedes);
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener sedes" });
            console.error("Error al obtener sedes:", error);
        }
    }
}