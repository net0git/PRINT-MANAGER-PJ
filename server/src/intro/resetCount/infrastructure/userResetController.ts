import { Request, Response } from "express";
import { UserResetUseCaseUpdate } from "../application/userResetUseCaseUpdate";
import { UserResetUseCaseFindUserName } from "../application/userResetUseCaseFindUserName";

export class UserResetController {

    constructor(
        private readonly userResetUseCaseUpdate: UserResetUseCaseUpdate,
        private readonly userResetUseCaseFindUserName: UserResetUseCaseFindUserName
    ) { }

    async update(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        await this.userResetUseCaseUpdate.execute(username, password);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    }

    async findByUsername(req: Request, res: Response): Promise<void> {
        const username = String(req.params.username);

        const userReset = await this.userResetUseCaseFindUserName.execute(username);

        res.status(200).json({
            exists: !!userReset
        });
    }
}   