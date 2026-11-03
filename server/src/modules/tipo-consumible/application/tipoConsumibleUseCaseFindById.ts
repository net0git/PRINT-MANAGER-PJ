import { TipoConsumibleRepository } from "../domain/port-in/tipoConsumibleRepository";
import { TipoConsumible } from "../domain/tipoConsumible";

export class TipoConsumibleUseCaseFindById {

    constructor(private tipoConsumibleRepository: TipoConsumibleRepository) { }

    async execute(id_tipo_equipo: number): Promise<TipoConsumible | undefined> {
        return await this.tipoConsumibleRepository.findById(id_tipo_equipo);
    }
}