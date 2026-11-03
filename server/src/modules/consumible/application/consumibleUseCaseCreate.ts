import { Consumible } from "../domain/consumible";
import { ConsumibleRepository } from "../domain/port-in/consumibleResository";

export class ConsumibleUseCaseCreate {

    constructor( private consumibleRepository: ConsumibleRepository) { }

    async execute(nro_parte: string, id_tipo_consumible: number, id_marca: number): Promise<void> {
        
        const consumible_new = new Consumible(
            0,
            new Date(),
            nro_parte,
            id_tipo_consumible,
            id_marca
        );
        await this.consumibleRepository.create(consumible_new);
    }

}