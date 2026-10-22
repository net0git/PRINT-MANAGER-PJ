import { ModeloConsumible } from "../modelo-consumible";

export interface ModeloConsumibleRepository {
    findAll(): Promise<ModeloConsumible[]>;
    findById(id_modelo_consumible: number): Promise<ModeloConsumible | undefined>;
    update(modelo_consumible: ModeloConsumible): Promise<void>;
    create(modelo_consumible: ModeloConsumible): Promise<void>;
    delete(id_modelo_consumible: number): Promise<void>;
}