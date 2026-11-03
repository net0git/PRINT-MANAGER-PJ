
import { Consumible } from "../domain/consumible";
import { ConsumibleRepository } from "../domain/port-in/consumibleResository";

export class ConsumibleUseCaseFindById  {

    constructor( private consumibleRepository: ConsumibleRepository) { }

    async execute(id_consumible: number): Promise<Consumible | undefined> {
        return await this.consumibleRepository.findById(id_consumible);
    }
}