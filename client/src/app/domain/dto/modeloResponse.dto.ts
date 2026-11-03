export interface ModeloResponse {
    id_modelo: number;
    modelo: string;
    estado: boolean;
    id_marca: number;
    id_tipo_equipo: number;
}

export interface ModeloCreate {
    message: string;
}

export interface ModeloUpdate {
    message: string;
}   