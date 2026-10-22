import { SedeRepository } from "../domain/port-in/sedeRepository";
import { Sede } from "../domain/sede";

export class SedeUseCaseFindById {
    constructor(private sedeRepository: SedeRepository) { }

    async execute(id_sede: number): Promise<Sede | undefined> {
        return await this.sedeRepository.findById(id_sede);
    }
}