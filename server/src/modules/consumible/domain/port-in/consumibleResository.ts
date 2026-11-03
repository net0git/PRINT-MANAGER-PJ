import { Consumible } from "../consumible";

export interface ConsumibleRepository {
    findAll(): Promise<Consumible[]>;
    findById(id_consumible: number): Promise<Consumible | undefined>;
    update(consumible: Consumible): Promise<void>;
    create(consumible: Consumible): Promise<void>;
}