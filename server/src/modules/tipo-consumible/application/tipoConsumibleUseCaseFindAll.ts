import { TipoConsumibleRepository } from "../domain/port-in/tipoConsumibleRepository";
import { TipoConsumible } from "../domain/tipoConsumible";

export class TipoConsumibleUseCaseFindAll {

    constructor(private tipoConsumibleRepository: TipoConsumibleRepository) { }

    async execute(): Promise<TipoConsumible[]> {
        return await this.tipoConsumibleRepository.findAll();
    }
}