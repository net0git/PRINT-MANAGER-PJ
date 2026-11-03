import { Request, Response } from "express";
import { GetUserList } from "../application/getUserList";

export class UserReportingController {

    constructor(
        private getUserList: GetUserList
    ) {}

    async findAll(req: Request, res: Response) {

        try {

            const users = await this.getUserList.execute();

            res.status(200).json(users);

        } catch (error) {

            res.status(500).json({
                message: "Error obteniendo reporte de usuarios"
            });

        }
    }
}