import { AreaRepository } from "../domain/port-in/areaRepository";
import { Area } from "../domain/area";

export class AreaUseCaseFindAll {
    constructor(private areaRepository: AreaRepository) { }

    async execute(): Promise<Area[]> {
        return await this.areaRepository.findAll();
    }
}