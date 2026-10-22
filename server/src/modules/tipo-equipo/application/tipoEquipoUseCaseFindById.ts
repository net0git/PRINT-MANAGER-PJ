import { TipoEquipoRepository } from "../domain/port-in/tipoEquipoRepository";
import { TipoEquipo } from "../domain/tipoEquipo";

export class TipoEquipoUseCaseFindById {

    constructor(private tipoConsumibleRepository: TipoEquipoRepository) { }

    async execute(id_tipo_equipo: number): Promise<TipoEquipo | undefined> {
        return await this.tipoConsumibleRepository.findById(id_tipo_equipo);
    }
}