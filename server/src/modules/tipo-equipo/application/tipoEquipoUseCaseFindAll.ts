
import { TipoEquipoRepository } from "../domain/port-in/tipoEquipoRepository";
import { TipoEquipo } from "../domain/tipoEquipo";

export class TipoEquipoUseCaseFindAll {

    constructor(private tipoEquipoRepository: TipoEquipoRepository) { }

    async execute(): Promise<TipoEquipo[]> {
        return await this.tipoEquipoRepository.findAll();
    }
}