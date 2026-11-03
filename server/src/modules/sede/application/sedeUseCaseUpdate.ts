import { SedeRepository } from "../domain/port-in/sedeRepository";
import { Sede } from "../domain/sede";

export class SedeUseCaseUpdate {
    constructor(private sedeRepository: SedeRepository) { }

    async execute(id_sede: number, sede: string, direccion: string, estado: boolean): Promise<void> {
        const sede_update = new Sede(
            id_sede,
            new Date(),
            sede,
            direccion,
            estado
        );
        await this.sedeRepository.update(sede_update);
    }
}