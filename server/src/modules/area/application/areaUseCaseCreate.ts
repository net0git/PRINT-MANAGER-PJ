import { AreaRepository } from "../domain/port-in/areaRepository";
import { Area } from "../domain/area";

export class AreaUseCaseCreate {
    constructor(private areaRepository: AreaRepository) { }

    async execute(area: string, referencia: string, id_sede: number, estado: boolean): Promise<void> {
        const area_new = new Area(
            0,
            new Date(),
            area,
            referencia,
            id_sede,
            estado
        );
        await this.areaRepository.create(area_new);
    }
}