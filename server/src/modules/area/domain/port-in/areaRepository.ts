import { Area } from "../area";

export interface AreaRepository {
    findAll(): Promise<Area[]>;
    findById(id_area: number): Promise<Area | undefined>;
    update(area: Area): Promise<void>;
    create(area: Area): Promise<void>;
}