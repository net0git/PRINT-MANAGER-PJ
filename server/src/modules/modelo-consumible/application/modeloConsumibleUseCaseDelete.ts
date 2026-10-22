import { ModeloConsumibleRepository } from "../domain/port-in/modelo-consumibleRepository";
import { ModeloConsumible } from "../domain/modelo-consumible";

export class ModeloConsumibleUseCaseDelete {
    constructor(private modeloConsumibleRepository: ModeloConsumibleRepository) { }

    async execute(id_modelo_consumible: number): Promise<void> {
        await this.modeloConsumibleRepository.delete(id_modelo_consumible);
    }
}