import { TipoEquipo } from "../tipoEquipo";

export interface TipoEquipoRepository {
    findAll(): Promise<TipoEquipo[]>;
    findById(id_tipo_equipo: number): Promise<TipoEquipo | undefined>;
    update(tipoEquipo: TipoEquipo): Promise<void>;
    create(tipoEquipo: TipoEquipo): Promise<void>;
}