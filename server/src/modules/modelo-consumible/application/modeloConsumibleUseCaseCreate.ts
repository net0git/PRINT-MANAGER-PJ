import { ModeloConsumibleRepository } from "../domain/port-in/modelo-consumibleRepository";
import { ModeloConsumible } from "../domain/modelo-consumible";

export class ModeloConsumibleUseCaseCreate {
    constructor(private modeloConsumibleRepository: ModeloConsumibleRepository) { }

    async execute(id_modelo: number, id_consumible: number): Promise<void> {
        const modelo_consumible = new ModeloConsumible(
            0,
            new Date(),
            id_modelo,
            id_consumible
        );
        await this.modeloConsumibleRepository.create(modelo_consumible);
    }
}