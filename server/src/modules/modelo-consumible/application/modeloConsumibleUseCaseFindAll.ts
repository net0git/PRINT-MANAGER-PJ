import { ModeloConsumibleRepository } from "../domain/port-in/modelo-consumibleRepository";
import { ModeloConsumible } from "../domain/modelo-consumible";

export class ModeloConsumibleUseCaseFindAll {
    
    constructor(private modeloConsumibleRepository: ModeloConsumibleRepository) { }

    async execute(): Promise<ModeloConsumible[]> {
        return await this.modeloConsumibleRepository.findAll();
    }
}