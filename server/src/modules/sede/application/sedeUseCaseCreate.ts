import { SedeRepository } from "../domain/port-in/sedeRepository";
import { Sede } from "../domain/sede";

export class SedeUseCaseCreate {
    constructor(private sedeRepository: SedeRepository) { }

    async execute(sede: string, direccion: string, estado: boolean): Promise<void> {
        const sede_new = new Sede(
            0,
            new Date(),
            sede,
            direccion,
            estado
        );
        await this.sedeRepository.create(sede_new);
    }
}