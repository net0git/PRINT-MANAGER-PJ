import { Modelo } from "../modelo";

export interface ModeloRepository {
    findAll(): Promise<Modelo[]>;
    findById(id_modelo: number): Promise<Modelo | undefined>;
    update(modelo: Modelo): Promise<void>;
    create(modelo: Modelo): Promise<void>;
}