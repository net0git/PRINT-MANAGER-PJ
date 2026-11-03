import { Marca } from "../marca";

export interface MarcaRepository {
    findAll(): Promise<Marca[]>;
    findById(id_marca: number): Promise<Marca | undefined>;
    update(marca: Marca): Promise<void>;
    create(marca: Marca): Promise<void>;
}