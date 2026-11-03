import { Request, Response } from "express";
import { AreaUseCaseCreate } from "../application/areaUseCaseCreate";
import { AreaUseCaseFindAll } from "../application/areaUseCaseFindAll";
import { AreaUseCaseFindById } from "../application/areaUseCaseFindById";
import { AreaUseCaseUpdate } from "../application/areaUseCaseUpdate";

export class AreaController {

    constructor(
        private readonly areaUseCaseCreate: AreaUseCaseCreate,
        private readonly areaUseCaseFindAll: AreaUseCaseFindAll,
        private readonly areaUseCaseFindById: AreaUseCaseFindById,
        private readonly areaUseCaseUpdate: AreaUseCaseUpdate
    ) { }

    async create(req: Request, res: Response): Promise<void> {
        const {area, referencia, id_sede, estado} = req.body;
        await this.areaUseCaseCreate.execute(area, referencia, id_sede, estado);
        res.status(201).json({message:'Area creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const areas = await this.areaUseCaseFindAll.execute();
            res.status(200).json(areas.map(area => area.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener areas" });
            console.error("Error al obtener areas:", error);
        }
    }

    async findById(req: Request, res: Response): Promise<void>  {
        const area = await this.areaUseCaseFindById.execute(Number(req.params.id_area));
        if (!area) {
            res.status(404).send();
            return;
        }
        res.status(200).json(area.mapToPrimitives());
    }

    async update(req: Request, res: Response): Promise<void> {
        const id_area = Number(req.params.id_area);
        const area = req.body;        
        await this.areaUseCaseUpdate.execute(id_area, area.area, area.referencia, area.id_sede, area.estado);
        res.status(200).json({message:'Area actualizado correctamente'});
    }

}