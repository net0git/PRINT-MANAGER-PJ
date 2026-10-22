import { Sede } from "../sede";

export interface SedeRepository {
    findAll(): Promise<Sede[]>;
    findById(id_sede: number): Promise<Sede | undefined>;
    update(sede: Sede): Promise<void>;
    create(sede: Sede): Promise<void>;
}