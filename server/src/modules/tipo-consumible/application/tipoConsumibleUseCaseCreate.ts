import { TipoConsumibleRepository } from "../domain/port-in/tipoConsumibleRepository";
import { TipoConsumible } from "../domain/tipoConsumible";

export class TipoConsumibleUseCaseCreate {

    constructor(private tipoConsumibleRepository: TipoConsumibleRepository) { }

    async execute(tipo_consumible: string): Promise<void> {
        const tipo_consumible_new = new TipoConsumible(
            0,
            new Date(),
            tipo_consumible
        );
        await this.tipoConsumibleRepository.create(tipo_consumible_new);
    }

}