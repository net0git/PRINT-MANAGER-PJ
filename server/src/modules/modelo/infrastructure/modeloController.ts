import { Request, Response } from "express";
import { ModeloUseCaseCreate } from "../application/modeloUseCaseCreate";
import { ModeloUseCaseFindAll } from "../application/modeloUseCaseFindAll";
import { ModeloUseCaseFindById } from "../application/modeloUseCaseFindById";
import { ModeloUseCaseUpdate } from "../application/modeloUseCaseUpdate";

export class ModeloController {

    constructor(
        private readonly modeloUseCaseCreate: ModeloUseCaseCreate,
        private readonly modeloUseCaseFindAll: ModeloUseCaseFindAll,
        private readonly modeloUseCaseFindById: ModeloUseCaseFindById,
        private readonly modeloUseCaseUpdate: ModeloUseCaseUpdate
    ) { }

    async create(req: Request, res: Response): Promise<void> {
        const {modelo, id_marca, id_tipo_equipo} = req.body;
        await this.modeloUseCaseCreate.execute(modelo, id_marca, id_tipo_equipo);
        res.status(201).json({message:'Modelo creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const modelos = await this.modeloUseCaseFindAll.execute();
            res.status(200).json(modelos.map(modelo => modelo.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener modelos" });
            console.error("Error al obtener modelos:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const modelo = await this.modeloUseCaseFindById.execute(Number(req.params.id_modelo));
        if (!modelo) {
            res.status(404).send();
            return;
        }
        res.status(200).json(modelo.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_modelo = Number(req.params.id_modelo);
        const modelo = req.body;        
        await this.modeloUseCaseUpdate.execute(id_modelo, modelo.modelo, modelo.estado, modelo.id_marca, modelo.id_tipo_equipo);
        res.status(200).json({message:'Modelo actualizado correctamente'});
    }

}