export interface TipoEquipoDto {
    id_tipo_equipo: number,
    tipo_equipo: string,
}

export interface TipoConsumibleDto {
    id_tipo_consumible: number,
    tipo_consumible: string
}

export interface ConsumibleDto {
    id_modelo_consumible: number,
    id_consumible: number,
    nro_parte: string,
    tipo_consumible: TipoConsumibleDto,
}

export interface ModeloDto {
    id_modelo: number,
    modelo: string,
    estado: boolean,
    tipo_equipo: TipoEquipoDto
    consumibles: ConsumibleDto[]
}

export interface ImpresoraDetailResponse {
    id_marca: number,
    marca: string,
    estado: boolean,
    modelos: ModeloDto[]
}

export interface impresoraResponseCreate {
    message: string
}

export interface impresoraResponseUpdate {
    message: string
}