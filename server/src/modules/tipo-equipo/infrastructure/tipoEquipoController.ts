import { Request, Response } from "express";
import { TipoEquipoUseCaseCreate } from "../application/tipoEquipoUseCaseCreate";
import { TipoEquipoUseCaseFindAll } from "../application/tipoEquipoUseCaseFindAll";
import { TipoEquipoUseCaseFindById } from "../application/tipoEquipoUseCaseFindById";
import { TipoEquipoUseCaseUpdate } from "../application/tipoEquipoUseCaseUpdate";

export class TipoEquipoController {

    constructor(
        private readonly tipoEquipoUseCaseCreate: TipoEquipoUseCaseCreate,
        private readonly tipoEquipoUseCaseFindAll: TipoEquipoUseCaseFindAll,
        private readonly tipoEquipoUseCaseFindById: TipoEquipoUseCaseFindById,
        private readonly tipoEquipoUseCaseUpdate: TipoEquipoUseCaseUpdate
    ) { }



    async create(req: Request, res: Response): Promise<void> {
        const {tipo_equipo, descripcion} = req.body;
        await this.tipoEquipoUseCaseCreate.execute(tipo_equipo, descripcion);
        res.status(201).json({message:'Tipo de equipo creado correctamente'});
    }

    async findAll(req: Request, res: Response): Promise<void>  {
        try {
            const tiposEquipo = await this.tipoEquipoUseCaseFindAll.execute();            
            res.status(200).json(tiposEquipo.map(tipoEquipo => tipoEquipo.mapToPrimitives())  );
           
        } catch (error) {
            res.status(500).json({ message: "Error al obtener tipos de equipo" });
            console.error("Error al obtener tipos de equipo:", error);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const tipoEquipo = await this.tipoEquipoUseCaseFindById.execute(Number(req.params.id_tipo_equipo));
            if(!tipoEquipo){
                res.status(404).send();
                return;
            }
            res.status(200).json(tipoEquipo.mapToPrimitives());
        } catch (error) {
            res.status(500).json({ message: "Error al obtener tipo de equipo" });
            console.error("Error al obtener tipo de equipo:", error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const tipoEquipo = req.body;
            await this.tipoEquipoUseCaseUpdate.execute(Number(req.params.id_tipo_equipo), tipoEquipo.tipo_equipo, tipoEquipo.descripcion);
            res.status(200).json({ message: "Tipo de equipo actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar tipo de equipo" });
            console.error("Error al actualizar tipo de equipo:", error);
        }
    }
}
