import { Consumible } from "../domain/consumible";
import { ConsumibleRepository } from "../domain/port-in/consumibleResository";

export class ConsumibleUseCaseUpdate {

    constructor( private consumibleRepository: ConsumibleRepository) { }

    async execute(id_consumible: number, nro_parte: string, id_tipo_consumible: number, id_marca: number): Promise<void> {
        
        const consumible_update = new Consumible(
            id_consumible,
            new Date(),
            nro_parte,
            id_tipo_consumible,
            id_marca
        );
        await this.consumibleRepository.update(consumible_update);
    }
}