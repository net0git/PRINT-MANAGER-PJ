import { Request, Response } from "express";
import { UserUseCaseCreate } from "../application/userUseCaseCreate";
import { UserUseCaseFindAll } from "../application/userUseCaseFindAll";
import { UserUseCaseFindById } from "../application/userUseCaseFindById";
import { UserUseCaseUpdate } from "../application/userUseCaseUpdate";
import { UserUseCaseDelete } from "../application/userUseCaseDelete";

export class UserController {

    constructor(
        private readonly userUseCaseCreate: UserUseCaseCreate,
        private readonly userUseCaseFindAll: UserUseCaseFindAll,
        private readonly userUseCaseFindById: UserUseCaseFindById,
        private readonly userUseCaseUpdate: UserUseCaseUpdate,
        private readonly userUseCaseDelete: UserUseCaseDelete
    ) { }



    async create(req: Request, res: Response): Promise<void> {
        const { nombre, ap_paterno, ap_materno, correo, telefono, username, password, id_rol, estado } = req.body;
        await this.userUseCaseCreate.execute(nombre, ap_paterno, ap_materno, correo, telefono, username, password, id_rol, estado);
        res.status(201).json({ message: 'Usuario creado correctamente' });
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userUseCaseFindAll.execute();
            res.status(200).json(users.map(user => user.mapToPrimitives()));

        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios" });
            console.error("Error al obtener usuarios:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        const user = await this.userUseCaseFindById.execute(Number(req.params.id_usuario));
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).json(user.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_usuario = Number(req.params.id_usuario);
        const user = req.body;
        await this.userUseCaseUpdate.execute(id_usuario, user.nombre, user.ap_paterno, user.ap_materno, user.correo, user.telefono, user.username, user.password, user.id_rol, user.estado);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id_usuario = Number(req.params.id_usuario);

            await this.userUseCaseDelete.execute(id_usuario);

            res.status(200).json({
                message: "Usuario eliminado correctamente"
            });
        } catch (error: any) {
            if (error.code === "23503") {
                res.status(409).json({
                    message: "No se puede eliminar un usuario asociado a un ticket"
                });
                return;
            }

            res.status(500).json({
                message: "Error al eliminar el usuario"
            });
        }
    }

}