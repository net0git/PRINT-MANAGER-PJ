import { Request, Response } from "express";
import { ModeloConsumibleUseCaseCreate } from "../application/modeloConsumibleUseCaseCreate";
import { ModeloConsumibleUseCaseFindAll } from "../application/modeloConsumibleUseCaseFindAll";
import { ModeloConsumibleUseCaseFindById } from "../application/modeloConsumibleUseCaseFindById";
import { ModeloConsumibleUseCaseUpdate } from "../application/modeloConsumibleUseCaseUpdate";
import { ModeloConsumibleUseCaseDelete } from "../application/modeloConsumibleUseCaseDelete";

export class ModeloConsumibleController {

    constructor(        
        private readonly modeloConsumibleUseCaseCreate: ModeloConsumibleUseCaseCreate,
        private readonly modeloConsumibleUseCaseFindAll: ModeloConsumibleUseCaseFindAll,
        private readonly modeloConsumibleUseCaseFindById: ModeloConsumibleUseCaseFindById,
        private readonly modeloConsumibleUseCaseUpdate: ModeloConsumibleUseCaseUpdate,
        private readonly modeloConsumibleUseCaseDelete: ModeloConsumibleUseCaseDelete
    ) { }

    async create(req: Request, res: Response): Promise<void> {
        const {id_modelo, id_consumible} = req.body;
        await this.modeloConsumibleUseCaseCreate.execute(id_modelo, id_consumible);
        res.status(201).json({message:'Modelo consumible creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const modelos = await this.modeloConsumibleUseCaseFindAll.execute();
            res.status(200).json(modelos.map(modelo => modelo.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener modelos" });
            console.error("Error al obtener modelos:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const modelo = await this.modeloConsumibleUseCaseFindById.execute(Number(req.params.id_modelo_consumible));
        if (!modelo) {
            res.status(404).send();
            return;
        }
        res.status(200).json(modelo.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_modelo_consumible = Number(req.params.id_modelo_consumible);
        const modelo = req.body;        
        await this.modeloConsumibleUseCaseUpdate.execute(id_modelo_consumible, modelo.id_modelo, modelo.id_consumible);
        res.status(200).json({message:'Modelo consumible actualizado correctamente'});
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id_modelo_consumible = Number(req.params.id_modelo_consumible);
        await this.modeloConsumibleUseCaseDelete.execute(id_modelo_consumible);
        res.status(200).json({message:'Modelo consumible eliminado correctamente'});
    }
}