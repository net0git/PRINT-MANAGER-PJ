import { AreaRepository } from "../domain/port-in/areaRepository";
import { Area } from "../domain/area";

export class AreaUseCaseUpdate {
    constructor(private areaRepository: AreaRepository) { }

    async execute(id_area: number, area: string, referencia: string, id_sede: number, estado: boolean): Promise<void> {
        const area_update = new Area(
            id_area,
            new Date(),
            area,
            referencia,
            id_sede,
            estado
        );
        await this.areaRepository.update(area_update);
    }
}