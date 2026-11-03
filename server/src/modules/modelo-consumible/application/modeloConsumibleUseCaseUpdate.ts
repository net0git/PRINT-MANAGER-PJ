import { ModeloConsumibleRepository } from "../domain/port-in/modelo-consumibleRepository";
import { ModeloConsumible } from "../domain/modelo-consumible";

export class ModeloConsumibleUseCaseUpdate {
    constructor(private modeloConsumibleRepository: ModeloConsumibleRepository) { }

    async execute(id_modelo_consumible: number, id_modelo: number, id_consumible: number): Promise<void> {
        const modelo_consumible_update = new ModeloConsumible(
            id_modelo_consumible,
            new Date(),
            id_modelo,
            id_consumible
        );
        await this.modeloConsumibleRepository.update(modelo_consumible_update);
    }
}