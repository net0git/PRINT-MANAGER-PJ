import { TipoEquipo } from "../model/tipoEquipo.model";
import { Marca } from "../model/marca.model";
import { TipoConsumible } from "../model/tipoConsumible.model";


export interface ConsumibleResponse {
    id_consumible: number;
    nro_parte: string;
    id_tipo_consumible: number;
    id_marca: number;
    id_tipo_equipo: number;
}


export interface ConsumibleDetailResponse {
    id_consumible: number;
    nro_parte: string;
    tipoConsumible: TipoConsumible;
    marca: Marca;
    tipoEquipo: TipoEquipo;

}

export interface ConsumibleCreate {
    message: string;
}

export interface ConsumibleUpdate {
    message: string;
}