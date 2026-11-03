import { Request, Response } from "express";
import { SedeUseCaseCreate } from "../application/sedeUseCaseCreate";
import { SedeUseCaseFindAll } from "../application/sedeUseCaseFindAll";
import { SedeUseCaseFindById } from "../application/sedeUseCaseFindById";
import { SedeUseCaseUpdate } from "../application/sedeUseCaseUpdate";

export class SedeController {

    constructor(
        private readonly sedeUseCaseCreate: SedeUseCaseCreate,
        private readonly sedeUseCaseFindAll: SedeUseCaseFindAll,
        private readonly sedeUseCaseFindById: SedeUseCaseFindById,
        private readonly sedeUseCaseUpdate: SedeUseCaseUpdate
    ) { }

    async create(req: Request, res: Response): Promise<void> {
        const {sede, direccion, estado} = req.body;
        await this.sedeUseCaseCreate.execute(sede, direccion, estado);
        res.status(201).json({message:'Sede creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const sedes = await this.sedeUseCaseFindAll.execute();
            res.status(200).json(sedes.map(sede => sede.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener sedes" });
            console.error("Error al obtener sedes:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const sede = await this.sedeUseCaseFindById.execute(Number(req.params.id_sede));
        if (!sede) {
            res.status(404).send();
            return;
        }
        res.status(200).json(sede.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_sede = Number(req.params.id_sede);
        const sede = req.body;        
        await this.sedeUseCaseUpdate.execute(id_sede, sede.sede, sede.direccion, sede.estado);
        res.status(200).json({message:'Sede actualizado correctamente'});
    }

}