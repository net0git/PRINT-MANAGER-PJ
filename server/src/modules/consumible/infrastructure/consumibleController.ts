import { Request, Response } from "express";
import { ConsumibleUseCaseCreate } from "../application/consumibleUseCaseCreate";
import { ConsumibleUseCaseFindAll } from "../application/consumibleUseCaseFindAll";
import { ConsumibleUseCaseFindById } from "../application/consumibleUseCaseFindById";
import { ConsumibleUseCaseUpdate } from "../application/consumibleUseCaseUpdate";

export class ConsumibleController {

    constructor(
        private readonly consumibleUseCaseCreate: ConsumibleUseCaseCreate,
        private readonly consumibleUseCaseFindAll: ConsumibleUseCaseFindAll,
        private readonly consumibleUseCaseFindById: ConsumibleUseCaseFindById,
        private readonly consumibleUseCaseUpdate: ConsumibleUseCaseUpdate
    ) { }



    async create(req: Request, res: Response): Promise<void> {
        const {nro_parte, id_tipo_consumible, id_marca} = req.body;
        await this.consumibleUseCaseCreate.execute(nro_parte, id_tipo_consumible, id_marca);
        res.status(201).json({message:'Consumible creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const consumibles = await this.consumibleUseCaseFindAll.execute();
            res.status(200).json(consumibles.map(consumible => consumible.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener consumibles" });
            console.error("Error al obtener consumibles:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const consumible = await this.consumibleUseCaseFindById.execute(Number(req.params.id_consumible));
        if (!consumible) {
            res.status(404).send();
            return;
        }
        res.status(200).json(consumible.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_consumible = Number(req.params.id_consumible);
        const consumible = req.body;
        await this.consumibleUseCaseUpdate.execute(id_consumible, consumible.nro_parte, consumible.id_tipo_consumible, consumible.id_marca);
        res.status(200).json({message:'Consumible actualizado correctamente'});
    }

}