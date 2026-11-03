import { TipoConsumibleRepository } from "../domain/port-in/tipoConsumibleRepository";
import { TipoConsumible } from "../domain/tipoConsumible";

export class TipoConsumibleUseCaseUpdate {

    constructor(private tipoConsumibleRepository: TipoConsumibleRepository) { }

    async execute(id_tipo_consumible: number, tipo_consumible: string): Promise<void> {
        const tipo_consumible_update = new TipoConsumible(
            id_tipo_consumible,
            new Date(),
            tipo_consumible
        );
        await this.tipoConsumibleRepository.update(tipo_consumible_update);
    }
}