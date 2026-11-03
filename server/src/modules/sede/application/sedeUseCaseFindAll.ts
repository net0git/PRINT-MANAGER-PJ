import { SedeRepository } from "../domain/port-in/sedeRepository";
import { Sede } from "../domain/sede";

export class SedeUseCaseFindAll {
    constructor(private sedeRepository: SedeRepository) { }

    async execute(): Promise<Sede[]> {
        return await this.sedeRepository.findAll();
    }
}