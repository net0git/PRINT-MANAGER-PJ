
import { TipoEquipoRepository } from "../domain/port-in/tipoEquipoRepository";
import { TipoEquipo } from "../domain/tipoEquipo";

export class TipoEquipoUseCaseCreate {

    constructor(private tipoConsumibleRepository: TipoEquipoRepository) { }

    async execute(tipo_equipo: string, descripcion: string): Promise<void> {
        const tipo_equipo_new = new TipoEquipo(
            0,
            new Date(),
            tipo_equipo,
            descripcion
        );
        await this.tipoConsumibleRepository.create(tipo_equipo_new);
    }

}