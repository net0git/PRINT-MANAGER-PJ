import { TipoConsumible } from "../tipoConsumible";

export interface TipoConsumibleRepository {
    findAll(): Promise<TipoConsumible[]>;
    findById(id_tipo_consumible: number): Promise<TipoConsumible | undefined>;
    update(tipoConsumible: TipoConsumible): Promise<void>;
    create(tipoConsumible: TipoConsumible): Promise<void>;
}