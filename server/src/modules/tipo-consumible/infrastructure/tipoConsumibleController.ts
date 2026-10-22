import { Request, Response } from "express";
import { TipoConsumibleUseCaseCreate } from "../application/tipoConsumibleUseCaseCreate";
import { TipoConsumibleUseCaseFindAll } from "../application/tipoConsumibleUseCaseFindAll";
import { TipoConsumibleUseCaseFindById } from "../application/tipoConsumibleUseCaseFindById";
import { TipoConsumibleUseCaseUpdate } from "../application/tipoConsumibleUseCaseUpdate";

export class TipoConsumibleController {

    constructor(
        private readonly tipoConsumibleUseCaseCreate: TipoConsumibleUseCaseCreate,
        private readonly tipoConsumibleUseCaseFindAll: TipoConsumibleUseCaseFindAll,
        private readonly tipoConsumibleUseCaseFindById: TipoConsumibleUseCaseFindById,
        private readonly tipoConsumibleUseCaseUpdate: TipoConsumibleUseCaseUpdate
    ) { }



    async create(req: Request, res: Response): Promise<void> {
        const {tipo_consumible} = req.body;
        console.log("tipo_consumible en servidor:", tipo_consumible);
        await this.tipoConsumibleUseCaseCreate.execute(tipo_consumible);
        res.status(201).json({message:'Tipo de consumible creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const tiposConsumibles = await this.tipoConsumibleUseCaseFindAll.execute();
            res.status(200).json(tiposConsumibles.map(tipoConsumible => tipoConsumible.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener tipos de consumibles" });
            console.error("Error al obtener tipos de consumibles:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const tipoConsumible = await this.tipoConsumibleUseCaseFindById.execute(Number(req.params.id_tipo_consumible));
        if (!tipoConsumible) {
            res.status(404).send();
            return;
        }
        res.status(200).json(tipoConsumible.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_tipo_consumible = Number(req.params.id_tipo_consumible);
        const tipoConsumible = req.body;
        await this.tipoConsumibleUseCaseUpdate.execute(id_tipo_consumible, tipoConsumible.tipo_consumible);
        res.status(200).json({message:'Tipo de consumible actualizado correctamente'});
    }

}