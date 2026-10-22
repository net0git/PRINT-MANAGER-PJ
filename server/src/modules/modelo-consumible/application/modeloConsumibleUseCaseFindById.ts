import { ModeloConsumibleRepository } from "../domain/port-in/modelo-consumibleRepository";
import { ModeloConsumible } from "../domain/modelo-consumible";

export class ModeloConsumibleUseCaseFindById {
    constructor(private modeloConsumibleRepository: ModeloConsumibleRepository) { }

    async execute(id_modelo_consumible: number): Promise<ModeloConsumible | undefined> {
        return await this.modeloConsumibleRepository.findById(id_modelo_consumible);
    }
}