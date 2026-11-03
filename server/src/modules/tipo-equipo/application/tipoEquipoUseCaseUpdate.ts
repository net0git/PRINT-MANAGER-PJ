
import { TipoEquipoRepository } from "../domain/port-in/tipoEquipoRepository";
import { TipoEquipo } from "../domain/tipoEquipo";

export class TipoEquipoUseCaseUpdate {

    constructor(private tipoEquipoRepository: TipoEquipoRepository) { }

    async execute(id_tipo_equipo: number, tipo_equipo: string, descipcion: string): Promise<void> {
        const tipo_equipo_update = new TipoEquipo(
            id_tipo_equipo,
            new Date(),
            tipo_equipo,
            descipcion
        );
        await this.tipoEquipoRepository.update(tipo_equipo_update);
    }
}