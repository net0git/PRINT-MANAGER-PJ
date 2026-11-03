import { Consumible } from "../domain/consumible";
import { ConsumibleRepository } from "../domain/port-in/consumibleResository";

export class ConsumibleUseCaseFindAll {

    constructor(private consumibleRepository: ConsumibleRepository) { }

    async execute(): Promise<Consumible[]> {
        return await this.consumibleRepository.findAll();
    }
}