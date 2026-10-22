import { Request, Response } from "express";
import { MarcaUseCaseCreate } from "../application/marcaUseCaseCreate";
import { MarcaUseCaseFindAll } from "../application/marcaUseCaseFindAll";
import { MarcaUseCaseFindById } from "../application/marcaUseCaseFindById";
import { MarcaUseCaseUpdate } from "../application/marcaUseCaseUpdate";

export class MarcaController {

    constructor(
        private readonly marcaUseCaseCreate: MarcaUseCaseCreate,
        private readonly marcaUseCaseFindAll: MarcaUseCaseFindAll,
        private readonly marcaUseCaseFindById: MarcaUseCaseFindById,
        private readonly marcaUseCaseUpdate: MarcaUseCaseUpdate
    ) { }



    async create(req: Request, res: Response): Promise<void> {
        const {marca} = req.body;
        await this.marcaUseCaseCreate.execute(marca);
        res.status(201).json({message:'Marca creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const marcas = await this.marcaUseCaseFindAll.execute();
            res.status(200).json(marcas.map(marca => marca.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener marcas" });
            console.error("Error al obtener marcas:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const marca = await this.marcaUseCaseFindById.execute(Number(req.params.id_marca));
        if (!marca) {
            res.status(404).send();
            return;
        }
        res.status(200).json(marca.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_marca = Number(req.params.id_marca);
        const marca = req.body;
        console.log("marca en servidor:", marca.marca);
        await this.marcaUseCaseUpdate.execute(id_marca, marca.marca.trim(), marca.estado);
        res.status(200).json({message:'Marca actualizado correctamente'});
    }

}