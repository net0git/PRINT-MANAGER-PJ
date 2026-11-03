import { AreaRepository } from "../domain/port-in/areaRepository";
import { Area } from "../domain/area";

export class AreaUseCaseFindById {
    constructor(private areaRepository: AreaRepository) { }

    async execute(id_area: number): Promise<Area | undefined> {
        return await this.areaRepository.findById(id_area);
    }
}