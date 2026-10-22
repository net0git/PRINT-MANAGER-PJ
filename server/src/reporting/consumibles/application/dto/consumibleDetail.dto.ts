export interface ConsumibleDetailDto {
    id_consumible: number;
    nro_parte: string;

    tipoConsumible: {
        id_tipo_consumible: number;
        tipo_consumible: string;
    };

    marca: {
        id_marca: number;
        marca: string;
    };

}